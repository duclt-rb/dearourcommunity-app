// ENGLISH edition of the Energy toolkit content. Structure (config ids, field ids,
// group/question ids, allocation/equipment/savings row ids, order) MUST stay identical
// to energy.data.vi.ts — guarded by parity.spec.ts. Only human-readable text differs.
import type {
  AssessmentGroup,
  AssessmentQuestion,
  ActionItem,
  EnergyToolkitConfig,
  ReviewMilestone,
} from '../energy.types';

/** Compact question builder (text · risk/opportunity · legal reference). */
function q(id: string, text: string, risk: string, ref: string): AssessmentQuestion {
  return { id, text, risk, ref };
}

/** Review milestones are identical across sectors. */
const MILESTONES: ReviewMilestone[] = [
  {
    id: 'm30',
    title: '30 days',
    focus: 'Foundation: monitoring & metering, leak repairs, switching equipment off, LED',
  },
  {
    id: 'm60',
    title: '60 days',
    focus: 'Systems: sub-meters, variable speed drives, HVAC/refrigeration optimization',
  },
  {
    id: 'm90',
    title: '90 days',
    focus: 'Investment: rooftop solar, BESS, roadmap & savings targets',
  },
];

// ════════════════════════════════════════════════════════════════════════
// F&B (F&B Services)
// ════════════════════════════════════════════════════════════════════════
const FNB_ASSESSMENT: AssessmentGroup[] = [
  {
    id: 'monitor',
    topic: 'Energy Monitoring & Metering',
    questions: [
      q(
        'fnb-mon-1',
        'Does the business track monthly electricity consumption per outlet and compare it month over month?',
        'HIGH — What is not measured cannot be controlled',
        'Law on Energy Efficiency & Conservation 2010 (amended 2025); ISO 50001',
      ),
      q(
        'fnb-mon-2',
        'Does the business have electricity monitoring devices (sub-meters/IoT) for major areas (kitchen, air conditioning)?',
        'HIGH — Without sub-meters you cannot tell which area consumes the most',
        'ISO 50001 (measurement)',
      ),
      q(
        'fnb-mon-3',
        'Does the business know which system takes the largest share of electricity (HVAC, kitchen, refrigeration)?',
        'HIGH — Not knowing the hotspots means investing in the wrong place',
        'VEEP survey methodology',
      ),
      q(
        'fnb-mon-4',
        'Does the business have a way to detect electricity losses/waste?',
        'MEDIUM — Silent losses quietly drive up costs',
        'Energy management',
      ),
      q(
        'fnb-mon-5',
        'Does the business track peak demand and power factor?',
        'MEDIUM — Low cosφ or exceeding capacity incurs surcharges',
        'EVN tariff schedule',
      ),
      q(
        'fnb-mon-6',
        'Has the business set an electricity savings target (%) for this year?',
        'MEDIUM — No target means no improvement',
        'ISO 50001 (objectives)',
      ),
      q(
        'fnb-mon-7',
        'Does the business benchmark electricity use against output (kWh per meal or kWh per VND million of revenue)?',
        'HIGH — Intensity metrics reveal true efficiency and enable comparison across branches',
        'ISO 50001 (EnPI); VEEP',
      ),
    ],
  },
  {
    id: 'hvac',
    topic: 'HVAC, Ventilation & Refrigeration',
    questions: [
      q(
        'fnb-hvac-1',
        'Is the dining-area air conditioning set at a sensible temperature (≈25–26°C) and kept under control?',
        'HIGH — Every 1°C lower ≈ +2–3% AC electricity',
        'QCVN 09:2017/BXD',
      ),
      q(
        'fnb-hvac-2',
        'Are the air conditioning and refrigeration systems serviced/cleaned regularly (filters, coils)?',
        'HIGH — Dirty coils cut efficiency and increase electricity use',
        'HVAC maintenance',
      ),
      q(
        'fnb-hvac-3',
        'Do fridges/freezers/cold rooms have tight door gaskets, quick door closing, and no overloading?',
        'HIGH — Leaky gaskets and doors left open significantly increase refrigeration electricity',
        'Refrigeration best practice',
      ),
      q(
        'fnb-hvac-4',
        'Do cold rooms/freezers have PVC strip curtains and scheduled defrosting?',
        'MEDIUM — Ice build-up reduces efficiency',
        'Refrigeration maintenance',
      ),
      q(
        'fnb-hvac-5',
        'Are air-conditioned areas kept closed and well insulated?',
        'MEDIUM — Cooling losses make the AC work harder',
        'QCVN 09:2017/BXD',
      ),
      q(
        'fnb-hvac-6',
        'Are kitchen exhaust/ventilation fans run only as needed (not left running unnecessarily)?',
        'MEDIUM — Exhaust hoods running continuously at full power waste electricity',
        'Operational optimization',
      ),
      q(
        'fnb-hvac-7',
        'Does the business track the share of HVAC and refrigeration in total electricity consumption?',
        'MEDIUM — This is usually the largest electricity item in F&B',
        'VEEP',
      ),
    ],
  },
  {
    id: 'kitchen',
    topic: 'Kitchen Equipment & Back of House',
    questions: [
      q(
        'fnb-kit-1',
        'Is kitchen equipment (ovens, stoves, steamers) switched off/turned down outside service, with an hourly on/off procedure?',
        'HIGH — Kitchen equipment running unnecessarily is very power-hungry',
        'Operational optimization',
      ),
      q(
        'fnb-kit-2',
        'Does the business have a demand-based start-up schedule (no early start, nothing left on all day)?',
        'HIGH — Starting early or leaving equipment on all day is a major waste',
        'Energy-saving behavior',
      ),
      q(
        'fnb-kit-3',
        'Is new kitchen equipment preferentially energy-efficient/energy-labeled?',
        'MEDIUM — Inefficient equipment wastes electricity over its whole lifetime',
        'Energy labeling',
      ),
      q(
        'fnb-kit-4',
        'Do the exhaust hoods have demand-based controls (variable speed drives/sensors)?',
        'MEDIUM — Exhaust hoods running continuously at full power waste electricity',
        'Best practice',
      ),
      q(
        'fnb-kit-5',
        'Are water heaters/boilers insulated and set at a sensible temperature?',
        'MEDIUM — Overheating and heat losses waste electricity',
        'Operational optimization',
      ),
      q(
        'fnb-kit-6',
        'Does the business service kitchen equipment regularly to maintain efficiency?',
        'MEDIUM — Poorly maintained equipment consumes more electricity',
        'Maintenance',
      ),
      q(
        'fnb-kit-7',
        'Are beverage coolers/display fridges placed away from heat sources with good airflow?',
        'LOW — Placement next to stoves/sunlight increases cooling electricity',
        'Sensible layout',
      ),
    ],
  },
  {
    id: 'lighting',
    topic: 'Lighting',
    questions: [
      q(
        'fnb-light-1',
        'Has the business switched to LED lighting in the dining and kitchen areas?',
        'HIGH — LED saves 50–70% versus legacy lamps',
        'Energy labeling / MEPS',
      ),
      q(
        'fnb-light-2',
        'Do low-use areas (storage, restrooms) have occupancy sensors/timers to switch lights off?',
        'MEDIUM — Lights burning in empty areas are pure waste',
        'Best practice',
      ),
      q(
        'fnb-light-3',
        'Does the business make use of natural daylight where feasible?',
        'LOW — Free light going unused',
        'Efficient design',
      ),
      q(
        'fnb-light-4',
        'Do decorative lights/signage have timers/daylight sensors?',
        'LOW — Lights running in daytime are a waste',
        'Operational optimization',
      ),
      q(
        'fnb-light-5',
        'Are light levels appropriate for the space (not excessive) while creating a good guest experience?',
        'LOW — Over-lighting wastes electricity and degrades the experience',
        'QCVN lighting standards',
      ),
      q(
        'fnb-light-6',
        'Is someone responsible for switching off lights/equipment in unused areas at the end of each shift?',
        'MEDIUM — With no owner, lights and equipment run overnight',
        'Energy-saving behavior',
      ),
    ],
  },
  {
    id: 'renewable',
    topic: 'Renewable Energy & Load Management',
    questions: [
      q(
        'fnb-ren-1',
        'Has the business assessed the potential of rooftop solar PV?',
        'HIGH — Missed opportunity to cut electricity costs and emissions',
        'Decree 58/2025/ND-CP (self-consumption rooftop solar)',
      ),
      q(
        'fnb-ren-2',
        'Is the business familiar with the rules on self-produced, self-consumed rooftop solar?',
        'MEDIUM — Procedures depend on installed capacity',
        'Decree 58/2025/ND-CP',
      ),
      q(
        'fnb-ren-3',
        'Does the business know the peak-hour windows and shift loads (ice making, laundry, charging) to off-peak?',
        'HIGH — Running heavy loads during peak hours is very costly',
        'EVN ToU tariff',
      ),
      q(
        'fnb-ren-4',
        'If solar PV is installed, are the panels monitored and maintained?',
        'MEDIUM — Dirty or faulty panels reduce yield',
        'Solar PV operation',
      ),
      q(
        'fnb-ren-5',
        'Does the business track the hours of highest electricity use during the day (load profile)?',
        'MEDIUM — Not knowing the peak means nothing can be optimized',
        'VEEP load profile',
      ),
      q(
        'fnb-ren-6',
        'Does the business consider battery storage/backup where feasible?',
        'LOW — BESS enables peak shaving and outage backup',
        'VEEP (BESS)',
      ),
    ],
  },
  {
    id: 'governance',
    topic: 'Governance, Compliance & Behavior',
    questions: [
      q(
        'fnb-gov-1',
        'Does the business have someone responsible for energy management/electricity savings?',
        'HIGH — No owner means no improvement',
        'Law on Energy Efficiency & Conservation',
      ),
      q(
        'fnb-gov-2',
        'If it is a designated key energy user (building ≥500 TOE/year), does the business meet its energy audit and reporting obligations?',
        'CRITICAL — Mandatory for key energy users; violations are fined',
        'Decree 30/2026/ND-CP',
      ),
      q(
        'fnb-gov-3',
        'Does the business buy energy-labeled equipment when purchasing new?',
        'MEDIUM — Inefficient equipment wastes electricity over its whole lifetime',
        'Energy labeling/MEPS',
      ),
      q(
        'fnb-gov-4',
        'Does the business train staff in energy-saving habits (switching equipment off, closing cold-room doors)?',
        'HIGH — Behavior drives most of the waste',
        'Energy-saving behavior',
      ),
      q(
        'fnb-gov-5',
        'Does the business prepare an annual energy-saving plan?',
        'MEDIUM — Without a plan, improvements stay piecemeal',
        'Circular 25/2020/TT-BCT',
      ),
      q(
        'fnb-gov-6',
        'Does the business communicate savings results to the team?',
        'LOW — Lack of recognition erodes motivation',
        'Employee engagement',
      ),
      q(
        'fnb-gov-7',
        'Does the business consider green credit to finance upgrades (LED, solar PV, equipment)?',
        'LOW — Missing out on preferential funding for EE investments',
        'Green credit; Green taxonomy per Decision 21/2025',
      ),
    ],
  },
];

