const tokens = new Set<string>();

export function generateUid() {
  const newUid = Math.random().toString(36).substring(2);

  if (tokens.has(newUid)) {
    generateUid();
  }

  tokens.add(newUid);

  return newUid;
}
