import { computed, inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { TranslocoService } from '@jsverse/transloco';

export interface Topic {
  id: string;
  title: string;
  isActive: boolean;
  completed: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  isActive: boolean;
  completed: boolean;
  topicCount: number;
  progressOffset: number;
  topics: Topic[];
}

export interface Step {
  id: string;
  title: string;
  isActive: boolean;
  completed: boolean;
}

export interface LessonPlayerState {
  courseId: string;
  lessonId: string;
  sidebarCollapsed: boolean;
  expandedChapters: Record<string, boolean>;
  chapters: Chapter[];
  steps: Step[];
  completedSteps: number;
  totalSteps: number;
  isPlaying: boolean;
  videoLoading: boolean;
  playbackSpeed: number;
  volume: number;
  currentTime: number;
  duration: number;
  showVolume: boolean;
  showQuality: boolean;
  selectedQuality: string;
  mobileDrawerOpen: boolean;
  reportDialogOpen: boolean;
  reportType: string;
  reportMessage: string;
}

// Mock content dịch tại thời điểm tạo store (translate() sync vì file dịch đã preload;
// đổi ngôn ngữ = reload app nên không cần re-translate).
function createInitialState(t: TranslocoService): LessonPlayerState {
  return {
    courseId: '',
    lessonId: '',
    sidebarCollapsed: false,
    expandedChapters: { '2': true },
    chapters: [
      {
        id: '1',
        title: t.translate('lesson.content.chapter1'),
        isActive: false,
        completed: true,
        topicCount: 0,
        progressOffset: 0,
        topics: [],
      },
      {
        id: '2',
        title: t.translate('lesson.content.chapter2'),
        isActive: true,
        completed: false,
        topicCount: 3,
        progressOffset: 31.42,
        topics: [
          {
            id: 'topic-2-1',
            title: t.translate('lesson.content.topicClimate'),
            isActive: false,
            completed: true,
          },
          {
            id: 'topic-2-2',
            title: t.translate('lesson.content.topicIntroEsg'),
            isActive: true,
            completed: false,
          },
          {
            id: 'topic-2-3',
            title: t.translate('lesson.content.topicResources'),
            isActive: false,
            completed: false,
          },
        ],
      },
      {
        id: '3',
        title: t.translate('lesson.content.chapter3'),
        isActive: false,
        completed: false,
        topicCount: 4,
        progressOffset: 62.83,
        topics: [
          {
            id: 'topic-3-1',
            title: t.translate('lesson.content.topicHumanRights'),
            isActive: false,
            completed: false,
          },
          {
            id: 'topic-3-2',
            title: t.translate('lesson.content.topicDiversity'),
            isActive: false,
            completed: false,
          },
          {
            id: 'topic-3-3',
            title: t.translate('lesson.content.topicSafety'),
            isActive: false,
            completed: false,
          },
          {
            id: 'topic-3-4',
            title: t.translate('lesson.content.topicCommunity'),
            isActive: false,
            completed: false,
          },
        ],
      },
      {
        id: '4',
        title: t.translate('lesson.content.chapter4'),
        isActive: false,
        completed: false,
        topicCount: 3,
        progressOffset: 62.83,
        topics: [
          {
            id: 'topic-4-1',
            title: t.translate('lesson.content.topicBoard'),
            isActive: false,
            completed: false,
          },
          {
            id: 'topic-4-2',
            title: t.translate('lesson.content.topicEthics'),
            isActive: false,
            completed: false,
          },
          {
            id: 'topic-4-3',
            title: t.translate('lesson.content.topicTransparency'),
            isActive: false,
            completed: false,
          },
        ],
      },
    ],
    steps: [
      {
        id: 'step-1',
        title: t.translate('lesson.content.stepOverview'),
        isActive: false,
        completed: true,
      },
      {
        id: 'step-2',
        title: t.translate('lesson.content.topicClimate'),
        isActive: false,
        completed: true,
      },
      {
        id: 'step-3',
        title: t.translate('lesson.content.topicIntroEsg'),
        isActive: true,
        completed: false,
      },
      {
        id: 'step-4',
        title: t.translate('lesson.content.topicResources'),
        isActive: false,
        completed: false,
      },
      {
        id: 'step-5',
        title: t.translate('lesson.content.stepFinalQuiz'),
        isActive: false,
        completed: false,
      },
    ],
    completedSteps: 2,
    totalSteps: 5,
    isPlaying: false,
    videoLoading: false,
    playbackSpeed: 1,
    volume: 1,
    currentTime: 0,
    duration: 0,
    showVolume: false,
    showQuality: false,
    selectedQuality: 'auto',
    mobileDrawerOpen: false,
    reportDialogOpen: false,
    reportType: '',
    reportMessage: '',
  };
}

function formatSeconds(timeInSeconds: number): string {
  const mins = Math.floor(timeInSeconds / 60);
  const secs = Math.floor(timeInSeconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export const LessonPlayerStore = signalStore(
  withState(() => createInitialState(inject(TranslocoService))),
  withComputed(
    (
      { completedSteps, totalSteps, currentTime, duration, chapters },
      transloco = inject(TranslocoService),
    ) => ({
      progressPct: computed(() => {
        if (totalSteps() === 0) return 0;
        return Math.round((completedSteps() / totalSteps()) * 100);
      }),
      lessonCompleted: computed(() => completedSteps() >= totalSteps()),
      currentTimeFormatted: computed(() => formatSeconds(currentTime())),
      durationFormatted: computed(() => formatSeconds(duration())),
      videoProgressPct: computed(() => {
        if (duration() === 0) return 0;
        return (currentTime() / duration()) * 100;
      }),
      activeTopicTitle: computed(() => {
        for (const chapter of chapters()) {
          const activeTopic = chapter.topics.find((t) => t.isActive);
          if (activeTopic) return activeTopic.title;
        }
        return transloco.translate('lesson.content.topicIntroEsg');
      }),
    }),
  ),
  withMethods((store) => ({
    setRouteParams(courseId: string, lessonId: string) {
      patchState(store, { courseId, lessonId });
    },

    toggleSidebar() {
      patchState(store, { sidebarCollapsed: !store.sidebarCollapsed() });
    },

    toggleChapter(chapterId: string) {
      const current = store.expandedChapters();
      patchState(store, {
        expandedChapters: {
          ...current,
          [chapterId]: !current[chapterId],
        },
      });
    },

    selectTopic(topicId: string, video: HTMLVideoElement | null) {
      patchState(store, (state) => ({
        isPlaying: false,
        chapters: state.chapters.map((ch) => ({
          ...ch,
          topics: ch.topics.map((t) => ({
            ...t,
            isActive: t.id === topicId,
          })),
        })),
      }));

      if (video) {
        video.currentTime = 0;
        video.pause();
      }
    },

    selectStep(stepId: string) {
      patchState(store, (state) => ({
        steps: state.steps.map((st) => ({
          ...st,
          isActive: st.id === stepId,
        })),
      }));
    },

    togglePlay(video: HTMLVideoElement | null) {
      if (!video) return;
      if (store.isPlaying()) {
        video.pause();
        patchState(store, { isPlaying: false });
      } else {
        video
          .play()
          .then(() => {
            patchState(store, { isPlaying: true });
          })
          .catch(() => void 0);
      }
    },

    onTimeUpdate(seconds: number) {
      patchState(store, { currentTime: seconds });
    },

    onLoadedMetadata(seconds: number) {
      patchState(store, { duration: seconds });
    },

    changeSpeed(video: HTMLVideoElement | null) {
      if (!video) return;
      const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
      const currentIdx = speeds.indexOf(store.playbackSpeed());
      const nextSpeed = speeds[(currentIdx + 1) % speeds.length];

      patchState(store, { playbackSpeed: nextSpeed });
      video.playbackRate = nextSpeed;
    },

    rewind(video: HTMLVideoElement | null) {
      if (!video) return;
      video.currentTime = Math.max(0, video.currentTime - 10);
    },

    forward(video: HTMLVideoElement | null) {
      if (!video) return;
      video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
    },

    seek(ratio: number, video: HTMLVideoElement | null) {
      if (!video) return;
      video.currentTime = ratio * (video.duration || 0);
    },

    changeVolume(volume: number, video: HTMLVideoElement | null) {
      patchState(store, { volume });
      if (video) {
        video.volume = volume;
      }
    },

    toggleVolumeSlider() {
      patchState(store, { showVolume: !store.showVolume() });
    },

    toggleQualityMenu() {
      patchState(store, { showQuality: !store.showQuality() });
    },

    selectQuality(quality: string) {
      patchState(store, { selectedQuality: quality, showQuality: false, videoLoading: true });
      setTimeout(() => {
        patchState(store, { videoLoading: false });
      }, 1000);
    },

    markComplete() {
      patchState(store, (state) => ({
        completedSteps: state.totalSteps,
        steps: state.steps.map((st) => ({
          ...st,
          completed: true,
        })),
      }));
    },

    openMobileDrawer() {
      patchState(store, { mobileDrawerOpen: true });
    },

    closeMobileDrawer() {
      patchState(store, { mobileDrawerOpen: false });
    },

    toggleReportDialog(show: boolean) {
      patchState(store, {
        reportDialogOpen: show,
        reportType: show ? store.reportType() : '',
        reportMessage: show ? store.reportMessage() : '',
      });
    },

    setReportType(type: string) {
      patchState(store, { reportType: type });
    },

    setReportMessage(msg: string) {
      patchState(store, { reportMessage: msg });
    },
  })),
);
