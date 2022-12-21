import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PersonService } from 'src/app/person/person.service';
import { comparePassword } from 'src/global/utils';

@Injectable()
export class AuthService {
  constructor(
    private _personService: PersonService,
    private _jwtService: JwtService,
  ) {}

  async validatePerson(email: string, companyPassword: string): Promise<any> {
    const person = await this._personService.findByEmail(email);
    const isMatch = await comparePassword(companyPassword, person.password);
    if (!isMatch) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = person;
    return result;
  }

  validateAuthToken(token: string) {
    const { _id, email, isWorker, company, apps } = this._jwtService.decode(
      token,
      { json: true },
    ) as any;

    return { _id, email, isWorker };
  }

  async login(person: any) {
    const { _id, email, isWorker, company, apps } = person;
    const payload = { email, _id, isWorker, company, apps };
    return {
      access_token: this._jwtService.sign(payload),
    };
  }
}
