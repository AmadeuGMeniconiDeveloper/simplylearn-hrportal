const uids = new Set<string>();

export function generateUid() {
  const newUid = Math.random().toString(36).substring(2);

  if (uids.has(newUid)) {
    generateUid();
  }

  uids.add(newUid);

  console.log("UID Generator - UID set: ", [...uids]);
  return newUid;
}
