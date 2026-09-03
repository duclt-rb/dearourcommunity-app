import type { WasteToolkitConfig } from '../waste.types';

/**
 * Waste Toolkit — Module B · F&B Services (English edition).
 * Source: EB_Module_B_WasteToolkit_DichVu_FnB_VI.xlsx (v1.0 · 2026).
 * Structure (ids, weights, order) mirrors waste.data.vi.ts exactly — only human text differs.
 */
const FNB: WasteToolkitConfig = {
  id: 'waste-toolkit-fnb',
  name: 'Waste Management Toolkit — F&B Services',
  sector: 'Module B — F&B Services Sector · Eco Solutions Vietnam',
  introLead:
    'Map your waste streams, assess current practices (40 questions · 6 groups), score your ' +
    'contractors, track food waste & cost, then build a 90-day action plan. Focused on food ' +
    'waste, used cooking oil & grease, single-use plastics & packaging, separation at source, ' +
    'and dining-area hygiene. Your data is saved automatically in the browser.',
  tracker: {
    stepLabel: 'Food Waste',
    title: 'Food waste tracker',
    note: 'Log food waste by source each week. Enter your average food cost (VND/kg) to see the real money being wasted.',
    costLabel: 'Average food cost per kg',
    costPlaceholder: 'e.g. 35,000 VND',
    sourceHeader: 'Source / Type',
    annualLabel: 'Estimated cost lost per year',
    resultCardLabel: 'Food waste cost / year',
    tip: 'A restaurant wasting 50 kg/week × 35,000 VND ≈ 91 million VND/year — from food waste alone. This is a cost you can control right away, without growing revenue.',
  },

  // Waste Map — F&B Services
  mappingFields: [
    { id: 'business-name', label: 'Business name' },
    {
      id: 'business-type',
      label: 'F&B business type',
      hint: 'e.g. Restaurant, Cafe, Foodservice, Bar/Bistro',
    },
    { id: 'site-count', label: 'Number of outlets / sites' },
    { id: 'mapping-date', label: 'Mapping date', type: 'date' },
    { id: 'conducted-with', label: 'Conducted with', hint: 'Name of the Eco Solutions expert' },
  ],
  wasteStreamGroups: [
    {
      label: 'Organic (food waste)',
      streams: [
        { id: 'fnb-food-prep', label: 'Food waste — preparation', unit: 'kg' },
        { id: 'fnb-food-spoil', label: 'Food waste — spoiled / expired', unit: 'kg' },
        { id: 'fnb-food-plate', label: 'Food waste — customer plate waste', unit: 'kg' },
      ],
    },
    {
      label: 'Recyclables',
      streams: [
        { id: 'fnb-paper', label: 'Paper packaging / cardboard', unit: 'kg' },
        { id: 'fnb-glass', label: 'Bottles / cans / glass', unit: 'kg' },
        { id: 'fnb-metal', label: 'Metal tins / cans', unit: 'kg' },
      ],
    },
    {
      label: 'General waste',
      streams: [
        {
          id: 'fnb-single-plastic',
          label: 'Single-use plastics (cups, straws, boxes)',
          unit: 'kg',
        },
        { id: 'fnb-food-plastic', label: 'Plastic food packaging', unit: 'kg' },
        { id: 'fnb-broken-glass', label: 'Broken glassware / ceramics', unit: 'kg' },
        { id: 'fnb-tissue', label: 'Napkins / front-of-house waste', unit: 'kg' },
        { id: 'fnb-general', label: 'General municipal waste', unit: 'bags' },
      ],
    },
    {
      label: 'Hazardous',
      streams: [
        { id: 'fnb-uco', label: 'Used cooking oil (UCO)', unit: 'liters' },
        { id: 'fnb-fog', label: 'Waste grease / grease trap (FOG)', unit: 'liters' },
        { id: 'fnb-chemical', label: 'Waste cleaning chemicals', unit: 'liters' },
        { id: 'fnb-battery', label: 'Waste batteries / light bulbs', unit: 'kg' },
        { id: 'fnb-weee', label: 'Waste kitchen / electronic equipment (WEEE)', unit: 'items' },
      ],
    },
  ],

  // Practice Assessment — 40 questions · 6 groups
  assessmentGroups: [
    {
      id: 'separation',
      topic: 'Separation & Sorting at Source',
      questions: [
        {
          id: 'sep-1',
          text: 'Does the business separate waste into at least 3 groups — food waste, recyclables, general waste — at every outlet?',
          risk: 'Critical — Mixed waste cannot be recycled; risk of fines; image damage if customers notice',
          ref: 'Decree 45/2022/NĐ-CP (mandatory from 01/01/2025)',
        },
        {
          id: 'sep-2',
          text: 'Are sorting bins clearly labeled and placed in the right locations (kitchen, dining area, washing area)?',
          risk: 'High — Unlabeled bins mean separation never happens in practice',
          ref: 'Practical compliance',
        },
        {
          id: 'sep-3',
          text: 'Does the business keep used cooking oil & grease (grease trap) separate, and never pour it down the drain?',
          risk: 'Critical — Pouring oil/grease down the drain causes blockages and pollution; subject to fines',
          ref: 'Law on Environmental Protection 2020; QCVN wastewater standards',
        },
        {
          id: 'sep-4',
          text: 'Is hazardous waste (batteries, light bulbs, cleaning chemicals) kept separate from general waste?',
          risk: 'High — Mixing hazardous waste with general waste is a violation',
          ref: 'Circular 02/2022/TT-BTNMT',
        },
        {
          id: 'sep-5',
          text: 'Is food waste separated and stored properly every day before collection?',
          risk: 'High — Poorly stored organic waste: odors, pests, health inspections',
          ref: 'Food safety & hygiene',
        },
        {
          id: 'sep-6',
          text: 'Do all staff (including part-time and new hires) know which waste goes into which bin?',
          risk: 'High — Knowledge held by only a few people = inconsistent separation',
          ref: 'Training & compliance',
        },
        {
          id: 'sep-7',
          text: 'Is waste separation supervised at least weekly?',
          risk: 'Medium — Without supervision, contamination of the recycling stream rises',
          ref: 'Internal management',
        },
      ],
    },
    {
      id: 'contractor',
      topic: 'Treatment & Contractor Compliance',
      questions: [
        {
          id: 'con-1',
          text: 'Does the business use a licensed collector for non-municipal waste (waste oil, hazardous waste)?',
          risk: 'Critical — Unlicensed treatment is illegal; the business owner is liable',
          ref: 'Decree 08/2022/NĐ-CP',
        },
        {
          id: 'con-2',
          text: 'Does the business keep a copy of the contractor’s valid license?',
          risk: 'High — Cannot prove compliance during inspections',
          ref: 'Legal documentation requirement',
        },
        {
          id: 'con-3',
          text: 'Is used cooking oil handed over to a legitimate collector with documentation?',
          risk: 'High — Waste oil sold to unknown buyers carries legal and public food-safety risks',
          ref: 'Waste oil management',
        },
        {
          id: 'con-4',
          text: 'Does the business have a written contract/agreement with its main waste collector?',
          risk: 'High — No contract = no recourse when the contractor fails',
          ref: 'Contractual protection',
        },
        {
          id: 'con-5',
          text: 'Does the business keep collection receipts/records for at least 3 years?',
          risk: 'High — Mandatory for inspections',
          ref: 'Record-keeping requirement',
        },
        {
          id: 'con-6',
          text: 'Has the business verified that its collector actually treats waste properly (no illegal dumping, no improper reuse of waste oil)?',
          risk: 'High — The business can be held jointly liable if the contractor mishandles waste; improperly reused waste oil is a public food-safety risk',
          ref: 'Environmental & food-safety responsibility',
        },
        {
          id: 'con-7',
          text: 'Does the business track the volume & cost of waste handed to the contractor each period?',
          risk: 'Medium — No tracking = no cost control',
          ref: 'Operational management',
        },
      ],
    },
    {
      id: 'foodwaste',
      topic: 'Food Waste Reduction',
      questions: [
        {
          id: 'fwr-1',
          text: 'Does the business track food waste weekly by source (preparation, spoilage, plate waste)?',
          risk: 'High — What is not measured cannot be reduced; food waste is typically 3–8% of restaurant revenue',
          ref: 'F&B operational efficiency',
        },
        {
          id: 'fwr-2',
          text: 'Does the business order ingredients based on actual usage rather than guesswork?',
          risk: 'High — Over-ordering is the #1 cause of food waste; directly hits profit margins',
          ref: 'Purchasing management',
        },
        {
          id: 'fwr-3',
          text: 'Are perishable ingredients stored using FIFO (first in, first out)?',
          risk: 'High — FIFO failures cause preventable spoilage; direct losses',
          ref: 'Food safety & waste reduction',
        },
        {
          id: 'fwr-4',
          text: 'Does the kitchen have a process to use up near-expiry/surplus ingredients (specials, staff meals)?',
          risk: 'Medium — Usable food gets discarded when there is no reuse process',
          ref: 'Cost efficiency',
        },
        {
          id: 'fwr-5',
          text: 'Does the business track plate waste to detect oversized portions?',
          risk: 'Medium — Systematically oversized portions raise the cost per serving',
          ref: 'Menu & portion management',
        },
        {
          id: 'fwr-6',
          text: 'Does the business consider safely donating/redirecting surplus food instead of discarding it?',
          risk: 'Low — Missed community value & brand story',
          ref: 'Shared value',
        },
        {
          id: 'fwr-7',
          text: 'Has the business set a food waste reduction target for the next 3–6 months?',
          risk: 'Medium — No target = no improvement',
          ref: 'Continuous improvement',
        },
      ],
    },
    {
      id: 'plastic',
      topic: 'Single-use Plastics & Packaging',
      questions: [
        {
          id: 'pls-1',
          text: 'Has the business audited the single-use plastic items it currently uses (cups, straws, takeaway boxes)?',
          risk: 'High — Hidden costs & reputational risk; plastic-restriction regulations are tightening',
          ref: 'Circular economy scheme',
        },
        {
          id: 'pls-2',
          text: 'Has the business replaced at least 1–2 plastic items with reusable/compostable alternatives in the past 12 months?',
          risk: 'Medium — Competitive disadvantage & customer expectations',
          ref: 'Plastic reduction',
        },
        {
          id: 'pls-3',
          text: 'Does the business encourage customers to bring their own cups/containers or reduce takeaway packaging?',
          risk: 'Low — Missed cost savings & customer engagement opportunity',
          ref: 'Customer experience',
        },
        {
          id: 'pls-4',
          text: 'Does takeaway packaging prioritize recyclable/compostable materials within budget?',
          risk: 'Medium — Transition gradually rather than all at once; balance the cost',
          ref: 'Sustainable procurement',
        },
        {
          id: 'pls-5',
          text: 'Does the business communicate its plastic-reduction efforts to customers honestly (with data)?',
          risk: 'Low — Vague claims = greenwashing risk',
          ref: 'Greenwashing-free communication',
        },
        {
          id: 'pls-6',
          text: 'Does the business track packaging & single-use plastic costs monthly?',
          risk: 'Medium — No tracking = no control over hidden costs',
          ref: 'Cost management',
        },
      ],
    },
    {
      id: 'hygiene',
      topic: 'Waste Storage & Hygiene',
      questions: [
        {
          id: 'hyg-1',
          text: 'Is the waste storage area clean, covered, and separated from food preparation areas?',
          risk: 'Critical — Hygiene violation; cross-contamination; customer/staff complaints',
          ref: 'Food safety & hygiene law',
        },
        {
          id: 'hyg-2',
          text: 'Are waste bins in good condition (no leaks, working lids)?',
          risk: 'Medium — Leaking bins: leachate, pests, odors',
          ref: 'Hygiene standards',
        },
        {
          id: 'hyg-3',
          text: 'Is the grease trap cleaned & maintained on a regular schedule?',
          risk: 'High — A clogged grease trap causes backflow, odors, and hygiene violations',
          ref: 'Hygiene & wastewater',
        },
        {
          id: 'hyg-4',
          text: 'Is the waste storage area inspected & cleaned daily?',
          risk: 'High — A neglected waste area attracts pests and creates odors in a dining environment',
          ref: 'Hygiene compliance',
        },
        {
          id: 'hyg-5',
          text: 'Are cleaning chemicals stored separately, labeled, and kept away from food?',
          risk: 'High — Risk of chemical contamination of food; food-safety violation',
          ref: 'Chemical safety',
        },
        {
          id: 'hyg-6',
          text: 'Is there dedicated access for waste collection vehicles that does not disturb customer areas?',
          risk: 'Low — Unplanned access causes disruption & image damage',
          ref: 'Operational efficiency',
        },
        {
          id: 'hyg-7',
          text: 'Does the business run a regular pest control program?',
          risk: 'High — Pests in an F&B facility = serious food-safety & reputational risk',
          ref: 'Food safety & hygiene',
        },
      ],
    },
    {
      id: 'staff',
      topic: 'Staff Behavior & Training',
      questions: [
        {
          id: 'stf-1',
          text: 'Are all staff trained in waste handling & separation during onboarding?',
          risk: 'High — New staff are the most common source of violations',
          ref: 'Training practice',
        },
        {
          id: 'stf-2',
          text: 'Is waste management / waste reduction part of daily or weekly briefings?',
          risk: 'Medium — Without reinforcement, compliance drifts',
          ref: 'Management system',
        },
        {
          id: 'stf-3',
          text: 'Is there a clearly assigned person responsible for waste management at each outlet?',
          risk: 'High — No owner = a waste system nobody manages',
          ref: 'Clear accountability',
        },
        {
          id: 'stf-4',
          text: 'Do kitchen staff receive specific guidance on reducing food waste (FIFO, portioning)?',
          risk: 'High — Kitchen behavior drives most of the food waste volume',
          ref: 'Operational training',
        },
        {
          id: 'stf-5',
          text: 'Do staff promptly report waste issues (broken bins, pests, wrong disposal)?',
          risk: 'Medium — Unreported issues accumulate into incidents',
          ref: 'Safety culture',
        },
        {
          id: 'stf-6',
          text: 'Has the business recorded & addressed any waste/hygiene incidents in the past 12 months?',
          risk: 'Select N/A if none — if there were incidents, was a root cause identified?',
          ref: 'Incident management',
        },
      ],
    },
  ],

  // Contractor Assessment
  contractorFields: [
    { id: 'contractor-name', label: 'Contractor name' },
    {
      id: 'license-number',
      label: 'License number',
      hint: 'Verify with the local DONRE or the online portal',
    },
    { id: 'license-expiry', label: 'License expiry date', type: 'date' },
    { id: 'licensed-waste-types', label: 'Waste types licensed for treatment' },
    { id: 'assessment-date', label: 'Assessment date', type: 'date' },
    { id: 'assessor', label: 'Assessor' },
  ],
  contractorCriteria: [
    {
      id: 'license',
      label: 'Valid, current waste treatment license',
      desc: 'Holds a valid operating license that covers the waste types you generate.',
      weight: 25,
      verify: 'Request the license. Verify the number on the DONRE website or at their office.',
    },
    {
      id: 'manifest',
      label: 'Provides manifests/transfer documents for hazardous waste',
      desc: 'Issues a transfer note / manifest for every hazardous waste collection (including waste oil/grease).',
      weight: 20,
      verify: 'Request sample manifests from the 3 most recent collections.',
    },
    {
      id: 'contract',
      label: 'Clear written service contract',
      desc: 'Has a written service contract that states the obligation to provide treatment documentation.',
      weight: 15,
      verify: 'Review the current contract; check documentation & liability clauses.',
    },
    {
      id: 'practice',
      label: 'Evidence of proper treatment (no illegal dumping)',
      desc: 'Verified that waste is delivered to a licensed facility — no illegal dumping.',
      weight: 15,
      verify:
        'Request the address of the final treatment facility and confirm it is registered. Visit if possible.',
    },
    {
      id: 'records',
      label: 'Keeps & provides collection records for ≥ 3 years',
      desc: 'Retains and can produce collection receipts/records for at least 3 years.',
      weight: 10,
      verify: 'Request extracts of collection records from previous periods.',
    },
    {
      id: 'capacity',
      label: 'Capacity to properly treat the waste types your business generates',
      desc: 'Licensed & capable of properly treating every specialty waste you generate (including waste oil/grease).',
      weight: 10,
      verify: 'Cross-check your waste inventory against the scope of the contractor’s license.',
    },
    {
      id: 'pricing',
      label: 'Transparent pricing & service reliability',
      desc: 'Clear, documented pricing; on-schedule collections; a clear point of contact.',
      weight: 5,
      verify: 'Review 6 months of invoices & assess on-time service performance.',
    },
  ],
  contractorChecklist: [
    {
      id: 'cl-1',
      priority: 'critical',
      text: 'Request a copy of the operating license & check its validity on the official portal',
    },
    {
      id: 'cl-2',
      priority: 'critical',
      text: 'Confirm they issue manifests/transfer documents for hazardous waste',
    },
    {
      id: 'cl-3',
      priority: 'critical',
      text: 'Visit/verify the final treatment site (guard against illegal dumping)',
    },
    {
      id: 'cl-4',
      priority: 'important',
      text: 'Compare pricing & contract terms from at least 2 contractors',
    },
    {
      id: 'cl-5',
      priority: 'important',
      text: 'Check their capacity to properly treat your specialty waste types',
    },
    {
      id: 'cl-6',
      priority: 'standard',
      text: 'Ask for references from the contractor’s current customers',
    },
  ],

  // Food Waste tracker (weekly)
  foodSources: [
    { id: 'prep', label: 'Preparation trim (peeling, cutting, trimming)' },
    { id: 'spoil', label: 'Spoiled / expired in storage' },
    { id: 'plate', label: 'Customer plate waste' },
    { id: 'cook-error', label: 'Cooking errors / burnt / wrong dish' },
    { id: 'display', label: 'Unsold display items' },
    { id: 'return', label: 'Returned dishes / cancelled orders' },
    { id: 'promo', label: 'Promotion stock expired before use' },
    { id: 'other', label: 'Other' },
  ],

  // 90-day Plan
  planFields: [
    { id: 'business-name', label: 'Business name' },
    { id: 'plan-date', label: 'Plan date', type: 'date' },
    { id: 'eco-expert', label: 'Eco Solutions expert' },
    { id: 'internal-owner', label: 'Internal owner' },
    {
      id: 'next-review-date',
      label: 'Next review date',
      type: 'date',
      hint: 'Recommended: 30 days after the plan is created',
    },
  ],
  actions: [
    {
      id: 'a1',
      priority: 'critical',
      action:
        'Waste oil/grease: Sign a contract with a legitimate used-cooking-oil collector; clean the grease trap on a schedule; stop pouring oil/grease down the drain.',
      targetDay: 'Day 30',
      measure: 'Waste oil collection contract + grease trap cleaning schedule in place',
    },
    {
      id: 'a2',
      priority: 'critical',
      action:
        'Hygiene: Separate the waste storage area from food preparation; set up a regular pest control program.',
      targetDay: 'Day 30',
      measure: 'Waste area meets hygiene standards, pest control schedule in place',
    },
    {
      id: 'a3',
      priority: 'critical',
      action:
        'Contractor: Collect & file the collector’s license + treatment documents; keep records for 3 years.',
      targetDay: 'Day 45',
      measure: 'Complete licenses & documentation for 2 consecutive periods',
    },
    {
      id: 'a4',
      priority: 'important',
      action:
        'Separation: Set up 3-group separation in the kitchen/dining/washing areas; label bins & train staff.',
      targetDay: 'Day 45',
      measure: 'Correct separation in 100% of areas after 2 weeks of checks',
    },
    {
      id: 'a5',
      priority: 'important',
      action:
        'Food waste: Start tracking food waste weekly by source; identify the largest source in week 1.',
      targetDay: 'Day 14',
      measure: 'Largest food waste source identified',
    },
    {
      id: 'a6',
      priority: 'important',
      action: 'FIFO: Apply daily FIFO checks; assign an owner for stock rotation.',
      targetDay: 'Day 30',
      measure: 'FIFO checklist completed daily for 2 weeks',
    },
    {
      id: 'a7',
      priority: 'quickwin',
      action: 'Waste Map: Complete the Waste Map & calculate total waste cost per month.',
      targetDay: 'Day 7',
      measure: 'Waste Map completed, total cost known',
    },
    {
      id: 'a8',
      priority: 'quickwin',
      action: 'Plastics: Audit single-use plastic items; pick 1–2 items to replace within 90 days.',
      targetDay: 'Day 45',
      measure: 'At least 1 single-use plastic item replaced',
    },
    {
      id: 'a9',
      priority: 'quickwin',
      action: 'Ownership: Assign 1 person responsible for waste management at each outlet.',
      targetDay: 'Day 7',
      measure: 'A clear owner is in place',
    },
  ],
  reviewMilestones: [
    { id: 'm30', title: '30 days', focus: 'Foundation: separation, licensed contractor, records' },
    {
      id: 'm60',
      title: '60 days',
      focus: 'Systems: volume & cost tracking, training',
    },
    {
      id: 'm90',
      title: '90 days',
      focus: 'Standardize: reduction targets & continuous improvement',
    },
  ],
};

