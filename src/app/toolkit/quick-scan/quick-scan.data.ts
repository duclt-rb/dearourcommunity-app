import { QuickScanConfig } from './quick-scan.types';

/**
 * ESG Quick Scan — F&B / Service SMEs.
 * Source: EB_Module_A_ESG_QuickScan_DichVu_FnB_VI.xlsx (v1.0 · 2026)
 */
const FNB: QuickScanConfig = {
  id: 'esg-quick-scan-fnb',
  name: 'Đánh giá nhanh ESG — Dịch vụ F&B',
  sector: 'Doanh nghiệp SME ngành Dịch vụ F&B',
  profileFields: [
    { label: 'Tên doanh nghiệp' },
    {
      label: 'Loại hình F&B',
      hint: 'VD: Nhà hàng, Quán cà phê, Chuỗi đồ ăn nhanh, Quán ăn, Bar/Bistro',
    },
    { label: 'Số lượng nhân viên' },
    { label: 'Số điểm bán / cơ sở' },
    { label: 'Số năm hoạt động' },
    { label: 'Người thực hiện đánh giá' },
    { label: 'Vị trí / Bộ phận' },
    { label: 'Ngày đánh giá', type: 'date' },
    { label: 'Đã từng tham gia đào tạo ESG chưa?', type: 'boolean' },
    {
      label: 'Mối quan tâm ESG chính',
      hint: 'VD: Rác thải, Năng lượng, Biến động nhân sự, Tuân thủ',
    },
  ],
  pillars: [
    {
      key: 'environment',
      label: 'Môi trường',
      title: 'Môi trường — SME Dịch vụ F&B',
      maxScore: 28,
      groups: [
        {
          topic: 'Phát sinh & Xử lý rác thải',
          priority: true,
          questions: [
            {
              id: 'env-1',
              text: 'Bạn có phân loại rác theo loại (rác thực phẩm, tái chế, rác thường) tại mỗi điểm bán không?',
              risk: 'Bị phạt khi thanh tra; chi phí xử lý tăng; ảnh hưởng hình ảnh nếu khách thấy rác',
            },
            {
              id: 'env-2',
              text: 'Bạn có theo dõi lượng rác thực phẩm phát sinh mỗi tuần không?',
              risk: 'Rò rỉ chi phí ẩn; không thể giảm rác nếu không đo lường',
            },
            {
              id: 'env-3',
              text: 'Bạn có hợp tác với đơn vị thu gom / tái chế có giấy phép không?',
              risk: 'Không tuân thủ pháp luật; có thể bị xử phạt môi trường; hình ảnh thương hiệu tiêu cực',
            },
            {
              id: 'env-4',
              text: 'Bạn có đào tạo nhân viên tuyến đầu về phân loại & xử lý rác đúng cách không?',
              risk: 'Thực hiện không đồng bộ làm nhiễm bẩn dòng rác và không đạt khi kiểm tra',
            },
            {
              id: 'env-5',
              text: 'Trong 12 tháng qua bạn có giảm nhựa dùng một lần hoặc bao bì không?',
              risk: 'Kỳ vọng khách hàng và quy định đang tăng; bất lợi cạnh tranh nếu chậm chân',
            },
          ],
        },
        {
          topic: 'Tiêu thụ & Hiệu quả năng lượng',
          priority: true,
          questions: [
            {
              id: 'env-6',
              text: 'Bạn có theo dõi hóa đơn điện hằng tháng theo từng điểm bán và so sánh giữa các tháng không?',
              risk: 'Không nhìn thấy = không kiểm soát; năng lượng thường chiếm 15–25% chi phí vận hành F&B',
            },
            {
              id: 'env-7',
              text: 'Nhân viên vận hành thiết bị (bếp, thiết bị lạnh, điều hòa) có tuân thủ quy tắc tắt máy / tiết kiệm năng lượng không?',
              risk: 'Lãng phí tiện ích; có thể tiết kiệm 10–20% năng lượng nhờ thói quen cơ bản; rủi ro an toàn điện',
            },
            {
              id: 'env-8',
              text: 'Trong 2 năm qua bạn có chuyển sang đèn LED hoặc thiết bị tiết kiệm năng lượng không?',
              risk: 'Chi phí vận hành dài hạn cao hơn; bỏ lỡ khoản tiết kiệm tích lũy theo thời gian',
            },
            {
              id: 'env-9',
              text: 'Có người chịu trách nhiệm theo dõi & báo cáo về tiêu thụ năng lượng không?',
              risk: 'Không có trách nhiệm thì không có cải thiện; vấn đề năng lượng kéo dài',
            },
          ],
        },
        {
          topic: 'Sử dụng & Quản lý nước',
          questions: [
            {
              id: 'env-10',
              text: 'Bạn có theo dõi lượng nước tiêu thụ hằng tháng và so sánh với kỳ trước không?',
              risk: 'Rò rỉ và lạm dụng không bị phát hiện; hóa đơn nước không giải thích hay giảm được',
            },
            {
              id: 'env-11',
              text: 'Nhân viên bếp có tuân thủ quy trình tiết kiệm nước (rửa chén, sơ chế) không?',
              risk: 'Tiêu thụ nước lãng phí đáng kể; vượt chi phí, nhất là cơ sở quy mô lớn',
            },
            {
              id: 'env-12',
              text: 'Bạn có quy trình phát hiện & sửa rò rỉ nhanh chóng không?',
              risk: 'Một điểm rò rỉ không phát hiện có thể lãng phí hàng nghìn lít mỗi tháng',
            },
          ],
        },
        {
          topic: 'Nhận thức về khí thải',
          questions: [
            {
              id: 'env-13',
              text: 'Bạn có nhận biết các nguồn phát thải liên quan đến loại hình của mình (bếp gas, môi chất lạnh, vận chuyển) không?',
              risk: 'Điểm mù cho quy định sắp tới và yêu cầu công bố từ khách hàng / đối tác',
            },
            {
              id: 'env-14',
              text: 'Bạn đã cân nhắc hành động giảm phát thải (đổi nhiên liệu, tối ưu tuyến giao hàng) chưa?',
              risk: 'Bỏ lỡ lợi thế tiên phong; chi phí tuân thủ cao hơn nếu để quá muộn',
            },
          ],
        },
      ],
    },
    {
      key: 'social',
      label: 'Xã hội',
      title: 'Xã hội — SME Dịch vụ F&B',
      maxScore: 30,
      groups: [
        {
          topic: 'Mua hàng có trách nhiệm & Kiểm soát chất lượng',
          priority: true,
          questions: [
            {
              id: 'soc-1',
              text: 'Bạn có danh sách nhà cung cấp ưu tiên / được phê duyệt với tiêu chí đánh giá cơ bản không?',
              risk: 'Chất lượng nguyên liệu không ổn định; sự cố an toàn thực phẩm; gián đoạn nguồn cung',
            },
            {
              id: 'soc-2',
              text: 'Bạn có kiểm tra vệ sinh, độ tươi & chất lượng của nhà cung cấp trước khi nhận hàng không?',
              risk: 'Khách bị ngộ độc, khiếu nại, hoặc vi phạm ATTP; có thể phải đóng cửa',
            },
            {
              id: 'soc-3',
              text: 'Bạn có hợp đồng hoặc thỏa thuận tối thiểu bằng văn bản với nhà cung cấp chính không?',
              risk: 'Không có bảo vệ pháp lý khi NCC thất bại; không có cơ sở đòi bồi thường về chất lượng',
            },
            {
              id: 'soc-4',
              text: 'Bạn có đánh giá nhà cung cấp định kỳ (VD hằng năm) dựa trên chất lượng & độ tin cậy không?',
              risk: 'Bị ràng buộc với NCC yếu kém; không cải thiện chuỗi cung ứng một cách hệ thống',
            },
          ],
        },
        {
          topic: 'Quản lý vận hành hiệu quả',
          priority: true,
          questions: [
            {
              id: 'soc-5',
              text: 'Các quy trình chính (sơ chế, phục vụ, vệ sinh khu vực) có được ghi lại dưới dạng hướng dẫn — dù đơn giản — không?',
              risk: 'Chất lượng dịch vụ không ổn định; chi phí đào tạo lại cao; lỗi khi thay nhân sự',
            },
            {
              id: 'soc-6',
              text: 'Nhân viên có mô tả vai trò rõ ràng và biết ai phụ trách việc gì không?',
              risk: 'Nhầm lẫn, trùng lặp và lỗ hổng trong phục vụ; trách nhiệm không rõ ràng',
            },
            {
              id: 'soc-7',
              text: 'Bạn có cách phát hiện khi lỗi, chậm trễ hoặc làm lại xảy ra thường xuyên không?',
              risk: 'Chi phí phòng tránh được âm thầm tích lũy; nhân viên bức xúc và nghỉ việc',
            },
            {
              id: 'soc-8',
              text: 'Quản lý có tổ chức họp / giao ca định kỳ (hằng ngày/tuần) không?',
              risk: 'Đội ngũ ít nắm thông tin; vấn đề phát hiện trễ; dịch vụ thiếu nhất quán giữa các ca',
            },
          ],
        },
        {
          topic: 'Thực hành lao động & Tuân thủ',
          priority: true,
          questions: [
            {
              id: 'soc-9',
              text: 'Tất cả nhân viên có hợp đồng lao động bằng văn bản tuân thủ Bộ luật Lao động VN không?',
              risk: 'Rủi ro tranh chấp lao động; bị phạt khi thanh tra; ảnh hưởng uy tín',
            },
            {
              id: 'soc-10',
              text: 'Giờ làm, làm thêm & ngày nghỉ phép có được ghi nhận và lưu hồ sơ không?',
              risk: 'Tranh chấp về lương và nghỉ phép; bị phạt theo luật; bức xúc và nghỉ việc',
            },
            {
              id: 'soc-11',
              text: 'Bạn có quy trình ATVSLĐ cơ bản về nguy cơ trong bếp, trơn trượt, hoặc PCCC không?',
              risk: 'Tai nạn lao động; trách nhiệm pháp lý; nguy cơ thương tích cho nhân viên và khách',
            },
            {
              id: 'soc-12',
              text: 'Có quy trình rõ ràng và dễ tiếp cận để nhân viên phản ánh / khiếu nại nội bộ không?',
              risk: 'Bức xúc không được giải quyết sẽ leo thang; khiếu nại bên ngoài; rủi ro mạng xã hội',
            },
            {
              id: 'soc-13',
              text: 'Bạn có tổ chức định hướng / đào tạo nhập môn cơ bản về an toàn & ứng xử cho nhân viên mới không?',
              risk: 'Nhân viên mới chưa nắm rủi ro; dễ xảy ra tai nạn hoặc sai phạm giai đoạn đầu',
            },
          ],
        },
        {
          topic: 'Đa dạng & Hòa nhập',
          questions: [
            {
              id: 'soc-14',
              text: 'Quyết định tuyển dụng có dựa trên năng lực & sự phù hợp thay vì đặc điểm cá nhân không liên quan không?',
              risk: 'Rủi ro phân biệt đối xử theo luật; hạn chế nguồn nhân tài; tổn hại uy tín',
            },
            {
              id: 'soc-15',
              text: 'Mọi nhân viên — bất kể tuổi, giới tính, xuất thân — có được tiếp cận đào tạo & thăng tiến bình đẳng không?',
              risk: 'Tỷ lệ nghỉ việc cao ở nhóm yếu thế; bỏ lỡ cơ hội phát triển nhân tài',
            },
          ],
        },
      ],
    },
    {
      key: 'governance',
      label: 'Quản trị',
      title: 'Quản trị — SME Dịch vụ F&B',
      maxScore: 20,
      groups: [
        {
          topic: 'Tuân thủ về dữ liệu',
          priority: true,
          questions: [
            {
              id: 'gov-1',
              text: 'Bạn có thu thập dữ liệu khách hàng (tên, liên hệ, thông tin thanh toán) không? Nếu có, có được lưu trữ an toàn không?',
              risk: 'Rủi ro rò rỉ dữ liệu; vi phạm quy định bảo vệ dữ liệu của VN (Nghị định 13/2023); mất niềm tin khách hàng',
            },
            {
              id: 'gov-2',
              text: 'Bạn có chính sách bảo mật cơ bản được truyền đạt tới khách hàng không?',
              risk: 'Không tuân thủ pháp luật; bị phạt; tổn hại thương hiệu nếu xảy ra rò rỉ',
            },
            {
              id: 'gov-3',
              text: 'Quyền truy cập dữ liệu nhạy cảm của DN / khách hàng có được giới hạn cho nhân viên liên quan không?',
              risk: 'Lạm dụng dữ liệu nội bộ; khó truy vết khi rò rỉ; lộ dữ liệu khách hàng',
            },
          ],
        },
        {
          topic: 'Quản lý rủi ro pháp lý & Tuân thủ',
          priority: true,
          questions: [
            {
              id: 'gov-4',
              text: 'Doanh nghiệp có đầy đủ giấy phép hoạt động (ATTP, PCCC, ĐKKD) còn hiệu lực không?',
              risk: 'Rủi ro bị đóng cửa đột ngột; bị phạt; mất khả năng hoạt động',
            },
            {
              id: 'gov-5',
              text: 'Có người chịu trách nhiệm theo dõi thời hạn giấy phép, chứng nhận, kỳ kiểm tra không?',
              risk: 'Hết hạn tuân thủ chỉ bị phát hiện khi thanh tra; bị động thay vì chủ động',
            },
            {
              id: 'gov-6',
              text: 'Bạn có thực hiện kiểm tra tuân thủ nội bộ cơ bản ít nhất mỗi năm một lần không?',
              risk: 'Khoảng trống tuân thủ tích lũy âm thầm; mức phạt leo thang khi bị phát hiện',
            },
          ],
        },
        {
          topic: 'Gắn kết khách hàng & các bên liên quan',
          questions: [
            {
              id: 'gov-7',
              text: 'Bạn có cách chuẩn để thu thập & phản hồi ý kiến / khiếu nại của khách hàng không?',
              risk: 'Khiếu nại không được xử lý; đánh giá tiêu cực dồn lại; mất khách hàng',
            },
            {
              id: 'gov-8',
              text: 'Bạn có truyền thông về cải tiến ESG hoặc chất lượng tới khách hàng (dù không chính thức) không?',
              risk: 'Bỏ lỡ cơ hội xây dựng niềm tin và lòng trung thành với thương hiệu',
            },
          ],
        },
        {
          topic: 'Phòng chống tham nhũng & Đạo đức',
          questions: [
            {
              id: 'gov-9',
              text: 'Nhân viên có hiểu thế nào là xung đột lợi ích hoặc quà tặng / chi trả không phù hợp không?',
              risk: 'Gian lận mua hàng; chi phí bị đẩy cao; rủi ro pháp lý cho chủ doanh nghiệp',
            },
            {
              id: 'gov-10',
              text: 'Bạn có truyền đạt kỳ vọng ứng xử cơ bản bằng văn bản tới nhân viên không?',
              risk: 'Hành vi sai phạm không bị kiểm soát; khó xử lý sự cố nhân sự khi thiếu chuẩn mực',
            },
          ],
        },
      ],
    },
  ],
  priorityFocus: [
    {
      area: 'Phát sinh & Xử lý rác thải',
      pillar: 'Môi trường',
      benefit: 'Giảm chi phí xử lý rác & tránh bị phạt khi thanh tra',
    },
    {
      area: 'Tiêu thụ & Hiệu quả năng lượng',
      pillar: 'Môi trường',
      benefit: 'Giảm hóa đơn tiện ích — thường tiết kiệm được 10–20%',
    },
    {
      area: 'Mua hàng có trách nhiệm & Kiểm soát chất lượng',
      pillar: 'Xã hội',
      benefit: 'Ngăn sự cố an toàn thực phẩm & gián đoạn nguồn cung',
    },
    {
      area: 'Quản lý vận hành hiệu quả',
      pillar: 'Xã hội',
      benefit: 'Giảm lỗi & làm lại; nâng cao tính nhất quán của dịch vụ',
    },
    {
      area: 'Thực hành lao động & Tuân thủ',
      pillar: 'Xã hội',
      benefit: 'Tránh tranh chấp lao động & bị phạt khi thanh tra',
    },
    {
      area: 'Tuân thủ về dữ liệu',
      pillar: 'Quản trị',
      benefit: 'Bảo mật dữ liệu khách hàng & tuân thủ quy định của VN',
    },
    {
      area: 'Quản lý rủi ro pháp lý',
      pillar: 'Quản trị',
      benefit: 'Đảm bảo mọi giấy phép luôn còn hiệu lực & được theo dõi',
    },
  ],
};

