export type ServiceItem = {
  id: string;
  category: 'software' | 'cloud' | 'ai' | 'infrastructure';
  categoryLabel: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  features: string[];
  techBadges: string[];
  recommendedFor: string;
};

export type CloudNode = {
  id: string;
  name: string;
  serviceType: string;
  iconName: string;
  category: 'compute' | 'database' | 'storage' | 'network' | 'security';
  description: string;
  metrics: string;
  status: 'Operational' | 'High Availability' | 'Encrypted';
  details: string[];
};

export type MethodologyStep = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: string;
  phaseCode: string;
};

export type AcademicFeature = {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  highlights: string[];
  statsNumber: string;
  statsLabel: string;
  icon: string;
  demoType: 'simulator' | 'tracking' | 'concurrency';
};

export type LegalData = {
  companyName: string;
  nit: string;
  mercantileRegistration: string;
  chamberOfCommerce: string;
  legalRep: string;
  ciiuCodes: {
    code: string;
    description: string;
  }[];
  niifCategory: string;
  address: string;
  city: string;
  department: string;
  country: string;
  institutionalEmail: string;
  whatsapp1: string;
  whatsapp2: string;
  phone1Display: string;
  phone2Display: string;
};

export type ContactFormData = {
  fullName: string;
  email: string;
  institutionOrCompany: string;
  requestType: string;
  message: string;
};
