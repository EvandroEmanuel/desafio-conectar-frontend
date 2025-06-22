"use server"

import { cookies } from 'next/headers';
import { TOKEN_KEY } from '@/config';

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = cookies();
  return Promise.resolve((await cookieStore).get(TOKEN_KEY)?.value ?? null);
}

export async function setAuthToken(token: string): Promise<void> {
  const cookieStore = cookies();
  (await cookieStore).set(TOKEN_KEY, token, {
    httpOnly: false,
    path: '/'
  });
}

export async function removeAuthToken(): Promise<void> {
  const cookieStore = cookies();
  (await cookieStore).delete(TOKEN_KEY);
} 