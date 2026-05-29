import { Component, inject } from '@angular/core';
import { ProfileStateService, Certificate } from '../profile-state.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-certificates',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './certificates.html',
  styleUrl: './certificates.css',
})
export default class CertificatesComponent {
  state = inject(ProfileStateService);

  downloadCertificate(cert: Certificate) {
    alert(`Đang chuẩn bị tải chứng chỉ khóa học: ${cert.courseTitle}\nMã số: ${cert.code}`);
  }
}
