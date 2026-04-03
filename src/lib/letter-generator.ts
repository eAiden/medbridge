import { UserProfile, GovernmentProgram } from '@/types';

export function generateGuaranteeLetter(profile: UserProfile, program: GovernmentProgram): string {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const addressee = getAddressee(program);

  return `${dateStr}

${addressee}

Dear Sir/Madam,

I, ${profile.fullName}, ${profile.age} years old, a resident of ${profile.location.city}, ${profile.location.province}, ${profile.location.region}, respectfully request for medical/financial assistance for my hospitalization.

I am currently confined/seeking treatment at ${profile.hospitalName} due to ${profile.diagnosis}. My estimated hospital bill amounts to PHP ${profile.estimatedBill.toLocaleString('en-PH', { minimumFractionDigits: 2 })}.

${profile.hasPhilHealth ? 'I am a PhilHealth member' + (profile.philHealthCategory ? ` under the ${profile.philHealthCategory} category` : '') + ', however the PhilHealth coverage is not sufficient to cover my total hospital expenses.' : 'Unfortunately, I do not have PhilHealth coverage at this time.'}

My monthly household income is approximately PHP ${profile.monthlyIncome.toLocaleString('en-PH', { minimumFractionDigits: 2 })}, and I am currently ${formatEmploymentStatus(profile.employmentStatus)}. Due to my limited financial capacity, I am humbly requesting a guarantee letter or financial assistance to help cover my hospital expenses.

${profile.hasExistingCoverage && profile.existingCoverageAmount > 0 ? `I have already secured partial coverage amounting to PHP ${profile.existingCoverageAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })} from other sources, but a significant balance remains.` : ''}

I am attaching the following documents for your reference:
${program.requiredDocuments.map((doc) => `  - ${doc}`).join('\n')}

Your favorable action on this request will be deeply appreciated. Thank you for your compassion and public service.

Respectfully yours,

_________________________
${profile.fullName}
Contact: [Your Contact Number]
Address: ${profile.location.city}, ${profile.location.province}`;
}

function getAddressee(program: GovernmentProgram): string {
  switch (program.agency) {
    case 'Department of Social Welfare and Development':
      return `The Honorable Secretary\nDepartment of Social Welfare and Development\n${program.officeAddress}`;
    case 'Philippine Charity Sweepstakes Office':
      return `The General Manager\nPhilippine Charity Sweepstakes Office\n${program.officeAddress}`;
    case 'Department of Health':
      return `The Honorable Secretary\nDepartment of Health\n${program.officeAddress}`;
    case 'House of Representatives (District Office)':
      return `The Honorable Congressman/Congresswoman\n${program.officeAddress}`;
    case 'Philippine Senate':
      return `The Honorable Senator\n${program.officeAddress}`;
    case 'Local Government Unit':
      return `The Honorable Mayor\nCity/Municipal Social Welfare and Development Office\n${program.officeAddress}`;
    default:
      return `The Officer-in-Charge\n${program.agency}\n${program.officeAddress}`;
  }
}

function formatEmploymentStatus(status: string): string {
  switch (status) {
    case 'employed':
      return 'employed but with limited income';
    case 'self-employed':
      return 'self-employed with irregular income';
    case 'unemployed':
      return 'currently unemployed';
    case 'informal':
      return 'working in the informal sector with no stable income';
    case 'student':
      return 'a student with no independent source of income';
    case 'senior':
      return 'a senior citizen';
    default:
      return status;
  }
}
