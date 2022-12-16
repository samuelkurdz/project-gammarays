export type CreateCompanyDto = {
  companyName: string;
  category: 'education' | 'industrial' | 'community';
  logo?: string;
  officialEmail: string;
  shortDestription?: string;
};
