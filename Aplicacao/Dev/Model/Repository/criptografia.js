const crypto = require('crypto');
const algorithm = 'aes-192-cbc';
const password = 'keepitsecret';
exports.cp = function encryptText(dados){
    // Use the async `crypto.scrypt()` instead.
    const key = crypto.scryptSync(password, 'salt', 24);
    // Use `crypto.randomBytes` to generate a random iv instead of the static iv
    // shown here.
    const iv = Buffer.alloc(16, 0); // Initialization vector.
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(dados, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
exports.dcp = function decryptText(dados){
    // Use the async `crypto.scrypt()` instead.
    const key = crypto.scryptSync(password, 'salt', 24);
    // The IV is usually passed along with the ciphertext.
    const iv = Buffer.alloc(16, 0); // Initialization vector.
    
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    
    // Encrypted using same algorithm, key and iv.
    let decrypted = decipher.update(dados, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}