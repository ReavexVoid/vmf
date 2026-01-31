// crypto.js
// AES-256-GCM client-side encryption for Virtual Machine Forge
// No passwords, no backend, GitHub Pages compatible

// -------------------------
// Helpers
// -------------------------
function toBase64(uint8) {
  return btoa(String.fromCharCode(...uint8));
}

function fromBase64(str) {
  return Uint8Array.from(atob(str), c => c.charCodeAt(0));
}

// -------------------------
// Encrypt object
// -------------------------
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

  return {
    data: toBase64(new Uint8Array(encrypted)),
    iv: toBase64(iv),
    key: toBase64(new Uint8Array(rawKey))
  };
}

// -------------------------
// Decrypt object
// -------------------------
export async function decryptObject(enc) {
  const data = fromBase64(enc.data);
  const iv = fromBase64(enc.iv);
  const rawKey = fromBase64(enc.key);

  const key = await crypto.subtle.importKey(
    "raw",
    rawKey,
    "AES-GCM",
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  return JSON.parse(new TextDecoder().decode(decrypted));
}

// -------------------------
// Encrypt → URL hash
// -------------------------
export async function encryptToHash(obj) {
  const enc = await encryptObject(obj);

  return (
    "#data=" + encodeURIComponent(enc.data) +
    "&iv=" + encodeURIComponent(enc.iv) +
    "&key=" + encodeURIComponent(enc.key)
  );
}

// -------------------------
// Decrypt from URL hash
// -------------------------
export async function decryptFromHash() {
  if (!location.hash) return null;

  const params = new URLSearchParams(location.hash.slice(1));

  if (
    !params.has("data") ||
    !params.has("iv") ||
    !params.has("key")
  ) {
    return null;
  }

  return await decryptObject({
    data: params.get("data"),
    iv: params.get("iv"),
    key: params.get("key")
  });
}
