import {
  ActionItem,
  AssessmentGroup,
  DataGovToolkitConfig,
  DataMapColumn,
  IncidentStep,
  LegalItem,
  ReviewMilestone,
} from '../datagov.types';
import { mkGroup } from './mk-group';

// ── Shared between both sectors (identical to the source file) ──
// NOTE: structure (ids, keys, tuple count & order) must stay identical to datagov.data.vi.ts —
// question ids derive from tuple order. Guarded by data/parity.spec.ts.

const DATA_MAP_COLUMNS: DataMapColumn[] = [
  { key: 'source', label: 'Collection source' },
  { key: 'purpose', label: 'Processing purpose' },
  { key: 'legal-basis', label: 'Legal basis' },
  { key: 'sensitive', label: 'Sensitive?' },
  { key: 'storage', label: 'Storage location' },
  { key: 'access', label: 'Who has access' },
  { key: 'retention', label: 'Retention period' },
  { key: 'sharing', label: 'Sharing / Third parties' },
  { key: 'transfer', label: 'Transferred abroad?' },
];

const DATA_MAP_NOTE =
  'Note: biometric, health, image, account, behavioural/location data etc. are SENSITIVE DATA — they require separate consent & enhanced protection (PDPL).';

const RISK_SUGGESTIONS: Record<string, string> = {
  collect: 'Foundation: collect only necessary data, with valid consent',
  transparency: 'Need a privacy policy & a legal basis for every processing activity',
  security: 'Role-based access control, encrypt sensitive data, back up',
  rights: 'Set up a process to fulfil data subject rights',
  thirdparty: 'Sign DPAs with third parties; review cross-border data transfers',
  governance: 'Assign an owner; 72-hour incident process; keep records',
};

const RISK_NOTE =
  'SME note: micro/small enterprises & startups are EXEMPT from appointing a DPO and conducting DPIA/CTIA until 2031 — UNLESS they process sensitive data or large volumes. All remaining obligations (consent, security, 72-hour notification, data subject rights, ban on buying/selling data) apply immediately.';

const INCIDENT_STEPS: IncidentStep[] = [
  {
    id: 'i1',
    title: '1. Detect & record',
    desc: 'Record when the incident was detected, by whom, and an initial description.',
  },
  {
    id: 'i2',
    title: '2. Contain',
    desc: 'Isolate affected systems/accounts; stop further data exposure.',
  },
  {
    id: 'i3',
    title: '3. Assess severity',
    desc: 'Type & volume of data affected; whether sensitive data is involved; risk of harm to data subjects.',
  },
  {
    id: 'i4',
    title: '4. Notify the authority (≤72 hours)',
    desc: 'If the incident may cause harm, notify the competent authority (Ministry of Public Security) within 72 hours of detection.',
  },
  {
    id: 'i5',
    title: '5. Notify data subjects',
    desc: 'When there is a high risk of harm, notify the affected individuals & guide them on protecting themselves.',
  },
  {
    id: 'i6',
    title: '6. Remediate',
    desc: 'Patch the vulnerability, restore data from backups, change passwords/access keys.',
  },
  {
    id: 'i7',
    title: '7. Document & keep records',
    desc: 'Compile a complete incident file (timeline, handling, notifications) to serve inspections & prove compliance.',
  },
  {
    id: 'i8',
    title: '8. Learn lessons',
    desc: 'Analyse the root cause; update processes, access rights & training to prevent recurrence.',
  },
];

const LEGAL_ITEMS: LegalItem[] = [
  { id: 'l1', label: 'Privacy policy — review & update', frequency: 'Annually' },
  { id: 'l2', label: 'Consent mechanism & forms — review', frequency: 'Annually' },
  { id: 'l3', label: 'Data map (RoPA) — update', frequency: 'Every 6 months' },
  {
    id: 'l4',
    label: 'Personal data processing impact assessment (DPIA) — if applicable',
    frequency: 'For each new activity',
  },
  {
    id: 'l5',
    label: 'Cross-border data transfer impact assessment (CTIA)',
    frequency: 'When transferring data',
  },
  {
    id: 'l6',
    label: 'Data processing agreements (DPA) with third parties — review',
    frequency: 'Annually',
  },
  {
    id: 'l7',
    label: 'Review & delete data past its retention period',
    frequency: 'Every 6 months',
  },
  { id: 'l8', label: 'Incident response drill (72 hours)', frequency: 'Annually' },
  { id: 'l9', label: 'Staff training on personal data protection', frequency: 'Annually' },
  {
    id: 'l10',
    label: 'Review the person/unit in charge of data protection (DPO)',
    frequency: 'Annually',
  },
  { id: 'l11', label: 'Business licence & sector licences', frequency: 'By due date' },
  {
    id: 'l12',
    label: 'Cybersecurity: backups, access control, security updates',
    frequency: 'Ongoing',
  },
];

