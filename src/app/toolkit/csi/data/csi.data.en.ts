// TỰ SINH bởi tools/csi-readiness/build-data.py từ file Excel nguồn (CR-023) — KHÔNG sửa tay.
// Muốn đổi nội dung: sửa nguồn (extract.py / tr/chunk-*.en.json) rồi chạy lại script.
import type { CsiToolkitConfig } from '../csi.types';

export const CSI_TOOLKITS_EN: Record<string, CsiToolkitConfig> = {
  'csi-2026-sme': {
    id: 'csi-2026-sme',
    guide: {
      title: 'ESG Readiness Assessment',
      subtitle: 'Where does your business stand, and what is still missing?',
      audience: 'For small and micro enterprises',
      brand: 'Dear Our Community',
      byline: 'ESG Knowledge Hub and ESG Practice Community',
      sections: [
        {
          title: 'How does this tool help you?',
          blocks: [
            {
              kind: 'paragraph',
              text: "Many small businesses know ESG is becoming important - customers ask, banks ask, overseas partners ask - but they don't know where they stand or what to start with. This tool is built to answer exactly these three questions:",
            },
            {
              kind: 'list',
              items: [
                '1. How ready is my business?',
                '2. What is still missing?',
                '3. What should I do first?',
              ],
            },
          ],
        },
        {
          title: 'This is not an exam',
          blocks: [
            {
              kind: 'paragraph',
              text: 'The tool does not give scores and does not rank anyone. You only need to answer "Yes" or "Not yet" for each item. For questions about figures such as revenue or the insurance contribution rate, you pick one of the ready-made ranges - no exact number needed.',
            },
            {
              kind: 'paragraph',
              text: 'The result shows which of three levels your business is at, for each area and for the business as a whole:',
            },
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'READY',
                  text: 'All legally mandatory items are in place. The business has a solid foundation to go further - do more advanced items, or join sustainable business assessment programs.',
                },
                {
                  label: 'ALMOST READY',
                  text: 'Most mandatory items are in place, with a few specific gaps left to close. Usually only a few months of focused effort.',
                },
                {
                  label: 'NOT READY',
                  text: 'Many mandatory items are still missing. This is a very common starting point - and the list of gaps will tell you exactly where to begin.',
                },
              ],
            },
          ],
        },
        {
          title: 'Four steps to use the tool',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Step 1',
                  text: 'Fill in the "Company information" page. It takes about 3 minutes.',
                },
                {
                  label: 'Step 2',
                  text: "Answer 105 questions in four sections: Business and operational data, Corporate governance, Environment, Employees and society. It takes about 45 - 60 minutes. You don't have to do it in one sitting - you can save and continue later.",
                },
                {
                  label: 'Step 3',
                  text: 'Open the "Readiness results" page to see the readiness level of each area and of the business as a whole.',
                },
                {
                  label: 'Step 4',
                  text: 'Open the "Gaps to close" page, filter by Priority level, and assign an owner and a due date for each item.',
                },
              ],
            },
          ],
        },
        {
          title: 'How to answer',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Yes',
                  text: 'The business is doing this AND has documents to prove it. Each question suggests which documents you need.',
                },
                {
                  label: 'Not yet',
                  text: 'Not done yet, only partly done, or done but without documents to prove it. Note the actual progress in the Notes box if you wish.',
                },
                {
                  label: 'Not applicable',
                  text: 'This does not arise in your business - for example, no canteen, no scrap imports. This question will not be counted.',
                },
                {
                  label: 'Figure questions',
                  text: 'Choose the range that fits your most recent year. If you don\'t have the figures yet, choose "No data yet" - this is also a gap to close.',
                },
              ],
            },
          ],
        },
        {
          title: 'Two types of items',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Mandatory',
                  text: "Items tied to Vietnamese legal requirements. They determine your business's readiness level.",
                },
                {
                  label: 'Advanced',
                  text: 'Extra items the business does to reduce risk and gain an edge. They are added value and do not affect the readiness level.',
                },
              ],
            },
          ],
        },
        {
          title: 'A word of advice',
          blocks: [
            {
              kind: 'paragraph',
              text: 'Please answer honestly. The goal is to see the real gaps so you know what to do, not to get a nice-looking result. An item answered "Yes" without supporting documents won\'t help when customers, banks or assessors ask about it.',
            },
          ],
        },
        {
          title: 'Need a companion on the way?',
          blocks: [
            {
              kind: 'paragraph',
              text: 'The ESG Practice Community of Dear Our Community is where Vietnamese small and medium enterprises close these gaps together - sharing document templates and real-world experience, and getting unstuck with experts. Learn more at dearourcommunity.asia or contact crystal@dearourcommunity.com.',
            },
          ],
        },
      ],
      footer:
        'This tool is built on the CSI 2026 Corporate Sustainability Index (the version for small and micro enterprises) issued by VCCI and VBCSD. Each question corresponds to one CSI indicator - see the original code and wording in the two collapsed columns at the end of each question page.',
    },
    profile: {
      title: 'Company information',
      timeHint: 'Takes about 3 minutes',
      fields: [
        {
          id: 'f5',
          label: 'Company name',
        },
        {
          id: 'f6',
          label: 'Main line of business',
        },
        {
          id: 'f7',
          label: 'Field of operation',
          options: [
            {
              label: 'Manufacturing, processing',
            },
            {
              label: 'Construction, trade, services',
            },
          ],
        },
        {
          id: 'f8',
          label: 'Number of employees covered by social insurance',
          options: [
            {
              label: 'Under 10 people',
            },
            {
              label: '10 to 50 people',
            },
            {
              label: '51 to 100 people',
            },
            {
              label: 'Over 100 people',
            },
          ],
        },
        {
          id: 'f9',
          label:
            'Business group by environmental criteria (Article 28 of the Law on Environmental Protection 2020)',
          options: [
            {
              label: 'Group 2',
            },
            {
              label: 'Group 3',
            },
            {
              label: 'Group 4',
            },
            {
              label: 'Not yet determined',
            },
          ],
        },
        {
          id: 'f10',
          label: 'Main market',
          options: [
            {
              label: 'Domestic',
            },
            {
              label: 'Export',
            },
            {
              label: 'Both domestic and export',
            },
          ],
        },
        {
          id: 'f11',
          label: 'Has the company ever taken part in the CSI Program?',
          options: [
            {
              label: 'Has taken part',
            },
            {
              label: 'Has not taken part',
            },
          ],
        },
        {
          id: 'f12',
          label: 'Which assessment round is this?',
          options: [
            {
              label: 'First time',
            },
            {
              label: 'Second time',
            },
            {
              label: 'Third time or more',
            },
          ],
        },
        {
          id: 'f13',
          label: 'Person doing the assessment',
        },
        {
          id: 'f14',
          label: 'Job title',
        },
        {
          id: 'f15',
          label: 'Assessment date',
          type: 'date',
        },
      ],
      infoBlocks: [
        {
          title: 'Business group by environmental criteria',
          text: 'Group 2: medium scale or capacity, with a risk of adverse environmental impact, or small scale but with environmentally sensitive factors. Group 3: small scale or capacity, with a pollution risk that must be managed and treated as required by regulations. Group 4: no risk of adverse environmental impact. The group determines whether the business needs an environmental permit or only an environmental registration. If you are unsure, choose "Not yet determined" - and clarifying it is the first thing to do.',
        },
        {
          title: 'Is this tool right for your business?',
          text: 'This tool is for small and micro enterprises under Decree 80/2021/ND-CP. If your business has more than 100 employees covered by social insurance, or revenue above VND 50 billion (manufacturing, construction) or above VND 100 billion (trade, services), it is likely already in the medium-sized group - please use the toolkit for medium and large enterprises.',
        },
      ],
    },
    parts: [
      {
        no: 1,
        title: 'Part 1 - Business and operational data',
        subtitle: 'Economy, employees and the environment in numbers',
        note: "Choose the range that matches your most recent year's data. To take part in assessment programs such as CSI, a company needs data and supporting documents for 3 consecutive years.",
        groups: [
          {
            title: 'Economy',
            questions: [
              {
                num: '1.1',
                text: "What is the company's revenue for the most recent year?",
                kind: 'core',
                evidence:
                  'Financial statements for 3 years; corporate income tax finalization return.',
                code: 'I 1',
                csiText: 'Total revenue',
                answer: 'range',
                options: [
                  {
                    label: 'Under VND 3 billion',
                  },
                  {
                    label: 'From VND 3 billion to 10 billion',
                  },
                  {
                    label: 'From VND 10 billion to 50 billion',
                  },
                  {
                    label: 'From VND 50 billion to 100 billion',
                  },
                  {
                    label: 'Over VND 100 billion',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Extract 3 years of revenue figures from the financial statements. If revenue has declined, prepare an explanation of the causes and the remedial measures.',
              },
              {
                num: '1.2',
                text: 'In the most recent year, did the company make a profit or a loss (profit before tax)?',
                kind: 'core',
                evidence:
                  'Income statements for 3 years; corporate income tax finalization return.',
                code: 'I 3',
                csiText: 'Profit before tax',
                answer: 'range',
                options: [
                  {
                    label: 'Loss',
                    tag: 'attention',
                  },
                  {
                    label: 'Break-even',
                  },
                  {
                    label: 'Profit under VND 500 million',
                  },
                  {
                    label: 'Profit from VND 500 million to 2 billion',
                  },
                  {
                    label: 'Profit over VND 2 billion',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Extract profit before tax for 3 years and make sure it matches the financial statements and tax returns.',
              },
              {
                num: '1.3',
                text: "What is the company's return on equity (ROE) for the most recent year?",
                kind: 'core',
                evidence: 'ROE calculation sheet with the formula; balance sheets for 3 years.',
                code: 'I 4',
                csiText: 'Return on equity (ROE)',
                answer: 'range',
                options: [
                  {
                    label: 'Negative',
                    tag: 'attention',
                  },
                  {
                    label: 'From 0 to 5%',
                  },
                  {
                    label: 'From 5 to 15%',
                  },
                  {
                    label: 'Over 15%',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Calculate ROE = Profit after tax / Average equity. State the formula you used so others can cross-check it.',
              },
              {
                num: '1.4',
                text: "What is the company's return on total assets (ROA) for the most recent year?",
                kind: 'core',
                evidence: 'ROA calculation sheet with the formula; balance sheets for 3 years.',
                code: 'I 5',
                csiText: 'Return on assets (ROA)',
                answer: 'range',
                options: [
                  {
                    label: 'Negative',
                    tag: 'attention',
                  },
                  {
                    label: 'From 0 to 3%',
                  },
                  {
                    label: 'From 3 to 10%',
                  },
                  {
                    label: 'Over 10%',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action: 'Calculate ROA = Profit after tax / Average total assets.',
              },
              {
                num: '1.5',
                text: "What is the company's return on sales (ROS) for the most recent year?",
                kind: 'core',
                evidence: 'ROS calculation sheet with the formula; income statements for 3 years.',
                code: 'I 6',
                csiText: 'Return on sales (ROS)',
                answer: 'range',
                options: [
                  {
                    label: 'Negative',
                    tag: 'attention',
                  },
                  {
                    label: 'From 0 to 3%',
                  },
                  {
                    label: 'From 3 to 10%',
                  },
                  {
                    label: 'Over 10%',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action: 'Calculate ROS = Profit after tax / Net revenue.',
              },
              {
                num: '1.6',
                text: 'What is the total amount the company paid to the State budget in the most recent year (taxes, fees, charges)?',
                kind: 'core',
                evidence:
                  'Tax obligation confirmation from the tax authority; State budget payment documents for 3 years.',
                code: 'I 7',
                csiText: 'Total contributions to the State budget',
                answer: 'range',
                options: [
                  {
                    label: 'Under VND 100 million',
                  },
                  {
                    label: 'From VND 100 million to 500 million',
                  },
                  {
                    label: 'From VND 500 million to 2 billion',
                  },
                  {
                    label: 'Over VND 2 billion',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Add up all payments made to the State budget: corporate income tax, VAT, fees, charges, land rent, etc.',
              },
              {
                num: '1.7',
                text: 'In the most recent year, how much did the company spend on community and social support programs?',
                kind: 'advanced',
                evidence:
                  'List of programs with budgets; payment documents; thank-you letters or confirmation from the receiving organization.',
                code: 'I 8',
                csiText: 'Budget for community and social support through programmes/initiatives',
                answer: 'range',
                options: [
                  {
                    label: 'Nothing spent',
                    tag: 'missing',
                  },
                  {
                    label: 'Under VND 50 million',
                  },
                  {
                    label: 'From VND 50 million to 200 million',
                  },
                  {
                    label: 'Over VND 200 million',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Record the community spending budget by year and by program. State clearly the number of beneficiaries.',
              },
            ],
          },
          {
            title: 'Society',
            questions: [
              {
                num: '1.8',
                text: 'What is the share of women among mid-level managers (deputy head of department and above)?',
                kind: 'core',
                evidence: 'Organization chart; list of managers by gender; appointment decisions.',
                code: 'I 12',
                csiText:
                  'Percentage of women in middle management (deputy head of department and above)',
                answer: 'range',
                options: [
                  {
                    label: 'No women',
                  },
                  {
                    label: 'Under 30%',
                  },
                  {
                    label: 'From 30 to 50%',
                  },
                  {
                    label: 'Over 50%',
                  },
                  {
                    label: 'Not applicable - no mid-level management',
                    tag: 'na',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Calculate the share of women in management positions at deputy head of department level and above. If the share is low, include an improvement plan in the business plan.',
              },
              {
                num: '1.9',
                text: "What is the share of women on the board of directors or the members' council / board of management?",
                kind: 'core',
                evidence: 'Charter; list of leadership members; appointment decisions.',
                code: 'I 13',
                csiText:
                  'Percentage of women leaders on the Executive Board and Board of Directors',
                answer: 'range',
                options: [
                  {
                    label: 'No women',
                  },
                  {
                    label: 'Under 30%',
                  },
                  {
                    label: 'From 30 to 50%',
                  },
                  {
                    label: 'Over 50%',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action: "Calculate the share of women in the company's top leadership body.",
              },
              {
                num: '1.10',
                text: "What is employees' average monthly income (including salary, allowances and bonuses)?",
                kind: 'core',
                evidence: 'Payroll for 3 years; total payroll report; personal income tax returns.',
                code: 'I 14',
                csiText: 'Average monthly income of employees',
                answer: 'range',
                options: [
                  {
                    label: 'Under VND 5 million',
                    tag: 'attention',
                  },
                  {
                    label: 'From VND 5 million to 8 million',
                  },
                  {
                    label: 'From VND 8 million to 12 million',
                  },
                  {
                    label: 'From VND 12 million to 20 million',
                  },
                  {
                    label: 'Over VND 20 million',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Calculate the average monthly income of all employees. Compare it with the regional minimum wage that applies in your area.',
              },
              {
                num: '1.11',
                text: 'How does the average income of female employees compare with that of male employees?',
                kind: 'core',
                evidence: 'Payroll broken down by gender; pay regulation.',
                code: 'I 15',
                csiText: 'Average monthly income of employees by gender (male/female)',
                answer: 'range',
                options: [
                  {
                    label: 'Women earn over 20% less than men',
                    tag: 'attention',
                  },
                  {
                    label: 'Women earn 5 to 20% less than men',
                  },
                  {
                    label: 'About equal - difference under 5%',
                  },
                  {
                    label: 'Women earn more than men',
                  },
                  {
                    label: 'Not applicable - employees of only one gender',
                    tag: 'na',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Separate average income by gender. If the gap is large, prepare an explanation based on the mix of job positions.',
              },
              {
                num: '1.12',
                text: 'What share of employees are covered by full compulsory insurance (out of all employees required to be covered)?',
                kind: 'core',
                evidence:
                  'Social insurance payment result notice (form C12-TS); confirmation of no social insurance debt.',
                code: 'I 16',
                csiText:
                  'Percentage of employees covered by all types of compulsory insurance out of total employees subject to compulsory contributions',
                answer: 'range',
                options: [
                  {
                    label: '100%',
                  },
                  {
                    label: 'From 90% to under 100%',
                    tag: 'fix',
                  },
                  {
                    label: 'From 70% to under 90%',
                    tag: 'fix',
                  },
                  {
                    label: 'Under 70%',
                    tag: 'fix',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Review the list of employees who must be covered and pay the missing contributions. The mandatory target is 100%.',
              },
              {
                num: '1.13',
                text: 'On average, how many hours of training does each employee receive per year?',
                kind: 'core',
                evidence: 'Annual training plan; attendance lists; training hours summary.',
                code: 'I 17',
                csiText:
                  'Annual training hours per employee among those requiring training (orientation and onboarding; compliance; soft skills; professional skills; other training)',
                answer: 'range',
                options: [
                  {
                    label: 'No training held',
                    tag: 'missing',
                  },
                  {
                    label: 'Under 8 hours',
                  },
                  {
                    label: 'From 8 to 24 hours',
                  },
                  {
                    label: 'Over 24 hours',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Summarize training hours in 5 categories: onboarding, regulatory compliance, soft skills, professional skills, other.',
              },
              {
                num: '1.14',
                text: 'How many workplace accidents or incidents occurred in the last 3 years?',
                kind: 'core',
                evidence:
                  'Workplace accident log; investigation reports (if any); periodic occupational safety and health reports.',
                code: 'I 19',
                csiText:
                  'Number of occupational accidents and incidents occurring during the reporting period (2023-2025)',
                answer: 'range',
                options: [
                  {
                    label: 'None occurred',
                  },
                  {
                    label: '1 to 2 cases',
                    tag: 'attention',
                  },
                  {
                    label: '3 or more cases',
                    tag: 'attention',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Count the cases across all 3 years. If none occurred, you still need periodic safety reports as proof. If any occurred, check that the causes have been investigated and fixed.',
              },
            ],
          },
          {
            title: 'Environment',
            questions: [
              {
                num: '1.15',
                text: 'Has the company carried out any initiative to reduce plastic waste?',
                kind: 'advanced',
                evidence:
                  'Implementation plan or minutes; photos; investment documents; volume tracking log.',
                code: 'I 22',
                csiText:
                  'Activities and initiatives implemented to reduce plastic waste (number of activities; investment level; amount of plastic waste recycled or reused)',
                answer: 'range',
                options: [
                  {
                    label: 'Not yet',
                    tag: 'missing',
                  },
                  {
                    label: '1 initiative',
                  },
                  {
                    label: '2 or more initiatives',
                  },
                  {
                    label: 'Not applicable - no significant use of plastic',
                    tag: 'na',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Start with the easiest steps: replace single-use plastic packaging, take back packaging, stop using plastic bottles in the office. Record the amount invested and the volume of plastic reduced.',
              },
              {
                num: '1.16',
                text: "To what extent is the company's solid waste sorted and handed over to licensed operators?",
                kind: 'core',
                evidence:
                  'Waste handover documents; contracts with licensed treatment operators; waste source owner log.',
                code: 'I 23',
                csiText:
                  'Amount of solid waste sorted, collected, stored, transported and treated (domestic; ordinary industrial; hazardous industrial)',
                answer: 'range',
                options: [
                  {
                    label: 'All of it',
                  },
                  {
                    label: 'Most of it',
                    tag: 'fix',
                  },
                  {
                    label: 'A small part',
                    tag: 'fix',
                  },
                  {
                    label: 'Not done yet',
                    tag: 'missing',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Record waste volumes in 3 categories (domestic, ordinary industrial, hazardous waste) for each year, matching the handover documents. All waste must be handed over in accordance with regulations.',
              },
              {
                num: '1.17',
                text: "What are the company's direct costs for solid waste management each year?",
                kind: 'core',
                evidence: 'Waste treatment service contracts; invoices and payment documents.',
                code: 'I 24',
                csiText: 'Direct costs related to solid waste management',
                answer: 'range',
                options: [
                  {
                    label: 'Under VND 10 million',
                  },
                  {
                    label: 'From VND 10 million to 50 million',
                  },
                  {
                    label: 'From VND 50 million to 200 million',
                  },
                  {
                    label: 'Over VND 200 million',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Add up collection, treatment and transport fees and the cost of the waste storage area.',
              },
              {
                num: '1.18',
                text: 'By what percentage has the company reduced its energy consumption through saving measures?',
                kind: 'advanced',
                evidence:
                  'Before-and-after comparison of electricity and fuel consumption; electricity bills; energy audit report (if any).',
                code: 'I 27',
                csiText:
                  'Percentage of energy saved through the application of energy saving and efficiency measures',
                answer: 'range',
                options: [
                  {
                    label: 'No measures yet',
                    tag: 'missing',
                  },
                  {
                    label: 'Under 5%',
                  },
                  {
                    label: 'From 5 to 10%',
                  },
                  {
                    label: 'Over 10%',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Install LED lights and inverters, maintain equipment, set a rule to switch off equipment when not in use - then compare bills before and after.',
              },
              {
                num: '1.19',
                text: 'How does the company track water consumption per unit of product or service?',
                kind: 'core',
                evidence:
                  'Water bills or water extraction permit; water meter reading log; output data.',
                code: 'I 31',
                csiText: 'Typical water consumption per unit of product/service',
                answer: 'range',
                options: [
                  {
                    label: 'Calculated monthly',
                  },
                  {
                    label: 'Calculated yearly',
                  },
                  {
                    label: 'Only the total water bill, not calculated per product',
                    tag: 'missing',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Record the water meter reading each month and divide by output to get water use per unit of product. Install meters by area if possible.',
              },
              {
                num: '1.20',
                text: 'By what percentage has the company reduced its water use through saving measures?',
                kind: 'core',
                evidence:
                  'Before-and-after comparison of water use; description of water-saving measures.',
                code: 'I 32',
                csiText:
                  'Percentage of water consumption saved through the application of measures to enhance water saving and efficiency',
                answer: 'range',
                options: [
                  {
                    label: 'No measures yet',
                    tag: 'missing',
                  },
                  {
                    label: 'Under 5%',
                  },
                  {
                    label: 'From 5 to 10%',
                  },
                  {
                    label: 'Over 10%',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Apply water-saving measures (fix leaks, water-saving taps, reuse washing water) and compare the data before and after.',
              },
              {
                num: '1.21',
                text: 'What share of wastewater is collected and treated to standard before being discharged into the environment?',
                kind: 'core',
                evidence:
                  'Periodic wastewater monitoring results; environmental permit; wastewater connection or treatment contract.',
                code: 'I 33',
                csiText:
                  'Percentage of wastewater collected and treated to meet technical standards and regulations before discharge into the environment',
                answer: 'range',
                options: [
                  {
                    label: '100%',
                  },
                  {
                    label: 'From 80% to under 100%',
                    tag: 'fix',
                  },
                  {
                    label: 'Under 80%',
                    tag: 'fix',
                  },
                  {
                    label:
                      'Not applicable - only domestic wastewater connected to the shared system',
                    tag: 'na',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Make sure all wastewater is treated to standard or connected to a centralized treatment system. The mandatory target is 100%.',
              },
              {
                num: '1.22',
                text: 'Has the company carried out any initiative to regenerate or restore water resources?',
                kind: 'advanced',
                evidence:
                  'Plan and implementation minutes; photos; investment documents; local authority confirmation.',
                code: 'I 35',
                csiText:
                  'Activities and initiatives implemented to regenerate and restore water sources (number; investment level; amount of water regenerated)',
                answer: 'range',
                options: [
                  {
                    label: 'Not yet',
                    tag: 'missing',
                  },
                  {
                    label: '1 initiative',
                  },
                  {
                    label: '2 or more initiatives',
                  },
                  {
                    label: 'No data yet',
                    tag: 'missing',
                  },
                ],
                action:
                  'Examples: rainwater harvesting, planting trees at watersheds, taking part in restoring local ponds, lakes and canals.',
              },
            ],
          },
        ],
      },
      {
        no: 2,
        title: 'Part 2 - Corporate governance',
        subtitle: 'How the company plans, manages risks and listens to customers',
        note: 'Answer "Yes" when the company is doing it AND has documents to prove it. Each question suggests which documents you need.',
        groups: [
          {
            title: 'Sustainable development commitment',
            questions: [
              {
                num: '2.1',
                text: 'Does the annual business plan include at least one environmental target and one social target, with specific numbers?',
                kind: 'core',
                evidence:
                  'Annual business plan with an approval signature, clearly showing the environmental and social targets.',
                code: 'G 1',
                csiText: "The enterprise's business plan includes environmental and social targets",
                answer: 'yesno',
                action:
                  'Include at least one environmental target (e.g., cut electricity consumption by 10%) and one social target (e.g., 100% of workers receive safety training) in the annual business plan, approved by leadership.',
              },
            ],
          },
          {
            title: 'Risk management',
            questions: [
              {
                num: '2.2',
                text: 'Does the company have a regulation (even a short one) on how to identify and handle risks in production and business, with clear assignment of who is responsible?',
                kind: 'core',
                evidence:
                  'Risk management regulation; list of main risks; minutes of periodic risk reviews.',
                code: 'G 5',
                csiText:
                  'Develop policies, procedures and an organisational structure for risk management in production/business activities',
                answer: 'yesno',
                action:
                  'Write a 2 - 3 page regulation: who identifies risks, who decides how to handle them, how often they are reviewed. Draw up a list of 5 - 10 main risks, including natural disasters and loss of supply.',
              },
            ],
          },
          {
            title: 'Customer satisfaction',
            questions: [
              {
                num: '2.3',
                text: 'Does the company have a channel for collecting customer feedback and run a satisfaction survey (at least once a year) to make improvements?',
                kind: 'core',
                evidence:
                  'Survey questionnaire; results report; minutes of improvements made after the survey.',
                code: 'G 12',
                csiText:
                  'Develop policies, procedures and information channels, and collect feedback, conduct surveys and evaluate customer satisfaction with products/services in order to make improvements',
                answer: 'yesno',
                action:
                  'Create a short survey form (Google Forms is enough), send it to customers once a year, and record the results and the improvements made.',
              },
              {
                num: '2.4',
                text: 'Does the company have a process for receiving and handling complaints, suggestions and whistleblowing reports from customers and other stakeholders?',
                kind: 'core',
                evidence:
                  'Complaint handling process; complaint log with handling results; proof that the reporting channels are publicly announced.',
                code: 'G 13',
                csiText:
                  'Implement a procedure for handling complaints, feedback and whistleblowing reports of misconduct from customers and stakeholders',
                answer: 'yesno',
                action:
                  'Issue a short process: intake channels, response deadlines, who handles cases, how whistleblowers are protected. Keep a log for each case.',
              },
            ],
          },
          {
            title: 'Specific policies',
            questions: [
              {
                num: '2.5',
                text: 'Does the company have a regulation on preventing sexual harassment in the workplace (in the internal labor regulations or a separate policy)?',
                kind: 'core',
                evidence:
                  'Clause in the internal labor regulations or a separate policy; training materials and attendance lists.',
                code: 'G 17',
                csiText:
                  'Develop and implement a policy/provisions on preventing sexual harassment in the workplace',
                answer: 'yesno',
                action:
                  'Add a clause on preventing sexual harassment to the internal labor regulations, with a confidential complaint channel, and communicate it to all staff.',
              },
              {
                num: '2.6',
                text: 'Does the company have a commitment not to trade in, consume or use wildlife and wildlife products (including when entertaining guests or giving gifts)?',
                kind: 'core',
                evidence: 'Commitment signed by leadership; proof of internal communication.',
                code: 'G 19',
                csiText:
                  'Develop and implement a policy/commitment/code of conduct on preventing the trade, consumption and use of wildlife and products derived from wildlife',
                answer: 'yesno',
                action:
                  'Issue a one-page commitment signed by leadership, covering both guest entertainment and corporate gifts, and communicate it to staff.',
              },
            ],
          },
          {
            title: 'Communication',
            questions: [
              {
                num: '2.7',
                text: 'Does the company have channels to share information with partners and stakeholders, and channels for them to give feedback (website, fanpage, email, periodic meetings...)?',
                kind: 'core',
                evidence:
                  'Screenshots or links to the channels; log recording and handling of feedback.',
                code: 'G 20',
                csiText:
                  'Establish forms of communication with partners and stakeholders, and forms/channels for receiving feedback from stakeholders',
                answer: 'yesno',
                action:
                  'Clearly identify the channels you use to share information externally and to receive feedback; record the feedback received and how it was handled.',
              },
            ],
          },
          {
            title: 'Innovation',
            questions: [
              {
                num: '2.8',
                text: 'Has the company invested in research, improvement or technology to make its management or products more sustainable?',
                kind: 'advanced',
                evidence:
                  'Investment plan or decision; supporting documents; results report; illustrative photos.',
                code: 'G 22',
                csiText:
                  'Carry out research and development, innovation and science and technology application activities (organising, training, investment...) to improve corporate governance processes, innovate products... contributing to the sustainable development of the enterprise',
                answer: 'yesno',
                action:
                  'Record the internal improvements already made (management software, process improvements, product designs with less packaging...) along with the amount invested and the results.',
              },
            ],
          },
        ],
      },
      {
        no: 3,
        title: 'Part 3 - Environment',
        subtitle: 'Permits, waste, energy saving and awareness raising',
        note: 'Most items here are mandatory under the Law on Environmental Protection. If an item does not apply to your business, choose "Not applicable".',
        groups: [
          {
            title: 'Compliance with environmental protection law',
            questions: [
              {
                num: '3.1',
                text: 'Does the company have a valid environmental permit or environmental registration (and a water extraction permit if it extracts water itself)?',
                kind: 'core',
                evidence:
                  'Valid environmental permit or environmental registration certificate; water extraction permit.',
                code: 'E 1',
                csiText:
                  'Holds a valid environmental permit; environmental registration; and registration for surface water and groundwater extraction and use, as required by regulations',
                answer: 'yesno',
                action:
                  'Check which category your company falls under in the Law on Environmental Protection 2020 to know whether you need a permit or only a registration. Review the expiry date and start the renewal process 6 months ahead.',
              },
              {
                num: '3.2',
                text: 'Has the company paid all environmental taxes and fees (wastewater, emissions, water extraction, etc.) in full and on time?',
                kind: 'core',
                evidence: 'Proof of payment of environmental taxes and fees; fee declarations.',
                code: 'E 2',
                csiText:
                  'Pays in full and on time all environmental protection taxes and fees for wastewater; emissions; surface water and groundwater use; environmental protection deposits; and payments for natural ecosystem services',
                answer: 'yesno',
                action:
                  'Review the environmental financial obligations the company must pay and keep complete payment records for 3 years.',
              },
              {
                num: '3.3',
                text: 'Has the company submitted its annual environmental protection report in full and on time (and reports on water, chemicals and packaging recycling if applicable)?',
                kind: 'core',
                evidence:
                  'Submitted reports with receipts from the receiving authority for all 3 years.',
                code: 'E 3',
                csiText:
                  'Submits environmental protection reports, reports on surface water and groundwater extraction, chemical activities, and packaging and product recycling results fully and on time',
                answer: 'yesno',
                action:
                  'Set a reminder for the environmental protection report deadline (before January 15 each year) and for other reports if they apply.',
              },
              {
                num: '3.4',
                text: 'Are household waste and ordinary industrial solid waste sorted, stored and handed over to a licensed provider as required?',
                kind: 'core',
                evidence:
                  'Waste collection and treatment contracts; handover records; photos of the storage area with signage.',
                code: 'E 4',
                csiText:
                  'Complies with regulations on the sorting, collection, transport, storage and treatment of ordinary industrial solid waste and domestic solid waste',
                answer: 'yesno',
                action:
                  'Set up a waste sorting area at the source, sign a contract with a licensed collector and keep complete handover records.',
              },
              {
                num: '3.5',
                text: 'Is hazardous waste (waste oil, oily rags, light bulbs, chemicals, etc.) stored separately, tracked in a logbook and handed over to a licensed provider?',
                kind: 'core',
                evidence:
                  'Hazardous waste source owner registration book; handover records; contract with a licensed provider.',
                code: 'E 5',
                csiText:
                  'Complies with regulations on the sorting, collection, transport, storage and treatment of hazardous solid waste',
                answer: 'yesno',
                action:
                  'Set up a separate storage area with warning signs, keep a waste source owner logbook and hand the waste over to a licensed hazardous waste treatment provider.',
              },
              {
                num: '3.6',
                text: 'If the company imports or exports used machinery, equipment, materials or scrap: does it comply with environmental protection regulations?',
                kind: 'core',
                evidence: 'Customs records; scrap import permit; inspection results.',
                code: 'E 6',
                csiText:
                  'Complies with environmental protection regulations on the export, import and transit of used goods, machinery, equipment, vehicles, raw materials and scrap',
                answer: 'yesno',
                action:
                  'Review the import conditions and customs records. If the company does not import or export these items, choose "Not applicable".',
              },
              {
                num: '3.7',
                text: 'If the company produces or imports products or packaging that carry recycling responsibility under EPR (extended producer responsibility): has it recycled or made the financial contribution as required?',
                kind: 'core',
                evidence:
                  'Registered recycling plan or proof of financial contribution; recycling results report.',
                code: 'E 7',
                csiText:
                  'Complies with regulations on product and packaging recycling responsibility (EPR) and waste treatment responsibility',
                answer: 'yesno',
                action:
                  "Check whether the company's products and packaging are on the list that must be recycled. If so, register a recycling plan or make the financial contribution on time.",
              },
              {
                num: '3.8',
                text: 'Are chemicals, equipment and tools used economically and safely, with an inventory list and safety instructions?',
                kind: 'core',
                evidence:
                  'Chemical inventory list; safety data sheets (MSDS); chemical safety training records.',
                code: 'E 8',
                csiText: 'Uses chemicals, equipment and tools economically and safely',
                answer: 'yesno',
                action:
                  'Prepare an inventory of the chemicals in use, keep a safety data sheet for each one, store them as required and train the people who handle them.',
              },
              {
                num: '3.9',
                text: 'Has the company equipped itself with enough equipment and tools to prevent and respond to environmental incidents (oil spills, chemical leaks, fires, etc.)?',
                kind: 'core',
                evidence:
                  'List of incident response equipment; periodic inspection records; photos.',
                code: 'E 9',
                csiText:
                  'Is fully equipped with equipment and tools for risk prevention and environmental incident response',
                answer: 'yesno',
                action:
                  'Provide and regularly inspect absorbent materials, spill containment barriers, fire extinguishers and protective gear; prepare a short incident response plan.',
              },
              {
                num: '3.10',
                text: 'Does the company monitor and control wastewater and emissions periodically as required (under its environmental permit)?',
                kind: 'core',
                evidence:
                  'Monitoring results for each period; contract with a qualified monitoring provider.',
                code: 'E 10',
                csiText:
                  'Controls, monitors and supervises wastewater and emissions in accordance with current regulations',
                answer: 'yesno',
                action:
                  'Carry out monitoring at the frequency stated in the environmental permit, performed by a licensed provider.',
              },
            ],
          },
          {
            title: 'Environmental protection activities and climate change response',
            questions: [
              {
                num: '3.11',
                text: 'Does the company have a policy encouraging employees to commute by low-emission transport (bus, bicycle, electric vehicle, carpooling, etc.)?',
                kind: 'advanced',
                evidence: 'Support policy; list of beneficiaries; payment records.',
                code: 'E 12',
                csiText:
                  'Implements policies that encourage and support employees in using low-emission transport',
                answer: 'yesno',
                action:
                  'Issue a policy that supports the cost of bus, bicycle or electric vehicle commuting, or organize carpooling or shuttle services.',
              },
              {
                num: '3.12',
                text: 'Has the company issued and regularly enforced rules on saving electricity and energy?',
                kind: 'core',
                evidence:
                  'Issued energy saving rules; inspection records; monthly electricity consumption data.',
                code: 'E 17',
                csiText: 'Issues and regularly implements energy-saving practice rules',
                answer: 'yesno',
                action:
                  'Issue short rules: turn off equipment when not in use, air conditioner temperature settings, periodic maintenance - and check that they are followed.',
              },
              {
                num: '3.13',
                text: 'Has the company made a commitment to protect biodiversity and not to trade, transport or use wild animals and wildlife products (including for hosting guests or as gifts)?',
                kind: 'core',
                evidence: 'Issued commitment or policy; internal communication materials.',
                code: 'E 24',
                csiText:
                  'Protects biodiversity and prevents and combats the trade, transport and use of wildlife',
                answer: 'yesno',
                action:
                  'You can combine this with the commitment in question G 19 into one document and share it with all staff.',
              },
            ],
          },
          {
            title: 'Environmental management and awareness raising',
            questions: [
              {
                num: '3.14',
                text: 'Has the company trained and communicated with employees about environmental protection and climate change, and tracked how their awareness changed after the training?',
                kind: 'core',
                evidence:
                  'Training materials; attendance lists; results of awareness surveys before and after.',
                code: 'E 26',
                csiText:
                  'Organises training and tracks changes in awareness and behaviour after training, and communicates to raise employee awareness of environmental protection and climate change response',
                answer: 'yesno',
                action:
                  'Hold at least 1 training session per year and use a short questionnaire before and after the session to see how awareness has changed.',
              },
            ],
          },
        ],
      },
      {
        no: 4,
        title: 'Part 4 - Employees and society',
        subtitle: 'Contracts, pay, workplace safety, dialogue and customer relations',
        note: 'This is the longest part. It is best done together with the person in charge of HR or accounting.',
        groups: [
          {
            title: 'Personnel management',
            questions: [
              {
                num: '4.1',
                text: 'Has the company signed written labor contracts of the correct type and with full content with everyone who works for 1 month or longer?',
                kind: 'core',
                evidence: 'Set of labor contracts; list of employees with contract types.',
                code: 'L 1',
                csiText:
                  'Fully complies with regulations on concluding labour contracts: in writing for contracts of one (01) month or longer; using the correct contract type; with all contents required by regulations',
                answer: 'yesno',
                action:
                  'Review all contracts: they must contain the content required by Article 21 of the Labor Code 2019, be of the correct type, and be in writing for every contract of 1 month or longer.',
              },
              {
                num: '4.2',
                text: 'When temporarily reassigning an employee to other work or another workplace, does the company follow the regulations and the terms agreed in the contract?',
                kind: 'core',
                evidence: 'Reassignment decision; advance notice; contract stating the workplace.',
                code: 'L 2',
                csiText:
                  'Complies with regulations on performing labour contracts, including temporarily transferring employees to work other than that in their contract in accordance with regulations, and assigning the workplace as agreed',
                answer: 'yesno',
                action:
                  "Reassign only as permitted (no more than 60 cumulative days per year, with 3 working days' advance notice) and place employees at the agreed location.",
              },
              {
                num: '4.3',
                text: 'Are amendments to and termination of labor contracts done as required (in writing, with sufficient advance notice, with full payment)?',
                kind: 'core',
                evidence:
                  'Contract addenda; termination decisions; settlement records; payment records.',
                code: 'L 3',
                csiText:
                  'Complies with regulations on amending, supplementing and terminating labour contracts',
                answer: 'yesno',
                action:
                  'Review the process: valid grounds, correct notice periods, and full payment within 14 working days when a contract ends.',
              },
              {
                num: '4.4',
                text: 'Has the company signed electronic labor contracts?',
                kind: 'advanced',
                evidence:
                  'Signed electronic labor contracts; description of the digital signature platform in use.',
                code: 'L 4',
                csiText:
                  'Proactively develops and implements the signing of electronic labour contracts',
                answer: 'yesno',
                action:
                  'Roll out electronic labor contracts through a valid digital signature platform - it saves time and storage.',
              },
              {
                num: '4.5',
                text: 'Has the company set up an employee management register (paper or electronic) and does it update it as soon as someone new joins?',
                kind: 'core',
                evidence:
                  'Updated employee management register (paper copy or export from software).',
                code: 'L 5',
                csiText:
                  'Maintains a labour management register and fully records employee information in it from the time employees start work, as required by regulations',
                answer: 'yesno',
                action:
                  'Set up an employee management register and update it as soon as someone new joins, with all the information required.',
              },
              {
                num: '4.6',
                text: 'Does the company report changes in its workforce periodically to the local labor authority?',
                kind: 'core',
                evidence: 'Submitted workforce reports with receipts.',
                code: 'L 6',
                csiText:
                  'Reports changes in the workforce to the state labour authority as required by regulations',
                answer: 'yesno',
                action:
                  'Submit the workforce change report to the local labor authority every 6 months.',
              },
              {
                num: '4.7',
                text: 'Does the company have written internal labor regulations registered with the labor authority? (mandatory for companies with 10 or more employees)',
                kind: 'core',
                evidence:
                  'Internal labor regulations; registration confirmation; photo of the posting at the workplace.',
                code: 'L 7',
                csiText:
                  'Develops and registers internal labour regulations with the state labour authority',
                answer: 'yesno',
                action:
                  'Draft the internal labor regulations, register them with the provincial labor authority and post them at the workplace. With fewer than 10 employees, registration is not required but it is still advisable to have regulations.',
              },
              {
                num: '4.8',
                text: 'When handling labor discipline, does the company follow the proper principles and procedure (a meeting, minutes, and an employee representative)?',
                kind: 'core',
                evidence:
                  'Disciplinary procedure; meeting minutes; disciplinary decisions (if any).',
                code: 'L 8',
                csiText:
                  'Ensures the principles, order and procedures for handling labour discipline',
                answer: 'yesno',
                action:
                  'Discipline must be based on the internal labor regulations; hold a meeting attended by the employee representative organization and the person concerned, and keep minutes.',
              },
              {
                num: '4.9',
                text: 'Are employees informed about internal job openings and promotion opportunities?',
                kind: 'core',
                evidence: 'Internal job announcements; promotion rules; list of people promoted.',
                code: 'L 9',
                csiText:
                  'Enables employees to access employment opportunities and career advancement',
                answer: 'yesno',
                action:
                  'Make internal job openings and promotion criteria public so employees know about development opportunities.',
              },
            ],
          },
          {
            title: 'Pay, bonuses and compulsory insurance',
            questions: [
              {
                num: '4.10',
                text: 'Has the company developed and publicly posted its salary scale, pay table and labor norms at the workplace?',
                kind: 'core',
                evidence:
                  'Salary scale and pay table; minutes of consultation with the employee representative organization; photo of the posting.',
                code: 'L 11',
                csiText:
                  'Develops and publicly discloses the wage scales, payrolls and labour norms at the workplace',
                answer: 'yesno',
                action:
                  'Develop the salary scale, pay table and labor norms, consult the employee representative organization (if any) and post them publicly.',
              },
              {
                num: '4.11',
                text: 'Does the company have a written pay policy?',
                kind: 'advanced',
                evidence: 'Issued pay policy; proof it was shared with employees.',
                code: 'L 12',
                csiText: 'Develops wage payment regulations for employees',
                answer: 'yesno',
                action:
                  'Issue a pay policy that clearly states the pay structure, criteria for raises and how overtime pay is calculated.',
              },
              {
                num: '4.12',
                text: 'Does the company pay salaries and overtime on time and in full, and send a pay statement to each employee?',
                kind: 'core',
                evidence: 'Payroll; bank transfer records; sample pay slip sent to employees.',
                code: 'L 13',
                csiText:
                  "Pays employees' wages and overtime pay on time and in full, and provides them with wage statements",
                answer: 'yesno',
                action:
                  'Pay on the committed date and send each employee a detailed pay slip every pay period.',
              },
              {
                num: '4.13',
                text: 'Does the company have a written bonus policy and follow it?',
                kind: 'advanced',
                evidence: 'Bonus policy; bonus decisions; bonus payment records.',
                code: 'L 14',
                csiText: 'Develops and implements bonus regulations for employees',
                answer: 'yesno',
                action:
                  'Issue a transparent bonus policy that clearly states the basis and timing for bonus decisions.',
              },
              {
                num: '4.14',
                text: 'Does the company pay social insurance, health insurance, unemployment insurance and occupational accident and disease insurance in full and on time for all employees required to be covered?',
                kind: 'core',
                evidence:
                  'Social insurance payment notice (form C12-TS); confirmation of no social insurance arrears; payment records.',
                code: 'L 15',
                csiText:
                  'Pays social insurance, health insurance, unemployment insurance and occupational accident and disease insurance on time and for all employees subject to mandatory contributions',
                answer: 'yesno',
                action:
                  'Pay in full and on time for 100% of the employees who must be covered. Check whether there are any outstanding arrears.',
              },
            ],
          },
          {
            title: 'Allowances and benefits',
            questions: [
              {
                num: '4.15',
                text: 'Does the company support employees with meal allowances for shifts or lunch?',
                kind: 'advanced',
                evidence: 'Support policy; payroll showing the allowance; meal supply contract.',
                code: 'L 19',
                csiText: 'Provides shift meal and lunch allowances for employees',
                answer: 'yesno',
                action: 'Provide a shift or lunch meal allowance, or organize meals for employees.',
              },
              {
                num: '4.16',
                text: "Does the company have a policy supporting employees' childcare (daycare, gifts on June 1, rewards for children with good grades, etc.)?",
                kind: 'advanced',
                evidence: 'Support policy; list of beneficiaries; payment records.',
                code: 'L 20',
                csiText:
                  "Implements policies supporting employees' childcare: daycare/raising young children/high academic achievement...",
                answer: 'yesno',
                action:
                  'Issue a childcare support policy: daycare allowance, gifts on June 1, and rewards for children with good academic results.',
              },
              {
                num: '4.17',
                text: 'Does the company organize cultural, sports, sightseeing or travel activities for employees?',
                kind: 'advanced',
                evidence: 'Activity plan; participant lists; photos; payment records.',
                code: 'L 21',
                csiText:
                  'Organises cultural, artistic and sports activities, and excursions and trips for employees',
                answer: 'yesno',
                action:
                  'Organize at least one cultural, sports or sightseeing activity each year to build team spirit.',
              },
              {
                num: '4.18',
                text: 'Does the company support employees with a phone allowance?',
                kind: 'advanced',
                evidence: 'Support policy; payroll showing the allowance.',
                code: 'L 23',
                csiText: 'Provides a phone allowance',
                answer: 'yesno',
                action: 'Support phone costs for roles that need to stay in regular contact.',
              },
              {
                num: '4.19',
                text: 'Does the company have a practice of sending greetings or gifts to employees for birthdays, weddings and bereavements?',
                kind: 'advanced',
                evidence: 'Welfare policy; visit tracking log; payment records.',
                code: 'L 24',
                csiText: 'Provides support for birthdays, weddings, bereavement of relatives...',
                answer: 'yesno',
                action:
                  'Maintain the practice of greetings or gifts for birthdays, weddings and bereavements, and write it into the welfare policy.',
              },
              {
                num: '4.20',
                text: 'Does the company provide assistance to employees facing hardship due to accidents?',
                kind: 'advanced',
                evidence: 'Assistance policy; list of those supported; payment records.',
                code: 'L 25',
                csiText: 'Provides allowances for employees in hardship due to accidents',
                answer: 'yesno',
                action:
                  'Have a fund or mechanism to assist employees facing hardship due to accidents.',
              },
            ],
          },
          {
            title: 'Working hours and rest',
            questions: [
              {
                num: '4.21',
                text: 'Are normal working hours kept to no more than 8 hours a day or 48 hours a week?',
                kind: 'core',
                evidence: 'Timesheets; internal labor regulations stating working hours.',
                code: 'L 26',
                csiText:
                  'Applies normal working hours of no more than 08 hours per 01 day or no more than 48 hours per 01 week',
                answer: 'yesno',
                action: 'Check the timesheets and adjust work schedules if they exceed the limit.',
              },
              {
                num: '4.22',
                text: 'Do employees get weekly rest, breaks during the day, rest between shifts and mid-shift breaks as required?',
                kind: 'core',
                evidence: 'Timesheets; shift schedules; internal labor regulations.',
                code: 'L 27',
                csiText:
                  'Ensures weekly rest, breaks during working hours, rest between shifts and mid-shift breaks for employees',
                answer: 'yesno',
                action:
                  'Ensure at least 24 consecutive hours of weekly rest, a 30-minute mid-shift break (45 minutes for night shifts), and at least 12 hours of rest between shifts.',
              },
              {
                num: '4.23',
                text: 'Are overtime, night shifts, and work on days off and public holidays done as required (with agreement, within the limits, paid at the correct rates)?',
                kind: 'core',
                evidence: 'Written consent to overtime; overtime timesheets; payroll.',
                code: 'L 28',
                csiText:
                  'Strictly complies with regulations on employing employees for overtime, night shifts, and work on rest days and public holidays',
                answer: 'yesno',
                action:
                  "Keep overtime to no more than 40 hours/month and 200 hours/year (300 hours for permitted industries), with the employee's consent and at the correct pay rates.",
              },
              {
                num: '4.24',
                text: 'Do employees get paid personal leave or unpaid leave as required?',
                kind: 'core',
                evidence: 'Internal labor regulations; leave requests and approvals; timesheets.',
                code: 'L 29',
                csiText:
                  'Ensures employees can take personal leave or unpaid leave as required by regulations',
                answer: 'yesno',
                action:
                  "Ensure the leave entitlements for the employee's own marriage, a child's marriage, bereavement, and unpaid leave as required.",
              },
            ],
          },
          {
            title: 'Occupational health and safety',
            questions: [
              {
                num: '4.25',
                text: 'Does the company organize periodic health checks for employees as required?',
                kind: 'core',
                evidence: 'Contract with a medical facility; health check results.',
                code: 'L 30',
                csiText:
                  'Provide periodic health check-ups for employees as required by regulations',
                answer: 'yesno',
                action:
                  'Hold health checks at least once a year; every 6 months for employees in heavy, hazardous work, employees with disabilities, minors and older employees.',
              },
              {
                num: '4.26',
                text: 'Does the company have a medical unit or hire medical services as required?',
                kind: 'core',
                evidence: 'Decision establishing a medical unit or medical service contract.',
                code: 'L 31',
                csiText:
                  'Establish an in-house healthcare unit or engage a healthcare service provider as required by regulations',
                answer: 'yesno',
                action:
                  'Small enterprises usually only need to sign a contract with a qualified medical facility.',
              },
              {
                num: '4.27',
                text: 'Has the company assigned people to provide first aid and emergency care and provided first aid kits at the workplace?',
                kind: 'core',
                evidence:
                  'Assignment decision; first aid training certificates; first aid kit inventory.',
                code: 'L 32',
                csiText:
                  'Arrange first-aid and emergency response personnel at the workplace as required by regulations',
                answer: 'yesno',
                action:
                  'Assign and send first aid providers for training; provide first aid kits for each work area.',
              },
              {
                num: '4.28',
                text: 'If the company has a canteen: does it control food quality and food safety and hygiene?',
                kind: 'advanced',
                evidence: 'Food safety eligibility certificate; food sample retention log.',
                code: 'L 33',
                csiText: 'Control the quality and food safety and hygiene of the employee canteen',
                answer: 'yesno',
                action:
                  'Keep food samples for 24 hours, keep records of food origin and arrange health checks for kitchen staff. If there is no canteen, choose "Not applicable".',
              },
              {
                num: '4.29',
                text: 'Has the company issued occupational safety and health rules, procedures and plans?',
                kind: 'core',
                evidence:
                  'Annual occupational safety and health plan; safety rules and procedures.',
                code: 'L 34',
                csiText:
                  'Issue rules, procedures and plans to ensure occupational safety and health at the workplace',
                answer: 'yesno',
                action:
                  'Prepare an annual occupational safety and health plan with a budget, together with safety rules for each role.',
              },
              {
                num: '4.30',
                text: 'Does the company have a unit or a qualified person in charge of occupational safety and health?',
                kind: 'core',
                evidence: 'Assignment decision; training certificate of the person in charge.',
                code: 'L 35',
                csiText:
                  'Arrange a unit or personnel in charge of occupational safety and health who meet the qualification requirements under regulations',
                answer: 'yesno',
                action:
                  'Assign a person in charge of occupational safety and health and send them for training to obtain the appropriate certificate.',
              },
              {
                num: '4.31',
                text: 'Are machines and equipment with strict safety requirements (boilers, lifting equipment, pressure vessels, etc.) inspected on time?',
                kind: 'core',
                evidence: 'Equipment inventory; valid inspection certificates.',
                code: 'L 36',
                csiText:
                  'Machinery and equipment in use that are subject to strict occupational safety requirements are inspected as required by regulations',
                answer: 'yesno',
                action:
                  'Make an inventory of this equipment and have it inspected at the correct intervals. If you have no equipment of this type, choose "Not applicable".',
              },
              {
                num: '4.32',
                text: 'Has the company assessed health risks at the workplace?',
                kind: 'advanced',
                evidence: 'Risk assessment report; control measures applied.',
                code: 'L 37',
                csiText: "Assess workplace risks related to employees' health",
                answer: 'yesno',
                action:
                  'Assess health risks at least once a year for roles with dangerous or harmful factors.',
              },
              {
                num: '4.33',
                text: 'Does the company have a plan for handling incidents and emergency response at the workplace?',
                kind: 'core',
                evidence: 'Emergency response plan; drill records; evacuation map.',
                code: 'L 38',
                csiText: 'Issue an incident response and emergency response plan for the workplace',
                answer: 'yesno',
                action:
                  'Develop an emergency response plan (fire or explosion, accidents, leaks) and hold drills regularly.',
              },
              {
                num: '4.34',
                text: 'When a workplace accident occurs, does the company investigate and report to the authorities as required?',
                kind: 'core',
                evidence:
                  'Accident investigation report; notification documents; benefit settlement records.',
                code: 'L 39',
                csiText:
                  'Investigate and report occupational accidents at the workplace to the competent authorities',
                answer: 'yesno',
                action:
                  'Set up an investigation team, prepare the report and notify within the deadline. If no accident has ever occurred, choose "Not applicable".',
              },
              {
                num: '4.35',
                text: 'Are workers provided with enough personal protective equipment suited to their work?',
                kind: 'core',
                evidence:
                  'Issuance list; signed receipt book; photos of workers using the equipment.',
                code: 'L 40',
                csiText: 'Provide sufficient personal protective equipment to employees',
                answer: 'yesno',
                action:
                  'Issue enough protective gear for each role, have workers sign for it and check that it is used.',
              },
              {
                num: '4.36',
                text: 'Has the company made a list of workers doing heavy, hazardous or dangerous work?',
                kind: 'core',
                evidence:
                  'Worker classification list; comparison with the list of heavy and hazardous occupations.',
                code: 'L 41',
                csiText:
                  'Record and classify workers performing arduous, hazardous or dangerous work and workers performing especially arduous, hazardous or dangerous work',
                answer: 'yesno',
                action:
                  'Compare job positions with the State\'s list of heavy and hazardous occupations so the correct entitlements apply. If you have no such positions, choose "Not applicable".',
              },
              {
                num: '4.37',
                text: 'Does the company provide occupational safety and health training for workers as required?',
                kind: 'core',
                evidence: 'Training plan; attendance lists; certificates or safety cards.',
                code: 'L 42',
                csiText:
                  'Provide occupational safety and health training for employees as required by regulations',
                answer: 'yesno',
                action:
                  'Train the right groups at the right intervals (every 2 years for group 3, every year for group 4).',
              },
              {
                num: '4.38',
                text: 'Does the company carry out workplace environment monitoring every year (dust, noise, heat, lighting, toxic fumes, etc.)?',
                kind: 'core',
                evidence:
                  'Workplace environment monitoring results; contract with a qualified provider.',
                code: 'L 43',
                csiText: 'Conduct annual monitoring of the working environment',
                answer: 'yesno',
                action:
                  'Hire a qualified provider to monitor at least once a year and fix any factor that exceeds the threshold.',
              },
              {
                num: '4.39',
                text: 'Does the company submit periodic reports on workplace accidents and occupational safety and health to the authorities?',
                kind: 'core',
                evidence: 'Submitted reports with receipts.',
                code: 'L 44',
                csiText:
                  'Periodically report to the competent authorities on occupational accidents and occupational safety and health',
                answer: 'yesno',
                action:
                  'Submit the annual occupational safety and health and workplace accident reports, usually before January 10.',
              },
            ],
          },
          {
            title: 'Education and training',
            questions: [
              {
                num: '4.40',
                text: 'Are employees trained before being moved to heavy, hazardous or dangerous work?',
                kind: 'core',
                evidence: 'Transfer decision; training program and results.',
                code: 'L 45',
                csiText:
                  'Train employees before transferring them to positions or fields of work involving arduous or hazardous work',
                answer: 'yesno',
                action:
                  'Retrain employees before moving them to positions with heavy, hazardous or dangerous factors. If there are no such positions, choose "Not applicable".',
              },
              {
                num: '4.41',
                text: 'Does the company have an annual training plan and a budget for training?',
                kind: 'core',
                evidence: 'Annual training plan with budget estimate; results report.',
                code: 'L 46',
                csiText:
                  "Develop an annual plan and allocate funding for training, capacity building and upgrading of employees' qualifications and vocational skills; company policies and regulations; and laws and legal policies",
                answer: 'yesno',
                action:
                  'Prepare an annual training plan with a separate budget line, including training on internal regulations and labor law.',
              },
            ],
          },
          {
            title: 'Trade union and collective labor agreement',
            questions: [
              {
                num: '4.42',
                text: 'Does the company have a grassroots trade union established through the proper procedure?',
                kind: 'core',
                evidence:
                  'Decision recognizing the grassroots trade union; list of the executive committee.',
                code: 'L 47',
                csiText:
                  'Establish a grassroots trade union in accordance with the proper process and procedures',
                answer: 'yesno',
                action:
                  'Work with the higher-level trade union to establish one. If the company does not yet qualify, record that you have made contact and enable employees to join the higher-level trade union.',
              },
              {
                num: '4.43',
                text: 'Does the company provide conditions (time, venue, funding) for the trade union to operate?',
                kind: 'core',
                evidence: 'Proof of trade union fee payments; records of activities.',
                code: 'L 48',
                csiText:
                  "Enable trade union members and officers to carry out trade union activities effectively in line with the trade union's functions and duties",
                answer: 'yesno',
                action:
                  'Arrange time and venue for trade union activities and pay trade union fees as required.',
              },
              {
                num: '4.44',
                text: 'Does the company consult the trade union when developing salary scale and payroll, labor norms and bonus regulations?',
                kind: 'core',
                evidence: "Consultation documents and the trade union's written responses.",
                code: 'L 49',
                csiText:
                  'Consult the executive committee of the grassroots trade union when developing wage scales, payrolls, labour norms and bonus regulations',
                answer: 'yesno',
                action:
                  "Send a written request for the trade union's opinion before issuing these documents and keep its written reply.",
              },
              {
                num: '4.45',
                text: 'Does the company consult the trade union when developing occupational safety and health plans, regulations and procedures?',
                kind: 'core',
                evidence:
                  'Consultation documents; meeting minutes signed by a trade union representative.',
                code: 'L 50',
                csiText:
                  'Consult the executive committee of the grassroots trade union (where a trade union exists) when developing and issuing plans, rules and procedures to ensure occupational safety and health at the workplace',
                answer: 'yesno',
                action:
                  "Obtain the trade union's opinion in writing before issuing occupational safety and health documents.",
              },
              {
                num: '4.46',
                text: 'When a written proposal for collective bargaining is made, does the company hold the negotiation as required?',
                kind: 'core',
                evidence: 'Written bargaining proposal; minutes of negotiation sessions.',
                code: 'L 51',
                csiText:
                  'Written request for negotiation by either party, the grassroots trade union or the employer, on the content of the collective bargaining request',
                answer: 'yesno',
                action:
                  'Respond and hold negotiations within the required time limit when one side makes a written request.',
              },
              {
                num: '4.47',
                text: 'Does the collective labor agreement (if any) comply with the law and give employees more favorable terms?',
                kind: 'core',
                evidence: 'Signed agreement; document sent to the labor management authority.',
                code: 'L 52',
                csiText:
                  'The content of the collective labour agreement does not contravene the law and is more favourable to employees',
                answer: 'yesno',
                action:
                  'The agreement must contain at least one term more favorable to employees than the law. If there is no agreement, choose "Not yet".',
              },
            ],
          },
          {
            title: 'Workplace democracy and dialogue',
            questions: [
              {
                num: '4.48',
                text: 'Has the company developed and publicly shared a workplace democracy regulation?',
                kind: 'core',
                evidence: 'Issued democracy regulation; photo of it posted.',
                code: 'L 53',
                csiText: 'Develop and publicly disclose workplace democracy regulations',
                answer: 'yesno',
                action:
                  'Issue and post the democracy regulation, clearly stating what employees are entitled to know, discuss, decide and check.',
              },
              {
                num: '4.49',
                text: 'Does the company have two-way channels for exchanging and handling internal information (suggestion box, coordination meetings, internal group...)?',
                kind: 'core',
                evidence:
                  'Information exchange regulation; log of feedback and how it was handled.',
                code: 'L 54',
                csiText:
                  'Develop and implement a mechanism for exchanging and handling information within the enterprise',
                answer: 'yesno',
                action:
                  'Set up an internal feedback channel and record the feedback received and how it was handled.',
              },
              {
                num: '4.50',
                text: 'Does the company hold workplace dialogue periodically or whenever an issue arises?',
                kind: 'core',
                evidence: 'Dialogue minutes; attendance list.',
                code: 'L 55',
                csiText: 'Hold periodic or ad hoc dialogues at the workplace',
                answer: 'yesno',
                action:
                  'Hold dialogue at least once a year as required, or immediately when an issue arises.',
              },
              {
                num: '4.51',
                text: 'Does the company hold an annual employee conference?',
                kind: 'core',
                evidence: 'Minutes or resolution of the employee conference.',
                code: 'L 56',
                csiText: 'Hold an annual employee conference',
                answer: 'yesno',
                action:
                  'Hold an employee conference every year with the participation of the employee representative organization.',
              },
              {
                num: '4.52',
                text: 'When a labor dispute arises, does the company resolve it following the procedure set by law?',
                kind: 'core',
                evidence: 'Case file; mediation minutes; resolution decision.',
                code: 'L 58',
                csiText:
                  'Resolve labour disputes in accordance with the procedures prescribed by law',
                answer: 'yesno',
                action:
                  'Resolve in this order: negotiation, labor mediator, arbitration council or court. If there has never been a dispute, choose "Not applicable".',
              },
            ],
          },
          {
            title: 'Female employees, special categories of workers and non-discrimination',
            questions: [
              {
                num: '4.53',
                text: 'Does the workplace have enough suitable shower rooms and toilets (separate for men and women)?',
                kind: 'core',
                evidence: 'Floor plan; photos of the sanitation areas.',
                code: 'L 60',
                csiText: 'Ensure sufficient and suitable shower rooms and toilets at the workplace',
                answer: 'yesno',
                action:
                  'Check the number and condition of sanitation facilities, making sure they are separate for men and women and sufficient for the number of employees.',
              },
              {
                num: '4.54',
                text: 'If the company employs minors: does it follow the proper rules for employing them?',
                kind: 'core',
                evidence:
                  'List of minor employees; written consent of their representatives; health check records.',
                code: 'L 62',
                csiText: 'Ensure compliance with the principles for employing minors',
                answer: 'yesno',
                action:
                  'Obtain consent from the representative, do not assign prohibited work, and limit working hours. If the company does not employ minors, choose "Not applicable".',
              },
              {
                num: '4.55',
                text: 'Does the company ensure there is no forced labor in any form (no holding of documents, no forced overtime, no deposits...)?',
                kind: 'core',
                evidence:
                  'Commitment in the internal labor regulations; self-check results; dialogue minutes.',
                code: 'L 63',
                csiText: 'No forced labour in any form',
                answer: 'yesno',
                action:
                  'Review to confirm: no holding of identity documents, no required deposits, no forced overtime, and employees are allowed to resign as regulated.',
              },
              {
                num: '4.56',
                text: 'Does the company ensure non-discrimination (gender, ethnicity, religion, marital status...) in recruitment, pay and promotion?',
                kind: 'core',
                evidence: 'Internal labor regulations; recruitment procedure; complaint log.',
                code: 'L 64',
                csiText: 'No discrimination in the management, employment and direction of workers',
                answer: 'yesno',
                action:
                  'Review the regulations and actual practice in recruitment, pay and promotion to eliminate all discrimination.',
              },
              {
                num: '4.57',
                text: 'If the company employs workers with disabilities: does it ensure suitable working conditions and follow the proper rules?',
                kind: 'advanced',
                evidence:
                  'List of employees with disabilities; records of suitable working conditions.',
                code: 'L 66',
                csiText:
                  'Ensure compliance with the principles for employing workers with disabilities',
                answer: 'yesno',
                action:
                  'Ensure suitable working conditions, do not assign heavy, hazardous or dangerous work, and consult them before deciding on related matters.',
              },
            ],
          },
          {
            title: 'Relations with customers and community',
            questions: [
              {
                num: '4.58',
                text: 'Is all advertising, labeling and "green" claims about products and services truthful and backed by evidence (no "greenwashing")?',
                kind: 'core',
                evidence:
                  'Label samples; advertising content; certificates or test results supporting the claims.',
                code: 'S 1',
                csiText:
                  'Comply with requirements on marketing and labelling of products/services, and combat "greenwashing"',
                answer: 'yesno',
                action:
                  'Review every "green", "eco" or "environmentally friendly" claim: remove or correct any claim that has no evidence.',
              },
              {
                num: '4.59',
                text: 'Does the company check the quality of products and services to ensure safety and health for consumers, especially children?',
                kind: 'core',
                evidence: 'Quality control procedure; test results or conformity certificates.',
                code: 'S 2',
                csiText:
                  'Inspect and assess the quality of products/services to ensure consumer safety and health, especially for children',
                answer: 'yesno',
                action:
                  'Set up a quality and safety check step before products are placed on the market.',
              },
              {
                num: '4.60',
                text: "Does the company protect customers' personal information when collecting, storing and using it?",
                kind: 'core',
                evidence: 'Data privacy policy; access authorization regulations.',
                code: 'S 3',
                csiText:
                  "Uphold customers' right to information confidentiality in the collection, storage, processing and use of their information",
                answer: 'yesno',
                action:
                  'Issue a customer data privacy policy in line with Decree 13/2023/ND-CP, and assign who may view which data.',
              },
              {
                num: '4.61',
                text: 'Does the company host student interns or student workers?',
                kind: 'advanced',
                evidence:
                  'Agreement with the educational institution; list of students; internship confirmation letters.',
                code: 'S 5',
                csiText: 'Enable students to intern and work at the enterprise',
                answer: 'yesno',
                action:
                  'Sign a cooperation agreement with a university, college or vocational school to host student interns, with an assigned supervisor.',
              },
            ],
          },
        ],
      },
    ],
    areaTitles: [
      'Business and operational data',
      'Corporate governance',
      'Environment',
      'Employees and society',
    ],
    results: {
      title: 'ESG Readiness Results',
      subtitle: 'Where does your business stand, and what is still missing?',
      note: 'This page updates automatically from your answers. You don\'t need to fill in anything here, except the "Almost ready" threshold if you want to adjust it.',
      overallLabel: 'Overall readiness level of the business',
      overallNote: 'Equal to the lowest level among the four areas below.',
      areasTitle: 'Readiness level by area',
      areasHeaders: [
        'Area',
        'Mandatory items in place',
        'Mandatory items missing',
        'Of which need fixing now',
        'Mandatory item progress',
        'Readiness level',
        'Advanced items done',
        'Unanswered questions',
      ],
      howTitle: 'How the readiness level is determined',
      how: [
        {
          label: 'READY',
          text: 'All applicable mandatory items in the area are in place.',
        },
        {
          label: 'ALMOST READY',
          text: 'At or above the threshold in the box below, but not all items are in place yet.',
        },
        {
          label: 'NOT READY',
          text: 'Below the threshold in the box below.',
        },
      ],
      thresholdLabel: '"Almost ready" threshold (editable):',
      thresholdNote:
        'Default is 80% of mandatory items. Questions marked "Not applicable" are not counted. Advanced items are added value and do not affect the readiness level.',
      thresholdDefault: 0.8,
      groupsTitle: 'Where the gaps are - By task group',
      groupsHeaders: [
        'Task group',
        'Area',
        'Mandatory items in place',
        'Mandatory items missing',
        'Mandatory item progress',
        'Advanced items done',
        'Unanswered questions',
      ],
      firstTitle: 'Mandatory items to do first',
      firstNote: 'The first 10 items - see the full list on the "Gaps to close" page',
      firstHeaders: ['Question no.', 'Missing item', 'Priority'],
    },
    gap: {
      title: 'Gaps to close and action plan',
      subtitle:
        'Filter by "Priority" level to see what to do first. Assign an owner and a due date for each item.',
      note: 'The contents from "Question" to "Documents you need" update automatically from your answers.',
      headers: [
        'No.',
        'Area',
        'Task group',
        'Question',
        'Item type',
        'Answer',
        'Status',
        'Priority',
        'Action needed',
        'Documents you need',
        'Owner',
        'Due date',
        'Progress',
      ],
    },
    documents: {
      title: 'Checklist of documents you need',
      subtitle: 'Documents that help the business answer "Yes" with confidence',
      note: 'Mark the status of each document. Keep records for at least the last 3 years and name folders by question number so they are easy to find.',
      headers: [
        'Record, document',
        'Related to questions',
        'Notes',
        'In place?',
        'Stored where',
        'Held by',
      ],
      groups: [
        {
          title: 'Group 1 - Governance and commitments',
          items: [
            {
              id: 'd7',
              title: 'Annual business plan with environmental and social targets',
              refs: '2.1',
              note: 'At least one environmental target and one social target with specific numbers, approved by management.',
            },
            {
              id: 'd8',
              title: 'Risk management regulation and list of key risks',
              refs: '2.2',
              note: 'A small business can keep it to 2 - 3 pages.',
            },
            {
              id: 'd9',
              title: 'Customer satisfaction survey questionnaire and results',
              refs: '2.3',
              note: 'A short online form is enough.',
            },
            {
              id: 'd10',
              title: 'Complaint handling procedure and complaint log',
              refs: '2.4',
              note: 'State the response deadline and how whistleblowers are protected.',
            },
            {
              id: 'd11',
              title: 'Workplace sexual harassment prevention regulation',
              refs: '2.5',
              note: 'Best included in the internal labor regulations.',
            },
            {
              id: 'd12',
              title: 'Commitment not to use wildlife and to protect biodiversity',
              refs: '2.6, 3.13',
              note: 'One document can cover both questions.',
            },
          ],
        },
        {
          title: 'Group 2 - Environmental records',
          items: [
            {
              id: 'd14',
              title: 'Environmental permit or environmental registration certificate',
              refs: '3.1',
              note: 'Check the expiry date and renew 6 months in advance.',
            },
            {
              id: 'd15',
              title: 'Proof of payment of environmental protection tax and fees',
              refs: '3.2',
              note: 'Keep a full 3 years.',
            },
            {
              id: 'd16',
              title: 'Annual environmental protection report',
              refs: '3.3',
              note: 'Usually submitted before 15 January each year - keep the receipt.',
            },
            {
              id: 'd17',
              title: 'Contracts and waste transfer records with a licensed handler',
              refs: '3.4, 3.5, 1.16',
              note: "Check that the handler's license is still valid.",
            },
            {
              id: 'd18',
              title: 'Hazardous waste generator registration book',
              refs: '3.5',
              note: 'Mandatory if the business generates hazardous waste.',
            },
            {
              id: 'd19',
              title: 'Chemical inventory and chemical safety data sheets',
              refs: '3.8',
              note: 'Include safety instructions for people who handle them.',
            },
            {
              id: 'd20',
              title: 'Periodic wastewater and emissions monitoring results',
              refs: '3.10, 1.21',
              note: 'Follow the frequency stated in the environmental permit.',
            },
            {
              id: 'd21',
              title: 'Energy saving regulation',
              refs: '3.12',
              note: 'Include inspection records of how it is carried out.',
            },
          ],
        },
        {
          title: 'Group 3 - Labor and safety records',
          items: [
            {
              id: 'd23',
              title: 'Set of labor contracts and employee list',
              refs: '4.1, 4.2, 4.3',
              note: 'Contain all mandatory content under Article 21 of the Labor Code 2019.',
            },
            {
              id: 'd24',
              title: 'Employee management book',
              refs: '4.5',
              note: 'Paper or electronic both work.',
            },
            {
              id: 'd25',
              title: 'Registered internal labor regulations',
              refs: '4.7, 2.5',
              note: 'Registration is mandatory for businesses with 10 or more employees.',
            },
            {
              id: 'd26',
              title: 'Posted salary scale and payroll',
              refs: '4.10, 4.44',
              note: 'Include the opinion of the employee representative organization (if any).',
            },
            {
              id: 'd27',
              title: 'Social insurance contribution result notice (form C12-TS)',
              refs: '4.14, 1.12',
              note: 'The strongest evidence of insurance contributions.',
            },
            {
              id: 'd28',
              title: 'Timesheets and overtime records',
              refs: '4.21, 4.22, 4.23',
              note: "Include the employee's written consent to overtime.",
            },
            {
              id: 'd29',
              title: 'Periodic health check records',
              refs: '4.25',
              note: 'At least once a year.',
            },
            {
              id: 'd30',
              title: 'Annual occupational safety and health plan',
              refs: '4.29',
              note: 'With a budget and assigned responsibilities.',
            },
            {
              id: 'd31',
              title: 'Occupational safety and health training records',
              refs: '4.37',
              note: 'Include safety cards or certificates.',
            },
            {
              id: 'd32',
              title: 'Workplace environment monitoring results',
              refs: '4.38',
              note: 'Every year.',
            },
            {
              id: 'd33',
              title: 'Annual training plan with a budget',
              refs: '4.41, 1.13',
              note: 'Include a summary table of training hours.',
            },
            {
              id: 'd34',
              title:
                'Grassroots democracy regulation and minutes of dialogues and employee conferences',
              refs: '4.48, 4.50, 4.51',
              note: 'Include a photo of the posted regulation.',
            },
          ],
        },
        {
          title: 'Group 4 - Customers and products',
          items: [
            {
              id: 'd36',
              title: 'Evidence for every "green" claim on labels and advertising',
              refs: '4.58',
              note: 'To avoid being seen as "greenwashing".',
            },
            {
              id: 'd37',
              title: 'Product quality control procedure',
              refs: '4.59',
              note: "Especially for children's products.",
            },
            {
              id: 'd38',
              title: 'Customer personal data protection policy',
              refs: '4.60',
              note: 'In line with Decree 13/2023/ND-CP.',
            },
          ],
        },
        {
          title: 'Group 5 - Data logs to record every month',
          items: [
            {
              id: 'd40',
              title: 'Electricity and fuel consumption log',
              refs: '1.18, 3.12',
              note: 'The basis for showing energy saving results.',
            },
            {
              id: 'd41',
              title: 'Water consumption log',
              refs: '1.19, 1.20',
              note: 'Divide by output to get water use per product.',
            },
            {
              id: 'd42',
              title: 'Waste volume log by type',
              refs: '1.16, 1.17',
              note: 'Match it with the transfer records.',
            },
            {
              id: 'd43',
              title: 'Employee data table by gender and management level',
              refs: '1.8, 1.9, 1.11',
              note: 'Update at the end of each year.',
            },
          ],
        },
      ],
    },
    glossary: {
      title: 'Glossary',
      entries: [
        {
          term: 'Ready',
          definition: 'The business has all (applicable) mandatory items in place in an area.',
        },
        {
          term: 'Almost ready',
          definition:
            'The business has 80% or more of the mandatory items in an area, but not all of them. The 80% threshold can be adjusted on the Readiness results page.',
        },
        {
          term: 'Not ready',
          definition: 'The business has less than 80% of the mandatory items in an area.',
        },
        {
          term: 'Mandatory',
          definition:
            'Items tied to Vietnamese legal requirements. They correspond to the core indicators (C - Core) in the CSI index.',
        },
        {
          term: 'Advanced',
          definition:
            'Extra items the business does to reduce risk and gain an edge. They correspond to the advanced indicators (A - Advance) in the CSI index.',
        },
        {
          term: 'Needs fixing',
          definition:
            'An answer showing a compliance problem that must be dealt with right away - for example, not paying insurance for 100% of the employees who are required to be covered.',
        },
        {
          term: 'Worth a look',
          definition:
            'The business has the data, but the figure deserves a closer look - for example, there were workplace accidents, or the business is making a loss. It does not lower the readiness level.',
        },
        {
          term: 'ESG',
          definition:
            'Environmental - Social - Governance: three groups of factors used to assess how sustainable a business is.',
        },
        {
          term: 'CSI',
          definition:
            'The Corporate Sustainability Index issued by VCCI and VBCSD, used to assess and recognize sustainable businesses in Vietnam. This tool is built on CSI 2026.',
        },
        {
          term: 'ROE, ROA, ROS',
          definition:
            "Three profitability ratios: profit after tax divided by owner's equity (ROE), by total assets (ROA), and by revenue (ROS). The business's accountant can quickly calculate them from the financial statements.",
        },
        {
          term: 'Environmental permit, environmental registration',
          definition:
            'Two types of environmental procedures under the Law on Environmental Protection 2020. Which one the business needs depends on its business group by environmental criteria.',
        },
        {
          term: 'Hazardous waste',
          definition:
            'Waste that can harm health and the environment: used oil, oily rags, fluorescent bulbs, batteries, chemicals, chemical containers... It must be stored separately and handed over to a licensed handler.',
        },
        {
          term: 'EPR',
          definition:
            'Extended producer responsibility: producers and importers of certain products and packaging must recycle them or contribute financially to their recycling.',
        },
        {
          term: 'Workplace environment monitoring',
          definition:
            'Measuring harmful factors at the workplace such as dust, noise, vibration, light, temperature and toxic gases.',
        },
        {
          term: 'Internal labor regulations',
          definition:
            'The document setting out labor discipline at the business. Businesses with 10 or more employees must have written regulations and register them with the labor management authority.',
        },
        {
          term: 'Grassroots democracy regulation',
          definition:
            'The document setting out what employees have the right to know, discuss, decide and check at the workplace.',
        },
        {
          term: 'Collective labor agreement',
          definition:
            'A written agreement between the collective of employees and the business, with terms more favorable to employees than those required by law.',
        },
        {
          term: 'Greenwashing',
          definition:
            'Making claims about the environmental benefits of a product or business without evidence, misleading customers.',
        },
      ],
    },
    about: {
      title: 'About this tool',
      sections: [
        {
          title: 'How the tool is built',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Foundation',
                  text: 'The CSI 2026 Corporate Sustainability Index, the version for small and micro enterprises, issued by the Vietnam Chamber of Commerce and Industry (VCCI) and the Vietnam Business Council for Sustainable Development (VBCSD). The index has 105 indicators: 86 core indicators and 19 advanced indicators.',
                },
                {
                  label: 'Coverage',
                  text: 'All 105 CSI indicators are in the tool, each as one question. The indicator code and the original CSI wording are in the two collapsed columns at the end of each question page - click the "+" sign above the column to open them.',
                },
                {
                  label: 'How it differs from the CSI index',
                  text: 'CSI is a set of criteria for scoring and ranking businesses. This tool uses the same content for a different purpose: helping businesses self-assess their readiness and see their gaps. That is why the tool has no scoring scale, the questions are rewritten in everyday language, and quantitative indicators are turned into range choices.',
                },
                {
                  label: 'This is not a CSI submission',
                  text: "The tool's result is an internal self-assessment, not an application file and not an assessment result of the CSI Program. The official submission is made online at vbcsd.vn using the Organizing Committee's forms and deadlines.",
                },
              ],
            },
          ],
        },
        {
          title: 'How the readiness level is determined',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'For each area',
                  text: 'Only applicable mandatory items are counted (questions marked "Not applicable" are skipped). READY when all are in place. ALMOST READY when 80% or more are in place. NOT READY when below 80%. The 80% threshold is proposed by Dear Our Community and can be adjusted on the Readiness results page.',
                },
                {
                  label: 'For the whole business',
                  text: 'Take the lowest level among the four areas. A business is only truly ready when every area is ready - one weak area is enough to create risk with customers, banks or regulators.',
                },
                {
                  label: 'Advanced items',
                  text: 'Counted and shown separately as added value, and do not affect the readiness level.',
                },
                {
                  label: 'Why it relies on mandatory items',
                  text: 'The CSI index requires businesses to complete all core indicators that fit their circumstances. This is the clearest and most objective standard for deciding whether a business is ready.',
                },
              ],
            },
          ],
        },
        {
          title: 'Figure questions',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Choose by range',
                  text: 'For the 22 figure questions, the business picks a range instead of entering a number. Choosing "No data yet" counts as missing.',
                },
                {
                  label: 'Needs fixing',
                  text: 'Some ranges show a compliance problem: a compulsory insurance contribution rate below 100%, solid waste not fully handed over to a licensed handler, wastewater not fully treated to standard. These choices count as missing and are moved to the top of the priority list.',
                },
                {
                  label: 'Worth a look',
                  text: 'Some ranges show the business has the data but the figure deserves a closer look: operating at a loss, a negative profit margin, average income below VND 5 million, a male - female income gap above 20%, workplace accidents having occurred. These choices do not lower the readiness level.',
                },
                {
                  label: 'Revenue ranges',
                  text: 'The thresholds of VND 3, 10, 50 and 100 billion are chosen according to the enterprise classification criteria in Decree 80/2021/ND-CP.',
                },
              ],
            },
          ],
        },
        {
          title: 'Authorship and scope of responsibility',
          blocks: [
            {
              kind: 'pairs',
              rows: [
                {
                  label: 'Authorship',
                  text: 'Dear Our Community - ESG Knowledge Hub and ESG Practice Community.',
                },
                {
                  label: 'Scope of responsibility',
                  text: 'The tool supports businesses in self-assessment and planning and is not legal advice. Businesses should check against current legal documents and consult experts when needed.',
                },
                {
                  label: 'Updates',
                  text: 'The CSI index is updated by VCCI every year. The tool will be reviewed when a new CSI version is released.',
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
