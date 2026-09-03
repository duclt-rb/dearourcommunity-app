import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { LessonPlayerStore } from './lesson-player.store';
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
import LogoComponent from '../../shared/logo/logo';

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
    LogoComponent,
    TranslocoPipe,
  ],
  providers: [LessonPlayerStore], // Provide the store at component level
  templateUrl: './lesson-player.html',
  styleUrl: './lesson-player.css',
})
export default class LessonPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private transloco = inject(TranslocoService);
  readonly store = inject(LessonPlayerStore);

  @ViewChild('videoPlayer') videoElement!: ElementRef<HTMLVideoElement>;

  // Signal aliases for template backward compatibility
  courseId = this.store.courseId;
  lessonId = this.store.lessonId;
  sidebarCollapsed = this.store.sidebarCollapsed;
  chapters = this.store.chapters;
  steps = this.store.steps;
  completedSteps = this.store.completedSteps;
  totalSteps = this.store.totalSteps;
  progressPct = this.store.progressPct;
  lessonCompleted = this.store.lessonCompleted;
  videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  isPlaying = signal(false);
  videoLoading = signal(false);
  playbackSpeed = this.store.playbackSpeed;
  volume = this.store.volume;
  showVolume = this.store.showVolume;
  showQuality = this.store.showQuality;
  selectedQuality = this.store.selectedQuality;
  currentTime = this.store.currentTime;
  duration = this.store.duration;
  currentTimeFormatted = this.store.currentTimeFormatted;
  durationFormatted = this.store.durationFormatted;
  videoProgressPct = this.store.videoProgressPct;
  activeTopicTitle = this.store.activeTopicTitle;
  mobileDrawerOpen = this.store.mobileDrawerOpen;
  reportDialogOpen = this.store.reportDialogOpen;
  reportType = this.store.reportType;
  reportMessage = this.store.reportMessage;

  private get video(): HTMLVideoElement | null {
    return this.videoElement?.nativeElement ?? null;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const cId = params.get('courseId') || 'esg-co-ban';
      const lId = params.get('lessonId') || 'chuong-2';
      this.store.setRouteParams(cId, lId);
    });
  }

  ngAfterViewInit() {
    if (this.video) {
      this.video.volume = this.volume();
    }
  }

  ngOnDestroy() {
    if (this.video && this.isPlaying()) {
      this.video.pause();
    }
  }

  toggleSidebar() {
    this.store.toggleSidebar();
  }

  toggleChapter(chapterId: string) {
    this.store.toggleChapter(chapterId);
  }

  isChapterExpanded(chapterId: string): boolean {
    return !!this.store.expandedChapters()[chapterId];
  }

  selectTopic(topicId: string) {
    this.store.selectTopic(topicId, this.video);
  }

  selectStep(stepId: string) {
    this.store.selectStep(stepId);
  }

  backToCourse() {
    this.router.navigate(['/profile/courses']);
  }

  prevLesson() {
    alert(this.transloco.translate('lesson.alerts.prevLesson'));
  }

  nextLesson() {
    alert(this.transloco.translate('lesson.alerts.nextLesson'));
  }

  markComplete() {
    this.store.markComplete();
  }

  togglePlay() {
    this.store.togglePlay(this.video);
  }

  onTimeUpdate() {
    if (this.video) {
      this.store.onTimeUpdate(this.video.currentTime);
    }
  }

  onLoadedMetadata() {
    if (this.video) {
      this.store.onLoadedMetadata(this.video.duration);
    }
  }

  changeSpeed() {
    this.store.changeSpeed(this.video);
  }

  rewind() {
    this.store.rewind(this.video);
  }

  forward() {
    this.store.forward(this.video);
  }

  seekVideo(event: MouseEvent) {
    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    this.store.seek(ratio, this.video);
  }

  toggleVolumeSlider() {
    this.store.toggleVolumeSlider();
  }

  changeVolume(event: MouseEvent) {
    const volumeTrack = event.currentTarget as HTMLElement;
    const rect = volumeTrack.getBoundingClientRect();
    const ratio = 1 - Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    this.store.changeVolume(ratio, this.video);
  }

  toggleQualityMenu() {
    this.store.toggleQualityMenu();
  }

  selectQuality(quality: string) {
    this.store.selectQuality(quality);
  }

  toggleFullscreen() {
    if (!this.video) return;
    if (!document.fullscreenElement) {
      this.video.requestFullscreen().catch(() => void 0);
    } else {
      document.exitFullscreen().catch(() => void 0);
    }
  }

  openMobileDrawer() {
    this.store.openMobileDrawer();
  }

  closeMobileDrawer() {
    this.store.closeMobileDrawer();
  }

  toggleReportDialog(show: boolean) {
    this.store.toggleReportDialog(show);
  }

  onReportTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.store.setReportType(select.value);
  }

  onReportMessageChange(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.store.setReportMessage(textarea.value);
  }

  closeReportDialogOnBackdrop(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('dialog-backdrop')) {
      this.store.toggleReportDialog(false);
    }
  }

  submitReport() {
    if (!this.store.reportType() || !this.store.reportMessage()) return;
    alert(
      this.transloco.translate('lesson.alerts.reportSuccess', {
        type: this.transloco.translate(`lesson.report.types.${this.store.reportType()}`),
        message: this.store.reportMessage(),
      }),
    );
    this.store.toggleReportDialog(false);
  }
}