const MILESTONES: ReviewMilestone[] = [
  {
    id: 'm30',
    title: '30 days',
    focus: 'Foundation: data map, consent & policy, 72-hour incident process',
  },
  {
    id: 'm60',
    title: '60 days',
    focus: 'Systems: access control & security, third-party DPAs, determine DPO/DPIA',
  },
  {
    id: 'm90',
    title: '90 days',
    focus: 'Standardise: training, data deletion schedule, periodic compliance review',
  },
];

const INTRO_LEAD =
  "The Package B toolkit helps businesses move from 'worrying about data law' to 'knowing what data we hold and what to do to comply' — mapping, assessing, responding to incidents, tracking and acting. Co-designed with Data Protectify (data protection & compliance experts) for SMEs.";

// ════════════════════════ MANUFACTURING ════════════════════════

const SAN_XUAT_ASSESSMENT: AssessmentGroup[] = [
  mkGroup('collect', 'Collection & Consent', [
    [
      'Has the business clearly identified which types of personal data it collects (employees, candidates, suppliers, B2B customers)?',
      'HIGH — Not knowing what data you hold = unable to protect it',
      'PDPL 2025 (transparency)',
    ],
    [
      'Does the business collect only the data genuinely needed for a specific purpose (data minimisation)?',
      'HIGH — Over-collection increases risk & liability',
      'PDPL (data minimisation)',
    ],
    [
      'Does the business obtain clear consent from employees/candidates before collecting & processing their data?',
      'SEVERE — Processing without a legal basis is a violation',
      'PDPL (consent)',
    ],
    [
      'For biometric time-keeping data (fingerprint/face), does the business treat it as SENSITIVE data with separate consent?',
      'SEVERE — Biometric data is sensitive data and requires higher protection',
      'PDPL (sensitive data)',
    ],
    [
      'Does the business inform individuals of the processing purpose at the time of collection?',
      'HIGH — Covert collection violates the transparency principle',
      'PDPL (transparency)',
    ],
    [
      'Does the business have a mechanism for individuals to withdraw their consent?',
      'HIGH — Not allowing consent withdrawal violates data subject rights',
      'PDPL (data subject rights)',
    ],
    [
      'Does the business apply enhanced protection when processing data of special groups (children, persons with limited capacity)?',
      'HIGH — Special groups receive enhanced protection',
      'PDPL (special groups)',
    ],
  ]),
  mkGroup('transparency', 'Legal Basis & Transparency', [
    [
      'Does the business have a written, easily accessible privacy policy?',
      'HIGH — No policy = no transparency & no compliance foundation',
      'PDPL (transparency)',
    ],
    [
      'Does every data processing activity have a clear legal basis (consent / contract / legal obligation)?',
      'SEVERE — Processing without a legal basis is a violation',
      'PDPL (processing basis)',
    ],
    [
      'Does the business state a clear retention period for each purpose?',
      'MEDIUM — Indefinite retention violates the storage limitation principle',
      'PDPL (storage limitation)',
    ],
    [
      'Does the business use data only for the notified purposes (never for other purposes)?',
      'HIGH — Using data for the wrong purpose is a violation',
      'PDPL (purpose limitation)',
    ],
    [
      'Does the business review & update its privacy policy periodically?',
      'MEDIUM — An outdated policy does not reflect actual processing',
      'Continuous improvement',
    ],
    [
      'Does the business keep data accurate & updated when needed?',
      'MEDIUM — Inaccurate data causes wrong decisions & complaints',
      'PDPL (accuracy)',
    ],
    [
      'The business does NOT buy/sell personal data in any form, correct?',
      'SEVERE — Buying/selling personal data is completely prohibited; fines up to 10× the violation revenue or VND 3 billion',
      'PDPL (ban on data trading)',
    ],
  ]),
  mkGroup('security', 'Security & Storage', [
    [
      'Is access to personal data restricted by role (only those who need it can access it)?',
      'SEVERE — Unrestricted access = internal leak risk',
      'PDPL (protection measures); ISO 27001',
    ],
    [
      'Is sensitive data (biometrics, employee health) encrypted / given enhanced protection?',
      'SEVERE — Sensitive data requires stronger measures',
      'PDPL; ISO 27001/27701',
    ],
    [
      'Does the business back up data & have a recovery process?',
      'HIGH — Permanent data loss from malware/hardware failure',
      'ISO 27001 (backup)',
    ],
    [
      'Are employees trained on security (strong passwords, no account sharing, phishing awareness)?',
      'HIGH — People are the biggest weakness',
      'ISO 27001 (awareness)',
    ],
    [
      'Are paper records & storage devices locked away / physically protected?',
      'MEDIUM — Lost paper files & USB drives are breaches too',
      'ISO 27001 (physical security)',
    ],
    [
      'Does the business have a process to securely delete/destroy data past its retention period?',
      'HIGH — Keeping data past its term increases risk & violations',
      'PDPL (storage limitation)',
    ],
    [
      'Are IT systems patched & protected (anti-malware, firewall)?',
      'HIGH — Outdated systems are easy to attack',
      'Cybersecurity Law 2018',
    ],
  ]),
  mkGroup('rights', 'Data Subject Rights', [
    [
      'Does the business have a process to receive & handle requests from individuals (view, correct, delete data)?',
      'HIGH — Failing to fulfil data subject rights is a violation',
      'PDPL (data subject rights)',
    ],
    [
      'Can individuals easily request data deletion / withdraw consent?',
      'HIGH — Obstructing the right to deletion is a violation',
      'PDPL (right to deletion)',
    ],
    [
      'Does the business respond to data subject requests within a reasonable time?',
      'MEDIUM — Delays cause complaints & violations',
      'PDPL',
    ],
    [
      'Can the business provide individuals with a copy of their data on request?',
      'MEDIUM — The data subject right of access',
      'PDPL',
    ],
    [
      'Does the business have a mechanism to receive complaints about personal data?',
      'MEDIUM — Complaints without an official channel escalate externally',
      'PDPL',
    ],
    [
      'Does the business record & keep a trail of how data subject requests are handled?',
      'LOW — Without records it is hard to prove compliance',
      'Accountability',
    ],
  ]),
  mkGroup('thirdparty', 'Third Parties & Data Transfers', [
    [
      'Does the business have data processing agreements (DPA) with third parties processing data on its behalf (cloud, HR software, time-keeping)?',
      'SEVERE — When a third party fails, the business is still liable',
      'PDPL (processors)',
    ],
    [
      'Does the business assess the data protection capability of suppliers/partners before sharing?',
      'HIGH — Sharing with weak parties = leak risk',
      'ISO 27001 (supplier management)',
    ],
    [
      'Does the business know whether its data is stored/processed abroad (foreign cloud)?',
      'HIGH — Transferring data abroad carries its own requirements',
      'PDPL (cross-border transfer)',
    ],
    [
      'If data is transferred abroad, does the business understand the transfer impact assessment (CTIA) requirement?',
      'HIGH — Cross-border transfer violations are fined up to 5% of revenue',
      'PDPL; Decree 356/2025',
    ],
    [
      'Does the business bind third parties to use data only for the agreed purpose & keep it secure?',
      'HIGH — Third parties misusing data is a major risk',
      'PDPL (processors)',
    ],
    [
      'Does the business periodically review the list of third parties it shares data with?',
      'LOW — An outdated list = sharing out of control',
      'Data governance',
    ],
  ]),
  mkGroup('governance', 'Governance, DPO & Accountability', [
    [
      'Does the business have a person/unit responsible for personal data protection (in-house or outsourced DPO)?',
      'HIGH — Nobody in charge = no compliance',
      'PDPL (data protection personnel)',
    ],
    [
      'Has the business determined whether it must appoint a DPO / conduct a DPIA (processing sensitive or large-volume data)?',
      'HIGH — Small businesses are exempt from DPO/DPIA until 2031 UNLESS they process sensitive/large-volume data',
      'PDPL; SME exemption (Decree 356/2025)',
    ],
    [
      'Does the business have a data incident response process & know it must notify within 72 hours?',
      'SEVERE — No process = missing the 72-hour notification deadline',
      'PDPL (72-hour notification)',
    ],
    [
      'Does the business train employees periodically on personal data protection?',
      'HIGH — Unaware staff are the top risk',
      'PDPL (training)',
    ],
    [
      'Does the business create & keep records of its data processing activities (to prove compliance)?',
      'HIGH — No records = nothing to show when inspected',
      'PDPL (accountability)',
    ],
    [
      'Does the business review data protection compliance periodically (internally or with experts)?',
      'MEDIUM — Compliance gaps accumulate',
      'Continuous improvement',
    ],
    [
      'Does the business know the PDPL fine levels (up to VND 3 billion, or 5% of revenue for transfer violations) to gauge its risk?',
      'MEDIUM — Underestimating the risk = not prioritising resources',
      'PDPL (sanctions)',
    ],
  ]),
];

