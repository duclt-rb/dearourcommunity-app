import { Injectable, inject } from '@angular/core';
import type {
  CreateAvailabilitySlotsDto,
  CreateMentorDto,
  MentorType,
  SlotRangeQuery,
  UpdateAvailabilitySlotDto,
  UpdateMentorDto,
} from '@dearourcommunity/client';
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

  // ── Lịch khả dụng (CR-001 AMENDMENT 1 — CRUD riêng, admin) ──

  /** MỌI slot trong khoảng (kể cả tắt / đã chiếm / đã qua giờ). */
  manageAvailabilitySlots(mentorId: string, query?: SlotRangeQuery) {
    return this.clientService.mentors.manageAvailabilitySlots(mentorId, query);
  }

  /** Thêm bulk + nhân bản N tuần; slot trùng (mentor, giờ) bị skip. */
  createAvailabilitySlots(mentorId: string, dto: CreateAvailabilitySlotsDto) {
    return this.clientService.mentors.createAvailabilitySlots(mentorId, dto);
  }

  /** 400 nếu slot đã bị booking chiếm hoặc trùng giờ. */
  updateAvailabilitySlot(mentorId: string, slotId: string, dto: UpdateAvailabilitySlotDto) {
    return this.clientService.mentors.updateAvailabilitySlot(mentorId, slotId, dto);
  }

  /** 400 nếu slot đã bị booking chiếm. */
  deleteAvailabilitySlot(mentorId: string, slotId: string) {
    return this.clientService.mentors.deleteAvailabilitySlot(mentorId, slotId);
  }
}
