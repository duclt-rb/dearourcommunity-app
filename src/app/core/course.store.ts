import { computed } from '@angular/core';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
  withHooks,
} from '@ngrx/signals';

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  price: number;
}

export interface CourseState {
  courses: Course[];
  selectedCourseId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  selectedCourseId: null,
  isLoading: false,
  error: null,
};

export const CourseStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ courses, selectedCourseId }) => ({
    selectedCourse: computed(() => {
      const id = selectedCourseId();
      return id ? (courses().find((c) => c.id === id) ?? null) : null;
    }),
    categories: computed(() => {
      const list = courses();
      const set = new Set(list.map((c) => c.category));
      return Array.from(set);
    }),
  })),
  withMethods((store) => ({
    async loadCourses() {
      patchState(store, { isLoading: true, error: null });
      try {
        await new Promise((resolve) => setTimeout(resolve, 600));

        patchState(store, {
          courses: [
            {
              id: 'critical-thinking',
              title: 'Kỹ Năng Phản Biện & Giải Quyết Vấn Đề',
              description:
                'Học cách tư duy phản biện đa chiều và các phương pháp giải quyết vấn đề hiệu quả.',
              thumbnail:
                'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&auto=format&fit=crop&q=80',
              category: 'Kỹ năng xã hội',
              price: 499000,
            },
            {
              id: 'design-thinking',
              title: 'Tư Duy Thiết Kế (Design Thinking) Cho Người Bắt Đầu',
              description:
                'Quy trình 5 bước tư duy thiết kế để tạo ra các giải pháp sáng tạo hướng tới người dùng.',
              thumbnail:
                'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80',
              category: 'Sáng tạo & Đổi mới',
              price: 599000,
            },
            {
              id: 'personal-branding',
              title: 'Xây Dựng Thương Hiệu Cá Nhân Trên Mạng Xã Hội',
              description:
                'Từng bước định vị bản thân, sản xuất nội dung và thu hút cộng đồng mục tiêu.',
              thumbnail:
                'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
              category: 'Phát triển sự nghiệp',
              price: 699000,
            },
            {
              id: 'communication-skills',
              title: 'Kỹ Năng Giao Tiếp Thuyết Phục Trong Công Việc',
              description:
                'Làm chủ ngôn từ, giọng nói và ngôn ngữ cơ thể để đạt hiệu quả giao tiếp tối đa.',
              thumbnail:
                'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
              category: 'Kỹ năng làm việc',
              price: 399000,
            },
            {
              id: 'time-management',
              title: 'Quản Lý Thời Gian & Năng Suất Cá Nhân Hiệu Quả',
              description:
                'Phương pháp Pomodoro, Eisenhower Matrix để x5 năng suất làm việc của bạn.',
              thumbnail:
                'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80',
              category: 'Phát triển cá nhân',
              price: 299000,
            },
          ],
          isLoading: false,
        });
      } catch (err) {
        patchState(store, {
          error: err instanceof Error ? err.message : 'Không thể tải danh sách khóa học',
          isLoading: false,
        });
      }
    },

    selectCourse(courseId: string | null) {
      patchState(store, { selectedCourseId: courseId });
    },
  })),
  withHooks({
    onInit(store) {
      store.loadCourses();
    },
  }),
);