/**
 * Waste Toolkit — Module B · Manufacturing (factories · workshops) (English edition).
 * Source: EB_Module_B_WasteToolkit_San_Xuat_VI.xlsx (v1.0 · 2026).
 * Structure (ids, weights, order) mirrors waste.data.vi.ts exactly — only human text differs.
 */
const SUPPLY: WasteToolkitConfig = {
  id: 'waste-toolkit-supply',
  name: 'Waste Management Toolkit — Manufacturing',
  sector: 'Module B — Manufacturing Sector · Eco Solutions Vietnam',
  introLead:
    'Map your waste streams, assess current practices (40 questions · 6 groups), score your ' +
    'contractors, track scrap & cost, then build a 90-day action plan. Focused on production ' +
    'scrap, hazardous waste & chemicals, pollution control, and recycling obligations (EPR). ' +
    'Your data is saved automatically in the browser.',
  tracker: {
    stepLabel: 'Scrap',
    title: 'Scrap & production waste tracker',
    note: 'Log weight (kg) by week and source. Enter your average treatment cost (VND/kg) to convert it into money. Note: recyclable scrap may have recovery (resale) value.',
    costLabel: 'Average treatment cost per kg',
    costPlaceholder: 'e.g. 2,000 VND',
    sourceHeader: 'Source / Type',
    annualLabel: 'Estimated cost lost per year',
    resultCardLabel: 'Scrap cost / year',
    tip: 'Tip: recyclable scrap can usually be SOLD — record its recovery value too, to see the net position. Hazardous waste costs far more to treat; you can apply a separate unit rate for that stream.',
  },

  // Waste Map — Manufacturing
  mappingFields: [
    { id: 'business-name', label: 'Business name' },
    {
      id: 'business-type',
      label: 'Manufacturing type / Industry',
      hint: 'e.g. Mechanical, Textiles, Plastics, Wood processing, Electronics',
    },
    { id: 'site-count', label: 'Number of factories / sites' },
    { id: 'mapping-date', label: 'Mapping date', type: 'date' },
    { id: 'conducted-with', label: 'Conducted with', hint: 'Name of the Eco Solutions expert' },
  ],
  wasteStreamGroups: [
    {
      label: 'Recyclables (sellable / recoverable)',
      streams: [
        { id: 'mfg-metal', label: 'Metal scrap', unit: 'kg' },
        { id: 'mfg-plastic', label: 'Production plastic scrap', unit: 'kg' },
        { id: 'mfg-textile', label: 'Fabric offcuts / textile scrap', unit: 'kg' },
        { id: 'mfg-wood', label: 'Wood scrap / sawdust', unit: 'kg' },
        { id: 'mfg-paper', label: 'Paper scrap / cardboard', unit: 'kg' },
        { id: 'mfg-pkg-in', label: 'Inbound raw material packaging', unit: 'kg' },
        { id: 'mfg-pallet', label: 'Broken pallets', unit: 'pcs' },
      ],
    },
    {
      label: 'General waste',
      streams: [
        { id: 'mfg-defect', label: 'Defective products / write-offs', unit: 'kg' },
        { id: 'mfg-general', label: 'Domestic / office waste', unit: 'kg' },
      ],
    },
    {
      label: 'Hazardous',
      streams: [
        { id: 'mfg-sludge', label: 'Sludge from wastewater treatment', unit: 'kg' },
        { id: 'mfg-oil', label: 'Waste oil / used lubricants', unit: 'liters' },
        { id: 'mfg-solvent', label: 'Waste solvents / chemicals', unit: 'liters' },
        { id: 'mfg-rag', label: 'Oil- / chemical-soaked rags', unit: 'kg' },
        { id: 'mfg-battery', label: 'Waste batteries / accumulators', unit: 'kg' },
        { id: 'mfg-lamp', label: 'Waste fluorescent lamps', unit: 'pcs' },
        { id: 'mfg-weee', label: 'Waste electronic equipment (WEEE)', unit: 'items' },
      ],
    },
  ],

  // Practice Assessment — 40 questions · 6 groups
  assessmentGroups: [
    {
      id: 'separation',
      topic: 'Separation & Sorting at Source',
      questions: [
        {
          id: 'sep-1',
          text: 'Does the business separate waste into at least 3 groups: organic, recyclables, and general waste?',
          risk: 'Critical — Mixed waste cannot be recycled; risk of non-compliant treatment; higher contractor costs',
          ref: 'Decree 45/2022/NĐ-CP (separation mandatory from 01/01/2025)',
        },
        {
          id: 'sep-2',
          text: 'Does the business sort production scrap (metal, plastic, wood, fabric) by type for recycling/resale?',
          risk: 'High — Mixed scrap loses its recovery value; missed revenue',
          ref: 'Cost optimization & circular economy',
        },
        {
          id: 'sep-3',
          text: 'Is hazardous waste (waste oil, chemicals, oily rags, batteries) fully separated from general waste?',
          risk: 'Critical — Mixing hazardous waste with general waste is illegal; risk of heavy fines',
          ref: 'Law on Environmental Protection 2020; Circular 02/2022/TT-BTNMT',
        },
        {
          id: 'sep-4',
          text: 'Are sorting bins/areas clearly labeled, well placed, and easily accessible for workers?',
          risk: 'High — Unlabeled bins mean separation never happens, policy or not',
          ref: 'Practical compliance',
        },
        {
          id: 'sep-5',
          text: 'Do all workers (including seasonal and new hires) know which waste goes into which bin?',
          risk: 'High — Knowledge held by only a few people; inconsistent separation breaks the whole system',
          ref: 'Training & compliance',
        },
        {
          id: 'sep-6',
          text: 'Is waste separation supervised/inspected at least weekly?',
          risk: 'Medium — Without supervision compliance erodes; contamination of the recycling stream rises',
          ref: 'Internal management',
        },
        {
          id: 'sep-7',
          text: 'Has the business registered as a hazardous waste generator with the environmental authority (if applicable)?',
          risk: 'Critical — Mandatory for facilities generating hazardous waste; failure = violation',
          ref: 'Law on Environmental Protection 2020; Decree 08/2022',
        },
      ],
    },
    {
      id: 'contractor',
      topic: 'Treatment & Contractor Compliance',
      questions: [
        {
          id: 'con-1',
          text: 'Does the business use licensed collectors/treaters for all non-municipal waste?',
          risk: 'Critical — Unlicensed treatment is illegal; the business owner bears legal liability',
          ref: 'Decree 08/2022/NĐ-CP',
        },
        {
          id: 'con-2',
          text: 'Does the business keep a copy of the contractor’s valid operating license?',
          risk: 'High — Cannot prove compliance during inspections without it',
          ref: 'Legal documentation requirement',
        },
        {
          id: 'con-3',
          text: 'Does the contractor provide manifests/transfer documents for hazardous waste?',
          risk: 'Critical — Legally required for hazardous waste; missing manifests = heavy fines',
          ref: 'Circular 02/2022/TT-BTNMT',
        },
        {
          id: 'con-4',
          text: 'Does the business have a written service contract with its waste treatment contractor?',
          risk: 'High — No contract = no recourse when the contractor fails and the business is held jointly liable',
          ref: 'Contractual protection',
        },
        {
          id: 'con-5',
          text: 'Has the business verified that the contractor actually treats waste properly (no illegal dumping)?',
          risk: 'High — Businesses have been fined when their contractors dumped waste illegally',
          ref: 'Environmental responsibility',
        },
        {
          id: 'con-6',
          text: 'Does the business keep collection receipts/records for at least 3 years?',
          risk: 'High — Mandatory for inspections; no records = no proof of compliance',
          ref: 'Record-keeping requirement',
        },
        {
          id: 'con-7',
          text: 'Does the business track the volume of waste handed to the contractor each period?',
          risk: 'Medium — No tracking = no control over costs and anomalies',
          ref: 'Operational management',
        },
      ],
    },
    {
      id: 'hazardous',
      topic: 'Hazardous Waste & Chemicals',
      questions: [
        {
          id: 'haz-1',
          text: 'Has the business fully identified the hazardous waste types it generates (oil, solvents, batteries, rags, sludge)?',
          risk: 'Critical — Unidentified waste gets mishandled; legal and environmental risk',
          ref: 'Law on Environmental Protection 2020',
        },
        {
          id: 'haz-2',
          text: 'Is hazardous waste stored in a dedicated, roofed, ventilated, labeled area?',
          risk: 'Critical — Risk of fire/explosion, chemical reactions, regulatory violations',
          ref: 'Hazardous waste storage regulations',
        },
        {
          id: 'haz-3',
          text: 'Does the business apply warning labels & hazardous waste codes as regulated?',
          risk: 'High — Wrong/missing labels hinder safe handling and are a violation flagged in inspections',
          ref: 'Circular 02/2022',
        },
        {
          id: 'haz-4',
          text: 'Do production chemicals have Safety Data Sheets (SDS) and proper storage?',
          risk: 'High — Missing SDS creates occupational safety and compliance risks',
          ref: 'Chemical safety',
        },
        {
          id: 'haz-5',
          text: 'Are workers who handle hazardous waste trained & equipped with protective gear?',
          risk: 'High — Occupational health risk; legal liability',
          ref: 'Occupational safety & health',
        },
        {
          id: 'haz-6',
          text: 'Does the business have a chemical/oil spill response plan?',
          risk: 'Medium — An uncontrolled spill causes pollution and penalties',
          ref: 'Incident response',
        },
        {
          id: 'haz-7',
          text: 'Does the business file periodic hazardous waste management reports as regulated?',
          risk: 'High — Mandatory for waste generators; missing reports = administrative violation',
          ref: 'Decree 08/2022',
        },
      ],
    },
    {
      id: 'pollution',
      topic: 'Waste Storage & Pollution Control',
      questions: [
        {
          id: 'pol-1',
          text: 'Is the waste storage area clean, roofed, and separated from production/raw material areas?',
          risk: 'Critical — Cross-contamination risk; complaints; hygiene violations',
          ref: 'Facility hygiene',
        },
        {
          id: 'pol-2',
          text: 'Are waste bins/containers in good condition (no leaks, with lids)?',
          risk: 'Medium — Leaking containers: leachate, pests, odors',
          ref: 'Hygiene standards',
        },
        {
          id: 'pol-3',
          text: 'Does the business treat production wastewater to the required standard before discharge?',
          risk: 'Critical — Discharge above the standard draws heavy fines, possibly suspension',
          ref: 'QCVN wastewater standards; Law on Environmental Protection 2020',
        },
        {
          id: 'pol-4',
          text: 'Does the business control dust & air emissions at source?',
          risk: 'High — Dust/emissions above limits trigger complaints and violations',
          ref: 'QCVN air emission/dust standards',
        },
        {
          id: 'pol-5',
          text: 'Does the business keep noise within regulated limits?',
          risk: 'Medium — Noise above limits triggers community complaints & violations',
          ref: 'QCVN noise standards',
        },
        {
          id: 'pol-6',
          text: 'Does the business run periodic environmental monitoring (wastewater, emissions) as regulated?',
          risk: 'High — Mandatory for many manufacturing facilities; failure = violation',
          ref: 'Decree 08/2022',
        },
        {
          id: 'pol-7',
          text: 'Is the waste storage area inspected & cleaned at least weekly?',
          risk: 'Medium — A neglected waste area attracts pests, causes odors & complaints',
          ref: 'Environmental compliance',
        },
      ],
    },
    {
      id: 'reduction',
      topic: 'Reduction, Recycling & EPR',
      questions: [
        {
          id: 'red-1',
          text: 'Does the business track waste volumes to set reduction targets?',
          risk: 'High — What is not measured cannot be reduced; waste costs stay high',
          ref: 'Operational efficiency',
        },
        {
          id: 'red-2',
          text: 'Has the business identified its 3 largest waste/scrap sources and put reduction measures in place?',
          risk: 'High — Scrap = raw material loss straight into product cost',
          ref: 'Cost reduction',
        },
        {
          id: 'red-3',
          text: 'Does the business have an internal reuse/recycling program for scrap, or sell it to a recycler?',
          risk: 'Medium — Missed revenue and circular economy advantage',
          ref: 'Circular economy scheme',
        },
        {
          id: 'red-4',
          text: 'Has the business reduced packaging or switched to recyclable materials in the past 12 months?',
          risk: 'Medium — Buyer expectations & regulations are rising',
          ref: 'Circular economy',
        },
        {
          id: 'red-5',
          text: 'If the business manufactures/imports packaging with revenue above the threshold (≈30 billion VND), does it understand its EPR (mandatory recycling) obligations?',
          risk: 'High — Failure to comply with EPR can draw fines of 50 million–1 billion VND',
          ref: 'Law on Environmental Protection 2020 (Art. 54, 55); Decree 08/2022; Decree 05/2025',
        },
        {
          id: 'red-6',
          text: 'Has the business set a waste reduction / recycling rate target for next year?',
          risk: 'Medium — No target = no systematic improvement',
          ref: 'Continuous improvement',
        },
      ],
    },
    {
      id: 'staff',
      topic: 'Staff Behavior & Training',
      questions: [
        {
          id: 'stf-1',
          text: 'Are all workers trained in waste handling during onboarding?',
          risk: 'High — New workers are the most common source of violations',
          ref: 'Training practice',
        },
        {
          id: 'stf-2',
          text: 'Is waste management part of job expectations / team briefings?',
          risk: 'Medium — Without reinforcement, compliance drifts',
          ref: 'Management system',
        },
        {
          id: 'stf-3',
          text: 'Is there a clearly assigned person responsible for waste management in the business?',
          risk: 'High — No owner = a waste system nobody manages',
          ref: 'Clear accountability',
        },
        {
          id: 'stf-4',
          text: 'Do workers promptly report waste issues (broken bins, wrong disposal, pests)?',
          risk: 'Medium — Unreported issues accumulate; small problems become big incidents',
          ref: 'Safety culture',
        },
        {
          id: 'stf-5',
          text: 'Has the business recorded & addressed any waste-related incidents in the past 12 months?',
          risk: 'Select N/A if none — if there were incidents, was a root cause found & fixed?',
          ref: 'Incident management',
        },
        {
          id: 'stf-6',
          text: 'Does the business communicate waste reduction / cost saving results to the team?',
          risk: 'Low — Unrecognized effort weakens the motivation to sustain it',
          ref: 'Employee engagement',
        },
      ],
    },
  ],

  // Contractor Assessment
  contractorFields: [
    { id: 'contractor-name', label: 'Contractor name' },
    {
      id: 'license-number',
      label: 'License number',
      hint: 'Verify with the local DONRE or the online portal',
    },
    { id: 'license-expiry', label: 'License expiry date', type: 'date' },
    { id: 'licensed-waste-types', label: 'Waste types licensed for treatment' },
    { id: 'assessment-date', label: 'Assessment date', type: 'date' },
    { id: 'assessor', label: 'Assessor' },
  ],
  contractorCriteria: [
    {
      id: 'license',
      label: 'Valid, current waste treatment license',
      desc: 'Holds a valid operating license that covers the waste types you generate.',
      weight: 25,
      verify: 'Request the license. Verify the number on the DONRE website or at their office.',
    },
    {
      id: 'manifest',
      label: 'Provides manifests/transfer documents for hazardous waste',
      desc: 'Issues a transfer note / manifest for every hazardous waste collection.',
      weight: 20,
      verify: 'Request sample manifests from the 3 most recent collections.',
    },
    {
      id: 'contract',
      label: 'Clear written service contract',
      desc: 'Has a written service contract that states the obligation to provide treatment documentation.',
      weight: 15,
      verify: 'Review the current contract; check documentation & liability clauses.',
    },
    {
      id: 'practice',
      label: 'Evidence of proper treatment (no illegal dumping)',
      desc: 'Verified that waste is delivered to a licensed facility — no illegal dumping.',
      weight: 15,
      verify:
        'Request the address of the final treatment facility and confirm it is registered. Visit if possible.',
    },
    {
      id: 'records',
      label: 'Keeps & provides collection records for ≥ 3 years',
      desc: 'Retains and can produce collection receipts/records for at least 3 years.',
      weight: 10,
      verify: 'Request extracts of collection records from previous periods.',
    },
    {
      id: 'capacity',
      label: 'Capacity to properly treat the waste types your business generates',
      desc: 'Licensed & capable of properly treating every specialty waste you generate.',
      weight: 10,
      verify: 'Cross-check your waste inventory against the scope of the contractor’s license.',
    },
    {
      id: 'pricing',
      label: 'Transparent pricing & service reliability',
      desc: 'Clear, documented pricing; on-schedule collections; a clear point of contact.',
      weight: 5,
      verify: 'Review 6 months of invoices & assess on-time service performance.',
    },
  ],
  contractorChecklist: [
    {
      id: 'cl-1',
      priority: 'critical',
      text: 'Request a copy of the operating license & check its validity on the official portal',
    },
    {
      id: 'cl-2',
      priority: 'critical',
      text: 'Confirm they issue manifests/transfer documents for hazardous waste',
    },
    {
      id: 'cl-3',
      priority: 'critical',
      text: 'Visit/verify the final treatment site (guard against illegal dumping)',
    },
    {
      id: 'cl-4',
      priority: 'important',
      text: 'Compare pricing & contract terms from at least 2 contractors',
    },
    {
      id: 'cl-5',
      priority: 'important',
      text: 'Check their capacity to properly treat your specialty waste types',
    },
    {
      id: 'cl-6',
      priority: 'standard',
      text: 'Ask for references from the contractor’s current customers',
    },
  ],

  // Scrap tracker (weekly)
  foodSources: [
    { id: 'recyclable', label: 'Recyclable scrap (metal/plastic/paper/wood)' },
    { id: 'non-recyclable', label: 'Non-recyclable scrap' },
    { id: 'defect', label: 'Defective products / write-offs' },
    { id: 'hazard', label: 'Hazardous waste' },
    { id: 'sludge', label: 'Wastewater treatment sludge' },
    { id: 'pkg-in', label: 'Inbound packaging' },
    { id: 'general', label: 'Domestic / office waste' },
    { id: 'other', label: 'Other' },
  ],

  // 90-day Plan
  planFields: [
    { id: 'business-name', label: 'Business name' },
    { id: 'plan-date', label: 'Plan date', type: 'date' },
    { id: 'eco-expert', label: 'Eco Solutions expert' },
    { id: 'internal-owner', label: 'Internal owner' },
    {
      id: 'next-review-date',
      label: 'Next review date',
      type: 'date',
      hint: 'Recommended: 30 days after the plan is created',
    },
  ],
  actions: [
    {
      id: 'a1',
      priority: 'critical',
      action:
        'Hazardous waste: Separate & store all hazardous waste (oil, chemicals, batteries) in a dedicated roofed area, labeled as regulated.',
      targetDay: 'Day 30',
      measure: 'Hazardous waste storage meets the standard, with labels & codes',
    },
    {
      id: 'a2',
      priority: 'critical',
      action:
        'Contractor: Collect & file copies of the contractor’s operating license + hazardous waste manifests; keep records for 3 years.',
      targetDay: 'Day 30',
      measure: 'Complete licenses & documentation for 2 consecutive collection periods',
    },
    {
      id: 'a3',
      priority: 'critical',
      action:
        'Pollution: Check that wastewater treatment & periodic monitoring meet QCVN standards; fix any exceedances.',
      targetDay: 'Day 60',
      measure: 'Monitoring results meet the standards',
    },
    {
      id: 'a4',
      priority: 'important',
      action:
        'Separation: Set up a 3-group separation system in every area; label bins & train workers.',
      targetDay: 'Day 45',
      measure: 'Correct separation in 100% of areas after 2 weeks of checks',
    },
    {
      id: 'a5',
      priority: 'important',
      action:
        'Reduction: Identify the 3 largest scrap sources from the Waste Map; define reduction measures for each.',
      targetDay: 'Day 60',
      measure: 'Reduction plan in place for the top 3 scrap sources',
    },
    {
      id: 'a6',
      priority: 'important',
      action:
        'EPR: Review revenue & packaging types to determine EPR obligations; build a compliance plan if in scope.',
      targetDay: 'Day 60',
      measure: 'Clear determination of EPR applicability & next steps',
    },
    {
      id: 'a7',
      priority: 'quickwin',
      action: 'Waste Map: Complete the Waste Map & calculate total waste cost per month.',
      targetDay: 'Day 7',
      measure: 'Waste Map completed, total cost known',
    },
    {
      id: 'a8',
      priority: 'quickwin',
      action:
        'Recycling: Separate & sell recyclable scrap (metal/plastic/paper) to a licensed recycler.',
      targetDay: 'Day 14',
      measure: 'Revenue stream from recyclable scrap established',
    },
    {
      id: 'a9',
      priority: 'quickwin',
      action: 'Ownership: Assign 1 person responsible for waste management across the factory.',
      targetDay: 'Day 7',
      measure: 'A clear owner is in place',
    },
  ],
  reviewMilestones: [
    { id: 'm30', title: '30 days', focus: 'Foundation: separation, licensed contractor, records' },
    {
      id: 'm60',
      title: '60 days',
      focus: 'Systems: volume & cost tracking, training',
    },
    {
      id: 'm90',
      title: '90 days',
      focus: 'Standardize: reduction targets & continuous improvement',
    },
  ],
};

/** English edition — registry of all waste toolkit variants, keyed by id. */
export const WASTE_TOOLKITS_EN: Record<string, WasteToolkitConfig> = {
  [FNB.id]: FNB,
  [SUPPLY.id]: SUPPLY,
  // Back-compat: the legacy single-toolkit id resolves to the F&B variant.
  'waste-toolkit': FNB,
};
