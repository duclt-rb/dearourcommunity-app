// TỰ SINH bởi tools/csi-readiness/build-data.py từ file Excel nguồn (CR-023) — KHÔNG sửa tay.
// Muốn đổi nội dung: sửa nguồn (extract.py / tr/chunk-*.en.json) rồi chạy lại script.
import type { CsiToolkitConfig } from '../csi.types';

export const CSI_TOOLKITS_VI: Record<string, CsiToolkitConfig> = {
  'csi-2026-sme': {
    id: 'csi-2026-sme',
    guide: {
      title: 'Đánh giá mức độ sẵn sàng ESG',
      subtitle: 'Doanh nghiệp bạn đang ở đâu và còn thiếu gì?',
      audience: 'Dành cho doanh nghiệp nhỏ và siêu nhỏ',
      brand: 'Dear Our Community',
      byline: 'ESG Knowledge Hub và Cộng đồng Thực hành ESG',
      sections: [
        {
          title: 'Công cụ này giúp gì cho bạn?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Nhiều doanh nghiệp nhỏ biết ESG đang trở nên quan trọng - khách hàng hỏi, ngân hàng hỏi, đối tác nước ngoài hỏi - nhưng không biết mình đang đứng ở đâu và nên bắt đầu từ việc gì. Công cụ này được làm ra để trả lời đúng ba câu hỏi đó:',
            },
            {
              kind: 'list',
              items: [
                '1. Doanh nghiệp mình đã sẵn sàng tới đâu?',
                '2. Còn thiếu những gì?',
                '3. Nên làm việc gì trước?',
              ],
            },
          ],
        },
        {
          title: 'Đây không phải bài thi',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Công cụ không chấm điểm và không xếp hạng. Bạn chỉ cần trả lời "Có" hoặc "Chưa có" cho từng việc. Với các câu hỏi về số liệu như doanh thu hay tỷ lệ đóng bảo hiểm, bạn chọn một khoảng có sẵn - không cần con số chính xác.',
            },
            {
              kind: 'paragraph',
              text: 'Kết quả cho biết doanh nghiệp đang ở một trong ba mức, cho từng lĩnh vực và cho toàn doanh nghiệp:',
            },
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'SẴN SÀNG',
                  text: 'Đã có đủ toàn bộ các việc bắt buộc theo pháp luật. Doanh nghiệp có nền tảng vững để đi tiếp - làm thêm các việc nâng cao, hoặc tham gia các chương trình đánh giá doanh nghiệp bền vững.',
                },
                {
                  label: 'GẦN SẴN SÀNG',
                  text: 'Đã có phần lớn các việc bắt buộc, còn một số khoảng cách cụ thể cần lấp. Thường chỉ cần vài tháng tập trung.',
                },
                {
                  label: 'CHƯA SẴN SÀNG',
                  text: 'Còn nhiều việc bắt buộc chưa có. Đây là điểm xuất phát rất phổ biến - và danh sách khoảng cách sẽ cho bạn biết chính xác cần bắt đầu từ đâu.',
                },
              ],
            },
          ],
        },
        {
          title: 'Bốn bước sử dụng',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Bước 1',
                  text: 'Điền trang "Thông tin doanh nghiệp". Mất khoảng 3 phút.',
                },
                {
                  label: 'Bước 2',
                  text: 'Trả lời 105 câu hỏi trong bốn phần: Số liệu kinh doanh và vận hành, Quản trị, Môi trường, Người lao động và xã hội. Mất khoảng 45 - 60 phút. Không cần làm một lần - có thể lưu lại và làm tiếp.',
                },
                {
                  label: 'Bước 3',
                  text: 'Xem trang "Kết quả sẵn sàng" để biết mức sẵn sàng của từng lĩnh vực và của toàn doanh nghiệp.',
                },
                {
                  label: 'Bước 4',
                  text: 'Mở trang "Khoảng cách cần lấp", lọc theo mức Ưu tiên, phân công người phụ trách và hạn hoàn thành cho từng việc.',
                },
              ],
            },
          ],
        },
        {
          title: 'Cách trả lời',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Có',
                  text: 'Doanh nghiệp đang làm việc này VÀ có giấy tờ chứng minh. Mỗi câu hỏi có gợi ý cần có giấy tờ gì.',
                },
                {
                  label: 'Chưa có',
                  text: 'Chưa làm, đang làm dở, hoặc đã làm nhưng chưa có giấy tờ chứng minh. Ghi tiến độ thực tế vào ô Ghi chú nếu muốn.',
                },
                {
                  label: 'Không áp dụng',
                  text: 'Việc này không phát sinh ở doanh nghiệp bạn - ví dụ không có bếp ăn tập thể, không nhập khẩu phế liệu. Câu này sẽ không được tính.',
                },
                {
                  label: 'Câu hỏi số liệu',
                  text: 'Chọn khoảng phù hợp với năm gần nhất. Nếu chưa có số liệu, chọn "Chưa có số liệu" - đây cũng là một khoảng cách cần lấp.',
                },
              ],
            },
          ],
        },
        {
          title: 'Hai loại việc',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Bắt buộc',
                  text: 'Việc gắn với quy định pháp luật Việt Nam. Quyết định mức sẵn sàng của doanh nghiệp.',
                },
                {
                  label: 'Nâng cao',
                  text: 'Việc doanh nghiệp làm thêm để giảm rủi ro và tạo lợi thế. Là giá trị cộng thêm, không ảnh hưởng tới mức sẵn sàng.',
                },
              ],
            },
          ],
        },
        {
          title: 'Một lời khuyên',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Hãy trả lời thật. Mục đích là nhìn thấy khoảng cách thật để biết nên làm gì, không phải để có một kết quả đẹp. Một việc trả lời "Có" mà không có giấy tờ chứng minh sẽ không giúp gì khi khách hàng, ngân hàng hay đoàn đánh giá hỏi tới.',
            },
          ],
        },
        {
          title: 'Cần người đồng hành?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Cộng đồng Thực hành ESG của Dear Our Community là nơi các doanh nghiệp nhỏ và vừa Việt Nam cùng nhau lấp những khoảng cách này - chia sẻ mẫu tài liệu, kinh nghiệm thực tế và gỡ vướng cùng chuyên gia. Tìm hiểu thêm tại dearourcommunity.asia hoặc liên hệ crystal@dearourcommunity.com.',
            },
          ],
        },
      ],
      footer:
        'Công cụ được xây dựng dựa trên Bộ chỉ số Doanh nghiệp bền vững CSI 2026 (phiên bản dành cho doanh nghiệp nhỏ và siêu nhỏ) do VCCI và VBCSD ban hành. Mỗi câu hỏi tương ứng với một chỉ số CSI - xem mã và nội dung gốc ở hai cột thu gọn cuối mỗi trang câu hỏi.',
    },
    profile: {
      title: 'Thông tin doanh nghiệp',
      timeHint: 'Mất khoảng 3 phút',
      fields: [
        {
          id: 'f5',
          label: 'Tên doanh nghiệp',
        },
        {
          id: 'f6',
          label: 'Ngành nghề kinh doanh chính',
        },
        {
          id: 'f7',
          label: 'Lĩnh vực hoạt động',
          options: [
            {
              label: 'Sản xuất, chế biến',
            },
            {
              label: 'Xây dựng, thương mại, dịch vụ',
            },
          ],
        },
        {
          id: 'f8',
          label: 'Số lao động có đóng bảo hiểm xã hội',
          options: [
            {
              label: 'Dưới 10 người',
            },
            {
              label: 'Từ 10 đến 50 người',
            },
            {
              label: 'Từ 51 đến 100 người',
            },
            {
              label: 'Trên 100 người',
            },
          ],
        },
        {
          id: 'f9',
          label: 'Nhóm doanh nghiệp theo tiêu chí môi trường (Điều 28 Luật Bảo vệ môi trường 2020)',
          options: [
            {
              label: 'Nhóm 2',
            },
            {
              label: 'Nhóm 3',
            },
            {
              label: 'Nhóm 4',
            },
            {
              label: 'Chưa xác định',
            },
          ],
        },
        {
          id: 'f10',
          label: 'Thị trường chính',
          options: [
            {
              label: 'Trong nước',
            },
            {
              label: 'Xuất khẩu',
            },
            {
              label: 'Cả trong nước và xuất khẩu',
            },
          ],
        },
        {
          id: 'f11',
          label: 'Doanh nghiệp đã từng tham gia Chương trình CSI chưa?',
          options: [
            {
              label: 'Đã tham gia',
            },
            {
              label: 'Chưa tham gia',
            },
          ],
        },
        {
          id: 'f12',
          label: 'Đây là lần đánh giá thứ mấy?',
          options: [
            {
              label: 'Lần thứ nhất',
            },
            {
              label: 'Lần thứ hai',
            },
            {
              label: 'Lần thứ ba trở lên',
            },
          ],
        },
        {
          id: 'f13',
          label: 'Người thực hiện đánh giá',
        },
        {
          id: 'f14',
          label: 'Chức danh',
        },
        {
          id: 'f15',
          label: 'Ngày đánh giá',
          type: 'date',
        },
      ],
      infoBlocks: [
        {
          title: 'Nhóm doanh nghiệp theo tiêu chí môi trường',
          text: 'Nhóm 2: quy mô, công suất trung bình, có nguy cơ tác động xấu đến môi trường, hoặc quy mô nhỏ nhưng có yếu tố nhạy cảm về môi trường. Nhóm 3: quy mô, công suất nhỏ, có nguy cơ gây ô nhiễm môi trường phải được quản lý, xử lý theo quy định. Nhóm 4: không có nguy cơ tác động xấu đến môi trường. Nhóm quyết định doanh nghiệp cần giấy phép môi trường hay chỉ cần đăng ký môi trường. Nếu chưa rõ, chọn "Chưa xác định" - và đó là việc nên làm rõ đầu tiên.',
        },
        {
          title: 'Công cụ này có phù hợp với doanh nghiệp bạn không?',
          text: 'Công cụ dành cho doanh nghiệp nhỏ và siêu nhỏ theo Nghị định 80/2021/NĐ-CP. Nếu doanh nghiệp có trên 100 lao động đóng bảo hiểm xã hội, hoặc doanh thu trên 50 tỷ đồng (sản xuất, xây dựng) hay trên 100 tỷ đồng (thương mại, dịch vụ), nhiều khả năng doanh nghiệp đã thuộc nhóm vừa - hãy dùng bộ công cụ dành cho doanh nghiệp vừa và lớn.',
        },
      ],
    },
    parts: [
      {
        no: 1,
        title: 'Phần 1 - Số liệu kinh doanh và vận hành',
        subtitle: 'Kinh tế, người lao động và môi trường qua các con số',
        note: 'Chọn khoảng phù hợp với số liệu năm gần nhất. Để tham gia các chương trình đánh giá như CSI, doanh nghiệp cần số liệu và chứng từ của 3 năm liên tiếp.',
        groups: [
          {
            title: 'Kinh tế',
            questions: [
              {
                num: '1.1',
                text: 'Doanh thu năm gần nhất của doanh nghiệp ở mức nào?',
                kind: 'core',
                evidence: 'Báo cáo tài chính 3 năm; tờ khai quyết toán thuế TNDN.',
                code: 'I 1',
                csiText: 'Tổng doanh thu',
                answer: 'range',
                options: [
                  {
                    label: 'Dưới 3 tỷ đồng',
                  },
                  {
                    label: 'Từ 3 đến 10 tỷ đồng',
                  },
                  {
                    label: 'Từ 10 đến 50 tỷ đồng',
                  },
                  {
                    label: 'Từ 50 đến 100 tỷ đồng',
                  },
                  {
                    label: 'Trên 100 tỷ đồng',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Trích số liệu doanh thu 3 năm từ báo cáo tài chính. Nếu doanh thu giảm, chuẩn bị phần giải trình nguyên nhân và biện pháp khắc phục.',
              },
              {
                num: '1.2',
                text: 'Năm gần nhất doanh nghiệp lãi hay lỗ (lợi nhuận trước thuế)?',
                kind: 'core',
                evidence:
                  'Báo cáo kết quả hoạt động kinh doanh 3 năm; tờ khai quyết toán thuế TNDN.',
                code: 'I 3',
                csiText: 'Lợi nhuận trước thuế',
                answer: 'range',
                options: [
                  {
                    label: 'Lỗ',
                    tag: 'attention',
                  },
                  {
                    label: 'Hòa vốn',
                  },
                  {
                    label: 'Lãi dưới 500 triệu đồng',
                  },
                  {
                    label: 'Lãi từ 500 triệu đến 2 tỷ đồng',
                  },
                  {
                    label: 'Lãi trên 2 tỷ đồng',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Trích lợi nhuận trước thuế 3 năm, bảo đảm khớp với báo cáo tài chính và tờ khai thuế.',
              },
              {
                num: '1.3',
                text: 'Tỷ suất lợi nhuận trên vốn chủ sở hữu (ROE) năm gần nhất?',
                kind: 'core',
                evidence: 'Bảng tính ROE kèm công thức; bảng cân đối kế toán 3 năm.',
                code: 'I 4',
                csiText: 'Tỷ suất lợi nhuận trên vốn (ROE)',
                answer: 'range',
                options: [
                  {
                    label: 'Âm',
                    tag: 'attention',
                  },
                  {
                    label: 'Từ 0 đến 5%',
                  },
                  {
                    label: 'Từ 5 đến 15%',
                  },
                  {
                    label: 'Trên 15%',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Tính ROE = Lợi nhuận sau thuế / Vốn chủ sở hữu bình quân. Ghi rõ công thức đã dùng để người khác đối chiếu được.',
              },
              {
                num: '1.4',
                text: 'Tỷ suất lợi nhuận trên tổng tài sản (ROA) năm gần nhất?',
                kind: 'core',
                evidence: 'Bảng tính ROA kèm công thức; bảng cân đối kế toán 3 năm.',
                code: 'I 5',
                csiText: 'Tỷ suất lợi nhuận trên tài sản (ROA)',
                answer: 'range',
                options: [
                  {
                    label: 'Âm',
                    tag: 'attention',
                  },
                  {
                    label: 'Từ 0 đến 3%',
                  },
                  {
                    label: 'Từ 3 đến 10%',
                  },
                  {
                    label: 'Trên 10%',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action: 'Tính ROA = Lợi nhuận sau thuế / Tổng tài sản bình quân.',
              },
              {
                num: '1.5',
                text: 'Tỷ suất lợi nhuận trên doanh thu (ROS) năm gần nhất?',
                kind: 'core',
                evidence: 'Bảng tính ROS kèm công thức; báo cáo kết quả kinh doanh 3 năm.',
                code: 'I 6',
                csiText: 'Tỷ suất lợi nhuận trên doanh thu (ROS)',
                answer: 'range',
                options: [
                  {
                    label: 'Âm',
                    tag: 'attention',
                  },
                  {
                    label: 'Từ 0 đến 3%',
                  },
                  {
                    label: 'Từ 3 đến 10%',
                  },
                  {
                    label: 'Trên 10%',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action: 'Tính ROS = Lợi nhuận sau thuế / Doanh thu thuần.',
              },
              {
                num: '1.6',
                text: 'Tổng số tiền doanh nghiệp đã nộp ngân sách Nhà nước năm gần nhất (thuế, phí, lệ phí)?',
                kind: 'core',
                evidence: 'Xác nhận nghĩa vụ thuế của cơ quan thuế; chứng từ nộp ngân sách 3 năm.',
                code: 'I 7',
                csiText: 'Tổng nộp ngân sách Nhà nước',
                answer: 'range',
                options: [
                  {
                    label: 'Dưới 100 triệu đồng',
                  },
                  {
                    label: 'Từ 100 đến 500 triệu đồng',
                  },
                  {
                    label: 'Từ 500 triệu đến 2 tỷ đồng',
                  },
                  {
                    label: 'Trên 2 tỷ đồng',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Tổng hợp toàn bộ các khoản đã nộp ngân sách: thuế TNDN, GTGT, phí, lệ phí, tiền thuê đất...',
              },
              {
                num: '1.7',
                text: 'Năm gần nhất doanh nghiệp chi bao nhiêu cho các chương trình hỗ trợ cộng đồng, xã hội?',
                kind: 'advanced',
                evidence:
                  'Danh mục chương trình kèm ngân sách; chứng từ chi; thư cảm ơn hoặc xác nhận của đơn vị tiếp nhận.',
                code: 'I 8',
                csiText:
                  'Ngân sách hỗ trợ cho cộng đồng và xã hội thông qua các chương trình/sáng kiến',
                answer: 'range',
                options: [
                  {
                    label: 'Chưa chi',
                    tag: 'missing',
                  },
                  {
                    label: 'Dưới 50 triệu đồng',
                  },
                  {
                    label: 'Từ 50 đến 200 triệu đồng',
                  },
                  {
                    label: 'Trên 200 triệu đồng',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Thống kê ngân sách chi cho cộng đồng theo từng năm và từng chương trình. Ghi rõ số người hưởng lợi.',
              },
            ],
          },
          {
            title: 'Xã hội',
            questions: [
              {
                num: '1.8',
                text: 'Tỷ lệ nữ trong số cán bộ quản lý cấp trung (từ phó trưởng phòng trở lên)?',
                kind: 'core',
                evidence:
                  'Sơ đồ tổ chức; danh sách cán bộ quản lý theo giới tính; quyết định bổ nhiệm.',
                code: 'I 12',
                csiText: 'Tỷ lệ cán bộ nữ là quản lý cấp trung (từ phó trưởng phòng trở lên)',
                answer: 'range',
                options: [
                  {
                    label: 'Không có nữ',
                  },
                  {
                    label: 'Dưới 30%',
                  },
                  {
                    label: 'Từ 30 đến 50%',
                  },
                  {
                    label: 'Trên 50%',
                  },
                  {
                    label: 'Không áp dụng - không có cấp quản lý trung gian',
                    tag: 'na',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Tính tỷ lệ nữ giữ vị trí quản lý từ phó trưởng phòng trở lên. Nếu tỷ lệ thấp, đưa kế hoạch cải thiện vào kế hoạch kinh doanh.',
              },
              {
                num: '1.9',
                text: 'Tỷ lệ nữ trong ban giám đốc hoặc hội đồng thành viên, hội đồng quản trị?',
                kind: 'core',
                evidence: 'Điều lệ; danh sách thành viên ban lãnh đạo; quyết định bổ nhiệm.',
                code: 'I 13',
                csiText: 'Tỷ lệ lãnh đạo nữ trong ban giám đốc, hội đồng quản trị',
                answer: 'range',
                options: [
                  {
                    label: 'Không có nữ',
                  },
                  {
                    label: 'Dưới 30%',
                  },
                  {
                    label: 'Từ 30 đến 50%',
                  },
                  {
                    label: 'Trên 50%',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action: 'Tính tỷ lệ nữ trong ban lãnh đạo cao nhất của doanh nghiệp.',
              },
              {
                num: '1.10',
                text: 'Thu nhập bình quân mỗi tháng của người lao động (gồm lương, phụ cấp, thưởng)?',
                kind: 'core',
                evidence: 'Bảng lương 3 năm; báo cáo tổng quỹ lương; tờ khai thuế TNCN.',
                code: 'I 14',
                csiText: 'Thu nhập bình quân theo tháng của người lao động',
                answer: 'range',
                options: [
                  {
                    label: 'Dưới 5 triệu đồng',
                    tag: 'attention',
                  },
                  {
                    label: 'Từ 5 đến 8 triệu đồng',
                  },
                  {
                    label: 'Từ 8 đến 12 triệu đồng',
                  },
                  {
                    label: 'Từ 12 đến 20 triệu đồng',
                  },
                  {
                    label: 'Trên 20 triệu đồng',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Tính thu nhập bình quân tháng của toàn bộ người lao động. So sánh với mức lương tối thiểu vùng đang áp dụng tại địa bàn.',
              },
              {
                num: '1.11',
                text: 'Thu nhập bình quân của lao động nữ so với lao động nam?',
                kind: 'core',
                evidence: 'Bảng lương phân tích theo giới tính; quy chế trả lương.',
                code: 'I 15',
                csiText: 'Thu nhập bình quân tháng của lao động theo giới tính (nam/nữ)',
                answer: 'range',
                options: [
                  {
                    label: 'Nữ thấp hơn nam trên 20%',
                    tag: 'attention',
                  },
                  {
                    label: 'Nữ thấp hơn nam từ 5 đến 20%',
                  },
                  {
                    label: 'Tương đương - chênh dưới 5%',
                  },
                  {
                    label: 'Nữ cao hơn nam',
                  },
                  {
                    label: 'Không áp dụng - chỉ có lao động một giới',
                    tag: 'na',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Tách thu nhập bình quân theo giới tính. Nếu chênh lệch lớn, chuẩn bị giải trình theo cơ cấu vị trí công việc.',
              },
              {
                num: '1.12',
                text: 'Tỷ lệ người lao động được đóng đủ bảo hiểm bắt buộc (trên tổng số người thuộc diện phải đóng)?',
                kind: 'core',
                evidence: 'Thông báo kết quả đóng BHXH (mẫu C12-TS); xác nhận không nợ BHXH.',
                code: 'I 16',
                csiText:
                  'Tỷ lệ người lao động được đóng các loại bảo hiểm bắt buộc tính trên tổng số lao động thuộc diện phải đóng',
                answer: 'range',
                options: [
                  {
                    label: '100%',
                  },
                  {
                    label: 'Từ 90% đến dưới 100%',
                    tag: 'fix',
                  },
                  {
                    label: 'Từ 70% đến dưới 90%',
                    tag: 'fix',
                  },
                  {
                    label: 'Dưới 70%',
                    tag: 'fix',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Rà soát danh sách người thuộc diện phải đóng và đóng bổ sung cho người còn thiếu. Mục tiêu bắt buộc là 100%.',
              },
              {
                num: '1.13',
                text: 'Mỗi người lao động được đào tạo bình quân bao nhiêu giờ một năm?',
                kind: 'core',
                evidence: 'Kế hoạch đào tạo năm; danh sách điểm danh; bảng tổng hợp giờ đào tạo.',
                code: 'I 17',
                csiText:
                  'Số giờ đào tạo/người lao động trong diện cần được đào tạo hàng năm (định hướng và hội nhập; tuân thủ quy định; kỹ năng mềm; nghiệp vụ; khác)',
                answer: 'range',
                options: [
                  {
                    label: 'Chưa tổ chức đào tạo',
                    tag: 'missing',
                  },
                  {
                    label: 'Dưới 8 giờ',
                  },
                  {
                    label: 'Từ 8 đến 24 giờ',
                  },
                  {
                    label: 'Trên 24 giờ',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Tổng hợp số giờ đào tạo theo 5 nhóm: định hướng hội nhập, tuân thủ quy định, kỹ năng mềm, nghiệp vụ, khác.',
              },
              {
                num: '1.14',
                text: 'Trong 3 năm gần nhất đã xảy ra bao nhiêu vụ tai nạn, sự cố lao động?',
                kind: 'core',
                evidence:
                  'Sổ theo dõi tai nạn lao động; biên bản điều tra (nếu có); báo cáo an toàn, vệ sinh lao động định kỳ.',
                code: 'I 19',
                csiText: 'Số tai nạn, số sự cố lao động xảy ra trong kỳ báo cáo',
                answer: 'range',
                options: [
                  {
                    label: 'Không xảy ra',
                  },
                  {
                    label: 'Từ 1 đến 2 vụ',
                    tag: 'attention',
                  },
                  {
                    label: 'Từ 3 vụ trở lên',
                    tag: 'attention',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Thống kê số vụ trong cả 3 năm. Nếu không xảy ra vụ nào, vẫn cần báo cáo an toàn định kỳ để chứng minh. Nếu có, kiểm tra đã điều tra và khắc phục nguyên nhân chưa.',
              },
            ],
          },
          {
            title: 'Môi trường',
            questions: [
              {
                num: '1.15',
                text: 'Doanh nghiệp đã thực hiện sáng kiến giảm rác thải nhựa nào chưa?',
                kind: 'advanced',
                evidence:
                  'Kế hoạch hoặc biên bản triển khai; hình ảnh; chứng từ đầu tư; sổ theo dõi khối lượng.',
                code: 'I 22',
                csiText:
                  'Hoạt động, sáng kiến được thực hiện liên quan đến giảm thiểu rác thải nhựa (số lượng; mức đầu tư; lượng nhựa được tái chế)',
                answer: 'range',
                options: [
                  {
                    label: 'Chưa có',
                    tag: 'missing',
                  },
                  {
                    label: 'Có 1 sáng kiến',
                  },
                  {
                    label: 'Có từ 2 sáng kiến trở lên',
                  },
                  {
                    label: 'Không áp dụng - không sử dụng nhựa đáng kể',
                    tag: 'na',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Bắt đầu từ việc dễ nhất: thay bao bì nhựa dùng một lần, thu hồi bao bì, bỏ chai nhựa tại văn phòng. Ghi lại mức đầu tư và khối lượng nhựa giảm được.',
              },
              {
                num: '1.16',
                text: 'Chất thải rắn của doanh nghiệp được phân loại và chuyển giao cho đơn vị có giấy phép ở mức nào?',
                kind: 'core',
                evidence:
                  'Chứng từ chuyển giao chất thải; hợp đồng với đơn vị xử lý có giấy phép; sổ chủ nguồn thải.',
                code: 'I 23',
                csiText:
                  'Lượng chất thải rắn được phân loại, thu gom, lưu trữ, vận chuyển, xử lý (sinh hoạt; công nghiệp thông thường; công nghiệp nguy hại)',
                answer: 'range',
                options: [
                  {
                    label: 'Toàn bộ',
                  },
                  {
                    label: 'Phần lớn',
                    tag: 'fix',
                  },
                  {
                    label: 'Một phần nhỏ',
                    tag: 'fix',
                  },
                  {
                    label: 'Chưa thực hiện',
                    tag: 'missing',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Ghi khối lượng chất thải theo 3 nhóm (sinh hoạt, công nghiệp thông thường, nguy hại) cho từng năm, khớp với chứng từ chuyển giao. Toàn bộ chất thải phải được chuyển giao đúng quy định.',
              },
              {
                num: '1.17',
                text: 'Chi phí trực tiếp cho quản lý chất thải rắn mỗi năm?',
                kind: 'core',
                evidence: 'Hợp đồng dịch vụ xử lý chất thải; hóa đơn, chứng từ thanh toán.',
                code: 'I 24',
                csiText: 'Chi phí trực tiếp liên quan tới quản lý chất thải rắn',
                answer: 'range',
                options: [
                  {
                    label: 'Dưới 10 triệu đồng',
                  },
                  {
                    label: 'Từ 10 đến 50 triệu đồng',
                  },
                  {
                    label: 'Từ 50 đến 200 triệu đồng',
                  },
                  {
                    label: 'Trên 200 triệu đồng',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action: 'Tổng hợp phí thu gom, xử lý, vận chuyển và chi phí khu lưu giữ chất thải.',
              },
              {
                num: '1.18',
                text: 'Nhờ các biện pháp tiết kiệm, doanh nghiệp giảm được bao nhiêu phần trăm năng lượng tiêu thụ?',
                kind: 'advanced',
                evidence:
                  'Bảng so sánh tiêu thụ điện, nhiên liệu trước và sau; hóa đơn điện; báo cáo kiểm toán năng lượng (nếu có).',
                code: 'I 27',
                csiText:
                  'Tỷ lệ năng lượng tiết kiệm thông qua việc áp dụng các biện pháp sử dụng năng lượng tiết kiệm và hiệu quả',
                answer: 'range',
                options: [
                  {
                    label: 'Chưa có biện pháp',
                    tag: 'missing',
                  },
                  {
                    label: 'Dưới 5%',
                  },
                  {
                    label: 'Từ 5 đến 10%',
                  },
                  {
                    label: 'Trên 10%',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Lắp đèn LED, biến tần, bảo trì thiết bị, đặt quy định tắt thiết bị khi không dùng - rồi so sánh hóa đơn trước và sau.',
              },
              {
                num: '1.19',
                text: 'Doanh nghiệp theo dõi lượng nước tiêu thụ trên mỗi đơn vị sản phẩm, dịch vụ ở mức nào?',
                kind: 'core',
                evidence:
                  'Hóa đơn nước hoặc giấy phép khai thác nước; sổ ghi đồng hồ nước; số liệu sản lượng.',
                code: 'I 31',
                csiText: 'Mức tiêu thụ nước điển hình theo đơn vị sản phẩm/dịch vụ',
                answer: 'range',
                options: [
                  {
                    label: 'Đã tính theo tháng',
                  },
                  {
                    label: 'Đã tính theo năm',
                  },
                  {
                    label: 'Chỉ có hóa đơn nước tổng, chưa tính theo sản phẩm',
                    tag: 'missing',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Ghi số đồng hồ nước theo tháng và chia cho sản lượng để ra lượng nước trên một đơn vị sản phẩm. Lắp đồng hồ theo khu vực nếu có thể.',
              },
              {
                num: '1.20',
                text: 'Nhờ các biện pháp tiết kiệm, doanh nghiệp giảm được bao nhiêu phần trăm lượng nước sử dụng?',
                kind: 'core',
                evidence: 'Bảng so sánh lượng nước trước và sau; mô tả biện pháp tiết kiệm nước.',
                code: 'I 32',
                csiText:
                  'Tỷ lệ nước tiêu thụ tiết kiệm thông qua việc áp dụng các biện pháp tăng cường tiết kiệm và hiệu quả sử dụng nước',
                answer: 'range',
                options: [
                  {
                    label: 'Chưa có biện pháp',
                    tag: 'missing',
                  },
                  {
                    label: 'Dưới 5%',
                  },
                  {
                    label: 'Từ 5 đến 10%',
                  },
                  {
                    label: 'Trên 10%',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Áp dụng biện pháp tiết kiệm nước (sửa rò rỉ, vòi tiết kiệm, tái sử dụng nước rửa) và so sánh số liệu trước, sau.',
              },
              {
                num: '1.21',
                text: 'Tỷ lệ nước thải được thu gom, xử lý đạt quy chuẩn trước khi thải ra môi trường?',
                kind: 'core',
                evidence:
                  'Kết quả quan trắc nước thải định kỳ; giấy phép môi trường; hợp đồng đấu nối hoặc xử lý nước thải.',
                code: 'I 33',
                csiText:
                  'Tỷ lệ nước thải được thu gom xử lý đạt tiêu chuẩn, quy chuẩn kỹ thuật trước khi thải ra môi trường',
                answer: 'range',
                options: [
                  {
                    label: '100%',
                  },
                  {
                    label: 'Từ 80% đến dưới 100%',
                    tag: 'fix',
                  },
                  {
                    label: 'Dưới 80%',
                    tag: 'fix',
                  },
                  {
                    label: 'Không áp dụng - chỉ có nước thải sinh hoạt đấu nối hệ thống chung',
                    tag: 'na',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Bảo đảm toàn bộ nước thải được xử lý đạt quy chuẩn hoặc đấu nối vào hệ thống xử lý tập trung. Mục tiêu bắt buộc là 100%.',
              },
              {
                num: '1.22',
                text: 'Doanh nghiệp đã thực hiện sáng kiến tái tạo, phục hồi nguồn nước nào chưa?',
                kind: 'advanced',
                evidence:
                  'Kế hoạch và biên bản triển khai; hình ảnh; chứng từ đầu tư; xác nhận của địa phương.',
                code: 'I 35',
                csiText:
                  'Hoạt động, sáng kiến được thực hiện liên quan đến tái tạo, phục hồi nguồn nước (số lượng; mức đầu tư; lượng nước được tái tạo)',
                answer: 'range',
                options: [
                  {
                    label: 'Chưa có',
                    tag: 'missing',
                  },
                  {
                    label: 'Có 1 sáng kiến',
                  },
                  {
                    label: 'Có từ 2 sáng kiến trở lên',
                  },
                  {
                    label: 'Chưa có số liệu',
                    tag: 'missing',
                  },
                ],
                action:
                  'Ví dụ: thu gom nước mưa, trồng cây đầu nguồn, tham gia phục hồi ao hồ, kênh mương tại địa phương.',
              },
            ],
          },
        ],
      },
      {
        no: 2,
        title: 'Phần 2 - Quản trị doanh nghiệp',
        subtitle: 'Cách doanh nghiệp lập kế hoạch, quản lý rủi ro và lắng nghe khách hàng',
        note: 'Trả lời "Có" khi doanh nghiệp đang làm VÀ có giấy tờ chứng minh. Mỗi câu hỏi có gợi ý cần có giấy tờ gì.',
        groups: [
          {
            title: 'Cam kết phát triển bền vững',
            questions: [
              {
                num: '2.1',
                text: 'Kế hoạch kinh doanh năm đã có ít nhất một chỉ tiêu về môi trường và một chỉ tiêu về xã hội, có con số cụ thể, chưa?',
                kind: 'core',
                evidence:
                  'Kế hoạch kinh doanh năm có chữ ký phê duyệt, thể hiện rõ chỉ tiêu môi trường và xã hội.',
                code: 'G 1',
                csiText:
                  'Kế hoạch kinh doanh của doanh nghiệp bao gồm các chỉ tiêu về môi trường, xã hội',
                answer: 'yesno',
                action:
                  'Đưa ít nhất một chỉ tiêu môi trường (vd: giảm 10% điện tiêu thụ) và một chỉ tiêu xã hội (vd: 100% lao động được huấn luyện an toàn) vào kế hoạch kinh doanh năm, do lãnh đạo phê duyệt.',
              },
            ],
          },
          {
            title: 'Quản trị rủi ro',
            questions: [
              {
                num: '2.2',
                text: 'Doanh nghiệp đã có quy định (dù ngắn gọn) về cách nhận diện, xử lý rủi ro trong sản xuất, kinh doanh và phân công rõ ai phụ trách chưa?',
                kind: 'core',
                evidence:
                  'Quy định quản trị rủi ro; danh sách rủi ro chính; biên bản rà soát rủi ro định kỳ.',
                code: 'G 5',
                csiText:
                  'Xây dựng chính sách, quy trình, cơ cấu tổ chức thực hiện quản trị rủi ro trong hoạt động liên quan đến sản xuất/kinh doanh',
                answer: 'yesno',
                action:
                  'Viết quy định 2 - 3 trang: ai nhận diện rủi ro, ai quyết định cách xử lý, bao lâu rà soát một lần. Lập danh sách 5 - 10 rủi ro chính, trong đó có rủi ro thiên tai và mất nguồn cung.',
              },
            ],
          },
          {
            title: 'Sự hài lòng của khách hàng',
            questions: [
              {
                num: '2.3',
                text: 'Doanh nghiệp có kênh thu thập ý kiến khách hàng và đã khảo sát mức độ hài lòng (ít nhất 1 lần/năm) để cải tiến chưa?',
                kind: 'core',
                evidence: 'Bộ câu hỏi khảo sát; báo cáo kết quả; biên bản cải tiến sau khảo sát.',
                code: 'G 12',
                csiText:
                  'Xây dựng chính sách, quy trình, kênh thông tin và thực hiện thu thập ý kiến, khảo sát, đánh giá sự hài lòng của khách hàng về sản phẩm/dịch vụ để thực hiện các cải tiến',
                answer: 'yesno',
                action:
                  'Lập biểu mẫu khảo sát ngắn (Google Forms là đủ), gửi khách hàng mỗi năm một lần, ghi lại kết quả và việc đã cải tiến.',
              },
              {
                num: '2.4',
                text: 'Doanh nghiệp đã có quy trình tiếp nhận và xử lý khiếu nại, góp ý, tố giác sai phạm từ khách hàng và các bên liên quan chưa?',
                kind: 'core',
                evidence:
                  'Quy trình xử lý khiếu nại; sổ theo dõi khiếu nại và kết quả xử lý; bằng chứng công bố kênh tiếp nhận.',
                code: 'G 13',
                csiText:
                  'Thực hiện quy trình xử lý khiếu nại, góp ý, tố cáo sai phạm của khách hàng và các bên liên quan',
                answer: 'yesno',
                action:
                  'Ban hành quy trình ngắn: kênh tiếp nhận, thời hạn phản hồi, người xử lý, cách bảo vệ người tố giác. Lập sổ theo dõi từng vụ.',
              },
            ],
          },
          {
            title: 'Chính sách đặc thù',
            questions: [
              {
                num: '2.5',
                text: 'Doanh nghiệp đã có quy định phòng chống quấy rối tình dục nơi làm việc (trong nội quy lao động hoặc chính sách riêng) chưa?',
                kind: 'core',
                evidence:
                  'Điều khoản trong nội quy lao động hoặc chính sách riêng; tài liệu và danh sách tập huấn.',
                code: 'G 17',
                csiText:
                  'Xây dựng và thực hiện chính sách/điều khoản quy định về phòng chống quấy rối tình dục nơi công sở',
                answer: 'yesno',
                action:
                  'Đưa điều khoản phòng chống quấy rối tình dục vào nội quy lao động, kèm kênh khiếu nại kín và phổ biến cho toàn bộ nhân viên.',
              },
              {
                num: '2.6',
                text: 'Doanh nghiệp đã có cam kết không buôn bán, tiêu thụ, sử dụng động vật hoang dã và sản phẩm từ động vật hoang dã (kể cả khi tiếp khách, làm quà tặng) chưa?',
                kind: 'core',
                evidence: 'Cam kết có chữ ký lãnh đạo; bằng chứng phổ biến nội bộ.',
                code: 'G 19',
                csiText:
                  'Xây dựng và thực hiện chính sách/cam kết/quy tắc ứng xử về phòng chống buôn bán, tiêu thụ, sử dụng động vật hoang dã và các sản phẩm có nguồn gốc từ động vật hoang dã',
                answer: 'yesno',
                action:
                  'Ban hành bản cam kết một trang do lãnh đạo ký, áp dụng cả cho tiếp khách và quà tặng doanh nghiệp, phổ biến tới nhân viên.',
              },
            ],
          },
          {
            title: 'Truyền thông',
            questions: [
              {
                num: '2.7',
                text: 'Doanh nghiệp có kênh thông tin tới đối tác, các bên liên quan và kênh để họ phản hồi lại (website, fanpage, email, họp định kỳ...) chưa?',
                kind: 'core',
                evidence: 'Ảnh chụp hoặc đường dẫn các kênh; sổ ghi nhận và xử lý phản hồi.',
                code: 'G 20',
                csiText:
                  'Xây dựng các hình thức thực hiện công tác truyền thông tới các đối tác, các bên liên quan và hình thức/kênh tiếp nhận ý kiến phản hồi từ các bên liên quan',
                answer: 'yesno',
                action:
                  'Xác định rõ các kênh đang dùng để thông tin ra ngoài và kênh nhận phản hồi; ghi lại các phản hồi nhận được và cách đã xử lý.',
              },
            ],
          },
          {
            title: 'Đổi mới sáng tạo',
            questions: [
              {
                num: '2.8',
                text: 'Doanh nghiệp đã đầu tư vào nghiên cứu, cải tiến hoặc ứng dụng công nghệ để cải thiện cách quản lý hoặc sản phẩm theo hướng bền vững chưa?',
                kind: 'advanced',
                evidence:
                  'Kế hoạch hoặc quyết định đầu tư; chứng từ; báo cáo kết quả; hình ảnh minh họa.',
                code: 'G 22',
                csiText:
                  'Thực hiện hoạt động nghiên cứu và phát triển, đổi mới sáng tạo, ứng dụng khoa học công nghệ để cải tiến quy trình quản trị doanh nghiệp, đổi mới sản phẩm... đóng góp cho phát triển bền vững doanh nghiệp',
                answer: 'yesno',
                action:
                  'Ghi nhận các cải tiến nội bộ đã làm (phần mềm quản lý, cải tiến quy trình, thiết kế sản phẩm ít bao bì hơn...) kèm mức đầu tư và kết quả.',
              },
            ],
          },
        ],
      },
      {
        no: 3,
        title: 'Phần 3 - Môi trường',
        subtitle: 'Giấy phép, chất thải, tiết kiệm năng lượng và nâng cao nhận thức',
        note: 'Phần lớn các việc ở đây là bắt buộc theo Luật Bảo vệ môi trường. Việc nào không phát sinh ở doanh nghiệp bạn thì chọn "Không áp dụng".',
        groups: [
          {
            title: 'Tuân thủ pháp luật về bảo vệ môi trường',
            questions: [
              {
                num: '3.1',
                text: 'Doanh nghiệp đã có giấy phép môi trường hoặc đăng ký môi trường (và giấy phép khai thác nước nếu tự khai thác) còn hiệu lực chưa?',
                kind: 'core',
                evidence:
                  'Giấy phép môi trường hoặc giấy xác nhận đăng ký môi trường còn hiệu lực; giấy phép khai thác nước.',
                code: 'E 1',
                csiText:
                  'Có giấy phép môi trường; đăng ký môi trường; đăng ký khai thác sử dụng nước mặt, nước ngầm theo đúng quy định, còn hiệu lực',
                answer: 'yesno',
                action:
                  'Kiểm tra doanh nghiệp thuộc nhóm nào theo Luật Bảo vệ môi trường 2020 để biết cần giấy phép hay chỉ cần đăng ký. Rà ngày hết hạn và làm thủ tục gia hạn trước 6 tháng.',
              },
              {
                num: '3.2',
                text: 'Doanh nghiệp đã nộp đủ, đúng hạn các loại thuế, phí bảo vệ môi trường (nước thải, khí thải, khai thác nước...) chưa?',
                kind: 'core',
                evidence: 'Chứng từ nộp thuế, phí bảo vệ môi trường; tờ khai phí.',
                code: 'E 2',
                csiText:
                  'Nộp đầy đủ, kịp thời các loại thuế, phí bảo vệ môi trường đối với nước thải; khí thải; sử dụng nước mặt, nước ngầm; ký quỹ bảo vệ môi trường, chi trả dịch vụ hệ sinh thái tự nhiên',
                answer: 'yesno',
                action:
                  'Rà soát các nghĩa vụ tài chính về môi trường doanh nghiệp đang phải nộp và lưu đủ chứng từ của 3 năm.',
              },
              {
                num: '3.3',
                text: 'Doanh nghiệp đã nộp đầy đủ, đúng hạn báo cáo công tác bảo vệ môi trường hằng năm (và báo cáo về nước, hóa chất, tái chế bao bì nếu thuộc đối tượng) chưa?',
                kind: 'core',
                evidence: 'Báo cáo đã nộp kèm biên nhận của cơ quan tiếp nhận cho cả 3 năm.',
                code: 'E 3',
                csiText:
                  'Nộp báo cáo công tác bảo vệ môi trường, báo cáo tình hình khai thác nước mặt, nước ngầm, tình hình hoạt động hóa chất, kết quả tái chế sản phẩm bao bì đầy đủ, đúng hạn',
                answer: 'yesno',
                action:
                  'Đặt lịch nhắc hạn nộp báo cáo công tác bảo vệ môi trường (trước 15/01 hằng năm) và các báo cáo khác nếu thuộc đối tượng.',
              },
              {
                num: '3.4',
                text: 'Rác thải sinh hoạt và chất thải rắn công nghiệp thông thường có được phân loại, lưu giữ và chuyển giao cho đơn vị có giấy phép đúng quy định không?',
                kind: 'core',
                evidence:
                  'Hợp đồng thu gom, xử lý; chứng từ chuyển giao; hình ảnh khu lưu giữ có biển báo.',
                code: 'E 4',
                csiText:
                  'Thực hiện đúng quy định về phân loại, thu gom, vận chuyển, lưu giữ, xử lý chất thải rắn công nghiệp thông thường và chất thải rắn sinh hoạt',
                answer: 'yesno',
                action:
                  'Bố trí khu phân loại chất thải tại nguồn, ký hợp đồng với đơn vị thu gom có giấy phép và lưu đủ chứng từ chuyển giao.',
              },
              {
                num: '3.5',
                text: 'Chất thải nguy hại (dầu nhớt thải, giẻ lau dính dầu, bóng đèn, hóa chất...) có được lưu giữ riêng, có sổ theo dõi và chuyển giao cho đơn vị có giấy phép không?',
                kind: 'core',
                evidence:
                  'Sổ đăng ký chủ nguồn thải chất thải nguy hại; chứng từ chuyển giao; hợp đồng với đơn vị có giấy phép.',
                code: 'E 5',
                csiText:
                  'Thực hiện đúng quy định về phân loại thu gom, vận chuyển, lưu giữ, xử lý chất thải rắn nguy hại',
                answer: 'yesno',
                action:
                  'Bố trí khu lưu giữ riêng có biển cảnh báo, lập sổ chủ nguồn thải và chuyển giao cho đơn vị có giấy phép xử lý chất thải nguy hại.',
              },
              {
                num: '3.6',
                text: 'Nếu có xuất nhập khẩu máy móc, thiết bị, nguyên liệu, phế liệu đã qua sử dụng: doanh nghiệp có tuân thủ đúng quy định về bảo vệ môi trường không?',
                kind: 'core',
                evidence: 'Hồ sơ hải quan; giấy phép nhập khẩu phế liệu; kết quả giám định.',
                code: 'E 6',
                csiText:
                  'Thực hiện đúng quy định về bảo vệ môi trường trong xuất, nhập khẩu, quá cảnh hàng hóa máy móc, thiết bị, phương tiện, nguyên liệu, phế liệu đã qua sử dụng',
                answer: 'yesno',
                action:
                  'Rà soát điều kiện nhập khẩu và hồ sơ hải quan. Nếu doanh nghiệp không xuất nhập khẩu các mặt hàng này, chọn "Không áp dụng".',
              },
              {
                num: '3.7',
                text: 'Nếu doanh nghiệp sản xuất hoặc nhập khẩu sản phẩm, bao bì có trách nhiệm phải thực hiện nghĩa vụ tái chế (EPR): đã thực hiện tái chế hoặc đóng góp tài chính đúng quy định chưa?',
                kind: 'core',
                evidence:
                  'Bản đăng ký kế hoạch tái chế hoặc chứng từ đóng góp tài chính; báo cáo kết quả tái chế.',
                code: 'E 7',
                csiText:
                  'Thực hiện đúng quy định về trách nhiệm tái chế sản phẩm, bao bì (EPR) và trách nhiệm xử lý chất thải',
                answer: 'yesno',
                action:
                  'Kiểm tra sản phẩm, bao bì của doanh nghiệp có thuộc danh mục phải tái chế không. Nếu có, đăng ký kế hoạch tái chế hoặc đóng góp tài chính đúng hạn.',
              },
              {
                num: '3.8',
                text: 'Hóa chất, trang thiết bị, dụng cụ có được sử dụng tiết kiệm, an toàn, có danh mục và hướng dẫn an toàn không?',
                kind: 'core',
                evidence:
                  'Danh mục hóa chất; phiếu an toàn hóa chất (MSDS); hồ sơ tập huấn an toàn hóa chất.',
                code: 'E 8',
                csiText: 'Sử dụng tiết kiệm, an toàn hóa chất, trang thiết bị, dụng cụ',
                answer: 'yesno',
                action:
                  'Lập danh mục hóa chất đang dùng, có phiếu an toàn hóa chất cho từng loại, kho chứa đúng quy định và tập huấn cho người tiếp xúc.',
              },
              {
                num: '3.9',
                text: 'Doanh nghiệp đã trang bị đủ thiết bị, dụng cụ phòng ngừa và ứng phó sự cố môi trường (tràn dầu, rò rỉ hóa chất, cháy...) chưa?',
                kind: 'core',
                evidence: 'Danh mục thiết bị ứng phó sự cố; biên bản kiểm tra định kỳ; hình ảnh.',
                code: 'E 9',
                csiText:
                  'Trang bị đầy đủ thiết bị, dụng cụ phòng ngừa rủi ro, ứng phó sự cố môi trường',
                answer: 'yesno',
                action:
                  'Trang bị và kiểm tra định kỳ vật liệu thấm hút, bờ bao chống tràn, bình chữa cháy, đồ bảo hộ; lập kế hoạch ứng phó sự cố ngắn gọn.',
              },
              {
                num: '3.10',
                text: 'Doanh nghiệp có quan trắc, kiểm soát nước thải, khí thải định kỳ đúng quy định (theo giấy phép môi trường) không?',
                kind: 'core',
                evidence: 'Kết quả quan trắc các kỳ; hợp đồng với đơn vị quan trắc đủ năng lực.',
                code: 'E 10',
                csiText:
                  'Thực hiện kiểm soát, quan trắc, giám sát môi trường nước thải, khí thải theo đúng quy định hiện hành',
                answer: 'yesno',
                action:
                  'Thực hiện quan trắc đúng tần suất ghi trong giấy phép môi trường, do đơn vị được cấp phép thực hiện.',
              },
            ],
          },
          {
            title: 'Hoạt động bảo vệ môi trường và ứng phó biến đổi khí hậu',
            questions: [
              {
                num: '3.11',
                text: 'Doanh nghiệp có chính sách khuyến khích người lao động đi lại bằng phương tiện ít phát thải (xe buýt, xe đạp, xe điện, đi chung xe...) chưa?',
                kind: 'advanced',
                evidence: 'Chính sách hỗ trợ; danh sách người hưởng; chứng từ chi.',
                code: 'E 12',
                csiText:
                  'Thực hiện chính sách khuyến khích, hỗ trợ người lao động sử dụng phương tiện giao thông ít phát thải',
                answer: 'yesno',
                action:
                  'Ban hành chính sách hỗ trợ chi phí đi xe buýt, xe đạp, xe điện hoặc tổ chức đi chung xe, xe đưa đón.',
              },
              {
                num: '3.12',
                text: 'Doanh nghiệp đã ban hành và thực hiện thường xuyên quy định tiết kiệm điện, năng lượng chưa?',
                kind: 'core',
                evidence:
                  'Quy định tiết kiệm năng lượng đã ban hành; biên bản kiểm tra; số liệu điện tiêu thụ theo tháng.',
                code: 'E 17',
                csiText:
                  'Ban hành và thực hiện thường xuyên các quy định thực hành tiết kiệm năng lượng',
                answer: 'yesno',
                action:
                  'Ban hành quy định ngắn: tắt thiết bị khi không dùng, nhiệt độ điều hòa, bảo trì định kỳ - và kiểm tra việc thực hiện.',
              },
              {
                num: '3.13',
                text: 'Doanh nghiệp đã có cam kết bảo vệ đa dạng sinh học, không buôn bán, vận chuyển, sử dụng động vật hoang dã và sản phẩm từ động vật hoang dã (kể cả khi tiếp khách, làm quà tặng) chưa?',
                kind: 'core',
                evidence: 'Cam kết hoặc chính sách đã ban hành; tài liệu truyền thông nội bộ.',
                code: 'E 24',
                csiText:
                  'Bảo vệ đa dạng sinh học, phòng, chống buôn bán, vận chuyển và sử dụng động vật hoang dã',
                answer: 'yesno',
                action:
                  'Có thể gộp chung với cam kết ở câu G 19 thành một văn bản, phổ biến tới toàn bộ nhân viên.',
              },
            ],
          },
          {
            title: 'Quản lý môi trường và nâng cao nhận thức',
            questions: [
              {
                num: '3.14',
                text: 'Doanh nghiệp đã tập huấn, truyền thông cho người lao động về bảo vệ môi trường, biến đổi khí hậu và theo dõi sự thay đổi nhận thức sau tập huấn chưa?',
                kind: 'core',
                evidence:
                  'Tài liệu tập huấn; danh sách tham dự; kết quả khảo sát nhận thức trước và sau.',
                code: 'E 26',
                csiText:
                  'Tổ chức hoạt động tập huấn và theo dõi sự thay đổi nhận thức và hành vi sau tập huấn, truyền thông nâng cao nhận thức cho người lao động về bảo vệ môi trường và ứng phó với biến đổi khí hậu',
                answer: 'yesno',
                action:
                  'Tổ chức ít nhất 1 buổi tập huấn mỗi năm, làm phiếu hỏi ngắn trước và sau buổi tập huấn để thấy nhận thức thay đổi thế nào.',
              },
            ],
          },
        ],
      },
      {
        no: 4,
        title: 'Phần 4 - Người lao động và xã hội',
        subtitle: 'Hợp đồng, lương, an toàn lao động, đối thoại và quan hệ với khách hàng',
        note: 'Đây là phần dài nhất. Nên làm cùng người phụ trách nhân sự hoặc kế toán.',
        groups: [
          {
            title: 'Quản lý nhân sự',
            questions: [
              {
                num: '4.1',
                text: 'Doanh nghiệp đã ký hợp đồng lao động bằng văn bản, đúng loại và đủ nội dung với mọi người làm việc từ 1 tháng trở lên chưa?',
                kind: 'core',
                evidence: 'Bộ hợp đồng lao động; danh sách lao động kèm loại hợp đồng.',
                code: 'L 1',
                csiText:
                  'Tuân thủ đầy đủ quy định về giao kết hợp đồng lao động: giao kết bằng văn bản đối với hợp đồng từ một (01) tháng trở lên; giao kết đúng loại hợp đồng; hợp đồng có đầy đủ nội dung theo quy định',
                answer: 'yesno',
                action:
                  'Rà soát toàn bộ hợp đồng: đủ nội dung bắt buộc theo Điều 21 Bộ luật Lao động 2019, đúng loại hợp đồng, có văn bản với mọi hợp đồng từ 1 tháng trở lên.',
              },
              {
                num: '4.2',
                text: 'Khi tạm điều chuyển người lao động sang việc khác hoặc nơi làm khác, doanh nghiệp có làm đúng quy định và đúng thỏa thuận trong hợp đồng không?',
                kind: 'core',
                evidence:
                  'Quyết định điều chuyển; văn bản thông báo trước; hợp đồng thể hiện địa điểm làm việc.',
                code: 'L 2',
                csiText:
                  'Tuân thủ quy định về thực hiện hợp đồng lao động, bao gồm việc tạm thời chuyển người lao động làm công việc khác không theo hợp đồng đúng quy định; bố trí địa điểm lao động đúng theo thỏa thuận',
                answer: 'yesno',
                action:
                  'Chỉ điều chuyển đúng quy định (không quá 60 ngày cộng dồn mỗi năm, báo trước 3 ngày làm việc) và bố trí đúng địa điểm đã thỏa thuận.',
              },
              {
                num: '4.3',
                text: 'Việc sửa đổi, bổ sung và chấm dứt hợp đồng lao động có được làm đúng quy định (có văn bản, báo trước đủ, thanh toán đủ) không?',
                kind: 'core',
                evidence:
                  'Phụ lục hợp đồng; quyết định chấm dứt; biên bản thanh lý; chứng từ chi trả.',
                code: 'L 3',
                csiText: 'Tuân thủ quy định về sửa đổi, bổ sung và chấm dứt hợp đồng lao động',
                answer: 'yesno',
                action:
                  'Rà soát quy trình: đúng căn cứ, đúng thời hạn báo trước, thanh toán đầy đủ trong 14 ngày làm việc khi chấm dứt hợp đồng.',
              },
              {
                num: '4.4',
                text: 'Doanh nghiệp đã ký hợp đồng lao động điện tử chưa?',
                kind: 'advanced',
                evidence: 'Hợp đồng lao động điện tử đã ký; mô tả nền tảng ký số đang dùng.',
                code: 'L 4',
                csiText: 'Chủ động xây dựng và thực hiện ký kết hợp đồng lao động điện tử',
                answer: 'yesno',
                action:
                  'Triển khai ký hợp đồng lao động điện tử qua nền tảng ký số hợp lệ - tiết kiệm thời gian và lưu trữ.',
              },
              {
                num: '4.5',
                text: 'Doanh nghiệp đã lập sổ quản lý lao động (giấy hoặc điện tử) và cập nhật ngay khi có người mới vào làm chưa?',
                kind: 'core',
                evidence: 'Sổ quản lý lao động đã cập nhật (bản giấy hoặc bản xuất từ phần mềm).',
                code: 'L 5',
                csiText:
                  'Lập sổ quản lý lao động và nhập đầy đủ thông tin về người lao động vào sổ quản lý lao động kể từ khi người lao động bắt đầu làm việc theo quy định',
                answer: 'yesno',
                action:
                  'Lập sổ quản lý lao động và cập nhật ngay khi có người mới, đủ các thông tin theo quy định.',
              },
              {
                num: '4.6',
                text: 'Doanh nghiệp có báo cáo tình hình thay đổi lao động định kỳ cho cơ quan quản lý lao động địa phương không?',
                kind: 'core',
                evidence: 'Báo cáo tình hình sử dụng lao động đã nộp kèm biên nhận.',
                code: 'L 6',
                csiText:
                  'Báo cáo tình hình thay đổi về lao động với cơ quan quản lý nhà nước về lao động theo quy định',
                answer: 'yesno',
                action:
                  'Nộp báo cáo tình hình thay đổi lao động 6 tháng một lần cho cơ quan quản lý lao động địa phương.',
              },
              {
                num: '4.7',
                text: 'Doanh nghiệp đã có nội quy lao động bằng văn bản và đăng ký với cơ quan quản lý lao động chưa? (bắt buộc với doanh nghiệp từ 10 lao động trở lên)',
                kind: 'core',
                evidence:
                  'Nội quy lao động; văn bản xác nhận đăng ký; ảnh niêm yết tại nơi làm việc.',
                code: 'L 7',
                csiText:
                  'Xây dựng và đăng ký nội quy lao động với cơ quan quản lý nhà nước về lao động',
                answer: 'yesno',
                action:
                  'Soạn nội quy lao động, đăng ký với cơ quan quản lý lao động cấp tỉnh và niêm yết tại nơi làm việc. Dưới 10 lao động thì không bắt buộc đăng ký nhưng vẫn nên có nội quy.',
              },
              {
                num: '4.8',
                text: 'Khi xử lý kỷ luật lao động, doanh nghiệp có làm đúng nguyên tắc, trình tự (có họp, có biên bản, có đại diện người lao động) không?',
                kind: 'core',
                evidence: 'Quy trình xử lý kỷ luật; biên bản họp; quyết định kỷ luật (nếu có).',
                code: 'L 8',
                csiText: 'Đảm bảo nguyên tắc, trình tự, thủ tục xử lý kỷ luật lao động',
                answer: 'yesno',
                action:
                  'Xử lý kỷ luật phải có căn cứ trong nội quy, họp có sự tham gia của tổ chức đại diện người lao động và người bị xử lý, lập biên bản.',
              },
              {
                num: '4.9',
                text: 'Người lao động có được biết về các vị trí tuyển dụng nội bộ và cơ hội thăng tiến không?',
                kind: 'core',
                evidence:
                  'Thông báo tuyển dụng nội bộ; quy định về thăng tiến; danh sách người được đề bạt.',
                code: 'L 9',
                csiText:
                  'Tạo điều kiện để người lao động nắm bắt cơ hội việc làm và thăng tiến nghề nghiệp',
                answer: 'yesno',
                action:
                  'Công khai vị trí tuyển dụng nội bộ và tiêu chí thăng tiến để người lao động biết cơ hội phát triển.',
              },
            ],
          },
          {
            title: 'Lương, thưởng và bảo hiểm bắt buộc',
            questions: [
              {
                num: '4.10',
                text: 'Doanh nghiệp đã xây dựng và công khai thang lương, bảng lương, định mức lao động tại nơi làm việc chưa?',
                kind: 'core',
                evidence:
                  'Thang bảng lương; biên bản lấy ý kiến tổ chức đại diện người lao động; ảnh niêm yết.',
                code: 'L 11',
                csiText:
                  'Xây dựng và công khai thang lương, bảng lương và định mức lao động tại nơi làm việc',
                answer: 'yesno',
                action:
                  'Xây dựng thang lương, bảng lương, định mức lao động, lấy ý kiến tổ chức đại diện người lao động (nếu có) và niêm yết công khai.',
              },
              {
                num: '4.11',
                text: 'Doanh nghiệp đã có quy chế trả lương bằng văn bản chưa?',
                kind: 'advanced',
                evidence: 'Quy chế trả lương đã ban hành; bằng chứng phổ biến tới người lao động.',
                code: 'L 12',
                csiText: 'Xây dựng quy chế trả lương cho người lao động',
                answer: 'yesno',
                action:
                  'Ban hành quy chế trả lương nêu rõ cấu trúc lương, tiêu chí tăng lương, cách tính lương làm thêm giờ.',
              },
              {
                num: '4.12',
                text: 'Doanh nghiệp có trả lương, tiền làm thêm giờ đúng hạn, đủ và gửi bảng kê lương cho từng người lao động không?',
                kind: 'core',
                evidence: 'Bảng lương; chứng từ chuyển khoản; mẫu phiếu lương gửi người lao động.',
                code: 'L 13',
                csiText:
                  'Trả đúng hạn, đủ và thông báo bảng kê tiền lương, tiền lương làm thêm giờ của người lao động',
                answer: 'yesno',
                action:
                  'Trả lương đúng kỳ hạn đã cam kết và gửi phiếu lương chi tiết cho từng người lao động mỗi kỳ.',
              },
              {
                num: '4.13',
                text: 'Doanh nghiệp đã có quy chế thưởng bằng văn bản và thực hiện theo quy chế chưa?',
                kind: 'advanced',
                evidence: 'Quy chế thưởng; quyết định thưởng; chứng từ chi thưởng.',
                code: 'L 14',
                csiText: 'Xây dựng và thực hiện quy chế thưởng đối với người lao động',
                answer: 'yesno',
                action: 'Ban hành quy chế thưởng minh bạch, nêu rõ căn cứ và thời điểm xét thưởng.',
              },
              {
                num: '4.14',
                text: 'Doanh nghiệp có đóng đủ, đúng hạn BHXH, BHYT, BHTN, bảo hiểm tai nạn lao động - bệnh nghề nghiệp cho tất cả người lao động thuộc diện phải đóng không?',
                kind: 'core',
                evidence:
                  'Thông báo kết quả đóng BHXH (mẫu C12-TS); xác nhận không nợ BHXH; chứng từ nộp.',
                code: 'L 15',
                csiText:
                  'Đóng bảo hiểm xã hội, bảo hiểm y tế, bảo hiểm thất nghiệp, bảo hiểm tai nạn lao động - bệnh nghề nghiệp đúng hạn và đầy đủ số người lao động thuộc đối tượng phải đóng',
                answer: 'yesno',
                action:
                  'Đóng đủ và đúng hạn cho 100% người thuộc diện phải đóng. Kiểm tra xem có khoản nợ đọng nào không.',
              },
            ],
          },
          {
            title: 'Trợ cấp và phúc lợi',
            questions: [
              {
                num: '4.15',
                text: 'Doanh nghiệp có hỗ trợ tiền ăn ca, ăn trưa cho người lao động không?',
                kind: 'advanced',
                evidence:
                  'Chính sách hỗ trợ; bảng lương thể hiện khoản hỗ trợ; hợp đồng cung cấp suất ăn.',
                code: 'L 19',
                csiText: 'Hỗ trợ tiền ăn ca, tiền ăn trưa cho người lao động',
                answer: 'yesno',
                action: 'Hỗ trợ tiền ăn ca, ăn trưa hoặc tổ chức bữa ăn cho người lao động.',
              },
              {
                num: '4.16',
                text: 'Doanh nghiệp có chính sách hỗ trợ chăm sóc con của người lao động (gửi trẻ, quà 1/6, khen thưởng con học giỏi...) không?',
                kind: 'advanced',
                evidence: 'Chính sách hỗ trợ; danh sách hưởng; chứng từ chi.',
                code: 'L 20',
                csiText:
                  'Thực hiện các chính sách hỗ trợ việc chăm sóc con của người lao động: gửi trẻ/nuôi con nhỏ/đạt thành tích cao trong học tập...',
                answer: 'yesno',
                action:
                  'Ban hành chính sách hỗ trợ chăm sóc con: trợ cấp gửi trẻ, quà 1/6, khen thưởng con có thành tích học tập.',
              },
              {
                num: '4.17',
                text: 'Doanh nghiệp có tổ chức hoạt động văn hóa, thể thao, tham quan, du lịch cho người lao động không?',
                kind: 'advanced',
                evidence: 'Kế hoạch hoạt động; danh sách tham gia; hình ảnh; chứng từ chi.',
                code: 'L 21',
                csiText:
                  'Tổ chức các hoạt động văn hóa, văn nghệ, thể thao và tham quan, du lịch cho người lao động',
                answer: 'yesno',
                action:
                  'Tổ chức ít nhất một hoạt động văn hóa, thể thao hoặc tham quan mỗi năm để gắn kết người lao động.',
              },
              {
                num: '4.18',
                text: 'Doanh nghiệp có hỗ trợ tiền điện thoại cho người lao động không?',
                kind: 'advanced',
                evidence: 'Chính sách hỗ trợ; bảng lương thể hiện khoản phụ cấp.',
                code: 'L 23',
                csiText: 'Hỗ trợ tiền điện thoại',
                answer: 'yesno',
                action: 'Hỗ trợ chi phí điện thoại cho các vị trí cần liên lạc thường xuyên.',
              },
              {
                num: '4.19',
                text: 'Doanh nghiệp có chế độ thăm hỏi sinh nhật, kết hôn, hiếu hỉ cho người lao động không?',
                kind: 'advanced',
                evidence: 'Quy chế phúc lợi; sổ theo dõi thăm hỏi; chứng từ chi.',
                code: 'L 24',
                csiText: 'Hỗ trợ sinh nhật, kết hôn, thân nhân mất...',
                answer: 'yesno',
                action:
                  'Duy trì chế độ thăm hỏi sinh nhật, kết hôn, hiếu hỉ, ghi trong quy chế phúc lợi.',
              },
              {
                num: '4.20',
                text: 'Doanh nghiệp có trợ cấp cho người lao động gặp khó khăn do tai nạn không?',
                kind: 'advanced',
                evidence: 'Quy chế trợ cấp; danh sách hỗ trợ; chứng từ chi.',
                code: 'L 25',
                csiText: 'Trợ cấp người lao động khó khăn do bị tai nạn',
                answer: 'yesno',
                action: 'Có quỹ hoặc cơ chế trợ cấp cho người lao động gặp khó khăn do tai nạn.',
              },
            ],
          },
          {
            title: 'Thời giờ làm việc và nghỉ ngơi',
            questions: [
              {
                num: '4.21',
                text: 'Thời giờ làm việc bình thường có được giữ không quá 8 giờ một ngày hoặc 48 giờ một tuần không?',
                kind: 'core',
                evidence: 'Bảng chấm công; nội quy lao động quy định thời giờ làm việc.',
                code: 'L 26',
                csiText:
                  'Áp dụng thời giờ làm việc bình thường không quá 08 giờ trong 01 ngày hoặc không quá 48 giờ trong 01 tuần',
                answer: 'yesno',
                action: 'Kiểm tra bảng chấm công và điều chỉnh lịch làm việc nếu vượt giới hạn.',
              },
              {
                num: '4.22',
                text: 'Người lao động có được nghỉ hằng tuần, nghỉ giữa giờ, nghỉ chuyển ca, nghỉ giữa ca đúng quy định không?',
                kind: 'core',
                evidence: 'Bảng chấm công; lịch phân ca; nội quy lao động.',
                code: 'L 27',
                csiText:
                  'Đảm bảo thời gian nghỉ hằng tuần, nghỉ trong giờ làm việc, nghỉ chuyển ca, nghỉ giữa ca cho người lao động',
                answer: 'yesno',
                action:
                  'Bảo đảm nghỉ hằng tuần ít nhất 24 giờ liên tục, nghỉ giữa ca 30 phút (45 phút với ca đêm), nghỉ chuyển ca ít nhất 12 giờ.',
              },
              {
                num: '4.23',
                text: 'Việc làm thêm giờ, làm ca đêm, làm ngày nghỉ, ngày lễ có đúng quy định (có thỏa thuận, không vượt giới hạn, trả đúng đơn giá) không?',
                kind: 'core',
                evidence: 'Văn bản đồng ý làm thêm giờ; bảng chấm công làm thêm; bảng lương.',
                code: 'L 28',
                csiText:
                  'Nghiêm túc thực hiện các quy định về sử dụng người lao động làm thêm giờ, làm ca đêm, làm vào ngày nghỉ, ngày lễ',
                answer: 'yesno',
                action:
                  'Làm thêm không quá 40 giờ/tháng và 200 giờ/năm (300 giờ với ngành được phép), có sự đồng ý của người lao động và trả đúng đơn giá.',
              },
              {
                num: '4.24',
                text: 'Người lao động có được nghỉ việc riêng có hưởng lương hoặc nghỉ không hưởng lương theo quy định không?',
                kind: 'core',
                evidence: 'Nội quy lao động; đơn xin nghỉ và phê duyệt; bảng chấm công.',
                code: 'L 29',
                csiText:
                  'Bảo đảm cho người lao động nghỉ việc riêng hoặc nghỉ không hưởng lương theo quy định',
                answer: 'yesno',
                action:
                  'Bảo đảm chế độ nghỉ khi kết hôn, con kết hôn, có tang và nghỉ không hưởng lương theo quy định.',
              },
            ],
          },
          {
            title: 'Sức khỏe và an toàn lao động',
            questions: [
              {
                num: '4.25',
                text: 'Doanh nghiệp có tổ chức khám sức khỏe định kỳ cho người lao động theo quy định không?',
                kind: 'core',
                evidence: 'Hợp đồng với cơ sở y tế; kết quả khám sức khỏe.',
                code: 'L 30',
                csiText: 'Khám sức khỏe định kỳ cho người lao động theo quy định',
                answer: 'yesno',
                action:
                  'Khám sức khỏe ít nhất 1 lần/năm; 6 tháng/lần với lao động nặng nhọc, độc hại, người khuyết tật, lao động chưa thành niên, cao tuổi.',
              },
              {
                num: '4.26',
                text: 'Doanh nghiệp đã có bộ phận y tế hoặc thuê dịch vụ y tế theo quy định chưa?',
                kind: 'core',
                evidence: 'Quyết định thành lập bộ phận y tế hoặc hợp đồng dịch vụ y tế.',
                code: 'L 31',
                csiText:
                  'Tổ chức bộ phận làm công tác y tế hoặc thuê tổ chức dịch vụ làm công tác y tế theo quy định',
                answer: 'yesno',
                action:
                  'Doanh nghiệp nhỏ thường chỉ cần ký hợp đồng với một cơ sở y tế đủ điều kiện.',
              },
              {
                num: '4.27',
                text: 'Doanh nghiệp đã bố trí người làm sơ cứu, cấp cứu và trang bị túi sơ cứu tại nơi làm việc chưa?',
                kind: 'core',
                evidence:
                  'Quyết định phân công; chứng nhận huấn luyện sơ cứu; danh mục túi sơ cứu.',
                code: 'L 32',
                csiText: 'Bố trí lực lượng sơ cứu, cấp cứu tại nơi làm việc theo quy định',
                answer: 'yesno',
                action:
                  'Phân công và cho đi huấn luyện người làm sơ cứu; trang bị túi sơ cứu theo khu vực làm việc.',
              },
              {
                num: '4.28',
                text: 'Nếu có bếp ăn tập thể: doanh nghiệp có kiểm soát chất lượng, an toàn vệ sinh thực phẩm không?',
                kind: 'advanced',
                evidence: 'Giấy chứng nhận đủ điều kiện an toàn thực phẩm; sổ lưu mẫu thức ăn.',
                code: 'L 33',
                csiText:
                  'Kiểm soát chất lượng, an toàn vệ sinh thực phẩm bếp ăn cho người lao động',
                answer: 'yesno',
                action:
                  'Lưu mẫu thức ăn 24 giờ, giữ hồ sơ nguồn gốc thực phẩm, khám sức khỏe cho nhân viên bếp. Không có bếp ăn thì chọn "Không áp dụng".',
              },
              {
                num: '4.29',
                text: 'Doanh nghiệp đã ban hành nội quy, quy trình và kế hoạch an toàn, vệ sinh lao động chưa?',
                kind: 'core',
                evidence: 'Kế hoạch an toàn, vệ sinh lao động năm; nội quy, quy trình an toàn.',
                code: 'L 34',
                csiText:
                  'Ban hành nội quy, quy trình, kế hoạch bảo đảm an toàn, vệ sinh lao động tại nơi làm việc',
                answer: 'yesno',
                action:
                  'Lập kế hoạch an toàn, vệ sinh lao động hằng năm có kinh phí, kèm nội quy an toàn cho từng vị trí.',
              },
              {
                num: '4.30',
                text: 'Doanh nghiệp đã có bộ phận hoặc người làm công tác an toàn, vệ sinh lao động đủ điều kiện chưa?',
                kind: 'core',
                evidence: 'Quyết định phân công; chứng chỉ huấn luyện của người phụ trách.',
                code: 'L 35',
                csiText:
                  'Tổ chức bố trí bộ phận hoặc nhân sự làm công tác an toàn, vệ sinh lao động đủ điều kiện theo quy định',
                answer: 'yesno',
                action:
                  'Phân công người phụ trách an toàn, vệ sinh lao động và cho đi huấn luyện lấy chứng chỉ phù hợp.',
              },
              {
                num: '4.31',
                text: 'Máy, thiết bị có yêu cầu nghiêm ngặt về an toàn (nồi hơi, thiết bị nâng, bình chịu áp lực...) có được kiểm định đúng hạn không?',
                kind: 'core',
                evidence: 'Danh mục thiết bị; giấy chứng nhận kiểm định còn hiệu lực.',
                code: 'L 36',
                csiText:
                  'Các máy, thiết bị có yêu cầu nghiêm ngặt về an toàn lao động đang sử dụng được kiểm định theo quy định',
                answer: 'yesno',
                action:
                  'Lập danh mục các thiết bị này và kiểm định đúng chu kỳ. Không có thiết bị loại này thì chọn "Không áp dụng".',
              },
              {
                num: '4.32',
                text: 'Doanh nghiệp đã đánh giá rủi ro về sức khỏe tại nơi làm việc chưa?',
                kind: 'advanced',
                evidence: 'Báo cáo đánh giá rủi ro; biện pháp kiểm soát đã áp dụng.',
                code: 'L 37',
                csiText:
                  'Đánh giá rủi ro tại nơi làm việc liên quan đến sức khỏe của người lao động',
                answer: 'yesno',
                action:
                  'Đánh giá rủi ro sức khỏe ít nhất 1 lần/năm cho các vị trí có yếu tố nguy hiểm, có hại.',
              },
              {
                num: '4.33',
                text: 'Doanh nghiệp đã có kế hoạch xử lý sự cố, ứng cứu khẩn cấp tại nơi làm việc chưa?',
                kind: 'core',
                evidence: 'Kế hoạch ứng cứu khẩn cấp; biên bản diễn tập; sơ đồ thoát hiểm.',
                code: 'L 38',
                csiText: 'Ban hành kế hoạch xử lý sự cố, ứng cứu khẩn cấp tại nơi làm việc',
                answer: 'yesno',
                action:
                  'Xây dựng kế hoạch ứng cứu khẩn cấp (cháy nổ, tai nạn, rò rỉ) và diễn tập định kỳ.',
              },
              {
                num: '4.34',
                text: 'Khi xảy ra tai nạn lao động, doanh nghiệp có điều tra và báo cáo cơ quan chức năng đúng quy định không?',
                kind: 'core',
                evidence: 'Biên bản điều tra tai nạn; văn bản khai báo; hồ sơ giải quyết chế độ.',
                code: 'L 39',
                csiText:
                  'Thực hiện điều tra, báo cáo cơ quan chức năng tai nạn lao động tại nơi làm việc',
                answer: 'yesno',
                action:
                  'Thành lập đoàn điều tra, lập biên bản và khai báo đúng thời hạn. Chưa từng xảy ra tai nạn thì chọn "Không áp dụng".',
              },
              {
                num: '4.35',
                text: 'Người lao động có được trang bị đủ phương tiện bảo vệ cá nhân phù hợp với công việc không?',
                kind: 'core',
                evidence: 'Danh mục cấp phát; sổ ký nhận; hình ảnh người lao động sử dụng.',
                code: 'L 40',
                csiText: 'Trang bị đủ phương tiện bảo vệ cá nhân cho người lao động',
                answer: 'yesno',
                action:
                  'Cấp phát đủ đồ bảo hộ theo từng vị trí, có ký nhận và kiểm tra việc sử dụng.',
              },
              {
                num: '4.36',
                text: 'Doanh nghiệp đã lập danh sách người lao động làm công việc nặng nhọc, độc hại, nguy hiểm chưa?',
                kind: 'core',
                evidence:
                  'Danh sách phân loại lao động; bảng đối chiếu với danh mục nghề nặng nhọc, độc hại.',
                code: 'L 41',
                csiText:
                  'Thống kê, phân loại lao động thực hiện các công việc nặng nhọc, độc hại, nguy hiểm và lao động làm công việc đặc biệt nặng nhọc, độc hại, nguy hiểm',
                answer: 'yesno',
                action:
                  'Đối chiếu vị trí công việc với danh mục nghề nặng nhọc, độc hại của nhà nước để áp dụng đúng chế độ. Không có vị trí loại này thì chọn "Không áp dụng".',
              },
              {
                num: '4.37',
                text: 'Doanh nghiệp có tổ chức huấn luyện an toàn, vệ sinh lao động cho người lao động theo quy định không?',
                kind: 'core',
                evidence:
                  'Kế hoạch huấn luyện; danh sách tham dự; giấy chứng nhận hoặc thẻ an toàn.',
                code: 'L 42',
                csiText:
                  'Tổ chức huấn luyện về an toàn, vệ sinh lao động cho người lao động theo quy định',
                answer: 'yesno',
                action:
                  'Huấn luyện đúng nhóm đối tượng và đúng chu kỳ (2 năm/lần với nhóm 3, hằng năm với nhóm 4).',
              },
              {
                num: '4.38',
                text: 'Doanh nghiệp có quan trắc môi trường lao động hằng năm (bụi, ồn, nhiệt, ánh sáng, hơi khí độc...) không?',
                kind: 'core',
                evidence: 'Kết quả quan trắc môi trường lao động; hợp đồng với đơn vị đủ năng lực.',
                code: 'L 43',
                csiText: 'Tổ chức quan trắc môi trường lao động hằng năm',
                answer: 'yesno',
                action:
                  'Thuê đơn vị đủ năng lực quan trắc ít nhất 1 lần/năm và khắc phục nếu có yếu tố vượt ngưỡng.',
              },
              {
                num: '4.39',
                text: 'Doanh nghiệp có nộp báo cáo định kỳ về tai nạn lao động và an toàn, vệ sinh lao động cho cơ quan chức năng không?',
                kind: 'core',
                evidence: 'Báo cáo đã nộp kèm biên nhận.',
                code: 'L 44',
                csiText:
                  'Định kỳ báo cáo cơ quan chức năng về tai nạn lao động và an toàn vệ sinh lao động',
                answer: 'yesno',
                action:
                  'Nộp báo cáo an toàn, vệ sinh lao động và tai nạn lao động hằng năm, thường trước ngày 10/01.',
              },
            ],
          },
          {
            title: 'Giáo dục và đào tạo',
            questions: [
              {
                num: '4.40',
                text: 'Người lao động có được đào tạo trước khi chuyển sang làm công việc nặng nhọc, độc hại không?',
                kind: 'core',
                evidence: 'Quyết định điều chuyển; chương trình và kết quả đào tạo.',
                code: 'L 45',
                csiText:
                  'Đào tạo cho người lao động trước khi chuyển vị trí, lĩnh vực làm việc liên quan tới công việc nặng nhọc, độc hại',
                answer: 'yesno',
                action:
                  'Đào tạo lại trước khi chuyển người sang vị trí có yếu tố nặng nhọc, độc hại. Không có vị trí loại này thì chọn "Không áp dụng".',
              },
              {
                num: '4.41',
                text: 'Doanh nghiệp đã có kế hoạch đào tạo hằng năm và dành kinh phí cho đào tạo chưa?',
                kind: 'core',
                evidence: 'Kế hoạch đào tạo năm có dự toán kinh phí; báo cáo kết quả.',
                code: 'L 46',
                csiText:
                  'Xây dựng kế hoạch hằng năm và phân bổ kinh phí cho việc đào tạo, bồi dưỡng, nâng cao trình độ, kỹ năng nghề; chính sách, quy định của doanh nghiệp; chính sách pháp luật cho người lao động',
                answer: 'yesno',
                action:
                  'Lập kế hoạch đào tạo năm có dòng ngân sách riêng, gồm cả đào tạo về quy định nội bộ và pháp luật lao động.',
              },
            ],
          },
          {
            title: 'Công đoàn và thỏa ước lao động tập thể',
            questions: [
              {
                num: '4.42',
                text: 'Doanh nghiệp đã có tổ chức công đoàn cơ sở thành lập đúng quy trình chưa?',
                kind: 'core',
                evidence: 'Quyết định công nhận công đoàn cơ sở; danh sách ban chấp hành.',
                code: 'L 47',
                csiText: 'Thành lập tổ chức công đoàn cơ sở theo đúng quy trình, thủ tục',
                answer: 'yesno',
                action:
                  'Phối hợp với công đoàn cấp trên để thành lập. Nếu chưa đủ điều kiện, ghi nhận việc đã liên hệ và tạo điều kiện cho người lao động gia nhập công đoàn cấp trên.',
              },
              {
                num: '4.43',
                text: 'Doanh nghiệp có tạo điều kiện (thời gian, địa điểm, kinh phí) cho công đoàn hoạt động không?',
                kind: 'core',
                evidence: 'Chứng từ đóng kinh phí công đoàn; biên bản hoạt động.',
                code: 'L 48',
                csiText:
                  'Tạo điều kiện cho đoàn viên, cán bộ công đoàn hoạt động công đoàn hiệu quả theo đúng chức năng, nhiệm vụ của công đoàn',
                answer: 'yesno',
                action:
                  'Bố trí thời gian, địa điểm cho hoạt động công đoàn và đóng kinh phí công đoàn đúng quy định.',
              },
              {
                num: '4.44',
                text: 'Doanh nghiệp có lấy ý kiến công đoàn khi xây dựng thang lương, bảng lương, định mức lao động và quy chế thưởng không?',
                kind: 'core',
                evidence: 'Văn bản lấy ý kiến và văn bản trả lời của công đoàn.',
                code: 'L 49',
                csiText:
                  'Lấy ý kiến của ban chấp hành công đoàn cơ sở khi xây dựng thang lương, bảng lương, định mức lao động và quy chế thưởng',
                answer: 'yesno',
                action:
                  'Gửi văn bản lấy ý kiến công đoàn trước khi ban hành và lưu lại văn bản trả lời.',
              },
              {
                num: '4.45',
                text: 'Doanh nghiệp có lấy ý kiến công đoàn khi xây dựng kế hoạch, nội quy, quy trình an toàn, vệ sinh lao động không?',
                kind: 'core',
                evidence: 'Văn bản lấy ý kiến; biên bản họp có chữ ký đại diện công đoàn.',
                code: 'L 50',
                csiText:
                  'Lấy ý kiến ban chấp hành công đoàn cơ sở (tại nơi có tổ chức công đoàn) khi xây dựng, ban hành kế hoạch, nội quy, quy trình bảo đảm an toàn, vệ sinh lao động tại nơi làm việc',
                answer: 'yesno',
                action:
                  'Lấy ý kiến công đoàn bằng văn bản trước khi ban hành các tài liệu an toàn, vệ sinh lao động.',
              },
              {
                num: '4.46',
                text: 'Khi có đề xuất thương lượng tập thể bằng văn bản, doanh nghiệp có tổ chức thương lượng đúng quy định không?',
                kind: 'core',
                evidence: 'Văn bản đề xuất thương lượng; biên bản các phiên thương lượng.',
                code: 'L 51',
                csiText:
                  'Đề xuất bằng văn bản yêu cầu thương lượng của một trong hai bên là công đoàn cơ sở hoặc người sử dụng lao động về nội dung yêu cầu thương lượng tập thể',
                answer: 'yesno',
                action:
                  'Phản hồi và tổ chức thương lượng trong thời hạn quy định khi một bên có yêu cầu bằng văn bản.',
              },
              {
                num: '4.47',
                text: 'Thỏa ước lao động tập thể (nếu có) có nội dung đúng luật và có lợi hơn cho người lao động không?',
                kind: 'core',
                evidence: 'Thỏa ước đã ký; văn bản gửi cơ quan quản lý lao động.',
                code: 'L 52',
                csiText:
                  'Nội dung của thỏa ước lao động tập thể không trái với quy định của pháp luật và có lợi hơn cho người lao động',
                answer: 'yesno',
                action:
                  'Thỏa ước cần có ít nhất một nội dung có lợi hơn cho người lao động so với luật. Chưa có thỏa ước thì chọn "Chưa có".',
              },
            ],
          },
          {
            title: 'Dân chủ tại nơi làm việc và đối thoại',
            questions: [
              {
                num: '4.48',
                text: 'Doanh nghiệp đã xây dựng và công khai quy chế dân chủ tại nơi làm việc chưa?',
                kind: 'core',
                evidence: 'Quy chế dân chủ đã ban hành; ảnh niêm yết.',
                code: 'L 53',
                csiText: 'Xây dựng và công khai quy chế dân chủ tại nơi làm việc',
                answer: 'yesno',
                action:
                  'Ban hành và niêm yết quy chế dân chủ, nêu rõ những gì người lao động được biết, được bàn, được quyết định, được kiểm tra.',
              },
              {
                num: '4.49',
                text: 'Doanh nghiệp có kênh trao đổi, xử lý thông tin nội bộ hai chiều (hòm thư góp ý, họp giao ban, nhóm nội bộ...) không?',
                kind: 'core',
                evidence: 'Quy định về trao đổi thông tin; sổ ghi nhận ý kiến và kết quả xử lý.',
                code: 'L 54',
                csiText:
                  'Xây dựng và thực hiện cơ chế trao đổi, xử lý thông tin trong nội bộ doanh nghiệp',
                answer: 'yesno',
                action: 'Lập kênh góp ý nội bộ và ghi lại các ý kiến nhận được cùng cách đã xử lý.',
              },
              {
                num: '4.50',
                text: 'Doanh nghiệp có tổ chức đối thoại tại nơi làm việc định kỳ hoặc khi có vụ việc không?',
                kind: 'core',
                evidence: 'Biên bản đối thoại; danh sách tham dự.',
                code: 'L 55',
                csiText: 'Tổ chức đối thoại tại nơi làm việc định kỳ hoặc đột xuất',
                answer: 'yesno',
                action:
                  'Tổ chức đối thoại ít nhất 1 lần/năm theo quy định, hoặc ngay khi có vụ việc phát sinh.',
              },
              {
                num: '4.51',
                text: 'Doanh nghiệp có tổ chức hội nghị người lao động hằng năm không?',
                kind: 'core',
                evidence: 'Biên bản hoặc nghị quyết hội nghị người lao động.',
                code: 'L 56',
                csiText: 'Tổ chức hội nghị người lao động thường niên',
                answer: 'yesno',
                action:
                  'Tổ chức hội nghị người lao động mỗi năm với sự tham gia của đại diện tập thể lao động.',
              },
              {
                num: '4.52',
                text: 'Khi có tranh chấp lao động, doanh nghiệp có giải quyết đúng trình tự pháp luật không?',
                kind: 'core',
                evidence: 'Hồ sơ vụ việc; biên bản hòa giải; quyết định giải quyết.',
                code: 'L 58',
                csiText: 'Giải quyết tranh chấp lao động theo đúng trình tự pháp luật quy định',
                answer: 'yesno',
                action:
                  'Giải quyết theo trình tự: thương lượng, hòa giải viên lao động, hội đồng trọng tài hoặc tòa án. Chưa từng có tranh chấp thì chọn "Không áp dụng".',
              },
            ],
          },
          {
            title: 'Lao động nữ, lao động đặc thù và không phân biệt đối xử',
            questions: [
              {
                num: '4.53',
                text: 'Nơi làm việc có đủ buồng tắm, buồng vệ sinh phù hợp (tách riêng nam, nữ) không?',
                kind: 'core',
                evidence: 'Sơ đồ mặt bằng; hình ảnh khu vệ sinh.',
                code: 'L 60',
                csiText: 'Bảo đảm có đủ buồng tắm và buồng vệ sinh phù hợp tại nơi làm việc',
                answer: 'yesno',
                action:
                  'Kiểm tra số lượng và tình trạng khu vệ sinh, bảo đảm tách riêng nam, nữ và đủ theo số người lao động.',
              },
              {
                num: '4.54',
                text: 'Nếu có sử dụng lao động chưa thành niên: doanh nghiệp có tuân thủ đúng nguyên tắc sử dụng không?',
                kind: 'core',
                evidence:
                  'Danh sách lao động chưa thành niên; văn bản đồng ý của người đại diện; hồ sơ khám sức khỏe.',
                code: 'L 62',
                csiText: 'Bảo đảm nguyên tắc sử dụng lao động chưa thành niên',
                answer: 'yesno',
                action:
                  'Phải có sự đồng ý của người đại diện, không bố trí công việc bị cấm, giới hạn thời giờ làm việc. Không sử dụng lao động chưa thành niên thì chọn "Không áp dụng".',
              },
              {
                num: '4.55',
                text: 'Doanh nghiệp có bảo đảm không cưỡng bức lao động dưới mọi hình thức (không giữ giấy tờ, không ép làm thêm, không đặt cọc...) không?',
                kind: 'core',
                evidence:
                  'Cam kết trong nội quy lao động; kết quả tự kiểm tra; biên bản đối thoại.',
                code: 'L 63',
                csiText: 'Không cưỡng bức lao động dưới mọi hình thức',
                answer: 'yesno',
                action:
                  'Rà soát: không giữ giấy tờ tùy thân, không yêu cầu đặt cọc, không ép làm thêm giờ, cho phép nghỉ việc theo quy định.',
              },
              {
                num: '4.56',
                text: 'Doanh nghiệp có bảo đảm không phân biệt đối xử (giới tính, dân tộc, tôn giáo, tình trạng hôn nhân...) trong tuyển dụng, trả lương, thăng tiến không?',
                kind: 'core',
                evidence: 'Nội quy lao động; quy trình tuyển dụng; sổ theo dõi khiếu nại.',
                code: 'L 64',
                csiText: 'Không phân biệt đối xử trong quản lý, sử dụng, điều hành lao động',
                answer: 'yesno',
                action:
                  'Rà soát quy định và thực tế tuyển dụng, trả lương, thăng tiến để loại bỏ mọi phân biệt đối xử.',
              },
              {
                num: '4.57',
                text: 'Nếu có sử dụng lao động khuyết tật: doanh nghiệp có bảo đảm điều kiện làm việc phù hợp và đúng nguyên tắc không?',
                kind: 'advanced',
                evidence: 'Danh sách lao động khuyết tật; hồ sơ điều kiện làm việc phù hợp.',
                code: 'L 66',
                csiText: 'Đảm bảo nguyên tắc sử dụng lao động khuyết tật',
                answer: 'yesno',
                action:
                  'Bảo đảm điều kiện làm việc phù hợp, không bố trí công việc nặng nhọc, độc hại, có tham khảo ý kiến trước khi quyết định vấn đề liên quan.',
              },
            ],
          },
          {
            title: 'Quan hệ với khách hàng và cộng đồng',
            questions: [
              {
                num: '4.58',
                text: 'Mọi thông tin quảng cáo, nhãn mác, tuyên bố "xanh" về sản phẩm, dịch vụ có trung thực và có bằng chứng chứng minh (không "tẩy xanh") không?',
                kind: 'core',
                evidence:
                  'Mẫu nhãn; nội dung quảng cáo; chứng nhận hoặc kết quả thử nghiệm làm cơ sở cho tuyên bố.',
                code: 'S 1',
                csiText:
                  'Tuân thủ các yêu cầu về tiếp thị và nhãn hiệu sản phẩm/dịch vụ, chống "tẩy xanh"',
                answer: 'yesno',
                action:
                  'Rà soát mọi tuyên bố "xanh", "sinh thái", "thân thiện môi trường": tuyên bố nào chưa có bằng chứng thì bỏ hoặc sửa.',
              },
              {
                num: '4.59',
                text: 'Doanh nghiệp có kiểm tra chất lượng sản phẩm, dịch vụ để bảo đảm an toàn, sức khỏe cho người tiêu dùng, đặc biệt là trẻ em không?',
                kind: 'core',
                evidence:
                  'Quy trình kiểm soát chất lượng; kết quả thử nghiệm hoặc chứng nhận hợp quy.',
                code: 'S 2',
                csiText:
                  'Kiểm tra đánh giá chất lượng sản phẩm/dịch vụ nhằm đảm bảo an toàn, sức khỏe cho người tiêu dùng, đặc biệt là trẻ em',
                answer: 'yesno',
                action:
                  'Thiết lập bước kiểm tra chất lượng và an toàn trước khi đưa sản phẩm ra thị trường.',
              },
              {
                num: '4.60',
                text: 'Doanh nghiệp có bảo mật thông tin cá nhân của khách hàng khi thu thập, lưu trữ, sử dụng không?',
                kind: 'core',
                evidence: 'Chính sách bảo mật dữ liệu; quy định phân quyền truy cập.',
                code: 'S 3',
                csiText:
                  'Thực hiện quyền bảo mật thông tin của khách hàng trong quá trình thu thập, lưu trữ, xử lý và sử dụng',
                answer: 'yesno',
                action:
                  'Ban hành chính sách bảo mật dữ liệu khách hàng theo Nghị định 13/2023/NĐ-CP, phân quyền ai được xem dữ liệu nào.',
              },
              {
                num: '4.61',
                text: 'Doanh nghiệp có nhận sinh viên thực tập hoặc làm việc không?',
                kind: 'advanced',
                evidence:
                  'Thỏa thuận với cơ sở đào tạo; danh sách sinh viên; giấy xác nhận thực tập.',
                code: 'S 5',
                csiText: 'Tạo điều kiện để sinh viên thực tập, làm việc tại doanh nghiệp',
                answer: 'yesno',
                action:
                  'Ký hợp tác với trường đại học, cao đẳng, trường nghề để nhận sinh viên thực tập, có người hướng dẫn.',
              },
            ],
          },
        ],
      },
    ],
    areaTitles: [
      'Số liệu kinh doanh và vận hành',
      'Quản trị doanh nghiệp',
      'Môi trường',
      'Người lao động và xã hội',
    ],
    results: {
      title: 'Kết quả mức độ sẵn sàng ESG',
      subtitle: 'Doanh nghiệp bạn đang ở đâu và còn thiếu gì?',
      note: 'Trang này tự cập nhật theo câu trả lời của bạn. Không cần điền gì ở đây, trừ ngưỡng "Gần sẵn sàng" nếu muốn điều chỉnh.',
      overallLabel: 'Mức sẵn sàng chung của doanh nghiệp',
      overallNote: 'Bằng mức thấp nhất của bốn lĩnh vực bên dưới.',
      areasTitle: 'Mức sẵn sàng theo từng lĩnh vực',
      areasHeaders: [
        'Lĩnh vực',
        'Việc bắt buộc đã có',
        'Việc bắt buộc còn thiếu',
        'Trong đó cần khắc phục ngay',
        'Tiến độ việc bắt buộc',
        'Mức sẵn sàng',
        'Việc nâng cao đã làm',
        'Câu chưa trả lời',
      ],
      howTitle: 'Cách xác định mức sẵn sàng',
      how: [
        {
          label: 'SẴN SÀNG',
          text: 'Đã có đủ toàn bộ các việc bắt buộc áp dụng được trong lĩnh vực.',
        },
        {
          label: 'GẦN SẴN SÀNG',
          text: 'Đã có từ mức ngưỡng ở ô bên dưới trở lên, nhưng chưa đủ toàn bộ.',
        },
        {
          label: 'CHƯA SẴN SÀNG',
          text: 'Chưa đạt mức ngưỡng ở ô bên dưới.',
        },
      ],
      thresholdLabel: 'Ngưỡng "Gần sẵn sàng" (có thể sửa):',
      thresholdNote:
        'Mặc định 80% việc bắt buộc. Câu chọn "Không áp dụng" không được tính. Việc nâng cao là giá trị cộng thêm, không ảnh hưởng tới mức sẵn sàng.',
      thresholdDefault: 0.8,
      groupsTitle: 'Khoảng cách nằm ở đâu - Theo nhóm việc',
      groupsHeaders: [
        'Nhóm việc',
        'Lĩnh vực',
        'Việc bắt buộc đã có',
        'Việc bắt buộc còn thiếu',
        'Tiến độ việc bắt buộc',
        'Việc nâng cao đã làm',
        'Câu chưa trả lời',
      ],
      firstTitle: 'Việc bắt buộc cần làm trước',
      firstNote: '10 việc đầu tiên - xem đủ ở trang "Khoảng cách cần lấp"',
      firstHeaders: ['STT câu hỏi', 'Việc còn thiếu', 'Ưu tiên'],
    },
    gap: {
      title: 'Khoảng cách cần lấp và kế hoạch hành động',
      subtitle:
        'Lọc theo mức "Ưu tiên" để xem việc cần làm trước. Phân công người phụ trách và hạn hoàn thành cho từng việc.',
      note: 'Các nội dung từ "Câu hỏi" đến "Giấy tờ cần có" tự cập nhật theo câu trả lời của bạn.',
      headers: [
        'STT',
        'Lĩnh vực',
        'Nhóm việc',
        'Câu hỏi',
        'Loại việc',
        'Trả lời',
        'Tình trạng',
        'Ưu tiên',
        'Việc cần làm',
        'Giấy tờ cần có',
        'Người phụ trách',
        'Hạn hoàn thành',
        'Tiến độ',
      ],
    },
    documents: {
      title: 'Danh mục hồ sơ cần có',
      subtitle: 'Những giấy tờ giúp doanh nghiệp trả lời "Có" một cách tự tin',
      note: 'Đánh dấu tình trạng từng loại hồ sơ. Nên lưu đủ cho 3 năm gần nhất và đặt tên thư mục theo số thứ tự câu hỏi để dễ tìm.',
      headers: [
        'Hồ sơ, tài liệu',
        'Liên quan tới câu hỏi',
        'Lưu ý',
        'Đã có?',
        'Lưu ở đâu',
        'Người giữ',
      ],
      groups: [
        {
          title: 'Nhóm 1 - Quản trị và cam kết',
          items: [
            {
              id: 'd7',
              title: 'Kế hoạch kinh doanh năm có chỉ tiêu môi trường và xã hội',
              refs: '2.1',
              note: 'Ít nhất một chỉ tiêu môi trường và một chỉ tiêu xã hội có con số cụ thể, do lãnh đạo phê duyệt.',
            },
            {
              id: 'd8',
              title: 'Quy định quản trị rủi ro và danh sách rủi ro chính',
              refs: '2.2',
              note: 'Doanh nghiệp nhỏ có thể gói gọn trong 2 - 3 trang.',
            },
            {
              id: 'd9',
              title: 'Bộ câu hỏi và kết quả khảo sát sự hài lòng của khách hàng',
              refs: '2.3',
              note: 'Một biểu mẫu trực tuyến ngắn là đủ.',
            },
            {
              id: 'd10',
              title: 'Quy trình xử lý khiếu nại và sổ theo dõi khiếu nại',
              refs: '2.4',
              note: 'Nêu rõ thời hạn phản hồi và cách bảo vệ người tố giác.',
            },
            {
              id: 'd11',
              title: 'Quy định phòng chống quấy rối tình dục nơi làm việc',
              refs: '2.5',
              note: 'Nên đưa vào nội quy lao động.',
            },
            {
              id: 'd12',
              title: 'Cam kết không sử dụng động vật hoang dã, bảo vệ đa dạng sinh học',
              refs: '2.6, 3.13',
              note: 'Một văn bản có thể đáp ứng cả hai câu hỏi.',
            },
          ],
        },
        {
          title: 'Nhóm 2 - Hồ sơ môi trường',
          items: [
            {
              id: 'd14',
              title: 'Giấy phép môi trường hoặc giấy xác nhận đăng ký môi trường',
              refs: '3.1',
              note: 'Kiểm tra ngày hết hạn, gia hạn trước 6 tháng.',
            },
            {
              id: 'd15',
              title: 'Chứng từ nộp thuế, phí bảo vệ môi trường',
              refs: '3.2',
              note: 'Lưu đủ 3 năm.',
            },
            {
              id: 'd16',
              title: 'Báo cáo công tác bảo vệ môi trường hằng năm',
              refs: '3.3',
              note: 'Thường nộp trước ngày 15/01 hằng năm - cần biên nhận.',
            },
            {
              id: 'd17',
              title: 'Hợp đồng và chứng từ chuyển giao chất thải với đơn vị có giấy phép',
              refs: '3.4, 3.5, 1.16',
              note: 'Kiểm tra giấy phép của đơn vị xử lý còn hiệu lực.',
            },
            {
              id: 'd18',
              title: 'Sổ đăng ký chủ nguồn thải chất thải nguy hại',
              refs: '3.5',
              note: 'Bắt buộc nếu có phát sinh chất thải nguy hại.',
            },
            {
              id: 'd19',
              title: 'Danh mục hóa chất và phiếu an toàn hóa chất',
              refs: '3.8',
              note: 'Kèm hướng dẫn an toàn cho người tiếp xúc.',
            },
            {
              id: 'd20',
              title: 'Kết quả quan trắc nước thải, khí thải định kỳ',
              refs: '3.10, 1.21',
              note: 'Theo đúng tần suất trong giấy phép môi trường.',
            },
            {
              id: 'd21',
              title: 'Quy định tiết kiệm năng lượng',
              refs: '3.12',
              note: 'Kèm biên bản kiểm tra việc thực hiện.',
            },
          ],
        },
        {
          title: 'Nhóm 3 - Hồ sơ lao động và an toàn',
          items: [
            {
              id: 'd23',
              title: 'Bộ hợp đồng lao động và danh sách lao động',
              refs: '4.1, 4.2, 4.3',
              note: 'Đủ nội dung bắt buộc theo Điều 21 Bộ luật Lao động 2019.',
            },
            {
              id: 'd24',
              title: 'Sổ quản lý lao động',
              refs: '4.5',
              note: 'Bản giấy hoặc điện tử đều được.',
            },
            {
              id: 'd25',
              title: 'Nội quy lao động đã đăng ký',
              refs: '4.7, 2.5',
              note: 'Bắt buộc đăng ký với doanh nghiệp từ 10 lao động.',
            },
            {
              id: 'd26',
              title: 'Thang lương, bảng lương đã niêm yết',
              refs: '4.10, 4.44',
              note: 'Kèm ý kiến của tổ chức đại diện người lao động (nếu có).',
            },
            {
              id: 'd27',
              title: 'Thông báo kết quả đóng BHXH (mẫu C12-TS)',
              refs: '4.14, 1.12',
              note: 'Bằng chứng mạnh nhất cho việc đóng bảo hiểm.',
            },
            {
              id: 'd28',
              title: 'Bảng chấm công và hồ sơ làm thêm giờ',
              refs: '4.21, 4.22, 4.23',
              note: 'Kèm văn bản đồng ý làm thêm giờ của người lao động.',
            },
            {
              id: 'd29',
              title: 'Hồ sơ khám sức khỏe định kỳ',
              refs: '4.25',
              note: 'Ít nhất 1 lần/năm.',
            },
            {
              id: 'd30',
              title: 'Kế hoạch an toàn, vệ sinh lao động hằng năm',
              refs: '4.29',
              note: 'Có kinh phí và phân công trách nhiệm.',
            },
            {
              id: 'd31',
              title: 'Hồ sơ huấn luyện an toàn, vệ sinh lao động',
              refs: '4.37',
              note: 'Kèm thẻ an toàn hoặc giấy chứng nhận.',
            },
            {
              id: 'd32',
              title: 'Kết quả quan trắc môi trường lao động',
              refs: '4.38',
              note: 'Hằng năm.',
            },
            {
              id: 'd33',
              title: 'Kế hoạch đào tạo năm có kinh phí',
              refs: '4.41, 1.13',
              note: 'Kèm bảng tổng hợp giờ đào tạo.',
            },
            {
              id: 'd34',
              title: 'Quy chế dân chủ và biên bản đối thoại, hội nghị người lao động',
              refs: '4.48, 4.50, 4.51',
              note: 'Kèm ảnh niêm yết quy chế.',
            },
          ],
        },
        {
          title: 'Nhóm 4 - Khách hàng và sản phẩm',
          items: [
            {
              id: 'd36',
              title: 'Bằng chứng cho mọi tuyên bố "xanh" trên nhãn và quảng cáo',
              refs: '4.58',
              note: 'Để tránh bị coi là "tẩy xanh".',
            },
            {
              id: 'd37',
              title: 'Quy trình kiểm soát chất lượng sản phẩm',
              refs: '4.59',
              note: 'Đặc biệt với sản phẩm cho trẻ em.',
            },
            {
              id: 'd38',
              title: 'Chính sách bảo mật dữ liệu cá nhân khách hàng',
              refs: '4.60',
              note: 'Theo Nghị định 13/2023/NĐ-CP.',
            },
          ],
        },
        {
          title: 'Nhóm 5 - Sổ sách số liệu nên ghi hằng tháng',
          items: [
            {
              id: 'd40',
              title: 'Sổ theo dõi tiêu thụ điện, nhiên liệu',
              refs: '1.18, 3.12',
              note: 'Cơ sở để thấy kết quả tiết kiệm năng lượng.',
            },
            {
              id: 'd41',
              title: 'Sổ theo dõi tiêu thụ nước',
              refs: '1.19, 1.20',
              note: 'Chia cho sản lượng để ra lượng nước trên một sản phẩm.',
            },
            {
              id: 'd42',
              title: 'Sổ theo dõi khối lượng chất thải theo loại',
              refs: '1.16, 1.17',
              note: 'Khớp với chứng từ chuyển giao.',
            },
            {
              id: 'd43',
              title: 'Bảng số liệu lao động theo giới tính và cấp quản lý',
              refs: '1.8, 1.9, 1.11',
              note: 'Cập nhật cuối mỗi năm.',
            },
          ],
        },
      ],
    },
    glossary: {
      title: 'Giải thích thuật ngữ',
      entries: [
        {
          term: 'Sẵn sàng',
          definition:
            'Doanh nghiệp đã có đủ toàn bộ các việc bắt buộc (áp dụng được) trong một lĩnh vực.',
        },
        {
          term: 'Gần sẵn sàng',
          definition:
            'Doanh nghiệp đã có từ 80% các việc bắt buộc trở lên trong một lĩnh vực nhưng chưa đủ toàn bộ. Ngưỡng 80% có thể điều chỉnh ở trang Kết quả sẵn sàng.',
        },
        {
          term: 'Chưa sẵn sàng',
          definition: 'Doanh nghiệp có dưới 80% các việc bắt buộc trong một lĩnh vực.',
        },
        {
          term: 'Việc bắt buộc',
          definition:
            'Việc gắn với quy định pháp luật Việt Nam. Tương ứng với các chỉ số cơ bản (C - Core) trong Bộ chỉ số CSI.',
        },
        {
          term: 'Việc nâng cao',
          definition:
            'Việc doanh nghiệp làm thêm để giảm rủi ro và tạo lợi thế. Tương ứng với các chỉ số nâng cao (A - Advance) trong Bộ chỉ số CSI.',
        },
        {
          term: 'Cần khắc phục',
          definition:
            'Câu trả lời cho thấy doanh nghiệp đang có vấn đề tuân thủ cần xử lý ngay - ví dụ chưa đóng bảo hiểm cho 100% người lao động thuộc diện phải đóng.',
        },
        {
          term: 'Cần lưu ý',
          definition:
            'Doanh nghiệp đã có số liệu, nhưng con số đáng để xem xét kỹ - ví dụ có tai nạn lao động, hoặc kinh doanh lỗ. Không làm giảm mức sẵn sàng.',
        },
        {
          term: 'ESG',
          definition:
            'Environmental - Social - Governance: ba nhóm yếu tố Môi trường, Xã hội và Quản trị dùng để đánh giá mức độ bền vững của doanh nghiệp.',
        },
        {
          term: 'CSI',
          definition:
            'Bộ chỉ số Doanh nghiệp bền vững do VCCI và VBCSD ban hành, dùng để đánh giá và công bố các doanh nghiệp bền vững tại Việt Nam. Công cụ này được xây dựng dựa trên CSI 2026.',
        },
        {
          term: 'ROE, ROA, ROS',
          definition:
            'Ba chỉ số lợi nhuận: lợi nhuận sau thuế chia cho vốn chủ sở hữu (ROE), cho tổng tài sản (ROA), cho doanh thu (ROS). Kế toán của doanh nghiệp có thể tính nhanh từ báo cáo tài chính.',
        },
        {
          term: 'Giấy phép môi trường, đăng ký môi trường',
          definition:
            'Hai loại thủ tục môi trường theo Luật Bảo vệ môi trường 2020. Doanh nghiệp cần loại nào tùy vào nhóm doanh nghiệp theo tiêu chí môi trường.',
        },
        {
          term: 'Chất thải nguy hại',
          definition:
            'Chất thải có thể gây hại cho sức khỏe và môi trường: dầu nhớt thải, giẻ lau dính dầu, bóng đèn huỳnh quang, pin, hóa chất, bao bì đựng hóa chất... Phải lưu giữ riêng và chuyển giao cho đơn vị có giấy phép.',
        },
        {
          term: 'EPR',
          definition:
            'Trách nhiệm mở rộng của nhà sản xuất: nhà sản xuất, nhập khẩu một số loại sản phẩm, bao bì phải tái chế hoặc đóng góp tài chính để tái chế.',
        },
        {
          term: 'Quan trắc môi trường lao động',
          definition:
            'Việc đo các yếu tố có hại tại nơi làm việc như bụi, ồn, rung, ánh sáng, nhiệt độ, hơi khí độc.',
        },
        {
          term: 'Nội quy lao động',
          definition:
            'Văn bản quy định kỷ luật lao động tại doanh nghiệp. Doanh nghiệp từ 10 lao động trở lên phải có nội quy bằng văn bản và đăng ký với cơ quan quản lý lao động.',
        },
        {
          term: 'Quy chế dân chủ ở cơ sở',
          definition:
            'Văn bản quy định những nội dung người lao động được biết, được bàn, được quyết định và được kiểm tra tại nơi làm việc.',
        },
        {
          term: 'Thỏa ước lao động tập thể',
          definition:
            'Thỏa thuận bằng văn bản giữa tập thể người lao động và doanh nghiệp, có nội dung có lợi hơn cho người lao động so với quy định của luật.',
        },
        {
          term: 'Tẩy xanh (greenwashing)',
          definition:
            'Đưa ra tuyên bố về lợi ích môi trường của sản phẩm hoặc doanh nghiệp mà không có bằng chứng, gây hiểu lầm cho khách hàng.',
        },
      ],
    },
    about: {
      title: 'Về công cụ này',
      sections: [
        {
          title: 'Công cụ được xây dựng thế nào',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Nền tảng',
                  text: 'Bộ chỉ số Doanh nghiệp bền vững CSI 2026, phiên bản dành cho doanh nghiệp nhỏ và siêu nhỏ, do Liên đoàn Thương mại và Công nghiệp Việt Nam (VCCI) và Hội đồng Doanh nghiệp vì sự Phát triển bền vững Việt Nam (VBCSD) ban hành. Bộ chỉ số gồm 105 chỉ số: 86 chỉ số cơ bản và 19 chỉ số nâng cao.',
                },
                {
                  label: 'Độ phủ',
                  text: 'Cả 105 chỉ số của CSI đều có mặt trong công cụ, mỗi chỉ số thành một câu hỏi. Mã chỉ số và nội dung nguyên văn trong CSI nằm ở hai cột thu gọn cuối mỗi trang câu hỏi - bấm dấu "+" phía trên cột để mở ra.',
                },
                {
                  label: 'Khác gì với Bộ chỉ số CSI',
                  text: 'CSI là bộ tiêu chí để chấm điểm và xếp hạng doanh nghiệp. Công cụ này dùng cùng nội dung nhưng với mục đích khác: giúp doanh nghiệp tự đánh giá mức độ sẵn sàng và nhìn ra khoảng cách. Vì vậy công cụ không có thang điểm, câu hỏi được viết lại bằng ngôn ngữ đời thường, và các chỉ số định lượng được chuyển thành lựa chọn theo khoảng.',
                },
                {
                  label: 'Đây không phải hồ sơ CSI',
                  text: 'Kết quả của công cụ là kết quả tự đánh giá nội bộ, không phải hồ sơ dự thi và không phải kết quả đánh giá của Chương trình CSI. Hồ sơ chính thức được nộp trực tuyến tại vbcsd.vn theo biểu mẫu và thời hạn của Ban Tổ chức.',
                },
              ],
            },
          ],
        },
        {
          title: 'Cách xác định mức sẵn sàng',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Cho từng lĩnh vực',
                  text: 'Chỉ tính các việc bắt buộc áp dụng được (bỏ qua câu chọn "Không áp dụng"). SẴN SÀNG khi đã có toàn bộ. GẦN SẴN SÀNG khi đã có từ 80% trở lên. CHƯA SẴN SÀNG khi dưới 80%. Ngưỡng 80% do Dear Our Community đề xuất và có thể điều chỉnh ở trang Kết quả sẵn sàng.',
                },
                {
                  label: 'Cho toàn doanh nghiệp',
                  text: 'Lấy mức thấp nhất trong bốn lĩnh vực. Doanh nghiệp chỉ thực sự sẵn sàng khi mọi lĩnh vực đều sẵn sàng - một lĩnh vực còn yếu là đủ để gây rủi ro với khách hàng, ngân hàng hay cơ quan quản lý.',
                },
                {
                  label: 'Việc nâng cao',
                  text: 'Được đếm và hiển thị riêng như giá trị cộng thêm, không ảnh hưởng tới mức sẵn sàng.',
                },
                {
                  label: 'Vì sao dựa vào việc bắt buộc',
                  text: 'Bộ chỉ số CSI yêu cầu doanh nghiệp hoàn thiện tất cả các chỉ số cơ bản phù hợp với đặc thù của mình. Đây là chuẩn rõ ràng và khách quan nhất để xác định một doanh nghiệp đã sẵn sàng hay chưa.',
                },
              ],
            },
          ],
        },
        {
          title: 'Các câu hỏi số liệu',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Chọn theo khoảng',
                  text: 'Với 22 câu hỏi số liệu, doanh nghiệp chọn khoảng thay vì nhập con số. Chọn "Chưa có số liệu" được tính là còn thiếu.',
                },
                {
                  label: 'Cần khắc phục',
                  text: 'Một số khoảng cho thấy doanh nghiệp đang có vấn đề tuân thủ: tỷ lệ đóng bảo hiểm bắt buộc dưới 100%, chất thải rắn chưa được chuyển giao toàn bộ cho đơn vị có giấy phép, nước thải chưa được xử lý đạt chuẩn toàn bộ. Các lựa chọn này được tính là còn thiếu và được đưa lên đầu danh sách ưu tiên.',
                },
                {
                  label: 'Cần lưu ý',
                  text: 'Một số khoảng cho thấy doanh nghiệp đã có số liệu nhưng con số đáng xem xét kỹ: kinh doanh lỗ, tỷ suất lợi nhuận âm, thu nhập bình quân dưới 5 triệu đồng, chênh lệch thu nhập nam - nữ trên 20%, có xảy ra tai nạn lao động. Các lựa chọn này không làm giảm mức sẵn sàng.',
                },
                {
                  label: 'Các khoảng doanh thu',
                  text: 'Các mốc 3, 10, 50 và 100 tỷ đồng được chọn theo tiêu chí phân loại doanh nghiệp tại Nghị định 80/2021/NĐ-CP.',
                },
              ],
            },
          ],
        },
        {
          title: 'Biên soạn và phạm vi trách nhiệm',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Biên soạn',
                  text: 'Dear Our Community - ESG Knowledge Hub và Cộng đồng Thực hành ESG.',
                },
                {
                  label: 'Phạm vi trách nhiệm',
                  text: 'Công cụ hỗ trợ doanh nghiệp tự đánh giá và lập kế hoạch, không phải tư vấn pháp lý. Doanh nghiệp cần đối chiếu văn bản pháp luật hiện hành và tham vấn chuyên gia khi cần.',
                },
                {
                  label: 'Cập nhật',
                  text: 'Bộ chỉ số CSI được VCCI cập nhật hằng năm. Công cụ sẽ được rà soát khi CSI phiên bản mới được công bố.',
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
