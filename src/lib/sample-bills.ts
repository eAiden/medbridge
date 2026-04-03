import type { TrackedBill } from '@/types';

export const sampleBills: TrackedBill[] = [
  {
    id: 'bill-001',
    patientName: 'Maria Santos',
    age: 45,
    diagnosis: 'Breast Cancer Stage III — chemotherapy and mastectomy',
    hospitalName: 'Philippine General Hospital',
    totalBill: 847200,
    lineItems: [
      { name: 'Surgery (Mastectomy)', amount: 320000 },
      { name: 'Chemotherapy (6 cycles)', amount: 280000 },
      { name: 'Room & Board (14 days)', amount: 98000 },
      { name: 'Laboratory & Diagnostics', amount: 67200 },
      { name: 'Medicines & Supplies', amount: 52000 },
      { name: 'Professional Fees', amount: 30000 },
    ],
    fundingSources: [
      {
        id: 'fs-philhealth',
        name: 'PhilHealth Case Rate',
        agency: 'PhilHealth',
        status: 'approved',
        requestedAmount: 120000,
        approvedAmount: 120000,
        dateSubmitted: '2026-03-15',
        dateResolved: '2026-03-16',
      },
      {
        id: 'fs-malasakit',
        name: 'Malasakit Center',
        agency: 'DOH / DSWD / PCSO / PhilHealth',
        status: 'approved',
        requestedAmount: 250000,
        approvedAmount: 250000,
        dateSubmitted: '2026-03-16',
        dateResolved: '2026-03-18',
      },
      {
        id: 'fs-pcso',
        name: 'PCSO Individual Medical Assistance',
        agency: 'PCSO',
        status: 'approved',
        requestedAmount: 100000,
        approvedAmount: 100000,
        dateSubmitted: '2026-03-18',
        dateResolved: '2026-03-20',
      },
      {
        id: 'fs-dswd',
        name: 'DSWD AICS',
        agency: 'DSWD',
        status: 'approved',
        requestedAmount: 50000,
        approvedAmount: 50000,
        dateSubmitted: '2026-03-20',
        dateResolved: '2026-03-23',
      },
    ],
    crowdfunding: {
      goal: 327200,
      raised: 327200,
      donorCount: 187,
    },
  },
];

export function getBillById(id: string): TrackedBill | undefined {
  return sampleBills.find((b) => b.id === id);
}
