import { QuickScanConfig } from './quick-scan.types';

/**
 * ESG Quick Scan — F&B / Service SMEs.
 * Source: EB_Module A_ESG Quick Scan_F&B.xlsx
 */
const FNB: QuickScanConfig = {
  id: 'esg-quick-scan-fnb',
  name: 'ESG Quick Scan — F&B',
  sector: 'Service & F&B SMEs',
  profileFields: [
    { label: 'Tên doanh nghiệp' },
    { label: 'Loại hình', hint: 'VD: Nhà hàng, Khách sạn, Café, Catering, Resort' },
    { label: 'Số nhân viên' },
    { label: 'Số chi nhánh / địa điểm' },
    { label: 'Số năm hoạt động' },
    { label: 'Người thực hiện đánh giá' },
    { label: 'Vai trò / Phòng ban' },
    { label: 'Ngày đánh giá' },
    { label: 'Đã từng đào tạo ESG chưa?', hint: 'Có / Không' },
    { label: 'Mối quan tâm ESG chính', hint: 'VD: Rác thải, Năng lượng, Nghỉ việc, Tuân thủ' },
  ],
  pillars: [
    {
      key: 'environment',
      label: 'Môi trường',
      title: 'Environment — Service & F&B SMEs',
      maxScore: 28,
      groups: [
        {
          topic: 'Phát sinh & xử lý chất thải',
          priority: true,
          questions: [
            {
              id: 'env-1',
              text: 'Do you separate waste by type (food waste, recyclables, general waste) at each outlet?',
              risk: 'Fines from waste authority inspections; disposal costs spiral; reputational damage if waste seen by customers',
            },
            {
              id: 'env-2',
              text: 'Do you track how much food waste your business generates per week?',
              risk: 'Hidden cost leakage; inability to reduce waste without measuring it',
            },
            {
              id: 'env-3',
              text: 'Do you have a relationship with a licensed waste collector or recycler?',
              risk: 'Legal non-compliance; potential environmental penalty; negative brand image',
            },
            {
              id: 'env-4',
              text: 'Do you train frontline staff on correct waste sorting and disposal procedures?',
              risk: 'Inconsistent execution leads to contaminated waste streams and failed audits',
            },
            {
              id: 'env-5',
              text: 'Have you taken steps to reduce single-use plastics or packaging in the last 12 months?',
              risk: 'Growing customer expectation and incoming regulation; competitive disadvantage',
            },
          ],
        },
        {
          topic: 'Tiêu thụ & hiệu quả năng lượng',
          priority: true,
          questions: [
            {
              id: 'env-6',
              text: 'Do you track your monthly electricity bill per outlet and compare month-on-month?',
              risk: 'No visibility = no control; energy typically 15–25% of operating costs for F&B/hospitality',
            },
            {
              id: 'env-7',
              text: 'Do equipment operators (kitchen, laundry, HVAC) follow switch-off or energy-saving protocols?',
              risk: 'Preventable utility waste; estimated 10–20% energy saving possible with basic habits. Preventable workplace hazards related to electricity.',
            },
            {
              id: 'env-8',
              text: 'Have you switched to LED lighting or energy-efficient equipment in the past 2 years?',
              risk: 'Higher long-term operating costs; missed savings that compound over time',
            },
            {
              id: 'env-9',
              text: 'Is there a person responsible for monitoring and reporting on energy use?',
              risk: 'No accountability means no improvement; energy issues persist indefinitely',
            },
          ],
        },
        {
          topic: 'Sử dụng & quản lý nước',
          questions: [
            {
              id: 'env-10',
              text: 'Do you monitor monthly water consumption and compare against previous periods?',
              risk: 'Undetected leaks and overuse; water bills that cannot be explained or reduced',
            },
            {
              id: 'env-11',
              text: 'Do kitchen and housekeeping staff follow water-saving procedures (e.g. for dishwashing, laundry)?',
              risk: 'Significant unnecessary water consumption; cost overruns especially in large hotels',
            },
            {
              id: 'env-12',
              text: 'Do you have processes to detect and fix leaks quickly?',
              risk: 'A single undetected leak can waste thousands of litres per month',
            },
          ],
        },
        {
          topic: 'Nhận thức về phát thải khí nhà kính',
          questions: [
            {
              id: 'env-13',
              text: 'Are you aware of the greenhouse gas emissions most relevant to your type of business (e.g. gas cooking, refrigerants, transport)?',
              risk: 'Blind spot for upcoming regulation and customer/partner disclosure requirements',
            },
            {
              id: 'env-14',
              text: 'Have you considered any actions to reduce emissions (e.g. switching fuels, optimising delivery routes)?',
              risk: 'Missed early-mover advantage; future compliance costs higher if left too late',
            },
          ],
        },
      ],
    },
    {
      key: 'social',
      label: 'Xã hội',
      title: 'Social — Service & F&B SMEs',
      maxScore: 30,
      groups: [
        {
          topic: 'Tìm nguồn cung & kiểm soát chất lượng',
          priority: true,
          questions: [
            {
              id: 'soc-1',
              text: 'Do you have a list of approved/preferred suppliers with basic evaluation criteria?',
              risk: 'Inconsistent ingredient/product quality; food safety incidents; supply disruptions',
            },
            {
              id: 'soc-2',
              text: 'Do you check supplier hygiene, freshness, and quality standards before accepting deliveries?',
              risk: 'Customer illness, complaints, or food safety violation; potential business closure',
            },
            {
              id: 'soc-3',
              text: 'Do you have a minimum contract or written agreement with your key suppliers?',
              risk: 'No legal protection if supplier fails; no recourse for quality failures',
            },
            {
              id: 'soc-4',
              text: 'Do you evaluate suppliers periodically (e.g. annually) based on quality and reliability?',
              risk: 'Locked into underperforming suppliers; no systematic improvement of supply chain',
            },
          ],
        },
        {
          topic: 'Quản lý vận hành',
          priority: true,
          questions: [
            {
              id: 'soc-5',
              text: 'Are key operational processes (e.g. food prep, check-in, room cleaning) documented in any form — even simple written guides?',
              risk: 'Inconsistent service quality; high retraining cost; errors when staff change',
            },
            {
              id: 'soc-6',
              text: 'Do staff have clear role descriptions and know who is responsible for what?',
              risk: 'Confusion, duplication, and gaps in service delivery; poor accountability',
            },
            {
              id: 'soc-7',
              text: 'Do you have a way to identify when errors, delays, or rework are happening frequently?',
              risk: 'Preventable costs build up silently; staff frustration and turnover risk',
            },
            {
              id: 'soc-8',
              text: 'Do managers conduct regular team check-ins or briefings (daily/weekly)?',
              risk: 'Low team awareness; issues surface late; service inconsistency across shifts',
            },
          ],
        },
        {
          topic: 'Thực hành lao động & tuân thủ',
          priority: true,
          questions: [
            {
              id: 'soc-9',
              text: 'Do all staff have written employment contracts that comply with Vietnamese labour law?',
              risk: 'Labour dispute risk; fines from labour authority inspections; reputational exposure',
            },
            {
              id: 'soc-10',
              text: 'Are working hours, overtime, and leave entitlements tracked and documented?',
              risk: 'Disputes over pay and leave; legal penalties; staff grievances and turnover',
            },
            {
              id: 'soc-11',
              text: 'Do you have a basic health & safety protocol covering kitchen hazards, slip risks, or fire safety?',
              risk: 'Workplace accidents; liability; potential injury to staff and customers',
            },
            {
              id: 'soc-12',
              text: 'Is there a clear and accessible process for staff to raise concerns or complaints internally?',
              risk: 'Unresolved grievances escalate; external complaints; media/social media exposure',
            },
            {
              id: 'soc-13',
              text: 'Do you conduct at least a basic induction/onboarding for new staff on safety and conduct?',
              risk: 'New staff unaware of risks; early-stage accidents or misconduct more likely',
            },
          ],
        },
        {
          topic: 'Đa dạng & hòa nhập',
          questions: [
            {
              id: 'soc-14',
              text: 'Do hiring decisions focus on skill and fit rather than personal characteristics unrelated to the role?',
              risk: 'Legal discrimination risk; limited talent pool; reputational damage',
            },
            {
              id: 'soc-15',
              text: 'Do all staff — regardless of age, gender, or background — have equal access to training and advancement?',
              risk: 'High turnover among underrepresented groups; missed talent development',
            },
          ],
        },
      ],
    },
    {
      key: 'governance',
      label: 'Quản trị',
      title: 'Governance — Service & F&B SMEs',
      maxScore: 20,
      groups: [
        {
          topic: 'Tuân thủ dữ liệu',
          priority: true,
          questions: [
            {
              id: 'gov-1',
              text: 'Do you collect customer data (names, contacts, payment info)? If yes, is it stored securely?',
              risk: "Data breach risk; violation of Vietnam's data protection regulations; loss of customer trust",
            },
            {
              id: 'gov-2',
              text: 'Do you have a basic privacy policy communicated to customers?',
              risk: 'Legal non-compliance; regulatory fines; brand damage if breached',
            },
            {
              id: 'gov-3',
              text: 'Is access to sensitive business or customer data limited to relevant staff only?',
              risk: 'Internal data misuse; difficulty tracing breaches; customer data exposed',
            },
          ],
        },
        {
          topic: 'Quản lý rủi ro pháp lý & tuân thủ',
          priority: true,
          questions: [
            {
              id: 'gov-4',
              text: 'Is your business licensed and up to date with all required operating permits (food safety, fire, business registration)?',
              risk: 'Risk of sudden shutdown; fines; loss of ability to operate',
            },
            {
              id: 'gov-5',
              text: 'Do you have someone responsible for tracking when licences, certifications, or inspections are due?',
              risk: 'Lapses in compliance discovered only during inspections; reactive not proactive',
            },
            {
              id: 'gov-6',
              text: 'Do you conduct a basic internal check on compliance at least annually?',
              risk: 'Compliance gaps accumulate unnoticed; penalties escalate when discovered',
            },
          ],
        },
        {
          topic: 'Gắn kết khách hàng & các bên liên quan',
          questions: [
            {
              id: 'gov-7',
              text: 'Do you have a standard way to collect and respond to customer feedback or complaints?',
              risk: 'Complaints go unresolved; negative reviews compound; customer churn',
            },
            {
              id: 'gov-8',
              text: 'Do you communicate any ESG or quality improvements to customers (even informally)?',
              risk: 'Missed opportunity to build brand trust and loyalty',
            },
          ],
        },
        {
          topic: 'Chống tham nhũng & đạo đức',
          questions: [
            {
              id: 'gov-9',
              text: 'Do staff understand what constitutes a conflict of interest or inappropriate gift/payment?',
              risk: 'Procurement fraud; inflated costs; legal exposure for the business owner',
            },
            {
              id: 'gov-10',
              text: 'Do you have basic conduct expectations communicated in writing to staff?',
              risk: 'Misconduct goes unchecked; HR incidents hard to resolve without written standards',
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
      benefit: 'Reduce waste disposal costs and prevent regulatory fines',
    },
    {
      area: 'Tiêu thụ & hiệu quả năng lượng',
      pillar: 'Môi trường',
      benefit: 'Lower utility bills — typically 10–20% savings possible',
    },
    {
      area: 'Tìm nguồn cung & kiểm soát chất lượng',
      pillar: 'Xã hội',
      benefit: 'Prevent food safety incidents and supply disruptions',
    },
    {
      area: 'Quản lý vận hành',
      pillar: 'Xã hội',
      benefit: 'Reduce errors and rework; improve service consistency',
    },
    {
      area: 'Thực hành lao động & tuân thủ',
      pillar: 'Xã hội',
      benefit: 'Protect against labour disputes and inspection penalties',
    },
    {
      area: 'Tuân thủ dữ liệu',
      pillar: 'Quản trị',
      benefit: 'Secure customer data and comply with Vietnamese regulations',
    },
    {
      area: 'Quản lý rủi ro pháp lý',
      pillar: 'Quản trị',
      benefit: 'Ensure all permits and licences are current and tracked',
    },
  ],
};

/**
 * ESG Quick Scan — Supply Chain SMEs.
 * Source: EB_Module_A_ESG QuickScan_Supply Chain.xlsx
 */
const SUPPLY: QuickScanConfig = {
  id: 'esg-quick-scan-supply-chain',
  name: 'ESG Quick Scan — Chuỗi Cung Ứng',
  sector: 'Supply Chain SMEs',
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
    { label: 'Ngày đánh giá' },
    {
      label: 'Mối quan tâm ESG chính',
      hint: 'VD: Rác thải, Năng lượng, Tuân thủ lao động, Chất lượng NCC',
    },
  ],
  pillars: [
    {
      key: 'environment',
      label: 'Môi trường',
      title: 'Environment — Supply Chain SMEs',
      maxScore: 28,
      groups: [
        {
          topic: 'Phát sinh & xử lý chất thải',
          priority: true,
          questions: [
            {
              id: 'env-1',
              text: 'Do you separate and categorise waste produced in your operations (e.g. scrap materials, packaging waste, hazardous waste)?',
              risk: 'Regulatory fines from environmental inspections; disposal costs uncontrolled; reputational risk',
            },
            {
              id: 'env-2',
              text: 'Do you track the volume or weight of waste generated per month or per production run?',
              risk: 'Unable to identify waste reduction opportunities; hidden cost leakage',
            },
            {
              id: 'env-3',
              text: 'Do you use a licensed waste disposal contractor for non-general waste?',
              risk: 'Legal liability for improper disposal; potential facility closure order',
            },
            {
              id: 'env-4',
              text: 'Have you identified your top 3 sources of waste and taken steps to reduce them?',
              risk: 'Waste costs remain high indefinitely; raw material losses compound over time',
            },
            {
              id: 'env-5',
              text: 'Do staff responsible for production or warehousing receive training on waste handling procedures?',
              risk: 'Inconsistent sorting leads to compliance failures and contamination of recyclable streams',
            },
          ],
        },
        {
          topic: 'Tiêu thụ & hiệu quả năng lượng',
          priority: true,
          questions: [
            {
              id: 'env-6',
              text: 'Do you track monthly electricity and fuel consumption across your production site(s)?',
              risk: 'Energy is typically 10–30% of production costs; no data = no control',
            },
            {
              id: 'env-7',
              text: 'Are machinery and equipment switched off when not in use, and is this enforced systematically?',
              risk: 'Preventable energy waste; equipment lifetime reduced; cost savings foregone',
            },
            {
              id: 'env-8',
              text: 'Have you conducted any energy efficiency review or upgrade in the last 3 years (e.g. LED, efficient motors)?',
              risk: 'Operating at higher cost than competitors who have upgraded; missed incentive windows',
            },
            {
              id: 'env-9',
              text: 'Is there a designated person responsible for monitoring energy consumption and costs?',
              risk: 'No accountability; energy issues persist and escalate unseen',
            },
          ],
        },
        {
          topic: 'Sử dụng & quản lý nước',
          questions: [
            {
              id: 'env-10',
              text: 'Do you monitor water consumption and costs monthly?',
              risk: 'Unreported leaks; inability to detect overconsumption; unexpected cost spikes',
            },
            {
              id: 'env-11',
              text: 'Do production or cleaning processes include water-saving practices (e.g. closed-loop systems, reuse)?',
              risk: 'High water bills; compliance risk in water-scarce areas; supply chain auditors flagging overuse',
            },
            {
              id: 'env-12',
              text: 'Are you aware of local water use regulations applicable to your industry?',
              risk: 'Unintentional non-compliance; penalties and licence risks',
            },
          ],
        },
        {
          topic: 'Nhận thức về phát thải & ô nhiễm',
          questions: [
            {
              id: 'env-13',
              text: 'Do you have any awareness of emission sources in your operations (e.g. generators, refrigerants, vehicles)?',
              risk: 'Growing regulatory pressure; future disclosure requirements from buyers and government',
            },
            {
              id: 'env-14',
              text: 'Do you have basic pollution controls in place (e.g. effluent treatment, dust control, noise limits)?',
              risk: 'Neighbour complaints; environmental authority inspections; fines or shutdown orders',
            },
          ],
        },
      ],
    },
    {
      key: 'social',
      label: 'Xã hội',
      title: 'Social — Supply Chain SMEs',
      maxScore: 34,
      groups: [
        {
          topic: 'Tìm nguồn cung & kiểm soát chất lượng',
          priority: true,
          questions: [
            {
              id: 'soc-1',
              text: 'Do you maintain an approved supplier list with minimum qualification criteria?',
              risk: 'Poor-quality inputs lead to production failures, customer rejections, and recalls',
            },
            {
              id: 'soc-2',
              text: 'Do you inspect incoming materials or products for quality before accepting delivery?',
              risk: 'Defective inputs enter production undetected; returns and rework costs increase',
            },
            {
              id: 'soc-3',
              text: 'Do you have written contracts with your key suppliers covering quality expectations and penalties?',
              risk: 'No legal recourse when suppliers fail; no accountability for quality shortfalls',
            },
            {
              id: 'soc-4',
              text: 'Do you evaluate supplier performance at least annually?',
              risk: 'Underperforming suppliers retained by default; no systematic supply chain improvement',
            },
            {
              id: 'soc-5',
              text: 'Do you consider any basic ESG requirements when selecting suppliers (e.g. legal registration, basic labour compliance)?',
              risk: 'Exposure to reputational risk if supplier practices are exposed; future buyer audit risks',
            },
          ],
        },
        {
          topic: 'Quản lý vận hành',
          priority: true,
          questions: [
            {
              id: 'soc-6',
              text: 'Are key production or warehouse processes documented in standard operating procedures (SOPs)?',
              risk: 'Quality inconsistency; rework costs; high retraining cost when staff leave',
            },
            {
              id: 'soc-7',
              text: 'Do workers have clearly defined roles and responsibilities for each process step?',
              risk: 'Errors and gaps in accountability; confusion leads to product defects and accidents',
            },
            {
              id: 'soc-8',
              text: 'Do supervisors track productivity metrics (e.g. output per shift, defect rate, downtime) regularly?',
              risk: 'Productivity loss goes unnoticed; inability to identify bottlenecks or inefficiencies',
            },
            {
              id: 'soc-9',
              text: 'Is there a systematic process for identifying and addressing operational bottlenecks?',
              risk: 'Recurring problems persist indefinitely; staff frustration; output unreliable',
            },
          ],
        },
        {
          topic: 'Thực hành lao động & tuân thủ',
          priority: true,
          questions: [
            {
              id: 'soc-10',
              text: 'Do all workers have written employment contracts compliant with Vietnamese labour law?',
              risk: 'Labour inspection fines; disputes over pay/termination; reputational damage',
            },
            {
              id: 'soc-11',
              text: 'Are working hours, overtime, and rest days tracked and within legal limits?',
              risk: 'Overtime pay disputes; risk of labour violation findings during audits',
            },
            {
              id: 'soc-12',
              text: 'Do you have and enforce workplace health & safety procedures relevant to your operations?',
              risk: 'Workplace accidents; worker compensation liability; shutdown risk after incident',
            },
            {
              id: 'soc-13',
              text: 'Is there a formal process for workers to raise concerns or grievances without fear of retaliation?',
              risk: 'Unexpressed grievances escalate; sudden collective action or external complaints',
            },
            {
              id: 'soc-14',
              text: 'Do you conduct safety inductions for all new workers before they start work?',
              risk: 'New workers are highest-risk group for accidents; liability without documented induction',
            },
            {
              id: 'soc-15',
              text: 'Are social insurance (BHXH), health insurance (BHYT), and unemployment insurance contributions up to date for all workers?',
              risk: 'Legal penalties; worker grievances; discovery during labour inspections',
            },
          ],
        },
        {
          topic: 'Đa dạng & hòa nhập',
          questions: [
            {
              id: 'soc-16',
              text: 'Are hiring and promotion decisions based on skill and merit rather than personal characteristics?',
              risk: 'Legal discrimination risk; limited talent access; reputational damage if exposed',
            },
            {
              id: 'soc-17',
              text: 'Do female workers and migrant workers have equal access to training and advancement?',
              risk: 'Higher turnover among these groups; legal non-compliance risk; community relations',
            },
          ],
        },
      ],
    },
    {
      key: 'governance',
      label: 'Quản trị',
      title: 'Governance — Supply Chain SMEs',
      maxScore: 22,
      groups: [
        {
          topic: 'Tuân thủ dữ liệu',
          priority: true,
          questions: [
            {
              id: 'gov-1',
              text: 'Do you collect and store customer, supplier, or employee data? If yes, is access to this data restricted and secured?',
              risk: 'Data breach; violation of Vietnamese data protection law (Decree 13/2023); civil and regulatory liability',
            },
            {
              id: 'gov-2',
              text: 'Do you have basic data backup and recovery procedures in place?',
              risk: 'Permanent loss of business records from ransomware, hardware failure, or fire',
            },
            {
              id: 'gov-3',
              text: 'Are staff trained on basic data security practices (e.g. password management, not sharing credentials)?',
              risk: 'Internal breach; fraud; loss of business confidentiality',
            },
          ],
        },
        {
          topic: 'Quản lý rủi ro pháp lý & tuân thủ',
          priority: true,
          questions: [
            {
              id: 'gov-4',
              text: 'Are all your operating licences (business registration, environmental permit, fire safety) current and valid?',
              risk: 'Risk of shutdown orders; fines; inability to operate legally',
            },
            {
              id: 'gov-5',
              text: 'Do you have a way to track when permits, certifications, or regulatory filings are due?',
              risk: 'Lapses discovered only during inspections; reactive compliance more costly than proactive',
            },
            {
              id: 'gov-6',
              text: 'Do you conduct an internal compliance review at least once a year?',
              risk: 'Compliance gaps accumulate; penalties escalate when discovered',
            },
            {
              id: 'gov-7',
              text: 'Are you aware of the ESG-related regulations most likely to affect your sector in the next 2–3 years?',
              risk: 'Unprepared for incoming requirements; reactive changes more expensive and disruptive',
            },
          ],
        },
        {
          topic: 'Gắn kết khách hàng & các bên liên quan',
          questions: [
            {
              id: 'gov-8',
              text: 'Do you have a standard process to receive, respond to, and track customer complaints?',
              risk: 'Repeated complaints go unresolved; customer churn; negative word-of-mouth',
            },
            {
              id: 'gov-9',
              text: 'Do you communicate product quality, safety, or improvement efforts to customers or buyers?',
              risk: 'Missed opportunity to build buyer trust and reduce audit frequency',
            },
          ],
        },
        {
          topic: 'Chống tham nhũng & đạo đức',
          questions: [
            {
              id: 'gov-10',
              text: 'Do procurement staff understand what constitutes a conflict of interest, inappropriate gift, or facilitation payment?',
              risk: 'Procurement fraud; inflated input costs; legal exposure for the business',
            },
            {
              id: 'gov-11',
              text: 'Do you have a basic code of conduct communicated to all staff?',
              risk: 'Misconduct goes unchecked; disciplinary incidents harder to manage without documented standards',
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
      benefit: 'Reduce disposal costs and prevent regulatory fines from environmental authority',
    },
    {
      area: 'Tiêu thụ & hiệu quả năng lượng',
      pillar: 'Môi trường',
      benefit: 'Cut energy bills — often 10–30% of production costs with room to improve',
    },
    {
      area: 'Tìm nguồn cung & kiểm soát chất lượng',
      pillar: 'Xã hội',
      benefit: 'Prevent defective inputs; protect from supplier failure and recall risks',
    },
    {
      area: 'Quản lý vận hành',
      pillar: 'Xã hội',
      benefit: 'Reduce rework and downtime; standardise processes across the operation',
    },
    {
      area: 'Thực hành lao động & tuân thủ',
      pillar: 'Xã hội',
      benefit: 'Avoid labour inspection penalties and disputes; build workforce stability',
    },
    {
      area: 'Tuân thủ dữ liệu',
      pillar: 'Quản trị',
      benefit: 'Protect business and employee data; comply with Decree 13/2023',
    },
    {
      area: 'Quản lý rủi ro pháp lý',
      pillar: 'Quản trị',
      benefit: 'Ensure all operating licences and permits are current and tracked',
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
