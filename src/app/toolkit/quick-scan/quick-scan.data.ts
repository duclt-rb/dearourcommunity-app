import { QuickScanConfig } from './quick-scan.types';

/**
 * ESG Quick Scan — F&B / Service SMEs.
 * Source: EB_Module A_ESG Quick Scan_F&B.xlsx
 */
const FNB: QuickScanConfig = {
  id: 'esg-quick-scan-fnb',
  name: 'Đánh giá nhanh ESG — F&B',
  sector: 'Doanh nghiệp SME ngành Dịch vụ & F&B',
  profileFields: [
    { label: 'Tên doanh nghiệp' },
    { label: 'Loại hình', hint: 'VD: Nhà hàng, Khách sạn, Café, Catering, Resort' },
    { label: 'Số nhân viên' },
    { label: 'Số chi nhánh / địa điểm' },
    { label: 'Số năm hoạt động' },
    { label: 'Người thực hiện đánh giá' },
    { label: 'Vai trò / Phòng ban' },
    { label: 'Ngày đánh giá', type: 'date' },
    { label: 'Đã từng đào tạo ESG chưa?', type: 'boolean' },
    { label: 'Mối quan tâm ESG chính', hint: 'VD: Rác thải, Năng lượng, Nghỉ việc, Tuân thủ' },
  ],
  pillars: [
    {
      key: 'environment',
      label: 'Môi trường',
      title: 'Môi trường — SME Dịch vụ & F&B',
      maxScore: 28,
      groups: [
        {
          topic: 'Phát sinh & xử lý chất thải',
          priority: true,
          questions: [
            {
              id: 'env-1',
              text: 'Doanh nghiệp có phân loại rác theo loại (rác thực phẩm, rác tái chế, rác thường) tại mỗi cơ sở không?',
              risk: 'Bị phạt khi cơ quan quản lý chất thải kiểm tra; chi phí xử lý tăng vọt; ảnh hưởng hình ảnh nếu khách hàng nhìn thấy rác',
            },
            {
              id: 'env-2',
              text: 'Bạn có theo dõi lượng rác thực phẩm doanh nghiệp tạo ra mỗi tuần không?',
              risk: 'Thất thoát chi phí ngầm; không thể giảm rác nếu không đo lường',
            },
            {
              id: 'env-3',
              text: 'Bạn có hợp tác với đơn vị thu gom hoặc tái chế chất thải được cấp phép không?',
              risk: 'Không tuân thủ pháp luật; nguy cơ bị phạt về môi trường; ảnh hưởng hình ảnh thương hiệu',
            },
            {
              id: 'env-4',
              text: 'Bạn có đào tạo nhân viên tuyến đầu về quy trình phân loại và xử lý rác đúng cách không?',
              risk: 'Thực hiện không nhất quán dẫn đến luồng rác bị nhiễm bẩn và trượt các đợt kiểm toán',
            },
            {
              id: 'env-5',
              text: 'Trong 12 tháng qua, bạn có thực hiện biện pháp giảm nhựa hoặc bao bì dùng một lần không?',
              risk: 'Kỳ vọng của khách hàng và quy định mới ngày càng tăng; bất lợi cạnh tranh',
            },
          ],
        },
        {
          topic: 'Tiêu thụ & hiệu quả năng lượng',
          priority: true,
          questions: [
            {
              id: 'env-6',
              text: 'Bạn có theo dõi hóa đơn tiền điện hàng tháng theo từng cơ sở và so sánh giữa các tháng không?',
              risk: 'Không nhìn thấy = không kiểm soát được; năng lượng thường chiếm 15–25% chi phí vận hành ngành F&B/lưu trú',
            },
            {
              id: 'env-7',
              text: 'Người vận hành thiết bị (bếp, giặt là, điều hòa) có tuân thủ quy định tắt máy hoặc tiết kiệm năng lượng không?',
              risk: 'Lãng phí điện nước có thể tránh được; ước tính tiết kiệm 10–20% năng lượng nếu có thói quen cơ bản. Tránh được nguy cơ tai nạn lao động liên quan đến điện.',
            },
            {
              id: 'env-8',
              text: 'Trong 2 năm qua bạn có chuyển sang đèn LED hoặc thiết bị tiết kiệm năng lượng không?',
              risk: 'Chi phí vận hành dài hạn cao hơn; bỏ lỡ khoản tiết kiệm tích lũy theo thời gian',
            },
            {
              id: 'env-9',
              text: 'Có người chịu trách nhiệm theo dõi và báo cáo việc sử dụng năng lượng không?',
              risk: 'Không có trách nhiệm thì không cải thiện; vấn đề năng lượng tồn tại mãi',
            },
          ],
        },
        {
          topic: 'Sử dụng & quản lý nước',
          questions: [
            {
              id: 'env-10',
              text: 'Bạn có theo dõi lượng nước tiêu thụ hàng tháng và so sánh với các kỳ trước không?',
              risk: 'Rò rỉ và lãng phí không phát hiện được; hóa đơn nước không giải thích hay giảm được',
            },
            {
              id: 'env-11',
              text: 'Nhân viên bếp và buồng phòng có tuân thủ quy trình tiết kiệm nước (vd rửa chén, giặt là) không?',
              risk: 'Tiêu thụ nước thừa đáng kể; vượt chi phí, đặc biệt ở các khách sạn lớn',
            },
            {
              id: 'env-12',
              text: 'Bạn có quy trình phát hiện và sửa rò rỉ nhanh chóng không?',
              risk: 'Một điểm rò rỉ không phát hiện có thể lãng phí hàng nghìn lít nước mỗi tháng',
            },
          ],
        },
        {
          topic: 'Nhận thức về phát thải khí nhà kính',
          questions: [
            {
              id: 'env-13',
              text: 'Bạn có nắm được các phát thải khí nhà kính liên quan nhất đến loại hình kinh doanh của mình (vd bếp gas, môi chất lạnh, vận chuyển) không?',
              risk: 'Điểm mù trước các quy định sắp tới và yêu cầu công bố từ khách hàng/đối tác',
            },
            {
              id: 'env-14',
              text: 'Bạn đã cân nhắc hành động nào để giảm phát thải (vd đổi nhiên liệu, tối ưu tuyến giao hàng) chưa?',
              risk: 'Bỏ lỡ lợi thế tiên phong; chi phí tuân thủ tương lai cao hơn nếu để muộn',
            },
          ],
        },
      ],
    },
    {
      key: 'social',
      label: 'Xã hội',
      title: 'Xã hội — SME Dịch vụ & F&B',
      maxScore: 30,
      groups: [
        {
          topic: 'Tìm nguồn cung & kiểm soát chất lượng',
          priority: true,
          questions: [
            {
              id: 'soc-1',
              text: 'Bạn có danh sách nhà cung cấp được duyệt hoặc ưu tiên kèm tiêu chí đánh giá cơ bản không?',
              risk: 'Chất lượng nguyên liệu/sản phẩm không ổn định; sự cố an toàn thực phẩm; gián đoạn nguồn cung',
            },
            {
              id: 'soc-2',
              text: 'Bạn có kiểm tra vệ sinh, độ tươi và tiêu chuẩn chất lượng của nhà cung cấp trước khi nhận hàng không?',
              risk: 'Khách hàng bị bệnh, khiếu nại hoặc vi phạm an toàn thực phẩm; có thể bị đóng cửa',
            },
            {
              id: 'soc-3',
              text: 'Bạn có hợp đồng tối thiểu hoặc thỏa thuận bằng văn bản với các nhà cung cấp chính không?',
              risk: 'Không được bảo vệ pháp lý nếu nhà cung cấp thất bại; không có cơ sở khiếu nại khi lỗi chất lượng',
            },
            {
              id: 'soc-4',
              text: 'Bạn có đánh giá nhà cung cấp định kỳ (vd hàng năm) dựa trên chất lượng và độ tin cậy không?',
              risk: 'Bị ràng buộc với nhà cung cấp yếu kém; không cải thiện chuỗi cung ứng một cách hệ thống',
            },
          ],
        },
        {
          topic: 'Quản lý vận hành',
          priority: true,
          questions: [
            {
              id: 'soc-5',
              text: 'Các quy trình vận hành quan trọng (vd sơ chế, nhận phòng, dọn phòng) có được ghi lại dưới hình thức nào đó — kể cả hướng dẫn đơn giản — không?',
              risk: 'Chất lượng dịch vụ không nhất quán; chi phí đào tạo lại cao; sai sót khi thay nhân viên',
            },
            {
              id: 'soc-6',
              text: 'Nhân viên có mô tả vai trò rõ ràng và biết ai chịu trách nhiệm việc gì không?',
              risk: 'Nhầm lẫn, trùng lặp và lỗ hổng trong cung cấp dịch vụ; trách nhiệm kém',
            },
            {
              id: 'soc-7',
              text: 'Bạn có cách nhận biết khi nào lỗi, chậm trễ hoặc làm lại xảy ra thường xuyên không?',
              risk: 'Chi phí có thể tránh được tích tụ âm thầm; nhân viên bức xúc và nguy cơ nghỉ việc',
            },
            {
              id: 'soc-8',
              text: 'Quản lý có họp hoặc giao ban định kỳ với nhóm (hàng ngày/hàng tuần) không?',
              risk: 'Nhận thức nhóm thấp; vấn đề lộ ra muộn; dịch vụ không nhất quán giữa các ca',
            },
          ],
        },
        {
          topic: 'Thực hành lao động & tuân thủ',
          priority: true,
          questions: [
            {
              id: 'soc-9',
              text: 'Tất cả nhân viên có hợp đồng lao động bằng văn bản tuân thủ luật lao động Việt Nam không?',
              risk: 'Nguy cơ tranh chấp lao động; bị phạt khi thanh tra lao động; ảnh hưởng uy tín',
            },
            {
              id: 'soc-10',
              text: 'Giờ làm việc, làm thêm và chế độ nghỉ phép có được theo dõi và ghi nhận không?',
              risk: 'Tranh chấp về lương và nghỉ phép; bị phạt pháp lý; khiếu nại và nghỉ việc của nhân viên',
            },
            {
              id: 'soc-11',
              text: 'Bạn có quy trình an toàn & sức khỏe cơ bản bao gồm nguy cơ trong bếp, trơn trượt hoặc phòng cháy không?',
              risk: 'Tai nạn lao động; trách nhiệm pháp lý; nguy cơ gây thương tích cho nhân viên và khách',
            },
            {
              id: 'soc-12',
              text: 'Có quy trình rõ ràng, dễ tiếp cận để nhân viên nêu ý kiến hoặc khiếu nại nội bộ không?',
              risk: 'Khiếu nại không được giải quyết sẽ leo thang; khiếu nại ra ngoài; bị lộ trên truyền thông/mạng xã hội',
            },
            {
              id: 'soc-13',
              text: 'Bạn có tổ chức ít nhất một buổi định hướng/hội nhập cơ bản cho nhân viên mới về an toàn và ứng xử không?',
              risk: 'Nhân viên mới không biết rủi ro; dễ xảy ra tai nạn hoặc sai phạm trong giai đoạn đầu',
            },
          ],
        },
        {
          topic: 'Đa dạng & hòa nhập',
          questions: [
            {
              id: 'soc-14',
              text: 'Quyết định tuyển dụng có tập trung vào kỹ năng và sự phù hợp thay vì đặc điểm cá nhân không liên quan đến công việc không?',
              risk: 'Nguy cơ phân biệt đối xử pháp lý; thu hẹp nguồn nhân tài; ảnh hưởng uy tín',
            },
            {
              id: 'soc-15',
              text: 'Mọi nhân viên — bất kể tuổi tác, giới tính hay xuất thân — có cơ hội đào tạo và thăng tiến bình đẳng không?',
              risk: 'Tỷ lệ nghỉ việc cao ở các nhóm yếu thế; bỏ lỡ phát triển nhân tài',
            },
          ],
        },
      ],
    },
    {
      key: 'governance',
      label: 'Quản trị',
      title: 'Quản trị — SME Dịch vụ & F&B',
      maxScore: 20,
      groups: [
        {
          topic: 'Tuân thủ dữ liệu',
          priority: true,
          questions: [
            {
              id: 'gov-1',
              text: 'Bạn có thu thập dữ liệu khách hàng (tên, liên hệ, thông tin thanh toán) không? Nếu có, dữ liệu được lưu trữ an toàn không?',
              risk: 'Nguy cơ rò rỉ dữ liệu; vi phạm quy định bảo vệ dữ liệu của Việt Nam; mất niềm tin của khách hàng',
            },
            {
              id: 'gov-2',
              text: 'Bạn có chính sách bảo mật cơ bản được truyền đạt tới khách hàng không?',
              risk: 'Không tuân thủ pháp luật; bị phạt; tổn hại thương hiệu nếu bị rò rỉ',
            },
            {
              id: 'gov-3',
              text: 'Quyền truy cập dữ liệu nhạy cảm của doanh nghiệp hoặc khách hàng có được giới hạn cho nhân viên liên quan không?',
              risk: 'Lạm dụng dữ liệu nội bộ; khó truy vết khi rò rỉ; dữ liệu khách hàng bị lộ',
            },
          ],
        },
        {
          topic: 'Quản lý rủi ro pháp lý & tuân thủ',
          priority: true,
          questions: [
            {
              id: 'gov-4',
              text: 'Doanh nghiệp có được cấp phép và cập nhật đầy đủ các giấy phép hoạt động bắt buộc (an toàn thực phẩm, phòng cháy, đăng ký kinh doanh) không?',
              risk: 'Nguy cơ bị đình chỉ đột ngột; bị phạt; mất khả năng hoạt động',
            },
            {
              id: 'gov-5',
              text: 'Bạn có người chịu trách nhiệm theo dõi hạn của giấy phép, chứng nhận hoặc các đợt kiểm tra không?',
              risk: 'Sai sót tuân thủ chỉ bị phát hiện khi thanh tra; bị động thay vì chủ động',
            },
            {
              id: 'gov-6',
              text: 'Bạn có tự kiểm tra tuân thủ nội bộ cơ bản ít nhất mỗi năm một lần không?',
              risk: 'Lỗ hổng tuân thủ tích tụ mà không hay biết; mức phạt leo thang khi bị phát hiện',
            },
          ],
        },
        {
          topic: 'Gắn kết khách hàng & các bên liên quan',
          questions: [
            {
              id: 'gov-7',
              text: 'Bạn có cách thức chuẩn để thu thập và phản hồi ý kiến hoặc khiếu nại của khách hàng không?',
              risk: 'Khiếu nại không được giải quyết; đánh giá tiêu cực tích tụ; mất khách hàng',
            },
            {
              id: 'gov-8',
              text: 'Bạn có truyền đạt các cải tiến về ESG hoặc chất lượng tới khách hàng (kể cả không chính thức) không?',
              risk: 'Bỏ lỡ cơ hội xây dựng niềm tin và lòng trung thành với thương hiệu',
            },
          ],
        },
        {
          topic: 'Chống tham nhũng & đạo đức',
          questions: [
            {
              id: 'gov-9',
              text: 'Nhân viên có hiểu thế nào là xung đột lợi ích hoặc quà tặng/khoản chi không phù hợp không?',
              risk: 'Gian lận mua sắm; chi phí bị thổi phồng; rủi ro pháp lý cho chủ doanh nghiệp',
            },
            {
              id: 'gov-10',
              text: 'Bạn có các kỳ vọng về ứng xử cơ bản được truyền đạt bằng văn bản tới nhân viên không?',
              risk: 'Sai phạm không được kiểm soát; sự cố nhân sự khó giải quyết khi không có chuẩn mực bằng văn bản',
            },
          ],
        },
      ],
    },
  ],
  priorityFocus: [
    {
      area: 'Phát sinh & xử lý chất thải',
      pillar: 'Môi trường',
      benefit: 'Giảm chi phí xử lý chất thải và tránh bị phạt theo quy định',
    },
    {
      area: 'Tiêu thụ & hiệu quả năng lượng',
      pillar: 'Môi trường',
      benefit: 'Giảm hóa đơn điện nước — thường tiết kiệm được 10–20%',
    },
    {
      area: 'Tìm nguồn cung & kiểm soát chất lượng',
      pillar: 'Xã hội',
      benefit: 'Ngăn sự cố an toàn thực phẩm và gián đoạn nguồn cung',
    },
    {
      area: 'Quản lý vận hành',
      pillar: 'Xã hội',
      benefit: 'Giảm sai sót và làm lại; nâng cao tính nhất quán của dịch vụ',
    },
    {
      area: 'Thực hành lao động & tuân thủ',
      pillar: 'Xã hội',
      benefit: 'Bảo vệ trước tranh chấp lao động và mức phạt khi thanh tra',
    },
    {
      area: 'Tuân thủ dữ liệu',
      pillar: 'Quản trị',
      benefit: 'Bảo mật dữ liệu khách hàng và tuân thủ quy định của Việt Nam',
    },
    {
      area: 'Quản lý rủi ro pháp lý',
      pillar: 'Quản trị',
      benefit: 'Đảm bảo mọi giấy phép còn hiệu lực và được theo dõi',
    },
  ],
};

