import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { EnrolledCourse, ProfileStore } from '../profile.store';
import { frontpageUrl } from '../../core/i18n/locale';

@Component({
  selector: 'app-profile-courses',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export default class CoursesComponent {
  store = inject(ProfileStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private readonly transloco = inject(TranslocoService);

  // Filters: all, in_progress, completed
  filter = signal<'all' | 'in_progress' | 'completed'>('all');

  filteredCourses = computed(() => {
    const list = this.store.enrolledCourses();
    const filterVal = this.filter();

    if (filterVal === 'in_progress') {
      return list.filter((c) => c.progress > 0 && c.progress < 100);
    } else if (filterVal === 'completed') {
      return list.filter((c) => c.progress === 100);
    }
    return list;
  });

  onAction(course: EnrolledCourse) {
    if (course.id) {
      window.location.href = frontpageUrl(`/courses/${course.id}/lessons`);
    } else {
      alert(this.transloco.translate('profile.courses.startAlert', { title: course.title }));
    }
  }

  viewCertificate() {
    this.router.navigate(['../certificates'], { relativeTo: this.route });
  }
}
