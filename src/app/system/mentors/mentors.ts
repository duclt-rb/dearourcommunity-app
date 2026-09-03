import { Component, inject, linkedSignal, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import {
  LucideUsers,
  LucidePlus,
  LucideTrash2,
  LucideCheck,
  LucideAlertCircle,
  LucideSave,
  LucideX,
  LucideExternalLink,
  LucideUserCheck,
  LucideUserX,
  LucideSearch,
  LucideCalendarClock,
} from '@lucide/angular';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import type { CreateMentorDto, MentorType } from '@dearourcommunity/client';
import { MentorScheduleComponent } from './mentor-schedule/mentor-schedule';
import { MentorsStore } from './mentors.store';

@Component({
  selector: 'app-mentors',
  standalone: true,
  imports: [
    FormField,
    MentorScheduleComponent,
    TranslocoPipe,
    LucideUsers,
    LucidePlus,
    LucideTrash2,
    LucideCheck,
    LucideAlertCircle,
    LucideSave,
    LucideX,
    LucideExternalLink,
    LucideUserCheck,
    LucideUserX,
    LucideSearch,
    LucideCalendarClock,
  ],
  providers: [MentorsStore],
  templateUrl: './mentors.html',
  styleUrl: './mentors.css',
})
export default class MentorsComponent {
  private store = inject(MentorsStore);
  private transloco = inject(TranslocoService);

  // State (alias signal của store để template dùng trực tiếp)
  readonly searchQuery = this.store.searchQuery;
  readonly activeTypeFilter = this.store.activeTypeFilter;
  readonly mode = this.store.mode;
  readonly selectedMentorId = this.store.selectedMentorId;
  readonly isLoading = this.store.isLoading;
  readonly isSaving = this.store.isSaving;
  readonly saveSuccess = this.store.saveSuccess;
  readonly saveError = this.store.saveError;
  readonly isDeleting = this.store.isDeleting;
  readonly deleteError = this.store.deleteError;
  readonly confirmDeleteId = this.store.confirmDeleteId;

  // Computed
  readonly mentors = this.store.mentors;
  readonly filteredMentors = this.store.filteredMentors;
  readonly selectedMentor = this.store.selectedMentor;

  // Methods (giữ nguyên binding ở template)
  readonly setSearch = this.store.setSearch;
  readonly setTypeFilter = this.store.setTypeFilter;
  readonly openEdit = this.store.openEdit;
  readonly closePanel = this.store.closePanel;
  readonly requestDelete = this.store.requestDelete;
  readonly cancelDelete = this.store.cancelDelete;
  readonly confirmDelete = this.store.confirmDelete;

  // Form model
  mentorModel = linkedSignal({
    source: this.selectedMentor,
    computation: (mentor) => ({
      name: mentor?.name ?? '',
      slug: mentor?.slug ?? '',
      position: mentor?.position ?? '',
      avatarUrl: mentor?.avatarUrl ?? '',
      linkedinUrl: mentor?.linkedinUrl ?? '',
      bio: mentor?.bio ?? '',
      tags: mentor?.tags ? [...mentor.tags] : [],
      isActive: mentor?.isActive ?? true,
      sortOrder: mentor?.sortOrder ?? 0,
      typeYouth: mentor?.types?.includes('youth') ?? false,
      typeOrganization: mentor?.types?.includes('organization') ?? false,
    }),
  });

  mentorForm = form(this.mentorModel, (m) => {
    required(m.name, {
      message: this.transloco.translate('system.mentors.validation.nameRequired'),
    });
    required(m.slug, {
      message: this.transloco.translate('system.mentors.validation.slugRequired'),
    });
    required(m.position, {
      message: this.transloco.translate('system.mentors.validation.positionRequired'),
    });
  });

  // Ô nhập thẻ dạng chip: phần text đang gõ dở (chưa thành chip)
  readonly tagDraft = signal('');

  // Thêm thẻ từ phần đang gõ (hỗ trợ dán nhiều thẻ cách nhau bằng dấu phẩy); bỏ trùng (không phân biệt hoa/thường)
  addTagFromDraft() {
    const parts = this.tagDraft()
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    if (parts.length) {
      this.mentorModel.update((m) => {
        const existing = new Set(m.tags.map((t) => t.toLowerCase()));
        const merged = [...m.tags];
        for (const p of parts) {
          if (!existing.has(p.toLowerCase())) {
            existing.add(p.toLowerCase());
            merged.push(p);
          }
        }
        return { ...m, tags: merged };
      });
    }
    this.tagDraft.set('');
  }

  removeTag(index: number) {
    if (index < 0) return;
    this.mentorModel.update((m) => ({ ...m, tags: m.tags.filter((_, i) => i !== index) }));
  }

  onTagKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ',') {
      // Chặn submit form / ký tự dấu phẩy — thay vào đó thêm thẻ
      e.preventDefault();
      this.addTagFromDraft();
    } else if (e.key === 'Backspace' && this.tagDraft() === '') {
      this.removeTag(this.mentorModel().tags.length - 1);
    }
  }

  // Auto-generate slug from name
  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  onNameInput(value: string) {
    this.mentorModel.update((m) => ({
      ...m,
      name: value,
      slug: this.generateSlug(value),
    }));
  }

  // Mở chế độ tạo mới — reset model form rồi báo store đổi panel
  openCreate() {
    this.mentorModel.set({
      name: '',
      slug: '',
      position: '',
      avatarUrl: '',
      linkedinUrl: '',
      bio: '',
      tags: [],
      isActive: true,
      sortOrder: this.store.nextSortOrder(),
      typeYouth: false,
      typeOrganization: false,
    });
    this.store.openCreate();
  }

  // Save (create or update) — dựng DTO rồi ủy quyền cho store.
  // AMENDMENT 1: PATCH mentor chỉ còn field mentor thuần — lịch khả dụng quản lý
  // bằng CRUD riêng trong card <app-mentor-schedule> nhúng dưới form.
  async save(e: Event) {
    e.preventDefault();
    this.mentorForm().markAsTouched();
    if (this.mentorForm().invalid()) return;

    // Chốt nốt thẻ đang gõ dở (chưa nhấn Enter) trước khi lưu
    this.addTagFromDraft();

    const m = this.mentorModel();
    const types: MentorType[] = [];
    if (m.typeYouth) types.push('youth');
    if (m.typeOrganization) types.push('organization');

    const tags = m.tags;

    const dto: CreateMentorDto = {
      name: m.name,
      slug: m.slug,
      position: m.position,
      avatarUrl: m.avatarUrl || null,
      linkedinUrl: m.linkedinUrl || null,
      bio: m.bio || null,
      tags: tags.length ? tags : null,
      types: types.length ? types : null,
      isActive: m.isActive,
      sortOrder: Number(m.sortOrder),
    };

    await this.store.save(dto);
  }

  getTypeLabel(types: MentorType[] | null): string {
    if (!types || !types.length) return this.transloco.translate('system.mentors.types.unset');
    return types
      .map((t) =>
        this.transloco.translate(
          t === 'youth' ? 'system.mentors.types.youth' : 'system.mentors.types.organization',
        ),
      )
      .join(' & ');
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  }
}
