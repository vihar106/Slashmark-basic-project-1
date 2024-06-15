function encryptText() {
  const inputText = document.getElementById("inputText").value;
  const secretKey = document.getElementById("secretKey").value;

  // Generate a random initialization vector (IV)
  const iv = CryptoJS.lib.WordArray.random(16);

  // Encrypt using AES-256 (strong algorithm) with CBC mode
  const encrypted = CryptoJS.AES.encrypt(inputText, secretKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  });

  // Convert IV to base64 for better storage
  const ivBase64 = iv.toString(CryptoJS.enc.Base64);

  // Include the IV in the output for correct decryption
  document.getElementById("outputText").value = encrypted + ":" + ivBase64;
}

function decryptText() {
  const encryptedTextWithIv = document.getElementById("outputText").value;
  const secretKey = document.getElementById("secretKey").value;

  // Split the encrypted text and IV
  const parts = encryptedTextWithIv.split(":");
  if (parts.length !== 2) {
    alert("Invalid encrypted text format.");
    return;
  }

  const encrypted = parts[0];
  const ivBase64 = parts[1]; // IV is now base64 encoded

  // Convert IV back from base64 to WordArray
  const iv = CryptoJS.enc.Base64.parse(ivBase64);

  // Decrypt using AES-256 with CBC mode
  const decrypted = CryptoJS.AES.decrypt(encrypted, secretKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  });

  document.getElementById("outputText").value = decrypted.toString(CryptoJS.enc.Utf8);
}
