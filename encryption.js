const crypto = require('crypto');
require('dotenv').config();

const key = process.env.ENCRYPTION_KEY;

if (!key || key.length !== 32) {
  throw new Error('ENCRYPTION_KEY environment variable must be 32 characters long');
}

function encrypt(text) {
  if (typeof text !== 'string' || text.length === 0) {
    throw new TypeError('The "text" argument must be a non-empty string');
  }

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
  const parts = text.split(':');
  if (parts.length !== 2) {
    throw new Error('Invalid encrypted text format');
  }

  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = Buffer.from(parts[1], 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { encrypt, decrypt };
