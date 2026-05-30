import { Component, inject, signal, computed, resource, linkedSignal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { form, FormField, required } from '@angular/forms/signals';
import {
  LucidePackage,
  LucideBookOpen,
  LucidePlus,
  LucideTrash2,
  LucideArrowUp,
  LucideArrowDown,
  LucideCheck,
  LucideAlertCircle,
  LucideSave,
  LucideSearch,
} from '@lucide/angular';
import { InputText } from 'primeng/inputtext';
import { PackagesService } from '../../core/services/packages.service';
import { CourseService } from '../../core/services/course.service';
import type { Package } from '@dearourcommunity/client';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [
    DecimalPipe,
    FormField,
    InputText,
    LucidePackage,
    LucideBookOpen,
    LucidePlus,
    LucideTrash2,
    LucideArrowUp,
    LucideArrowDown,
    LucideCheck,
    LucideAlertCircle,
    LucideSave,
    LucideSearch,
  ],
  templateUrl: './packages.html',
  styleUrl: './packages.css',
})
export default class PackagesComponent {
  private packagesService = inject(PackagesService);
  private courseService = inject(CourseService);

  // Search input state for courses list
  searchQuery = signal('');

  // 1. Fetch data asynchronously using new Angular Resource API
  packagesResource = resource({
    loader: () => this.packagesService.findAll(),
  });

  coursesResource = resource({
    loader: () => this.courseService.findAll(),
  });

  // 2. Computed signals
  packages = computed<Package[]>(() => this.packagesResource.value() ?? []);
  courses = computed(() => this.coursesResource.value() ?? []);

  // 3. Page active states
  selectedPackageId = signal<string | null>(null);
  activeSubTab = signal<'details' | 'courses'>('details');

  selectedPackage = computed<Package | null>(() => {
    const list = this.packages();
    const id = this.selectedPackageId();
    if (!list.length || !id) return null;
    return list.find((p) => p.id === id) ?? null;
  });

  // 4. Signal-based form for updating package details
  packageModel = linkedSignal({
    source: this.selectedPackage,
    computation: (pkg) => ({
      name: pkg?.name ?? '',
      description: pkg?.description ?? '',
      price: pkg?.price ?? 0,
      slots: pkg?.slots ?? 0,
    }),
  });

  packageForm = form(this.packageModel, (p) => {
    required(p.name, { message: 'Tên gói học là bắt buộc' });
    required(p.price, { message: 'Giá gói học là bắt buộc' });
    required(p.slots, { message: 'Số lượng slot tối đa là bắt buộc' });
  });

  // 5. Writable signal representing the local draft courses list of the active package
  // Reset automatically whenever the selectedPackage changes
  draftCourses = linkedSignal({
    source: this.selectedPackage,
    computation: (pkg) => {
      if (!pkg) return [];
      return pkg.courses.map((pc) => ({
        wpCourseId: Number(pc.wpCourseId),
        orderIndex: pc.orderIndex,
      }));
    },
  });

  // 6. Computed list of courses in the selected package based on the local DRAFT list
  selectedPackageCourses = computed(() => {
    const draft = this.draftCourses();
    const masterCourses = this.courses();

    return draft
      .map((pc) => {
        const detail = masterCourses.find((c) => Number(c.ID) === Number(pc.wpCourseId));
        return {
          ...pc,
          title: detail?.postTitle ?? `Khóa học #${pc.wpCourseId}`,
        };
      })
      .sort((a, b) => a.orderIndex - b.orderIndex);
  });

  // 7. Computed list of all courses in the catalog, filtered by query
  filteredCoursesCatalog = computed(() => {
    const all = this.courses();
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return all;
    return all.filter(
      (c) => c.postTitle.toLowerCase().includes(query) || String(c.ID).includes(query),
    );
  });

  isCourseInSelectedPackage(courseId: number): boolean {
    return this.draftCourses().some((pc) => Number(pc.wpCourseId) === Number(courseId));
  }

