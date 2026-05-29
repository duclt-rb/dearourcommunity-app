import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Topic {
  id: string;
  title: string;
  isActive: boolean;
  completed: boolean;
}

interface Chapter {
  id: string;
  title: string;
  isActive: boolean;
  completed: boolean;
  topicCount: number;
  progressOffset: number; // stroke-dashoffset cho vòng tiến trình tròn
  topics: Topic[];
}

interface Step {
  id: string;
  title: string;
  isActive: boolean;
  completed: boolean;
}

import {
  LucideBadgeCheck,
  LucideChevronDown,
  LucideMessageSquare,
  LucideChevronRight,
  LucideChevronLeft,
  LucideCheck,
  LucidePlay,
  LucidePause,
  LucideRotateCcw,
  LucideRotateCw,
  LucideVolumeX,
  LucideVolume1,
  LucideVolume2,
  LucideSettings,
  LucideMaximize,
  LucideCircle,
  LucideList,
  LucideX,
} from '@lucide/angular';

@Component({
  selector: 'app-lesson-player',
  standalone: true,
  imports: [
    LucideBadgeCheck,
    LucideChevronDown,
    LucideMessageSquare,
    LucideChevronRight,
    LucideChevronLeft,
    LucideCheck,
    LucidePlay,
    LucidePause,
    LucideRotateCcw,
    LucideRotateCw,
    LucideVolumeX,
    LucideVolume1,
    LucideVolume2,
    LucideSettings,
    LucideMaximize,
    LucideCircle,
    LucideList,
    LucideX,
  ],
  templateUrl: './lesson-player.html',
  styleUrl: './lesson-player.css',
})
export default class LessonPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  @ViewChild('videoPlayer') videoElement!: ElementRef<HTMLVideoElement>;

  courseId = signal<string>('');
  lessonId = signal<string>('');

  // Trạng thái hiển thị Sidebar
  sidebarCollapsed = signal(false);
  expandedChapters = signal<Set<string>>(new Set(['2']));

  // Trạng thái hoàn thành bài học
  completedSteps = signal(2);
  totalSteps = signal(5);
  progressPct = computed(() => {
    return Math.round((this.completedSteps() / this.totalSteps()) * 100);
  });
  lessonCompleted = computed(() => this.completedSteps() >= this.totalSteps());

  // Dữ liệu Chương & Chủ đề bài học
  chapters = signal<Chapter[]>([
    {
      id: '1',
      title: 'Chương 1: Tổng Quan Về ESG',
      isActive: false,
      completed: true,
      topicCount: 0,
      progressOffset: 0,
      topics: [],
    },
    {
      id: '2',
      title: 'Chương 2: Môi Trường (E)',
      isActive: true,
      completed: false,
      topicCount: 3,
      progressOffset: 31.42, // Đã hoàn thành 50% (dashoffset 31.42 / 62.83)
      topics: [
        {
          id: 'topic-2-1',
          title: 'Biến Đổi Khí Hậu & Phát Thải Carbon',
          isActive: false,
          completed: true,
        },
        { id: 'topic-2-2', title: 'Giới Thiệu Về ESG', isActive: true, completed: false },
        {
          id: 'topic-2-3',
          title: 'Quản Lý Tài Nguyên & Chất Thải',
          isActive: false,
          completed: false,
        },
      ],
    },
    {
      id: '3',
      title: 'Chương 3: Xã Hội (S)',
      isActive: false,
      completed: false,
      topicCount: 4,
      progressOffset: 62.83, // 0%
      topics: [
        {
          id: 'topic-3-1',
          title: 'Quyền Con Người Trong Chuỗi Cung Ứng',
          isActive: false,
          completed: false,
        },
        { id: 'topic-3-2', title: 'Đa Dạng & Hòa Nhập', isActive: false, completed: false },
        {
          id: 'topic-3-3',
          title: 'An Toàn & Sức Khỏe Nghề Nghiệp',
          isActive: false,
          completed: false,
        },
        { id: 'topic-3-4', title: 'Quan Hệ Cộng Đồng', isActive: false, completed: false },
      ],
    },
    {
      id: '4',
      title: 'Chương 4: Quản Trị (G)',
      isActive: false,
      completed: false,
      topicCount: 3,
      progressOffset: 62.83, // 0%
      topics: [
        { id: 'topic-4-1', title: 'Cấu Trúc Hội Đồng Quản Trị', isActive: false, completed: false },
        { id: 'topic-4-2', title: 'Đạo Đức Kinh Doanh', isActive: false, completed: false },
        {
          id: 'topic-4-3',
          title: 'Minh Bạch & Công Bố Thông Tin',
          isActive: false,
          completed: false,
        },
      ],
    },
  ]);

  // Danh sách các bước trong bài học
  steps = signal<Step[]>([
    { id: 'step-1', title: 'Tổng Quan Về ESG', isActive: false, completed: true },
    {
      id: 'step-2',
      title: 'Biến Đổi Khí Hậu & Phát Thải Carbon',
      isActive: false,
      completed: true,
    },
    { id: 'step-3', title: 'Giới Thiệu Về ESG', isActive: true, completed: false },
    { id: 'step-4', title: 'Quản Lý Tài Nguyên & Chất Thải', isActive: false, completed: false },
    { id: 'step-5', title: 'Bài Tập Cuối Chương', isActive: false, completed: false },
  ]);

  // Trình phát Video custom
  videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  isPlaying = signal(false);
  videoLoading = signal(false);
  playbackSpeed = signal(1);
  volume = signal(1); // 0 -> 1
  showVolume = signal(false);
  showQuality = signal(false);
  selectedQuality = signal('auto');

  // Quản lý thời lượng & vị trí phát
  currentTime = signal(0);
  duration = signal(0);

  // Định dạng hiển thị thời gian
  currentTimeFormatted = computed(() => this.formatTime(this.currentTime()));
  durationFormatted = computed(() => this.formatTime(this.duration()));
  videoProgressPct = computed(() => {
    if (this.duration() === 0) return 0;
    return (this.currentTime() / this.duration()) * 100;
  });

  // Tên chủ đề đang phát hiện tại
  activeTopicTitle = computed(() => {
    for (const chapter of this.chapters()) {
      const activeTopic = chapter.topics.find((t) => t.isActive);
      if (activeTopic) return activeTopic.title;
    }
    return 'Giới Thiệu Về ESG';
  });

  // Trạng thái Mobile Drawer & Dialog Báo cáo
  mobileDrawerOpen = signal(false);
  reportDialogOpen = signal(false);
  reportType = signal('');
  reportMessage = signal('');

  ngOnInit() {
    // Đọc courseId và lessonId từ router path
    this.route.paramMap.subscribe((params) => {
      this.courseId.set(params.get('courseId') || 'esg-co-ban');
      this.lessonId.set(params.get('lessonId') || 'chuong-2');
    });
  }

  ngAfterViewInit() {
    // Đồng bộ âm lượng ban đầu của thẻ video
    if (this.videoElement) {
      this.videoElement.nativeElement.volume = this.volume();
    }
  }

  ngOnDestroy() {
    // Tự động tạm dừng video nếu thoát khỏi trang
    if (this.videoElement && this.isPlaying()) {
      this.videoElement.nativeElement.pause();
    }
  }

  // Định dạng thời gian dạng mm:ss
  private formatTime(timeInSeconds: number): string {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Điều khiển Sidebar
  toggleSidebar() {
    this.sidebarCollapsed.set(!this.sidebarCollapsed());
  }

  toggleChapter(chapterId: string) {
    const currentSet = new Set(this.expandedChapters());
    if (currentSet.has(chapterId)) {
      currentSet.delete(chapterId);
    } else {
      currentSet.add(chapterId);
    }
    this.expandedChapters.set(currentSet);
  }

  isChapterExpanded(chapterId: string): boolean {
    return this.expandedChapters().has(chapterId);
  }

  selectTopic(topicId: string) {
    this.chapters.update((prevChapters) =>
      prevChapters.map((ch) => ({
        ...ch,
        topics: ch.topics.map((t) => ({
          ...t,
          isActive: t.id === topicId,
        })),
      })),
    );

    // Trả video về giây thứ 0 khi đổi bài học
    if (this.videoElement) {
      const video = this.videoElement.nativeElement;
      video.currentTime = 0;
      this.isPlaying.set(false);
      video.pause();
    }
  }

  selectStep(stepId: string) {
    this.steps.update((prevSteps) =>
      prevSteps.map((st) => ({
        ...st,
        isActive: st.id === stepId,
      })),
    );
  }

  backToCourse() {
    this.router.navigate(['/profile/courses']);
  }

  // Các nút Điều hướng E-learning
  prevLesson() {
    alert('Chuyển tới bài học trước');
  }

  nextLesson() {
    alert('Chuyển tới bài học tiếp theo');
  }

  markComplete() {
    this.completedSteps.set(this.totalSteps()); // Hoàn thành 100% các bước
    this.steps.update((prevSteps) =>
      prevSteps.map((st) => ({
        ...st,
        completed: true,
      })),
    );
  }

  // Custom Video Player Actions
  togglePlay() {
    if (!this.videoElement) return;
    const video = this.videoElement.nativeElement;
    if (this.isPlaying()) {
      video.pause();
    } else {
      video.play().catch(() => void 0);
    }
  }

  onTimeUpdate() {
    if (!this.videoElement) return;
    this.currentTime.set(this.videoElement.nativeElement.currentTime);
  }

  onLoadedMetadata() {
    if (!this.videoElement) return;
    this.duration.set(this.videoElement.nativeElement.duration);
  }

  changeSpeed() {
    if (!this.videoElement) return;
    const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIdx = speeds.indexOf(this.playbackSpeed());
    const nextSpeed = speeds[(currentIdx + 1) % speeds.length];
    this.playbackSpeed.set(nextSpeed);
    this.videoElement.nativeElement.playbackRate = nextSpeed;
  }

  rewind() {
    if (!this.videoElement) return;
    const video = this.videoElement.nativeElement;
    video.currentTime = Math.max(0, video.currentTime - 10);
  }

  forward() {
    if (!this.videoElement) return;
    const video = this.videoElement.nativeElement;
    video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
  }

  seekVideo(event: MouseEvent) {
    if (!this.videoElement) return;
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const video = this.videoElement.nativeElement;
    video.currentTime = ratio * (video.duration || 0);
  }

  toggleVolumeSlider() {
    this.showVolume.set(!this.showVolume());
  }

  changeVolume(event: MouseEvent) {
    if (!this.videoElement) return;
    const volumeTrack = event.currentTarget as HTMLElement;
    const rect = volumeTrack.getBoundingClientRect();
    const ratio = 1 - Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    this.volume.set(ratio);
    this.videoElement.nativeElement.volume = ratio;
  }

  toggleQualityMenu() {
    this.showQuality.set(!this.showQuality());
  }

  selectQuality(quality: string) {
    this.selectedQuality.set(quality);
    this.showQuality.set(false);

    // Giả lập trạng thái tải lại luồng phân giải
    this.videoLoading.set(true);
    setTimeout(() => {
      this.videoLoading.set(false);
    }, 1000);
  }

  toggleFullscreen() {
    if (!this.videoElement) return;
    const video = this.videoElement.nativeElement;
    if (!document.fullscreenElement) {
      video.requestFullscreen().catch(() => void 0);
    } else {
      document.exitFullscreen().catch(() => void 0);
    }
  }

  // Điều khiển Drawer Mobile & Dialog Báo cáo
  openMobileDrawer() {
    this.mobileDrawerOpen.set(true);
  }

  closeMobileDrawer() {
    this.mobileDrawerOpen.set(false);
  }

  toggleReportDialog(show: boolean) {
    this.reportDialogOpen.set(show);
    if (!show) {
      this.reportType.set('');
      this.reportMessage.set('');
    }
  }

  onReportTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.reportType.set(select.value);
  }

  onReportMessageChange(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.reportMessage.set(textarea.value);
  }

  closeReportDialogOnBackdrop(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('dialog-backdrop')) {
      this.toggleReportDialog(false);
    }
  }

  submitReport() {
    if (!this.reportType() || !this.reportMessage()) return;
    alert(
      `Báo cáo sự cố gửi thành công!\nLoại: ${this.reportType()}\nNội dung chi tiết: ${this.reportMessage()}`,
    );
    this.toggleReportDialog(false);
  }
}