const SAN_XUAT_ACTIONS: ActionItem[] = [
  {
    id: 'a1',
    priority: 'critical',
    area: 'Data map',
    action:
      'Build the Data Map: list all personal data being collected (employees, biometrics, CCTV, suppliers), where it is stored, who has access, retention periods.',
    deadline: 'Day 30',
    measure: 'Complete data map',
  },
  {
    id: 'a2',
    priority: 'critical',
    area: 'Consent & sensitive data',
    action:
      'Review consent mechanisms — especially biometric time-keeping & employee health data (separate consent, enhanced protection).',
    deadline: 'Day 45',
    measure: 'Valid consent in place for sensitive data',
  },
  {
    id: 'a3',
    priority: 'critical',
    area: 'Incident response',
    action: 'Establish an incident response process (72-hour notification) & assign an owner.',
    deadline: 'Day 30',
    measure: 'Incident process issued & owner assigned',
  },
  {
    id: 'a4',
    priority: 'important',
    area: 'Security',
    action: 'Set role-based access control; encrypt/back up sensitive data.',
    deadline: 'Day 60',
    measure: 'Access control & encryption for sensitive data',
  },
  {
    id: 'a5',
    priority: 'important',
    area: 'Third parties',
    action:
      'Review & sign data processing agreements (DPA) with cloud, HR software and time-keeping providers.',
    deadline: 'Day 60',
    measure: 'DPAs in place with key processors',
  },
  {
    id: 'a6',
    priority: 'important',
    area: 'DPO/DPIA',
    action:
      'Determine DPO/DPIA obligations: check whether you process sensitive/large-volume data (affects the SME exemption).',
    deadline: 'Day 60',
    measure: 'Clear on whether a DPO/DPIA is required',
  },
  {
    id: 'a7',
    priority: 'quickwin',
    area: 'Training',
    action: 'Train HR staff & managers on personal data protection and handling employee data.',
    deadline: 'Day 30',
    measure: 'First training session completed',
  },
  {
    id: 'a8',
    priority: 'quickwin',
    area: 'Retention',
    action:
      'Set up a deletion schedule for data past its retention period (old files, CCTV, candidates).',
    deadline: 'Day 14',
    measure: 'Data deletion schedule in effect',
  },
  {
    id: 'a9',
    priority: 'quickwin',
    area: 'Ownership',
    action: 'Appoint a person in charge of data protection (in-house or outsourced).',
    deadline: 'Day 14',
    measure: 'Owner clearly assigned',
  },
];

