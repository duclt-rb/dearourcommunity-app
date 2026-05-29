import { Injectable, inject, signal, computed } from '@angular/core';
import { ClientService } from '../core/client.service';

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

@Injectable({ providedIn: 'root' })
export class ProfileStateService {
  private api = inject(ClientService);

  // Core User state
  userId = signal('');
  email = signal('');
  firstName = signal('');
  lastName = signal('');
  phone = signal('');
  avatarUrl = signal<string | null>(null);
  packageName = signal<string | null>(null);
  packageId = signal<string | null>(null);

  // Enrolled Courses & Certificates State
  enrolledCourses = signal<EnrolledCourse[]>([]);
  certificates = signal<Certificate[]>([]);

  // Active Tab
  activeTab = signal<
    'dashboard' | 'courses' | 'certificates' | 'plans' | 'edit-profile' | 'password'
  >('dashboard');

  // Computed Stats
  stats = computed(() => {
    const courses = this.enrolledCourses();
    const completed = courses.filter((c) => c.progress === 100).length;
    const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100).length;
    const certsCount = this.certificates().length;

    return {
      completed,
      inProgress,
      certificates: certsCount,
    };
  });

  // Display Name
  displayName = computed(() => {
    const first = this.firstName().trim();
    const last = this.lastName().trim();
    if (!first && !last) return 'Học viên';
    return `${first} ${last}`.trim();
  });

  constructor() {
    this.initializeMockData();
  }

  async loadProfile() {
    try {
      const user = await this.api.auth.me();
      this.userId.set(user.id);
      this.email.set(user.email);
      this.packageName.set(user.package?.name ?? null);
      this.packageId.set(user.packageId ?? null);

      // Load additional persisted profile fields from localStorage
      const saved = localStorage.getItem(`${PROFILE_DATA_KEY}:${user.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.firstName.set(parsed.firstName || '');
        this.lastName.set(parsed.lastName || '');
        this.phone.set(parsed.phone || '');
        this.avatarUrl.set(parsed.avatarUrl || null);
      } else {
        // Fallback to splitting displayName from backend
        const parts = user.displayName.split(' ');
        if (parts.length > 1) {
          this.lastName.set(parts[0]);
          this.firstName.set(parts.slice(1).join(' '));
        } else {
          this.firstName.set(user.displayName);
        }
      }
    } catch (err) {
      console.error('Failed to load profile in state service', err);
    }
  }

  updateProfile(firstName: string, lastName: string, phone: string, avatarUrl: string | null) {
    this.firstName.set(firstName);
    this.lastName.set(lastName);
    this.phone.set(phone);
    this.avatarUrl.set(avatarUrl);

    // Persist to local storage
    const id = this.userId();
    if (id) {
      localStorage.setItem(
        `${PROFILE_DATA_KEY}:${id}`,
        JSON.stringify({ firstName, lastName, phone, avatarUrl }),
      );
    }
  }

  private initializeMockData() {
    // Core Mock Courses matching my-profile.html design
    this.enrolledCourses.set([
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
    ]);

    // Mock Certificates
    this.certificates.set([
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
    ]);
  }
}