/**
 * ESG Quick Scan — Manufacturing SMEs (Sản xuất).
 * Source: EB_Module_A_ESG_QuickScan_San_Xuat_VI.xlsx (v1.0, 2026)
 */
const SUPPLY: QuickScanConfig = {
  id: 'esg-quick-scan-supply-chain',
  name: 'Đánh giá nhanh ESG — Sản xuất',
  sector: 'Doanh nghiệp SME ngành Sản xuất',
  profileFields: [
    { label: 'Tên doanh nghiệp' },
    {
      label: 'Loại hình sản xuất',
      hint: 'VD: Gia công/OEM, Sản xuất thương hiệu riêng (OBM), Hỗn hợp',
    },
    {
      label: 'Ngành sản xuất / Nhóm sản phẩm',
      hint: 'VD: Chế biến thực phẩm, Dệt may, Điện tử, Cơ khí, Nhựa',
    },
    { label: 'Số lượng nhân viên' },
    { label: 'Số nhà máy / xưởng sản xuất' },
    { label: 'Số năm hoạt động' },
    { label: 'Có xuất khẩu / cung ứng cho DN xuất khẩu?', hint: 'Có / Không / Đang lên kế hoạch' },
    { label: 'Số nhà cung cấp đang hợp tác (ước tính)' },
    { label: 'Người thực hiện đánh giá' },
    { label: 'Vị trí / Bộ phận' },
    { label: 'Ngày đánh giá', type: 'date' },
    {
      label: 'Mối quan tâm ESG chính',
      hint: 'VD: Rác thải, Năng lượng, Tuân thủ lao động, Chất lượng NCC',
    },
  ],
  pillars: [
    {
      key: 'environment',
      label: 'Môi trường',
      title: 'Môi trường — SME Sản xuất',
      maxScore: 28,
      groups: [
        {
          topic: 'Rác thải sản xuất & Xử lý',
          priority: true,
          questions: [
            {
              id: 'env-1',
              text: 'Bạn có phân loại và phân nhóm chất thải phát sinh trong sản xuất (phế liệu, bao bì, chất thải nguy hại) không?',
              risk: 'Bị phạt khi thanh tra môi trường; chi phí xử lý không kiểm soát; rủi ro uy tín',
            },
            {
              id: 'env-2',
              text: 'Bạn có theo dõi khối lượng chất thải phát sinh theo tháng hoặc theo mỗi đợt sản xuất không?',
              risk: 'Không nhận diện được cơ hội giảm thải; rò rỉ chi phí ẩn',
            },
            {
              id: 'env-3',
              text: 'Bạn có sử dụng đơn vị thu gom/xử lý chất thải có giấy phép cho chất thải không phải rác sinh hoạt không?',
              risk: 'Trách nhiệm pháp lý khi xử lý sai quy định; nguy cơ bị đình chỉ hoạt động',
            },
            {
              id: 'env-4',
              text: 'Bạn đã xác định 3 nguồn phát sinh chất thải lớn nhất và có biện pháp giảm thiểu chưa?',
              risk: 'Chi phí chất thải luôn ở mức cao; tổn thất nguyên vật liệu tích lũy theo thời gian',
            },
            {
              id: 'env-5',
              text: 'Nhân viên sản xuất / kho có được đào tạo về quy trình xử lý chất thải không?',
              risk: 'Phân loại không đồng bộ dẫn đến vi phạm và làm nhiễm bẩn dòng tái chế',
            },
          ],
        },
        {
          topic: 'Tiêu thụ & Hiệu quả năng lượng',
          priority: true,
          questions: [
            {
              id: 'env-6',
              text: 'Bạn có theo dõi mức tiêu thụ điện và nhiên liệu hằng tháng tại (các) nhà máy không?',
              risk: 'Năng lượng thường chiếm 10–30% chi phí sản xuất; không có dữ liệu = không kiểm soát',
            },
            {
              id: 'env-7',
              text: 'Máy móc, thiết bị có được tắt khi không sử dụng, và được thực thi một cách hệ thống không?',
              risk: 'Lãng phí năng lượng; giảm tuổi thọ thiết bị; bỏ lỡ cơ hội tiết kiệm chi phí',
            },
            {
              id: 'env-8',
              text: 'Trong 3 năm qua bạn có rà soát / nâng cấp hiệu quả năng lượng (đèn LED, động cơ hiệu suất cao) không?',
              risk: 'Vận hành với chi phí cao hơn đối thủ đã nâng cấp; bỏ lỡ các ưu đãi hỗ trợ',
            },
            {
              id: 'env-9',
              text: 'Có người được phân công theo dõi mức tiêu thụ và chi phí năng lượng không?',
              risk: 'Không có trách nhiệm rõ ràng; vấn đề năng lượng âm thầm leo thang',
            },
          ],
        },
        {
          topic: 'Sử dụng & Quản lý nước',
          questions: [
            {
              id: 'env-10',
              text: 'Bạn có theo dõi lượng nước tiêu thụ và chi phí hằng tháng không?',
              risk: 'Rò rỉ không phát hiện; không phát hiện được mức tiêu thụ vượt mức; chi phí tăng đột biến',
            },
            {
              id: 'env-11',
              text: 'Quy trình sản xuất / vệ sinh có áp dụng biện pháp tiết kiệm nước (tuần hoàn, tái sử dụng) không?',
              risk: 'Hóa đơn nước cao; rủi ro tuân thủ ở vùng khan hiếm nước; bị khách mua đánh giá lạm dụng',
            },
            {
              id: 'env-12',
              text: 'Bạn có nắm các quy định về sử dụng nước áp dụng cho ngành của mình không?',
              risk: 'Vô tình không tuân thủ; bị phạt và rủi ro về giấy phép',
            },
          ],
        },
        {
          topic: 'Khí thải & Ô nhiễm',
          questions: [
            {
              id: 'env-13',
              text: 'Bạn có nhận biết các nguồn phát thải trong vận hành (máy phát điện, môi chất lạnh, phương tiện) không?',
              risk: 'Áp lực quy định ngày càng tăng; yêu cầu công bố trong tương lai từ khách mua và cơ quan nhà nước',
            },
            {
              id: 'env-14',
              text: 'Bạn có biện pháp kiểm soát ô nhiễm cơ bản (xử lý nước thải, kiểm soát bụi, giới hạn tiếng ồn) không?',
              risk: 'Khiếu nại từ dân cư; thanh tra môi trường; bị phạt hoặc đình chỉ hoạt động',
            },
          ],
        },
      ],
    },
    {
      key: 'social',
      label: 'Xã hội',
      title: 'Xã hội — SME Sản xuất',
      maxScore: 34,
      groups: [
        {
          topic: 'Mua hàng có trách nhiệm & Kiểm soát chất lượng',
          priority: true,
          questions: [
            {
              id: 'soc-1',
              text: 'Bạn có danh sách nhà cung cấp được phê duyệt với tiêu chí tối thiểu không?',
              risk: 'Đầu vào kém chất lượng gây lỗi sản xuất, hàng bị trả lại và thu hồi',
            },
            {
              id: 'soc-2',
              text: 'Bạn có kiểm tra chất lượng nguyên vật liệu / hàng hóa đầu vào trước khi nhập kho không?',
              risk: 'Đầu vào lỗi lọt vào sản xuất mà không bị phát hiện; tăng chi phí trả hàng và làm lại',
            },
            {
              id: 'soc-3',
              text: 'Bạn có hợp đồng bằng văn bản với nhà cung cấp chính về chất lượng và chế tài không?',
              risk: 'Không có cơ sở pháp lý khi NCC thất bại; không quy được trách nhiệm về chất lượng',
            },
            {
              id: 'soc-4',
              text: 'Bạn có đánh giá hiệu quả nhà cung cấp ít nhất mỗi năm một lần không?',
              risk: 'NCC yếu kém vẫn được giữ lại mặc định; không cải thiện chuỗi cung ứng một cách hệ thống',
            },
            {
              id: 'soc-5',
              text: 'Bạn có cân nhắc yêu cầu ESG cơ bản khi chọn NCC (đăng ký pháp lý, tuân thủ lao động cơ bản) không?',
              risk: 'Rủi ro uy tín nếu thực hành của NCC bị phơi bày; rủi ro kiểm toán từ khách mua trong tương lai',
            },
          ],
        },
        {
          topic: 'Quản lý sản xuất hiệu quả',
          priority: true,
          questions: [
            {
              id: 'soc-6',
              text: 'Các quy trình sản xuất / kho chính có được lập thành quy trình thao tác chuẩn (SOP) không?',
              risk: 'Chất lượng không ổn định; chi phí làm lại; chi phí đào tạo lại cao khi nhân viên nghỉ',
            },
            {
              id: 'soc-7',
              text: 'Người lao động có vai trò & trách nhiệm rõ ràng cho từng công đoạn không?',
              risk: 'Lỗi và lỗ hổng trách nhiệm; nhầm lẫn dẫn đến sản phẩm lỗi và tai nạn',
            },
            {
              id: 'soc-8',
              text: 'Quản lý có theo dõi chỉ số năng suất (sản lượng/ca, tỷ lệ lỗi, thời gian dừng máy) thường xuyên không?',
              risk: 'Tổn thất năng suất không bị phát hiện; không xác định được điểm nghẽn hay lãng phí',
            },
            {
              id: 'soc-9',
              text: 'Có quy trình hệ thống để phát hiện và xử lý điểm nghẽn vận hành không?',
              risk: 'Vấn đề tái diễn kéo dài; nhân viên bức xúc; sản lượng không ổn định',
            },
          ],
        },
        {
          topic: 'Thực hành lao động & Tuân thủ',
          priority: true,
          questions: [
            {
              id: 'soc-10',
              text: 'Tất cả người lao động có hợp đồng lao động bằng văn bản tuân thủ Bộ luật Lao động VN không?',
              risk: 'Bị phạt khi thanh tra lao động; tranh chấp về lương/chấm dứt HĐ; tổn hại uy tín',
            },
            {
              id: 'soc-11',
              text: 'Giờ làm việc, làm thêm và ngày nghỉ có được ghi nhận và trong giới hạn luật định không?',
              risk: 'Tranh chấp về lương làm thêm; rủi ro bị kết luận vi phạm lao động khi kiểm toán',
            },
            {
              id: 'soc-12',
              text: 'Bạn có và thực thi quy trình an toàn vệ sinh lao động (ATVSLĐ) phù hợp với sản xuất không?',
              risk: 'Tai nạn lao động; trách nhiệm bồi thường; rủi ro đình chỉ sau sự cố',
            },
            {
              id: 'soc-13',
              text: 'Có quy trình chính thức để người lao động phản ánh / khiếu nại mà không sợ bị trù dập không?',
              risk: 'Bức xúc không được giải tỏa sẽ leo thang; nguy cơ phản ứng tập thể hoặc khiếu nại bên ngoài',
            },
            {
              id: 'soc-14',
              text: 'Bạn có tổ chức huấn luyện an toàn cho người lao động mới trước khi vào việc không?',
              risk: 'Lao động mới là nhóm rủi ro tai nạn cao nhất; trách nhiệm pháp lý khi không có hồ sơ huấn luyện',
            },
            {
              id: 'soc-15',
              text: 'BHXH, BHYT và bảo hiểm thất nghiệp có được đóng đầy đủ cho tất cả người lao động không?',
              risk: 'Bị phạt theo luật; khiếu nại của người lao động; bị phát hiện khi thanh tra lao động',
            },
          ],
        },
        {
          topic: 'Đa dạng & Hòa nhập',
          questions: [
            {
              id: 'soc-16',
              text: 'Quyết định tuyển dụng và thăng tiến có dựa trên năng lực thay vì đặc điểm cá nhân không?',
              risk: 'Rủi ro phân biệt đối xử theo luật; hạn chế tiếp cận nhân tài; tổn hại uy tín nếu bị phơi bày',
            },
            {
              id: 'soc-17',
              text: 'Lao động nữ và lao động nhập cư có được tiếp cận đào tạo & thăng tiến bình đẳng không?',
              risk: 'Tỷ lệ nghỉ việc cao ở các nhóm này; rủi ro không tuân thủ; ảnh hưởng quan hệ cộng đồng',
            },
          ],
        },
      ],
    },
    {
      key: 'governance',
      label: 'Quản trị',
      title: 'Quản trị — SME Sản xuất',
      maxScore: 22,
      groups: [
        {
          topic: 'Tuân thủ về dữ liệu',
          priority: true,
          questions: [
            {
              id: 'gov-1',
              text: 'Bạn có thu thập & lưu trữ dữ liệu khách hàng, NCC hoặc nhân viên không? Nếu có, quyền truy cập có được giới hạn & bảo mật không?',
              risk: 'Rò rỉ dữ liệu; vi phạm Nghị định 13/2023 về bảo vệ dữ liệu cá nhân; trách nhiệm dân sự và hành chính',
            },
            {
              id: 'gov-2',
              text: 'Bạn có quy trình sao lưu & phục hồi dữ liệu cơ bản không?',
              risk: 'Mất vĩnh viễn hồ sơ kinh doanh do mã độc, hỏng phần cứng hoặc hỏa hoạn',
            },
            {
              id: 'gov-3',
              text: 'Nhân viên có được đào tạo về bảo mật dữ liệu cơ bản (quản lý mật khẩu, không chia sẻ tài khoản) không?',
              risk: 'Rò rỉ nội bộ; gian lận; mất bí mật kinh doanh',
            },
          ],
        },
        {
          topic: 'Quản lý rủi ro pháp lý & Tuân thủ',
          priority: true,
          questions: [
            {
              id: 'gov-4',
              text: 'Tất cả giấy phép hoạt động (ĐKKD, giấy phép môi trường, PCCC) có còn hiệu lực không?',
              risk: 'Rủi ro bị đình chỉ; bị phạt; không đủ điều kiện hoạt động hợp pháp',
            },
            {
              id: 'gov-5',
              text: 'Bạn có cách theo dõi thời hạn của giấy phép, chứng nhận, hồ sơ pháp lý không?',
              risk: 'Hết hạn chỉ bị phát hiện khi thanh tra; tuân thủ bị động tốn kém hơn chủ động',
            },
            {
              id: 'gov-6',
              text: 'Bạn có thực hiện rà soát tuân thủ nội bộ ít nhất mỗi năm một lần không?',
              risk: 'Khoảng trống tuân thủ tích lũy; mức phạt leo thang khi bị phát hiện',
            },
            {
              id: 'gov-7',
              text: 'Bạn có nắm các quy định ESG có khả năng ảnh hưởng đến ngành mình trong 2–3 năm tới không?',
              risk: 'Không chuẩn bị cho yêu cầu sắp tới; thay đổi bị động tốn kém và gây gián đoạn hơn',
            },
          ],
        },
        {
          topic: 'Gắn kết khách hàng & các bên liên quan',
          questions: [
            {
              id: 'gov-8',
              text: 'Bạn có quy trình chuẩn để tiếp nhận, phản hồi & theo dõi khiếu nại của khách hàng không?',
              risk: 'Khiếu nại lặp lại không được xử lý; mất khách hàng; truyền miệng tiêu cực',
            },
            {
              id: 'gov-9',
              text: 'Bạn có truyền thông về chất lượng, an toàn sản phẩm hoặc nỗ lực cải tiến tới khách hàng / khách mua không?',
              risk: 'Bỏ lỡ cơ hội xây dựng niềm tin với khách mua và giảm tần suất kiểm toán',
            },
          ],
        },
        {
          topic: 'Phòng chống tham nhũng & Đạo đức',
          questions: [
            {
              id: 'gov-10',
              text: 'Nhân viên mua hàng có hiểu thế nào là xung đột lợi ích, quà tặng không phù hợp, chi phí bôi trơn không?',
              risk: 'Gian lận mua hàng; chi phí đầu vào bị đẩy cao; rủi ro pháp lý cho doanh nghiệp',
            },
            {
              id: 'gov-11',
              text: 'Bạn có bộ quy tắc ứng xử cơ bản được truyền đạt tới toàn thể nhân viên không?',
              risk: 'Hành vi sai phạm không bị kiểm soát; khó xử lý kỷ luật khi thiếu chuẩn mực bằng văn bản',
            },
          ],
        },
      ],
    },
  ],
  priorityFocus: [
    {
      area: 'Rác thải sản xuất & Xử lý',
      pillar: 'Môi trường',
      benefit: 'Giảm chi phí xử lý và tránh bị phạt từ cơ quan môi trường',
    },
    {
      area: 'Tiêu thụ & Hiệu quả năng lượng',
      pillar: 'Môi trường',
      benefit: 'Cắt giảm hóa đơn năng lượng — thường 10–30% chi phí sản xuất',
    },
    {
      area: 'Mua hàng có trách nhiệm & Kiểm soát chất lượng',
      pillar: 'Xã hội',
      benefit: 'Ngăn đầu vào lỗi; tránh rủi ro NCC thất bại và thu hồi sản phẩm',
    },
    {
      area: 'Quản lý sản xuất hiệu quả',
      pillar: 'Xã hội',
      benefit: 'Giảm làm lại & thời gian dừng máy; chuẩn hóa quy trình toàn nhà máy',
    },
    {
      area: 'Thực hành lao động & Tuân thủ',
      pillar: 'Xã hội',
      benefit: 'Tránh bị phạt thanh tra lao động & tranh chấp; ổn định lực lượng lao động',
    },
    {
      area: 'Tuân thủ về dữ liệu',
      pillar: 'Quản trị',
      benefit: 'Bảo vệ dữ liệu DN & nhân viên; tuân thủ Nghị định 13/2023',
    },
    {
      area: 'Quản lý rủi ro pháp lý',
      pillar: 'Quản trị',
      benefit: 'Đảm bảo mọi giấy phép luôn còn hiệu lực và được theo dõi',
    },
  ],
};

export const QUICK_SCANS: Record<string, QuickScanConfig> = {
  [FNB.id]: FNB,
  [SUPPLY.id]: SUPPLY,
};

export function getQuickScan(id: string | null): QuickScanConfig | undefined {
  return id ? QUICK_SCANS[id] : undefined;
}
