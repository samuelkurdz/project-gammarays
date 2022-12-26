import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PersonService } from 'src/rest/person/person.service';
import { comparePassword } from 'src/global/utils';
import { ILoggedInUser } from 'src/global';
import { Person, PersonDocument } from 'src/rest/person/person.schema';

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

  isTokenValid(token: string) {
    return this._jwtService.verifyAsync<ILoggedInUser>(token);
  }

  async login(person: PersonDocument) {
    const { _id, email, isWorker, company, apps } = person;
    const payload: ILoggedInUser = {
      _id: _id.toString(),
      apps,
      email,
      company: company.toString(),
      isWorker,
    };
    return {
      access_token: this._jwtService.sign(payload),
    };
  }
}
