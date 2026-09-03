import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { EnrolledCourse, ProfileStore } from '../profile.store';

@Component({
  selector: 'app-profile-dashboard',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export default class DashboardComponent {
  store = inject(ProfileStore);
  private readonly transloco = inject(TranslocoService);

  inProgressCourses = computed(() =>
    this.store.enrolledCourses().filter((c) => c.progress > 0 && c.progress < 100),
  );

  continueCourse(course: EnrolledCourse) {
    alert(
      this.transloco.translate('profile.dashboard.continueAlert', {
        title: course.title,
        pct: course.progress,
      }),
    );
  }
}