  // 8. Identify if there are unsaved courses modifications compared to original
  hasUnsavedCourses = computed(() => {
    const pkg = this.selectedPackage();
    if (!pkg) return false;
    const original = pkg.courses;
    const draft = this.draftCourses();

    if (original.length !== draft.length) return true;
    return draft.some((d) => {
      const orig = original.find((o) => Number(o.wpCourseId) === Number(d.wpCourseId));
      return !orig || orig.orderIndex !== d.orderIndex;
    });
  });

  // Status indicators
  isSaving = signal(false);
  saveSuccess = signal(false);
  saveError = signal<string | null>(null);

  isSavingCourses = signal(false);
  coursesSaveSuccess = signal(false);
  coursesSaveError = signal<string | null>(null);

  // Selected course ID to add in the package
  selectedCourseIdToAdd = signal<string>('');

  selectPackage(id: string) {
    this.selectedPackageId.set(id);
    this.saveSuccess.set(false);
    this.saveError.set(null);
  }

  // Update Package Details
  async updatePackageDetails(e: Event) {
    e.preventDefault();
    this.packageForm().markAsTouched();

    if (this.packageForm().invalid()) return;

    const pkg = this.selectedPackage();
    if (!pkg) return;

    this.isSaving.set(true);
    this.saveSuccess.set(false);
    this.saveError.set(null);

    try {
      const model = this.packageModel();
      await this.packagesService.update(pkg.id, {
        name: model.name,
        description: model.description,
        price: Number(model.price),
        slots: Number(model.slots),
      });

      this.saveSuccess.set(true);
      await this.packagesResource.reload();
      setTimeout(() => this.saveSuccess.set(false), 3000);
    } catch (err) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật gói học.';
      this.saveError.set(errMsg);
    } finally {
      this.isSaving.set(false);
    }
  }

  // Add a course to the package (Draft only)
  addCourse(courseIdStr: string) {
    if (!courseIdStr) return;
    const courseId = Number(courseIdStr);
    const current = this.draftCourses();
    if (current.some((c) => c.wpCourseId === courseId)) return;

    const nextOrder = current.reduce((max, c) => Math.max(max, c.orderIndex), 0) + 1;
    this.draftCourses.set([...current, { wpCourseId: courseId, orderIndex: nextOrder }]);
  }

  // Remove a course from the package (Draft only)
  removeCourse(wpCourseId: number) {
    const current = this.draftCourses();
    const filtered = current.filter((c) => Number(c.wpCourseId) !== Number(wpCourseId));

    // Re-normalize order indexes
    const updated = filtered.map((c, index) => ({
      wpCourseId: Number(c.wpCourseId),
      orderIndex: index + 1,
    }));
    this.draftCourses.set(updated);
  }

  // Reorder a course inside the package (Draft only)
  moveCourse(wpCourseId: number, direction: 'up' | 'down') {
    const list = [...this.selectedPackageCourses()]; // This list is sorted by orderIndex
    const index = list.findIndex((c) => Number(c.wpCourseId) === Number(wpCourseId));
    if (index === -1) return;

    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === list.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    // Swap courses
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    // Map back to draft format and re-index
    const updated = list.map((c, i) => ({
      wpCourseId: Number(c.wpCourseId),
      orderIndex: i + 1,
    }));
    this.draftCourses.set(updated);
  }

  // Save the entire draft courses list to backend in a single PATCH call
  async savePackageCourses() {
    const pkg = this.selectedPackage();
    if (!pkg) return;

    this.isSavingCourses.set(true);
    this.coursesSaveSuccess.set(false);
    this.coursesSaveError.set(null);

    try {
      const coursesDto = this.draftCourses().map((c) => ({
        id: c.wpCourseId,
        order: c.orderIndex,
      }));

      await this.packagesService.update(pkg.id, {
        courses: coursesDto,
      });

      this.coursesSaveSuccess.set(true);
      await this.packagesResource.reload();
      setTimeout(() => this.coursesSaveSuccess.set(false), 3000);
    } catch (err) {
      console.error(err);
      const errMsg =
        err instanceof Error ? err.message : 'Có lỗi xảy ra khi lưu danh sách khóa học.';
      this.coursesSaveError.set(errMsg);
    } finally {
      this.isSavingCourses.set(false);
    }
  }
}
