import { request } from '@playwright/test';
import fs from 'fs';
import { USERNAME, PASSWORD } from './helpers/dotenv-loader';

export default async function globalSetup() {
  const api = await request.newContext({
    baseURL: process.env.API_BASE_URL
  });

  const res = await api.post('/auth/login', {
    data: {
      username: USERNAME,
      password: PASSWORD
    }
  });

  if (!res.ok()) {
    throw new Error(`Login failed: ${res.status()} ${res.statusText()}`);
  }

  const body = await res.json();
  const token = body.token;

  if (!token) {
    throw new Error('Token not found in login response');
  }

  fs.writeFileSync(
    'auth.json',
    JSON.stringify({ token }, null, 2)
  );
}