const FNB_ACTIONS: ActionItem[] = [
  {
    id: 'fnb-a1',
    priority: 'critical',
    action:
      'Check door gaskets, fit PVC strip curtains, defrost cold rooms/freezers; set sensible temperatures.',
    targetDay: 'Day 30',
    measure: 'Cold rooms/freezers sealed and defrosted on schedule',
  },
  {
    id: 'fnb-a2',
    priority: 'critical',
    action:
      'Set up a demand-based on/off schedule for kitchen equipment (no early start, nothing left on all day).',
    targetDay: 'Day 30',
    measure: 'On/off schedule applied to main equipment',
  },
  {
    id: 'fnb-a3',
    priority: 'critical',
    action: 'Install sub-meters for the kitchen and air conditioning (the two biggest consumers).',
    targetDay: 'Day 60',
    measure: 'Consumption data available for the two largest areas',
  },
  {
    id: 'fnb-a4',
    priority: 'important',
    action: 'Set 25–26°C, service and clean regularly, keep air-conditioned areas closed.',
    targetDay: 'Day 45',
    measure: 'AC serviced and set to the standard temperature',
  },
  {
    id: 'fnb-a5',
    priority: 'important',
    action: 'Install variable speed drives/sensors on exhaust hoods and kitchen ventilation.',
    targetDay: 'Day 90',
    measure: 'Exhaust hoods run on demand',
  },
  {
    id: 'fnb-a6',
    priority: 'important',
    action: 'Assess rooftop solar potential and financing options.',
    targetDay: 'Day 60',
    measure: 'Solar potential and payback report available',
  },
  {
    id: 'fnb-a7',
    priority: 'quickwin',
    action: 'Complete the Energy Map and allocate costs by system.',
    targetDay: 'Day 7',
    measure: 'Biggest electricity hotspots identified',
  },
  {
    id: 'fnb-a8',
    priority: 'quickwin',
    action: 'Switch to LED + sensors in the dining and kitchen areas.',
    targetDay: 'Day 30',
    measure: 'LED installed in high-consumption areas',
  },
  {
    id: 'fnb-a9',
    priority: 'quickwin',
    action: 'Shift ice making/laundry to off-peak hours; assign end-of-shift switch-off duty.',
    targetDay: 'Day 14',
    measure: 'Heavy loads shifted out of peak hours',
  },
];

