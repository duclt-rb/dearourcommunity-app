import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnrolledCourse, ProfileStore } from '../profile.store';

@Component({
  selector: 'app-profile-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export default class CoursesComponent {
  store = inject(ProfileStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

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
    alert(`Bắt đầu học/học tiếp khóa: ${course.title}`);
  }

  viewCertificate() {
    this.router.navigate(['../certificates'], { relativeTo: this.route });
  }
}
