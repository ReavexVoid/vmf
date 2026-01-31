export async function encryptObject(obj) {
  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(obj));

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  );

  const rawKey = await crypto.subtle.exportKey("raw", key);

  return `data=${btoa(String.fromCharCode(...new Uint8Array(encrypted)))}`
       + `&iv=${btoa(String.fromCharCode(...iv))}`
       + `&key=${btoa(String.fromCharCode(...new Uint8Array(rawKey)))}`;
}

export async function decryptFromHash() {
  if (!location.hash) return null;

  const params = new URLSearchParams(location.hash.slice(1));
  const data = Uint8Array.from(atob(params.get("data")), c => c.charCodeAt(0));
  const iv = Uint8Array.from(atob(params.get("iv")), c => c.charCodeAt(0));
  const rawKey = Uint8Array.from(atob(params.get("key")), c => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "raw", rawKey, "AES-GCM", true, ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv }, key, data
  );

  return JSON.parse(new TextDecoder().decode(decrypted));
}
