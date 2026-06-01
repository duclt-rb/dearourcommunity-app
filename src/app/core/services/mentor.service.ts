import { Injectable, inject } from '@angular/core';
import type { CreateMentorDto, UpdateMentorDto, MentorType } from '@dearourcommunity/client';
import { ClientService } from './client.service';

@Injectable({ providedIn: 'root' })
export class MentorService {
  private clientService = inject(ClientService);

  list(type?: MentorType) {
    return this.clientService.mentors.list(type);
  }

  get(idOrSlug: string) {
    return this.clientService.mentors.get(idOrSlug);
  }

  create(dto: CreateMentorDto) {
    return this.clientService.mentors.create(dto);
  }

  update(id: string, dto: UpdateMentorDto) {
    return this.clientService.mentors.update(id, dto);
  }

  delete(id: string) {
    return this.clientService.mentors.delete(id);
  }
}
