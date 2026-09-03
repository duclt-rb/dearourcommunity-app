import { QuickScanConfig } from '../quick-scan.types';

/**
 * ESG Quick Scan — F&B / Service SMEs (ENGLISH edition).
 * Translated from EB_Module_A_ESG_QuickScan_DichVu_FnB_VI.xlsx (v1.0 · 2026).
 * Structure (ids, keys, maxScore, group order) MUST mirror quick-scan.data.vi.ts
 * exactly — enforced by data/parity.spec.ts.
 */
const FNB: QuickScanConfig = {
  id: 'esg-quick-scan-fnb',
  name: 'ESG Quick Scan — F&B Services',
  sector: 'SMEs in the F&B service sector',
  profileFields: [
    { id: 'business-name', label: 'Business name' },
    {
      id: 'fnb-type',
      label: 'F&B type',
      hint: 'E.g. Restaurant, Coffee shop, Fast-food chain, Eatery, Bar/Bistro',
    },
    { id: 'employees', label: 'Number of employees' },
    { id: 'outlets', label: 'Number of outlets / locations' },
    { id: 'years-operating', label: 'Years in operation' },
    { id: 'assessor', label: 'Assessment conducted by' },
    { id: 'role', label: 'Position / Department' },
    { id: 'assessment-date', label: 'Assessment date', type: 'date' },
    { id: 'esg-training', label: 'Have you attended any ESG training before?', type: 'boolean' },
    {
      id: 'esg-concern',
      label: 'Main ESG concern',
      hint: 'E.g. Waste, Energy, Staff turnover, Compliance',
    },
  ],
  pillars: [
    {
      key: 'environment',
      label: 'Environment',
      title: 'Environment — F&B Service SMEs',
      maxScore: 28,
      groups: [
        {
          topic: 'Waste Generation & Disposal',
          priority: true,
          questions: [
            {
              id: 'env-1',
              text: 'Do you separate waste by type (food waste, recyclables, general waste) at each outlet?',
              risk: 'Fines during inspections; rising disposal costs; image damage if customers see waste',
            },
            {
              id: 'env-2',
              text: 'Do you track the amount of food waste generated each week?',
              risk: 'Hidden cost leakage; waste cannot be reduced without measurement',
            },
            {
              id: 'env-3',
              text: 'Do you work with a licensed waste collection / recycling provider?',
              risk: 'Legal non-compliance; possible environmental penalties; negative brand image',
            },
            {
              id: 'env-4',
              text: 'Do you train frontline staff on proper waste separation & handling?',
              risk: 'Inconsistent practice contaminates waste streams and fails inspections',
            },
            {
              id: 'env-5',
              text: 'Have you reduced single-use plastics or packaging in the last 12 months?',
              risk: 'Customer expectations and regulations are rising; competitive disadvantage for late movers',
            },
          ],
        },
        {
          topic: 'Energy Consumption & Efficiency',
          priority: true,
          questions: [
            {
              id: 'env-6',
              text: 'Do you track monthly electricity bills per outlet and compare month over month?',
              risk: 'No visibility = no control; energy typically accounts for 15–25% of F&B operating costs',
            },
            {
              id: 'env-7',
              text: 'Do staff operating equipment (kitchen, refrigeration, air conditioning) follow switch-off / energy-saving rules?',
              risk: 'Utility waste; basic habits can save 10–20% of energy; electrical safety risk',
            },
            {
              id: 'env-8',
              text: 'Have you switched to LED lighting or energy-efficient equipment in the last 2 years?',
              risk: 'Higher long-term operating costs; missed savings that compound over time',
            },
            {
              id: 'env-9',
              text: 'Is someone responsible for monitoring & reporting energy consumption?',
              risk: 'No accountability means no improvement; energy issues persist',
            },
          ],
        },
        {
          topic: 'Water Use & Management',
          questions: [
            {
              id: 'env-10',
              text: 'Do you track monthly water consumption and compare it with previous periods?',
              risk: 'Leaks and overuse go undetected; water bills can be neither explained nor reduced',
            },
            {
              id: 'env-11',
              text: 'Do kitchen staff follow water-saving procedures (dishwashing, food prep)?',
              risk: 'Significant wasteful water consumption; cost overruns, especially at larger sites',
            },
            {
              id: 'env-12',
              text: 'Do you have a process to detect & fix leaks quickly?',
              risk: 'A single undetected leak can waste thousands of litres per month',
            },
          ],
        },
        {
          topic: 'Emissions Awareness',
          questions: [
            {
              id: 'env-13',
              text: 'Are you aware of the emission sources relevant to your business type (gas stoves, refrigerants, transport)?',
              risk: 'Blind spot for upcoming regulations and disclosure requests from customers / partners',
            },
            {
              id: 'env-14',
              text: 'Have you considered emission-reduction actions (fuel switching, delivery route optimization)?',
              risk: 'Missed first-mover advantage; higher compliance costs if left too late',
            },
          ],
        },
      ],
    },
    {
      key: 'social',
      label: 'Social',
      title: 'Social — F&B Service SMEs',
      maxScore: 30,
      groups: [
        {
          topic: 'Responsible Sourcing & Quality Control',
          priority: true,
          questions: [
            {
              id: 'soc-1',
              text: 'Do you have a preferred / approved supplier list with basic evaluation criteria?',
              risk: 'Inconsistent ingredient quality; food safety incidents; supply disruptions',
            },
            {
              id: 'soc-2',
              text: 'Do you check supplier hygiene, freshness & quality before accepting deliveries?',
              risk: 'Customer food poisoning, complaints, or food safety violations; possible forced closure',
            },
            {
              id: 'soc-3',
              text: 'Do you have at least written contracts or agreements with key suppliers?',
              risk: 'No legal protection when a supplier fails; no basis to claim compensation for quality issues',
            },
            {
              id: 'soc-4',
              text: 'Do you review suppliers periodically (e.g. annually) on quality & reliability?',
              risk: 'Locked into underperforming suppliers; no systematic supply chain improvement',
            },
          ],
        },
        {
          topic: 'Effective Operations Management',
          priority: true,
          questions: [
            {
              id: 'soc-5',
              text: 'Are key processes (food prep, service, area cleaning) documented as instructions — even simple ones?',
              risk: 'Inconsistent service quality; high retraining costs; errors during staff changes',
            },
            {
              id: 'soc-6',
              text: 'Do employees have clear role descriptions and know who is responsible for what?',
              risk: 'Confusion, duplication and service gaps; unclear accountability',
            },
            {
              id: 'soc-7',
              text: 'Do you have a way to detect when errors, delays or rework happen frequently?',
              risk: 'Avoidable costs quietly accumulate; staff frustration and turnover',
            },
            {
              id: 'soc-8',
              text: 'Do managers hold regular meetings / shift handovers (daily/weekly)?',
              risk: 'Poorly informed team; issues detected late; inconsistent service across shifts',
            },
          ],
        },
        {
          topic: 'Labor Practices & Compliance',
          priority: true,
          questions: [
            {
              id: 'soc-9',
              text: 'Do all employees have written labor contracts compliant with the Vietnam Labor Code?',
              risk: 'Labor dispute risk; fines during inspections; reputational damage',
            },
            {
              id: 'soc-10',
              text: 'Are working hours, overtime & leave days recorded and kept on file?',
              risk: 'Disputes over pay and leave; statutory fines; frustration and turnover',
            },
            {
              id: 'soc-11',
              text: 'Do you have basic occupational safety procedures for kitchen hazards, slips, or fire safety?',
              risk: 'Workplace accidents; legal liability; injury risk to staff and customers',
            },
            {
              id: 'soc-12',
              text: 'Is there a clear, accessible process for employees to raise concerns / internal complaints?',
              risk: 'Unresolved grievances escalate; external complaints; social media risk',
            },
            {
              id: 'soc-13',
              text: 'Do you run basic orientation / onboarding on safety & conduct for new employees?',
              risk: 'New staff unaware of risks; accidents or violations likely in the early period',
            },
          ],
        },
        {
          topic: 'Diversity & Inclusion',
          questions: [
            {
              id: 'soc-14',
              text: 'Are hiring decisions based on competence & fit rather than irrelevant personal characteristics?',
              risk: 'Legal discrimination risk; restricted talent pool; reputational damage',
            },
            {
              id: 'soc-15',
              text: 'Do all employees — regardless of age, gender, background — have equal access to training & promotion?',
              risk: 'High turnover among disadvantaged groups; missed talent development opportunities',
            },
          ],
        },
      ],
    },
    {
      key: 'governance',
      label: 'Governance',
      title: 'Governance — F&B Service SMEs',
      maxScore: 20,
      groups: [
        {
          topic: 'Data Compliance',
          priority: true,
          questions: [
            {
              id: 'gov-1',
              text: 'Do you collect customer data (names, contacts, payment information)? If so, is it stored securely?',
              risk: 'Data breach risk; violation of Vietnamese data protection regulations (Decree 13/2023); loss of customer trust',
            },
            {
              id: 'gov-2',
              text: 'Do you have a basic privacy policy communicated to customers?',
              risk: 'Legal non-compliance; fines; brand damage if a breach occurs',
            },
            {
              id: 'gov-3',
              text: 'Is access to sensitive business / customer data restricted to relevant staff?',
              risk: 'Internal data misuse; breaches hard to trace; customer data exposure',
            },
          ],
        },
        {
          topic: 'Legal Risk Management & Compliance',
          priority: true,
          questions: [
            {
              id: 'gov-4',
              text: 'Does the business hold all valid operating licenses (food safety, fire safety, business registration)?',
              risk: 'Risk of sudden closure; fines; inability to operate',
            },
            {
              id: 'gov-5',
              text: 'Is someone responsible for tracking license, certification and inspection deadlines?',
              risk: 'Expired compliance discovered only during inspections; reactive instead of proactive',
            },
            {
              id: 'gov-6',
              text: 'Do you run a basic internal compliance check at least once a year?',
              risk: 'Compliance gaps quietly accumulate; penalties escalate once discovered',
            },
          ],
        },
        {
          topic: 'Customer & Stakeholder Engagement',
          questions: [
            {
              id: 'gov-7',
              text: 'Do you have a standard way to collect & respond to customer feedback / complaints?',
              risk: 'Unhandled complaints; negative reviews pile up; customer loss',
            },
            {
              id: 'gov-8',
              text: 'Do you communicate ESG or quality improvements to customers (even informally)?',
              risk: 'Missed opportunity to build trust and brand loyalty',
            },
          ],
        },
        {
          topic: 'Anti-corruption & Ethics',
          questions: [
            {
              id: 'gov-9',
              text: 'Do employees understand what constitutes a conflict of interest or inappropriate gifts / payments?',
              risk: 'Procurement fraud; inflated costs; legal risk for the business owner',
            },
            {
              id: 'gov-10',
              text: 'Do you communicate basic conduct expectations to employees in writing?',
              risk: 'Misconduct goes unchecked; HR incidents hard to handle without written standards',
            },
          ],
        },
      ],
    },
  ],
  priorityFocus: [
    {
      id: 'waste',
      area: 'Waste Generation & Disposal',
      pillar: 'Environment',
      benefit: 'Cut waste disposal costs & avoid fines during inspections',
    },
    {
      id: 'energy',
      area: 'Energy Consumption & Efficiency',
      pillar: 'Environment',
      benefit: 'Lower utility bills — typically 10–20% savings',
    },
    {
      id: 'sourcing',
      area: 'Responsible Sourcing & Quality Control',
      pillar: 'Social',
      benefit: 'Prevent food safety incidents & supply disruptions',
    },
    {
      id: 'operations',
      area: 'Effective Operations Management',
      pillar: 'Social',
      benefit: 'Reduce errors & rework; improve service consistency',
    },
    {
      id: 'labor',
      area: 'Labor Practices & Compliance',
      pillar: 'Social',
      benefit: 'Avoid labor disputes & inspection fines',
    },
    {
      id: 'data',
      area: 'Data Compliance',
      pillar: 'Governance',
      benefit: 'Secure customer data & comply with Vietnamese regulations',
    },
    {
      id: 'legal',
      area: 'Legal Risk Management',
      pillar: 'Governance',
      benefit: 'Keep every license valid & tracked at all times',
    },
  ],
};