const FNB: EnergyToolkitConfig = {
  id: 'energy-toolkit-fnb',
  name: 'Energy Efficiency Toolkit — F&B Services',
  sector: 'Module B — F&B Services Sector · Energy partner: VIoT Group (VEEP)',
  outputLabel: 'meals / guest visits',
  defaultRate: 3000,
  allocationSystems: [
    { id: 'hvac', label: 'Air conditioning (HVAC)' },
    { id: 'cold', label: 'Refrigeration / cold storage' },
    { id: 'kitchen', label: 'Kitchen equipment (stoves, ovens, steamers)' },
    { id: 'fridge', label: 'Fridges / freezers / coolers' },
    { id: 'lighting', label: 'Lighting' },
    { id: 'ventilation', label: 'Ventilation / exhaust fans' },
    { id: 'water', label: 'Water pumps & water heaters' },
    { id: 'public', label: 'Public areas / signage' },
    { id: 'other', label: 'Other' },
  ],
  assessmentGroups: FNB_ASSESSMENT,
  equipmentRows: [
    { id: 'fnb-eq-ac', label: 'Air conditioning' },
    { id: 'fnb-eq-coldroom', label: 'Cold room / freezer' },
    { id: 'fnb-eq-fridge', label: 'Fridge / cooler' },
    { id: 'fnb-eq-stove', label: 'Electric / induction stove' },
    { id: 'fnb-eq-oven', label: 'Oven / steamer' },
    { id: 'fnb-eq-hood', label: 'Exhaust hood / ventilation' },
    { id: 'fnb-eq-coffee', label: 'Coffee / beverage machine' },
    { id: 'fnb-eq-dishwasher', label: 'Dishwasher' },
    { id: 'fnb-eq-waterheater', label: 'Water heater' },
    { id: 'fnb-eq-lighting', label: 'Lighting' },
    { id: 'fnb-eq-signage', label: 'Signage / decorative lighting' },
  ],
  savingsSolutions: [
    {
      id: 'fnb-sv-led',
      label: 'Switch to LED + sensors (~50–70% of lighting electricity)',
      invest: 'Low',
    },
    {
      id: 'fnb-sv-ac',
      label: 'Optimize AC set point to 25–26°C & maintenance (~5–15%)',
      invest: 'Low',
    },
    {
      id: 'fnb-sv-cold',
      label:
        'Tight gaskets + PVC curtains + cold room/freezer defrosting (~10–20% of refrigeration electricity)',
      invest: 'Low',
    },
    {
      id: 'fnb-sv-kitchen',
      label: 'Demand-based on/off schedule for kitchen equipment (~10–20%)',
      invest: 'Low',
    },
    {
      id: 'fnb-sv-vfd',
      label: 'Variable speed drives/sensors for exhaust hoods & ventilation (~20–40%)',
      invest: 'Medium',
    },
    {
      id: 'fnb-sv-shift',
      label: 'Shift loads (ice making, laundry, charging) to off-peak hours',
      invest: 'Low',
    },
    {
      id: 'fnb-sv-maint',
      label: 'Regular maintenance of kitchen & refrigeration equipment',
      invest: 'Low',
    },
    {
      id: 'fnb-sv-label',
      label: 'Energy-labeled kitchen/refrigeration equipment at replacement time',
      invest: 'Medium',
    },
    { id: 'fnb-sv-solar', label: 'Self-consumption rooftop solar PV', invest: 'High' },
    {
      id: 'fnb-sv-pf',
      label: 'Power factor correction / peak demand management',
      invest: 'Medium',
    },
  ],
  planFields: [
    { id: 'business-name', label: 'Business' },
    { id: 'overall-owner', label: 'Overall owner' },
    { id: 'plan-date', label: 'Plan date', type: 'date' },
  ],
  actions: FNB_ACTIONS,
  reviewMilestones: MILESTONES,
};

