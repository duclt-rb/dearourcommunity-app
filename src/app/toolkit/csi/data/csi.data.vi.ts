/**
 * Bộ công cụ ESG theo Bộ chỉ số CSI 2026 — phiên bản DN nhỏ và siêu nhỏ (bản gốc tiếng Việt).
 * Nội dung NGUYÊN VĂN từ bộ file Excel gốc (sheet 1, 2, 3, 3.1, 4–9) — không biên tập lại.
 * Cấu trúc id/key khoá chặt với bản EN bởi `parity.spec.ts`.
 */
import type { CsiToolkitConfig } from '../csi.types';

export const CSI_TOOLKITS_VI: Record<string, CsiToolkitConfig> = {
  'csi-2026-sme': {
    id: 'csi-2026-sme',
    name: 'BỘ CÔNG CỤ ESG THEO BỘ CHỈ SỐ CSI 2026',
    sector: 'PHIÊN BẢN DÀNH CHO DOANH NGHIỆP NHỎ VÀ SIÊU NHỎ',
    brand: 'Dear Our Community | ESG Knowledge Hub',
    guide: {
      id: 'guide',
      header: [
        'BỘ CÔNG CỤ ESG THEO BỘ CHỈ SỐ CSI 2026',
        'PHIÊN BẢN DÀNH CHO DOANH NGHIỆP NHỎ VÀ SIÊU NHỎ',
        'Dear Our Community | ESG Knowledge Hub',
      ],
      sections: [
        {
          id: 'guide-s1',
          title: 'Bộ công cụ này dùng để làm gì?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Đây là công cụ tự đánh giá và lập kế hoạch ESG cho doanh nghiệp Việt Nam, xây dựng trên Bộ chỉ số Doanh nghiệp bền vững CSI 2026 do Liên đoàn Thương mại và Công nghiệp Việt Nam (VCCI) và Hội đồng Doanh nghiệp vì sự Phát triển bền vững Việt Nam (VBCSD) ban hành.',
            },
            {
              kind: 'paragraph',
              text: 'Bộ công cụ giúp doanh nghiệp trả lời ba câu hỏi: (1) Chúng ta đang ở đâu so với chuẩn CSI? (2) Khoảng cách lớn nhất nằm ở đâu? (3) Trong 12 tháng tới cần làm gì trước?',
            },
            {
              kind: 'paragraph',
              text: 'Bộ công cụ KHÔNG phải là hồ sơ dự thi chính thức. Hồ sơ chính thức được nộp trực tuyến tại vbcsd.vn/dangkycsi theo biểu mẫu của Ban Tổ chức. Điểm số trong file này là điểm TỰ ĐÁNH GIÁ, mang tính định hướng, không phải điểm do Hội đồng đánh giá chấm.',
            },
          ],
        },
        {
          id: 'guide-s2',
          title: 'Vì sao Dear Our Community chọn CSI làm nền tảng?',
          blocks: [
            {
              kind: 'paragraph',
              text: '1. CSI được thiết kế cho doanh nghiệp Việt Nam - bám sát pháp luật Việt Nam hiện hành, đồng thời tham chiếu các thông lệ quốc tế (ISSB/IFRS S1-S2, TCFD, Nguyên tắc Hướng dẫn của Liên hợp quốc về Kinh doanh và Quyền con người).',
            },
            {
              kind: 'paragraph',
              text: '2. CSI có hai phiên bản theo quy mô, nên doanh nghiệp siêu nhỏ không bị áp chuẩn của tập đoàn.',
            },
            {
              kind: 'paragraph',
              text: '3. CSI phân tách rõ chỉ số tuân thủ (C) và chỉ số nâng cao (A) - giúp doanh nghiệp biết đâu là việc bắt buộc, đâu là việc tạo lợi thế cạnh tranh.',
            },
            {
              kind: 'paragraph',
              text: '4. CSI gắn với một chương trình quốc gia đã vận hành 11 năm liên tiếp, có cơ chế đánh giá độc lập và cộng đồng doanh nghiệp thực hành cùng nhau.',
            },
          ],
        },
        {
          id: 'guide-s3',
          title: 'Sáu bước sử dụng',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Bước 1',
                  text: 'Đọc trang "Giới thiệu CSI 2026" để nắm cấu trúc bộ chỉ số và thang điểm.',
                },
                {
                  label: 'Bước 2',
                  text: 'Điền trang "Hồ sơ doanh nghiệp". Đây là nền tảng số liệu cho mọi phần sau. Cần số liệu của cả 3 năm 2023, 2024, 2025.',
                },
                {
                  label: 'Bước 3',
                  text: 'Tự đánh giá lần lượt 4 nhóm chỉ số: Kết quả (I), Quản trị (G), Môi trường (E), Lao động - Xã hội (L&S). Trả lời Có hoặc Không cho từng chỉ số, đúng như biểu mẫu chính thức của Chương trình CSI. Chỉ trả lời "Có" khi doanh nghiệp thực sự đang thực hiện VÀ có tài liệu chứng minh - đây cũng là cách Hội đồng đánh giá xem xét hồ sơ.',
                },
                {
                  label: 'Bước 4',
                  text: 'Xem trang "Bảng điểm tổng hợp" để biết mức độ sẵn sàng theo từng trụ cột.',
                },
                {
                  label: 'Bước 5',
                  text: 'Mở trang "Kế hoạch hành động", lọc theo mức ưu tiên CAO để xử lý các chỉ số tuân thủ pháp luật trước.',
                },
                {
                  label: 'Bước 6',
                  text: 'Dùng trang "Lộ trình 12 tháng" và "Danh mục hồ sơ, tài liệu" để phân công người phụ trách và thời hạn cụ thể.',
                },
              ],
            },
          ],
        },
        {
          id: 'guide-s4',
          title: 'Quy ước màu sắc trong file',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Ô nền VÀNG',
                  text: 'Ô doanh nghiệp cần điền hoặc chọn',
                },
                {
                  label: 'Ô nền XÁM',
                  text: 'Ô công thức tự tính - không nên sửa',
                },
                {
                  label: 'Ô nền TRẮNG',
                  text: 'Nội dung tham khảo, chỉ để đọc',
                },
                {
                  label: 'Trả lời Có',
                  text: 'Doanh nghiệp đang thực hiện VÀ có tài liệu chứng minh. Được tính đủ điểm tối đa của chỉ số',
                },
                {
                  label: 'Trả lời Không',
                  text: 'Chưa thực hiện, hoặc đang làm dở, hoặc đã làm nhưng chưa có hồ sơ chứng minh. Được 0 điểm',
                },
                {
                  label: 'Không thuộc đối tượng áp dụng',
                  text: 'Chỉ số không phát sinh tại doanh nghiệp. Loại khỏi cả tử số và mẫu số khi tính tỷ lệ sẵn sàng',
                },
                {
                  label: 'Chỉ số C (Core)',
                  text: 'Chỉ số cơ bản, gắn với tuân thủ pháp luật - doanh nghiệp cần hoàn thiện tất cả các chỉ số C phù hợp với đặc thù của mình',
                },
                {
                  label: 'Chỉ số A (Advance)',
                  text: 'Chỉ số nâng cao, gắn với chương trình, sáng kiến giảm rủi ro môi trường - xã hội và tạo lợi thế cạnh tranh',
                },
              ],
            },
          ],
        },
        {
          id: 'guide-s5',
          title: 'Nguyên tắc quan trọng khi tự đánh giá',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Trung thực quan trọng hơn điểm cao. Mục đích của bộ công cụ là nhìn thấy khoảng cách thật, không phải tạo ra một bảng điểm đẹp. Một chỉ số được đánh dấu "Có" nhưng không có hồ sơ chứng minh sẽ không được Hội đồng đánh giá công nhận.',
            },
            {
              kind: 'paragraph',
              text: 'Bộ công cụ dùng đúng cách trả lời Có/Không của biểu mẫu CSI chính thức, để kết quả tự đánh giá phản ánh sát nhất những gì Hội đồng đánh giá sẽ nhìn thấy. Nếu doanh nghiệp đã bắt đầu làm nhưng chưa hoàn thiện hoặc chưa có hồ sơ, câu trả lời đúng vẫn là "Không" - và hãy ghi tiến độ thực tế vào cột "Ghi chú / hồ sơ hiện có" để theo dõi.',
            },
            {
              kind: 'paragraph',
              text: 'Mọi chỉ số đều cần số liệu và tài liệu của 3 năm thuộc kỳ đánh giá (2023-2025). Nếu chưa có hệ thống ghi chép, hãy bắt đầu từ trang "Danh mục hồ sơ, tài liệu".',
            },
            {
              kind: 'paragraph',
              text: 'Chỉ số nào doanh nghiệp thực sự không phát sinh (ví dụ: không nhập khẩu phế liệu, không có bếp ăn tập thể) thì chọn "Không thuộc đối tượng áp dụng". Chỉ số đó sẽ được loại khỏi mẫu số khi tính tỷ lệ sẵn sàng.',
            },
          ],
        },
        {
          id: 'guide-s6',
          title: 'Lưu ý về thời hạn',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Kỳ nộp hồ sơ Chương trình CSI 2026 đóng lúc 23h59 ngày 08/8/2026. Nếu doanh nghiệp bắt đầu sau thời điểm này, hãy sử dụng bộ công cụ để chuẩn bị cho kỳ đánh giá năm tiếp theo - toàn bộ số liệu và hồ sơ đều cần tích lũy trong 3 năm nên bắt đầu sớm luôn có lợi.',
            },
          ],
        },
      ],
    },
    intro: {
      id: 'intro',
      header: ['GIỚI THIỆU BỘ CHỈ SỐ CSI 2026 - PHIÊN BẢN DÀNH CHO DOANH NGHIỆP NHỎ VÀ SIÊU NHỎ'],
      sections: [
        {
          id: 'intro-s1',
          title: 'CSI là gì?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'CSI (Corporate Sustainability Index - Bộ chỉ số Doanh nghiệp bền vững) là bộ tiêu chí đánh giá mức độ phát triển bền vững của doanh nghiệp tại Việt Nam, do VCCI chủ trì xây dựng và được sử dụng làm căn cứ chấm điểm trong Chương trình Đánh giá, Công bố các Doanh nghiệp bền vững tại Việt Nam. Năm 2026 là năm thứ 11 chương trình được triển khai liên tiếp.',
            },
            {
              kind: 'paragraph',
              text: 'CSI tích hợp ba yếu tố Môi trường - Xã hội - Quản trị (E-S-G) vào hoạch định chiến lược, phân bổ nguồn lực, lập kế hoạch hành động và ghi chép, lưu trữ số liệu thực hiện.',
            },
          ],
        },
        {
          id: 'intro-s2',
          title: 'Điểm mới của CSI 2026',
          blocks: [
            {
              kind: 'paragraph',
              text: 'CSI 2026 được cập nhật theo yêu cầu tuân thủ của chính sách, pháp luật Việt Nam năm 2026 và theo các chuẩn mực báo cáo bền vững quốc tế mới đã được điều chỉnh phù hợp với bối cảnh Việt Nam, bao gồm chuẩn mực của Ủy ban Chuẩn mực Bền vững Quốc tế (ISSB), khuyến nghị của Lực lượng đặc nhiệm về Công bố thông tin tài chính liên quan đến khí hậu (TCFD) và Nguyên tắc Hướng dẫn của Liên hợp quốc về Kinh doanh và Quyền con người.',
            },
            {
              kind: 'paragraph',
              text: 'Với doanh nghiệp vừa và lớn, CSI 2026 yêu cầu chứng minh hành động cụ thể và kết quả đo lường được, thay vì chỉ nêu mục tiêu.',
            },
            {
              kind: 'paragraph',
              text: 'Doanh nghiệp trong chuỗi cung ứng quốc tế hoặc có đối tác chiến lược nước ngoài (chiếm từ 20% doanh thu hoặc cung cấp từ 20% nguyên vật liệu) được khuyến khích lập thêm một số chỉ tiêu thuộc IFRS S1 (yêu cầu chung về công bố thông tin bền vững) và IFRS S2 (công bố thông tin liên quan tới khí hậu).',
            },
          ],
        },
        {
          id: 'intro-s3',
          title: 'Hai cấp độ chỉ số',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Chỉ số cơ bản (C - Core): các chỉ số liên quan tới tuân thủ pháp luật. Doanh nghiệp được yêu cầu hoàn thiện tất cả các chỉ số C phù hợp với đặc thù sản xuất, kinh doanh của mình. Đây là phần phải ưu tiên xử lý trước.',
            },
            {
              kind: 'paragraph',
              text: 'Chỉ số nâng cao (A - Advance): các chỉ số liên quan tới chương trình, hành động, biện pháp nhằm giảm thiểu rủi ro và tác động của rủi ro do các yếu tố môi trường và xã hội, đồng thời góp phần xây dựng hệ sinh thái kinh doanh bền vững.',
            },
          ],
        },
        {
          id: 'intro-s4',
          title: 'Kỳ đánh giá và yêu cầu số liệu',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Kỳ đánh giá phát triển bền vững doanh nghiệp là giai đoạn 2023 - 2025. Doanh nghiệp cần cung cấp đầy đủ, chính xác, rõ ràng thông tin, hình ảnh, tài liệu, số liệu của cả 3 năm, và được khuyến khích cập nhật đến thời điểm nộp hồ sơ đối với các thông tin, tài liệu, số liệu theo hình thức thống kê, báo cáo định kỳ.',
            },
            {
              kind: 'paragraph',
              text: 'Doanh nghiệp cũng cần giải thích, làm rõ và tự đánh giá mức độ thực hiện các chỉ số gắn với thông tin, tài liệu đã cung cấp.',
            },
          ],
        },
        {
          id: 'intro-s5',
          title: 'Cấu trúc bộ chỉ số',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Mục A - Tổng quan doanh nghiệp',
                  text: 'Phần I: Thông tin tổng quan về doanh nghiệp. Phần II: Cơ cấu, mô hình tổ chức và nhân sự chủ chốt.',
                },
                {
                  label: 'Mục B - Các chỉ số đánh giá và thang điểm',
                  text: 'Phần III: Chỉ số kết quả 3 năm 2023-2025 (I). Phần IV: Chỉ số quản trị (G). Phần V: Chỉ số môi trường (E). Phần VI: Chỉ số lao động - xã hội (L&S).',
                },
                {
                  label: 'Số lượng chỉ số',
                  text: '105 chỉ số, gồm 86 chỉ số C (82%) và 19 chỉ số A (18%).',
                },
                {
                  label: 'Điểm tối đa',
                  text: '600 điểm.',
                },
              ],
            },
          ],
        },
        {
          id: 'intro-s6',
          title: 'Thang điểm đánh giá chính thức của CSI 2026',
          blocks: [
            {
              kind: 'table',
              headers: ['Phần của Bộ chỉ số', 'Điểm cơ bản', 'Điểm thưởng'],
              rows: [
                ['Mục A - Tổng quan doanh nghiệp', '18', '0'],
                ['    Phần I: Thông tin doanh nghiệp', '14', '0'],
                ['    Phần II: Cơ cấu, mô hình tổ chức và nhân sự chủ chốt', '4', '0'],
                ['Mục B - Các chỉ số đánh giá và thang điểm', '527', '55'],
                ['    Phần III: Chỉ số kết quả 3 năm 2023-2025 (I)', '178', '20'],
                ['    Phần IV: Chỉ số quản trị (G)', '70', '7'],
                ['    Phần V: Chỉ số môi trường (E)', '138', '14'],
                ['    Phần VI: Chỉ số lao động - xã hội (L&S)', '141', '14'],
                ['TỔNG ĐIỂM TỐI ĐA CỦA BỘ CHỈ SỐ', '545', '55'],
              ],
            },
          ],
        },
        {
          id: 'intro-s7',
          title: 'Thông tin Chương trình CSI 2026',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Cơ quan chủ trì',
                  text: 'Liên đoàn Thương mại và Công nghiệp Việt Nam (VCCI)',
                },
                {
                  label: 'Cơ quan thực hiện',
                  text: 'Hội đồng Doanh nghiệp vì sự Phát triển bền vững Việt Nam (VBCSD)',
                },
                {
                  label: 'Ban Chỉ đạo Chương trình',
                  text: 'VCCI; Ban Chính sách và Chiến lược Trung ương; Bộ Nông nghiệp và Môi trường; Bộ Nội vụ; Bộ Tài chính; Tổng Liên đoàn Lao động Việt Nam',
                },
                {
                  label: 'Căn cứ triển khai',
                  text: 'Thông báo số 398/TB-VPCP ngày 15/12/2015 của Văn phòng Chính phủ về việc xếp hạng doanh nghiệp bền vững',
                },
                {
                  label: 'Định hướng chính sách 2026',
                  text: 'Nghị quyết số 68 về phát triển kinh tế tư nhân; Nghị quyết số 57 về đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia; các Nghị quyết số 138, 139 ban hành tháng 5/2025',
                },
                {
                  label: 'Hạn nộp hồ sơ CSI 2026',
                  text: '23h59 ngày 08/8/2026',
                },
                {
                  label: 'Cổng nộp hồ sơ trực tuyến',
                  text: 'https://vbcsd.vn/dangkycsi',
                },
                {
                  label: 'Trang thông tin Chương trình',
                  text: 'https://vbcsd.vn/csi/',
                },
                {
                  label: 'Lệ phí tham gia',
                  text: 'Không thu phí',
                },
                {
                  label: 'Ngôn ngữ hồ sơ',
                  text: 'Chương trình chỉ nhận hồ sơ bằng tiếng Việt',
                },
                {
                  label: 'Bảo mật',
                  text: 'Toàn bộ thông tin doanh nghiệp cung cấp được Ban Tổ chức cam kết bảo mật',
                },
                {
                  label: 'Cơ cấu biểu dương dự kiến',
                  text: 'Top 100 Doanh nghiệp bền vững Việt Nam 2026; Top 10 Doanh nghiệp bền vững lĩnh vực sản xuất; Top 10 Doanh nghiệp bền vững lĩnh vực thương mại - dịch vụ; Doanh nghiệp tiên phong thực hiện kinh tế tuần hoàn và cắt giảm phát thải khí nhà kính; Doanh nghiệp quản trị công ty bứt phá (hạng mục chuyên đề có thể thay đổi)',
                },
                {
                  label: 'Đầu mối hỗ trợ',
                  text: 'Anh Nguyễn Thành Trung - 0945 22 3333 - trungnt@vcci.com.vn | Anh Hoàng Lê Anh - 0989 131 594 - anhhl@vcci.com.vn',
                },
              ],
            },
          ],
        },
        {
          id: 'intro-s8',
          title: 'CÁCH CSI ĐƯỢC CHẤM ĐIỂM TRÊN THỰC TẾ',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Phần này giải thích cơ chế chấm điểm thực tế của Chương trình CSI, để doanh nghiệp hiểu đúng ý nghĩa của các con số điểm và không kỳ vọng sai.',
            },
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Điểm in trong Bộ chỉ số là điểm tham khảo',
                  text: 'Chú thích chính thức trong Bộ chỉ số CSI 2026 ghi rõ: "Điểm số đề xuất tại Bộ chỉ số CSI 2026 mang tính chất tham khảo để doanh nghiệp có thể tự đánh giá, ước lượng mức độ hoàn thành các chỉ số cụ thể nói riêng cũng như hiện trạng phát triển bền vững tổng thể của doanh nghiệp nói chung."',
                },
                {
                  label: 'Điểm thực tế khác nhau theo lĩnh vực hoạt động',
                  text: 'Cũng theo chú thích đó: "Chi tiết điểm cụ thể theo các lĩnh vực hoạt động của doanh nghiệp vui lòng truy cập Chương trình CSI 2026 tại website https://vbcsd.vn/". Trọng số điểm giữa các khía cạnh kinh tế, môi trường, xã hội được điều chỉnh theo nhóm ngành (sản xuất; thương mại - dịch vụ; hỗn hợp) để bảo đảm công bằng. Vì vậy hai doanh nghiệp trả lời giống hệt nhau nhưng khác ngành vẫn có thể có tổng điểm khác nhau.',
                },
                {
                  label: 'Doanh nghiệp tự khai, Hội đồng chấm điểm',
                  text: 'Trên biểu mẫu chính thức, doanh nghiệp đánh dấu Có/Không cho từng chỉ số, đính kèm tài liệu chứng minh và giải trình mức độ thực hiện. Doanh nghiệp KHÔNG tự cho điểm mình. Việc chấm điểm do Hội đồng đánh giá độc lập thực hiện.',
                },
                {
                  label: 'Quy trình đánh giá gồm ba bước',
                  text: '(1) Hội đồng đánh giá độc lập chấm điểm 03 vòng hồ sơ theo Bộ chỉ số CSI; (2) thẩm định thông tin thông qua các cơ quan chức năng có liên quan; (3) Ban Chỉ đạo Chương trình phê duyệt trên cơ sở đề xuất của Hội đồng đánh giá. Hội đồng gồm đại diện các bộ, ngành, cơ quan tham gia Chương trình, đại diện doanh nghiệp, tổ chức, chuyên gia và cơ quan báo chí.',
                },
                {
                  label: 'Điểm thưởng',
                  text: 'Bộ chỉ số công bố mức điểm thưởng tối đa cho từng phần thuộc Mục B (Mục A không có điểm thưởng), nhưng KHÔNG công bố tiêu chí để đạt điểm thưởng. Điểm thưởng do Hội đồng đánh giá xét trên hồ sơ thực tế. Vì vậy bộ công cụ này không đưa điểm thưởng vào phần tự đánh giá.',
                },
                {
                  label: 'Không có ngưỡng điểm đạt / không đạt',
                  text: 'Chương trình CSI là chương trình xếp hạng, không phải chương trình cấp chứng nhận theo ngưỡng. Kết quả công bố là Top 100 Doanh nghiệp bền vững, Top 10 lĩnh vực sản xuất và Top 10 lĩnh vực thương mại - dịch vụ. Vì vậy không có mốc điểm nào được công bố là "đạt" hay "tốt" - mức điểm lọt vào Top phụ thuộc vào hồ sơ của các doanh nghiệp cùng dự thi năm đó.',
                },
                {
                  label: 'Chuẩn tuyệt đối duy nhất: hoàn thiện toàn bộ chỉ số C',
                  text: 'Bộ chỉ số nêu rõ doanh nghiệp "được yêu cầu hoàn thiện tất cả các chỉ số C phù hợp với đặc thù sản xuất, kinh doanh của chính doanh nghiệp". Đây là chuẩn tuyệt đối duy nhất mà CSI đặt ra và là mục tiêu thực tế nhất để doanh nghiệp hướng tới, thay vì chạy theo một con số điểm. Bảng điểm tổng hợp của bộ công cụ này vì vậy đặt tình trạng chỉ số C lên trước tổng điểm.',
                },
              ],
            },
          ],
        },
        {
          id: 'intro-s9',
          title: 'GIẢI THÍCH QUAN TRỌNG TỪ CHÚ THÍCH CỦA BỘ CHỈ SỐ CSI 2026',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Những nội dung dưới đây nằm ở phần chú thích chân trang của tài liệu gốc, rất dễ bị bỏ qua, nhưng lại quyết định cách hiểu và cách trả lời nhiều chỉ số.',
            },
            {
              kind: 'pairs',
              rows: [
                {
                  label:
                    'Phân loại doanh nghiệp theo tiêu chí về môi trường (Điều 28 Luật Bảo vệ môi trường 2020)',
                  text: 'Nhóm 1: DN có quy mô, công suất lớn, có nguy cơ tác động xấu tới môi trường ở mức độ cao và DN có quy mô trung bình nhưng có yếu tố nhạy cảm về môi trường. Nhóm 2: DN có quy mô, công suất trung bình, có nguy cơ tác động xấu đến môi trường và các DN có quy mô nhỏ nhưng có yếu tố nhạy cảm về môi trường. Nhóm 3: DN có quy mô, công suất nhỏ, có nguy cơ gây ô nhiễm môi trường phải được quản lý, xử lý theo quy định. Nhóm 4: DN không có nguy cơ tác động xấu đến môi trường.',
                },
                {
                  label:
                    'Phần II - Cơ cấu, mô hình tổ chức và nhân sự chủ chốt: Hội đồng đánh giá muốn thấy gì?',
                  text: 'Phần II cung cấp cho Hội đồng đánh giá của Chương trình CSI 2026 các thông tin liên quan đến cơ cấu tổ chức, sắp xếp tổ chức vận hành cũng như phân công nhiệm vụ các phòng/ban, đặc biệt đối với bộ phận/nhân sự phụ trách phát triển bền vững, và quy trình ra quyết định của toàn bộ doanh nghiệp trong phạm vi tham gia Chương trình. Doanh nghiệp được yêu cầu cung cấp sơ đồ cơ cấu tổ chức và văn bản phân công nhiệm vụ.',
                },
                {
                  label: 'Báo cáo sử dụng năng lượng: quy định riêng theo ngành',
                  text: 'Các đơn vị sản xuất thép, bia, nước giải khát, đường mía, giấy, chế biến thủy sản, nhựa báo cáo kết quả sử dụng năng lượng theo phương pháp quy định tại các Thông tư liên quan của Bộ Công Thương. Các đơn vị khác báo cáo mức tiêu hao năng lượng cho 01 sản phẩm, dịch vụ chủ đạo.',
                },
                {
                  label: 'Nghiên cứu - phát triển - đổi mới sáng tạo: phân biệt hai chỉ số',
                  text: 'Cải tiến quy trình, cải tiến sản phẩm từ nghiên cứu - phát triển - đổi mới sáng tạo - ứng dụng khoa học công nghệ là hoạt động NỘI BỘ của doanh nghiệp nhằm tối ưu hóa quy trình quản trị, cải thiện năng suất, chất lượng hoạt động, bảo vệ môi trường, nâng cao năng lực cạnh tranh. Ứng dụng, thương mại hóa sản phẩm từ nghiên cứu - phát triển - đổi mới sáng tạo là hoạt động hướng tới BÊN NGOÀI doanh nghiệp nhằm giới thiệu sản phẩm mới, quy trình sản xuất, kinh doanh mới phục vụ sản xuất, kinh doanh và đời sống. Đây là căn cứ để phân biệt chỉ số G 22 và G 23.',
                },
                {
                  label: 'IFRS là gì và vì sao CSI 2026 nhắc tới',
                  text: 'IFRS (International Financial Reporting Standards) là bộ chuẩn mực và quy tắc do Hội đồng Chuẩn mực Kế toán Quốc tế (IASB) ban hành, nhằm tạo khuôn khổ kế toán toàn cầu, giúp kế toán, kiểm toán và nhà đầu tư hiểu rõ hơn tình hình tài chính của doanh nghiệp, đồng thời nâng cao tính minh bạch và trách nhiệm giải trình. Bộ Tài chính đã ban hành lộ trình áp dụng IFRS tại Việt Nam. IFRS S1 quy định yêu cầu chung đối với thông tin về tính bền vững, IFRS S2 quy định công bố thông tin liên quan tới khí hậu.',
                },
                {
                  label:
                    'Bốn bước xây dựng ma trận các vấn đề trọng yếu (theo chú thích của Bộ chỉ số)',
                  text: 'Xây dựng ma trận phân tích các vấn đề trọng yếu cần được thực hiện theo các bước: (1) Xác định phạm vi và các bên liên quan; (2) Nhận diện các vấn đề trọng yếu; (3) Đánh giá mức độ quan trọng; (4) Xây dựng và xác nhận ma trận. Ma trận này giúp doanh nghiệp tập trung thời gian và nguồn lực vào các vấn đề cốt lõi, nâng cao hiệu quả hoạt động và quản trị rủi ro.',
                },
                {
                  label: 'Định hướng phát triển bền vững trong cam kết của doanh nghiệp',
                  text: 'Định hướng phát triển bền vững doanh nghiệp yêu cầu các cam kết về môi trường, lao động - xã hội và quản trị cùng với hiệu quả kinh tế, với các chỉ tiêu cụ thể trong từng giai đoạn, nhằm bảo đảm tăng trưởng lâu dài mà không tổn hại tới tương lai. Các chỉ tiêu này cần được quán triệt trong ban lãnh đạo và tới từng bộ phận, người lao động để triển khai đạt được.',
                },
              ],
            },
          ],
        },
      ],
    },
    glossary: {
      id: 'glossary',
      header: [
        'THUẬT NGỮ VÀ CĂN CỨ PHÁP LÝ THAM CHIẾU',
        'Dùng để tra cứu nhanh khi tự đánh giá',
        'Danh mục văn bản pháp luật mang tính tham khảo. Doanh nghiệp cần đối chiếu bản hợp nhất, còn hiệu lực tại thời điểm áp dụng và tham vấn tư vấn pháp lý khi cần.',
      ],
      sections: [
        {
          id: 'glossary-s1',
          title: 'A. THUẬT NGỮ',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'CSI',
                  text: 'Corporate Sustainability Index - Bộ chỉ số Doanh nghiệp bền vững, do VCCI/VBCSD ban hành, dùng làm căn cứ chấm điểm Chương trình Đánh giá, Công bố các Doanh nghiệp bền vững tại Việt Nam.',
                },
                {
                  label: 'VCCI',
                  text: 'Liên đoàn Thương mại và Công nghiệp Việt Nam - cơ quan chủ trì Chương trình CSI.',
                },
                {
                  label: 'VBCSD',
                  text: 'Hội đồng Doanh nghiệp vì sự Phát triển bền vững Việt Nam - cơ quan thực hiện Chương trình CSI.',
                },
                {
                  label: 'ESG',
                  text: 'Environmental - Social - Governance: ba nhóm yếu tố Môi trường, Xã hội và Quản trị dùng để đánh giá mức độ bền vững của doanh nghiệp.',
                },
                {
                  label: 'Chỉ số C (Core)',
                  text: 'Chỉ số cơ bản của CSI, gắn với tuân thủ pháp luật. Doanh nghiệp cần hoàn thiện tất cả chỉ số C phù hợp với đặc thù của mình.',
                },
                {
                  label: 'Chỉ số A (Advance)',
                  text: 'Chỉ số nâng cao của CSI, gắn với chương trình, hành động giảm rủi ro môi trường - xã hội và xây dựng hệ sinh thái kinh doanh bền vững.',
                },
                {
                  label: 'Chỉ số I (Indicator)',
                  text: 'Nhóm chỉ số kết quả, yêu cầu số liệu thực hiện trong 3 năm của kỳ đánh giá.',
                },
                {
                  label: 'Chỉ số G (Governance)',
                  text: 'Nhóm chỉ số quản trị doanh nghiệp.',
                },
                {
                  label: 'Chỉ số E (Environment)',
                  text: 'Nhóm chỉ số môi trường.',
                },
                {
                  label: 'Chỉ số L&S (Labor and Social)',
                  text: 'Nhóm chỉ số lao động và xã hội.',
                },
                {
                  label: 'Vấn đề trọng yếu (materiality)',
                  text: 'Những vấn đề kinh tế, môi trường, xã hội, quản trị có ảnh hưởng lớn nhất tới doanh nghiệp và tới các bên liên quan, được xác định qua ma trận trọng yếu.',
                },
                {
                  label: 'Bên liên quan (stakeholder)',
                  text: 'Các nhóm chịu ảnh hưởng hoặc có ảnh hưởng tới hoạt động của doanh nghiệp: người lao động, khách hàng, nhà cung cấp, cộng đồng, cơ quan quản lý, nhà đầu tư.',
                },
                {
                  label: 'Kiểm kê khí nhà kính',
                  text: 'Việc xác định, tính toán lượng phát thải khí nhà kính của doanh nghiệp theo phương pháp và hệ số phát thải được quy định.',
                },
                {
                  label: 'Phát thải phạm vi 1',
                  text: 'Phát thải khí nhà kính trực tiếp từ nguồn do doanh nghiệp sở hữu hoặc kiểm soát, ví dụ đốt nhiên liệu tại chỗ.',
                },
                {
                  label: 'Phát thải phạm vi 2',
                  text: 'Phát thải gián tiếp từ điện, nhiệt, hơi mà doanh nghiệp mua và sử dụng.',
                },
                {
                  label: 'Cường độ phát thải',
                  text: 'Tổng lượng phát thải khí nhà kính chia cho một đơn vị đầu ra, thường là doanh thu hoặc sản lượng.',
                },
                {
                  label: 'EPR',
                  text: 'Extended Producer Responsibility - trách nhiệm mở rộng của nhà sản xuất, nhập khẩu trong việc tái chế sản phẩm, bao bì và xử lý chất thải.',
                },
                {
                  label: 'Kinh tế tuần hoàn',
                  text: 'Mô hình kinh tế trong đó vật liệu được giữ trong vòng sử dụng càng lâu càng tốt thông qua thiết kế bền, sửa chữa, tái sử dụng, tái chế, thay vì khai thác - sử dụng - thải bỏ.',
                },
                {
                  label: 'Tẩy xanh (greenwashing)',
                  text: 'Việc đưa ra tuyên bố về lợi ích môi trường của sản phẩm, dịch vụ hoặc doanh nghiệp mà không có bằng chứng kiểm chứng được, gây hiểu lầm cho người tiêu dùng.',
                },
                {
                  label: 'DEI',
                  text: 'Diversity, Equity and Inclusion - đa dạng, bình đẳng và bao trùm tại nơi làm việc.',
                },
                {
                  label: 'ISSB / IFRS S1, S2',
                  text: 'Ủy ban Chuẩn mực Bền vững Quốc tế và hai chuẩn mực công bố thông tin: S1 về yêu cầu chung đối với thông tin bền vững, S2 về thông tin liên quan tới khí hậu.',
                },
                {
                  label: 'TCFD',
                  text: 'Task Force on Climate-related Financial Disclosures - khuôn khổ công bố thông tin tài chính liên quan tới khí hậu.',
                },
                {
                  label: 'SDGs',
                  text: '17 Mục tiêu Phát triển bền vững của Liên hợp quốc đến năm 2030.',
                },
                {
                  label: 'Kế hoạch kinh doanh liên tục (BCP)',
                  text: 'Kế hoạch bảo đảm hoạt động của doanh nghiệp không bị gián đoạn khi xảy ra thiên tai, dịch bệnh, sự cố hoặc đứt gãy chuỗi cung ứng.',
                },
                {
                  label: 'IFRS S1, S2',
                  text: 'Hai chuẩn mực công bố thông tin bền vững của Ủy ban Chuẩn mực Bền vững Quốc tế (ISSB): S1 quy định yêu cầu chung đối với thông tin về tính bền vững, S2 quy định công bố thông tin liên quan tới khí hậu. CSI 2026 khuyến khích doanh nghiệp trong chuỗi cung ứng quốc tế lập thêm một số chỉ tiêu theo hai chuẩn mực này.',
                },
                {
                  label: 'Phân nhóm doanh nghiệp theo tiêu chí môi trường',
                  text: 'Cách phân loại theo Điều 28 Luật Bảo vệ môi trường 2020 thành 4 nhóm, căn cứ quy mô, công suất và mức độ nguy cơ tác động xấu tới môi trường. Nhóm doanh nghiệp quyết định doanh nghiệp cần giấy phép môi trường hay chỉ cần đăng ký môi trường. Xem chi tiết tại trang "Giới thiệu CSI 2026".',
                },
                {
                  label: 'Cơ sở sử dụng năng lượng trọng điểm',
                  text: 'Cơ sở có mức tiêu thụ năng lượng đạt ngưỡng theo quy định của pháp luật về sử dụng năng lượng tiết kiệm và hiệu quả, phải thực hiện kiểm toán năng lượng định kỳ và báo cáo tình hình sử dụng năng lượng.',
                },
                {
                  label: 'Quan trắc môi trường lao động',
                  text: 'Việc đo, phân tích các yếu tố có hại tại nơi làm việc như bụi, ồn, rung, ánh sáng, nhiệt độ, hơi khí độc.',
                },
              ],
            },
          ],
        },
        {
          id: 'glossary-s2',
          title: 'B. CĂN CỨ PHÁP LÝ THƯỜNG ĐƯỢC THAM CHIẾU',
          blocks: [
            {
              kind: 'table',
              headers: ['Văn bản', 'Nội dung liên quan', 'Chỉ số CSI liên quan'],
              rows: [
                [
                  'Luật Bảo vệ môi trường 2020 (Luật số 72/2020/QH14)',
                  'Giấy phép môi trường, đăng ký môi trường, phân nhóm doanh nghiệp theo tiêu chí môi trường (Điều 28), EPR, quản lý chất thải',
                  'E 1 - E 10, E 23, E 24',
                ],
                [
                  'Nghị định 08/2022/NĐ-CP quy định chi tiết một số điều của Luật Bảo vệ môi trường',
                  'Hướng dẫn giấy phép môi trường, quản lý chất thải, trách nhiệm tái chế',
                  'E 1, E 4, E 5, E 7',
                ],
                [
                  'Nghị định 06/2022/NĐ-CP về giảm nhẹ phát thải khí nhà kính và bảo vệ tầng ô-dôn',
                  'Kiểm kê khí nhà kính, kế hoạch giảm nhẹ phát thải',
                  'E 21, I 29, I 30',
                ],
                [
                  'Quyết định của Thủ tướng Chính phủ ban hành danh mục lĩnh vực, cơ sở phát thải khí nhà kính phải kiểm kê (Quyết định 13/2024/QĐ-TTg và văn bản cập nhật)',
                  'Xác định doanh nghiệp có thuộc đối tượng bắt buộc kiểm kê khí nhà kính hay không',
                  'E 21',
                ],
                [
                  'Luật Sử dụng năng lượng tiết kiệm và hiệu quả 2010',
                  'Cơ sở sử dụng năng lượng trọng điểm, kiểm toán năng lượng, báo cáo sử dụng năng lượng',
                  'E 17, E 18',
                ],
                [
                  'Bộ luật Lao động 2019 (Luật số 45/2019/QH14)',
                  'Hợp đồng lao động, nội quy lao động, thời giờ làm việc, kỷ luật lao động, đối thoại tại nơi làm việc',
                  'L 1 - L 14, L 26 - L 29, L 53 - L 58',
                ],
                [
                  'Nghị định 145/2020/NĐ-CP hướng dẫn Bộ luật Lao động',
                  'Quy chế dân chủ ở cơ sở, hội nghị người lao động, lao động nữ, điều kiện lao động',
                  'L 53 - L 61',
                ],
                [
                  'Luật An toàn, vệ sinh lao động 2015 (Luật số 84/2015/QH13)',
                  'Kế hoạch ATVSLĐ, huấn luyện an toàn, kiểm định thiết bị, quan trắc môi trường lao động, khai báo tai nạn lao động',
                  'L 30 - L 45, I 19',
                ],
                [
                  'Luật Bảo hiểm xã hội 2024 (Luật số 41/2024/QH15, hiệu lực từ 01/7/2025)',
                  'Đối tượng và mức đóng bảo hiểm xã hội bắt buộc',
                  'L 15, I 16',
                ],
                [
                  'Luật Công đoàn và các văn bản hướng dẫn hiện hành',
                  'Thành lập công đoàn cơ sở, kinh phí công đoàn, thương lượng tập thể, thỏa ước lao động tập thể',
                  'L 47 - L 52',
                ],
                [
                  'Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân',
                  'Thu thập, lưu trữ, xử lý và sử dụng dữ liệu cá nhân của khách hàng và người lao động',
                  'S 3',
                ],
                [
                  'Luật Bảo vệ quyền lợi người tiêu dùng 2023',
                  'Trách nhiệm về chất lượng, an toàn sản phẩm, thông tin trung thực với người tiêu dùng',
                  'S 1, S 2',
                ],
                [
                  'Nghị định 80/2021/NĐ-CP',
                  'Tiêu chí xác định doanh nghiệp siêu nhỏ, nhỏ, vừa (Điều 5) - căn cứ chọn phiên bản CSI phù hợp',
                  'Toàn bộ',
                ],
              ],
            },
          ],
        },
      ],
    },
    profile: {
      title: 'HỒ SƠ DOANH NGHIỆP',
      subtitle:
        'Mục A - Phần I: Thông tin doanh nghiệp | Phần II: Cơ cấu tổ chức và nhân sự chủ chốt',
      note: 'Ô nền vàng là ô doanh nghiệp cần điền. Số liệu cần đủ 3 năm 2023 - 2025 thuộc kỳ đánh giá.',
      generalTitle: 'THÔNG TIN CHUNG',
      generalFields: [
        {
          id: 'general-1',
          label: 'Tên đầy đủ của doanh nghiệp (theo đăng ký kinh doanh)',
        },
        {
          id: 'general-2',
          label: 'Tên viết tắt của doanh nghiệp',
        },
        {
          id: 'general-3',
          label: 'Website doanh nghiệp',
        },
        {
          id: 'general-4',
          label: 'Năm thành lập',
        },
        {
          id: 'general-5',
          label: 'Mã số thuế',
        },
        {
          id: 'general-6',
          label: 'Địa chỉ đăng ký kinh doanh',
        },
        {
          id: 'general-7',
          label: 'Địa chỉ hoạt động',
        },
        {
          id: 'general-8',
          label: 'Số điện thoại',
        },
        {
          id: 'general-9',
          label: 'Email giao dịch',
        },
        {
          id: 'general-10',
          label:
            'Loại hình doanh nghiệp theo vốn chủ sở hữu chính (DN ngoài quốc doanh / FDI / Loại hình khác)',
          options: [
            {
              value: 'o1',
              label: 'DN ngoài quốc doanh',
            },
            {
              value: 'o2',
              label: 'FDI',
            },
            {
              value: 'o3',
              label: 'Loại hình khác',
            },
          ],
        },
        {
          id: 'general-11',
          label: 'Quy mô doanh nghiệp theo Điều 5 Nghị định 80/2021/NĐ-CP (Nhỏ / Siêu nhỏ)',
          options: [
            {
              value: 'o1',
              label: 'Nhỏ',
            },
            {
              value: 'o2',
              label: 'Siêu nhỏ',
            },
          ],
        },
        {
          id: 'general-12',
          label:
            'Phân loại theo tiêu chí môi trường - Điều 28 Luật Bảo vệ môi trường 2020 (Nhóm 2 / Nhóm 3 / Nhóm 4)',
          options: [
            {
              value: 'o1',
              label: 'Nhóm 2',
            },
            {
              value: 'o2',
              label: 'Nhóm 3',
            },
            {
              value: 'o3',
              label: 'Nhóm 4',
            },
          ],
        },
        {
          id: 'general-13',
          label:
            'Lĩnh vực hoạt động (Chuyên về sản xuất, chế biến / Chuyên về xây dựng, thương mại - dịch vụ)',
          options: [
            {
              value: 'o1',
              label: 'Chuyên về sản xuất, chế biến',
            },
            {
              value: 'o2',
              label: 'Chuyên về xây dựng, thương mại - dịch vụ',
            },
          ],
        },
        {
          id: 'general-14',
          label: 'Ngành nghề hoạt động chính đang có hoạt động thực tế',
        },
        {
          id: 'general-15',
          label: 'Người đại diện pháp luật - họ tên, chức danh, điện thoại, email',
        },
        {
          id: 'general-16',
          label: 'Đầu mối liên hệ CSI - họ tên, chức danh, điện thoại, email, địa chỉ nhận thư',
        },
      ],
      infoBlocks: [
        {
          id: 'env-group',
          title:
            'Phân loại doanh nghiệp theo tiêu chí về môi trường (Điều 28 Luật Bảo vệ môi trường 2020)',
          text: 'Nhóm 1: DN có quy mô, công suất lớn, có nguy cơ tác động xấu tới môi trường ở mức độ cao và DN có quy mô trung bình nhưng có yếu tố nhạy cảm về môi trường. Nhóm 2: DN có quy mô, công suất trung bình, có nguy cơ tác động xấu đến môi trường và các DN có quy mô nhỏ nhưng có yếu tố nhạy cảm về môi trường. Nhóm 3: DN có quy mô, công suất nhỏ, có nguy cơ gây ô nhiễm môi trường phải được quản lý, xử lý theo quy định. Nhóm 4: DN không có nguy cơ tác động xấu đến môi trường.',
        },
        {
          id: 'structure',
          title:
            'Phần II - Cơ cấu, mô hình tổ chức và nhân sự chủ chốt: Hội đồng đánh giá muốn thấy gì?',
          text: 'Phần II cung cấp cho Hội đồng đánh giá của Chương trình CSI 2026 các thông tin liên quan đến cơ cấu tổ chức, sắp xếp tổ chức vận hành cũng như phân công nhiệm vụ các phòng/ban, đặc biệt đối với bộ phận/nhân sự phụ trách phát triển bền vững, và quy trình ra quyết định của toàn bộ doanh nghiệp trong phạm vi tham gia Chương trình. Doanh nghiệp được yêu cầu cung cấp sơ đồ cơ cấu tổ chức và văn bản phân công nhiệm vụ.',
        },
      ],
      yearTables: [
        {
          id: 'economy',
          title: 'THÔNG TIN KINH TẾ',
          headers: ['Mô tả', '2023', '2024', '2025', 'Ghi chú / tài liệu đính kèm'],
          rows: [
            {
              id: 'economy-1',
              label: 'Vốn đăng ký kinh doanh (triệu VNĐ)',
            },
            {
              id: 'economy-2',
              label: 'Tổng vốn đầu tư vào sản xuất - kinh doanh (triệu VNĐ)',
            },
            {
              id: 'economy-3',
              label:
                'Báo cáo tài chính (khuyến khích đã được kiểm toán) - ghi rõ tên file đính kèm',
            },
          ],
        },
        {
          id: 'materials',
          title: 'TIÊU THỤ NGUYÊN VẬT LIỆU ĐẦU VÀO (nguyên vật liệu chính)',
          headers: ['Mô tả', '2023', '2024', '2025', 'Ghi chú / tài liệu đính kèm'],
          rows: [
            {
              id: 'materials-1',
              label: 'Nguyên vật liệu 1 - ghi rõ tên và đơn vị tính',
            },
            {
              id: 'materials-2',
              label: 'Nguyên vật liệu 2',
            },
            {
              id: 'materials-3',
              label: 'Nguyên vật liệu 3',
            },
            {
              id: 'materials-4',
              label: 'Nguyên vật liệu 4',
            },
          ],
        },
        {
          id: 'energy',
          title: 'TIÊU THỤ NĂNG LƯỢNG HÀNG NĂM',
          headers: ['Mô tả', '2023', '2024', '2025', 'Ghi chú / tài liệu đính kèm'],
          rows: [
            {
              id: 'energy-1',
              label: 'Điện (kWh)',
            },
            {
              id: 'energy-2',
              label: 'Dầu (lít)',
            },
            {
              id: 'energy-3',
              label: 'Xăng (lít)',
            },
            {
              id: 'energy-4',
              label: 'Than (tấn)',
            },
            {
              id: 'energy-5',
              label: 'Sinh khối (MJ)',
            },
            {
              id: 'energy-6',
              label: 'Năng lượng khác - ghi rõ',
            },
          ],
        },
        {
          id: 'water',
          title: 'TIÊU THỤ NƯỚC HÀNG NĂM',
          headers: ['Mô tả', '2023', '2024', '2025', 'Ghi chú / tài liệu đính kèm'],
          rows: [
            {
              id: 'water-1',
              label: 'Nước mặt (m3)',
            },
            {
              id: 'water-2',
              label: 'Nước ngầm (m3)',
            },
            {
              id: 'water-3',
              label: 'Nước mưa (m3)',
            },
            {
              id: 'water-4',
              label: 'Nước sinh hoạt (m3)',
            },
            {
              id: 'water-5',
              label: 'Nguồn nước khác (m3)',
            },
          ],
        },
        {
          id: 'waste',
          title: 'CHẤT THẢI, PHÁT THẢI PHÁT SINH',
          headers: ['Mô tả', '2023', '2024', '2025', 'Ghi chú / tài liệu đính kèm'],
          rows: [
            {
              id: 'waste-1',
              label: 'Nước thải (m3)',
            },
            {
              id: 'waste-2',
              label: 'Chất thải rắn sinh hoạt (tấn)',
            },
            {
              id: 'waste-3',
              label: 'Chất thải rắn công nghiệp thông thường (tấn)',
            },
            {
              id: 'waste-4',
              label: 'Chất thải rắn công nghiệp nguy hại (tấn)',
            },
            {
              id: 'waste-5',
              label: 'Bao bì sản phẩm (tấn)',
            },
            {
              id: 'waste-6',
              label: 'Chất thải nhựa (tấn)',
            },
            {
              id: 'waste-7',
              label:
                'Khí thải gây ô nhiễm không khí - ghi rõ loại và đơn vị (không tính khí nhà kính)',
            },
          ],
        },
        {
          id: 'labor',
          title: 'THÔNG TIN LAO ĐỘNG',
          headers: ['Mô tả', '2023', '2024', '2025', 'Ghi chú / tài liệu đính kèm'],
          rows: [
            {
              id: 'labor-1',
              label: 'Tổng số lao động chính thức (người)',
            },
            {
              id: 'labor-2',
              label: 'Số lao động nữ (người)',
            },
            {
              id: 'labor-3',
              label: 'Số lao động nghỉ việc, bao gồm nghỉ hưu (người)',
            },
            {
              id: 'labor-4',
              label: 'Số lao động được tuyển dụng mới (người)',
            },
            {
              id: 'labor-5',
              label: 'Số lao động chưa thành niên, nếu có (người)',
            },
            {
              id: 'labor-6',
              label: 'Số lao động là người khuyết tật, nếu có (người)',
            },
            {
              id: 'labor-7',
              label: 'Số nữ quản lý từ cấp trung, từ phó phòng trở lên (người)',
            },
            {
              id: 'labor-8',
              label: 'Số lãnh đạo nữ trong ban giám đốc, hội đồng quản trị (người)',
            },
            {
              id: 'labor-9',
              label: 'Số vụ tranh chấp lao động xảy ra tại nơi làm việc (vụ)',
            },
          ],
        },
      ],
      standards: {
        title:
          'CÁC TIÊU CHUẨN, CHỨNG NHẬN ĐANG ÁP DỤNG (còn hiệu lực đến thời điểm tham gia Chương trình CSI)',
        rows: [
          {
            id: 'standard-1',
            label: 'Tiêu chuẩn chất lượng',
          },
          {
            id: 'standard-2',
            label: 'Tiêu chuẩn môi trường',
          },
          {
            id: 'standard-3',
            label: 'Tiêu chuẩn lao động - xã hội',
          },
        ],
      },
      violations: {
        title:
          'TÌNH TRẠNG VI PHẠM HÀNH CHÍNH TRONG KỲ ĐÁNH GIÁ (từ 01/01/2023 đến thời điểm nộp hồ sơ)',
        headers: [
          'Nội dung',
          'Có vi phạm? (Có/Không)',
          'Đã khắc phục triệt để?',
          'Cơ quan xác nhận',
          'Tài liệu chứng minh',
        ],
        rows: [
          {
            id: 'violation-1',
            label: 'Vi phạm hành chính về bảo vệ môi trường',
          },
          {
            id: 'violation-2',
            label: 'Vi phạm hành chính trong lĩnh vực lao động, bảo hiểm xã hội, công đoàn',
          },
          {
            id: 'violation-3',
            label: 'Vi phạm hành chính trong lĩnh vực thuế, phí',
          },
          {
            id: 'violation-4',
            label: 'Các loại vi phạm hành chính khác (đề nghị ghi rõ)',
          },
        ],
      },
      sectionA: {
        title: 'TỰ ĐÁNH GIÁ MỨC ĐỘ HOÀN THIỆN MỤC A',
        headers: [
          'Nội dung',
          'Điểm tối đa',
          'Đã hoàn thiện đầy đủ? (Có/Không)',
          'Điểm tự đánh giá',
        ],
        rows: [
          {
            id: 'part-1',
            label: 'Phần I - Thông tin doanh nghiệp',
            maxScore: 14,
          },
          {
            id: 'part-2',
            label: 'Phần II - Cơ cấu, mô hình tổ chức và nhân sự chủ chốt',
            maxScore: 4,
          },
        ],
      },
    },
    sections: [
      {
        id: 'I',
        title: 'CHỈ SỐ KẾT QUẢ TRONG 3 NĂM 2023 - 2025 (CHỈ SỐ I)',
        subtitle:
          'Phần III của Bộ chỉ số CSI 2026 | 22 chỉ số (18 chỉ số C, 4 chỉ số A) | Điểm tối đa công bố: 178 điểm',
        note: 'Nhập số liệu thực tế của từng năm, sau đó chọn mức độ dữ liệu và minh chứng hiện có.',
        shortLabel: 'Chỉ số I',
        dashboardLabel: 'Chỉ số kết quả 3 năm (I)',
        publishedMax: 178,
        headers: {
          code: 'Mã chỉ số',
          level: 'Cấp độ',
          text: 'Nội dung chỉ số',
          unit: 'Đơn vị tính',
          y2023: '2023',
          y2024: '2024',
          y2025: '2025',
          maxScore: 'Điểm tối đa',
          answer: 'Đã có đủ số liệu 3 năm? (Có/Không)',
          selfScore: 'Điểm tự đánh giá',
          available: 'Điểm khả dụng',
          priority: 'Mức ưu tiên',
          hint: 'Gợi ý hành động',
          evidence: 'Hồ sơ minh chứng cần chuẩn bị',
          note: 'Ghi chú / hồ sơ hiện có',
          owner: 'Người phụ trách',
          deadline: 'Hạn hoàn thành',
          group: 'Nhóm',
        },
        groups: [
          {
            id: 'i-g1',
            title: 'KINH TẾ',
            declaredMax: 87,
            blocks: [
              {
                id: 'i-g1-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'I 1',
                    level: 'C',
                    text: 'Tổng doanh thu',
                    unit: 'Triệu VNĐ',
                    maxScore: 20,
                    hint: 'Trích số liệu doanh thu 3 năm 2023-2025 từ báo cáo tài chính. Nếu doanh thu giảm, chuẩn bị phần giải trình nguyên nhân và biện pháp khắc phục.',
                    evidence:
                      'Báo cáo tài chính 3 năm (khuyến khích đã kiểm toán); tờ khai quyết toán thuế TNDN.',
                  },
                  {
                    id: 'I 3',
                    level: 'C',
                    text: 'Lợi nhuận trước thuế',
                    unit: 'Triệu VNĐ',
                    maxScore: 20,
                    hint: 'Trích lợi nhuận trước thuế 3 năm. Đảm bảo số liệu khớp với báo cáo tài chính và tờ khai thuế.',
                    evidence:
                      'Báo cáo kết quả hoạt động kinh doanh 3 năm; tờ khai quyết toán thuế TNDN.',
                  },
                  {
                    id: 'I 4',
                    level: 'C',
                    text: 'Tỷ suất lợi nhuận trên vốn (ROE)',
                    unit: '%',
                    maxScore: 9,
                    hint: 'Tính ROE = Lợi nhuận sau thuế / Vốn chủ sở hữu bình quân. Trình bày công thức đã dùng để hội đồng đánh giá đối chiếu được.',
                    evidence: 'Bảng tính ROE kèm công thức; bảng cân đối kế toán 3 năm.',
                  },
                  {
                    id: 'I 5',
                    level: 'C',
                    text: 'Tỷ suất lợi nhuận trên tài sản (ROA)',
                    unit: '%',
                    maxScore: 9,
                    hint: 'Tính ROA = Lợi nhuận sau thuế / Tổng tài sản bình quân.',
                    evidence: 'Bảng tính ROA kèm công thức; bảng cân đối kế toán 3 năm.',
                  },
                  {
                    id: 'I 6',
                    level: 'C',
                    text: 'Tỷ suất lợi nhuận trên doanh thu (ROS)',
                    unit: '%',
                    maxScore: 9,
                    hint: 'Tính ROS = Lợi nhuận sau thuế / Doanh thu thuần.',
                    evidence: 'Bảng tính ROS kèm công thức; báo cáo kết quả kinh doanh 3 năm.',
                  },
                  {
                    id: 'I 7',
                    level: 'C',
                    text: 'Tổng nộp ngân sách Nhà nước',
                    unit: 'Triệu VNĐ',
                    maxScore: 14,
                    hint: 'Tổng hợp toàn bộ các khoản đã nộp ngân sách: thuế TNDN, GTGT, thuế nhà thầu, phí, lệ phí, tiền thuê đất...',
                    evidence:
                      'Xác nhận nghĩa vụ thuế của cơ quan thuế; chứng từ nộp ngân sách 3 năm.',
                  },
                  {
                    id: 'I 8',
                    level: 'A',
                    text: 'Ngân sách hỗ trợ cộng đồng và xã hội thông qua các chương trình/sáng kiến',
                    unit: 'Triệu VNĐ',
                    maxScore: 6,
                    hint: 'Thống kê toàn bộ ngân sách chi cho cộng đồng, xã hội theo từng năm và từng chương trình. Ghi rõ số người hưởng lợi để tăng sức thuyết phục.',
                    evidence:
                      'Danh mục chương trình cộng đồng kèm ngân sách; chứng từ chi; thư cảm ơn/xác nhận của đối tác tiếp nhận.',
                  },
                ],
              },
            ],
          },
          {
            id: 'i-g2',
            title: 'XÃ HỘI',
            declaredMax: 50,
            blocks: [
              {
                id: 'i-g2-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'I 12',
                    level: 'C',
                    text: 'Tỷ lệ cán bộ nữ là quản lý cấp trung (từ phó trưởng phòng trở lên)',
                    unit: '%',
                    maxScore: 4,
                    hint: 'Tính tỷ lệ nữ giữ vị trí quản lý từ phó trưởng phòng trở lên. Nếu tỷ lệ thấp, nêu rõ kế hoạch cải thiện trong phần cam kết.',
                    evidence:
                      'Sơ đồ tổ chức; danh sách cán bộ quản lý phân theo giới tính; quyết định bổ nhiệm.',
                  },
                  {
                    id: 'I 13',
                    level: 'C',
                    text: 'Tỷ lệ lãnh đạo nữ trong ban giám đốc, hội đồng quản trị',
                    unit: '%',
                    maxScore: 4,
                    hint: 'Tính tỷ lệ nữ trong Ban giám đốc/Hội đồng quản trị/Hội đồng thành viên.',
                    evidence: 'Điều lệ; danh sách thành viên HĐQT/BGĐ; quyết định bổ nhiệm.',
                  },
                  {
                    id: 'I 14',
                    level: 'C',
                    text: 'Thu nhập bình quân theo tháng của người lao động',
                    unit: 'Triệu VNĐ',
                    maxScore: 13,
                    hint: 'Tính thu nhập bình quân tháng của toàn bộ người lao động (gồm lương, phụ cấp, thưởng). So sánh với lương tối thiểu vùng đang áp dụng.',
                    evidence: 'Bảng lương 3 năm; báo cáo tổng quỹ lương; tờ khai thuế TNCN.',
                  },
                  {
                    id: 'I 15',
                    level: 'C',
                    text: 'Thu nhập bình quân tháng của lao động theo giới tính (nam/nữ)',
                    unit: 'Triệu VNĐ',
                    maxScore: 8,
                    hint: 'Tách thu nhập bình quân theo giới tính nam/nữ. Chênh lệch lớn cần giải trình theo cơ cấu vị trí công việc.',
                    evidence: 'Bảng lương phân tích theo giới tính; quy chế trả lương.',
                  },
                  {
                    id: 'I 16',
                    level: 'C',
                    text: 'Tỷ lệ người lao động được đóng các loại bảo hiểm bắt buộc tính trên tổng số lao động thuộc diện phải đóng',
                    unit: '%',
                    maxScore: 13,
                    hint: 'Tính tỷ lệ lao động được đóng BHXH bắt buộc trên tổng số lao động thuộc diện phải đóng. Mục tiêu là 100%.',
                    evidence:
                      'Thông báo kết quả đóng BHXH (mẫu C12-TS); xác nhận không nợ BHXH của cơ quan BHXH.',
                  },
                  {
                    id: 'I 17',
                    level: 'C',
                    text: 'Số giờ đào tạo/người lao động trong diện cần được đào tạo hàng năm (định hướng và hội nhập; tuân thủ quy định; kỹ năng mềm; nghiệp vụ; đào tạo khác)',
                    unit: 'Giờ/lao động',
                    maxScore: 6,
                    hint: 'Tổng hợp số giờ đào tạo bình quân/người lao động theo 5 nhóm: định hướng hội nhập, tuân thủ, kỹ năng mềm, nghiệp vụ, khác.',
                    evidence:
                      'Kế hoạch đào tạo năm; danh sách điểm danh và chứng nhận đào tạo; bảng tổng hợp giờ đào tạo.',
                  },
                  {
                    id: 'I 19',
                    level: 'C',
                    text: 'Số tai nạn, số sự cố lao động xảy ra trong kỳ báo cáo (2023-2025)',
                    unit: 'Vụ',
                    maxScore: 8,
                    hint: 'Thống kê số vụ tai nạn và sự cố lao động trong cả kỳ 2023-2025. Nếu không xảy ra vụ nào, ghi rõ 0 và kèm báo cáo định kỳ về ATVSLĐ để chứng minh.',
                    evidence:
                      'Sổ theo dõi tai nạn lao động; biên bản điều tra tai nạn (nếu có); báo cáo ATVSLĐ định kỳ.',
                  },
                ],
              },
            ],
          },
          {
            id: 'i-g3',
            title: 'MÔI TRƯỜNG - BIẾN ĐỔI KHÍ HẬU',
            declaredMax: 41,
            blocks: [
              {
                id: 'i-g3-b1',
                title: '» Quản lý nguyên vật liệu và chất thải rắn',
                declaredMax: 17,
                indicators: [
                  {
                    id: 'I 22',
                    level: 'A',
                    text: 'Hoạt động, sáng kiến được thực hiện liên quan đến giảm thiểu rác thải nhựa (số lượng hoạt động; mức đầu tư; lượng rác thải nhựa được tái chế, tái sử dụng)',
                    unit: 'Số/Triệu VNĐ/Tấn',
                    maxScore: 3,
                    hint: 'Liệt kê từng sáng kiến giảm nhựa (thay bao bì, bỏ chai nhựa dùng một lần, thu hồi bao bì...), kèm mức đầu tư và khối lượng nhựa được tái chế.',
                    evidence:
                      'Kế hoạch/biên bản triển khai sáng kiến; hình ảnh; chứng từ đầu tư; sổ theo dõi khối lượng.',
                  },
                  {
                    id: 'I 23',
                    level: 'C',
                    text: 'Lượng chất thải rắn được phân loại, thu gom, lưu trữ, vận chuyển, xử lý (sinh hoạt; công nghiệp thông thường; công nghiệp nguy hại)',
                    unit: 'Tấn',
                    maxScore: 8,
                    hint: 'Ghi khối lượng chất thải rắn được phân loại, thu gom và xử lý theo 3 nhóm: sinh hoạt, công nghiệp thông thường, công nghiệp nguy hại. Cần số liệu riêng cho từng nhóm và từng năm, đối chiếu được với chứng từ chuyển giao.',
                    evidence:
                      'Chứng từ chuyển giao chất thải; hợp đồng với đơn vị xử lý có giấy phép; sổ chủ nguồn thải.',
                  },
                  {
                    id: 'I 24',
                    level: 'C',
                    text: 'Chi phí trực tiếp liên quan tới quản lý chất thải rắn',
                    unit: 'Triệu VNĐ',
                    maxScore: 6,
                    hint: 'Tổng hợp chi phí trực tiếp cho quản lý chất thải rắn: phí thu gom, xử lý, thuê đơn vị vận chuyển, khấu hao khu lưu giữ.',
                    evidence: 'Hợp đồng dịch vụ xử lý chất thải; hóa đơn, chứng từ thanh toán.',
                  },
                ],
              },
              {
                id: 'i-g3-b2',
                title: '» Tiêu thụ năng lượng, nhiên liệu',
                declaredMax: 6,
                indicators: [
                  {
                    id: 'I 27',
                    level: 'A',
                    text: 'Tỷ lệ năng lượng tiết kiệm thông qua việc áp dụng các biện pháp sử dụng năng lượng tiết kiệm và hiệu quả',
                    unit: '%',
                    maxScore: 6,
                    hint: 'Tính lượng năng lượng tiết kiệm được nhờ các biện pháp cải tiến, chia cho tổng năng lượng sử dụng. Nêu rõ biện pháp nào tạo ra khoản tiết kiệm đó.',
                    evidence:
                      'Báo cáo kiểm toán năng lượng; bảng so sánh tiêu thụ trước - sau; hóa đơn điện.',
                  },
                ],
              },
              {
                id: 'i-g3-b3',
                title: '» Quản lý, sử dụng nước',
                declaredMax: 18,
                indicators: [
                  {
                    id: 'I 31',
                    level: 'C',
                    text: 'Mức tiêu thụ nước điển hình theo đơn vị sản phẩm/dịch vụ',
                    unit: 'm3/sản phẩm',
                    maxScore: 8,
                    hint: 'Tính lượng nước tiêu thụ trên một đơn vị sản phẩm/dịch vụ. Lắp đồng hồ đo nước theo khu vực sẽ giúp số liệu chính xác hơn.',
                    evidence:
                      'Hóa đơn nước/giấy phép khai thác nước; nhật ký đồng hồ đo; sản lượng sản xuất.',
                  },
                  {
                    id: 'I 32',
                    level: 'C',
                    text: 'Tỷ lệ nước tiêu thụ tiết kiệm thông qua việc áp dụng các biện pháp tăng cường tiết kiệm và hiệu quả sử dụng nước',
                    unit: '%',
                    maxScore: 4,
                    hint: 'Tính tỷ lệ nước tiết kiệm được nhờ các biện pháp cải tiến trên tổng lượng nước sử dụng.',
                    evidence:
                      'Bảng so sánh tiêu thụ nước trước - sau; mô tả biện pháp tiết kiệm nước.',
                  },
                  {
                    id: 'I 33',
                    level: 'C',
                    text: 'Tỷ lệ nước thải được thu gom xử lý đạt tiêu chuẩn, quy chuẩn kỹ thuật trước khi thải ra môi trường',
                    unit: '%',
                    maxScore: 4,
                    hint: 'Tính tỷ lệ nước thải được thu gom, xử lý đạt quy chuẩn kỹ thuật trước khi xả thải. Mục tiêu là 100%.',
                    evidence:
                      'Kết quả quan trắc nước thải định kỳ; giấy phép môi trường; hợp đồng đấu nối/xử lý nước thải.',
                  },
                  {
                    id: 'I 35',
                    level: 'A',
                    text: 'Hoạt động, sáng kiến được thực hiện liên quan đến tái tạo, phục hồi nguồn nước (số lượng; mức đầu tư; lượng nước được tái tạo)',
                    unit: 'Số/Triệu VNĐ/m3',
                    maxScore: 2,
                    hint: 'Liệt kê các sáng kiến tái tạo, phục hồi nguồn nước (trồng rừng đầu nguồn, thu gom nước mưa, phục hồi ao hồ...) kèm mức đầu tư và khối lượng nước.',
                    evidence:
                      'Kế hoạch và biên bản triển khai; hình ảnh; chứng từ đầu tư; xác nhận của địa phương.',
                  },
                ],
              },
            ],
          },
        ],
        total: {
          label: 'TỔNG CỘNG',
          maxScore: 184,
        },
      },
      {
        id: 'G',
        title: 'CHỈ SỐ QUẢN TRỊ DOANH NGHIỆP (CHỈ SỐ G)',
        subtitle:
          'Phần IV của Bộ chỉ số CSI 2026 | 8 chỉ số (7 chỉ số C, 1 chỉ số A) | Điểm tối đa công bố: 70 điểm',
        note: 'Chọn mức độ thực hiện cho từng chỉ số. Chỉ chọn "Đã thực hiện đầy đủ, có hồ sơ" khi thực sự có tài liệu chứng minh.',
        shortLabel: 'Chỉ số G',
        dashboardLabel: 'Chỉ số quản trị (G)',
        publishedMax: 70,
        headers: {
          code: 'Mã chỉ số',
          level: 'Cấp độ',
          text: 'Nội dung chỉ số',
          maxScore: 'Điểm tối đa',
          answer: 'Thực hiện tại doanh nghiệp (Có/Không)',
          selfScore: 'Điểm tự đánh giá',
          available: 'Điểm khả dụng',
          priority: 'Mức ưu tiên',
          hint: 'Gợi ý hành động',
          evidence: 'Hồ sơ minh chứng cần chuẩn bị',
          note: 'Ghi chú / hồ sơ hiện có',
          owner: 'Người phụ trách',
          deadline: 'Hạn hoàn thành',
          group: 'Nhóm',
        },
        groups: [
          {
            id: 'g-g1',
            title: 'CAM KẾT PHÁT TRIỂN BỀN VỮNG',
            declaredMax: 10,
            blocks: [
              {
                id: 'g-g1-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'G 1',
                    level: 'C',
                    text: 'Kế hoạch kinh doanh của doanh nghiệp bao gồm các chỉ tiêu về môi trường, xã hội',
                    maxScore: 10,
                    hint: 'Đưa ít nhất một chỉ tiêu môi trường và một chỉ tiêu xã hội có con số cụ thể vào kế hoạch kinh doanh năm, do lãnh đạo phê duyệt. Với doanh nghiệp vừa và lớn, gắn thêm với các Mục tiêu Phát triển bền vững (SDGs) mà doanh nghiệp có tác động rõ nhất.',
                    evidence:
                      'Kế hoạch kinh doanh năm có chữ ký phê duyệt, trong đó thể hiện rõ chỉ tiêu E và S; biên bản họp thông qua kế hoạch.',
                  },
                ],
              },
            ],
          },
          {
            id: 'g-g2',
            title: 'QUẢN TRỊ RỦI RO',
            declaredMax: 6,
            blocks: [
              {
                id: 'g-g2-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'G 5',
                    level: 'C',
                    text: 'Xây dựng chính sách, quy trình, cơ cấu tổ chức thực hiện quản trị rủi ro trong hoạt động liên quan đến sản xuất/kinh doanh',
                    maxScore: 6,
                    hint: 'Ban hành chính sách và quy trình quản trị rủi ro, phân công rõ ai nhận diện, ai đánh giá, ai phê duyệt biện pháp xử lý. Doanh nghiệp nhỏ có thể gói gọn trong 2-3 trang.',
                    evidence:
                      'Chính sách/quy chế quản trị rủi ro; sơ đồ phân công; biên bản rà soát rủi ro định kỳ.',
                  },
                ],
              },
            ],
          },
          {
            id: 'g-g3',
            title: 'ĐẢM BẢO SỰ HÀI LÒNG CỦA KHÁCH HÀNG',
            declaredMax: 28,
            blocks: [
              {
                id: 'g-g3-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'G 12',
                    level: 'C',
                    text: 'Xây dựng chính sách, quy trình, kênh thông tin và thực hiện thu thập ý kiến, khảo sát, đánh giá sự hài lòng của khách hàng về sản phẩm/dịch vụ để thực hiện các cải tiến',
                    maxScore: 14,
                    hint: 'Thiết lập kênh thu thập ý kiến khách hàng (khảo sát, hotline, biểu mẫu trực tuyến) và làm khảo sát hài lòng ít nhất 1 lần/năm, có báo cáo kết quả và hành động cải tiến.',
                    evidence:
                      'Chính sách/quy trình khảo sát; bộ câu hỏi; báo cáo kết quả khảo sát; biên bản cải tiến sau khảo sát.',
                  },
                  {
                    id: 'G 13',
                    level: 'C',
                    text: 'Thực hiện quy trình xử lý khiếu nại, góp ý, tố cáo sai phạm của khách hàng và các bên liên quan',
                    maxScore: 14,
                    hint: 'Ban hành quy trình xử lý khiếu nại và tố giác sai phạm, ghi rõ thời hạn phản hồi và cơ chế bảo vệ người tố giác. Lưu sổ theo dõi từng vụ việc.',
                    evidence:
                      'Quy trình xử lý khiếu nại; sổ theo dõi khiếu nại và kết quả xử lý; bằng chứng công bố kênh tiếp nhận.',
                  },
                ],
              },
            ],
          },
          {
            id: 'g-g4',
            title: 'CHÍNH SÁCH ĐẶC THÙ',
            declaredMax: 12,
            blocks: [
              {
                id: 'g-g4-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'G 17',
                    level: 'C',
                    text: 'Xây dựng và thực hiện chính sách/điều khoản quy định về phòng chống quấy rối tình dục nơi công sở',
                    maxScore: 6,
                    hint: 'Ban hành chính sách phòng chống quấy rối tình dục nơi làm việc và đưa vào nội quy lao động, kèm quy trình khiếu nại kín và tập huấn cho nhân viên.',
                    evidence:
                      'Chính sách/điều khoản trong nội quy lao động; tài liệu và danh sách tập huấn; quy trình tiếp nhận khiếu nại.',
                  },
                  {
                    id: 'G 19',
                    level: 'C',
                    text: 'Xây dựng và thực hiện chính sách/cam kết/quy tắc ứng xử về phòng chống buôn bán, tiêu thụ, sử dụng động vật hoang dã và các sản phẩm có nguồn gốc từ động vật hoang dã',
                    maxScore: 6,
                    hint: 'Ban hành cam kết không buôn bán, tiêu thụ, sử dụng động vật hoang dã và sản phẩm từ động vật hoang dã; áp dụng cho cả tiếp khách, quà tặng doanh nghiệp.',
                    evidence:
                      'Chính sách/cam kết đã ký; bằng chứng phổ biến nội bộ; nội dung tích hợp trong quy tắc ứng xử.',
                  },
                ],
              },
            ],
          },
          {
            id: 'g-g5',
            title: 'TRUYỀN THÔNG',
            declaredMax: 8,
            blocks: [
              {
                id: 'g-g5-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'G 20',
                    level: 'C',
                    text: 'Xây dựng các hình thức thực hiện công tác truyền thông tới các đối tác, các bên liên quan và hình thức/kênh tiếp nhận ý kiến phản hồi từ các bên liên quan',
                    maxScore: 8,
                    hint: 'Xác định rõ các kênh truyền thông tới đối tác và bên liên quan (website, bản tin, fanpage, họp đối tác) và kênh tiếp nhận phản hồi hai chiều.',
                    evidence:
                      'Kế hoạch truyền thông; ảnh chụp/đường dẫn các kênh; sổ ghi nhận và xử lý phản hồi.',
                  },
                ],
              },
            ],
          },
          {
            id: 'g-g6',
            title: 'NGHIÊN CỨU & PHÁT TRIỂN - ĐỔI MỚI SÁNG TẠO - ỨNG DỤNG KHOA HỌC CÔNG NGHỆ',
            declaredMax: 6,
            blocks: [
              {
                id: 'g-g6-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'G 22',
                    level: 'A',
                    text: 'Thực hiện hoạt động nghiên cứu và phát triển, đổi mới sáng tạo, ứng dụng khoa học công nghệ (tổ chức, tập huấn, đầu tư...) để cải tiến quy trình quản trị doanh nghiệp, đổi mới sản phẩm... đóng góp cho phát triển bền vững doanh nghiệp',
                    maxScore: 6,
                    hint: 'Chỉ số này nói về hoạt động NỘI BỘ: cải tiến quy trình, cải tiến sản phẩm nhằm tối ưu hóa quy trình quản trị, cải thiện năng suất, chất lượng hoạt động, bảo vệ môi trường, nâng cao năng lực cạnh tranh. Ghi nhận từng hoạt động kèm mức đầu tư. Đừng nhầm với G 23 (hướng ra bên ngoài).',
                    evidence:
                      'Quyết định/kế hoạch R&D; chứng từ đầu tư; báo cáo kết quả nghiên cứu; hình ảnh minh họa.',
                  },
                ],
              },
            ],
          },
        ],
        total: {
          label: 'TỔNG CỘNG',
          maxScore: 70,
        },
      },
      {
        id: 'E',
        title: 'CHỈ SỐ MÔI TRƯỜNG (CHỈ SỐ E)',
        subtitle:
          'Phần V của Bộ chỉ số CSI 2026 | 14 chỉ số (13 chỉ số C, 1 chỉ số A) | Điểm tối đa công bố: 138 điểm',
        note: 'Phần lớn chỉ số E là chỉ số tuân thủ pháp luật. Hãy xử lý toàn bộ chỉ số C trước.',
        shortLabel: 'Chỉ số E',
        dashboardLabel: 'Chỉ số môi trường (E)',
        publishedMax: 138,
        headers: {
          code: 'Mã chỉ số',
          level: 'Cấp độ',
          text: 'Nội dung chỉ số',
          maxScore: 'Điểm tối đa',
          answer: 'Thực hiện tại doanh nghiệp (Có/Không)',
          selfScore: 'Điểm tự đánh giá',
          available: 'Điểm khả dụng',
          priority: 'Mức ưu tiên',
          hint: 'Gợi ý hành động',
          evidence: 'Hồ sơ minh chứng cần chuẩn bị',
          note: 'Ghi chú / hồ sơ hiện có',
          owner: 'Người phụ trách',
          deadline: 'Hạn hoàn thành',
          group: 'Nhóm',
        },
        groups: [
          {
            id: 'e-g1',
            title: 'TUÂN THỦ PHÁP LUẬT VỀ BẢO VỆ MÔI TRƯỜNG',
            declaredMax: 112,
            blocks: [
              {
                id: 'e-g1-b1',
                title: '» Giấy phép môi trường; thuế, phí môi trường và báo cáo môi trường',
                declaredMax: 42,
                indicators: [
                  {
                    id: 'E 1',
                    level: 'C',
                    text: 'Có giấy phép môi trường; đăng ký môi trường; đăng ký khai thác sử dụng nước mặt, nước ngầm theo đúng quy định, còn hiệu lực',
                    maxScore: 14,
                    hint: 'Kiểm tra doanh nghiệp thuộc nhóm nào theo Điều 28 Luật Bảo vệ môi trường 2020 để xác định cần giấy phép môi trường hay chỉ cần đăng ký môi trường. Rà soát ngày hết hiệu lực và làm thủ tục gia hạn trước 6 tháng.',
                    evidence:
                      'Giấy phép môi trường/giấy xác nhận đăng ký môi trường còn hiệu lực; giấy phép khai thác nước mặt, nước ngầm.',
                  },
                  {
                    id: 'E 2',
                    level: 'C',
                    text: 'Nộp đầy đủ, kịp thời các loại thuế, phí bảo vệ môi trường đối với nước thải; khí thải; sử dụng nước mặt, nước ngầm; ký quỹ bảo vệ môi trường, chi trả dịch vụ hệ sinh thái tự nhiên',
                    maxScore: 14,
                    hint: 'Rà soát các nghĩa vụ tài chính về môi trường đang áp dụng cho doanh nghiệp: phí bảo vệ môi trường với nước thải, khí thải; tiền cấp quyền khai thác nước; ký quỹ.',
                    evidence:
                      'Chứng từ nộp phí, thuế bảo vệ môi trường; tờ khai phí; xác nhận của cơ quan thuế.',
                  },
                  {
                    id: 'E 3',
                    level: 'C',
                    text: 'Nộp báo cáo công tác bảo vệ môi trường, báo cáo tình hình khai thác nước mặt, nước ngầm, tình hình hoạt động hóa chất, kết quả tái chế sản phẩm bao bì đầy đủ, đúng hạn',
                    maxScore: 14,
                    hint: 'Lập lịch nhắc hạn nộp báo cáo công tác bảo vệ môi trường (trước 15/01 hằng năm) và các báo cáo về nước, hóa chất, EPR.',
                    evidence:
                      'Bản báo cáo đã nộp kèm biên nhận/dấu tiếp nhận của cơ quan quản lý cho cả 3 năm.',
                  },
                ],
              },
              {
                id: 'e-g1-b2',
                title:
                  '» Quản lý chất thải, phòng ngừa và kiểm soát ô nhiễm, ứng phó với sự cố môi trường',
                declaredMax: 70,
                indicators: [
                  {
                    id: 'E 4',
                    level: 'C',
                    text: 'Thực hiện đúng quy định về phân loại, thu gom, vận chuyển, lưu giữ, xử lý chất thải rắn công nghiệp thông thường và chất thải rắn sinh hoạt',
                    maxScore: 14,
                    hint: 'Bố trí khu vực phân loại chất thải tại nguồn, ký hợp đồng với đơn vị thu gom có giấy phép và lưu đầy đủ chứng từ chuyển giao.',
                    evidence:
                      'Hợp đồng thu gom, xử lý; chứng từ chuyển giao chất thải; hình ảnh khu lưu giữ có biển báo.',
                  },
                  {
                    id: 'E 5',
                    level: 'C',
                    text: 'Thực hiện đúng quy định về phân loại, thu gom, vận chuyển, lưu giữ, xử lý chất thải rắn nguy hại',
                    maxScore: 14,
                    hint: 'Chất thải nguy hại phải được lưu giữ riêng, có biển cảnh báo, sổ chủ nguồn thải và chuyển giao cho đơn vị có giấy phép xử lý CTNH.',
                    evidence:
                      'Sổ đăng ký chủ nguồn thải CTNH; chứng từ CTNH; hợp đồng với đơn vị có giấy phép; hình ảnh kho lưu giữ.',
                  },
                  {
                    id: 'E 6',
                    level: 'C',
                    text: 'Thực hiện đúng quy định về bảo vệ môi trường trong xuất, nhập khẩu, quá cảnh hàng hóa, máy móc, thiết bị, phương tiện, nguyên liệu, phế liệu đã qua sử dụng',
                    maxScore: 6,
                    hint: 'Nếu có xuất nhập khẩu máy móc, thiết bị, nguyên liệu, phế liệu đã qua sử dụng, rà soát điều kiện nhập khẩu và hồ sơ hải quan. Nếu không phát sinh, chọn "Không thuộc đối tượng áp dụng".',
                    evidence: 'Hồ sơ hải quan; giấy phép nhập khẩu phế liệu; kết quả giám định.',
                  },
                  {
                    id: 'E 7',
                    level: 'C',
                    text: 'Thực hiện đúng quy định về trách nhiệm tái chế sản phẩm, bao bì (EPR) và trách nhiệm xử lý chất thải',
                    maxScore: 6,
                    hint: 'Kiểm tra doanh nghiệp có thuộc đối tượng trách nhiệm mở rộng của nhà sản xuất (EPR) không. Nếu có, đăng ký kế hoạch tái chế hoặc đóng góp tài chính vào Quỹ Bảo vệ môi trường Việt Nam đúng hạn.',
                    evidence:
                      'Bản đăng ký kế hoạch tái chế; chứng từ đóng góp tài chính; báo cáo kết quả tái chế.',
                  },
                  {
                    id: 'E 8',
                    level: 'C',
                    text: 'Sử dụng tiết kiệm, an toàn hóa chất, trang thiết bị, dụng cụ',
                    maxScore: 6,
                    hint: 'Lập danh mục hóa chất đang sử dụng, có phiếu an toàn hóa chất (MSDS), kho chứa đúng quy định và tập huấn an toàn hóa chất cho người tiếp xúc.',
                    evidence:
                      'Danh mục hóa chất; phiếu MSDS; biện pháp phòng ngừa sự cố hóa chất; hồ sơ tập huấn.',
                  },
                  {
                    id: 'E 9',
                    level: 'C',
                    text: 'Trang bị đầy đủ thiết bị, dụng cụ phòng ngừa rủi ro, ứng phó sự cố môi trường',
                    maxScore: 12,
                    hint: 'Trang bị và kiểm tra định kỳ thiết bị ứng phó sự cố: vật liệu thấm hút, bờ bao chống tràn, bình chữa cháy, thiết bị bảo hộ.',
                    evidence:
                      'Danh mục thiết bị ứng phó sự cố; biên bản kiểm tra định kỳ; hình ảnh; kế hoạch ứng phó sự cố môi trường.',
                  },
                  {
                    id: 'E 10',
                    level: 'C',
                    text: 'Thực hiện kiểm soát, quan trắc, giám sát môi trường nước thải, khí thải theo đúng quy định hiện hành',
                    maxScore: 12,
                    hint: 'Thực hiện quan trắc môi trường định kỳ theo đúng tần suất ghi trong giấy phép môi trường, do đơn vị được cấp phép thực hiện.',
                    evidence:
                      'Kết quả quan trắc nước thải, khí thải các kỳ; hợp đồng với đơn vị quan trắc đủ năng lực.',
                  },
                ],
              },
            ],
          },
          {
            id: 'e-g2',
            title:
              'CÁC HOẠT ĐỘNG BẢO VỆ MÔI TRƯỜNG, ỨNG PHÓ VỚI BIẾN ĐỔI KHÍ HẬU, THÚC ĐẨY KINH TẾ TUẦN HOÀN',
            declaredMax: 16,
            blocks: [
              {
                id: 'e-g2-b1',
                title: '» Hoạt động sử dụng nguyên nhiên vật liệu, năng lượng tái chế, tái tạo',
                declaredMax: 4,
                indicators: [
                  {
                    id: 'E 12',
                    level: 'A',
                    text: 'Thực hiện chính sách khuyến khích, hỗ trợ người lao động sử dụng phương tiện giao thông ít phát thải',
                    maxScore: 4,
                    hint: 'Ban hành chính sách khuyến khích nhân viên đi xe buýt, xe đạp, xe điện hoặc đi chung xe; có thể hỗ trợ chi phí hoặc bố trí xe đưa đón.',
                    evidence:
                      'Chính sách hỗ trợ; danh sách người lao động hưởng chính sách; chứng từ chi.',
                  },
                ],
              },
              {
                id: 'e-g2-b2',
                title: '» Hoạt động sử dụng năng lượng tiết kiệm và hiệu quả',
                declaredMax: 6,
                indicators: [
                  {
                    id: 'E 17',
                    level: 'C',
                    text: 'Ban hành và thực hiện thường xuyên các quy định thực hành tiết kiệm năng lượng',
                    maxScore: 6,
                    hint: 'Ban hành quy định thực hành tiết kiệm năng lượng (tắt thiết bị khi không dùng, cài đặt nhiệt độ điều hòa, bảo trì định kỳ) và kiểm tra việc thực hiện.',
                    evidence:
                      'Quy định tiết kiệm năng lượng đã ban hành; biên bản kiểm tra; số liệu tiêu thụ điện theo tháng.',
                  },
                ],
              },
              {
                id: 'e-g2-b3',
                title:
                  '» Hoạt động khai thác và sử dụng các nguồn nguyên vật liệu, tài nguyên thiên nhiên một cách bền vững',
                declaredMax: 6,
                indicators: [
                  {
                    id: 'E 24',
                    level: 'C',
                    text: 'Bảo vệ đa dạng sinh học, phòng, chống buôn bán, vận chuyển và sử dụng động vật hoang dã',
                    maxScore: 6,
                    hint: 'Ban hành cam kết bảo vệ đa dạng sinh học và không tiêu thụ động vật hoang dã; phổ biến tới toàn bộ nhân viên và áp dụng cho hoạt động tiếp khách.',
                    evidence:
                      'Cam kết/chính sách đã ban hành; tài liệu truyền thông nội bộ; hoạt động bảo tồn đã tham gia.',
                  },
                ],
              },
            ],
          },
          {
            id: 'e-g3',
            title: 'QUẢN LÝ MÔI TRƯỜNG, TUYÊN TRUYỀN NÂNG CAO NHẬN THỨC CHO NGƯỜI LAO ĐỘNG',
            declaredMax: 10,
            blocks: [
              {
                id: 'e-g3-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'E 26',
                    level: 'C',
                    text: 'Tổ chức hoạt động tập huấn và theo dõi sự thay đổi nhận thức và hành vi sau tập huấn, truyền thông nâng cao nhận thức cho người lao động về bảo vệ môi trường và ứng phó với biến đổi khí hậu',
                    maxScore: 10,
                    hint: 'Tổ chức tập huấn môi trường và biến đổi khí hậu cho người lao động ít nhất 1 lần/năm, có khảo sát nhận thức trước và sau để chứng minh hiệu quả.',
                    evidence:
                      'Tài liệu tập huấn; danh sách tham dự; kết quả khảo sát trước - sau; hình ảnh.',
                  },
                ],
              },
            ],
          },
        ],
        total: {
          label: 'TỔNG CỘNG',
          maxScore: 138,
        },
      },
      {
        id: 'LS',
        title: 'CHỈ SỐ LAO ĐỘNG VÀ XÃ HỘI (CHỈ SỐ L VÀ S)',
        subtitle:
          'Phần VI của Bộ chỉ số CSI 2026 | 61 chỉ số (48 chỉ số C, 13 chỉ số A) | Điểm tối đa công bố: 141 điểm',
        note: 'Đây là phần có nhiều chỉ số nhất. Nên làm cùng bộ phận nhân sự và đại diện công đoàn.',
        shortLabel: 'Chỉ số L&S',
        dashboardLabel: 'Chỉ số lao động - xã hội (L&S)',
        publishedMax: 141,
        headers: {
          code: 'Mã chỉ số',
          level: 'Cấp độ',
          text: 'Nội dung chỉ số',
          maxScore: 'Điểm tối đa',
          answer: 'Thực hiện tại doanh nghiệp (Có/Không)',
          selfScore: 'Điểm tự đánh giá',
          available: 'Điểm khả dụng',
          priority: 'Mức ưu tiên',
          hint: 'Gợi ý hành động',
          evidence: 'Hồ sơ minh chứng cần chuẩn bị',
          note: 'Ghi chú / hồ sơ hiện có',
          owner: 'Người phụ trách',
          deadline: 'Hạn hoàn thành',
          group: 'Nhóm',
        },
        groups: [
          {
            id: 'ls-g1',
            title: 'QUẢN LÝ NHÂN SỰ',
            declaredMax: 23,
            blocks: [
              {
                id: 'ls-g1-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'L 1',
                    level: 'C',
                    text: 'Tuân thủ đầy đủ quy định về giao kết hợp đồng lao động: giao kết bằng văn bản đối với hợp đồng từ một (01) tháng trở lên; giao kết đúng loại hợp đồng; hợp đồng có đầy đủ nội dung theo quy định',
                    maxScore: 4,
                    hint: 'Rà soát toàn bộ hợp đồng lao động: đủ nội dung bắt buộc theo Điều 21 Bộ luật Lao động 2019, đúng loại hợp đồng, có văn bản với hợp đồng từ 1 tháng trở lên.',
                    evidence:
                      'Bộ hợp đồng lao động mẫu; danh sách lao động kèm loại hợp đồng; bản hợp đồng đại diện đã ký.',
                  },
                  {
                    id: 'L 2',
                    level: 'C',
                    text: 'Tuân thủ quy định về thực hiện hợp đồng lao động, bao gồm việc tạm thời chuyển người lao động làm công việc khác không theo hợp đồng đúng quy định; bố trí địa điểm lao động đúng theo thỏa thuận',
                    maxScore: 2,
                    hint: 'Đảm bảo chỉ điều chuyển người lao động làm công việc khác đúng quy định (không quá 60 ngày cộng dồn/năm, báo trước 3 ngày) và bố trí đúng địa điểm đã thỏa thuận.',
                    evidence:
                      'Quyết định điều chuyển; văn bản thông báo trước; hợp đồng lao động thể hiện địa điểm làm việc.',
                  },
                  {
                    id: 'L 3',
                    level: 'C',
                    text: 'Tuân thủ quy định về sửa đổi, bổ sung và chấm dứt hợp đồng lao động',
                    maxScore: 4,
                    hint: 'Rà soát quy trình sửa đổi, bổ sung, chấm dứt hợp đồng: đúng căn cứ, đúng thời hạn báo trước, thanh toán đầy đủ trong 14 ngày làm việc.',
                    evidence:
                      'Phụ lục hợp đồng; quyết định chấm dứt; biên bản thanh lý; chứng từ trợ cấp thôi việc.',
                  },
                  {
                    id: 'L 4',
                    level: 'A',
                    text: 'Chủ động xây dựng và thực hiện ký kết hợp đồng lao động điện tử',
                    maxScore: 1,
                    hint: 'Triển khai ký hợp đồng lao động điện tử có giá trị pháp lý tương đương văn bản. Đây là chỉ số nâng cao, giúp tiết kiệm thời gian và lưu trữ.',
                    evidence: 'Hợp đồng lao động điện tử đã ký; mô tả nền tảng ký số đang dùng.',
                  },
                  {
                    id: 'L 5',
                    level: 'C',
                    text: 'Lập sổ quản lý lao động và nhập đầy đủ thông tin về người lao động vào sổ quản lý lao động kể từ khi người lao động bắt đầu làm việc theo quy định',
                    maxScore: 2,
                    hint: 'Lập sổ quản lý lao động (bản giấy hoặc điện tử) và cập nhật ngay khi có lao động mới, đủ các trường thông tin theo quy định.',
                    evidence: 'Sổ quản lý lao động đã cập nhật; ảnh chụp/bản xuất từ phần mềm.',
                  },
                  {
                    id: 'L 6',
                    level: 'C',
                    text: 'Báo cáo tình hình thay đổi về lao động với cơ quan quản lý nhà nước về lao động theo quy định',
                    maxScore: 3,
                    hint: 'Nộp báo cáo tình hình thay đổi lao động 6 tháng/lần cho cơ quan quản lý lao động địa phương.',
                    evidence:
                      'Báo cáo tình hình sử dụng lao động đã nộp kèm biên nhận cho cả 3 năm.',
                  },
                  {
                    id: 'L 7',
                    level: 'C',
                    text: 'Xây dựng và đăng ký nội quy lao động với cơ quan quản lý nhà nước về lao động',
                    maxScore: 2,
                    hint: 'Doanh nghiệp có từ 10 lao động trở lên phải có nội quy lao động bằng văn bản và đăng ký với cơ quan quản lý lao động cấp tỉnh.',
                    evidence:
                      'Nội quy lao động; văn bản xác nhận đăng ký nội quy; bằng chứng niêm yết tại nơi làm việc.',
                  },
                  {
                    id: 'L 8',
                    level: 'C',
                    text: 'Đảm bảo nguyên tắc, trình tự, thủ tục xử lý kỷ luật lao động',
                    maxScore: 3,
                    hint: 'Xử lý kỷ luật lao động phải đúng trình tự: có căn cứ trong nội quy, họp có sự tham gia của công đoàn và người lao động, lập biên bản.',
                    evidence:
                      'Quy trình xử lý kỷ luật; biên bản họp xử lý kỷ luật; quyết định kỷ luật (nếu có).',
                  },
                  {
                    id: 'L 9',
                    level: 'C',
                    text: 'Tạo điều kiện để người lao động nắm bắt cơ hội việc làm và thăng tiến nghề nghiệp',
                    maxScore: 2,
                    hint: 'Công khai vị trí tuyển dụng nội bộ và tiêu chí thăng tiến để người lao động biết cơ hội phát triển.',
                    evidence:
                      'Thông báo tuyển dụng nội bộ; quy định về thăng tiến; danh sách người lao động được đề bạt.',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g2',
            title: 'LƯƠNG, THƯỞNG VÀ CÁC CHẾ ĐỘ BẢO HIỂM BẮT BUỘC',
            declaredMax: 26,
            blocks: [
              {
                id: 'ls-g2-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'L 11',
                    level: 'C',
                    text: 'Xây dựng và công khai thang lương, bảng lương và định mức lao động tại nơi làm việc',
                    maxScore: 6,
                    hint: 'Xây dựng thang lương, bảng lương, định mức lao động, tham khảo ý kiến công đoàn và niêm yết công khai tại nơi làm việc.',
                    evidence: 'Thang bảng lương; biên bản lấy ý kiến công đoàn; hình ảnh niêm yết.',
                  },
                  {
                    id: 'L 12',
                    level: 'A',
                    text: 'Xây dựng quy chế trả lương cho người lao động',
                    maxScore: 4,
                    hint: 'Ban hành quy chế trả lương nêu rõ cấu trúc lương, tiêu chí tăng lương, cách tính lương làm thêm giờ.',
                    evidence:
                      'Quy chế trả lương đã ban hành; bằng chứng phổ biến tới người lao động.',
                  },
                  {
                    id: 'L 13',
                    level: 'C',
                    text: 'Trả đúng hạn, đủ và thông báo bảng kê tiền lương, tiền lương làm thêm giờ của người lao động',
                    maxScore: 6,
                    hint: 'Trả lương đúng kỳ hạn cam kết và gửi bảng kê chi tiết tiền lương, làm thêm giờ cho từng người lao động.',
                    evidence:
                      'Bảng lương; chứng từ chuyển khoản; mẫu phiếu lương gửi người lao động.',
                  },
                  {
                    id: 'L 14',
                    level: 'A',
                    text: 'Xây dựng và thực hiện quy chế thưởng đối với người lao động',
                    maxScore: 4,
                    hint: 'Ban hành quy chế thưởng minh bạch, nêu rõ căn cứ và thời điểm xét thưởng.',
                    evidence: 'Quy chế thưởng; quyết định thưởng; chứng từ chi thưởng.',
                  },
                  {
                    id: 'L 15',
                    level: 'C',
                    text: 'Đóng bảo hiểm xã hội, bảo hiểm y tế, bảo hiểm thất nghiệp, bảo hiểm tai nạn lao động - bệnh nghề nghiệp đúng hạn và đầy đủ số người lao động thuộc đối tượng phải đóng',
                    maxScore: 6,
                    hint: 'Đóng đủ và đúng hạn BHXH, BHYT, BHTN, BH tai nạn lao động - bệnh nghề nghiệp cho 100% lao động thuộc diện phải đóng. Kiểm tra xem có nợ đọng không.',
                    evidence:
                      'Thông báo kết quả đóng BHXH (C12-TS); xác nhận không nợ BHXH; chứng từ nộp.',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g3',
            title: 'TRỢ CẤP VÀ CÁC CHẾ ĐỘ PHÚC LỢI',
            declaredMax: 9,
            blocks: [
              {
                id: 'ls-g3-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'L 19',
                    level: 'A',
                    text: 'Hỗ trợ tiền ăn ca, tiền ăn trưa cho người lao động',
                    maxScore: 2,
                    hint: 'Hỗ trợ tiền ăn ca/ăn trưa hoặc tổ chức bếp ăn tập thể cho người lao động.',
                    evidence:
                      'Chính sách hỗ trợ ăn ca; bảng lương thể hiện khoản hỗ trợ; hợp đồng cung cấp suất ăn.',
                  },
                  {
                    id: 'L 20',
                    level: 'A',
                    text: 'Thực hiện các chính sách hỗ trợ việc chăm sóc con của người lao động: gửi trẻ/nuôi con nhỏ/đạt thành tích cao trong học tập...',
                    maxScore: 2,
                    hint: 'Ban hành chính sách hỗ trợ chăm sóc con của người lao động: trợ cấp gửi trẻ, quà 1/6, khen thưởng con có thành tích học tập.',
                    evidence:
                      'Chính sách hỗ trợ; danh sách hưởng; chứng từ chi; hình ảnh hoạt động.',
                  },
                  {
                    id: 'L 21',
                    level: 'A',
                    text: 'Tổ chức các hoạt động văn hóa, văn nghệ, thể thao và tham quan, du lịch cho người lao động',
                    maxScore: 2,
                    hint: 'Tổ chức hoạt động văn hóa, thể thao, tham quan hằng năm để gắn kết người lao động.',
                    evidence: 'Kế hoạch hoạt động; danh sách tham gia; hình ảnh; chứng từ chi.',
                  },
                  {
                    id: 'L 23',
                    level: 'A',
                    text: 'Hỗ trợ tiền điện thoại',
                    maxScore: 1,
                    hint: 'Hỗ trợ chi phí điện thoại cho các vị trí có nhu cầu liên lạc thường xuyên.',
                    evidence: 'Chính sách hỗ trợ; bảng lương thể hiện khoản phụ cấp điện thoại.',
                  },
                  {
                    id: 'L 24',
                    level: 'A',
                    text: 'Hỗ trợ sinh nhật, kết hôn, thân nhân mất...',
                    maxScore: 1,
                    hint: 'Duy trì chế độ thăm hỏi sinh nhật, kết hôn, hiếu hỉ cho người lao động.',
                    evidence: 'Quy chế phúc lợi; sổ theo dõi thăm hỏi; chứng từ chi.',
                  },
                  {
                    id: 'L 25',
                    level: 'A',
                    text: 'Trợ cấp người lao động khó khăn do bị tai nạn',
                    maxScore: 1,
                    hint: 'Có quỹ hoặc cơ chế trợ cấp cho người lao động gặp khó khăn do tai nạn, bệnh hiểm nghèo.',
                    evidence: 'Quy chế trợ cấp khó khăn; danh sách hỗ trợ; chứng từ chi.',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g4',
            title: 'THỜI GIỜ LÀM VIỆC, THỜI GIỜ NGHỈ NGƠI',
            declaredMax: 13,
            blocks: [
              {
                id: 'ls-g4-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'L 26',
                    level: 'C',
                    text: 'Áp dụng thời giờ làm việc bình thường không quá 08 giờ trong 01 ngày hoặc không quá 48 giờ trong 01 tuần',
                    maxScore: 5,
                    hint: 'Kiểm tra bảng chấm công: thời giờ làm việc bình thường không quá 8 giờ/ngày hoặc 48 giờ/tuần.',
                    evidence: 'Bảng chấm công; nội quy lao động quy định thời giờ làm việc.',
                  },
                  {
                    id: 'L 27',
                    level: 'C',
                    text: 'Đảm bảo thời gian nghỉ hằng tuần, nghỉ trong giờ làm việc, nghỉ chuyển ca, nghỉ giữa ca cho người lao động',
                    maxScore: 3,
                    hint: 'Đảm bảo nghỉ hằng tuần tối thiểu 24 giờ liên tục, nghỉ giữa ca 30 phút (45 phút với ca đêm), nghỉ chuyển ca tối thiểu 12 giờ.',
                    evidence: 'Bảng chấm công thể hiện ca kíp; nội quy lao động; lịch phân ca.',
                  },
                  {
                    id: 'L 28',
                    level: 'C',
                    text: 'Nghiêm túc thực hiện các quy định về sử dụng người lao động làm thêm giờ, làm ca đêm, làm vào ngày nghỉ, ngày lễ',
                    maxScore: 3,
                    hint: 'Làm thêm giờ không quá 40 giờ/tháng và 200 giờ/năm (300 giờ với ngành được phép), có thỏa thuận bằng văn bản và trả đúng đơn giá.',
                    evidence:
                      'Văn bản đồng ý làm thêm giờ; bảng chấm công làm thêm; bảng lương thể hiện tiền làm thêm.',
                  },
                  {
                    id: 'L 29',
                    level: 'C',
                    text: 'Bảo đảm cho người lao động nghỉ việc riêng hoặc nghỉ không hưởng lương theo quy định',
                    maxScore: 2,
                    hint: 'Đảm bảo chế độ nghỉ việc riêng có hưởng lương (kết hôn, con kết hôn, tang) và nghỉ không hưởng lương theo quy định.',
                    evidence: 'Nội quy lao động; đơn xin nghỉ và phê duyệt; bảng chấm công.',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g5',
            title: 'SỨC KHỎE, AN TOÀN VỆ SINH LAO ĐỘNG VÀ AN TOÀN VỆ SINH THỰC PHẨM',
            declaredMax: 30,
            blocks: [
              {
                id: 'ls-g5-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'L 30',
                    level: 'C',
                    text: 'Khám sức khỏe định kỳ cho người lao động theo quy định',
                    maxScore: 4,
                    hint: 'Tổ chức khám sức khỏe định kỳ ít nhất 1 lần/năm (6 tháng/lần với lao động nặng nhọc, độc hại, người khuyết tật, chưa thành niên, cao tuổi).',
                    evidence:
                      'Hợp đồng với cơ sở y tế; kết quả khám sức khỏe; hồ sơ quản lý sức khỏe người lao động.',
                  },
                  {
                    id: 'L 31',
                    level: 'C',
                    text: 'Tổ chức bộ phận làm công tác y tế hoặc thuê tổ chức dịch vụ làm công tác y tế theo quy định',
                    maxScore: 1,
                    hint: 'Bố trí bộ phận y tế hoặc ký hợp đồng với cơ sở y tế đủ điều kiện theo quy mô lao động.',
                    evidence:
                      'Quyết định thành lập bộ phận y tế hoặc hợp đồng dịch vụ y tế; chứng chỉ nhân viên y tế.',
                  },
                  {
                    id: 'L 32',
                    level: 'C',
                    text: 'Bố trí lực lượng sơ cứu, cấp cứu tại nơi làm việc theo quy định',
                    maxScore: 1,
                    hint: 'Bố trí và huấn luyện lực lượng sơ cứu, cấp cứu; trang bị túi sơ cứu đúng định mức theo khu vực làm việc.',
                    evidence:
                      'Quyết định phân công lực lượng sơ cứu; chứng nhận huấn luyện sơ cứu; danh mục túi sơ cứu.',
                  },
                  {
                    id: 'L 33',
                    level: 'A',
                    text: 'Kiểm soát chất lượng, an toàn vệ sinh thực phẩm bếp ăn cho người lao động',
                    maxScore: 1,
                    hint: 'Nếu có bếp ăn tập thể, đảm bảo giấy chứng nhận an toàn thực phẩm, lưu mẫu thức ăn 24 giờ và khám sức khỏe cho nhân viên bếp.',
                    evidence:
                      'Giấy chứng nhận cơ sở đủ điều kiện ATTP; sổ lưu mẫu; hồ sơ nguồn gốc thực phẩm.',
                  },
                  {
                    id: 'L 34',
                    level: 'C',
                    text: 'Ban hành nội quy, quy trình, kế hoạch bảo đảm an toàn, vệ sinh lao động tại nơi làm việc',
                    maxScore: 3,
                    hint: 'Ban hành nội quy, quy trình và kế hoạch ATVSLĐ hằng năm, có phân bổ kinh phí.',
                    evidence:
                      'Kế hoạch ATVSLĐ năm đã phê duyệt; nội quy, quy trình an toàn theo từng vị trí.',
                  },
                  {
                    id: 'L 35',
                    level: 'C',
                    text: 'Tổ chức bố trí bộ phận hoặc nhân sự làm công tác an toàn, vệ sinh lao động đủ điều kiện theo quy định',
                    maxScore: 2,
                    hint: 'Bố trí bộ phận hoặc người làm công tác ATVSLĐ có chứng chỉ phù hợp với quy mô và mức độ rủi ro của doanh nghiệp.',
                    evidence:
                      'Quyết định phân công; chứng chỉ huấn luyện ATVSLĐ của người phụ trách.',
                  },
                  {
                    id: 'L 36',
                    level: 'C',
                    text: 'Các máy, thiết bị có yêu cầu nghiêm ngặt về an toàn lao động đang sử dụng được kiểm định theo quy định',
                    maxScore: 3,
                    hint: 'Lập danh mục máy, thiết bị có yêu cầu nghiêm ngặt về an toàn (nồi hơi, thang máy, thiết bị nâng...) và kiểm định đúng chu kỳ.',
                    evidence:
                      'Danh mục thiết bị; giấy chứng nhận kiểm định còn hiệu lực; tem kiểm định.',
                  },
                  {
                    id: 'L 37',
                    level: 'A',
                    text: 'Đánh giá rủi ro tại nơi làm việc liên quan đến sức khỏe của người lao động',
                    maxScore: 1,
                    hint: 'Thực hiện đánh giá rủi ro sức khỏe tại nơi làm việc ít nhất 1 lần/năm và với mỗi vị trí có yếu tố nguy hiểm, có hại.',
                    evidence: 'Báo cáo đánh giá rủi ro; biện pháp kiểm soát đã áp dụng.',
                  },
                  {
                    id: 'L 38',
                    level: 'C',
                    text: 'Ban hành kế hoạch xử lý sự cố, ứng cứu khẩn cấp tại nơi làm việc',
                    maxScore: 2,
                    hint: 'Xây dựng kế hoạch ứng cứu khẩn cấp (cháy nổ, rò rỉ hóa chất, tai nạn) và diễn tập định kỳ.',
                    evidence: 'Kế hoạch ứng cứu khẩn cấp; biên bản diễn tập; sơ đồ thoát hiểm.',
                  },
                  {
                    id: 'L 39',
                    level: 'C',
                    text: 'Thực hiện điều tra, báo cáo cơ quan chức năng tai nạn lao động tại nơi làm việc',
                    maxScore: 1,
                    hint: 'Khi xảy ra tai nạn lao động, thành lập đoàn điều tra, lập biên bản và khai báo với cơ quan chức năng theo đúng thời hạn.',
                    evidence:
                      'Biên bản điều tra tai nạn; văn bản khai báo; hồ sơ giải quyết chế độ cho người lao động.',
                  },
                  {
                    id: 'L 40',
                    level: 'C',
                    text: 'Trang bị đủ phương tiện bảo vệ cá nhân cho người lao động',
                    maxScore: 3,
                    hint: 'Cấp phát đầy đủ phương tiện bảo vệ cá nhân theo từng vị trí công việc, có ký nhận và kiểm tra việc sử dụng.',
                    evidence:
                      'Danh mục cấp phát PTBVCN; sổ ký nhận; hình ảnh người lao động sử dụng.',
                  },
                  {
                    id: 'L 41',
                    level: 'C',
                    text: 'Thống kê, phân loại lao động thực hiện các công việc nặng nhọc, độc hại, nguy hiểm và lao động làm công việc đặc biệt nặng nhọc, độc hại, nguy hiểm',
                    maxScore: 2,
                    hint: 'Lập danh sách lao động làm công việc nặng nhọc, độc hại, nguy hiểm theo danh mục của Bộ Lao động - Thương binh và Xã hội để áp dụng đúng chế độ.',
                    evidence:
                      'Danh sách phân loại lao động; bảng đối chiếu với danh mục nghề nặng nhọc độc hại.',
                  },
                  {
                    id: 'L 42',
                    level: 'C',
                    text: 'Tổ chức huấn luyện về an toàn, vệ sinh lao động cho người lao động theo quy định',
                    maxScore: 3,
                    hint: 'Huấn luyện ATVSLĐ theo đúng 6 nhóm đối tượng và đúng chu kỳ (2 năm/lần với nhóm 3, hằng năm với nhóm 4).',
                    evidence:
                      'Kế hoạch huấn luyện; danh sách tham dự; giấy chứng nhận/thẻ an toàn.',
                  },
                  {
                    id: 'L 43',
                    level: 'C',
                    text: 'Tổ chức quan trắc môi trường lao động hằng năm',
                    maxScore: 1,
                    hint: 'Tổ chức quan trắc môi trường lao động ít nhất 1 lần/năm với các yếu tố có hại (bụi, ồn, ánh sáng, nhiệt, hơi khí độc).',
                    evidence:
                      'Kết quả quan trắc môi trường lao động; hợp đồng với đơn vị đủ năng lực; biện pháp khắc phục.',
                  },
                  {
                    id: 'L 44',
                    level: 'C',
                    text: 'Định kỳ báo cáo cơ quan chức năng về tai nạn lao động và an toàn vệ sinh lao động',
                    maxScore: 2,
                    hint: 'Nộp báo cáo ATVSLĐ và báo cáo tai nạn lao động định kỳ trước ngày 10/01 hằng năm.',
                    evidence: 'Báo cáo đã nộp kèm biên nhận cho cả 3 năm.',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g6',
            title: 'GIÁO DỤC VÀ ĐÀO TẠO',
            declaredMax: 4,
            blocks: [
              {
                id: 'ls-g6-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'L 45',
                    level: 'C',
                    text: 'Đào tạo cho người lao động trước khi chuyển vị trí, lĩnh vực làm việc liên quan tới công việc nặng nhọc, độc hại',
                    maxScore: 1,
                    hint: 'Đào tạo lại cho người lao động trước khi chuyển sang vị trí có yếu tố nặng nhọc, độc hại.',
                    evidence:
                      'Quyết định điều chuyển; chương trình đào tạo; danh sách và kết quả đào tạo.',
                  },
                  {
                    id: 'L 46',
                    level: 'C',
                    text: 'Xây dựng kế hoạch hằng năm và phân bổ kinh phí cho việc đào tạo, bồi dưỡng, nâng cao trình độ, kỹ năng nghề; chính sách, quy định của doanh nghiệp; chính sách pháp luật cho người lao động',
                    maxScore: 3,
                    hint: 'Lập kế hoạch đào tạo hằng năm có dòng ngân sách riêng, bao gồm cả đào tạo về chính sách pháp luật và quy định nội bộ.',
                    evidence:
                      'Kế hoạch đào tạo năm đã phê duyệt kèm dự toán; báo cáo kết quả thực hiện.',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g7',
            title: 'CÔNG ĐOÀN, THỎA ƯỚC LAO ĐỘNG TẬP THỂ',
            declaredMax: 12,
            blocks: [
              {
                id: 'ls-g7-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'L 47',
                    level: 'C',
                    text: 'Thành lập tổ chức công đoàn cơ sở theo đúng quy trình, thủ tục',
                    maxScore: 2,
                    hint: 'Phối hợp với công đoàn cấp trên để thành lập công đoàn cơ sở. Nếu chưa đủ điều kiện, ghi nhận việc đã liên hệ và tạo điều kiện cho người lao động gia nhập công đoàn cấp trên.',
                    evidence:
                      'Quyết định công nhận công đoàn cơ sở; danh sách ban chấp hành; biên bản đại hội.',
                  },
                  {
                    id: 'L 48',
                    level: 'C',
                    text: 'Tạo điều kiện cho đoàn viên, cán bộ công đoàn hoạt động công đoàn hiệu quả theo đúng chức năng, nhiệm vụ của công đoàn',
                    maxScore: 2,
                    hint: 'Bố trí thời gian, địa điểm và kinh phí cho hoạt động công đoàn; đóng kinh phí công đoàn đúng quy định.',
                    evidence:
                      'Quy chế phối hợp với công đoàn; chứng từ đóng kinh phí công đoàn; biên bản hoạt động.',
                  },
                  {
                    id: 'L 49',
                    level: 'C',
                    text: 'Lấy ý kiến của ban chấp hành công đoàn cơ sở khi xây dựng thang lương, bảng lương, định mức lao động và quy chế thưởng',
                    maxScore: 2,
                    hint: 'Lấy ý kiến ban chấp hành công đoàn bằng văn bản trước khi ban hành thang bảng lương, định mức lao động, quy chế thưởng.',
                    evidence: 'Văn bản lấy ý kiến và văn bản trả lời của công đoàn.',
                  },
                  {
                    id: 'L 50',
                    level: 'C',
                    text: 'Lấy ý kiến ban chấp hành công đoàn cơ sở (tại nơi có tổ chức công đoàn) khi xây dựng, ban hành kế hoạch, nội quy, quy trình bảo đảm an toàn, vệ sinh lao động tại nơi làm việc',
                    maxScore: 2,
                    hint: 'Lấy ý kiến công đoàn khi ban hành kế hoạch, nội quy, quy trình ATVSLĐ.',
                    evidence: 'Văn bản lấy ý kiến; biên bản họp có chữ ký đại diện công đoàn.',
                  },
                  {
                    id: 'L 51',
                    level: 'C',
                    text: 'Đề xuất bằng văn bản yêu cầu thương lượng của một trong hai bên là công đoàn cơ sở hoặc người sử dụng lao động về nội dung yêu cầu thương lượng tập thể',
                    maxScore: 2,
                    hint: 'Tổ chức thương lượng tập thể khi một trong hai bên có yêu cầu bằng văn bản, phản hồi trong thời hạn quy định.',
                    evidence: 'Văn bản đề xuất thương lượng; biên bản các phiên thương lượng.',
                  },
                  {
                    id: 'L 52',
                    level: 'C',
                    text: 'Nội dung của thỏa ước lao động tập thể không trái với quy định của pháp luật và có lợi hơn cho người lao động',
                    maxScore: 2,
                    hint: 'Ký kết thỏa ước lao động tập thể có ít nhất một nội dung có lợi hơn cho người lao động so với luật, và gửi tới cơ quan quản lý lao động.',
                    evidence:
                      'Thỏa ước lao động tập thể đã ký; văn bản gửi cơ quan quản lý; bảng so sánh với quy định pháp luật.',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g8',
            title:
              'THỰC HIỆN QUY CHẾ DÂN CHỦ TẠI NƠI LÀM VIỆC, TRAO ĐỔI VÀ XỬ LÝ THÔNG TIN, GIẢI QUYẾT TRANH CHẤP LAO ĐỘNG',
            declaredMax: 7,
            blocks: [
              {
                id: 'ls-g8-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'L 53',
                    level: 'C',
                    text: 'Xây dựng và công khai quy chế dân chủ tại nơi làm việc',
                    maxScore: 2,
                    hint: 'Ban hành và niêm yết quy chế dân chủ ở cơ sở tại nơi làm việc, nêu rõ nội dung người lao động được biết, được bàn, được quyết định, được kiểm tra.',
                    evidence:
                      'Quy chế dân chủ đã ban hành; hình ảnh niêm yết; biên bản lấy ý kiến người lao động.',
                  },
                  {
                    id: 'L 54',
                    level: 'C',
                    text: 'Xây dựng và thực hiện cơ chế trao đổi, xử lý thông tin trong nội bộ doanh nghiệp',
                    maxScore: 2,
                    hint: 'Thiết lập kênh trao đổi thông tin nội bộ hai chiều (hòm thư góp ý, nhóm nội bộ, họp giao ban) và ghi nhận cách xử lý ý kiến.',
                    evidence:
                      'Quy định về trao đổi thông tin; sổ ghi nhận ý kiến và kết quả xử lý.',
                  },
                  {
                    id: 'L 55',
                    level: 'C',
                    text: 'Tổ chức đối thoại tại nơi làm việc định kỳ hoặc đột xuất',
                    maxScore: 1,
                    hint: 'Tổ chức đối thoại tại nơi làm việc ít nhất 1 năm/lần theo quy định, hoặc khi có vụ việc phát sinh.',
                    evidence: 'Biên bản đối thoại; danh sách tham dự; nội dung tiếp thu.',
                  },
                  {
                    id: 'L 56',
                    level: 'C',
                    text: 'Tổ chức hội nghị người lao động thường niên',
                    maxScore: 1,
                    hint: 'Tổ chức hội nghị người lao động hằng năm với sự tham gia của đại diện tập thể lao động.',
                    evidence: 'Kế hoạch và biên bản hội nghị người lao động; nghị quyết hội nghị.',
                  },
                  {
                    id: 'L 58',
                    level: 'C',
                    text: 'Giải quyết tranh chấp lao động theo đúng trình tự pháp luật quy định',
                    maxScore: 1,
                    hint: 'Giải quyết tranh chấp lao động theo đúng trình tự: thương lượng, hòa giải viên lao động, hội đồng trọng tài hoặc tòa án.',
                    evidence:
                      'Hồ sơ vụ việc; biên bản hòa giải; quyết định giải quyết. Nếu không phát sinh, chọn "Không xảy ra trong kỳ đánh giá".',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g9',
            title:
              'LAO ĐỘNG NỮ, LAO ĐỘNG ĐẶC THÙ, KHÔNG PHÂN BIỆT ĐỐI XỬ VÀ KHÔNG CƯỠNG BỨC LAO ĐỘNG',
            declaredMax: 5,
            blocks: [
              {
                id: 'ls-g9-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'L 60',
                    level: 'C',
                    text: 'Bảo đảm có đủ buồng tắm và buồng vệ sinh phù hợp tại nơi làm việc',
                    maxScore: 1,
                    hint: 'Kiểm tra số lượng và tình trạng buồng tắm, buồng vệ sinh, đảm bảo tách riêng nam - nữ và đủ theo số lao động.',
                    evidence:
                      'Sơ đồ mặt bằng; hình ảnh khu vệ sinh; biên bản kiểm tra điều kiện làm việc.',
                  },
                  {
                    id: 'L 62',
                    level: 'C',
                    text: 'Bảo đảm nguyên tắc sử dụng lao động chưa thành niên',
                    maxScore: 1,
                    hint: 'Nếu có sử dụng lao động chưa thành niên, phải có sự đồng ý của người đại diện, không bố trí công việc cấm, giới hạn thời giờ làm việc. Nếu không sử dụng, ghi rõ.',
                    evidence:
                      'Danh sách lao động chưa thành niên (nếu có); văn bản đồng ý của người đại diện; hồ sơ khám sức khỏe.',
                  },
                  {
                    id: 'L 63',
                    level: 'C',
                    text: 'Không cưỡng bức lao động dưới mọi hình thức',
                    maxScore: 1,
                    hint: 'Rà soát không giữ giấy tờ tùy thân, không yêu cầu đặt cọc, không ép buộc làm thêm giờ, cho phép chấm dứt hợp đồng theo quy định.',
                    evidence:
                      'Cam kết không cưỡng bức lao động trong nội quy; kết quả tự kiểm tra; biên bản đối thoại với người lao động.',
                  },
                  {
                    id: 'L 64',
                    level: 'C',
                    text: 'Không phân biệt đối xử trong quản lý, sử dụng, điều hành lao động',
                    maxScore: 1,
                    hint: 'Rà soát các quy định và thực tiễn tuyển dụng, trả lương, thăng tiến để loại bỏ mọi phân biệt đối xử về giới, dân tộc, tôn giáo, tình trạng hôn nhân.',
                    evidence:
                      'Nội quy lao động; quy trình tuyển dụng; sổ theo dõi khiếu nại về phân biệt đối xử.',
                  },
                  {
                    id: 'L 66',
                    level: 'A',
                    text: 'Đảm bảo nguyên tắc sử dụng lao động khuyết tật',
                    maxScore: 1,
                    hint: 'Nếu sử dụng lao động khuyết tật, đảm bảo điều kiện làm việc phù hợp, không làm công việc nặng nhọc độc hại, có tham khảo ý kiến trước khi quyết định vấn đề liên quan.',
                    evidence:
                      'Danh sách lao động khuyết tật; hồ sơ điều kiện làm việc phù hợp; biên bản lấy ý kiến.',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g10',
            title: 'QUAN HỆ VỚI KHÁCH HÀNG, CỘNG ĐỒNG, XÃ HỘI',
            declaredMax: 12,
            blocks: [
              {
                id: 'ls-g10-b1',
                title: '',
                declaredMax: 0,
                indicators: [
                  {
                    id: 'S 1',
                    level: 'C',
                    text: 'Tuân thủ các yêu cầu về tiếp thị và nhãn hiệu sản phẩm/dịch vụ, chống "tẩy xanh"',
                    maxScore: 4,
                    hint: 'Rà soát toàn bộ nội dung quảng cáo, nhãn mác, tuyên bố về môi trường. Mọi tuyên bố "xanh", "sinh thái", "thân thiện môi trường" phải có bằng chứng kiểm chứng được để tránh "tẩy xanh" (greenwashing).',
                    evidence:
                      'Mẫu nhãn sản phẩm; nội dung quảng cáo; chứng nhận/kết quả thử nghiệm làm cơ sở cho tuyên bố.',
                  },
                  {
                    id: 'S 2',
                    level: 'C',
                    text: 'Kiểm tra đánh giá chất lượng sản phẩm/dịch vụ nhằm đảm bảo an toàn, sức khỏe cho người tiêu dùng, đặc biệt là trẻ em',
                    maxScore: 4,
                    hint: 'Thiết lập quy trình kiểm tra chất lượng và an toàn sản phẩm trước khi đưa ra thị trường, đặc biệt với sản phẩm dành cho trẻ em.',
                    evidence:
                      'Quy trình kiểm soát chất lượng; kết quả thử nghiệm/chứng nhận hợp quy; hồ sơ thu hồi sản phẩm (nếu có).',
                  },
                  {
                    id: 'S 3',
                    level: 'C',
                    text: 'Thực hiện quyền bảo mật thông tin của khách hàng trong quá trình thu thập, lưu trữ, xử lý và sử dụng',
                    maxScore: 3,
                    hint: 'Ban hành chính sách bảo mật dữ liệu khách hàng phù hợp Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân; phân quyền truy cập và có cơ chế xử lý sự cố lộ lọt.',
                    evidence:
                      'Chính sách bảo mật dữ liệu; quy trình phân quyền; hồ sơ đánh giá tác động xử lý dữ liệu cá nhân.',
                  },
                  {
                    id: 'S 5',
                    level: 'A',
                    text: 'Tạo điều kiện để sinh viên thực tập, làm việc tại doanh nghiệp',
                    maxScore: 1,
                    hint: 'Ký kết hợp tác với trường đại học, cao đẳng, trường nghề để tiếp nhận sinh viên thực tập và có người hướng dẫn.',
                    evidence:
                      'Thỏa thuận hợp tác với cơ sở đào tạo; danh sách sinh viên thực tập; giấy xác nhận thực tập.',
                  },
                ],
              },
            ],
          },
        ],
        total: {
          label: 'TỔNG CỘNG',
          maxScore: 141,
        },
      },
    ],
    dashboard: {
      title: 'BẢNG ĐIỂM TỔNG HỢP VÀ MỨC ĐỘ SẴN SÀNG',
      subtitle: 'PHIÊN BẢN DÀNH CHO DOANH NGHIỆP NHỎ VÀ SIÊU NHỎ',
      note: 'Toàn bộ số liệu trên trang này được tính tự động từ các trang tự đánh giá. Không nhập tay vào đây.',
      partsTitle: 'MỨC ĐỘ SẴN SÀNG THEO TỪNG PHẦN CỦA BỘ CHỈ SỐ CSI 2026',
      partsHeaders: [
        'Phần của Bộ chỉ số CSI 2026',
        'Điểm tối đa CSI công bố',
        'Tổng điểm các chỉ số thành phần',
        'Điểm khả dụng (sau khi loại chỉ số không áp dụng)',
        'Điểm tự đánh giá',
        'Tỷ lệ sẵn sàng',
        'Điểm quy đổi thang CSI',
      ],
      partARows: [
        'Phần I - Thông tin doanh nghiệp',
        'Phần II - Cơ cấu, mô hình tổ chức và nhân sự chủ chốt',
      ],
      totalLabel: 'TỔNG CỘNG',
      partsNote:
        'Điểm thưởng của từng phần do Hội đồng đánh giá của Chương trình CSI xét, không đưa vào bảng tự đánh giá này. "Điểm quy đổi thang CSI" là điểm ước tính theo tỷ lệ sẵn sàng, chỉ dùng để theo dõi tiến bộ nội bộ.',
      complianceTitle: 'TÌNH TRẠNG TUÂN THỦ - CÁC CHỈ SỐ CƠ BẢN (C)',
      complianceHeaders: ['Chỉ tiêu theo dõi', 'Số lượng'],
      complianceRows: [
        'Tổng số chỉ số C (cơ bản, gắn với tuân thủ pháp luật)',
        'Số chỉ số C đã đạt',
        'Số chỉ số C CẦN XỬ LÝ NGAY (ưu tiên CAO)',
        'Số chỉ số C được đánh dấu không thuộc đối tượng áp dụng',
        'Tổng số chỉ số A (nâng cao)',
        'Số chỉ số A đã đạt',
        'Số chỉ số CHƯA ĐƯỢC ĐÁNH GIÁ',
      ],
      groupsTitle: 'MỨC ĐỘ SẴN SÀNG THEO TỪNG NHÓM CHỈ SỐ',
      groupsHeaders: ['Nhóm chỉ số', 'Phần', 'Điểm khả dụng', 'Điểm tự đánh giá', 'Tỷ lệ sẵn sàng'],
    },
    plan: {
      title: 'KẾ HOẠCH HÀNH ĐỘNG THEO MỨC ƯU TIÊN',
      notes: [
        'Dùng bộ lọc ở dòng tiêu đề: lọc cột "Mức ưu tiên" = CAO - Tuân thủ để xử lý trước',
        'Các cột từ "Trả lời hiện tại" đến "Hạn hoàn thành" tự động lấy từ các trang tự đánh giá. Chỉ nhập tay ở hai cột cuối.',
      ],
      headers: [
        'Mã chỉ số',
        'Cấp độ',
        'Phần',
        'Nhóm chỉ số',
        'Nội dung chỉ số',
        'Điểm tối đa',
        'Mức độ hiện tại',
        'Mức ưu tiên',
        'Điểm còn thiếu',
        'Việc cần làm',
        'Người phụ trách',
        'Hạn hoàn thành',
        'Trạng thái công việc',
        'Ghi chú tiến độ',
      ],
    },
  },
};