const SAN_XUAT: DataGovToolkitConfig = {
  id: 'datagov-toolkit-san-xuat',
  name: 'Data Governance & Personal Data Protection — Manufacturing',
  sector: 'Data Governance · Manufacturing',
  introLead: INTRO_LEAD,
  dataMapColumns: DATA_MAP_COLUMNS,
  dataMapRows: [
    { id: 'd1', label: 'Employee records (name, ID card, salary, social insurance)' },
    { id: 'd2', label: 'Employment contracts & HR files' },
    { id: 'd3', label: 'Biometric time-keeping data (fingerprint/face)', sensitive: true },
    { id: 'd4', label: 'Employee health records / health check files', sensitive: true },
    { id: 'd5', label: 'Job applicant records' },
    { id: 'd6', label: 'Supplier / contractor contact data' },
    { id: 'd7', label: 'B2B customer contact data' },
    { id: 'd8', label: 'CCTV surveillance footage', sensitive: true },
    { id: 'd9', label: 'Factory visitor / entry-exit data' },
    { id: 'd10', label: 'Marketing / B2B contact data' },
  ],
  dataMapNote: DATA_MAP_NOTE,
  assessmentGroups: SAN_XUAT_ASSESSMENT,
  riskSuggestions: RISK_SUGGESTIONS,
  riskNote: RISK_NOTE,
  incidentSteps: INCIDENT_STEPS,
  legalItems: LEGAL_ITEMS,
  actions: SAN_XUAT_ACTIONS,
  milestones: MILESTONES,
};