// ════════════════════════════════════════════════════════════════════════
// MANUFACTURING
// ════════════════════════════════════════════════════════════════════════
const SUPPLY_ASSESSMENT: AssessmentGroup[] = [
  {
    id: 'monitor',
    topic: 'Energy Monitoring & Metering',
    questions: [
      q(
        'sx-mon-1',
        'Does the business track monthly electricity consumption (meter readings/bills) and compare across periods?',
        'HIGH — What is not measured cannot be controlled; anomalies go undetected',
        'Law on Energy Efficiency & Conservation 2010 (amended 2025); ISO 50001',
      ),
      q(
        'sx-mon-2',
        'Does the business have electricity monitoring devices (sub-meters, IoT) for major areas/machines?',
        'HIGH — Without sub-meters you cannot tell which machine consumes the most',
        'ISO 50001 (measurement)',
      ),
      q(
        'sx-mon-3',
        'Does the business know which system/machine takes the largest share of electricity (cost allocation)?',
        'HIGH — Not knowing the hotspots means investing in the wrong place',
        'VEEP survey methodology',
      ),
      q(
        'sx-mon-4',
        'Does the business have a way to detect electricity losses (leaks, idle running)?',
        'MEDIUM — Silent losses quietly drive up costs',
        'Energy management',
      ),
      q(
        'sx-mon-5',
        'Does the business track peak demand (kW) and power factor (cosφ)?',
        'HIGH — Exceeding registered capacity and low cosφ incur surcharges',
        'EVN tariff schedule',
      ),
      q(
        'sx-mon-6',
        'Has the business set an electricity savings target (%) for this year?',
        'MEDIUM — No target means no improvement',
        'ISO 50001 (objectives)',
      ),
      q(
        'sx-mon-7',
        'Does the business benchmark electricity use against output (kWh per product or kWh per tonne)?',
        'HIGH — Intensity metrics reveal true efficiency, not just total kWh',
        'ISO 50001 (EnPI); VEEP',
      ),
    ],
  },
  {
    id: 'production',
    topic: 'Production Systems & Motors',
    questions: [
      q(
        'sx-prod-1',
        'Are machines/equipment switched off when not in use, with a systematic shutdown procedure?',
        'HIGH — Idle running wastes significant electricity',
        'Law on Energy Efficiency & Conservation',
      ),
      q(
        'sx-prod-2',
        'Do motors/pumps/fans with variable loads use variable speed drives (VSD/inverter)?',
        'HIGH — VSDs save 20–50% on variable loads',
        'Best practice (VSD)',
      ),
      q(
        'sx-prod-3',
        'Is the compressed air system inspected and its leaks repaired regularly?',
        'HIGH — Compressed air leaks typically waste 20–30% of compressor electricity',
        'Best practice (compressed air)',
      ),
      q(
        'sx-prod-4',
        'Is compressed air pressure set at the minimum required level (no excess)?',
        'MEDIUM — Each extra bar ≈ +7% compressor electricity',
        'Operational optimization',
      ),
      q(
        'sx-prod-5',
        'Are replacement motors high-efficiency (IE3/IE4)?',
        'MEDIUM — Low-efficiency motors waste electricity over their whole lifetime',
        'Energy labeling / MEPS',
      ),
      q(
        'sx-prod-6',
        'Does the business maintain equipment regularly (lubrication, cleaning, alignment) to preserve efficiency?',
        'HIGH — Poorly maintained equipment consumes more electricity',
        'Preventive maintenance',
      ),
      q(
        'sx-prod-7',
        'Does the business recover waste heat from compressors/furnaces where feasible?',
        'LOW — Missed energy recovery opportunity',
        'Energy efficiency',
      ),
    ],
  },
  {
    id: 'hvac',
    topic: 'HVAC, Ventilation & Refrigeration',
    questions: [
      q(
        'sx-hvac-1',
        'Is the air conditioning set at a sensible temperature (≈25–26°C) and kept under control?',
        'HIGH — Every 1°C lower ≈ +2–3% AC electricity',
        'QCVN 09:2017/BXD',
      ),
      q(
        'sx-hvac-2',
        'Are the AC/chiller systems serviced and cleaned regularly (filters, coils)?',
        'HIGH — Dirty coils cut efficiency and increase electricity use',
        'HVAC maintenance',
      ),
      q(
        'sx-hvac-3',
        'Are air-conditioned areas well insulated and kept closed (doors, curtains)?',
        'MEDIUM — Cooling losses make the AC work harder',
        'QCVN 09:2017/BXD',
      ),
      q(
        'sx-hvac-4',
        'Does the ventilation/fresh-air system run only as needed (no excess)?',
        'MEDIUM — Over-ventilation wastes cooling electricity',
        'HVAC optimization',
      ),
      q(
        'sx-hvac-5',
        'Do the chiller/refrigeration systems have load-optimized controls (BMS/sensors)?',
        'HIGH — BMS-optimized chillers deliver significant savings',
        'BMS best practice',
      ),
      q(
        'sx-hvac-6',
        'Does the business track the share of cooling in total electricity consumption?',
        'MEDIUM — Cooling is usually a major item worth prioritizing',
        'VEEP',
      ),
    ],
  },
  {
    id: 'lighting',
    topic: 'Lighting',
    questions: [
      q(
        'sx-light-1',
        'Has the business switched to LED lighting in the main areas?',
        'HIGH — LED saves 50–70% versus legacy lamps',
        'Energy labeling / MEPS',
      ),
      q(
        'sx-light-2',
        'Do low-use areas have occupancy sensors/timers to switch lights off?',
        'MEDIUM — Lights burning in empty areas are pure waste',
        'Best practice',
      ),
      q(
        'sx-light-3',
        'Does the business use natural daylight (skylights, windows) where feasible?',
        'LOW — Free light going unused',
        'Efficient design',
      ),
      q(
        'sx-light-4',
        'Are illuminance levels (lux) matched to the task (no over-lighting)?',
        'LOW — Over-lighting wastes electricity',
        'QCVN lighting standards',
      ),
      q(
        'sx-light-5',
        'Do outdoor/signage lights have timers/daylight sensors?',
        'LOW — Outdoor lights running in daytime are a waste',
        'Operational optimization',
      ),
      q(
        'sx-light-6',
        'Is someone responsible for switching off lights in unused areas at the end of each shift?',
        'MEDIUM — With no owner, lights run overnight',
        'Energy-saving behavior',
      ),
    ],
  },
  {
    id: 'renewable',
    topic: 'Renewable Energy & Load Management',
    questions: [
      q(
        'sx-ren-1',
        'Has the business assessed the potential of rooftop solar PV (roof area, load profile)?',
        'HIGH — Missed opportunity to cut electricity costs and emissions',
        'Decree 58/2025/ND-CP (self-consumption rooftop solar)',
      ),
      q(
        'sx-ren-2',
        'If solar PV is installed, does the business monitor and maintain the panels?',
        'MEDIUM — Dirty or faulty panels reduce yield',
        'Solar PV operation',
      ),
      q(
        'sx-ren-3',
        'Is the business familiar with self-consumption rooftop solar rules (registration by capacity)?',
        'MEDIUM — Systems ≥1,000 kW must register with the Department of Industry and Trade',
        'Decree 58/2025/ND-CP',
      ),
      q(
        'sx-ren-4',
        'Does the business know the peak/off-peak windows and shift loads to cut its electricity bill?',
        'HIGH — Running heavy loads during peak hours is very costly',
        'EVN ToU tariff',
      ),
      q(
        'sx-ren-5',
        'Does the business consider battery storage (BESS) for peak shaving/backup where feasible?',
        'LOW — BESS enables peak shaving and outage backup',
        'VEEP (BESS)',
      ),
      q(
        'sx-ren-6',
        'Does the business track its load profile in real time?',
        'MEDIUM — Not knowing the peak means nothing can be optimized',
        'VEEP load profile',
      ),
      q(
        'sx-ren-7',
        'Does the business consider buying renewable power via the DPPA mechanism (for large demand)?',
        'LOW — DPPA allows buying clean power directly',
        'Decree 57/2025/ND-CP (DPPA)',
      ),
    ],
  },
  {
    id: 'governance',
    topic: 'Governance, Compliance & Behavior',
    questions: [
      q(
        'sx-gov-1',
        'Does the business have someone responsible for energy management?',
        'HIGH — No owner means no improvement',
        'Law on Energy Efficiency & Conservation (energy manager)',
      ),
      q(
        'sx-gov-2',
        'If it is a designated key energy user (≥1,000 TOE/year), does the business conduct energy audits and plan as required?',
        'CRITICAL — Mandatory for key energy users; violations are fined',
        'Decree 30/2026/ND-CP; Circular 25/2020/TT-BCT',
      ),
      q(
        'sx-gov-3',
        'Does the business buy energy-labeled equipment when procuring new?',
        'MEDIUM — Inefficient equipment wastes electricity over its whole lifetime',
        'Energy labeling & MEPS',
      ),
      q(
        'sx-gov-4',
        'Does the business train staff in electricity-saving habits?',
        'MEDIUM — Behavior drives most of the waste',
        'Energy-saving behavior',
      ),
      q(
        'sx-gov-5',
        'Does the business prepare an annual energy-saving plan/roadmap?',
        'HIGH — Without a plan, improvements stay piecemeal',
        'Circular 25/2020/TT-BCT',
      ),
      q(
        'sx-gov-6',
        'Does the business communicate electricity-saving results to the team to sustain motivation?',
        'LOW — Lack of recognition erodes motivation',
        'Employee engagement',
      ),
      q(
        'sx-gov-7',
        'Does the business consider green credit to finance energy-efficiency upgrades?',
        'LOW — Missing out on preferential funding for EE investments',
        'Green credit; Green taxonomy per Decision 21/2025',
      ),
    ],
  },
];

