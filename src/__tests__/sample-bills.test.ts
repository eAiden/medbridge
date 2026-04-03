import { describe, it, expect } from 'vitest';
import { sampleBills, getBillById } from '@/lib/sample-bills';

describe('sample-bills', () => {
  // Test 1: Valid ID returns bill
  it('getBillById returns a bill for a valid ID', () => {
    const bill = getBillById('bill-001');
    expect(bill).toBeDefined();
    expect(bill!.patientName).toBe('Maria Santos');
    expect(bill!.hospitalName).toBe('Philippine General Hospital');
  });

  // Test 2: Invalid ID returns undefined
  it('getBillById returns undefined for an invalid ID', () => {
    const bill = getBillById('nonexistent');
    expect(bill).toBeUndefined();
  });

  // Test 3: Demo data math — sources + crowdfunding = totalBill
  it('funding sources + crowdfunding sums exactly to totalBill', () => {
    for (const bill of sampleBills) {
      const governmentTotal = bill.fundingSources.reduce(
        (sum, src) => sum + src.approvedAmount,
        0
      );
      const crowdfundingTotal = bill.crowdfunding.raised;
      const totalCovered = governmentTotal + crowdfundingTotal;

      expect(totalCovered).toBe(bill.totalBill);
    }
  });

  // Test 4: Line items sum to totalBill
  it('line items sum to totalBill', () => {
    for (const bill of sampleBills) {
      const lineItemTotal = bill.lineItems.reduce(
        (sum, item) => sum + item.amount,
        0
      );
      expect(lineItemTotal).toBe(bill.totalBill);
    }
  });

  // Test 5: All funding sources have valid statuses
  it('all funding sources have valid status values', () => {
    const validStatuses = ['pending', 'approved', 'denied', 'partial'];
    for (const bill of sampleBills) {
      for (const source of bill.fundingSources) {
        expect(validStatuses).toContain(source.status);
      }
    }
  });
});
