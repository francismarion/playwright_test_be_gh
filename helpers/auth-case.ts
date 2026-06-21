export type AuthType = 'raw' | 'bearer' | 'invalid';

export function authHeader(token: string, type: AuthType) {
  const prefixes = {
    raw: '',
    bearer: 'Bearer ',
    invalid: 'Invalid ',
  };

  return {
    Authorization: `${prefixes[type]}${token}`,
  };
}