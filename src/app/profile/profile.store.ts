import { inject, computed } from '@angular/core';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
  withHooks,
} from '@ngrx/signals';
import { AuthService } from '../core/services/auth.service';
import { PackageType } from '@dearourcommunity/client';

export interface EnrolledCourse {
  id: number;
  title: string;
  progress: number; // 0 to 100
  thumbnail: string;
  lastActive: string;
  category: string;
}

export interface Certificate {
  id: string;
  courseTitle: string;
  issueDate: string;
  code: string;
  downloadUrl: string;
}

const PROFILE_DATA_KEY = 'doc:profile_extra';

const initialState = {
  userId: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  avatarUrl: null as string | null,
  packageName: null as string | null,
  packageId: null as string | null,
  packageType: null as PackageType | null,
  enrolledCourses: [] as EnrolledCourse[],
  certificates: [] as Certificate[],
  activeTab: 'dashboard' as
    | 'dashboard'
    | 'courses'
    | 'certificates'
    | 'plans'
    | 'edit-profile'
    | 'password'
    | 'organization',
};

// 1. Define the ProfileStore using @ngrx/signals
export const ProfileStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ enrolledCourses, certificates, firstName, lastName, packageType }) => ({
    stats: computed(() => {
      const courses = enrolledCourses();
      const completed = courses.filter((c) => c.progress === 100).length;
      const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100).length;
      const certsCount = certificates().length;

      return {
        completed,
        inProgress,
        certificates: certsCount,
      };
    }),
    displayName: computed(() => {
      const first = firstName().trim();
      const last = lastName().trim();
      if (!first && !last) return 'Học viên';
      return `${first} ${last}`.trim();
    }),
    isOrganization: computed(() => packageType() === 'organization'),
  })),
  withMethods((store, authService = inject(AuthService)) => ({
    async loadProfile() {
      try {
        const user = await authService.me();

        let fName = '';
        let lName = '';
        let ph = '';
        let avatar = null as string | null;

        // Load additional persisted profile fields from localStorage
        const saved = localStorage.getItem(`${PROFILE_DATA_KEY}:${user.id}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          fName = parsed.firstName || '';
          lName = parsed.lastName || '';
          ph = parsed.phone || '';
          avatar = parsed.avatarUrl || null;
        } else {
          // Fallback to splitting displayName from backend
          const parts = user.displayName.split(' ');
          if (parts.length > 1) {
            lName = parts[0];
            fName = parts.slice(1).join(' ');
          } else {
            fName = user.displayName;
          }
        }

        patchState(store, {
          userId: user.id,
          email: user.email,
          packageName: user.package?.name ?? null,
          packageId: user.packageId ?? null,
          packageType: user.package?.type ?? null,
          firstName: fName,
          lastName: lName,
          phone: ph,
          avatarUrl: avatar,
        });
      } catch (err) {
        console.error('Failed to load profile in state service', err);
        throw err;
      }
    },

    updateProfile(firstName: string, lastName: string, phone: string, avatarUrl: string | null) {
      patchState(store, { firstName, lastName, phone, avatarUrl });

      const id = store.userId();
      if (id) {
        localStorage.setItem(
          `${PROFILE_DATA_KEY}:${id}`,
          JSON.stringify({ firstName, lastName, phone, avatarUrl }),
        );
      }
    },

    initializeMockData() {
      patchState(store, {
        enrolledCourses: [
          {
            id: 101,
            title: 'Kỹ Năng Phản Biện & Giải Quyết Vấn Đề',
            progress: 65,
            thumbnail:
              'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&auto=format&fit=crop&q=80',
            lastActive: '2 giờ trước',
            category: 'Kỹ năng xã hội',
          },
          {
            id: 102,
            title: 'Tư Duy Thiết Kế (Design Thinking) Cho Người Bắt Đầu',
            progress: 100,
            thumbnail:
              'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80',
            lastActive: '3 ngày trước',
            category: 'Sáng tạo & Đổi mới',
          },
          {
            id: 103,
            title: 'Xây Dựng Thương Hiệu Cá Nhân Trên Mạng Xã Hội',
            progress: 0,
            thumbnail:
              'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
            lastActive: 'Chưa học',
            category: 'Phát triển sự nghiệp',
          },
          {
            id: 104,
            title: 'Kỹ Năng Giao Tiếp Thuyết Phục Trong Công Việc',
            progress: 30,
            thumbnail:
              'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
            lastActive: '5 ngày trước',
            category: 'Kỹ năng làm việc',
          },
          {
            id: 105,
            title: 'Quản Lý Thời Gian & Năng Suất Cá Nhân Hiệu Quả',
            progress: 100,
            thumbnail:
              'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80',
            lastActive: '1 tuần trước',
            category: 'Phát triển cá nhân',
          },
        ],
        certificates: [
          {
            id: 'cert-102',
            courseTitle: 'Tư Duy Thiết Kế (Design Thinking) Cho Người Bắt Đầu',
            issueDate: '26/05/2026',
            code: 'DOC-DT-2026-9874',
            downloadUrl: '#',
          },
          {
            id: 'cert-105',
            courseTitle: 'Quản Lý Thời Gian & Năng Suất Cá Nhân Hiệu Quả',
            issueDate: '15/04/2026',
            code: 'DOC-TM-2026-3482',
            downloadUrl: '#',
          },
        ],
      });
    },
  })),
  withHooks({
    onInit(store) {
      store.initializeMockData();
    },
  }),
);
