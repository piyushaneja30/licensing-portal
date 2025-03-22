interface LicenseType {
  id: string;
  name: string;
  description: string;
  fee: number;
  code?: string;
  requirements?: string[];
  processingTime?: string;
  validityPeriod?: string;
  renewalPeriod?: string;
}

export const LICENSE_TYPES: { [key: string]: LicenseType } = {
  'PE001': {
    id: 'PE001',
    code: 'PE',
    name: 'Professional Engineer',
    description: 'Full professional engineering license',
    requirements: [
      'Valid Engineer Intern certification',
      '4 years of progressive engineering experience',
      'Passing score on the Professional Engineering (PE) exam',
      'Five professional references'
    ],
    fee: 350,
    processingTime: '6-8 weeks',
    validityPeriod: '24 months',
    renewalPeriod: '24 months'
  },
  'EI001': {
    id: 'EI001',
    code: 'EI',
    name: 'Engineer Intern',
    description: 'Entry-level engineering certification for recent graduates',
    requirements: [
      'Bachelor\'s degree in Engineering from an ABET-accredited program',
      'Passing score on the Fundamentals of Engineering (FE) exam',
      'Clean criminal record',
      'Three professional references'
    ],
    fee: 150,
    processingTime: '4-6 weeks',
    validityPeriod: '48 months',
    renewalPeriod: '48 months'
  }
};

