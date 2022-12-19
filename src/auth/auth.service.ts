import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CompanyService } from 'src/rest/company/company.service';
import { comparePassword } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private _companyService: CompanyService,
    private _jwtService: JwtService,
  ) {}

  async validateCompany(email: string, companyPassword: string): Promise<any> {
    const company = await this._companyService.findByEmail(email);
    const isMatch = await comparePassword(companyPassword, company.password);
    if (!isMatch) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = company;
    return result;
  }

  async login(user: any) {
    const { officialEmail, _id } = user;
    const payload = { email: officialEmail, sub: _id };
    return {
      access_token: this._jwtService.sign(payload),
    };
  }
}
