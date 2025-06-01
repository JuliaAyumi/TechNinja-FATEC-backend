import crypto from 'crypto';

let key;

// Função para definir a chave com base no CRYPTO_SECRET
export function setCryptoKey(secretEnv) {
  if (!secretEnv) {
    throw new Error("A variável de ambiente CRYPTO_SECRET não está definida.");
  }
  key = crypto.createHash('sha256').update(secretEnv).digest();
}

const algorithm = 'aes-256-cbc';

export function encrypt(text) {
  if (!key) throw new Error("Chave criptográfica não definida.");

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return iv.toString('hex') + encrypted;
}

export function decrypt(encryptedData) {
  if (!key) throw new Error("Chave criptográfica não definida.");

  if (!encryptedData || encryptedData.length < 32) {
    throw new Error("Dados criptografados inválidos ou ausentes.");
  }

  const iv = Buffer.from(encryptedData.slice(0, 32), 'hex');
  const encryptedText = encryptedData.slice(32);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}