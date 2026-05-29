import { Injectable, inject } from '@angular/core';
import { ClientService } from './client.service';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private clientService = inject(ClientService);

  get course() {
    return this.clientService.course;
  }
}
