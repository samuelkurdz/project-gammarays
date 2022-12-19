export class CreateCompanyDto {
  companyName: string;
  category: 'education' | 'industrial' | 'community';
  logo?: string;
  officialEmail: string;
  password: string;
  shortDestription?: string;
}