/**
 * ESG Quick Scan — Supply Chain SMEs.
 * Source: EB_Module_A_ESG QuickScan_Supply Chain.xlsx
 */
const SUPPLY: QuickScanConfig = {
  id: 'esg-quick-scan-supply-chain',
  name: 'Đánh giá nhanh ESG — Chuỗi Cung Ứng',
  sector: 'Doanh nghiệp SME Chuỗi Cung Ứng',
  profileFields: [
    { label: 'Tên doanh nghiệp' },
    { label: 'Loại hình', hint: 'VD: Sản xuất, Phân phối, Bán lẻ, Thương mại' },
    { label: 'Ngành / Nhóm sản phẩm', hint: 'VD: Chế biến thực phẩm, Dệt may, Điện tử, FMCG' },
    { label: 'Số nhân viên' },
    { label: 'Số cơ sở sản xuất / vận hành' },
    { label: 'Số năm hoạt động' },
    { label: 'Có xuất khẩu hoặc cung cấp cho nhà xuất khẩu?', hint: 'Có / Không / Đang dự định' },
    { label: 'Số nhà cung cấp đang hoạt động (ước tính)' },
    { label: 'Người thực hiện đánh giá' },
    { label: 'Vai trò / Phòng ban' },
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
      title: 'Môi trường — SME Chuỗi Cung Ứng',
      maxScore: 28,
      groups: [
        {
          topic: 'Phát sinh & xử lý chất thải',
          priority: true,
          questions: [
            {
              id: 'env-1',
              text: 'Bạn có phân loại và phân nhóm chất thải phát sinh trong hoạt động (vd phế liệu, rác bao bì, chất thải nguy hại) không?',
              risk: 'Bị phạt khi thanh tra môi trường; chi phí xử lý mất kiểm soát; rủi ro uy tín',
            },
            {
              id: 'env-2',
              text: 'Bạn có theo dõi khối lượng hoặc trọng lượng chất thải phát sinh theo tháng hoặc theo mỗi lô sản xuất không?',
              risk: 'Không nhận diện được cơ hội giảm chất thải; thất thoát chi phí ngầm',
            },
            {
              id: 'env-3',
              text: 'Bạn có sử dụng đơn vị xử lý chất thải được cấp phép cho các loại chất thải không thông thường không?',
              risk: 'Trách nhiệm pháp lý khi xử lý sai; nguy cơ bị buộc đóng cửa cơ sở',
            },
            {
              id: 'env-4',
              text: 'Bạn đã xác định 3 nguồn phát sinh chất thải lớn nhất và có biện pháp giảm thiểu chưa?',
              risk: 'Chi phí chất thải duy trì ở mức cao mãi; tổn thất nguyên liệu tích lũy theo thời gian',
            },
            {
              id: 'env-5',
              text: 'Nhân viên phụ trách sản xuất hoặc kho có được đào tạo về quy trình xử lý chất thải không?',
              risk: 'Phân loại không nhất quán dẫn đến trượt tuân thủ và nhiễm bẩn luồng tái chế',
            },
          ],
        },
        {
          topic: 'Tiêu thụ & hiệu quả năng lượng',
          priority: true,
          questions: [
            {
              id: 'env-6',
              text: 'Bạn có theo dõi lượng điện và nhiên liệu tiêu thụ hàng tháng tại các cơ sở sản xuất không?',
              risk: 'Năng lượng thường chiếm 10–30% chi phí sản xuất; không có dữ liệu = không kiểm soát',
            },
            {
              id: 'env-7',
              text: 'Máy móc thiết bị có được tắt khi không sử dụng và việc này có được thực thi một cách hệ thống không?',
              risk: 'Lãng phí năng lượng có thể tránh được; giảm tuổi thọ thiết bị; bỏ lỡ khoản tiết kiệm chi phí',
            },
            {
              id: 'env-8',
              text: 'Trong 3 năm qua bạn có thực hiện rà soát hay nâng cấp hiệu quả năng lượng nào không (vd LED, mô-tơ tiết kiệm điện)?',
              risk: 'Vận hành với chi phí cao hơn đối thủ đã nâng cấp; bỏ lỡ các đợt ưu đãi',
            },
            {
              id: 'env-9',
              text: 'Có người được phân công chịu trách nhiệm theo dõi mức tiêu thụ và chi phí năng lượng không?',
              risk: 'Không có trách nhiệm; vấn đề năng lượng tồn tại và leo thang âm thầm',
            },
          ],
        },
        {
          topic: 'Sử dụng & quản lý nước',
          questions: [
            {
              id: 'env-10',
              text: 'Bạn có theo dõi mức tiêu thụ và chi phí nước hàng tháng không?',
              risk: 'Rò rỉ không được báo cáo; không phát hiện được tiêu thụ vượt mức; chi phí tăng bất ngờ',
            },
            {
              id: 'env-11',
              text: 'Quy trình sản xuất hoặc vệ sinh có áp dụng biện pháp tiết kiệm nước (vd hệ thống tuần hoàn, tái sử dụng) không?',
              risk: 'Hóa đơn nước cao; rủi ro tuân thủ ở khu vực khan hiếm nước; bị kiểm toán chuỗi cung ứng cảnh báo',
            },
            {
              id: 'env-12',
              text: 'Bạn có nắm được các quy định sử dụng nước của địa phương áp dụng cho ngành mình không?',
              risk: 'Vô tình không tuân thủ; rủi ro bị phạt và mất giấy phép',
            },
          ],
        },
        {
          topic: 'Nhận thức về phát thải & ô nhiễm',
          questions: [
            {
              id: 'env-13',
              text: 'Bạn có nhận biết về các nguồn phát thải trong hoạt động (vd máy phát điện, môi chất lạnh, phương tiện) không?',
              risk: 'Áp lực pháp lý ngày càng tăng; yêu cầu công bố trong tương lai từ người mua và nhà nước',
            },
            {
              id: 'env-14',
              text: 'Bạn có các biện pháp kiểm soát ô nhiễm cơ bản (vd xử lý nước thải, kiểm soát bụi, giới hạn tiếng ồn) không?',
              risk: 'Hàng xóm khiếu nại; bị cơ quan môi trường thanh tra; bị phạt hoặc buộc dừng hoạt động',
            },
          ],
        },
      ],
    },
    {
      key: 'social',
      label: 'Xã hội',
      title: 'Xã hội — SME Chuỗi Cung Ứng',
      maxScore: 34,
      groups: [
        {
          topic: 'Tìm nguồn cung & kiểm soát chất lượng',
          priority: true,
          questions: [
            {
              id: 'soc-1',
              text: 'Bạn có duy trì danh sách nhà cung cấp được duyệt kèm tiêu chí năng lực tối thiểu không?',
              risk: 'Đầu vào kém chất lượng dẫn đến lỗi sản xuất, bị khách từ chối và thu hồi sản phẩm',
            },
            {
              id: 'soc-2',
              text: 'Bạn có kiểm tra chất lượng nguyên liệu hoặc sản phẩm đầu vào trước khi nhận hàng không?',
              risk: 'Đầu vào lỗi lọt vào sản xuất mà không phát hiện; tăng chi phí trả hàng và làm lại',
            },
            {
              id: 'soc-3',
              text: 'Bạn có hợp đồng bằng văn bản với các nhà cung cấp chính, quy định kỳ vọng chất lượng và chế tài không?',
              risk: 'Không có cơ sở pháp lý khi nhà cung cấp thất bại; không quy được trách nhiệm khi thiếu chất lượng',
            },
            {
              id: 'soc-4',
              text: 'Bạn có đánh giá hiệu quả nhà cung cấp ít nhất hàng năm không?',
              risk: 'Mặc nhiên giữ lại nhà cung cấp yếu kém; không cải thiện chuỗi cung ứng một cách hệ thống',
            },
            {
              id: 'soc-5',
              text: 'Bạn có cân nhắc các yêu cầu ESG cơ bản khi chọn nhà cung cấp (vd đăng ký pháp lý, tuân thủ lao động cơ bản) không?',
              risk: 'Rủi ro uy tín nếu thực hành của nhà cung cấp bị phơi bày; rủi ro kiểm toán từ người mua trong tương lai',
            },
          ],
        },
        {
          topic: 'Quản lý vận hành',
          priority: true,
          questions: [
            {
              id: 'soc-6',
              text: 'Các quy trình sản xuất hoặc kho quan trọng có được ghi thành quy trình vận hành chuẩn (SOP) không?',
              risk: 'Chất lượng không ổn định; chi phí làm lại; chi phí đào tạo lại cao khi nhân viên nghỉ',
            },
            {
              id: 'soc-7',
              text: 'Công nhân có vai trò và trách nhiệm được xác định rõ cho từng bước quy trình không?',
              risk: 'Sai sót và lỗ hổng trách nhiệm; nhầm lẫn dẫn đến lỗi sản phẩm và tai nạn',
            },
            {
              id: 'soc-8',
              text: 'Quản lý có theo dõi định kỳ các chỉ số năng suất (vd sản lượng mỗi ca, tỷ lệ lỗi, thời gian dừng máy) không?',
              risk: 'Tổn thất năng suất không được phát hiện; không nhận diện được điểm nghẽn hay kém hiệu quả',
            },
            {
              id: 'soc-9',
              text: 'Có quy trình hệ thống để nhận diện và xử lý các điểm nghẽn vận hành không?',
              risk: 'Vấn đề lặp lại tồn tại mãi; nhân viên bức xúc; sản lượng thiếu ổn định',
            },
          ],
        },
        {
          topic: 'Thực hành lao động & tuân thủ',
          priority: true,
          questions: [
            {
              id: 'soc-10',
              text: 'Tất cả công nhân có hợp đồng lao động bằng văn bản tuân thủ luật lao động Việt Nam không?',
              risk: 'Bị phạt khi thanh tra lao động; tranh chấp về lương/chấm dứt hợp đồng; ảnh hưởng uy tín',
            },
            {
              id: 'soc-11',
              text: 'Giờ làm việc, làm thêm và ngày nghỉ có được theo dõi và nằm trong giới hạn pháp luật không?',
              risk: 'Tranh chấp lương làm thêm; nguy cơ bị kết luận vi phạm lao động khi kiểm toán',
            },
            {
              id: 'soc-12',
              text: 'Bạn có và thực thi các quy trình an toàn & sức khỏe lao động phù hợp với hoạt động của mình không?',
              risk: 'Tai nạn lao động; trách nhiệm bồi thường cho công nhân; nguy cơ dừng hoạt động sau sự cố',
            },
            {
              id: 'soc-13',
              text: 'Có quy trình chính thức để công nhân nêu ý kiến hoặc khiếu nại mà không sợ bị trả đũa không?',
              risk: 'Bức xúc không được giải tỏa sẽ leo thang; đình công đột ngột hoặc khiếu nại ra ngoài',
            },
            {
              id: 'soc-14',
              text: 'Bạn có tổ chức định hướng an toàn cho mọi công nhân mới trước khi họ bắt đầu làm việc không?',
              risk: 'Công nhân mới là nhóm rủi ro tai nạn cao nhất; trách nhiệm pháp lý khi không có định hướng được ghi nhận',
            },
            {
              id: 'soc-15',
              text: 'Các khoản BHXH, BHYT và bảo hiểm thất nghiệp có được đóng đầy đủ và cập nhật cho mọi công nhân không?',
              risk: 'Bị phạt pháp lý; công nhân khiếu nại; bị phát hiện khi thanh tra lao động',
            },
          ],
        },
        {
          topic: 'Đa dạng & hòa nhập',
          questions: [
            {
              id: 'soc-16',
              text: 'Quyết định tuyển dụng và thăng tiến có dựa trên kỹ năng và năng lực thay vì đặc điểm cá nhân không?',
              risk: 'Nguy cơ phân biệt đối xử pháp lý; hạn chế tiếp cận nhân tài; ảnh hưởng uy tín nếu bị phơi bày',
            },
            {
              id: 'soc-17',
              text: 'Lao động nữ và lao động nhập cư có cơ hội đào tạo và thăng tiến bình đẳng không?',
              risk: 'Tỷ lệ nghỉ việc cao ở các nhóm này; rủi ro không tuân thủ pháp luật; ảnh hưởng quan hệ cộng đồng',
            },
          ],
        },
      ],
    },
    {
      key: 'governance',
      label: 'Quản trị',
      title: 'Quản trị — SME Chuỗi Cung Ứng',
      maxScore: 22,
      groups: [
        {
          topic: 'Tuân thủ dữ liệu',
          priority: true,
          questions: [
            {
              id: 'gov-1',
              text: 'Bạn có thu thập và lưu trữ dữ liệu của khách hàng, nhà cung cấp hoặc nhân viên không? Nếu có, quyền truy cập dữ liệu này có được giới hạn và bảo mật không?',
              risk: 'Rò rỉ dữ liệu; vi phạm luật bảo vệ dữ liệu Việt Nam (Nghị định 13/2023); trách nhiệm dân sự và pháp lý',
            },
            {
              id: 'gov-2',
              text: 'Bạn có quy trình sao lưu và khôi phục dữ liệu cơ bản không?',
              risk: 'Mất vĩnh viễn hồ sơ doanh nghiệp do mã độc tống tiền, hỏng phần cứng hoặc hỏa hoạn',
            },
            {
              id: 'gov-3',
              text: 'Nhân viên có được đào tạo về thực hành bảo mật dữ liệu cơ bản (vd quản lý mật khẩu, không chia sẻ thông tin đăng nhập) không?',
              risk: 'Rò rỉ nội bộ; gian lận; mất tính bảo mật của doanh nghiệp',
            },
          ],
        },
        {
          topic: 'Quản lý rủi ro pháp lý & tuân thủ',
          priority: true,
          questions: [
            {
              id: 'gov-4',
              text: 'Tất cả giấy phép hoạt động của bạn (đăng ký kinh doanh, giấy phép môi trường, phòng cháy) có còn hiệu lực và hợp lệ không?',
              risk: 'Nguy cơ bị buộc dừng hoạt động; bị phạt; không thể hoạt động hợp pháp',
            },
            {
              id: 'gov-5',
              text: 'Bạn có cách theo dõi hạn của giấy phép, chứng nhận hoặc các kỳ nộp hồ sơ pháp lý không?',
              risk: 'Sai sót chỉ bị phát hiện khi thanh tra; tuân thủ bị động tốn kém hơn chủ động',
            },
            {
              id: 'gov-6',
              text: 'Bạn có thực hiện rà soát tuân thủ nội bộ ít nhất mỗi năm một lần không?',
              risk: 'Lỗ hổng tuân thủ tích tụ; mức phạt leo thang khi bị phát hiện',
            },
            {
              id: 'gov-7',
              text: 'Bạn có nắm được các quy định liên quan ESG có khả năng ảnh hưởng đến ngành mình trong 2–3 năm tới không?',
              risk: 'Không chuẩn bị cho các yêu cầu sắp tới; thay đổi bị động tốn kém và gây gián đoạn hơn',
            },
          ],
        },
        {
          topic: 'Gắn kết khách hàng & các bên liên quan',
          questions: [
            {
              id: 'gov-8',
              text: 'Bạn có quy trình chuẩn để tiếp nhận, phản hồi và theo dõi khiếu nại của khách hàng không?',
              risk: 'Khiếu nại lặp lại không được giải quyết; mất khách hàng; truyền miệng tiêu cực',
            },
            {
              id: 'gov-9',
              text: 'Bạn có truyền đạt các nỗ lực về chất lượng, an toàn hoặc cải tiến sản phẩm tới khách hàng hoặc người mua không?',
              risk: 'Bỏ lỡ cơ hội xây dựng niềm tin của người mua và giảm tần suất kiểm toán',
            },
          ],
        },
        {
          topic: 'Chống tham nhũng & đạo đức',
          questions: [
            {
              id: 'gov-10',
              text: 'Nhân viên mua hàng có hiểu thế nào là xung đột lợi ích, quà tặng không phù hợp hoặc khoản chi bôi trơn không?',
              risk: 'Gian lận mua sắm; chi phí đầu vào bị thổi phồng; rủi ro pháp lý cho doanh nghiệp',
            },
            {
              id: 'gov-11',
              text: 'Bạn có bộ quy tắc ứng xử cơ bản được truyền đạt tới mọi nhân viên không?',
              risk: 'Sai phạm không được kiểm soát; sự cố kỷ luật khó quản lý khi không có chuẩn mực được ghi nhận',
            },
          ],
        },
      ],
    },
  ],
  priorityFocus: [
    {
      area: 'Phát sinh & xử lý chất thải',
      pillar: 'Môi trường',
      benefit: 'Giảm chi phí xử lý và tránh bị cơ quan môi trường xử phạt',
    },
    {
      area: 'Tiêu thụ & hiệu quả năng lượng',
      pillar: 'Môi trường',
      benefit:
        'Cắt giảm hóa đơn năng lượng — thường chiếm 10–30% chi phí sản xuất, còn nhiều dư địa cải thiện',
    },
    {
      area: 'Tìm nguồn cung & kiểm soát chất lượng',
      pillar: 'Xã hội',
      benefit: 'Ngăn đầu vào lỗi; phòng ngừa rủi ro nhà cung cấp thất bại và thu hồi sản phẩm',
    },
    {
      area: 'Quản lý vận hành',
      pillar: 'Xã hội',
      benefit: 'Giảm làm lại và thời gian dừng máy; chuẩn hóa quy trình toàn bộ hoạt động',
    },
    {
      area: 'Thực hành lao động & tuân thủ',
      pillar: 'Xã hội',
      benefit:
        'Tránh bị phạt và tranh chấp khi thanh tra lao động; xây dựng lực lượng lao động ổn định',
    },
    {
      area: 'Tuân thủ dữ liệu',
      pillar: 'Quản trị',
      benefit: 'Bảo vệ dữ liệu doanh nghiệp và nhân viên; tuân thủ Nghị định 13/2023',
    },
    {
      area: 'Quản lý rủi ro pháp lý',
      pillar: 'Quản trị',
      benefit: 'Đảm bảo mọi giấy phép hoạt động còn hiệu lực và được theo dõi',
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
