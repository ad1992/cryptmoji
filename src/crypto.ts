const cryptoSubtle = window.crypto.subtle;
const CRYPTO_ALGO_NAME = "AES-GCM";

export const generatePBKDF2CryptoKey = async (password: string) => {
  const passWordAsBytes = encode(password);
  const passWordCryptoKey = await cryptoSubtle.importKey(
    "raw",
    passWordAsBytes,
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return passWordCryptoKey;
};

const deriveAESCryptoKeyFromPassword = async (
  passWordCryptoKey: CryptoKey,
  salt: Uint8Array
) => {
  const cryptoKey = cryptoSubtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    passWordCryptoKey,
    { name: CRYPTO_ALGO_NAME, length: 128 },
    false,
    ["encrypt", "decrypt"]
  );
  return cryptoKey;
};
export const encode = (text: string) => {
  return new TextEncoder().encode(text);
};

export const encrypt = async (text: string, password: string) => {
  const passWordCryptoKey = await generatePBKDF2CryptoKey(password);
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const cryptoKey = await deriveAESCryptoKeyFromPassword(
    passWordCryptoKey,
    salt
  );
  const iv = crypto.getRandomValues(new Uint8Array(16));
  console.log(salt, iv);
  const encryptedBuffer = await cryptoSubtle.encrypt(
    {
      name: CRYPTO_ALGO_NAME,
      iv,
    },
    cryptoKey,
    encode(text)
  );
  const encryptedData = new Uint8Array(
    encryptedBuffer.byteLength + iv.byteLength + salt.byteLength
  );
  encryptedData.set(salt, 0);
  encryptedData.set(iv, salt.byteLength);
  encryptedData.set(
    new Uint8Array(encryptedBuffer),
    salt.byteLength + iv.byteLength
  );
  return encryptedData;
};

export const decrypt = async (encryptedData: Uint8Array, password: string) => {
  const salt = encryptedData.slice(0, 16);
  const iv = encryptedData.slice(16, 32);
  const encryptedBuffer = encryptedData.slice(32);
  console.log(salt, iv);

  const passWordCryptoKey = await generatePBKDF2CryptoKey(password);
  const cryptoKey = await deriveAESCryptoKeyFromPassword(
    passWordCryptoKey,
    salt
  );
  const decryptedBuffer = await cryptoSubtle.decrypt(
    {
      name: CRYPTO_ALGO_NAME,
      iv,
    },
    cryptoKey,
    encryptedBuffer
  );
  console.log("Decrypted buffer", decryptedBuffer);
  const decryptedData = new TextDecoder().decode(decryptedBuffer);
  return decryptedData;
};