/**
 * ESG Quick Scan — Manufacturing SMEs (ENGLISH edition).
 * Translated from EB_Module_A_ESG_QuickScan_San_Xuat_VI.xlsx (v1.0, 2026).
 */
const SUPPLY: QuickScanConfig = {
  id: 'esg-quick-scan-supply-chain',
  name: 'ESG Quick Scan — Manufacturing',
  sector: 'SMEs in the manufacturing sector',
  profileFields: [
    { id: 'business-name', label: 'Business name' },
    {
      id: 'production-type',
      label: 'Production type',
      hint: 'E.g. Contract manufacturing/OEM, Own-brand manufacturing (OBM), Mixed',
    },
    {
      id: 'industry',
      label: 'Manufacturing industry / Product group',
      hint: 'E.g. Food processing, Textiles & garments, Electronics, Mechanical engineering, Plastics',
    },
    { id: 'employees', label: 'Number of employees' },
    { id: 'factories', label: 'Number of factories / production workshops' },
    { id: 'years-operating', label: 'Years in operation' },
    {
      id: 'exports',
      label: 'Do you export / supply exporting businesses?',
      hint: 'Yes / No / Planning to',
    },
    { id: 'supplier-count', label: 'Number of active suppliers (estimate)' },
    { id: 'assessor', label: 'Assessment conducted by' },
    { id: 'role', label: 'Position / Department' },
    { id: 'assessment-date', label: 'Assessment date', type: 'date' },
    {
      id: 'esg-concern',
      label: 'Main ESG concern',
      hint: 'E.g. Waste, Energy, Labor compliance, Supplier quality',
    },
  ],
  pillars: [
    {
      key: 'environment',
      label: 'Environment',
      title: 'Environment — Manufacturing SMEs',
      maxScore: 28,
      groups: [
        {
          topic: 'Production Waste & Disposal',
          priority: true,
          questions: [
            {
              id: 'env-1',
              text: 'Do you separate and categorize waste generated in production (scrap, packaging, hazardous waste)?',
              risk: 'Fines during environmental inspections; uncontrolled disposal costs; reputational risk',
            },
            {
              id: 'env-2',
              text: 'Do you track waste volumes monthly or per production run?',
              risk: 'Waste-reduction opportunities go unidentified; hidden cost leakage',
            },
            {
              id: 'env-3',
              text: 'Do you use a licensed collection/treatment provider for non-household waste?',
              risk: 'Legal liability for improper disposal; risk of operations being suspended',
            },
            {
              id: 'env-4',
              text: 'Have you identified your 3 largest waste sources and put reduction measures in place?',
              risk: 'Waste costs stay high; material losses accumulate over time',
            },
            {
              id: 'env-5',
              text: 'Are production / warehouse staff trained on waste handling procedures?',
              risk: 'Inconsistent separation leads to violations and contaminates recycling streams',
            },
          ],
        },
        {
          topic: 'Energy Consumption & Efficiency',
          priority: true,
          questions: [
            {
              id: 'env-6',
              text: 'Do you track monthly electricity and fuel consumption at your factory (or factories)?',
              risk: 'Energy typically accounts for 10–30% of production costs; no data = no control',
            },
            {
              id: 'env-7',
              text: 'Are machines and equipment switched off when not in use, and is this systematically enforced?',
              risk: 'Energy waste; shortened equipment life; missed cost-saving opportunities',
            },
            {
              id: 'env-8',
              text: 'Have you reviewed / upgraded energy efficiency (LED lighting, high-efficiency motors) in the last 3 years?',
              risk: 'Operating at higher cost than upgraded competitors; missed support incentives',
            },
            {
              id: 'env-9',
              text: 'Is someone assigned to monitor energy consumption and costs?',
              risk: 'No clear accountability; energy problems quietly escalate',
            },
          ],
        },
        {
          topic: 'Water Use & Management',
          questions: [
            {
              id: 'env-10',
              text: 'Do you track monthly water consumption and costs?',
              risk: 'Undetected leaks; excessive consumption goes unnoticed; sudden cost spikes',
            },
            {
              id: 'env-11',
              text: 'Do production / cleaning processes apply water-saving measures (recirculation, reuse)?',
              risk: 'High water bills; compliance risk in water-scarce areas; buyers may flag overuse',
            },
            {
              id: 'env-12',
              text: 'Do you know the water-use regulations that apply to your industry?',
              risk: 'Unintentional non-compliance; fines and permit risk',
            },
          ],
        },
        {
          topic: 'Emissions & Pollution',
          questions: [
            {
              id: 'env-13',
              text: 'Are you aware of the emission sources in your operations (generators, refrigerants, vehicles)?',
              risk: 'Growing regulatory pressure; future disclosure requirements from buyers and authorities',
            },
            {
              id: 'env-14',
              text: 'Do you have basic pollution controls (wastewater treatment, dust control, noise limits)?',
              risk: 'Community complaints; environmental inspections; fines or suspension of operations',
            },
          ],
        },
      ],
    },
    {
      key: 'social',
      label: 'Social',
      title: 'Social — Manufacturing SMEs',
      maxScore: 34,
      groups: [
        {
          topic: 'Responsible Sourcing & Quality Control',
          priority: true,
          questions: [
            {
              id: 'soc-1',
              text: 'Do you have an approved supplier list with minimum criteria?',
              risk: 'Poor-quality inputs cause production defects, returns and recalls',
            },
            {
              id: 'soc-2',
              text: 'Do you inspect incoming materials / goods for quality before warehousing?',
              risk: 'Defective inputs slip into production undetected; higher return and rework costs',
            },
            {
              id: 'soc-3',
              text: 'Do you have written contracts with key suppliers covering quality and remedies?',
              risk: 'No legal basis when a supplier fails; quality accountability cannot be assigned',
            },
            {
              id: 'soc-4',
              text: 'Do you evaluate supplier performance at least once a year?',
              risk: 'Weak suppliers retained by default; no systematic supply chain improvement',
            },
            {
              id: 'soc-5',
              text: 'Do you consider basic ESG requirements when selecting suppliers (legal registration, basic labor compliance)?',
              risk: 'Reputational risk if supplier practices are exposed; future buyer audit risk',
            },
          ],
        },
        {
          topic: 'Effective Production Management',
          priority: true,
          questions: [
            {
              id: 'soc-6',
              text: 'Are key production / warehouse processes documented as standard operating procedures (SOPs)?',
              risk: 'Inconsistent quality; rework costs; high retraining costs when staff leave',
            },
            {
              id: 'soc-7',
              text: 'Do workers have clear roles & responsibilities for each production stage?',
              risk: 'Errors and accountability gaps; confusion leads to defective products and accidents',
            },
            {
              id: 'soc-8',
              text: 'Do managers regularly track productivity metrics (output per shift, defect rate, downtime)?',
              risk: 'Productivity losses go undetected; bottlenecks and waste cannot be identified',
            },
            {
              id: 'soc-9',
              text: 'Is there a systematic process to detect and resolve operational bottlenecks?',
              risk: 'Recurring problems persist; staff frustration; unstable output',
            },
          ],
        },
        {
          topic: 'Labor Practices & Compliance',
          priority: true,
          questions: [
            {
              id: 'soc-10',
              text: 'Do all workers have written labor contracts compliant with the Vietnam Labor Code?',
              risk: 'Fines during labor inspections; pay/termination disputes; reputational damage',
            },
            {
              id: 'soc-11',
              text: 'Are working hours, overtime and rest days recorded and within legal limits?',
              risk: 'Overtime pay disputes; risk of labor violation findings in audits',
            },
            {
              id: 'soc-12',
              text: 'Do you have and enforce occupational health & safety (OHS) procedures suited to production?',
              risk: 'Workplace accidents; compensation liability; suspension risk after incidents',
            },
            {
              id: 'soc-13',
              text: 'Is there a formal process for workers to raise concerns / grievances without fear of retaliation?',
              risk: 'Unresolved grievances escalate; risk of collective action or external complaints',
            },
            {
              id: 'soc-14',
              text: 'Do you provide safety training for new workers before they start work?',
              risk: 'New workers face the highest accident risk; legal liability without training records',
            },
            {
              id: 'soc-15',
              text: 'Are social, health and unemployment insurance contributions paid in full for all workers?',
              risk: 'Statutory fines; worker complaints; detection during labor inspections',
            },
          ],
        },
        {
          topic: 'Diversity & Inclusion',
          questions: [
            {
              id: 'soc-16',
              text: 'Are hiring and promotion decisions based on competence rather than personal characteristics?',
              risk: 'Legal discrimination risk; limited access to talent; reputational damage if exposed',
            },
            {
              id: 'soc-17',
              text: 'Do female and migrant workers have equal access to training & promotion?',
              risk: 'High turnover in these groups; non-compliance risk; strained community relations',
            },
          ],
        },
      ],
    },
    {
      key: 'governance',
      label: 'Governance',
      title: 'Governance — Manufacturing SMEs',
      maxScore: 22,
      groups: [
        {
          topic: 'Data Compliance',
          priority: true,
          questions: [
            {
              id: 'gov-1',
              text: 'Do you collect & store customer, supplier or employee data? If so, is access restricted & secured?',
              risk: 'Data breaches; violation of Decree 13/2023 on personal data protection; civil and administrative liability',
            },
            {
              id: 'gov-2',
              text: 'Do you have basic data backup & recovery procedures?',
              risk: 'Permanent loss of business records due to malware, hardware failure or fire',
            },
            {
              id: 'gov-3',
              text: 'Are employees trained on basic data security (password management, no account sharing)?',
              risk: 'Internal leaks; fraud; loss of trade secrets',
            },
          ],
        },
        {
          topic: 'Legal Risk Management & Compliance',
          priority: true,
          questions: [
            {
              id: 'gov-4',
              text: 'Are all operating licenses (business registration, environmental permit, fire safety) currently valid?',
              risk: 'Suspension risk; fines; not legally qualified to operate',
            },
            {
              id: 'gov-5',
              text: 'Do you have a way to track expiry dates of licenses, certifications and legal documents?',
              risk: 'Expiries discovered only during inspections; reactive compliance costs more than proactive',
            },
            {
              id: 'gov-6',
              text: 'Do you conduct an internal compliance review at least once a year?',
              risk: 'Compliance gaps accumulate; penalties escalate once discovered',
            },
            {
              id: 'gov-7',
              text: 'Do you follow ESG regulations likely to affect your industry in the next 2–3 years?',
              risk: 'Unprepared for upcoming requirements; reactive change is costlier and more disruptive',
            },
          ],
        },
        {
          topic: 'Customer & Stakeholder Engagement',
          questions: [
            {
              id: 'gov-8',
              text: 'Do you have a standard process to receive, respond to & track customer complaints?',
              risk: 'Repeated complaints go unaddressed; customer loss; negative word of mouth',
            },
            {
              id: 'gov-9',
              text: 'Do you communicate quality, product safety or improvement efforts to customers / buyers?',
              risk: 'Missed opportunity to build buyer trust and reduce audit frequency',
            },
          ],
        },
        {
          topic: 'Anti-corruption & Ethics',
          questions: [
            {
              id: 'gov-10',
              text: 'Do procurement staff understand conflicts of interest, inappropriate gifts and facilitation payments?',
              risk: 'Procurement fraud; inflated input costs; legal risk for the business',
            },
            {
              id: 'gov-11',
              text: 'Do you have a basic code of conduct communicated to all employees?',
              risk: 'Misconduct goes unchecked; disciplinary action hard without written standards',
            },
          ],
        },
      ],
    },
  ],
  priorityFocus: [
    {
      id: 'waste',
      area: 'Production Waste & Disposal',
      pillar: 'Environment',
      benefit: 'Cut disposal costs and avoid fines from environmental authorities',
    },
    {
      id: 'energy',
      area: 'Energy Consumption & Efficiency',
      pillar: 'Environment',
      benefit: 'Cut energy bills — typically 10–30% of production costs',
    },
    {
      id: 'sourcing',
      area: 'Responsible Sourcing & Quality Control',
      pillar: 'Social',
      benefit: 'Block defective inputs; avoid supplier failure and product recall risk',
    },
    {
      id: 'operations',
      area: 'Effective Production Management',
      pillar: 'Social',
      benefit: 'Reduce rework & downtime; standardize processes across the factory',
    },
    {
      id: 'labor',
      area: 'Labor Practices & Compliance',
      pillar: 'Social',
      benefit: 'Avoid labor inspection fines & disputes; stabilize the workforce',
    },
    {
      id: 'data',
      area: 'Data Compliance',
      pillar: 'Governance',
      benefit: 'Protect business & employee data; comply with Decree 13/2023',
    },
    {
      id: 'legal',
      area: 'Legal Risk Management',
      pillar: 'Governance',
      benefit: 'Keep every license valid and tracked at all times',
    },
  ],
};

/** ENGLISH edition — structure mirrors QUICK_SCANS_VI (see data/parity.spec.ts). */
export const QUICK_SCANS_EN: Record<string, QuickScanConfig> = {
  [FNB.id]: FNB,
  [SUPPLY.id]: SUPPLY,
};
