import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { Certificate, ProfileStore } from '../profile.store';

@Component({
  selector: 'app-profile-certificates',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './certificates.html',
  styleUrl: './certificates.css',
})
export default class CertificatesComponent {
  store = inject(ProfileStore);
  private readonly transloco = inject(TranslocoService);

  downloadCertificate(cert: Certificate) {
    alert(
      this.transloco.translate('profile.certificates.downloadAlert', {
        title: cert.courseTitle,
        code: cert.code,
      }),
    );
  }
}
