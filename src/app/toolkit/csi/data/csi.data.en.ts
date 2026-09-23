/**
 * ESG Toolkit based on the CSI 2026 Index — small & micro enterprise edition (English edition).
 * Translation of `csi.data.vi.ts`; structure (ids, keys, scores, order) is locked to the VI
 * edition by `parity.spec.ts`.
 */
import type { CsiToolkitConfig } from '../csi.types';

export const CSI_TOOLKITS_EN: Record<string, CsiToolkitConfig> = {
  'csi-2026-sme': {
    id: 'csi-2026-sme',
    name: 'ESG TOOLKIT BASED ON THE CSI 2026 INDEX',
    sector: 'EDITION FOR SMALL AND MICRO ENTERPRISES',
    brand: 'Dear Our Community | ESG Knowledge Hub',
    guide: {
      id: 'guide',
      header: [
        'ESG TOOLKIT BASED ON THE CSI 2026 INDEX',
        'EDITION FOR SMALL AND MICRO ENTERPRISES',
        'Dear Our Community | ESG Knowledge Hub',
      ],
      sections: [
        {
          id: 'guide-s1',
          title: 'What is this toolkit for?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'This is an ESG self-assessment and planning tool for Vietnamese enterprises, built on the CSI 2026 Corporate Sustainability Index issued by the Vietnam Chamber of Commerce and Industry (VCCI) and the Vietnam Business Council for Sustainable Development (VBCSD).',
            },
            {
              kind: 'paragraph',
              text: 'The toolkit helps enterprises answer three questions: (1) Where do we stand against the CSI standard? (2) Where are the biggest gaps? (3) What should we do first in the next 12 months?',
            },
            {
              kind: 'paragraph',
              text: "The toolkit is NOT an official application dossier. The official dossier is submitted online at vbcsd.vn/dangkycsi using the Organising Committee's form. The scores in this file are SELF-ASSESSED scores, for guidance only, not scores awarded by the Evaluation Council.",
            },
          ],
        },
        {
          id: 'guide-s2',
          title: 'Why did Dear Our Community choose CSI as the foundation?',
          blocks: [
            {
              kind: 'paragraph',
              text: '1. CSI is designed for Vietnamese enterprises - closely aligned with current Vietnamese law, while referencing international practices (ISSB/IFRS S1-S2, TCFD, the UN Guiding Principles on Business and Human Rights).',
            },
            {
              kind: 'paragraph',
              text: '2. CSI has two editions by enterprise size, so micro enterprises are not held to the standards of large corporations.',
            },
            {
              kind: 'paragraph',
              text: '3. CSI clearly separates compliance indicators (C) from advanced indicators (A) - helping enterprises know what is mandatory and what creates competitive advantage.',
            },
            {
              kind: 'paragraph',
              text: '4. CSI is tied to a national programme that has run for 11 consecutive years, with an independent evaluation mechanism and a community of enterprises practising together.',
            },
          ],
        },
        {
          id: 'guide-s3',
          title: 'Six steps to use',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Step 1',
                  text: 'Read the "CSI 2026 Introduction" page to understand the structure of the index and the scoring scale.',
                },
                {
                  label: 'Step 2',
                  text: 'Fill in the "Company profile" page. This is the data foundation for all later sections. Data for all 3 years 2023, 2024, 2025 is required.',
                },
                {
                  label: 'Step 3',
                  text: 'Self-assess the 4 indicator groups in turn: Results (I), Governance (G), Environment (E), Labour - Social (L&S). Answer Yes or No for each indicator, exactly as in the official CSI Programme form. Only answer "Yes" when the enterprise is actually implementing it AND has supporting documentation - this is also how the Evaluation Council reviews dossiers.',
                },
                {
                  label: 'Step 4',
                  text: 'View the "Scorecard" page to see your readiness level for each pillar.',
                },
                {
                  label: 'Step 5',
                  text: 'Open the "Action plan" page and filter by HIGH priority to address the legal compliance indicators first.',
                },
                {
                  label: 'Step 6',
                  text: 'Use the "12-month roadmap" and "Records & documents checklist" pages to assign owners and specific deadlines.',
                },
              ],
            },
          ],
        },
        {
          id: 'guide-s4',
          title: 'Colour conventions in the file',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'YELLOW cells',
                  text: 'Cells the enterprise needs to fill in or select',
                },
                {
                  label: 'GREY cells',
                  text: 'Auto-calculated formula cells - do not edit',
                },
                {
                  label: 'WHITE cells',
                  text: 'Reference content, read-only',
                },
                {
                  label: 'Answer Yes',
                  text: "The enterprise is implementing it AND has supporting documentation. Earns the indicator's full maximum points",
                },
                {
                  label: 'Answer No',
                  text: 'Not yet implemented, or in progress, or done but without supporting records. Earns 0 points',
                },
                {
                  label: 'Not applicable',
                  text: 'The indicator does not arise at the enterprise. Excluded from both the numerator and the denominator when calculating the readiness rate',
                },
                {
                  label: 'C (Core) indicator',
                  text: 'Core indicator, tied to legal compliance - the enterprise needs to complete all C indicators relevant to its specific characteristics',
                },
                {
                  label: 'A (Advance) indicator',
                  text: 'Advanced indicator, tied to programmes and initiatives that reduce environmental - social risks and create competitive advantage',
                },
              ],
            },
          ],
        },
        {
          id: 'guide-s5',
          title: 'Key principles for self-assessment',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Honesty matters more than a high score. The purpose of the toolkit is to see the real gaps, not to produce a good-looking scorecard. An indicator marked "Yes" without supporting records will not be recognised by the Evaluation Council.',
            },
            {
              kind: 'paragraph',
              text: 'The toolkit uses exactly the Yes/No answer format of the official CSI form, so that the self-assessment results reflect as closely as possible what the Evaluation Council will see. If the enterprise has started but not yet completed the work or does not yet have records, the correct answer is still "No" - and record the actual progress in the "Notes / existing records" column for tracking.',
            },
            {
              kind: 'paragraph',
              text: 'Every indicator requires data and documents for the 3 years of the assessment period (2023-2025). If you do not yet have a record-keeping system, start from the "Records & documents checklist" page.',
            },
            {
              kind: 'paragraph',
              text: 'For any indicator that genuinely does not arise at the enterprise (for example: no scrap imports, no staff canteen), select "Not applicable". That indicator will be excluded from the denominator when calculating the readiness rate.',
            },
          ],
        },
        {
          id: 'guide-s6',
          title: 'Note on deadlines',
          blocks: [
            {
              kind: 'paragraph',
              text: "The CSI 2026 Programme submission window closes at 23:59 on 08/8/2026. If your enterprise starts after this time, use the toolkit to prepare for the following year's assessment cycle - all data and records need to be accumulated over 3 years, so starting early is always beneficial.",
            },
          ],
        },
      ],
    },
    intro: {
      id: 'intro',
      header: ['INTRODUCTION TO THE CSI 2026 INDEX - EDITION FOR SMALL AND MICRO ENTERPRISES'],
      sections: [
        {
          id: 'intro-s1',
          title: 'What is CSI?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'CSI (Corporate Sustainability Index) is a set of criteria for assessing the level of sustainable development of enterprises in Vietnam, developed under the lead of VCCI and used as the scoring basis in the Programme for Assessing and Announcing Sustainable Enterprises in Vietnam. 2026 is the 11th consecutive year the programme has been implemented.',
            },
            {
              kind: 'paragraph',
              text: 'CSI integrates the three factors Environment - Social - Governance (E-S-G) into strategic planning, resource allocation, action planning, and the recording and storage of performance data.',
            },
          ],
        },
        {
          id: 'intro-s2',
          title: "What's new in CSI 2026",
          blocks: [
            {
              kind: 'paragraph',
              text: 'CSI 2026 has been updated in line with the compliance requirements of Vietnamese policy and law in 2026 and with new international sustainability reporting standards adapted to the Vietnamese context, including the standards of the International Sustainability Standards Board (ISSB), the recommendations of the Task Force on Climate-related Financial Disclosures (TCFD) and the UN Guiding Principles on Business and Human Rights.',
            },
            {
              kind: 'paragraph',
              text: 'For medium and large enterprises, CSI 2026 requires evidence of concrete actions and measurable results, rather than merely stating targets.',
            },
            {
              kind: 'paragraph',
              text: 'Enterprises in international supply chains or with foreign strategic partners (accounting for 20% or more of revenue or supplying 20% or more of materials) are encouraged to additionally prepare certain metrics under IFRS S1 (general requirements for sustainability-related disclosures) and IFRS S2 (climate-related disclosures).',
            },
          ],
        },
        {
          id: 'intro-s3',
          title: 'Two indicator levels',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Core indicators (C - Core): indicators related to legal compliance. Enterprises are required to complete all C indicators relevant to their specific production and business characteristics. This is the part that must be prioritised first.',
            },
            {
              kind: 'paragraph',
              text: 'Advanced indicators (A - Advance): indicators related to programmes, actions and measures to mitigate risks and the impact of risks arising from environmental and social factors, while contributing to building a sustainable business ecosystem.',
            },
          ],
        },
        {
          id: 'intro-s4',
          title: 'Assessment period and data requirements',
          blocks: [
            {
              kind: 'paragraph',
              text: 'The corporate sustainable development assessment period is 2023 - 2025. Enterprises need to provide complete, accurate and clear information, images, documents and data for all 3 years, and are encouraged to update information, documents and data in the form of periodic statistics and reports up to the time of submission.',
            },
            {
              kind: 'paragraph',
              text: 'Enterprises also need to explain, clarify and self-assess their level of implementation of the indicators in connection with the information and documents provided.',
            },
          ],
        },
        {
          id: 'intro-s5',
          title: 'Structure of the index',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Section A - Company overview',
                  text: 'Part I: General information about the enterprise. Part II: Organisational structure, model and key personnel.',
                },
                {
                  label: 'Section B - Assessment indicators and scoring scale',
                  text: 'Part III: Results indicators for the 3 years 2023-2025 (I). Part IV: Governance indicators (G). Part V: Environmental indicators (E). Part VI: Labour - social indicators (L&S).',
                },
                {
                  label: 'Number of indicators',
                  text: '105 indicators, comprising 86 C indicators (82%) and 19 A indicators (18%).',
                },
                {
                  label: 'Maximum points',
                  text: '600 points.',
                },
              ],
            },
          ],
        },
        {
          id: 'intro-s6',
          title: 'Official CSI 2026 scoring scale',
          blocks: [
            {
              kind: 'table',
              headers: ['Part of the Index', 'Base points', 'Bonus points'],
              rows: [
                ['Section A - Company overview', '18', '0'],
                ['    Part I: Company information', '14', '0'],
                ['    Part II: Organisational structure, model and key personnel', '4', '0'],
                ['Section B - Assessment indicators and scoring scale', '527', '55'],
                ['    Part III: Results indicators for the 3 years 2023-2025 (I)', '178', '20'],
                ['    Part IV: Governance indicators (G)', '70', '7'],
                ['    Part V: Environmental indicators (E)', '138', '14'],
                ['    Part VI: Labour - social indicators (L&S)', '141', '14'],
                ['TOTAL MAXIMUM POINTS OF THE INDEX', '545', '55'],
              ],
            },
          ],
        },
        {
          id: 'intro-s7',
          title: 'CSI 2026 Programme information',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Lead organisation',
                  text: 'Vietnam Chamber of Commerce and Industry (VCCI)',
                },
                {
                  label: 'Implementing organisation',
                  text: 'Vietnam Business Council for Sustainable Development (VBCSD)',
                },
                {
                  label: 'Programme Steering Committee',
                  text: 'VCCI; Central Policy and Strategy Commission; Ministry of Agriculture and Environment; Ministry of Home Affairs; Ministry of Finance; Vietnam General Confederation of Labour',
                },
                {
                  label: 'Legal basis for implementation',
                  text: 'Notice No. 398/TB-VPCP dated 15/12/2015 of the Government Office on ranking sustainable enterprises',
                },
                {
                  label: '2026 policy direction',
                  text: 'Resolution No. 68 on private sector development; Resolution No. 57 on breakthroughs in science, technology, innovation and national digital transformation; Resolutions No. 138 and 139 issued in May 2025',
                },
                {
                  label: 'CSI 2026 submission deadline',
                  text: '23:59 on 08/8/2026',
                },
                {
                  label: 'Online submission portal',
                  text: 'https://vbcsd.vn/dangkycsi',
                },
                {
                  label: 'Programme information page',
                  text: 'https://vbcsd.vn/csi/',
                },
                {
                  label: 'Participation fee',
                  text: 'Free of charge',
                },
                {
                  label: 'Dossier language',
                  text: 'The Programme only accepts dossiers in Vietnamese',
                },
                {
                  label: 'Confidentiality',
                  text: 'The Organising Committee commits to keeping all information provided by enterprises confidential',
                },
                {
                  label: 'Expected recognition categories',
                  text: 'Top 100 Sustainable Enterprises in Vietnam 2026; Top 10 Sustainable Enterprises in manufacturing; Top 10 Sustainable Enterprises in trade - services; Pioneering Enterprises in circular economy and greenhouse gas emission reduction; Breakthrough Enterprises in corporate governance (thematic categories may change)',
                },
                {
                  label: 'Support contacts',
                  text: 'Mr. Nguyễn Thành Trung - 0945 22 3333 - trungnt@vcci.com.vn | Mr. Hoàng Lê Anh - 0989 131 594 - anhhl@vcci.com.vn',
                },
              ],
            },
          ],
        },
        {
          id: 'intro-s8',
          title: 'HOW CSI IS ACTUALLY SCORED',
          blocks: [
            {
              kind: 'paragraph',
              text: 'This section explains the actual scoring mechanism of the CSI Programme, so that enterprises correctly understand what the scores mean and do not form false expectations.',
            },
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'The points printed in the Index are for reference',
                  text: 'The official note in the CSI 2026 Index clearly states: "The scores proposed in the CSI 2026 Index are for reference so that enterprises can self-assess and estimate their level of completion of specific indicators in particular, as well as the overall state of sustainable development of the enterprise in general."',
                },
                {
                  label: 'Actual scores differ by field of activity',
                  text: 'The same note states: "For detailed scores by the enterprise\'s field of activity, please visit the CSI 2026 Programme at the website https://vbcsd.vn/". The score weighting between the economic, environmental and social aspects is adjusted by sector group (manufacturing; trade - services; mixed) to ensure fairness. Therefore, two enterprises giving identical answers but in different sectors may still have different total scores.',
                },
                {
                  label: 'Enterprises self-declare, the Council scores',
                  text: 'On the official form, the enterprise marks Yes/No for each indicator, attaches supporting documents and explains its level of implementation. The enterprise does NOT score itself. Scoring is carried out by the independent Evaluation Council.',
                },
                {
                  label: 'The evaluation process has three steps',
                  text: "(1) The independent Evaluation Council scores 03 rounds of dossiers against the CSI Index; (2) information is verified through the relevant competent authorities; (3) the Programme Steering Committee approves based on the Evaluation Council's proposal. The Council comprises representatives of ministries, sectors and agencies participating in the Programme, as well as representatives of enterprises, organisations, experts and press agencies.",
                },
                {
                  label: 'Bonus points',
                  text: 'The Index publishes the maximum bonus points for each part of Section B (Section A has no bonus points), but does NOT publish the criteria for earning bonus points. Bonus points are awarded by the Evaluation Council based on the actual dossier. Therefore this toolkit does not include bonus points in the self-assessment.',
                },
                {
                  label: 'There is no pass / fail score threshold',
                  text: 'The CSI Programme is a ranking programme, not a threshold-based certification programme. The published results are the Top 100 Sustainable Enterprises, Top 10 in manufacturing and Top 10 in trade - services. Therefore no score is published as "passing" or "good" - the score needed to make the Top depends on the dossiers of the other enterprises competing that year.',
                },
                {
                  label: 'The only absolute standard: complete all C indicators',
                  text: 'The Index clearly states that enterprises "are required to complete all C indicators relevant to the enterprise\'s own specific production and business characteristics". This is the only absolute standard set by CSI and the most realistic target for enterprises to aim for, rather than chasing a score. The Scorecard of this toolkit therefore places the status of C indicators ahead of the total score.',
                },
              ],
            },
          ],
        },
        {
          id: 'intro-s9',
          title: 'KEY EXPLANATIONS FROM THE NOTES OF THE CSI 2026 INDEX',
          blocks: [
            {
              kind: 'paragraph',
              text: 'The content below sits in the footnotes of the original document and is very easy to overlook, yet it determines how many indicators are understood and answered.',
            },
            {
              kind: 'pairs',
              rows: [
                {
                  label:
                    'Classification of enterprises by environmental criteria (Article 28 of the Law on Environmental Protection 2020)',
                  text: 'Group 1: Enterprises of large scale and capacity with a high risk of adverse environmental impact, and medium-scale enterprises with environmentally sensitive factors. Group 2: Enterprises of medium scale and capacity with a risk of adverse environmental impact, and small-scale enterprises with environmentally sensitive factors. Group 3: Enterprises of small scale and capacity with a risk of causing environmental pollution that must be managed and treated as prescribed. Group 4: Enterprises with no risk of adverse environmental impact.',
                },
                {
                  label:
                    'Part II - Organisational structure, model and key personnel: what does the Evaluation Council want to see?',
                  text: "Part II provides the CSI 2026 Programme's Evaluation Council with information on the organisational structure, operational arrangements and the assignment of duties to departments/divisions, especially the unit/personnel in charge of sustainable development, and the decision-making process of the entire enterprise within the scope of participation in the Programme. Enterprises are required to provide an organisational chart and documents assigning duties.",
                },
                {
                  label: 'Energy use reporting: sector-specific rules',
                  text: 'Producers of steel, beer, soft drinks, cane sugar, paper, processed seafood and plastics report energy use results using the methods prescribed in the relevant Circulars of the Ministry of Industry and Trade. Other units report the energy consumption for 01 main product or service.',
                },
                {
                  label: 'Research - development - innovation: distinguishing two indicators',
                  text: 'Process and product improvement from research - development - innovation - application of science and technology is an INTERNAL activity of the enterprise aimed at optimising management processes, improving productivity and operational quality, protecting the environment and enhancing competitiveness. Application and commercialisation of products from research - development - innovation is an activity directed OUTSIDE the enterprise, aimed at introducing new products and new production and business processes serving production, business and daily life. This is the basis for distinguishing indicators G 22 and G 23.',
                },
                {
                  label: 'What is IFRS and why does CSI 2026 mention it',
                  text: "IFRS (International Financial Reporting Standards) is a set of standards and rules issued by the International Accounting Standards Board (IASB) to create a global accounting framework, helping accountants, auditors and investors better understand an enterprise's financial position, while enhancing transparency and accountability. The Ministry of Finance has issued a roadmap for applying IFRS in Vietnam. IFRS S1 sets out general requirements for sustainability-related information, and IFRS S2 sets out climate-related disclosures.",
                },
                {
                  label: 'Four steps to build a materiality matrix (per the notes of the Index)',
                  text: 'Building a materiality analysis matrix should follow these steps: (1) Define the scope and stakeholders; (2) Identify material issues; (3) Assess their level of importance; (4) Build and validate the matrix. This matrix helps the enterprise focus time and resources on core issues, improving operational efficiency and risk management.',
                },
                {
                  label: "Sustainable development orientation in the enterprise's commitments",
                  text: 'A corporate sustainable development orientation requires commitments on environment, labour - social and governance together with economic performance, with specific targets for each period, to ensure long-term growth without compromising the future. These targets need to be thoroughly communicated within the leadership and down to every department and employee so that they are achieved.',
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
        'GLOSSARY AND LEGAL REFERENCES',
        'For quick reference during self-assessment',
        'This list of legal documents is for reference only. Enterprises should check the consolidated versions in force at the time of application and seek legal advice when needed.',
      ],
      sections: [
        {
          id: 'glossary-s1',
          title: 'A. GLOSSARY',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'CSI',
                  text: 'Corporate Sustainability Index - the sustainable enterprise index issued by VCCI/VBCSD, used as the scoring basis for the Programme for Assessing and Announcing Sustainable Enterprises in Vietnam.',
                },
                {
                  label: 'VCCI',
                  text: 'Vietnam Chamber of Commerce and Industry - the lead organisation of the CSI Programme.',
                },
                {
                  label: 'VBCSD',
                  text: 'Vietnam Business Council for Sustainable Development - the implementing organisation of the CSI Programme.',
                },
                {
                  label: 'ESG',
                  text: "Environmental - Social - Governance: the three groups of Environmental, Social and Governance factors used to assess an enterprise's level of sustainability.",
                },
                {
                  label: 'C (Core) indicator',
                  text: "CSI's core indicators, tied to legal compliance. Enterprises need to complete all C indicators relevant to their specific characteristics.",
                },
                {
                  label: 'A (Advance) indicator',
                  text: "CSI's advanced indicators, tied to programmes and actions that reduce environmental - social risks and build a sustainable business ecosystem.",
                },
                {
                  label: 'I (Indicator) indicators',
                  text: 'Group of results indicators, requiring performance data for the 3 years of the assessment period.',
                },
                {
                  label: 'G (Governance) indicators',
                  text: 'Group of corporate governance indicators.',
                },
                {
                  label: 'E (Environment) indicators',
                  text: 'Group of environmental indicators.',
                },
                {
                  label: 'L&S (Labor and Social) indicators',
                  text: 'Group of labour and social indicators.',
                },
                {
                  label: 'Material issues (materiality)',
                  text: 'The economic, environmental, social and governance issues with the greatest impact on the enterprise and its stakeholders, identified through a materiality matrix.',
                },
                {
                  label: 'Stakeholder',
                  text: "Groups affected by or influencing the enterprise's operations: employees, customers, suppliers, communities, regulators, investors.",
                },
                {
                  label: 'Greenhouse gas inventory',
                  text: "Identifying and calculating the enterprise's greenhouse gas emissions using prescribed methods and emission factors.",
                },
                {
                  label: 'Scope 1 emissions',
                  text: 'Direct greenhouse gas emissions from sources owned or controlled by the enterprise, for example on-site fuel combustion.',
                },
                {
                  label: 'Scope 2 emissions',
                  text: 'Indirect emissions from electricity, heat and steam purchased and used by the enterprise.',
                },
                {
                  label: 'Emission intensity',
                  text: 'Total greenhouse gas emissions divided by a unit of output, usually revenue or production volume.',
                },
                {
                  label: 'EPR',
                  text: 'Extended Producer Responsibility - the extended responsibility of producers and importers for recycling products and packaging and for waste treatment.',
                },
                {
                  label: 'Circular economy',
                  text: 'An economic model in which materials are kept in use for as long as possible through durable design, repair, reuse and recycling, instead of extract - use - dispose.',
                },
                {
                  label: 'Greenwashing',
                  text: 'Making claims about the environmental benefits of a product, service or enterprise without verifiable evidence, misleading consumers.',
                },
                {
                  label: 'DEI',
                  text: 'Diversity, Equity and Inclusion - diversity, equity and inclusion in the workplace.',
                },
                {
                  label: 'ISSB / IFRS S1, S2',
                  text: 'The International Sustainability Standards Board and its two disclosure standards: S1 on general requirements for sustainability-related information, S2 on climate-related information.',
                },
                {
                  label: 'TCFD',
                  text: 'Task Force on Climate-related Financial Disclosures - a framework for climate-related financial disclosures.',
                },
                {
                  label: 'SDGs',
                  text: 'The 17 United Nations Sustainable Development Goals to 2030.',
                },
                {
                  label: 'Business continuity plan (BCP)',
                  text: "A plan to ensure the enterprise's operations are not interrupted in the event of natural disasters, epidemics, incidents or supply chain disruptions.",
                },
                {
                  label: 'IFRS S1, S2',
                  text: 'The two sustainability disclosure standards of the International Sustainability Standards Board (ISSB): S1 sets out general requirements for sustainability-related information, S2 sets out climate-related disclosures. CSI 2026 encourages enterprises in international supply chains to additionally prepare certain metrics under these two standards.',
                },
                {
                  label: 'Grouping of enterprises by environmental criteria',
                  text: 'The classification under Article 28 of the Law on Environmental Protection 2020 into 4 groups, based on scale, capacity and the level of risk of adverse environmental impact. The enterprise\'s group determines whether it needs an environmental permit or only an environmental registration. See details on the "CSI 2026 Introduction" page.',
                },
                {
                  label: 'Key energy-using facility',
                  text: 'A facility whose energy consumption reaches the threshold prescribed by the law on economical and efficient use of energy, and which must carry out periodic energy audits and report on its energy use.',
                },
                {
                  label: 'Occupational environment monitoring',
                  text: 'Measuring and analysing harmful factors in the workplace such as dust, noise, vibration, lighting, temperature and toxic gases.',
                },
              ],
            },
          ],
        },
        {
          id: 'glossary-s2',
          title: 'B. COMMONLY REFERENCED LEGAL BASES',
          blocks: [
            {
              kind: 'table',
              headers: ['Document', 'Relevant content', 'Related CSI indicators'],
              rows: [
                [
                  'Law on Environmental Protection 2020 (Law No. 72/2020/QH14)',
                  'Environmental permits, environmental registration, grouping of enterprises by environmental criteria (Article 28), EPR, waste management',
                  'E 1 - E 10, E 23, E 24',
                ],
                [
                  'Decree 08/2022/ND-CP detailing a number of articles of the Law on Environmental Protection',
                  'Guidance on environmental permits, waste management, recycling responsibility',
                  'E 1, E 4, E 5, E 7',
                ],
                [
                  'Decree 06/2022/ND-CP on greenhouse gas emission mitigation and ozone layer protection',
                  'Greenhouse gas inventory, emission mitigation plan',
                  'E 21, I 29, I 30',
                ],
                [
                  'Decision of the Prime Minister promulgating the list of sectors and greenhouse gas emitting facilities required to conduct an inventory (Decision 13/2024/QD-TTg and updating documents)',
                  'Determining whether the enterprise is subject to mandatory greenhouse gas inventory',
                  'E 21',
                ],
                [
                  'Law on Economical and Efficient Use of Energy 2010',
                  'Key energy-using facilities, energy audits, energy use reporting',
                  'E 17, E 18',
                ],
                [
                  'Labour Code 2019 (Law No. 45/2019/QH14)',
                  'Labour contracts, internal labour regulations, working hours, labour discipline, workplace dialogue',
                  'L 1 - L 14, L 26 - L 29, L 53 - L 58',
                ],
                [
                  'Decree 145/2020/ND-CP guiding the Labour Code',
                  'Grassroots democracy regulations, employee conferences, female workers, working conditions',
                  'L 53 - L 61',
                ],
                [
                  'Law on Occupational Safety and Health 2015 (Law No. 84/2015/QH13)',
                  'OSH plan, safety training, equipment inspection, occupational environment monitoring, occupational accident reporting',
                  'L 30 - L 45, I 19',
                ],
                [
                  'Law on Social Insurance 2024 (Law No. 41/2024/QH15, effective from 01/7/2025)',
                  'Subjects and contribution rates of compulsory social insurance',
                  'L 15, I 16',
                ],
                [
                  'Law on Trade Unions and current guiding documents',
                  'Establishing grassroots trade unions, trade union fees, collective bargaining, collective labour agreements',
                  'L 47 - L 52',
                ],
                [
                  'Decree 13/2023/ND-CP on personal data protection',
                  'Collection, storage, processing and use of personal data of customers and employees',
                  'S 3',
                ],
                [
                  'Law on Consumer Rights Protection 2023',
                  'Responsibility for product quality and safety, truthful information to consumers',
                  'S 1, S 2',
                ],
                [
                  'Decree 80/2021/ND-CP',
                  'Criteria for determining micro, small and medium enterprises (Article 5) - the basis for choosing the appropriate CSI edition',
                  'All',
                ],
              ],
            },
          ],
        },
      ],
    },
    profile: {
      title: 'COMPANY PROFILE',
      subtitle:
        'Section A - Part I: Company information | Part II: Organisational structure and key personnel',
      note: 'Yellow cells are cells the enterprise needs to fill in. Data must cover all 3 years 2023 - 2025 of the assessment period.',
      generalTitle: 'GENERAL INFORMATION',
      generalFields: [
        {
          id: 'general-1',
          label: 'Full name of the enterprise (as per business registration)',
        },
        {
          id: 'general-2',
          label: 'Abbreviated name of the enterprise',
        },
        {
          id: 'general-3',
          label: 'Company website',
        },
        {
          id: 'general-4',
          label: 'Year of establishment',
        },
        {
          id: 'general-5',
          label: 'Tax code',
        },
        {
          id: 'general-6',
          label: 'Registered business address',
        },
        {
          id: 'general-7',
          label: 'Operating address',
        },
        {
          id: 'general-8',
          label: 'Phone number',
        },
        {
          id: 'general-9',
          label: 'Business email',
        },
        {
          id: 'general-10',
          label:
            'Type of enterprise by main ownership capital (Non-state enterprise / FDI / Other type)',
          options: [
            {
              value: 'o1',
              label: 'Non-state enterprise',
            },
            {
              value: 'o2',
              label: 'FDI',
            },
            {
              value: 'o3',
              label: 'Other type',
            },
          ],
        },
        {
          id: 'general-11',
          label: 'Enterprise size under Article 5 of Decree 80/2021/ND-CP (Small / Micro)',
          options: [
            {
              value: 'o1',
              label: 'Small',
            },
            {
              value: 'o2',
              label: 'Micro',
            },
          ],
        },
        {
          id: 'general-12',
          label:
            'Classification by environmental criteria - Article 28 of the Law on Environmental Protection 2020 (Group 2 / Group 3 / Group 4)',
          options: [
            {
              value: 'o1',
              label: 'Group 2',
            },
            {
              value: 'o2',
              label: 'Group 3',
            },
            {
              value: 'o3',
              label: 'Group 4',
            },
          ],
        },
        {
          id: 'general-13',
          label:
            'Field of activity (Specialising in manufacturing, processing / Specialising in construction, trade - services)',
          options: [
            {
              value: 'o1',
              label: 'Specialising in manufacturing, processing',
            },
            {
              value: 'o2',
              label: 'Specialising in construction, trade - services',
            },
          ],
        },
        {
          id: 'general-14',
          label: 'Main business lines currently in actual operation',
        },
        {
          id: 'general-15',
          label: 'Legal representative - full name, title, phone, email',
        },
        {
          id: 'general-16',
          label: 'CSI contact person - full name, title, phone, email, mailing address',
        },
      ],
      infoBlocks: [
        {
          id: 'env-group',
          title:
            'Classification of enterprises by environmental criteria (Article 28 of the Law on Environmental Protection 2020)',
          text: 'Group 1: Enterprises of large scale and capacity with a high risk of adverse environmental impact, and medium-scale enterprises with environmentally sensitive factors. Group 2: Enterprises of medium scale and capacity with a risk of adverse environmental impact, and small-scale enterprises with environmentally sensitive factors. Group 3: Enterprises of small scale and capacity with a risk of causing environmental pollution that must be managed and treated as prescribed. Group 4: Enterprises with no risk of adverse environmental impact.',
        },
        {
          id: 'structure',
          title:
            'Part II - Organisational structure, model and key personnel: what does the Evaluation Council want to see?',
          text: "Part II provides the CSI 2026 Programme's Evaluation Council with information on the organisational structure, operational arrangements and the assignment of duties to departments/divisions, especially the unit/personnel in charge of sustainable development, and the decision-making process of the entire enterprise within the scope of participation in the Programme. Enterprises are required to provide an organisational chart and documents assigning duties.",
        },
      ],
      yearTables: [
        {
          id: 'economy',
          title: 'ECONOMIC INFORMATION',
          headers: ['Description', '2023', '2024', '2025', 'Notes / attached documents'],
          rows: [
            {
              id: 'economy-1',
              label: 'Registered business capital (million VND)',
            },
            {
              id: 'economy-2',
              label: 'Total capital invested in production - business (million VND)',
            },
            {
              id: 'economy-3',
              label: 'Financial statements (audited preferred) - specify the attached file name',
            },
          ],
        },
        {
          id: 'materials',
          title: 'INPUT MATERIAL CONSUMPTION (main materials)',
          headers: ['Description', '2023', '2024', '2025', 'Notes / attached documents'],
          rows: [
            {
              id: 'materials-1',
              label: 'Material 1 - specify name and unit of measure',
            },
            {
              id: 'materials-2',
              label: 'Material 2',
            },
            {
              id: 'materials-3',
              label: 'Material 3',
            },
            {
              id: 'materials-4',
              label: 'Material 4',
            },
          ],
        },
        {
          id: 'energy',
          title: 'ANNUAL ENERGY CONSUMPTION',
          headers: ['Description', '2023', '2024', '2025', 'Notes / attached documents'],
          rows: [
            {
              id: 'energy-1',
              label: 'Electricity (kWh)',
            },
            {
              id: 'energy-2',
              label: 'Oil (litres)',
            },
            {
              id: 'energy-3',
              label: 'Petrol (litres)',
            },
            {
              id: 'energy-4',
              label: 'Coal (tonnes)',
            },
            {
              id: 'energy-5',
              label: 'Biomass (MJ)',
            },
            {
              id: 'energy-6',
              label: 'Other energy - specify',
            },
          ],
        },
        {
          id: 'water',
          title: 'ANNUAL WATER CONSUMPTION',
          headers: ['Description', '2023', '2024', '2025', 'Notes / attached documents'],
          rows: [
            {
              id: 'water-1',
              label: 'Surface water (m3)',
            },
            {
              id: 'water-2',
              label: 'Groundwater (m3)',
            },
            {
              id: 'water-3',
              label: 'Rainwater (m3)',
            },
            {
              id: 'water-4',
              label: 'Domestic water (m3)',
            },
            {
              id: 'water-5',
              label: 'Other water sources (m3)',
            },
          ],
        },
        {
          id: 'waste',
          title: 'WASTE AND EMISSIONS GENERATED',
          headers: ['Description', '2023', '2024', '2025', 'Notes / attached documents'],
          rows: [
            {
              id: 'waste-1',
              label: 'Wastewater (m3)',
            },
            {
              id: 'waste-2',
              label: 'Domestic solid waste (tonnes)',
            },
            {
              id: 'waste-3',
              label: 'Ordinary industrial solid waste (tonnes)',
            },
            {
              id: 'waste-4',
              label: 'Hazardous industrial solid waste (tonnes)',
            },
            {
              id: 'waste-5',
              label: 'Product packaging (tonnes)',
            },
            {
              id: 'waste-6',
              label: 'Plastic waste (tonnes)',
            },
            {
              id: 'waste-7',
              label: 'Air-polluting emissions - specify type and unit (excluding greenhouse gases)',
            },
          ],
        },
        {
          id: 'labor',
          title: 'LABOUR INFORMATION',
          headers: ['Description', '2023', '2024', '2025', 'Notes / attached documents'],
          rows: [
            {
              id: 'labor-1',
              label: 'Total number of official employees (persons)',
            },
            {
              id: 'labor-2',
              label: 'Number of female employees (persons)',
            },
            {
              id: 'labor-3',
              label: 'Number of employees who left, including retirement (persons)',
            },
            {
              id: 'labor-4',
              label: 'Number of newly recruited employees (persons)',
            },
            {
              id: 'labor-5',
              label: 'Number of minor employees, if any (persons)',
            },
            {
              id: 'labor-6',
              label: 'Number of employees with disabilities, if any (persons)',
            },
            {
              id: 'labor-7',
              label:
                'Number of female managers at middle level, deputy head of department and above (persons)',
            },
            {
              id: 'labor-8',
              label:
                'Number of female leaders on the board of directors, board of management (persons)',
            },
            {
              id: 'labor-9',
              label: 'Number of labour disputes occurring at the workplace (cases)',
            },
          ],
        },
      ],
      standards: {
        title:
          'STANDARDS AND CERTIFICATIONS CURRENTLY APPLIED (valid as of the time of participation in the CSI Programme)',
        rows: [
          {
            id: 'standard-1',
            label: 'Quality standards',
          },
          {
            id: 'standard-2',
            label: 'Environmental standards',
          },
          {
            id: 'standard-3',
            label: 'Labour - social standards',
          },
        ],
      },
      violations: {
        title:
          'ADMINISTRATIVE VIOLATIONS DURING THE ASSESSMENT PERIOD (from 01/01/2023 to the time of submission)',
        headers: [
          'Content',
          'Any violation? (Yes/No)',
          'Fully remedied?',
          'Certifying authority',
          'Supporting documents',
        ],
        rows: [
          {
            id: 'violation-1',
            label: 'Administrative violations on environmental protection',
          },
          {
            id: 'violation-2',
            label: 'Administrative violations in labour, social insurance, trade unions',
          },
          {
            id: 'violation-3',
            label: 'Administrative violations in taxes, fees',
          },
          {
            id: 'violation-4',
            label: 'Other administrative violations (please specify)',
          },
        ],
      },
      sectionA: {
        title: 'SELF-ASSESSMENT OF SECTION A COMPLETENESS',
        headers: ['Content', 'Maximum points', 'Fully completed? (Yes/No)', 'Self-assessed points'],
        rows: [
          {
            id: 'part-1',
            label: 'Part I - Company information',
            maxScore: 14,
          },
          {
            id: 'part-2',
            label: 'Part II - Organisational structure, model and key personnel',
            maxScore: 4,
          },
        ],
      },
    },
    sections: [
      {
        id: 'I',
        title: 'RESULTS INDICATORS FOR THE 3 YEARS 2023 - 2025 (I INDICATORS)',
        subtitle:
          'Part III of the CSI 2026 Indicator Set | 22 indicators (18 C indicators, 4 A indicators) | Published maximum: 178 points',
        note: 'Enter the actual figures for each year, then select the level of data and evidence currently available.',
        shortLabel: 'I indicators',
        dashboardLabel: '3-year results indicators (I)',
        publishedMax: 178,
        headers: {
          code: 'Indicator code',
          level: 'Level',
          text: 'Indicator',
          unit: 'Unit',
          y2023: '2023',
          y2024: '2024',
          y2025: '2025',
          maxScore: 'Maximum points',
          answer: 'Complete data for all 3 years available? (Yes/No)',
          selfScore: 'Self-assessed points',
          available: 'Applicable points',
          priority: 'Priority',
          hint: 'Suggested action',
          evidence: 'Supporting evidence to prepare',
          note: 'Notes / existing records',
          owner: 'Owner',
          deadline: 'Due date',
          group: 'Group',
        },
        groups: [
          {
            id: 'i-g1',
            title: 'ECONOMIC',
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
                    text: 'Total revenue',
                    unit: 'Million VND',
                    maxScore: 20,
                    hint: 'Extract revenue figures for the 3 years 2023-2025 from the financial statements. If revenue declined, prepare an explanation of the causes and remedial measures.',
                    evidence:
                      'Financial statements for 3 years (audited preferred); corporate income tax finalisation returns.',
                  },
                  {
                    id: 'I 3',
                    level: 'C',
                    text: 'Profit before tax',
                    unit: 'Million VND',
                    maxScore: 20,
                    hint: 'Extract profit before tax for the 3 years. Ensure the figures match the financial statements and tax returns.',
                    evidence:
                      'Income statements for 3 years; corporate income tax finalisation returns.',
                  },
                  {
                    id: 'I 4',
                    level: 'C',
                    text: 'Return on equity (ROE)',
                    unit: '%',
                    maxScore: 9,
                    hint: "Calculate ROE = Profit after tax / Average owners' equity. Present the formula used so that the Evaluation Council can cross-check it.",
                    evidence: 'ROE calculation sheet with formula; balance sheets for 3 years.',
                  },
                  {
                    id: 'I 5',
                    level: 'C',
                    text: 'Return on assets (ROA)',
                    unit: '%',
                    maxScore: 9,
                    hint: 'Calculate ROA = Profit after tax / Average total assets.',
                    evidence: 'ROA calculation sheet with formula; balance sheets for 3 years.',
                  },
                  {
                    id: 'I 6',
                    level: 'C',
                    text: 'Return on sales (ROS)',
                    unit: '%',
                    maxScore: 9,
                    hint: 'Calculate ROS = Profit after tax / Net revenue.',
                    evidence: 'ROS calculation sheet with formula; income statements for 3 years.',
                  },
                  {
                    id: 'I 7',
                    level: 'C',
                    text: 'Total contributions to the State budget',
                    unit: 'Million VND',
                    maxScore: 14,
                    hint: 'Aggregate all amounts paid to the State budget: corporate income tax, VAT, foreign contractor tax, fees, charges, land rent...',
                    evidence:
                      'Tax authority confirmation of tax obligations; State budget payment vouchers for 3 years.',
                  },
                  {
                    id: 'I 8',
                    level: 'A',
                    text: 'Budget for community and social support through programmes/initiatives',
                    unit: 'Million VND',
                    maxScore: 6,
                    hint: 'Compile the total budget spent on the community and society by year and by programme. State the number of beneficiaries clearly to make the case more convincing.',
                    evidence:
                      'List of community programmes with budgets; expenditure vouchers; thank-you letters/confirmations from recipient partners.',
                  },
                ],
              },
            ],
          },
          {
            id: 'i-g2',
            title: 'SOCIAL',
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
                    text: 'Percentage of women in middle management (deputy head of department and above)',
                    unit: '%',
                    maxScore: 4,
                    hint: 'Calculate the percentage of women holding management positions at deputy head of department level and above. If the percentage is low, state a clear improvement plan in the commitments section.',
                    evidence:
                      'Organisational chart; list of managers by gender; appointment decisions.',
                  },
                  {
                    id: 'I 13',
                    level: 'C',
                    text: 'Percentage of women leaders on the Executive Board and Board of Directors',
                    unit: '%',
                    maxScore: 4,
                    hint: "Calculate the percentage of women on the Executive Board/Board of Directors/Members' Council.",
                    evidence:
                      'Charter; list of Board of Directors / Executive Board members; appointment decisions.',
                  },
                  {
                    id: 'I 14',
                    level: 'C',
                    text: 'Average monthly income of employees',
                    unit: 'Million VND',
                    maxScore: 13,
                    hint: 'Calculate the average monthly income of all employees (including salary, allowances and bonuses). Compare it with the applicable regional minimum wage.',
                    evidence:
                      'Payrolls for 3 years; total payroll fund reports; personal income tax returns.',
                  },
                  {
                    id: 'I 15',
                    level: 'C',
                    text: 'Average monthly income of employees by gender (male/female)',
                    unit: 'Million VND',
                    maxScore: 8,
                    hint: 'Break down average income by gender (male/female). Large gaps need to be explained based on the job position structure.',
                    evidence: 'Payroll analysed by gender; remuneration regulations.',
                  },
                  {
                    id: 'I 16',
                    level: 'C',
                    text: 'Percentage of employees covered by all types of compulsory insurance out of total employees subject to compulsory contributions',
                    unit: '%',
                    maxScore: 13,
                    hint: 'Calculate the percentage of employees for whom compulsory social insurance is paid out of the total employees subject to contributions. The target is 100%.',
                    evidence:
                      'Notice of social insurance contribution results (form C12-TS); confirmation of no social insurance arrears from the social insurance agency.',
                  },
                  {
                    id: 'I 17',
                    level: 'C',
                    text: 'Annual training hours per employee among those requiring training (orientation and onboarding; compliance; soft skills; professional skills; other training)',
                    unit: 'Hours/employee',
                    maxScore: 6,
                    hint: 'Compile the average training hours per employee across 5 groups: orientation and onboarding, compliance, soft skills, professional skills, other.',
                    evidence:
                      'Annual training plan; attendance lists and training certificates; training hours summary sheet.',
                  },
                  {
                    id: 'I 19',
                    level: 'C',
                    text: 'Number of occupational accidents and incidents occurring during the reporting period (2023-2025)',
                    unit: 'Cases',
                    maxScore: 8,
                    hint: 'Record the number of occupational accidents and incidents over the whole 2023-2025 period. If none occurred, state 0 clearly and attach periodic occupational safety and health reports as proof.',
                    evidence:
                      'Occupational accident log; accident investigation reports (if any); periodic occupational safety and health reports.',
                  },
                ],
              },
            ],
          },
          {
            id: 'i-g3',
            title: 'ENVIRONMENT - CLIMATE CHANGE',
            declaredMax: 41,
            blocks: [
              {
                id: 'i-g3-b1',
                title: '» Materials and solid waste management',
                declaredMax: 17,
                indicators: [
                  {
                    id: 'I 22',
                    level: 'A',
                    text: 'Activities and initiatives implemented to reduce plastic waste (number of activities; investment level; amount of plastic waste recycled or reused)',
                    unit: 'Number/Million VND/Tonnes',
                    maxScore: 3,
                    hint: 'List each plastic reduction initiative (replacing packaging, eliminating single-use plastic bottles, packaging take-back...), together with the investment level and the volume of plastic recycled.',
                    evidence:
                      'Initiative implementation plans/minutes; photos; investment vouchers; volume tracking logs.',
                  },
                  {
                    id: 'I 23',
                    level: 'C',
                    text: 'Amount of solid waste sorted, collected, stored, transported and treated (domestic; ordinary industrial; hazardous industrial)',
                    unit: 'Tonnes',
                    maxScore: 8,
                    hint: 'Record the volume of solid waste sorted, collected and treated in 3 groups: domestic, ordinary industrial and hazardous industrial. Separate figures are needed for each group and each year, reconcilable with the waste handover documents.',
                    evidence:
                      'Waste handover documents; contracts with licensed treatment providers; waste generator register.',
                  },
                  {
                    id: 'I 24',
                    level: 'C',
                    text: 'Direct costs related to solid waste management',
                    unit: 'Million VND',
                    maxScore: 6,
                    hint: 'Aggregate the direct costs of solid waste management: collection and treatment fees, hiring of transport providers, depreciation of storage areas.',
                    evidence: 'Waste treatment service contracts; invoices and payment vouchers.',
                  },
                ],
              },
              {
                id: 'i-g3-b2',
                title: '» Energy and fuel consumption',
                declaredMax: 6,
                indicators: [
                  {
                    id: 'I 27',
                    level: 'A',
                    text: 'Percentage of energy saved through the application of energy saving and efficiency measures',
                    unit: '%',
                    maxScore: 6,
                    hint: 'Calculate the amount of energy saved through improvement measures, divided by total energy used. State clearly which measures produced those savings.',
                    evidence:
                      'Energy audit report; before-and-after consumption comparison table; electricity bills.',
                  },
                ],
              },
              {
                id: 'i-g3-b3',
                title: '» Water management and use',
                declaredMax: 18,
                indicators: [
                  {
                    id: 'I 31',
                    level: 'C',
                    text: 'Typical water consumption per unit of product/service',
                    unit: 'm3/product',
                    maxScore: 8,
                    hint: 'Calculate water consumption per unit of product/service. Installing water meters by area will make the data more accurate.',
                    evidence:
                      'Water bills/water abstraction licence; meter logs; production output.',
                  },
                  {
                    id: 'I 32',
                    level: 'C',
                    text: 'Percentage of water consumption saved through the application of measures to enhance water saving and efficiency',
                    unit: '%',
                    maxScore: 4,
                    hint: 'Calculate the percentage of water saved through improvement measures out of total water used.',
                    evidence:
                      'Before-and-after water consumption comparison table; description of water saving measures.',
                  },
                  {
                    id: 'I 33',
                    level: 'C',
                    text: 'Percentage of wastewater collected and treated to meet technical standards and regulations before discharge into the environment',
                    unit: '%',
                    maxScore: 4,
                    hint: 'Calculate the percentage of wastewater collected and treated to meet technical regulations before discharge. The target is 100%.',
                    evidence:
                      'Periodic wastewater monitoring results; environmental permit; wastewater connection/treatment contract.',
                  },
                  {
                    id: 'I 35',
                    level: 'A',
                    text: 'Activities and initiatives implemented to regenerate and restore water sources (number; investment level; amount of water regenerated)',
                    unit: 'Number/Million VND/m3',
                    maxScore: 2,
                    hint: 'List initiatives to regenerate and restore water sources (upstream reforestation, rainwater harvesting, restoration of ponds and lakes...) together with the investment level and water volume.',
                    evidence:
                      'Implementation plans and minutes; photos; investment vouchers; confirmation from local authorities.',
                  },
                ],
              },
            ],
          },
        ],
        total: {
          label: 'TOTAL',
          maxScore: 184,
        },
      },
      {
        id: 'G',
        title: 'CORPORATE GOVERNANCE INDICATORS (G INDICATORS)',
        subtitle:
          'Part IV of the CSI 2026 Indicator Set | 8 indicators (7 C indicators, 1 A indicator) | Published maximum: 70 points',
        note: 'Select the implementation level for each indicator. Only select "Fully implemented, with records" when supporting documents actually exist.',
        shortLabel: 'G indicators',
        dashboardLabel: 'Governance indicators (G)',
        publishedMax: 70,
        headers: {
          code: 'Indicator code',
          level: 'Level',
          text: 'Indicator',
          maxScore: 'Maximum points',
          answer: 'Implemented at the enterprise (Yes/No)',
          selfScore: 'Self-assessed points',
          available: 'Applicable points',
          priority: 'Priority',
          hint: 'Suggested action',
          evidence: 'Supporting evidence to prepare',
          note: 'Notes / existing records',
          owner: 'Owner',
          deadline: 'Due date',
          group: 'Group',
        },
        groups: [
          {
            id: 'g-g1',
            title: 'SUSTAINABLE DEVELOPMENT COMMITMENT',
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
                    text: "The enterprise's business plan includes environmental and social targets",
                    maxScore: 10,
                    hint: 'Include at least one environmental target and one social target with specific figures in the annual business plan, approved by leadership. For medium and large enterprises, also link them to the Sustainable Development Goals (SDGs) on which the enterprise has the clearest impact.',
                    evidence:
                      'Signed and approved annual business plan clearly showing E and S targets; minutes of the meeting adopting the plan.',
                  },
                ],
              },
            ],
          },
          {
            id: 'g-g2',
            title: 'RISK MANAGEMENT',
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
                    text: 'Develop policies, procedures and an organisational structure for risk management in production/business activities',
                    maxScore: 6,
                    hint: 'Issue a risk management policy and procedure, clearly assigning who identifies, who assesses and who approves mitigation measures. Small enterprises can keep this to 2-3 pages.',
                    evidence:
                      'Risk management policy/regulations; responsibility assignment chart; minutes of periodic risk reviews.',
                  },
                ],
              },
            ],
          },
          {
            id: 'g-g3',
            title: 'ENSURING CUSTOMER SATISFACTION',
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
                    text: 'Develop policies, procedures and information channels, and collect feedback, conduct surveys and evaluate customer satisfaction with products/services in order to make improvements',
                    maxScore: 14,
                    hint: 'Set up channels for collecting customer feedback (surveys, hotline, online forms) and conduct a satisfaction survey at least once a year, with a results report and improvement actions.',
                    evidence:
                      'Survey policy/procedure; questionnaire; survey results report; post-survey improvement minutes.',
                  },
                  {
                    id: 'G 13',
                    level: 'C',
                    text: 'Implement a procedure for handling complaints, feedback and whistleblowing reports of misconduct from customers and stakeholders',
                    maxScore: 14,
                    hint: 'Issue a procedure for handling complaints and whistleblowing reports, specifying response deadlines and whistleblower protection mechanisms. Keep a log tracking each case.',
                    evidence:
                      'Complaint handling procedure; complaint log and handling results; evidence of publication of the intake channels.',
                  },
                ],
              },
            ],
          },
          {
            id: 'g-g4',
            title: 'SPECIFIC POLICIES',
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
                    text: 'Develop and implement a policy/provisions on preventing sexual harassment in the workplace',
                    maxScore: 6,
                    hint: 'Issue a policy on preventing sexual harassment in the workplace and incorporate it into the labour regulations, together with a confidential complaint procedure and training for employees.',
                    evidence:
                      'Policy/provisions in the labour regulations; training materials and attendance lists; complaint intake procedure.',
                  },
                  {
                    id: 'G 19',
                    level: 'C',
                    text: 'Develop and implement a policy/commitment/code of conduct on preventing the trade, consumption and use of wildlife and products derived from wildlife',
                    maxScore: 6,
                    hint: 'Issue a commitment not to trade, consume or use wildlife and wildlife products; apply it also to client entertainment and corporate gifts.',
                    evidence:
                      'Signed policy/commitment; evidence of internal dissemination; content integrated into the code of conduct.',
                  },
                ],
              },
            ],
          },
          {
            id: 'g-g5',
            title: 'COMMUNICATIONS',
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
                    text: 'Establish forms of communication with partners and stakeholders, and forms/channels for receiving feedback from stakeholders',
                    maxScore: 8,
                    hint: 'Clearly define communication channels to partners and stakeholders (website, newsletter, fanpage, partner meetings) and two-way feedback channels.',
                    evidence:
                      'Communications plan; screenshots/links of the channels; feedback recording and handling log.',
                  },
                ],
              },
            ],
          },
          {
            id: 'g-g6',
            title: 'RESEARCH & DEVELOPMENT - INNOVATION - APPLICATION OF SCIENCE AND TECHNOLOGY',
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
                    text: 'Carry out research and development, innovation and science and technology application activities (organising, training, investment...) to improve corporate governance processes, innovate products... contributing to the sustainable development of the enterprise',
                    maxScore: 6,
                    hint: 'This indicator concerns INTERNAL activities: process improvement and product improvement aimed at optimising governance processes, improving productivity and operational quality, protecting the environment and enhancing competitiveness. Record each activity together with its investment level. Do not confuse this with G 23 (externally oriented).',
                    evidence:
                      'R&D decisions/plans; investment vouchers; research results reports; illustrative photos.',
                  },
                ],
              },
            ],
          },
        ],
        total: {
          label: 'TOTAL',
          maxScore: 70,
        },
      },
      {
        id: 'E',
        title: 'ENVIRONMENTAL INDICATORS (E INDICATORS)',
        subtitle:
          'Part V of the CSI 2026 Indicator Set | 14 indicators (13 C indicators, 1 A indicator) | Published maximum points: 138 points',
        note: 'Most E indicators are legal compliance indicators. Address all C indicators first.',
        shortLabel: 'E indicators',
        dashboardLabel: 'Environmental indicators (E)',
        publishedMax: 138,
        headers: {
          code: 'Indicator code',
          level: 'Level',
          text: 'Indicator',
          maxScore: 'Maximum points',
          answer: 'Implemented at the enterprise (Yes/No)',
          selfScore: 'Self-assessed points',
          available: 'Applicable points',
          priority: 'Priority',
          hint: 'Suggested action',
          evidence: 'Supporting evidence to prepare',
          note: 'Notes / existing records',
          owner: 'Owner',
          deadline: 'Due date',
          group: 'Group',
        },
        groups: [
          {
            id: 'e-g1',
            title: 'COMPLIANCE WITH ENVIRONMENTAL PROTECTION LAWS',
            declaredMax: 112,
            blocks: [
              {
                id: 'e-g1-b1',
                title:
                  '» Environmental permits; environmental taxes and fees, and environmental reporting',
                declaredMax: 42,
                indicators: [
                  {
                    id: 'E 1',
                    level: 'C',
                    text: 'Holds a valid environmental permit; environmental registration; and registration for surface water and groundwater extraction and use, as required by regulations',
                    maxScore: 14,
                    hint: 'Check which category the company falls into under Article 28 of the Law on Environmental Protection 2020 to determine whether an environmental permit or only an environmental registration is required. Review expiry dates and file for renewal 6 months in advance.',
                    evidence:
                      'Valid environmental permit/environmental registration certificate; surface water and groundwater extraction permits.',
                  },
                  {
                    id: 'E 2',
                    level: 'C',
                    text: 'Pays in full and on time all environmental protection taxes and fees for wastewater; emissions; surface water and groundwater use; environmental protection deposits; and payments for natural ecosystem services',
                    maxScore: 14,
                    hint: 'Review the environmental financial obligations applicable to the company: environmental protection fees for wastewater and emissions; water extraction right fees; deposits.',
                    evidence:
                      'Payment receipts for environmental protection fees and taxes; fee declarations; confirmation from the tax authority.',
                  },
                  {
                    id: 'E 3',
                    level: 'C',
                    text: 'Submits environmental protection reports, reports on surface water and groundwater extraction, chemical activities, and packaging and product recycling results fully and on time',
                    maxScore: 14,
                    hint: 'Set up reminders for the environmental protection report deadline (before 15 January each year) and for reports on water, chemicals and EPR.',
                    evidence:
                      'Submitted reports with receipts/acknowledgement stamps from the regulatory authority for all 3 years.',
                  },
                ],
              },
              {
                id: 'e-g1-b2',
                title:
                  '» Waste management, pollution prevention and control, and environmental incident response',
                declaredMax: 70,
                indicators: [
                  {
                    id: 'E 4',
                    level: 'C',
                    text: 'Complies with regulations on the sorting, collection, transport, storage and treatment of ordinary industrial solid waste and domestic solid waste',
                    maxScore: 14,
                    hint: 'Set up an area for waste sorting at source, contract a licensed collection provider and keep all waste handover records.',
                    evidence:
                      'Collection and treatment contracts; waste handover records; photos of the storage area with signage.',
                  },
                  {
                    id: 'E 5',
                    level: 'C',
                    text: 'Complies with regulations on the sorting, collection, transport, storage and treatment of hazardous solid waste',
                    maxScore: 14,
                    hint: 'Hazardous waste must be stored separately, with warning signs and a waste generator logbook, and handed over to a provider licensed to treat hazardous waste.',
                    evidence:
                      'Hazardous waste generator registration book; hazardous waste handover documents; contract with a licensed provider; photos of the storage facility.',
                  },
                  {
                    id: 'E 6',
                    level: 'C',
                    text: 'Complies with environmental protection regulations on the export, import and transit of used goods, machinery, equipment, vehicles, raw materials and scrap',
                    maxScore: 6,
                    hint: 'If the company exports or imports used machinery, equipment, raw materials or scrap, review import conditions and customs records. If this does not apply, select "Not applicable".',
                    evidence: 'Customs records; scrap import permits; inspection results.',
                  },
                  {
                    id: 'E 7',
                    level: 'C',
                    text: 'Complies with regulations on product and packaging recycling responsibility (EPR) and waste treatment responsibility',
                    maxScore: 6,
                    hint: 'Check whether the company is subject to extended producer responsibility (EPR). If so, register a recycling plan or make a financial contribution to the Vietnam Environmental Protection Fund on time.',
                    evidence:
                      'Recycling plan registration; financial contribution receipts; recycling results report.',
                  },
                  {
                    id: 'E 8',
                    level: 'C',
                    text: 'Uses chemicals, equipment and tools economically and safely',
                    maxScore: 6,
                    hint: 'Compile a list of chemicals in use, maintain safety data sheets (MSDS), store them in compliant storage and provide chemical safety training to those exposed.',
                    evidence:
                      'Chemical inventory; MSDS sheets; chemical incident prevention measures; training records.',
                  },
                  {
                    id: 'E 9',
                    level: 'C',
                    text: 'Is fully equipped with equipment and tools for risk prevention and environmental incident response',
                    maxScore: 12,
                    hint: 'Provide and periodically inspect incident response equipment: absorbent materials, spill containment bunds, fire extinguishers, protective equipment.',
                    evidence:
                      'List of incident response equipment; periodic inspection reports; photos; environmental incident response plan.',
                  },
                  {
                    id: 'E 10',
                    level: 'C',
                    text: 'Controls, monitors and supervises wastewater and emissions in accordance with current regulations',
                    maxScore: 12,
                    hint: 'Conduct periodic environmental monitoring at the frequency stated in the environmental permit, carried out by a licensed provider.',
                    evidence:
                      'Wastewater and emissions monitoring results for each period; contract with a qualified monitoring provider.',
                  },
                ],
              },
            ],
          },
          {
            id: 'e-g2',
            title:
              'ENVIRONMENTAL PROTECTION, CLIMATE CHANGE RESPONSE AND CIRCULAR ECONOMY ACTIVITIES',
            declaredMax: 16,
            blocks: [
              {
                id: 'e-g2-b1',
                title: '» Use of recycled and renewable raw materials, fuels and energy',
                declaredMax: 4,
                indicators: [
                  {
                    id: 'E 12',
                    level: 'A',
                    text: 'Implements policies that encourage and support employees in using low-emission transport',
                    maxScore: 4,
                    hint: 'Issue a policy encouraging employees to travel by bus, bicycle or electric vehicle, or to carpool; the company may subsidise costs or provide shuttle transport.',
                    evidence:
                      'Support policy; list of employees benefiting from the policy; payment records.',
                  },
                ],
              },
              {
                id: 'e-g2-b2',
                title: '» Economical and efficient use of energy',
                declaredMax: 6,
                indicators: [
                  {
                    id: 'E 17',
                    level: 'C',
                    text: 'Issues and regularly implements energy-saving practice rules',
                    maxScore: 6,
                    hint: 'Issue energy-saving practice rules (switching off equipment when not in use, air-conditioning temperature settings, periodic maintenance) and check compliance.',
                    evidence:
                      'Issued energy-saving rules; inspection reports; monthly electricity consumption data.',
                  },
                ],
              },
              {
                id: 'e-g2-b3',
                title: '» Sustainable extraction and use of raw materials and natural resources',
                declaredMax: 6,
                indicators: [
                  {
                    id: 'E 24',
                    level: 'C',
                    text: 'Protects biodiversity and prevents and combats the trade, transport and use of wildlife',
                    maxScore: 6,
                    hint: 'Issue a commitment to protect biodiversity and not consume wildlife; communicate it to all employees and apply it to client hospitality activities.',
                    evidence:
                      'Issued commitment/policy; internal communication materials; conservation activities participated in.',
                  },
                ],
              },
            ],
          },
          {
            id: 'e-g3',
            title: 'ENVIRONMENTAL MANAGEMENT, AWARENESS-RAISING AND COMMUNICATION FOR EMPLOYEES',
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
                    text: 'Organises training and tracks changes in awareness and behaviour after training, and communicates to raise employee awareness of environmental protection and climate change response',
                    maxScore: 10,
                    hint: 'Organise environmental and climate change training for employees at least once a year, with pre- and post-training awareness surveys to demonstrate effectiveness.',
                    evidence:
                      'Training materials; attendance list; pre- and post-training survey results; photos.',
                  },
                ],
              },
            ],
          },
        ],
        total: {
          label: 'TOTAL',
          maxScore: 138,
        },
      },
      {
        id: 'LS',
        title: 'LABOUR AND SOCIAL INDICATORS (L AND S INDICATORS)',
        subtitle:
          'Part VI of the CSI 2026 Indicator Set | 61 indicators (48 C indicators, 13 A indicators) | Published maximum points: 141 points',
        note: 'This is the part with the most indicators. It is best completed together with the HR department and trade union representatives.',
        shortLabel: 'L&S indicators',
        dashboardLabel: 'Labour and social indicators (L&S)',
        publishedMax: 141,
        headers: {
          code: 'Indicator code',
          level: 'Level',
          text: 'Indicator',
          maxScore: 'Maximum points',
          answer: 'Implemented at the enterprise (Yes/No)',
          selfScore: 'Self-assessed points',
          available: 'Applicable points',
          priority: 'Priority',
          hint: 'Suggested action',
          evidence: 'Supporting evidence to prepare',
          note: 'Notes / existing records',
          owner: 'Owner',
          deadline: 'Due date',
          group: 'Group',
        },
        groups: [
          {
            id: 'ls-g1',
            title: 'HUMAN RESOURCES MANAGEMENT',
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
                    text: 'Fully complies with regulations on concluding labour contracts: in writing for contracts of one (01) month or longer; using the correct contract type; with all contents required by regulations',
                    maxScore: 4,
                    hint: 'Review all labour contracts: they must contain all mandatory contents under Article 21 of the Labour Code 2019, be of the correct type, and be in writing for contracts of 1 month or longer.',
                    evidence:
                      'Set of template labour contracts; list of employees with contract types; representative signed contracts.',
                  },
                  {
                    id: 'L 2',
                    level: 'C',
                    text: 'Complies with regulations on performing labour contracts, including temporarily transferring employees to work other than that in their contract in accordance with regulations, and assigning the workplace as agreed',
                    maxScore: 2,
                    hint: "Ensure employees are transferred to other work only in accordance with regulations (no more than 60 cumulative days per year, with 3 days' notice) and assigned to the agreed workplace.",
                    evidence:
                      'Transfer decisions; advance notices; labour contracts stating the workplace.',
                  },
                  {
                    id: 'L 3',
                    level: 'C',
                    text: 'Complies with regulations on amending, supplementing and terminating labour contracts',
                    maxScore: 4,
                    hint: 'Review the process for amending, supplementing and terminating contracts: valid grounds, correct notice periods, full payment within 14 working days.',
                    evidence:
                      'Contract annexes; termination decisions; contract settlement records; severance allowance payment records.',
                  },
                  {
                    id: 'L 4',
                    level: 'A',
                    text: 'Proactively develops and implements the signing of electronic labour contracts',
                    maxScore: 1,
                    hint: 'Introduce electronic signing of labour contracts, which have the same legal validity as written contracts. This is an advanced indicator that helps save time and storage.',
                    evidence:
                      'Signed electronic labour contracts; description of the digital signing platform in use.',
                  },
                  {
                    id: 'L 5',
                    level: 'C',
                    text: 'Maintains a labour management register and fully records employee information in it from the time employees start work, as required by regulations',
                    maxScore: 2,
                    hint: 'Set up a labour management register (paper or electronic) and update it as soon as a new employee joins, with all information fields required by regulations.',
                    evidence:
                      'Updated labour management register; screenshots/exports from the software.',
                  },
                  {
                    id: 'L 6',
                    level: 'C',
                    text: 'Reports changes in the workforce to the state labour authority as required by regulations',
                    maxScore: 3,
                    hint: 'Submit workforce change reports every 6 months to the local labour authority.',
                    evidence: 'Submitted labour usage reports with receipts for all 3 years.',
                  },
                  {
                    id: 'L 7',
                    level: 'C',
                    text: 'Develops and registers internal labour regulations with the state labour authority',
                    maxScore: 2,
                    hint: 'Companies with 10 or more employees must have written internal labour regulations and register them with the provincial labour authority.',
                    evidence:
                      'Internal labour regulations; registration confirmation of the regulations; evidence of posting at the workplace.',
                  },
                  {
                    id: 'L 8',
                    level: 'C',
                    text: 'Ensures the principles, order and procedures for handling labour discipline',
                    maxScore: 3,
                    hint: 'Labour discipline must follow the correct procedure: grounds in the internal labour regulations, a meeting with the participation of the trade union and the employee, and written minutes.',
                    evidence:
                      'Disciplinary procedure; minutes of disciplinary meetings; disciplinary decisions (if any).',
                  },
                  {
                    id: 'L 9',
                    level: 'C',
                    text: 'Enables employees to access employment opportunities and career advancement',
                    maxScore: 2,
                    hint: 'Publish internal job vacancies and promotion criteria so employees know their development opportunities.',
                    evidence: 'Internal job postings; promotion rules; list of promoted employees.',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g2',
            title: 'WAGES, BONUSES AND MANDATORY INSURANCE',
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
                    text: 'Develops and publicly discloses the wage scales, payrolls and labour norms at the workplace',
                    maxScore: 6,
                    hint: 'Develop wage scales, payrolls and labour norms, consult the trade union and post them publicly at the workplace.',
                    evidence:
                      'Wage scales and payrolls; minutes of trade union consultation; photos of posting.',
                  },
                  {
                    id: 'L 12',
                    level: 'A',
                    text: 'Develops wage payment regulations for employees',
                    maxScore: 4,
                    hint: 'Issue wage payment regulations that clearly set out the wage structure, pay rise criteria and overtime pay calculation.',
                    evidence:
                      'Issued wage payment regulations; evidence of communication to employees.',
                  },
                  {
                    id: 'L 13',
                    level: 'C',
                    text: "Pays employees' wages and overtime pay on time and in full, and provides them with wage statements",
                    maxScore: 6,
                    hint: 'Pay wages on the committed pay dates and send each employee a detailed statement of wages and overtime.',
                    evidence: 'Payroll; bank transfer records; sample payslip sent to employees.',
                  },
                  {
                    id: 'L 14',
                    level: 'A',
                    text: 'Develops and implements bonus regulations for employees',
                    maxScore: 4,
                    hint: 'Issue transparent bonus regulations that clearly state the basis and timing of bonus reviews.',
                    evidence: 'Bonus regulations; bonus decisions; bonus payment records.',
                  },
                  {
                    id: 'L 15',
                    level: 'C',
                    text: 'Pays social insurance, health insurance, unemployment insurance and occupational accident and disease insurance on time and for all employees subject to mandatory contributions',
                    maxScore: 6,
                    hint: 'Pay social insurance, health insurance, unemployment insurance and occupational accident and disease insurance in full and on time for 100% of employees subject to mandatory contributions. Check for any outstanding arrears.',
                    evidence:
                      'Social insurance contribution statement (C12-TS); confirmation of no social insurance arrears; payment records.',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g3',
            title: 'ALLOWANCES AND WELFARE BENEFITS',
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
                    text: 'Provides shift meal and lunch allowances for employees',
                    maxScore: 2,
                    hint: 'Provide shift meal/lunch allowances or operate a canteen for employees.',
                    evidence:
                      'Shift meal allowance policy; payroll showing the allowance; meal supply contract.',
                  },
                  {
                    id: 'L 20',
                    level: 'A',
                    text: "Implements policies supporting employees' childcare: daycare/raising young children/high academic achievement...",
                    maxScore: 2,
                    hint: "Issue policies supporting employees' childcare: daycare allowances, gifts on 1 June (Children's Day), rewards for children with academic achievements.",
                    evidence:
                      'Support policy; list of beneficiaries; payment records; photos of activities.',
                  },
                  {
                    id: 'L 21',
                    level: 'A',
                    text: 'Organises cultural, artistic and sports activities, and excursions and trips for employees',
                    maxScore: 2,
                    hint: 'Organise annual cultural, sports and excursion activities to build employee engagement.',
                    evidence: 'Activity plan; participant list; photos; payment records.',
                  },
                  {
                    id: 'L 23',
                    level: 'A',
                    text: 'Provides a phone allowance',
                    maxScore: 1,
                    hint: 'Cover phone costs for positions that require frequent communication.',
                    evidence: 'Support policy; payroll showing the phone allowance.',
                  },
                  {
                    id: 'L 24',
                    level: 'A',
                    text: 'Provides support for birthdays, weddings, bereavement of relatives...',
                    maxScore: 1,
                    hint: "Maintain a practice of gifts and visits for employees' birthdays, weddings, and family celebrations and bereavements.",
                    evidence: 'Welfare regulations; log of visits and gifts; payment records.',
                  },
                  {
                    id: 'L 25',
                    level: 'A',
                    text: 'Provides allowances for employees in hardship due to accidents',
                    maxScore: 1,
                    hint: 'Have a fund or mechanism to support employees facing hardship due to accidents or serious illnesses.',
                    evidence:
                      'Hardship allowance regulations; list of those supported; payment records.',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g4',
            title: 'WORKING HOURS AND REST PERIODS',
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
                    text: 'Applies normal working hours of no more than 08 hours per 01 day or no more than 48 hours per 01 week',
                    maxScore: 5,
                    hint: 'Check timesheets: normal working hours do not exceed 8 hours/day or 48 hours/week.',
                    evidence: 'Timesheets; internal labour regulations specifying working hours.',
                  },
                  {
                    id: 'L 27',
                    level: 'C',
                    text: 'Ensures weekly rest, breaks during working hours, rest between shifts and mid-shift breaks for employees',
                    maxScore: 3,
                    hint: 'Ensure weekly rest of at least 24 consecutive hours, a 30-minute mid-shift break (45 minutes for night shifts), and at least 12 hours of rest between shifts.',
                    evidence:
                      'Timesheets showing shifts; internal labour regulations; shift rosters.',
                  },
                  {
                    id: 'L 28',
                    level: 'C',
                    text: 'Strictly complies with regulations on employing employees for overtime, night shifts, and work on rest days and public holidays',
                    maxScore: 3,
                    hint: 'Overtime must not exceed 40 hours/month and 200 hours/year (300 hours for permitted sectors), with written agreement and payment at the correct rate.',
                    evidence:
                      'Written overtime consents; overtime timesheets; payroll showing overtime pay.',
                  },
                  {
                    id: 'L 29',
                    level: 'C',
                    text: 'Ensures employees can take personal leave or unpaid leave as required by regulations',
                    maxScore: 2,
                    hint: "Ensure paid personal leave (own marriage, child's marriage, bereavement) and unpaid leave as required by regulations.",
                    evidence:
                      'Internal labour regulations; leave requests and approvals; timesheets.',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g5',
            title: 'HEALTH, OCCUPATIONAL SAFETY AND HEALTH, AND FOOD SAFETY AND HYGIENE',
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
                    text: 'Provide periodic health check-ups for employees as required by regulations',
                    maxScore: 4,
                    hint: 'Organise periodic health check-ups at least once a year (every 6 months for workers in arduous or hazardous jobs, workers with disabilities, minors and elderly workers).',
                    evidence:
                      'Contract with a healthcare facility; health check-up results; employee health management records.',
                  },
                  {
                    id: 'L 31',
                    level: 'C',
                    text: 'Establish an in-house healthcare unit or engage a healthcare service provider as required by regulations',
                    maxScore: 1,
                    hint: 'Set up a healthcare unit or sign a contract with a qualified healthcare facility appropriate to the size of the workforce.',
                    evidence:
                      'Decision establishing the healthcare unit or healthcare service contract; certificates of healthcare staff.',
                  },
                  {
                    id: 'L 32',
                    level: 'C',
                    text: 'Arrange first-aid and emergency response personnel at the workplace as required by regulations',
                    maxScore: 1,
                    hint: 'Assign and train first-aid and emergency response personnel; provide first-aid kits in the prescribed quantities for each work area.',
                    evidence:
                      'Decision assigning first-aid personnel; first-aid training certificates; first-aid kit inventory.',
                  },
                  {
                    id: 'L 33',
                    level: 'A',
                    text: 'Control the quality and food safety and hygiene of the employee canteen',
                    maxScore: 1,
                    hint: 'If there is a collective canteen, ensure a food safety certificate is in place, retain food samples for 24 hours and provide health check-ups for kitchen staff.',
                    evidence:
                      'Certificate of eligibility for food safety; food sample log; food origin records.',
                  },
                  {
                    id: 'L 34',
                    level: 'C',
                    text: 'Issue rules, procedures and plans to ensure occupational safety and health at the workplace',
                    maxScore: 3,
                    hint: 'Issue OSH (occupational safety and health) rules, procedures and an annual OSH plan with an allocated budget.',
                    evidence:
                      'Approved annual OSH plan; safety rules and procedures for each position.',
                  },
                  {
                    id: 'L 35',
                    level: 'C',
                    text: 'Arrange a unit or personnel in charge of occupational safety and health who meet the qualification requirements under regulations',
                    maxScore: 2,
                    hint: 'Assign a unit or person in charge of OSH holding certificates appropriate to the size and risk level of the enterprise.',
                    evidence:
                      'Assignment decision; OSH training certificate of the person in charge.',
                  },
                  {
                    id: 'L 36',
                    level: 'C',
                    text: 'Machinery and equipment in use that are subject to strict occupational safety requirements are inspected as required by regulations',
                    maxScore: 3,
                    hint: 'Compile a list of machinery and equipment subject to strict safety requirements (boilers, elevators, lifting equipment...) and have them inspected at the prescribed intervals.',
                    evidence: 'Equipment list; valid inspection certificates; inspection stamps.',
                  },
                  {
                    id: 'L 37',
                    level: 'A',
                    text: "Assess workplace risks related to employees' health",
                    maxScore: 1,
                    hint: 'Conduct a workplace health risk assessment at least once a year and for every position with dangerous or harmful factors.',
                    evidence: 'Risk assessment report; control measures applied.',
                  },
                  {
                    id: 'L 38',
                    level: 'C',
                    text: 'Issue an incident response and emergency response plan for the workplace',
                    maxScore: 2,
                    hint: 'Develop an emergency response plan (fire and explosion, chemical leaks, accidents) and conduct periodic drills.',
                    evidence: 'Emergency response plan; drill records; evacuation maps.',
                  },
                  {
                    id: 'L 39',
                    level: 'C',
                    text: 'Investigate and report occupational accidents at the workplace to the competent authorities',
                    maxScore: 1,
                    hint: 'When an occupational accident occurs, set up an investigation team, prepare a report and notify the competent authorities within the prescribed time limit.',
                    evidence:
                      'Accident investigation report; notification documents; records of benefits settled for the employees.',
                  },
                  {
                    id: 'L 40',
                    level: 'C',
                    text: 'Provide sufficient personal protective equipment to employees',
                    maxScore: 3,
                    hint: 'Issue full personal protective equipment for each job position, with signed acknowledgement of receipt and checks on its use.',
                    evidence:
                      'PPE issuance list; acknowledgement-of-receipt log; photos of employees using PPE.',
                  },
                  {
                    id: 'L 41',
                    level: 'C',
                    text: 'Record and classify workers performing arduous, hazardous or dangerous work and workers performing especially arduous, hazardous or dangerous work',
                    maxScore: 2,
                    hint: 'Compile a list of workers performing arduous, hazardous or dangerous work according to the list issued by the Ministry of Labour, Invalids and Social Affairs so that the correct benefits are applied.',
                    evidence:
                      'Worker classification list; comparison table against the list of arduous and hazardous occupations.',
                  },
                  {
                    id: 'L 42',
                    level: 'C',
                    text: 'Provide occupational safety and health training for employees as required by regulations',
                    maxScore: 3,
                    hint: 'Provide OSH training for all 6 target groups at the correct intervals (every 2 years for group 3, annually for group 4).',
                    evidence: 'Training plan; attendance lists; safety certificates/cards.',
                  },
                  {
                    id: 'L 43',
                    level: 'C',
                    text: 'Conduct annual monitoring of the working environment',
                    maxScore: 1,
                    hint: 'Conduct working environment monitoring at least once a year for harmful factors (dust, noise, lighting, heat, toxic gases and vapours).',
                    evidence:
                      'Working environment monitoring results; contract with a qualified organisation; corrective measures.',
                  },
                  {
                    id: 'L 44',
                    level: 'C',
                    text: 'Periodically report to the competent authorities on occupational accidents and occupational safety and health',
                    maxScore: 2,
                    hint: 'Submit periodic OSH reports and occupational accident reports before 10 January each year.',
                    evidence: 'Submitted reports with receipts for all 3 years.',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g6',
            title: 'EDUCATION AND TRAINING',
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
                    text: 'Train employees before transferring them to positions or fields of work involving arduous or hazardous work',
                    maxScore: 1,
                    hint: 'Retrain employees before transferring them to positions involving arduous or hazardous factors.',
                    evidence: 'Transfer decision; training programme; training list and results.',
                  },
                  {
                    id: 'L 46',
                    level: 'C',
                    text: "Develop an annual plan and allocate funding for training, capacity building and upgrading of employees' qualifications and vocational skills; company policies and regulations; and laws and legal policies",
                    maxScore: 3,
                    hint: 'Prepare an annual training plan with a dedicated budget line, including training on laws and legal policies and internal regulations.',
                    evidence:
                      'Approved annual training plan with budget estimate; implementation results report.',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g7',
            title: 'TRADE UNION, COLLECTIVE LABOUR AGREEMENTS',
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
                    text: 'Establish a grassroots trade union in accordance with the proper process and procedures',
                    maxScore: 2,
                    hint: 'Coordinate with the higher-level trade union to establish a grassroots trade union. If the conditions are not yet met, record the contacts made and enable employees to join the higher-level trade union.',
                    evidence:
                      'Decision recognising the grassroots trade union; list of the executive committee; congress minutes.',
                  },
                  {
                    id: 'L 48',
                    level: 'C',
                    text: "Enable trade union members and officers to carry out trade union activities effectively in line with the trade union's functions and duties",
                    maxScore: 2,
                    hint: 'Provide time, venues and funding for trade union activities; pay trade union dues as required by regulations.',
                    evidence:
                      'Coordination regulations with the trade union; payment vouchers for trade union dues; activity minutes.',
                  },
                  {
                    id: 'L 49',
                    level: 'C',
                    text: 'Consult the executive committee of the grassroots trade union when developing wage scales, payrolls, labour norms and bonus regulations',
                    maxScore: 2,
                    hint: 'Consult the trade union executive committee in writing before issuing wage scales and payrolls, labour norms and bonus regulations.',
                    evidence: "Consultation letter and the trade union's written reply.",
                  },
                  {
                    id: 'L 50',
                    level: 'C',
                    text: 'Consult the executive committee of the grassroots trade union (where a trade union exists) when developing and issuing plans, rules and procedures to ensure occupational safety and health at the workplace',
                    maxScore: 2,
                    hint: 'Consult the trade union when issuing OSH plans, rules and procedures.',
                    evidence:
                      'Consultation letter; meeting minutes signed by the trade union representative.',
                  },
                  {
                    id: 'L 51',
                    level: 'C',
                    text: 'Written request for negotiation by either party, the grassroots trade union or the employer, on the content of the collective bargaining request',
                    maxScore: 2,
                    hint: 'Conduct collective bargaining when either party makes a written request, and respond within the prescribed time limit.',
                    evidence:
                      'Written request for negotiation; minutes of the negotiation sessions.',
                  },
                  {
                    id: 'L 52',
                    level: 'C',
                    text: 'The content of the collective labour agreement does not contravene the law and is more favourable to employees',
                    maxScore: 2,
                    hint: 'Sign a collective labour agreement containing at least one provision more favourable to employees than the law, and submit it to the labour management authority.',
                    evidence:
                      'Signed collective labour agreement; submission letter to the management authority; comparison table against legal requirements.',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g8',
            title:
              'IMPLEMENTATION OF WORKPLACE DEMOCRACY REGULATIONS, INFORMATION EXCHANGE AND HANDLING, AND LABOUR DISPUTE RESOLUTION',
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
                    text: 'Develop and publicly disclose workplace democracy regulations',
                    maxScore: 2,
                    hint: 'Issue and post the grassroots workplace democracy regulations at the workplace, clearly stating the matters employees are entitled to know, discuss, decide and inspect.',
                    evidence:
                      'Issued workplace democracy regulations; photos of the posting; minutes of employee consultation.',
                  },
                  {
                    id: 'L 54',
                    level: 'C',
                    text: 'Develop and implement a mechanism for exchanging and handling information within the enterprise',
                    maxScore: 2,
                    hint: 'Set up two-way internal communication channels (suggestion box, internal groups, briefing meetings) and record how feedback is handled.',
                    evidence:
                      'Regulations on information exchange; log of feedback received and handling results.',
                  },
                  {
                    id: 'L 55',
                    level: 'C',
                    text: 'Hold periodic or ad hoc dialogues at the workplace',
                    maxScore: 1,
                    hint: 'Hold workplace dialogues at least once a year as required by regulations, or whenever an issue arises.',
                    evidence: 'Dialogue minutes; attendance list; feedback taken on board.',
                  },
                  {
                    id: 'L 56',
                    level: 'C',
                    text: 'Hold an annual employee conference',
                    maxScore: 1,
                    hint: 'Hold an employee conference every year with the participation of representatives of the workforce.',
                    evidence: 'Plan and minutes of the employee conference; conference resolution.',
                  },
                  {
                    id: 'L 58',
                    level: 'C',
                    text: 'Resolve labour disputes in accordance with the procedures prescribed by law',
                    maxScore: 1,
                    hint: 'Resolve labour disputes following the correct sequence: negotiation, labour mediator, arbitration council or court.',
                    evidence:
                      'Case files; mediation minutes; resolution decisions. If none arose, select "Did not occur during the assessment period".',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g9',
            title:
              'FEMALE WORKERS, SPECIAL CATEGORIES OF WORKERS, NON-DISCRIMINATION AND NO FORCED LABOUR',
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
                    text: 'Ensure sufficient and suitable shower rooms and toilets at the workplace',
                    maxScore: 1,
                    hint: 'Check the number and condition of shower rooms and toilets, ensuring separate facilities for men and women and sufficient capacity for the number of workers.',
                    evidence:
                      'Floor plan; photos of sanitary facilities; working conditions inspection report.',
                  },
                  {
                    id: 'L 62',
                    level: 'C',
                    text: 'Ensure compliance with the principles for employing minors',
                    maxScore: 1,
                    hint: 'If minors are employed, obtain the consent of their legal representative, do not assign prohibited work, and limit working hours. If minors are not employed, state this clearly.',
                    evidence:
                      'List of minor workers (if any); written consent of the legal representative; health check-up records.',
                  },
                  {
                    id: 'L 63',
                    level: 'C',
                    text: 'No forced labour in any form',
                    maxScore: 1,
                    hint: 'Verify that identity documents are not retained, no deposits are required, overtime is not forced, and contract termination is permitted as required by regulations.',
                    evidence:
                      'No-forced-labour commitment in the labour rules; self-inspection results; minutes of dialogue with employees.',
                  },
                  {
                    id: 'L 64',
                    level: 'C',
                    text: 'No discrimination in the management, employment and direction of workers',
                    maxScore: 1,
                    hint: 'Review regulations and practices on recruitment, pay and promotion to eliminate all discrimination based on gender, ethnicity, religion or marital status.',
                    evidence:
                      'Labour rules; recruitment procedure; log of discrimination complaints.',
                  },
                  {
                    id: 'L 66',
                    level: 'A',
                    text: 'Ensure compliance with the principles for employing workers with disabilities',
                    maxScore: 1,
                    hint: 'If workers with disabilities are employed, ensure suitable working conditions, do not assign arduous or hazardous work, and consult them before deciding on related matters.',
                    evidence:
                      'List of workers with disabilities; records of suitable working conditions; consultation minutes.',
                  },
                ],
              },
            ],
          },
          {
            id: 'ls-g10',
            title: 'RELATIONS WITH CUSTOMERS, THE COMMUNITY AND SOCIETY',
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
                    text: 'Comply with requirements on marketing and labelling of products/services, and combat "greenwashing"',
                    maxScore: 4,
                    hint: 'Review all advertising content, labels and environmental claims. All "green", "eco" and "environmentally friendly" claims must be backed by verifiable evidence to avoid "greenwashing".',
                    evidence:
                      'Product label samples; advertising content; certificates/test results substantiating the claims.',
                  },
                  {
                    id: 'S 2',
                    level: 'C',
                    text: 'Inspect and assess the quality of products/services to ensure consumer safety and health, especially for children',
                    maxScore: 4,
                    hint: 'Establish a quality and safety inspection procedure for products before placing them on the market, especially for products intended for children.',
                    evidence:
                      'Quality control procedure; test results/certificates of conformity; product recall records (if any).',
                  },
                  {
                    id: 'S 3',
                    level: 'C',
                    text: "Uphold customers' right to information confidentiality in the collection, storage, processing and use of their information",
                    maxScore: 3,
                    hint: 'Issue a customer data privacy policy in line with Decree 13/2023/ND-CP on personal data protection; assign access rights and have a mechanism for handling data breaches.',
                    evidence:
                      'Data privacy policy; access authorisation procedure; personal data processing impact assessment records.',
                  },
                  {
                    id: 'S 5',
                    level: 'A',
                    text: 'Enable students to intern and work at the enterprise',
                    maxScore: 1,
                    hint: 'Sign cooperation agreements with universities, colleges and vocational schools to host student interns, with assigned mentors.',
                    evidence:
                      'Cooperation agreements with training institutions; list of student interns; internship confirmation letters.',
                  },
                ],
              },
            ],
          },
        ],
        total: {
          label: 'TOTAL',
          maxScore: 141,
        },
      },
    ],
    dashboard: {
      title: 'SCORECARD AND READINESS LEVEL',
      subtitle: 'EDITION FOR SMALL AND MICRO ENTERPRISES',
      note: 'All figures on this page are calculated automatically from the self-assessment pages. Do not enter data manually here.',
      partsTitle: 'READINESS LEVEL BY PART OF THE CSI 2026 INDEX',
      partsHeaders: [
        'Part of the CSI 2026 Index',
        'Maximum points published by CSI',
        'Total points of component indicators',
        'Applicable points (after excluding non-applicable indicators)',
        'Self-assessed points',
        'Readiness rate',
        'Converted points on CSI scale',
      ],
      partARows: [
        'Part I - Company information',
        'Part II - Organisational structure, model and key personnel',
      ],
      totalLabel: 'TOTAL',
      partsNote:
        'Bonus points for each part are determined by the CSI Programme\'s Evaluation Council and are not included in this self-assessment table. "Converted points on CSI scale" are estimated points based on the readiness rate, used only for tracking internal progress.',
      complianceTitle: 'COMPLIANCE STATUS - CORE INDICATORS (C)',
      complianceHeaders: ['Tracked metric', 'Count'],
      complianceRows: [
        'Total number of C indicators (core, tied to legal compliance)',
        'Number of C indicators achieved',
        'Number of C indicators REQUIRING IMMEDIATE ACTION (HIGH priority)',
        'Number of C indicators marked as not applicable',
        'Total number of A indicators (advanced)',
        'Number of A indicators achieved',
        'Number of indicators NOT YET ASSESSED',
      ],
      groupsTitle: 'READINESS LEVEL BY INDICATOR GROUP',
      groupsHeaders: [
        'Indicator group',
        'Part',
        'Applicable points',
        'Self-assessed points',
        'Readiness rate',
      ],
    },
    plan: {
      title: 'ACTION PLAN BY PRIORITY',
      notes: [
        'Use the filter in the header row: filter the "Priority" column = HIGH - Compliance to address first',
        'The columns from "Current answer" to "Due date" are pulled automatically from the self-assessment pages. Only enter data manually in the last two columns.',
      ],
      headers: [
        'Indicator code',
        'Level',
        'Part',
        'Indicator group',
        'Indicator content',
        'Maximum points',
        'Current status',
        'Priority',
        'Missing points',
        'Actions required',
        'Owner',
        'Due date',
        'Task status',
        'Progress notes',
      ],
    },
  },
};
