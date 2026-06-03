import { computed, inject } from '@angular/core';
import { OrgMembership, PackageType } from '@dearourcommunity/client';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AuthService } from '../core/services/auth.service';
import { CourseService } from '../core/services/course.service';

function decodeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'");
}

export interface EnrolledCourse {
  id: number;
  title: string;
  slug: string;
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
  isOrgMember: false,
  organizations: [] as OrgMembership[],
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
  withComputed(
    ({ enrolledCourses, certificates, firstName, lastName, packageType, isOrgMember }) => ({
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
      showPlansTab: computed(() => !isOrgMember()),
    }),
  ),
  withMethods(
    (store, authService = inject(AuthService), courseService = inject(CourseService)) => ({
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

          const activePackage =
            user.packages && user.packages.length > 0
              ? [...user.packages].sort((a, b) => b.tier - a.tier)[0]
              : null;
          // `/me` trả về `label` (tên gói hiển thị); fallback về `name` nếu null.
          const packageLabel = activePackage ? (activePackage.label ?? activePackage.name) : null;
          const isMember = user.organizations?.some((org) => org.role === 'member') ?? false;

          const enrolled = await courseService.findMyEnrolled();
          const enrolledCourses = enrolled.map((c) => ({
            id: c.id,
            title: decodeHtml(c.title),
            slug: (c as unknown as { slug?: string }).slug || '',
            progress: c.progress,
            thumbnail:
              c.thumbnail ||
              'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&auto=format&fit=crop&q=80',
            lastActive:
              c.progress === 100 ? 'Hoàn thành' : c.progress > 0 ? 'Đang học' : 'Chưa học',
            category: decodeHtml(c.category?.name || 'Kỹ năng'),
          }));

          patchState(store, {
            userId: user.id,
            email: user.email,
            packageName: packageLabel,
            packageId: activePackage?.id ?? null,
            packageType: activePackage?.type ?? null,
            isOrgMember: isMember,
            organizations: user.organizations || [],
            firstName: fName,
            lastName: lName,
            phone: ph,
            avatarUrl: avatar,
            enrolledCourses,
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
          certificates: [
            {
              id: 'cert-102',
              courseTitle: 'Tư Tư Duy Thiết Kế (Design Thinking) Cho Người Bắt Đầu',
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
    }),
  ),
  withHooks({
    onInit(store) {
      store.initializeMockData();
    },
  }),
);
