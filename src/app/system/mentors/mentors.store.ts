import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { TranslocoService } from '@jsverse/transloco';
import type { CreateMentorDto, Mentor, MentorType } from '@dearourcommunity/client';
import { MentorService } from '../../core/services/mentor.service';

// Chế độ panel chỉnh sửa: danh sách trống | tạo mới | sửa
type EditorMode = 'list' | 'create' | 'edit';

function toErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof Error) {
    return err.message || fallback;
  }
  console.error('Mentor action failed', err);
  return fallback;
}

const initialState = {
  // Dữ liệu
  mentors: [] as Mentor[],
  isLoading: false,
  loadError: null as string | null,

  // Tìm kiếm & lọc (client-side)
  searchQuery: '',
  activeTypeFilter: 'all' as 'all' | MentorType,

  // Panel chỉnh sửa
  mode: 'list' as EditorMode,
  selectedMentorId: null as string | null,

  // Trạng thái lưu (tạo / cập nhật)
  isSaving: false,
  saveSuccess: false,
  saveError: null as string | null,

  // Trạng thái xóa
  isDeleting: null as string | null,
  deleteError: null as string | null,
  confirmDeleteId: null as string | null,
};

export const MentorsStore = signalStore(
  withState(initialState),
  withComputed((store) => {
    // Lọc theo phân loại + tìm kiếm, sắp xếp theo thứ tự hiển thị
    const filteredMentors = computed(() => {
      const all = store.mentors();
      const query = store.searchQuery().toLowerCase().trim();
      const filter = store.activeTypeFilter();

      return all
        .filter((m) => {
          const matchesType =
            filter === 'all' || (m.types && m.types.includes(filter as MentorType));
          const matchesQuery =
            !query ||
            m.name.toLowerCase().includes(query) ||
            m.position.toLowerCase().includes(query) ||
            (m.tags && m.tags.some((t) => t.toLowerCase().includes(query)));
          return matchesType && matchesQuery;
        })
        .sort((a, b) => a.sortOrder - b.sortOrder);
    });

    // Mentor đang được chọn (nguồn cho form ở component)
    const selectedMentor = computed<Mentor | null>(() => {
      const list = store.mentors();
      const id = store.selectedMentorId();
      if (!list.length || !id) return null;
      return list.find((m) => m.id === id) ?? null;
    });

    // Thứ tự hiển thị mặc định cho mentor mới
    const nextSortOrder = computed(() => store.mentors().length + 1);

    return { filteredMentors, selectedMentor, nextSortOrder };
  }),
  withMethods((store, mentorService = inject(MentorService)) => {
    const transloco = inject(TranslocoService);

    async function load() {
      patchState(store, { isLoading: true, loadError: null });
      try {
        const items = await mentorService.list();
        patchState(store, { mentors: items });
      } catch (err) {
        patchState(store, {
          loadError: toErrorMessage(err, transloco.translate('system.mentors.errors.loadFailed')),
        });
      } finally {
        patchState(store, { isLoading: false });
      }
    }

    return {
      load,
      refresh: () => load(),

      // Tìm kiếm & lọc
      setSearch(value: string) {
        patchState(store, { searchQuery: value });
      },
      setTypeFilter(value: 'all' | MentorType) {
        patchState(store, { activeTypeFilter: value });
      },

      // Mở panel tạo mới (component tự reset model form)
      openCreate() {
        patchState(store, {
          selectedMentorId: null,
          mode: 'create',
          saveSuccess: false,
          saveError: null,
        });
      },
      // Mở panel chỉnh sửa một mentor (lịch khả dụng quản lý ở trang Lịch mentor riêng)
      openEdit(mentor: Mentor) {
        patchState(store, {
          selectedMentorId: mentor.id,
          mode: 'edit',
          saveSuccess: false,
          saveError: null,
        });
      },
      // Đóng panel, quay về danh sách
      closePanel() {
        patchState(store, {
          mode: 'list',
          selectedMentorId: null,
          saveSuccess: false,
          saveError: null,
        });
      },

      /** Lưu mentor (tạo mới hoặc cập nhật theo `mode`). */
      async save(dto: CreateMentorDto) {
        patchState(store, { isSaving: true, saveSuccess: false, saveError: null });
        try {
          if (store.mode() === 'create') {
            await mentorService.create(dto);
          } else {
            const mentor = store.selectedMentor();
            if (!mentor) return;
            await mentorService.update(mentor.id, dto);
          }

          patchState(store, { saveSuccess: true });
          await load();
          // Tự đóng panel sau khi báo thành công
          setTimeout(() => {
            patchState(store, { saveSuccess: false, mode: 'list', selectedMentorId: null });
          }, 1500);
        } catch (err) {
          patchState(store, {
            saveError: toErrorMessage(err, transloco.translate('system.mentors.errors.saveFailed')),
          });
        } finally {
          patchState(store, { isSaving: false });
        }
      },

      // Luồng xóa
      requestDelete(id: string) {
        patchState(store, { confirmDeleteId: id, deleteError: null });
      },
      cancelDelete() {
        patchState(store, { confirmDeleteId: null, deleteError: null });
      },
      async confirmDelete() {
        const id = store.confirmDeleteId();
        if (!id) return;

        patchState(store, { isDeleting: id, deleteError: null });
        try {
          await mentorService.delete(id);
          // Nếu đang sửa đúng mentor vừa xóa thì đóng panel
          const shouldClose = store.selectedMentorId() === id;
          patchState(store, {
            confirmDeleteId: null,
            ...(shouldClose ? { mode: 'list' as EditorMode, selectedMentorId: null } : {}),
          });
          await load();
        } catch (err) {
          patchState(store, {
            deleteError: toErrorMessage(
              err,
              transloco.translate('system.mentors.errors.deleteFailed'),
            ),
          });
        } finally {
          patchState(store, { isDeleting: null });
        }
      },
    };
  }),
  withHooks({
    onInit(store) {
      store.load();
    },
  }),
);
