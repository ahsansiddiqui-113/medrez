const crypto = require('crypto');

function encryptEmail(email) {
    if (!email) {
        throw new Error("Email is required for encryption.");
    }
    const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
    let encrypted = cipher.update(email, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

module.exports = { encryptEmail };
