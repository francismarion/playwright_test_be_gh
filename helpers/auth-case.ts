export function authHeader(token: string, type: 'raw' | 'bearer' | 'invalid') {
  switch (type) {
    case 'raw':
      return { Authorization: token };

    case 'bearer':
      return { Authorization: `Bearer ${token}` };

    case 'invalid':
      return { Authorization: `Invalid ${token}` };
  }
}