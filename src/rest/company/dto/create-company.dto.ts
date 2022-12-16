export class CreateCompanyDto {
  companyName: string;
  category: 'education' | 'industrial' | 'community';
  logo?: string;
  officialEmail: string;
  passwordHash: string;
  shortDestription?: string;
}
