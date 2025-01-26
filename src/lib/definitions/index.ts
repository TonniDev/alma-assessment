import { ECountry, EStatus, EVisa } from '@prisma/client';

export interface Leads {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  countryOfCitizenship: ECountry;
  linkedinUrl: string;
  visaType: EVisa[];
  description: string;
  resumeUrl: string;
  status: EStatus;
  created: string;
}
