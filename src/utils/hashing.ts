import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export function hashPassword(password: string) {
  return bcrypt.hash(password, saltOrRounds);
}

export async function comparePassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}