// ════════════════════════ F&B SERVICES ════════════════════════

const FNB_ASSESSMENT: AssessmentGroup[] = [
  mkGroup('collect', 'Collection & Consent', [
    [
      'Has the business clearly identified which types of personal data it collects (customers, bookings, loyalty, payments, employees)?',
      'HIGH — Not knowing what data you hold = unable to protect it',
      'PDPL 2025 (transparency)',
    ],
    [
      'Does the business collect only the data genuinely needed (data minimisation)?',
      'HIGH — Over-collection increases risk & liability',
      'PDPL (data minimisation)',
    ],
    [
      'Does the business obtain clear consent when collecting customer data (loyalty sign-up, wifi, marketing)?',
      'SEVERE — Processing without a legal basis is a violation',
      'PDPL (consent)',
    ],
    [
      'When sending marketing (SMS/email/Zalo), does the business have customer consent & an opt-out mechanism?',
      'SEVERE — Marketing without consent violates the PDPL & anti-spam regulations',
      'PDPL; Decree 91/2020 (anti-spam)',
    ],
    [
      'Does the business state the processing purpose at the time of collection (loyalty forms, bookings)?',
      'HIGH — Covert collection violates the transparency principle',
      'PDPL (transparency)',
    ],
    [
      'Does the business have a mechanism for customers to withdraw consent (leave loyalty, stop marketing)?',
      'HIGH — Not allowing consent withdrawal violates data subject rights',
      'PDPL (data subject rights)',
    ],
    [
      'If collecting data involving children (family combos, events), does the business apply enhanced protection?',
      'HIGH — Special groups receive enhanced protection',
      'PDPL (special groups)',
    ],
  ]),
  mkGroup('transparency', 'Legal Basis & Transparency', [
    [
      'Does the business have an easily accessible privacy policy (at the counter / website / app)?',
      'HIGH — No policy = no transparency & no compliance foundation',
      'PDPL (transparency)',
    ],
    [
      'Does every processing activity (loyalty, bookings, cameras, marketing) have a clear legal basis?',
      'SEVERE — Processing without a legal basis is a violation',
      'PDPL (processing basis)',
    ],
    [
      'Does the business state a clear retention period for customer data for each purpose?',
      'MEDIUM — Indefinite retention violates the storage limitation principle',
      'PDPL (storage limitation)',
    ],
    [
      'Does the business use customer data only for the notified purposes?',
      'HIGH — Using data for the wrong purpose is a violation',
      'PDPL (purpose limitation)',
    ],
    [
      'Does the business review & update its privacy policy periodically?',
      'MEDIUM — An outdated policy does not reflect actual processing',
      'Continuous improvement',
    ],
    [
      'Does the business keep customer data accurate & allow updates?',
      'MEDIUM — Inaccurate data causes wrong decisions & complaints',
      'PDPL (accuracy)',
    ],
    [
      'The business does NOT buy/sell/exchange customer lists, correct?',
      'SEVERE — Buying/selling personal data is prohibited; fines up to 10× the violation revenue or VND 3 billion',
      'PDPL (ban on data trading)',
    ],
  ]),
  mkGroup('security', 'Security & Storage', [
    [
      'Is access to customer data restricted by role (cashier / manager)?',
      'SEVERE — Unrestricted access = internal leak risk',
      'PDPL (protection measures); ISO 27001',
    ],
    [
      'Is payment/card data handled securely (no unauthorised storage)?',
      'SEVERE — Storing card data improperly carries very high risk',
      'ISO 27001; payment security standards',
    ],
    [
      'Does the business back up data (POS / loyalty) & have a recovery process?',
      'HIGH — Permanent data loss from malware/hardware failure',
      'ISO 27001 (backup)',
    ],
    [
      'Are employees trained on security (POS passwords, no account sharing)?',
      'HIGH — People are the biggest weakness',
      'ISO 27001 (awareness)',
    ],
    [
      'Are surveillance cameras (CCTV) disclosed to customers & is footage stored/accessed under control?',
      'HIGH — Customer images are personal data; uncontrolled CCTV is a risk',
      'PDPL (image data)',
    ],
    [
      'Does the business have a process to delete expired customer data (CCTV, old loyalty)?',
      'HIGH — Keeping data past its term increases risk & violations',
      'PDPL (storage limitation)',
    ],
    [
      'Are POS / wifi / app systems kept security-updated & protected?',
      'HIGH — Outdated systems are easy to attack',
      'Cybersecurity Law 2018',
    ],
  ]),
  mkGroup('rights', 'Data Subject Rights', [
    [
      'Does the business have a process for customers to request viewing / correcting / deleting their data?',
      'HIGH — Failing to fulfil data subject rights is a violation',
      'PDPL (data subject rights)',
    ],
    [
      'Can customers easily leave the loyalty programme / stop marketing / have their data deleted?',
      'HIGH — Obstructing the right to deletion is a violation',
      'PDPL (right to deletion)',
    ],
    [
      'Does the business respond to customer requests within a reasonable time?',
      'MEDIUM — Delays cause complaints & violations',
      'PDPL',
    ],
    [
      'Can the business provide a copy of their data when customers request it?',
      'MEDIUM — The data subject right of access',
      'PDPL',
    ],
    [
      'Does the business have a channel to receive complaints about personal data?',
      'MEDIUM — Complaints without an official channel escalate externally',
      'PDPL',
    ],
    [
      'Does the business keep a trail of how customer requests are handled?',
      'LOW — Without records it is hard to prove compliance',
      'Accountability',
    ],
  ]),
  mkGroup('thirdparty', 'Third Parties & Data Transfers', [
    [
      'Does the business have data processing agreements (DPA) with third parties (POS, loyalty software, delivery apps, cloud)?',
      'SEVERE — When a third party fails, the business is still liable',
      'PDPL (processors)',
    ],
    [
      'Does the business assess the security capability of platforms/partners before sharing customer data?',
      'HIGH — Sharing with weak parties = leak risk',
      'ISO 27001 (supplier management)',
    ],
    [
      'When using delivery apps (GrabFood/ShopeeFood/Be), is the business clear on who owns/may use customer data?',
      'HIGH — Grey area over customer data rights on platforms',
      'PDPL (data sharing)',
    ],
    [
      'Does the business know whether customer data is stored/processed abroad (foreign cloud/apps)?',
      'HIGH — Transferring data abroad carries its own requirements',
      'PDPL (cross-border transfer)',
    ],
    [
      'If data is transferred abroad, does the business understand the impact assessment (CTIA) requirement?',
      'HIGH — Data transfer violations are fined up to 5% of revenue',
      'PDPL; Decree 356/2025',
    ],
    [
      'Does the business periodically review the third parties it shares customer data with?',
      'LOW — An outdated list = sharing out of control',
      'Data governance',
    ],
  ]),
  mkGroup('governance', 'Governance, DPO & Accountability', [
    [
      'Does the business have a person responsible for personal data protection (in-house or outsourced)?',
      'HIGH — Nobody in charge = no compliance',
      'PDPL (data protection personnel)',
    ],
    [
      'Has the business determined whether it must have a DPO/DPIA (sensitive/large-volume data)?',
      'HIGH — Small businesses are exempt from DPO/DPIA until 2031 UNLESS they process sensitive/large-volume data',
      'PDPL; SME exemption (Decree 356/2025)',
    ],
    [
      'Does the business have an incident response process & know it must notify within 72 hours?',
      'SEVERE — No process = missing the 72-hour notification deadline',
      'PDPL (72-hour notification)',
    ],
    [
      'Does the business train employees periodically on protecting customer data?',
      'HIGH — Unaware staff are the top risk',
      'PDPL (training)',
    ],
    [
      'Does the business keep records of its data processing activities to prove compliance?',
      'HIGH — No records = nothing to show when inspected',
      'PDPL (accountability)',
    ],
    [
      'Does the business review data protection compliance periodically?',
      'MEDIUM — Compliance gaps accumulate',
      'Continuous improvement',
    ],
    [
      'Does the business know the PDPL fine levels (up to VND 3 billion / 5% of revenue) to gauge its risk?',
      'MEDIUM — Underestimating the risk = not prioritising resources',
      'PDPL (sanctions)',
    ],
  ]),
];

