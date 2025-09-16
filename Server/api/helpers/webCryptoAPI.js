// /Server/api/helpers/webCryptoAPI.js
async function webCryptoAPIHashWithPBKDF2(password, salt) {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const saltBuffer = encoder.encode(salt);

  // PBKDF2 with SHA-256 as the hash function
  const key = await crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: saltBuffer, iterations: 100000, hash: "SHA-256" },
    key,
    256
  );

  const hashArray = new Uint8Array(derivedBits);
  return arrayBufferToHexString(hashArray);
}

// Compare the input password with the stored hashed password (PBKDF2)
async function comparePasswordWithPBKDF2(inputPassword, storedPasswordHash, salt) {
  const inputPasswordHash = await hashPasswordWithPBKDF2(inputPassword, salt);
  return inputPasswordHash === storedPasswordHash;
}

// Utility function to convert ArrayBuffer to hex string
function arrayBufferToHexString(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

//Wuthout Salt
export async function webCryptoHashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to array
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); // Convert array to hex string

  return hashHex; // Returns SHA-256 hash of the password
}


export async function webCryptoComparePassword(inputPassword, storedPasswordHash) {
const encoder = new TextEncoder();
  
  // Hash the input password
  const inputPasswordHashBuffer = await crypto.subtle.digest(
    "SHA-256", 
    encoder.encode(inputPassword)
  );

  // Convert the stored password hash to ArrayBuffer (assuming it's a hex string)
  const storedPasswordHashBuffer = hexStringToArrayBuffer(storedPasswordHash);

  // Compare the hashes (in byte-by-byte comparison)
  return inputPasswordHashBuffer.every((byte, index) => byte === storedPasswordHashBuffer[index]);
}

// Utility function to convert a hex string to ArrayBuffer
function hexStringToArrayBuffer(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes.buffer;
}