const SUPPLY_ACTIONS: ActionItem[] = [
  {
    id: 'sx-a1',
    priority: 'critical',
    action:
      'Determine whether the business is a designated key energy user (≥1,000 TOE/year); if so, plan the energy audit and reporting.',
    targetDay: 'Day 30',
    measure: 'Status and compliance obligations clearly established',
  },
  {
    id: 'sx-a2',
    priority: 'critical',
    action:
      'Inspect and repair compressed air leaks; reduce pressure to the minimum required level.',
    targetDay: 'Day 45',
    measure: 'Leaks reduced; pressure set at the optimum',
  },
  {
    id: 'sx-a3',
    priority: 'critical',
    action:
      'Install sub-meters/monitoring for the three most electricity-intensive areas/machines.',
    targetDay: 'Day 60',
    measure: 'Consumption data available for the top three loads',
  },
  {
    id: 'sx-a4',
    priority: 'important',
    action: 'Install VSDs on the main variable-load pumps/fans/motors.',
    targetDay: 'Day 90',
    measure: 'VSD running on at least one major load',
  },
  {
    id: 'sx-a5',
    priority: 'important',
    action: 'Shift heavy loads out of peak hours; correct cosφ if surcharges apply.',
    targetDay: 'Day 60',
    measure: 'Lower peak-hour bill / cosφ surcharges',
  },
  {
    id: 'sx-a6',
    priority: 'important',
    action: 'Assess rooftop solar potential and financing options.',
    targetDay: 'Day 60',
    measure: 'Solar potential and payback report available',
  },
  {
    id: 'sx-a7',
    priority: 'quickwin',
    action: 'Complete the Energy Map and allocate costs by system.',
    targetDay: 'Day 7',
    measure: 'Biggest electricity hotspots identified',
  },
  {
    id: 'sx-a8',
    priority: 'quickwin',
    action: 'Switch to LED + sensors in the main areas.',
    targetDay: 'Day 30',
    measure: 'LED installed in high-consumption areas',
  },
  {
    id: 'sx-a9',
    priority: 'quickwin',
    action: 'Issue a shutdown/no-idle procedure and assign an owner.',
    targetDay: 'Day 14',
    measure: 'Procedure in force; owner assigned',
  },
];

