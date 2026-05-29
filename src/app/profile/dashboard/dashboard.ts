import { Component, inject, computed } from '@angular/core';
import { ProfileStateService, EnrolledCourse } from '../profile-state.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export default class DashboardComponent {
  state = inject(ProfileStateService);

  inProgressCourses = computed(() =>
    this.state.enrolledCourses().filter((c) => c.progress > 0 && c.progress < 100),
  );

  continueCourse(course: EnrolledCourse) {
    alert(`Tiếp tục học khóa: ${course.title} (${course.progress}% hoàn tất)`);
  }
}