const FNB_ACTIONS: ActionItem[] = [
  {
    id: 'a1',
    priority: 'critical',
    area: 'Data map',
    action:
      'Build the Data Map: list all personal data being collected (customers, loyalty, payments, CCTV), where it is stored, who has access, retention periods.',
    deadline: 'Day 30',
    measure: 'Complete data map',
  },
  {
    id: 'a2',
    priority: 'critical',
    area: 'Consent & marketing',
    action:
      'Review & update consent mechanisms + the privacy policy; add a marketing opt-out mechanism (SMS/Zalo).',
    deadline: 'Day 45',
    measure: 'Valid consent & opt-out in place',
  },
  {
    id: 'a3',
    priority: 'critical',
    area: 'Incident response',
    action: 'Establish an incident response process (72-hour notification) & assign an owner.',
    deadline: 'Day 30',
    measure: 'Incident process issued & owner assigned',
  },
  {
    id: 'a4',
    priority: 'important',
    area: 'Security',
    action: 'Set role-based POS access; protect payment & CCTV data; back up.',
    deadline: 'Day 60',
    measure: 'Access control & protection for sensitive data',
  },
  {
    id: 'a5',
    priority: 'important',
    area: 'Third parties',
    action:
      'Review data processing agreements (DPA) with POS, loyalty software, delivery apps, cloud.',
    deadline: 'Day 60',
    measure: 'DPAs in place with key platforms',
  },
  {
    id: 'a6',
    priority: 'important',
    area: 'DPO/DPIA',
    action:
      'Determine DPO/DPIA obligations: check whether you process sensitive/large-volume data (affects the SME exemption).',
    deadline: 'Day 60',
    measure: 'Clear on whether a DPO/DPIA is required',
  },
  {
    id: 'a7',
    priority: 'quickwin',
    area: 'Training',
    action: 'Train staff (cashiers, servers) on handling customer data & POS security.',
    deadline: 'Day 30',
    measure: 'First training session completed',
  },
  {
    id: 'a8',
    priority: 'quickwin',
    area: 'Retention',
    action:
      'Set up a deletion schedule for expired data (CCTV, old loyalty, unused customer data).',
    deadline: 'Day 14',
    measure: 'Data deletion schedule in effect',
  },
  {
    id: 'a9',
    priority: 'quickwin',
    area: 'Ownership',
    action: 'Appoint a person in charge of data protection (in-house or outsourced).',
    deadline: 'Day 14',
    measure: 'Owner clearly assigned',
  },
];

