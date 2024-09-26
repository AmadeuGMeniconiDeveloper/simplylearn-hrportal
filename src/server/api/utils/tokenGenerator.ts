const tokens = new Set<string>();

export function generateToken() {
  const newToken = Math.random().toString(36).substring(2);

  if (tokens.has(newToken)) {
    generateToken();
  }

  tokens.add(newToken);

  console.log("Token Generator - Token set: ", [...tokens]);
  return newToken;
}
