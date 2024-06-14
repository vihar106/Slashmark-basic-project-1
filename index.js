require('dotenv').config();

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { encrypt, decrypt } = require('./encryption');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`
   
    <form action="/encrypt" method="post">
      <label for="text">Text to Encrypt:</label>
      <input type="text" id="text" name="text">
      <button type="submit">Encrypt</button>
    </form>
    <form action="/decrypt" method="post">
      <label for="text">Text to Decrypt:</label>
      <input type="text" id="text" name="text">
      <button type="submit">Decrypt</button>
    </form>
    
  `);
});

app.post('/encrypt', (req, res) => {
  const { text } = req.body;

  // Debugging output
  console.log('Received text for encryption:', text);

  if (!text) {
    return res.status(400).send('Text is required for encryption');
  }

  try {
    const encryptedText = encrypt(text);
    res.send(`Encrypted Text: ${encryptedText}`);
  } catch (err) {
    console.error('Encryption error:', err.message);
    res.status(500).send('Encryption failed');
  }
});

app.post('/decrypt', (req, res) => {
  const { text } = req.body;

  // Debugging output
  console.log('Received text for decryption:', text);

  if (!text) {
    return res.status(400).send('Text is required for decryption');
  }

  try {
    const decryptedText = decrypt(text);
    res.send(`Decrypted Text: ${decryptedText}`);
  } catch (err) {
    console.error('Decryption error:', err.message);
    res.status(400).send('Decryption failed. Invalid input.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
