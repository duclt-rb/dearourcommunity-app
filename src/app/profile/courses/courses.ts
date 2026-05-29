import { Component, inject, signal, computed } from '@angular/core';
import { ProfileStateService, EnrolledCourse } from '../profile-state.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export default class CoursesComponent {
  state = inject(ProfileStateService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Filters: all, in_progress, completed
  filter = signal<'all' | 'in_progress' | 'completed'>('all');

  filteredCourses = computed(() => {
    const list = this.state.enrolledCourses();
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