export const ALL_LICENSE_TYPES: LicenseType[] = [
  {
    id: 'ACUP001',
    name: 'Acupuncturist',
    description: 'License to practice acupuncture',
    fee: 250,
    requirements: [
      'Master\'s degree in Acupuncture',
      'Passing score on NCCAOM exam',
      'Clean criminal record',
      'CPR certification'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'AMSW001',
    name: 'Advanced Macro Social Worker',
    description: 'Advanced license for macro social work practice',
    fee: 200,
    requirements: [
      'Master\'s degree in Social Work',
      '3000 hours of supervised experience',
      'Passing score on ASWB exam',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'AFIE001',
    name: 'Agency Fire Investigator Employee',
    description: 'License for agency fire investigation',
    fee: 150,
    requirements: [
      'High school diploma or equivalent',
      'Fire investigation training certification',
      'Background check',
      'Physical fitness evaluation'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'AIE001',
    name: 'Agency Investigator Employee',
    description: 'License for agency investigation',
    fee: 150,
    requirements: [
      'High school diploma or equivalent',
      'Investigation training certification',
      'Background check',
      'Professional liability insurance'
    ]
  },
  {
    id: 'AA001',
    name: 'Anesthesiologist Assistant',
    description: 'License to assist in anesthesiology',
    fee: 300,
    requirements: [
      'Master\'s degree in Anesthesia',
      'Certification from NCCAA',
      'BLS and ACLS certification',
      'Background check'
    ]
  },
  {
    id: 'AAT001',
    name: 'Anesthesiologist Assistant Temp',
    description: 'Temporary license for anesthesiologist assistants',
    fee: 200
  },
  {
    id: 'AMC001',
    name: 'Appraisal Management Company',
    description: 'License for appraisal management',
    fee: 500
  },
  {
    id: 'APP001',
    name: 'Apprenticeship',
    description: 'General apprenticeship license',
    fee: 100
  },
  {
    id: 'ARCH001',
    name: 'Architect',
    description: 'License to practice architecture',
    fee: 350
  },
  {
    id: 'ARCHC001',
    name: 'Architectural Corporation',
    description: 'License for architectural firms',
    fee: 500
  },
  {
    id: 'ABA001',
    name: 'Assistant Behavior Analyst',
    description: 'License for assistant behavior analysis practice',
    fee: 200
  },
  {
    id: 'AP001',
    name: 'Assistant Physician',
    description: 'License for assistant physician practice',
    fee: 300
  },
  {
    id: 'ATHAG001',
    name: 'Athlete Agent',
    description: 'License for representing professional athletes',
    fee: 250
  },
  {
    id: 'AT001',
    name: 'Athletic Trainer',
    description: 'License for athletic training practice',
    fee: 200
  },
  {
    id: 'ATHPHY001',
    name: 'Athletic-Physician',
    description: 'License for sports medicine practice',
    fee: 300
  },
  {
    id: 'ATHTK001',
    name: 'Athletic-Timekeeper',
    description: 'License for athletic event timekeeping',
    fee: 150
  },
  {
    id: 'AUD001',
    name: 'Audiologist',
    description: 'License to practice audiology',
    fee: 300,
    requirements: [
      'Doctoral degree in Audiology (Au.D.)',
      'Passing score on Praxis exam',
      'Clinical fellowship completion',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'AUDA001',
    name: 'Audiologist Aide',
    description: 'License to assist licensed audiologists',
    fee: 150,
    requirements: [
      'High school diploma or equivalent',
      'Completion of approved training program',
      'Supervision agreement with licensed audiologist',
      'Background check'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'AUDP001',
    name: 'Audiologist Provisional',
    description: 'Provisional license for audiologists completing clinical fellowship',
    fee: 200,
    requirements: [
      'Doctoral degree in Audiology (Au.D.)',
      'Supervision agreement with licensed audiologist',
      'Background check'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'ADT001',
    name: 'Auricular Detox Technician',
    description: 'License to perform auricular detox treatments',
    fee: 150,
    requirements: [
      'Completion of approved training program',
      'CPR certification',
      'Background check',
      'Supervision agreement'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'BSW001',
    name: 'Baccalaureate Social Worker',
    description: 'License for entry-level social work practice',
    fee: 200,
    requirements: [
      'Bachelor\'s degree in Social Work',
      'Passing score on ASWB Bachelor\'s exam',
      'Background check',
      'Professional references'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'BARB001',
    name: 'Barber',
    description: 'License to practice barbering',
    fee: 150,
    requirements: [
      'Completion of approved barber program',
      'Passing score on practical and written exams',
      'Background check',
      'High school diploma or equivalent'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'BARBA001',
    name: 'Barber Apprentice',
    description: 'Apprentice license for barber training',
    fee: 75,
    requirements: [
      'Age 16 or older',
      'Enrollment in approved apprenticeship program',
      'Supervision agreement',
      'Background check'
    ],
    processingTime: '1-2 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'BARBE001',
    name: 'Barber Establishment',
    description: 'License to operate a barber shop',
    fee: 300,
    requirements: [
      'Licensed barber as manager',
      'Facility inspection',
      'Business registration',
      'Insurance coverage'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'BARBI001',
    name: 'Barber Instructor',
    description: 'License to teach barbering',
    fee: 200,
    requirements: [
      'Valid barber license for 3+ years',
      'Completion of instructor program',
      'Passing score on instructor exam',
      'Teaching experience'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'BARBS001',
    name: 'Barber Student',
    description: 'Student permit for barber training',
    fee: 50,
    requirements: [
      'Age 16 or older',
      'Enrollment in approved barber school',
      'High school enrollment or equivalent',
      'Background check'
    ],
    processingTime: '1-2 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'BABE001',
    name: 'Beauty/Barber Establishment',
    description: 'License to operate combined beauty and barber shop',
    fee: 400,
    requirements: [
      'Licensed professionals as managers',
      'Facility inspection',
      'Business registration',
      'Insurance coverage',
      'Separate work areas'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'BA001',
    name: 'Behavior Analyst',
    description: 'License to practice behavior analysis',
    fee: 300,
    requirements: [
      'Master\'s degree in behavior analysis or related field',
      'BCBA certification',
      'Supervised experience',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'BP001',
    name: 'Body Piercer',
    description: 'License to perform body piercing',
    fee: 200,
    requirements: [
      'Age 18 or older',
      'Bloodborne pathogen training',
      'First aid certification',
      'Apprenticeship completion',
      'Background check'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'BPE001',
    name: 'Body Piercing Establishment',
    description: 'License to operate a body piercing establishment',
    fee: 300,
    requirements: [
      'Licensed body piercer as manager',
      'Facility inspection',
      'Sterilization procedures',
      'Insurance coverage',
      'Business registration'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'BFID001',
    name: 'Boxer\'s Federal Identification Card',
    description: 'Federal ID card for professional boxers',
    fee: 100,
    requirements: [
      'Age 18 or older',
      'Physical examination',
      'Eye examination',
      'Background check',
      'Professional bout history'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '48 months'
  },
  {
    id: 'BC001',
    name: 'Boxing Contestant',
    description: 'License to participate in professional boxing',
    fee: 150,
    requirements: [
      'Federal ID card',
      'Medical clearance',
      'Physical examination',
      'Background check'
    ],
    processingTime: '1-2 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'BJ001',
    name: 'Boxing Judge',
    description: 'License to judge professional boxing matches',
    fee: 200,
    requirements: [
      'Experience in boxing',
      'Certification from approved organization',
      'Background check',
      'Annual training'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'BM001',
    name: 'Boxing Matchmaker',
    description: 'License to arrange professional boxing matches',
    fee: 250,
    requirements: [
      'Experience in boxing industry',
      'Knowledge of regulations',
      'Background check',
      'Professional references'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'BP001',
    name: 'Boxing Promoter',
    description: 'License to promote and organize professional boxing events',
    fee: 500,
    requirements: [
      'Financial stability proof',
      'Event security plan',
      'Insurance coverage',
      'Background check',
      'Professional references'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'BR001',
    name: 'Boxing Referee',
    description: 'License to referee professional boxing matches',
    fee: 250,
    requirements: [
      'Experience in boxing',
      'Physical fitness evaluation',
      'Rules and regulations certification',
      'Annual medical examination',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'BS001',
    name: 'Boxing Second',
    description: 'License to work as a boxing corner person/second',
    fee: 100,
    requirements: [
      'First aid certification',
      'Corner person training',
      'Background check',
      'Professional references'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'BRA001',
    name: 'Brander',
    description: 'License to perform branding procedures',
    fee: 200,
    requirements: [
      'Age 18 or older',
      'Bloodborne pathogen training',
      'First aid certification',
      'Apprenticeship completion',
      'Background check'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'BRABP001',
    name: 'Brander and Body Piercer',
    description: 'Combined license for branding and body piercing',
    fee: 300,
    requirements: [
      'Age 18 or older',
      'Bloodborne pathogen training',
      'First aid certification',
      'Apprenticeship completion in both practices',
      'Background check',
      'Sterilization procedures training'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'BRBPE001',
    name: 'Branding & Body Piercing Establishment',
    description: 'License to operate a combined branding and body piercing establishment',
    fee: 400,
    requirements: [
      'Licensed practitioners as managers',
      'Facility inspection',
      'Sterilization procedures',
      'Insurance coverage',
      'Business registration',
      'Emergency protocols'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'BE001',
    name: 'Branding Establishment',
    description: 'License to operate a branding establishment',
    fee: 300,
    requirements: [
      'Licensed brander as manager',
      'Facility inspection',
      'Sterilization procedures',
      'Insurance coverage',
      'Business registration'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'BRO001',
    name: 'Broker',
    description: 'License to work as a real estate broker',
    fee: 400,
    requirements: [
      'Age 18 or older',
      'High school diploma or equivalent',
      'Real estate courses completion',
      'Passing score on broker exam',
      'Background check',
      '2 years experience as licensed salesperson'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'BA001',
    name: 'Broker Associate',
    description: 'License to work as an associate broker under a managing broker',
    fee: 300,
    requirements: [
      'Valid broker license',
      'Affiliation with licensed broker',
      'Professional liability insurance',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'BO001',
    name: 'Broker Officer',
    description: 'License for corporate real estate broker officers',
    fee: 350,
    requirements: [
      'Valid broker license',
      'Corporate officer status',
      'Professional liability insurance',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'BP001',
    name: 'Broker Partner',
    description: 'License for real estate broker partners',
    fee: 350,
    requirements: [
      'Valid broker license',
      'Partnership agreement',
      'Professional liability insurance',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'BS001',
    name: 'Broker Salesperson',
    description: 'License to work as a broker and salesperson',
    fee: 300,
    requirements: [
      'Valid broker license',
      'Sales experience',
      'Professional liability insurance',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CPA001',
    name: 'Certified Public Accountant(CPA)',
    description: 'License to practice public accounting',
    fee: 400,
    requirements: [
      'Bachelor\'s degree in Accounting',
      '150 credit hours of education',
      'Passing score on CPA exam',
      'Professional experience',
      'Ethics examination',
      'Background check'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CP001',
    name: 'Chiropractic Physician',
    description: 'License to practice chiropractic medicine',
    fee: 500,
    requirements: [
      'Doctor of Chiropractic degree',
      'Passing score on NBCE exams',
      'Clinical experience',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CPT001',
    name: 'Chiropractic Physician Temp',
    description: 'Temporary license for chiropractic physicians',
    fee: 300,
    requirements: [
      'Valid chiropractic license in another state',
      'Letter of good standing',
      'Professional liability insurance',
      'Background check'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '6 months'
  },
  {
    id: 'CAHM001',
    name: 'Class CA - Hairdressing and Manicuring',
    description: 'Combined license for hairdressing and manicuring',
    fee: 200,
    requirements: [
      'Completion of approved program',
      'Passing score on practical and written exams',
      'High school diploma or equivalent',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CHH001',
    name: 'Class CH - Hairdresser',
    description: 'License to practice hairdressing',
    fee: 150,
    requirements: [
      'Completion of hairdressing program',
      'Passing score on practical and written exams',
      'High school diploma or equivalent',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CE001',
    name: 'Class E - Estheticians',
    description: 'License to practice esthetics',
    fee: 150,
    requirements: [
      'Completion of esthetics program',
      'Passing score on practical and written exams',
      'High school diploma or equivalent',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CMO001',
    name: 'Class MO - Manicurist',
    description: 'License to practice manicuring',
    fee: 150,
    requirements: [
      'Completion of manicuring program',
      'Passing score on practical and written exams',
      'High school diploma or equivalent',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CSW001',
    name: 'Clinical Social Worker',
    description: 'License to practice clinical social work',
    fee: 300,
    requirements: [
      'Master\'s degree in Social Work',
      '3000 hours of supervised clinical experience',
      'Passing score on ASWB Clinical exam',
      'Background check',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CAS001',
    name: 'COSBAR Apprentice Supervisor',
    description: 'License to supervise cosmetology apprentices',
    fee: 200,
    requirements: [
      'Valid cosmetology license for 5+ years',
      'Completion of supervisor training',
      'Professional references',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CAB001',
    name: 'Cosmetologist/All-Barber',
    description: 'Combined license for cosmetology and barbering',
    fee: 250,
    requirements: [
      'Completion of both programs',
      'Passing scores on both exams',
      'High school diploma or equivalent',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CHB001',
    name: 'Cosmetologist/Hair-Barber',
    description: 'Combined license for hair styling and barbering',
    fee: 200,
    requirements: [
      'Completion of both programs',
      'Passing scores on both exams',
      'High school diploma or equivalent',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CA001',
    name: 'Cosmetology Apprentice',
    description: 'Apprentice license for cosmetology training',
    fee: 75,
    requirements: [
      'Age 16 or older',
      'Enrollment in apprenticeship program',
      'Supervision agreement',
      'Background check'
    ],
    processingTime: '1-2 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'CE001',
    name: 'Cosmetology Establishment',
    description: 'License to operate a cosmetology salon',
    fee: 300,
    requirements: [
      'Licensed cosmetologist as manager',
      'Facility inspection',
      'Business registration',
      'Insurance coverage'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CI001',
    name: 'Cosmetology Instructor',
    description: 'License to teach cosmetology',
    fee: 200,
    requirements: [
      'Valid cosmetology license for 3+ years',
      'Completion of instructor program',
      'Passing score on instructor exam',
      'Teaching experience'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CIT001',
    name: 'Cosmetology Instructor Trainee',
    description: 'Trainee permit for cosmetology instructors',
    fee: 100,
    requirements: [
      'Valid cosmetology license',
      'Enrollment in instructor program',
      'Supervision agreement',
      'Background check'
    ],
    processingTime: '1-2 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'CS001',
    name: 'Cosmetology Student',
    description: 'Student permit for cosmetology training',
    fee: 50,
    requirements: [
      'Age 16 or older',
      'Enrollment in cosmetology school',
      'High school enrollment or equivalent',
      'Background check'
    ],
    processingTime: '1-2 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CBI001',
    name: 'Cosmetology/Barber Instructor',
    description: 'License to teach both cosmetology and barbering',
    fee: 250,
    requirements: [
      'Valid licenses in both fields for 3+ years',
      'Completion of instructor programs',
      'Passing scores on instructor exams',
      'Teaching experience'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CPAP001',
    name: 'CPA Partnership',
    description: 'License for CPA partnership firms',
    fee: 500,
    requirements: [
      'All partners must be licensed CPAs',
      'Professional liability insurance',
      'Business registration',
      'Peer review compliance'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CPAPC001',
    name: 'CPA Prof. Corporation',
    description: 'License for CPA professional corporations',
    fee: 600,
    requirements: [
      'All shareholders must be licensed CPAs',
      'Professional liability insurance',
      'Corporate registration',
      'Peer review compliance',
      'Quality control procedures'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CPASP001',
    name: 'CPA Sole Proprietorship',
    description: 'License for CPA sole proprietorship',
    fee: 400,
    requirements: [
      'Valid CPA license',
      'Professional liability insurance',
      'Business registration',
      'Peer review compliance'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'CPACH001',
    name: 'CPA-Certificate Holder',
    description: 'Certificate for non-practicing CPAs',
    fee: 200,
    requirements: [
      'Passing score on CPA exam',
      'Educational requirements',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'DANP001',
    name: 'Dental Assistant Nitrous Permit',
    description: 'Permit to administer nitrous oxide',
    fee: 100,
    requirements: [
      'Valid dental assistant license',
      'Nitrous oxide training',
      'CPR certification',
      'Supervision agreement'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'DFP001',
    name: 'Dental Faculty Permit',
    description: 'Permit to teach dentistry',
    fee: 300,
    requirements: [
      'Dental degree',
      'Teaching appointment',
      'Professional references',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'DH001',
    name: 'Dental Hygienist',
    description: 'License to practice dental hygiene',
    fee: 200,
    requirements: [
      'Associate\'s degree in Dental Hygiene',
      'Passing score on national board exam',
      'Clinical examination',
      'CPR certification',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'DS001',
    name: 'Dental Specialist',
    description: 'License for dental specialties',
    fee: 400,
    requirements: [
      'Dental degree',
      'Specialty training completion',
      'Board certification',
      'Professional references',
      'Background check'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'DEN001',
    name: 'Dentist',
    description: 'License to practice dentistry',
    fee: 500,
    requirements: [
      'Dental degree',
      'Passing score on national board exams',
      'Clinical examination',
      'CPR certification',
      'Background check'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'DIET001',
    name: 'Dietitian',
    description: 'License to practice dietetics',
    fee: 200,
    requirements: [
      'Bachelor\'s degree in Nutrition',
      'Supervised practice program',
      'Passing score on CDR exam',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'DD001',
    name: 'Drug Distributor',
    description: 'License for drug distribution',
    fee: 1000,
    requirements: [
      'Facility requirements',
      'Security measures',
      'Quality control procedures',
      'DEA registration',
      'Background check'
    ],
    processingTime: '8-10 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'DDR001',
    name: 'Drug Distributor Registrant',
    description: 'Registration for drug distribution employees',
    fee: 150,
    requirements: [
      'Age 18 or older',
      'Drug distribution training',
      'Background check',
      'Employment verification'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'DO001',
    name: 'Drug Outsourcer',
    description: 'License for pharmaceutical outsourcing facilities',
    fee: 1200,
    requirements: [
      'FDA registration',
      'cGMP compliance',
      'Quality control procedures',
      'Facility inspection',
      'Background check'
    ],
    processingTime: '8-10 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'DSGAP001',
    name: 'DSGA Permit',
    description: 'Dangerous Substances General Authorization Permit',
    fee: 500,
    requirements: [
      'Safety protocols',
      'Storage facilities',
      'Emergency procedures',
      'Staff training program',
      'Background check'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'DSGAC001',
    name: 'DSGA Site Certificate',
    description: 'Site certification for dangerous substances',
    fee: 400,
    requirements: [
      'Site inspection',
      'Safety measures',
      'Emergency plans',
      'Staff training records'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'EFFP001',
    name: 'EF-Fixed Prosthodontics',
    description: 'License for fixed prosthodontics procedures',
    fee: 300,
    requirements: [
      'Dental degree',
      'Prosthodontics training',
      'Clinical experience',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'EFO001',
    name: 'EF-Orthodontics',
    description: 'License for orthodontic procedures',
    fee: 300,
    requirements: [
      'Dental degree',
      'Orthodontics training',
      'Clinical experience',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'EFRP001',
    name: 'EF-Removable Prosthodontics',
    description: 'License for removable prosthodontics',
    fee: 300,
    requirements: [
      'Dental degree',
      'Prosthodontics training',
      'Clinical experience',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'EFR1001',
    name: 'EF-Restorative I',
    description: 'License for basic restorative procedures',
    fee: 250,
    requirements: [
      'Dental degree',
      'Restorative training',
      'Clinical experience',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'EFR2001',
    name: 'EF-Restorative II',
    description: 'License for advanced restorative procedures',
    fee: 300,
    requirements: [
      'Dental degree',
      'Advanced restorative training',
      'Clinical experience',
      'Professional references',
      'EF-Restorative I completion'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'EE001',
    name: 'Electrical Employer',
    description: 'License for businesses employing electricians',
    fee: 300,
    requirements: [
      'Business registration',
      'Insurance coverage',
      'Safety program',
      'Employee training program',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'EMB001',
    name: 'Embalmer',
    description: 'License to practice embalming',
    fee: 250,
    requirements: [
      'Mortuary science degree',
      'Apprenticeship completion',
      'Passing score on national exam',
      'State law exam',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'EMBA001',
    name: 'Embalmer Apprentice',
    description: 'Apprentice license for embalming',
    fee: 100,
    requirements: [
      'Age 18 or older',
      'High school diploma',
      'Enrollment in mortuary science program',
      'Supervision agreement',
      'Background check'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'EMBP001',
    name: 'Embalmer Practicum',
    description: 'Practical training license for embalmers',
    fee: 150,
    requirements: [
      'Mortuary science degree',
      'Supervision agreement',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'EMSP001',
    name: 'EMS Permit',
    description: 'Emergency Medical Services permit',
    fee: 200,
    requirements: [
      'EMT certification',
      'CPR certification',
      'Physical examination',
      'Background check',
      'Drug screening'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'EMSS001',
    name: 'EMS Site Certificate',
    description: 'Certification for EMS facility',
    fee: 500,
    requirements: [
      'Facility inspection',
      'Equipment verification',
      'Staff certifications',
      'Protocols documentation',
      'Insurance coverage'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'ECC001',
    name: 'Endowed Care Cemetery',
    description: 'License for endowed care cemetery operation',
    fee: 600,
    requirements: [
      'Endowment fund establishment',
      'Financial stability proof',
      'Property documentation',
      'Business registration',
      'Insurance coverage'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'EI001',
    name: 'Engineer Intern',
    description: 'Certification for engineering interns',
    fee: 150,
    requirements: [
      'Engineering degree',
      'FE exam passing score',
      'Background check',
      'Professional references'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '48 months'
  },
  {
    id: 'EC001',
    name: 'Engineering Corporation',
    description: 'License for engineering firms',
    fee: 500,
    requirements: [
      'Licensed PE as responsible charge',
      'Corporate registration',
      'Professional liability insurance',
      'Quality control procedures'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'EX001',
    name: 'Exempt',
    description: 'Exempt status certification',
    fee: 100,
    requirements: [
      'Qualification documentation',
      'Exemption criteria met',
      'Background check',
      'Professional references'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'FQHC001',
    name: 'FQHC Registration',
    description: 'Registration for Federally Qualified Health Centers',
    fee: 800,
    requirements: [
      'Federal FQHC designation',
      'State health department approval',
      'Facility inspection',
      'Staff credentials verification',
      'Insurance coverage'
    ],
    processingTime: '8-10 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'FD001',
    name: 'Funeral Director',
    description: 'License to practice as a funeral director',
    fee: 300,
    requirements: [
      'Mortuary science degree',
      'Apprenticeship completion',
      'Passing score on national exam',
      'State law exam',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'FDA001',
    name: 'Funeral Director Apprentice',
    description: 'Apprentice license for funeral directors',
    fee: 100,
    requirements: [
      'Age 18 or older',
      'High school diploma',
      'Enrollment in mortuary science program',
      'Supervision agreement',
      'Background check'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'FDL001',
    name: 'Funeral Director Limited',
    description: 'Limited license for funeral directors',
    fee: 200,
    requirements: [
      'High school diploma',
      'Limited practice training',
      'State law exam',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'FE001',
    name: 'Funeral Establishment',
    description: 'License to operate a funeral establishment',
    fee: 500,
    requirements: [
      'Licensed funeral director as manager',
      'Facility inspection',
      'Equipment verification',
      'Business registration',
      'Insurance coverage'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'GEO001',
    name: 'Geologist',
    description: 'License to practice geology',
    fee: 300,
    requirements: [
      'Geology degree',
      'Professional experience',
      'Passing score on ASBOG exam',
      'Professional references',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'GEOT001',
    name: 'Geologist - Temporary',
    description: 'Temporary license for geologists',
    fee: 200,
    requirements: [
      'Valid geology license in another state',
      'Project documentation',
      'Professional references',
      'Background check'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '6 months'
  },
  {
    id: 'GRIT001',
    name: 'Geologist Registrant in Training',
    description: 'Registration for geology trainees',
    fee: 150,
    requirements: [
      'Geology degree',
      'Passing score on Fundamentals exam',
      'Supervision agreement',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '48 months'
  },
  {
    id: 'GEA001',
    name: 'Geology Exam Applicant',
    description: 'Application for geology examination',
    fee: 100,
    requirements: [
      'Geology degree',
      'Educational transcripts',
      'Application review',
      'Background check'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'HB001',
    name: 'Hair Braiding',
    description: 'License for hair braiding services',
    fee: 100,
    requirements: [
      'Completion of braiding program',
      'Safety and sanitation training',
      'Business operation training',
      'Background check'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'HIS001',
    name: 'Hearing Instrument Specialist',
    description: 'License to fit and dispense hearing instruments',
    fee: 250,
    requirements: [
      'High school diploma',
      'Completion of training program',
      'Practical examination',
      'Written examination',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'IVT001',
    name: 'Inactive Veterinarian',
    description: 'Inactive status for veterinarians',
    fee: 150,
    requirements: [
      'Previously active veterinary license',
      'Good standing verification',
      'Continuing education compliance',
      'Background check'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'IVTT001',
    name: 'Inactive Veterinary Technician',
    description: 'Inactive status for veterinary technicians',
    fee: 100,
    requirements: [
      'Previously active vet tech license',
      'Good standing verification',
      'Continuing education compliance',
      'Background check'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'ID001',
    name: 'Interior Designer',
    description: 'License to practice interior design',
    fee: 300,
    requirements: [
      'Interior design degree',
      'Professional experience',
      'NCIDQ examination',
      'Portfolio review',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'IP001',
    name: 'Intern Pharmacist',
    description: 'License for pharmacy interns',
    fee: 100,
    requirements: [
      'Enrollment in pharmacy program',
      'Supervision agreement',
      'Background check',
      'Drug screening'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'INT001',
    name: 'Interpreter',
    description: 'License for professional interpreters',
    fee: 200,
    requirements: [
      'Language proficiency certification',
      'Ethics examination',
      'Professional experience',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'INTT001',
    name: 'Interpreter - Temporary',
    description: 'Temporary interpreter license',
    fee: 100,
    requirements: [
      'Language proficiency verification',
      'Temporary need documentation',
      'Background check'
    ],
    processingTime: '1-2 weeks',
    validityPeriod: '6 months'
  },
  {
    id: 'LSC001',
    name: 'Land Surveying Corp',
    description: 'License for land surveying corporations',
    fee: 500,
    requirements: [
      'Licensed surveyor as responsible charge',
      'Corporate registration',
      'Professional liability insurance',
      'Quality control procedures'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'LSI001',
    name: 'Land Surveyor-Intern',
    description: 'Certification for surveying interns',
    fee: 150,
    requirements: [
      'Surveying degree or equivalent',
      'Fundamentals exam passing score',
      'Background check',
      'Professional references'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '48 months'
  },
  {
    id: 'LAC001',
    name: 'Landscape Architect Corp',
    description: 'License for landscape architecture firms',
    fee: 500,
    requirements: [
      'Licensed landscape architect as responsible charge',
      'Corporate registration',
      'Professional liability insurance',
      'Quality control procedures'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'LLC001',
    name: 'Limited Liability Company',
    description: 'License for professional LLC',
    fee: 400,
    requirements: [
      'Articles of organization',
      'Operating agreement',
      'Professional liability insurance',
      'Business registration',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'LLP001',
    name: 'Limited Liability Partner',
    description: 'License for professional LLP',
    fee: 400,
    requirements: [
      'Partnership agreement',
      'Professional liability insurance',
      'Business registration',
      'Partner credentials verification',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'MFT001',
    name: 'Marital & Family Therapist',
    description: 'License to practice marital and family therapy',
    fee: 300,
    requirements: [
      'Master\'s degree in MFT',
      'Supervised clinical experience',
      'Passing score on national exam',
      'Background check',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'MAAC001',
    name: 'Martial Arts Amateur Contestant',
    description: 'License for amateur martial arts competition',
    fee: 75,
    requirements: [
      'Age verification',
      'Physical examination',
      'Training verification',
      'Amateur status confirmation',
      'Background check'
    ],
    processingTime: '1-2 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'MAAP001',
    name: 'Martial Arts Amateur Promoter',
    description: 'License to promote amateur martial arts events',
    fee: 300,
    requirements: [
      'Event safety plan',
      'Insurance coverage',
      'Financial stability proof',
      'Background check',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'MAC001',
    name: 'Martial Arts Contestant',
    description: 'License for professional martial arts competition',
    fee: 150,
    requirements: [
      'Age verification',
      'Physical examination',
      'Professional record verification',
      'Medical clearance',
      'Background check'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'MAJ001',
    name: 'Martial Arts Judge',
    description: 'License to judge martial arts competitions',
    fee: 200,
    requirements: [
      'Martial arts experience',
      'Judging certification',
      'Rules and regulations training',
      'Background check',
      'Professional references'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'MAM001',
    name: 'Martial Arts Matchmaker',
    description: 'License to arrange martial arts matches',
    fee: 250,
    requirements: [
      'Industry experience',
      'Knowledge of regulations',
      'Professional references',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'MAP001',
    name: 'Martial Arts Promoter',
    description: 'License to promote professional martial arts events',
    fee: 500,
    requirements: [
      'Financial stability proof',
      'Event security plan',
      'Insurance coverage',
      'Background check',
      'Professional references'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'MAR001',
    name: 'Martial Arts Referee',
    description: 'License to referee martial arts competitions',
    fee: 250,
    requirements: [
      'Martial arts experience',
      'Referee certification',
      'Physical fitness evaluation',
      'Rules and regulations training',
      'Background check'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'MAS001',
    name: 'Martial Arts Second',
    description: 'License to work as a martial arts corner person',
    fee: 100,
    requirements: [
      'First aid certification',
      'Corner person training',
      'Rules and regulations knowledge',
      'Background check'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'MT001',
    name: 'Massage Therapist',
    description: 'License to practice massage therapy',
    fee: 200,
    requirements: [
      'Completion of approved program',
      'Passing score on MBLEx',
      'CPR certification',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'MTB001',
    name: 'Massage Therapy Business',
    description: 'License to operate a massage therapy business',
    fee: 300,
    requirements: [
      'Licensed therapist as manager',
      'Facility inspection',
      'Business registration',
      'Insurance coverage',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'MTS001',
    name: 'Massage Therapy Student',
    description: 'Student permit for massage therapy training',
    fee: 50,
    requirements: [
      'Enrollment in approved program',
      'Age verification',
      'Background check',
      'Student liability insurance'
    ],
    processingTime: '1-2 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'MSW001',
    name: 'Master Social Worker',
    description: 'License for master level social work',
    fee: 250,
    requirements: [
      'Master\'s degree in Social Work',
      'Passing score on ASWB exam',
      'Supervised experience',
      'Background check',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'MPS001',
    name: 'Medical Physician/Surgeon (M.D.)',
    description: 'License to practice medicine',
    fee: 600,
    requirements: [
      'Medical degree (M.D.)',
      'Completion of residency',
      'USMLE passing scores',
      'Background check',
      'Professional references'
    ],
    processingTime: '8-10 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'MPSC001',
    name: 'Medical Physician/Surgeon (M.D.) Conditional',
    description: 'Conditional medical license',
    fee: 400,
    requirements: [
      'Medical degree (M.D.)',
      'Current training status',
      'Supervision agreement',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'MPSCN001',
    name: 'Medical Physician/Surgeon (M.D.) Contiguous',
    description: 'License for practice in contiguous states',
    fee: 500,
    requirements: [
      'Active medical license in contiguous state',
      'Good standing verification',
      'Background check',
      'Professional references'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'MPSL001',
    name: 'Medical Physician/Surgeon (M.D.) Limited',
    description: 'Limited medical practice license',
    fee: 300,
    requirements: [
      'Medical degree (M.D.)',
      'Scope of practice definition',
      'Supervision agreement',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'MPST001',
    name: 'Medical Physician/Surgeon (M.D.) Temp',
    description: 'Temporary medical license',
    fee: 300,
    requirements: [
      'Active medical license in another state',
      'Temporary practice justification',
      'Background check',
      'Professional references'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '6 months'
  },
  {
    id: 'MMAID001',
    name: 'MMA National Identification Card',
    description: 'National ID card for MMA fighters',
    fee: 100,
    requirements: [
      'Age verification',
      'Physical examination',
      'Professional record verification',
      'Background check',
      'Photo identification'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '48 months'
  },
  {
    id: 'NFPC001',
    name: 'NFP Corporation Permit',
    description: 'Permit for not-for-profit corporations',
    fee: 300,
    requirements: [
      'Articles of incorporation',
      'Board member list',
      'Financial statements',
      'Tax exemption status',
      'Background check'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'NECC001',
    name: 'Non Endowed Care Cemetery',
    description: 'License for non-endowed care cemetery operation',
    fee: 400,
    requirements: [
      'Property documentation',
      'Business registration',
      'Insurance coverage',
      'Operating procedures',
      'Background check'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'NUR001',
    name: 'Nursing',
    description: 'License to practice nursing',
    fee: 200,
    requirements: [
      'Nursing degree',
      'NCLEX passing score',
      'Background check',
      'CPR certification',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'OT001',
    name: 'Occupational Therapist',
    description: 'License to practice occupational therapy',
    fee: 250,
    requirements: [
      'Master\'s degree in OT',
      'NBCOT certification',
      'Fieldwork completion',
      'Background check',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'OTLP001',
    name: 'Occupational Therapist Limited Permit',
    description: 'Limited permit for occupational therapists',
    fee: 150,
    requirements: [
      'OT degree completion',
      'Supervision agreement',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'OTA001',
    name: 'Occupational Therapy Assistant',
    description: 'License to work as an OT assistant',
    fee: 150,
    requirements: [
      'OTA associate degree',
      'NBCOT certification',
      'Fieldwork completion',
      'Background check',
      'Professional references'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'OTALP001',
    name: 'Occupational Therapy Assistant Limited Permit',
    description: 'Limited permit for OT assistants',
    fee: 100,
    requirements: [
      'OTA program completion',
      'Supervision agreement',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'OPT001',
    name: 'Optometrist',
    description: 'License to practice optometry',
    fee: 400,
    requirements: [
      'Doctor of Optometry degree',
      'NBEO passing scores',
      'Clinical experience',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'OPS001',
    name: 'Osteo Physician/Surgeon (D.O.)',
    description: 'License to practice osteopathic medicine',
    fee: 600,
    requirements: [
      'D.O. degree',
      'COMLEX-USA passing scores',
      'Residency completion',
      'Background check',
      'Professional references'
    ],
    processingTime: '8-10 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'OPSC001',
    name: 'Osteo Physician/Surgeon (D.O.) Conditional',
    description: 'Conditional osteopathic medical license',
    fee: 400,
    requirements: [
      'D.O. degree',
      'Current training status',
      'Supervision agreement',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'OPSCN001',
    name: 'Osteo Physician/Surgeon (D.O.) Contiguous',
    description: 'License for practice in contiguous states',
    fee: 500,
    requirements: [
      'Active D.O. license in contiguous state',
      'Good standing verification',
      'Background check',
      'Professional references'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'OPSL001',
    name: 'Osteo Physician/Surgeon (D.O.) Limited',
    description: 'Limited osteopathic medical license',
    fee: 300,
    requirements: [
      'D.O. degree',
      'Scope of practice definition',
      'Supervision agreement',
      'Background check'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'OPST001',
    name: 'Osteo Physician/Surgeon (D.O.) Temp',
    description: 'Temporary osteopathic medical license',
    fee: 300,
    requirements: [
      'Active D.O. license in another state',
      'Temporary practice justification',
      'Background check',
      'Professional references'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '6 months'
  },
  {
    id: 'PEDSC001',
    name: 'PED Site Certificate',
    description: 'Site certification for prescription electronic data',
    fee: 400,
    requirements: [
      'System compliance verification',
      'Security protocols',
      'Staff training documentation',
      'Facility inspection'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'PEDMS001',
    name: 'PED-MS Permit',
    description: 'Permit for prescription electronic data management system',
    fee: 500,
    requirements: [
      'System validation',
      'Security measures',
      'Data backup procedures',
      'Staff training program',
      'Emergency protocols'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'PERF001',
    name: 'Perfusionist',
    description: 'License to practice as a perfusionist',
    fee: 300,
    requirements: [
      'Perfusion program completion',
      'ABCP certification',
      'Clinical experience',
      'Background check',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'PERFP001',
    name: 'Perfusionist Provisional',
    description: 'Provisional license for perfusionists',
    fee: 200,
    requirements: [
      'Perfusion program completion',
      'Supervision agreement',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'PHAR001',
    name: 'Pharmacist',
    description: 'License to practice pharmacy',
    fee: 400,
    requirements: [
      'Doctor of Pharmacy degree',
      'NAPLEX passing score',
      'MPJE passing score',
      'Internship completion',
      'Background check'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'PHARM001',
    name: 'Pharmacy',
    description: 'License to operate a pharmacy',
    fee: 800,
    requirements: [
      'Licensed pharmacist as manager',
      'Facility inspection',
      'Security measures',
      'DEA registration',
      'Insurance coverage'
    ],
    processingTime: '8-10 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'PTECH001',
    name: 'Pharmacy Technician',
    description: 'License to work as a pharmacy technician',
    fee: 100,
    requirements: [
      'High school diploma',
      'PTCB certification',
      'Training program completion',
      'Background check',
      'Drug screening'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'PT001',
    name: 'Physical Therapist',
    description: 'License to practice physical therapy',
    fee: 300,
    requirements: [
      'DPT degree',
      'NPTE passing score',
      'Clinical experience',
      'Background check',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'PTA001',
    name: 'Physical Therapist Assistant',
    description: 'License to work as a PT assistant',
    fee: 150,
    requirements: [
      'PTA associate degree',
      'NPTAE passing score',
      'Clinical experience',
      'Background check',
      'Professional references'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'PTAT001',
    name: 'Physical Therapist Assistant Temp',
    description: 'Temporary license for PT assistants',
    fee: 100,
    requirements: [
      'PTA program completion',
      'Supervision agreement',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '6 months'
  },
  {
    id: 'PTOT001',
    name: 'Physical Therapist One Year Temp',
    description: 'One-year temporary PT license',
    fee: 200,
    requirements: [
      'DPT degree',
      'Supervision agreement',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'PTT001',
    name: 'Physical Therapist Temp',
    description: 'Temporary physical therapist license',
    fee: 150,
    requirements: [
      'Active PT license in another state',
      'Good standing verification',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '6 months'
  },
  {
    id: 'PA001',
    name: 'Physician Assistant',
    description: 'License to practice as a physician assistant',
    fee: 300,
    requirements: [
      'PA program completion',
      'PANCE passing score',
      'Supervision agreement',
      'Background check',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'PAT001',
    name: 'Physician Assistant Temp',
    description: 'Temporary physician assistant license',
    fee: 200,
    requirements: [
      'PA program completion',
      'Supervision agreement',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '6 months'
  },
  {
    id: 'PMSP001',
    name: 'PMS Permit',
    description: 'Permit for practice management system',
    fee: 400,
    requirements: [
      'System validation',
      'Security measures',
      'Staff training program',
      'Data management procedures'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'PMSSC001',
    name: 'PMS Site Certificate',
    description: 'Site certification for practice management system',
    fee: 300,
    requirements: [
      'System compliance verification',
      'Security protocols',
      'Staff training documentation',
      'Facility inspection'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'POD001',
    name: 'Podiatrist',
    description: 'License to practice podiatric medicine',
    fee: 400,
    requirements: [
      'DPM degree',
      'APMLE passing scores',
      'Residency completion',
      'Background check',
      'Professional references'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'PODT001',
    name: 'Podiatrist Temp',
    description: 'Temporary podiatrist license',
    fee: 250,
    requirements: [
      'Active podiatrist license in another state',
      'Good standing verification',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '6 months'
  },
  {
    id: 'PRACT001',
    name: 'Practice Agreement',
    description: 'Agreement for supervised practice',
    fee: 150,
    requirements: [
      'Supervisor qualification verification',
      'Practice location details',
      'Scope of practice definition',
      'Emergency protocols'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'PRACT002',
    name: 'Practice Agreement - Additional',
    description: 'Additional practice agreement for multiple locations',
    fee: 100,
    requirements: [
      'Existing practice agreement',
      'Additional location details',
      'Supervisor availability confirmation',
      'Updated emergency protocols'
    ],
    processingTime: '1-2 weeks',
    validityPeriod: '12 months'
  },
  {
    id: 'PRACT003',
    name: 'Practice Agreement - Temp',
    description: 'Temporary practice agreement',
    fee: 100,
    requirements: [
      'Temporary supervisor qualification',
      'Practice location details',
      'Limited scope definition',
      'Duration justification'
    ],
    processingTime: '1-2 weeks',
    validityPeriod: '3 months'
  },
  {
    id: 'PSYC001',
    name: 'Psychologist',
    description: 'License to practice psychology',
    fee: 400,
    requirements: [
      'Doctoral degree in psychology',
      'EPPP passing score',
      'Supervised experience',
      'Background check',
      'Professional references'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'PSYCT001',
    name: 'Psychologist Temp',
    description: 'Temporary psychologist license',
    fee: 250,
    requirements: [
      'Active psychology license in another state',
      'Good standing verification',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '6 months'
  },
  {
    id: 'RAD001',
    name: 'Radiologic Technologist',
    description: 'License to perform radiologic procedures',
    fee: 200,
    requirements: [
      'Radiologic technology program completion',
      'ARRT certification',
      'Clinical experience',
      'Background check',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'RADT001',
    name: 'Radiologic Technologist Temp',
    description: 'Temporary radiologic technologist license',
    fee: 150,
    requirements: [
      'Program completion verification',
      'Supervision agreement',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '6 months'
  },
  {
    id: 'RCP001',
    name: 'Respiratory Care Practitioner',
    description: 'License to practice respiratory care',
    fee: 250,
    requirements: [
      'Respiratory care program completion',
      'NBRC certification',
      'Clinical experience',
      'Background check',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'RCPT001',
    name: 'Respiratory Care Practitioner Temp',
    description: 'Temporary respiratory care practitioner license',
    fee: 150,
    requirements: [
      'Program completion verification',
      'Supervision agreement',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '6 months'
  },
  {
    id: 'SLPA001',
    name: 'Speech Language Pathology Assistant',
    description: 'License to work as a speech language pathology assistant',
    fee: 150,
    requirements: [
      'Associate degree in SLPA',
      'Clinical observation hours',
      'Background check',
      'Professional references'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'SLP001',
    name: 'Speech Language Pathologist',
    description: 'License to practice speech language pathology',
    fee: 300,
    requirements: [
      'Master\'s degree in SLP',
      'Praxis exam passing score',
      'Clinical fellowship completion',
      'Background check',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'SLPT001',
    name: 'Speech Language Pathologist Temp',
    description: 'Temporary speech language pathologist license',
    fee: 200,
    requirements: [
      'Master\'s degree in SLP',
      'Supervision agreement',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '6 months'
  },
  {
    id: 'SURV001',
    name: 'Surveyor',
    description: 'License to practice land surveying',
    fee: 300,
    requirements: [
      'Bachelor\'s degree in surveying or related field',
      'FS and PS exam passing scores',
      'Experience verification',
      'Background check',
      'Professional references'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'SURVT001',
    name: 'Surveyor Temp',
    description: 'Temporary surveyor license',
    fee: 200,
    requirements: [
      'Active surveyor license in another state',
      'Good standing verification',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '6 months'
  },
  {
    id: 'TATT001',
    name: 'Tattoo Artist',
    description: 'License to practice tattooing',
    fee: 200,
    requirements: [
      'Apprenticeship completion',
      'Blood-borne pathogen certification',
      'First aid certification',
      'Background check',
      'Portfolio review'
    ],
    processingTime: '3-4 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'TATTS001',
    name: 'Tattoo Studio',
    description: 'License to operate a tattoo studio',
    fee: 400,
    requirements: [
      'Facility inspection',
      'Sterilization procedures',
      'Safety protocols',
      'Insurance coverage',
      'Business registration'
    ],
    processingTime: '4-6 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'VET001',
    name: 'Veterinarian',
    description: 'License to practice veterinary medicine',
    fee: 400,
    requirements: [
      'DVM degree',
      'NAVLE passing score',
      'State board exam passing score',
      'Background check',
      'Professional references'
    ],
    processingTime: '6-8 weeks',
    validityPeriod: '24 months'
  },
  {
    id: 'VETT001',
    name: 'Veterinarian Temp',
    description: 'Temporary veterinarian license',
    fee: 250,
    requirements: [
      'Active veterinary license in another state',
      'Good standing verification',
      'Background check',
      'Professional liability insurance'
    ],
    processingTime: '2-3 weeks',
    validityPeriod: '6 months'
  }
];

export const LICENSE_CATEGORIES = [
  'Healthcare',
  'Engineering',
  'Construction',
  'Real Estate',
  'Personal Services',
  'Business',
  'Sports & Entertainment',
  'Social Services',
  'Investigation & Security',
  'Other'
]; 