export async function decryptObject(enc) {
  const data = Uint8Array.from(atob(enc.data), c => c.charCodeAt(0));
  const iv = Uint8Array.from(atob(enc.iv), c => c.charCodeAt(0));
  const keyRaw = Uint8Array.from(atob(enc.key), c => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "raw", keyRaw, "AES-GCM", false, ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv }, key, data
  );

  return JSON.parse(new TextDecoder().decode(decrypted));
}
