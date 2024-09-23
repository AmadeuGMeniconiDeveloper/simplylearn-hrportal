import { generateAuthToken } from './utils/authTokenGenerator';
import { User } from './@types';

const userExample: User = {
  id: '1',
  email: 'email@example.com',
  password: '123',
  role: 'admin',
};

export async function getUser() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const authToken = generateAuthToken();

  return [200, { authToken, user: userExample }] as const;
}

export async function login(email: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (email !== userExample.email || password !== userExample.password) {
    throw new Error('Unauthorized');
  }

  const authToken = generateAuthToken();

  return [200, { authToken, user: userExample }] as const;
}
