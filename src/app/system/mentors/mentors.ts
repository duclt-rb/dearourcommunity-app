import { Component, inject, signal, computed, resource, linkedSignal } from '@angular/core';
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
} from '@lucide/angular';
import { MentorService } from '../../core/services/mentor.service';
import type { Mentor, MentorType } from '@dearourcommunity/client';

@Component({
  selector: 'app-mentors',
  standalone: true,
  imports: [
    FormField,
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
  ],
  templateUrl: './mentors.html',
  styleUrl: './mentors.css',
})
export default class MentorsComponent {
  private mentorService = inject(MentorService);

  // Search
  searchQuery = signal('');

  // Mode: 'list' | 'create' | 'edit'
  mode = signal<'list' | 'create' | 'edit'>('list');

  // Active filter tab
  activeTypeFilter = signal<'all' | MentorType>('all');

  // Resource
  mentorsResource = resource({
    loader: () => this.mentorService.list(),
  });

  mentors = computed<Mentor[]>(() => this.mentorsResource.value() ?? []);

  // Filtered list
  filteredMentors = computed(() => {
    const all = this.mentors();
    const query = this.searchQuery().toLowerCase().trim();
    const filter = this.activeTypeFilter();

    return all
      .filter((m) => {
        const matchesType = filter === 'all' || (m.types && m.types.includes(filter as MentorType));
        const matchesQuery =
          !query ||
          m.name.toLowerCase().includes(query) ||
          m.position.toLowerCase().includes(query) ||
          (m.tags && m.tags.some((t) => t.toLowerCase().includes(query)));
        return matchesType && matchesQuery;
      })
      .sort((a, b) => a.sortOrder - b.sortOrder);
  });

  // Selected mentor
  selectedMentorId = signal<string | null>(null);

  selectedMentor = computed<Mentor | null>(() => {
    const list = this.mentors();
    const id = this.selectedMentorId();
    if (!list.length || !id) return null;
    return list.find((m) => m.id === id) ?? null;
  });

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
      tagsInput: mentor?.tags?.join(', ') ?? '',
      isActive: mentor?.isActive ?? true,
      sortOrder: mentor?.sortOrder ?? 0,
      typeYouth: mentor?.types?.includes('youth') ?? false,
      typeOrganization: mentor?.types?.includes('organization') ?? false,
    }),
  });

  mentorForm = form(this.mentorModel, (m) => {
    required(m.name, { message: 'Tên mentor là bắt buộc' });
    required(m.slug, { message: 'Slug là bắt buộc' });
    required(m.position, { message: 'Chức vụ là bắt buộc' });
  });

  // Status
  isSaving = signal(false);
  saveSuccess = signal(false);
  saveError = signal<string | null>(null);

  isDeleting = signal<string | null>(null);
  deleteError = signal<string | null>(null);
  confirmDeleteId = signal<string | null>(null);

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

  // Open create mode
  openCreate() {
    this.selectedMentorId.set(null);
    this.mentorModel.set({
      name: '',
      slug: '',
      position: '',
      avatarUrl: '',
      linkedinUrl: '',
      bio: '',
      tagsInput: '',
      isActive: true,
      sortOrder: this.mentors().length + 1,
      typeYouth: false,
      typeOrganization: false,
    });
    this.saveSuccess.set(false);
    this.saveError.set(null);
    this.mode.set('create');
  }

  // Open edit mode
  openEdit(mentor: Mentor) {
    this.selectedMentorId.set(mentor.id);
    this.saveSuccess.set(false);
    this.saveError.set(null);
    this.mode.set('edit');
  }

  // Close panel
  closePanel() {
    this.mode.set('list');
    this.selectedMentorId.set(null);
    this.saveSuccess.set(false);
    this.saveError.set(null);
  }

  // Save (create or update)
  async save(e: Event) {
    e.preventDefault();
    this.mentorForm().markAsTouched();
    if (this.mentorForm().invalid()) return;

    const m = this.mentorModel();
    const types: MentorType[] = [];
    if (m.typeYouth) types.push('youth');
    if (m.typeOrganization) types.push('organization');

    const tags = m.tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const dto = {
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

    this.isSaving.set(true);
    this.saveSuccess.set(false);
    this.saveError.set(null);

    try {
      if (this.mode() === 'create') {
        await this.mentorService.create(dto);
      } else {
        const mentor = this.selectedMentor();
        if (!mentor) return;
        await this.mentorService.update(mentor.id, dto);
      }

      this.saveSuccess.set(true);
      await this.mentorsResource.reload();
      setTimeout(() => {
        this.saveSuccess.set(false);
        this.closePanel();
      }, 1500);
    } catch (err) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : 'Có lỗi xảy ra.';
      this.saveError.set(errMsg);
    } finally {
      this.isSaving.set(false);
    }
  }

  // Delete
  requestDelete(id: string) {
    this.confirmDeleteId.set(id);
  }

  cancelDelete() {
    this.confirmDeleteId.set(null);
    this.deleteError.set(null);
  }

  async confirmDelete() {
    const id = this.confirmDeleteId();
    if (!id) return;

    this.isDeleting.set(id);
    this.deleteError.set(null);

    try {
      await this.mentorService.delete(id);
      this.confirmDeleteId.set(null);
      if (this.selectedMentorId() === id) this.closePanel();
      await this.mentorsResource.reload();
    } catch (err) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : 'Không thể xóa mentor.';
      this.deleteError.set(errMsg);
    } finally {
      this.isDeleting.set(null);
    }
  }

  getTypeLabel(types: MentorType[] | null): string {
    if (!types || !types.length) return 'Chưa phân loại';
    return types.map((t) => (t === 'youth' ? 'Cá nhân' : 'Doanh nghiệp')).join(' & ');
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
