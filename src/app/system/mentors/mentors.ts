import { Component, inject, linkedSignal } from '@angular/core';
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
import type { CreateMentorDto, MentorType } from '@dearourcommunity/client';
import { MentorsStore } from './mentors.store';

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
  providers: [MentorsStore],
  templateUrl: './mentors.html',
  styleUrl: './mentors.css',
})
export default class MentorsComponent {
  private store = inject(MentorsStore);

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
      tagsInput: '',
      isActive: true,
      sortOrder: this.store.nextSortOrder(),
      typeYouth: false,
      typeOrganization: false,
    });
    this.store.openCreate();
  }

  // Save (create or update) — dựng DTO rồi ủy quyền cho store
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