const FNB: DataGovToolkitConfig = {
  id: 'datagov-toolkit-fnb',
  name: 'Data Governance & Personal Data Protection — F&B Services',
  sector: 'Data Governance · F&B Services',
  introLead: INTRO_LEAD,
  dataMapColumns: DATA_MAP_COLUMNS,
  dataMapRows: [
    { id: 'd1', label: 'Customer information (name, phone, email)' },
    { id: 'd2', label: 'Loyalty programme data' },
    { id: 'd3', label: 'Table booking / ordering data' },
    { id: 'd4', label: 'Payment data (cards, e-wallets)', sensitive: true },
    { id: 'd5', label: 'CCTV surveillance footage', sensitive: true },
    { id: 'd6', label: 'Guest wifi data' },
    { id: 'd7', label: 'Marketing data (SMS / email / Zalo)' },
    { id: 'd8', label: 'Data via delivery apps (GrabFood/ShopeeFood/Be)' },
    { id: 'd9', label: 'Customer reviews / feedback' },
    { id: 'd10', label: 'Employee records (HR)' },
  ],
  dataMapNote: DATA_MAP_NOTE,
  assessmentGroups: FNB_ASSESSMENT,
  riskSuggestions: RISK_SUGGESTIONS,
  riskNote: RISK_NOTE,
  incidentSteps: INCIDENT_STEPS,
  legalItems: LEGAL_ITEMS,
  actions: FNB_ACTIONS,
  milestones: MILESTONES,
};

/** English edition — same ids/keys/structure as the VI edition (see data/parity.spec.ts). */
export const DATAGOV_TOOLKITS_EN: Record<string, DataGovToolkitConfig> = {
  [SAN_XUAT.id]: SAN_XUAT,
  [FNB.id]: FNB,
};
