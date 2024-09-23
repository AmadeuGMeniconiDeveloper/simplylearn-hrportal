const tokens = new Set<string>();

export function generateAuthToken() {
  const newToken = Math.random().toString(36).substring(2);

  if (tokens.has(newToken)) {
    generateAuthToken();
  }

  tokens.add(newToken);

  return newToken;
}