const SUPPLY: EnergyToolkitConfig = {
  id: 'energy-toolkit-supply',
  name: 'Energy Efficiency Toolkit — Manufacturing',
  sector: 'Module B — Manufacturing Sector · Energy partner: VIoT Group (VEEP)',
  outputLabel: 'products / tonnes',
  defaultRate: 3000,
  allocationSystems: [
    { id: 'production', label: 'Production machinery / lines' },
    { id: 'compressed', label: 'Air compressors (compressed air)' },
    { id: 'motors', label: 'Motors & pumps' },
    { id: 'hvac', label: 'Air conditioning / cooling (HVAC/chiller)' },
    { id: 'lighting', label: 'Lighting' },
    { id: 'ventilation', label: 'Fans / ventilation' },
    { id: 'heating', label: 'Furnaces / heating equipment' },
    { id: 'office', label: 'Offices & auxiliary areas' },
    { id: 'other', label: 'Other' },
  ],
  assessmentGroups: SUPPLY_ASSESSMENT,
  equipmentRows: [
    { id: 'sx-eq-line', label: 'Main production lines / machines' },
    { id: 'sx-eq-compressor', label: 'Air compressor' },
    { id: 'sx-eq-motor', label: 'Motors' },
    { id: 'sx-eq-pump', label: 'Pumps' },
    { id: 'sx-eq-fan', label: 'Fans / ventilation' },
    { id: 'sx-eq-chiller', label: 'Chiller / cooling system' },
    { id: 'sx-eq-ac', label: 'Office air conditioning' },
    { id: 'sx-eq-furnace', label: 'Furnace / heating equipment' },
    { id: 'sx-eq-lighting', label: 'Factory lighting' },
    { id: 'sx-eq-conveyor', label: 'Conveyors / elevators' },
    { id: 'sx-eq-waterpump', label: 'Water pumps' },
  ],
  savingsSolutions: [
    {
      id: 'sx-sv-led',
      label: 'Switch to LED + sensors (saves ~50–70% of lighting electricity)',
      invest: 'Low',
    },
    {
      id: 'sx-sv-air',
      label:
        'Fix compressed air leaks & reduce excess pressure (~20–30% of compressor electricity)',
      invest: 'Low',
    },
    {
      id: 'sx-sv-vsd',
      label: 'Install variable speed drives (VSD) on variable-load pumps/fans/motors (~20–50%)',
      invest: 'Medium',
    },
    {
      id: 'sx-sv-hvac',
      label: 'Optimize temperature & maintain AC/chillers (~5–15%)',
      invest: 'Low',
    },
    {
      id: 'sx-sv-shift',
      label: 'Shutdown/no-idle procedure & shifting loads out of peak hours',
      invest: 'Low',
    },
    {
      id: 'sx-sv-pf',
      label: 'Power factor (cosφ) correction to avoid EVN surcharges',
      invest: 'Low',
    },
    {
      id: 'sx-sv-motor',
      label: 'Preventive maintenance & high-efficiency (IE3/IE4) motor replacement',
      invest: 'Medium',
    },
    { id: 'sx-sv-heat', label: 'Waste heat recovery from compressors/furnaces', invest: 'High' },
    { id: 'sx-sv-solar', label: 'Self-consumption rooftop solar PV', invest: 'High' },
    { id: 'sx-sv-bess', label: 'Battery storage (BESS) for peak shaving / backup', invest: 'High' },
  ],
  planFields: [
    { id: 'business-name', label: 'Business' },
    { id: 'overall-owner', label: 'Overall owner' },
    { id: 'plan-date', label: 'Plan date', type: 'date' },
  ],
  actions: SUPPLY_ACTIONS,
  reviewMilestones: MILESTONES,
};

export const ENERGY_TOOLKITS_EN: Record<string, EnergyToolkitConfig> = {
  [FNB.id]: FNB,
  [SUPPLY.id]: SUPPLY,
};
