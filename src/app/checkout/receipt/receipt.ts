import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideCheck, LucideHome, LucideArrowRight, LucideCircleX } from '@lucide/angular';
import LogoComponent from '../../shared/logo/logo';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [RouterLink, LucideCheck, LucideHome, LucideArrowRight, LucideCircleX, LogoComponent],
  templateUrl: './receipt.html',
  styleUrl: './receipt.css',
})
export default class ReceiptComponent implements OnInit {
  private route = inject(ActivatedRoute);

  courseTitle = 'ESG Căn Bản Cho Người Mới Bắt Đầu';

  // Signals để quản lý tham số từ URL
  resultCode = signal<string | null>(null);
  orderId = signal<string | null>(null);
  transId = signal<string | null>(null);
  amount = signal<number>(500000);

  // Trạng thái thanh toán (Thành công nếu resultCode là '0')
  paymentSuccess = computed(() => this.resultCode() === '0');

  // Định dạng số tiền sử dụng locale tiếng Việt (ngăn cách hàng nghìn bằng dấu chấm)
  amountFormatted = computed(() => {
    return this.amount().toLocaleString('vi-VN');
  });

  // Trạng thái giả lập đang kích hoạt khóa học
  activating = signal(true);

  ngOnInit() {
    // Đăng ký lắng nghe sự thay đổi query parameters của URL
    this.route.queryParams.subscribe((params) => {
      if (params['resultCode'] !== undefined) {
        this.resultCode.set(params['resultCode']);
      } else {
        // Mặc định hiển thị thành công nếu truy cập trực tiếp để demo đẹp mắt
        this.resultCode.set('0');
      }

      this.orderId.set(params['orderId'] || 'MOMO20260529ABC123');
      this.transId.set(params['transId'] || '1283746529');

      const amt = Number(params['amount']);
      if (!isNaN(amt) && amt > 0) {
        this.amount.set(amt);
      } else {
        this.amount.set(500000);
      }

      // Kích hoạt hiệu ứng quay vòng giả lập tiến trình kích hoạt khóa học
      this.startActivationTimer();
    });
  }

  private startActivationTimer() {
    this.activating.set(true);
    setTimeout(() => {
      this.activating.set(false);
    }, 3000); // 3 giây kích hoạt xong
  }
}
