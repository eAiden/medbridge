import { UserProfile, GovernmentProgram, MatchResult } from '@/types';
import { governmentPrograms } from './programs-data';

export function matchPrograms(profile: UserProfile): MatchResult[] {
  const results: MatchResult[] = [];

  for (const program of governmentPrograms) {
    const result = evaluateProgram(profile, program);
    if (result.matchScore > 0) {
      results.push(result);
    }
  }

  return results.sort((a, b) => {
    // Sort by score first, then by estimated coverage
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
    return b.estimatedCoverage - a.estimatedCoverage;
  });
}

function evaluateProgram(profile: UserProfile, program: GovernmentProgram): MatchResult {
  const criteria = program.eligibilityCriteria;
  let score = 0;
  const matchReasons: string[] = [];
  const warnings: string[] = [];
  let totalCriteria = 0;
  let metCriteria = 0;

  // Check PhilHealth requirement
  if (criteria.requiresPhilHealth !== undefined) {
    totalCriteria++;
    if (criteria.requiresPhilHealth && !profile.hasPhilHealth) {
      warnings.push('Requires active PhilHealth membership');
    } else if (criteria.requiresPhilHealth && profile.hasPhilHealth) {
      metCriteria++;
      matchReasons.push('Active PhilHealth member');
    } else {
      metCriteria++;
    }
  }

  // Check PhilHealth categories
  if (criteria.philHealthCategories && criteria.philHealthCategories.length > 0) {
    totalCriteria++;
    if (profile.philHealthCategory && criteria.philHealthCategories.includes(profile.philHealthCategory)) {
      metCriteria++;
      matchReasons.push(`PhilHealth category: ${profile.philHealthCategory}`);
    } else {
      warnings.push(`Preferred PhilHealth categories: ${criteria.philHealthCategories.join(', ')}`);
    }
  }

  // Check income
  if (criteria.maxIncome !== undefined) {
    totalCriteria++;
    if (profile.monthlyIncome <= criteria.maxIncome) {
      metCriteria++;
      matchReasons.push(`Income within limit (PHP ${criteria.maxIncome.toLocaleString()}/month)`);
    } else {
      warnings.push(`Income exceeds limit of PHP ${criteria.maxIncome.toLocaleString()}/month`);
    }
  }

  // Check employment status
  if (criteria.employmentStatuses && criteria.employmentStatuses.length > 0) {
    totalCriteria++;
    if (criteria.employmentStatuses.includes(profile.employmentStatus)) {
      metCriteria++;
      matchReasons.push(`Employment status qualifies: ${profile.employmentStatus}`);
    } else {
      warnings.push(`Preferred employment: ${criteria.employmentStatuses.join(', ')}`);
    }
  }

  // Check age
  if (criteria.minAge !== undefined) {
    totalCriteria++;
    if (profile.age >= criteria.minAge) {
      metCriteria++;
    } else {
      warnings.push(`Minimum age: ${criteria.minAge}`);
    }
  }
  if (criteria.maxAge !== undefined) {
    totalCriteria++;
    if (profile.age <= criteria.maxAge) {
      metCriteria++;
    } else {
      warnings.push(`Maximum age: ${criteria.maxAge}`);
    }
  }

  // Check condition types
  if (criteria.conditionTypes && criteria.conditionTypes.length > 0) {
    totalCriteria++;
    const diagnosisLower = profile.diagnosis.toLowerCase();
    const matched = criteria.conditionTypes.some((ct) => diagnosisLower.includes(ct.toLowerCase()));
    if (matched) {
      metCriteria++;
      matchReasons.push('Diagnosis covered by this program');
    } else {
      warnings.push('Diagnosis may not be covered — verify with the office');
    }
  }

  // Check regions
  if (criteria.regions && criteria.regions.length > 0) {
    totalCriteria++;
    if (criteria.regions.includes(profile.location.region)) {
      metCriteria++;
      matchReasons.push('Within service area');
    } else {
      warnings.push('May be outside service area');
    }
  }

  // Calculate score
  if (totalCriteria === 0) {
    // No specific criteria = open to all, base score
    score = 60;
    matchReasons.push('Open to all Filipino citizens');
  } else {
    score = Math.round((metCriteria / totalCriteria) * 100);
  }

  // Boost score for Malasakit centers (one-stop shop)
  if (program.id === 'malasakit-center' && score > 50) {
    score = Math.min(score + 10, 100);
    matchReasons.push('One-stop shop — processes multiple agencies at once');
  }

  // Estimate coverage
  const estimatedCoverage = calculateEstimatedCoverage(profile, program, score);

  // Determine missing documents
  const missingDocuments = program.requiredDocuments.filter((doc) => {
    if (doc.includes('PhilHealth') && !profile.hasPhilHealth) return true;
    if (doc.includes('Indigency') && profile.monthlyIncome > 15000) return true;
    return false;
  });

  return {
    program,
    matchScore: score,
    estimatedCoverage,
    missingDocuments,
    matchReasons,
    warnings,
  };
}

function calculateEstimatedCoverage(
  profile: UserProfile,
  program: GovernmentProgram,
  matchScore: number
): number {
  const bill = profile.estimatedBill;
  const maxCoverage = program.maxCoverage;

  if (program.coverageType === 'full') {
    return Math.min(bill, maxCoverage);
  }

  if (program.coverageType === 'case-rate') {
    // Case rates are fixed amounts per condition
    return Math.min(bill * 0.6, maxCoverage);
  }

  // Partial coverage — estimate based on match score and typical amounts
  const coverageRatio = (matchScore / 100) * 0.5;
  return Math.min(Math.round(bill * coverageRatio), maxCoverage);
}
