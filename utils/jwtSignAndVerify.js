import {importPKCS8, importSPKI, exportPKCS8, exportSPKI, generateKeyPair} from 'jose';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import ENV from '../config/envConfig.js';
import { SignJWT, jwtVerify } from 'jose';

async function generateAndExportKeys() {
    // Generate an RSA key pair
    const { publicKey, privateKey } = await generateKeyPair('RS256', { modulusLength: 2048, extractable: true });

    // Export the keys to PEM format
    const exportedPrivateKey = await exportPKCS8(privateKey); // PKCS#8 for private key
    const exportedPublicKey = await exportSPKI(publicKey); // SPKI for public key

    // Ensure the 'keys' directory exists in the current working directory
    const keysDir = join(process.cwd(), 'keys');
    if (!existsSync(keysDir)) {
        mkdirSync(keysDir);
    }

    // Write the keys to files in the 'keys' directory
    writeFileSync(join(keysDir, 'privateKey.pem'), exportedPrivateKey);
    writeFileSync(join(keysDir, 'publicKey.pem'), exportedPublicKey);
}


// Load the keys from files
async function getPrivateKey() {
    const privateKey = await importPKCS8(readFileSync(ENV.PRIVATE_KEY),'utf-8')
    return privateKey
}

async function getPublicKey() {
    const publicKey = await importSPKI(readFileSync(ENV.PUBLIC_KEY), 'utf-8')
    return publicKey;
}

// Function to sign a JWT
export async function signJwt(payload, options = {}) {
    const {
        exp,
        issuer,
        audience,
        jti,
        notBefore
    } = options;

    const privateKey = await getPrivateKey();
    
    let jwtSet = new SignJWT(payload)
        .setProtectedHeader({ alg: 'RS256' })
        .setIssuedAt();

    if (exp) jwtSet = jwtSet.setExpirationTime(exp);
    if (jti) jwtSet = jwtSet.setJti(jti);
    if (audience) jwtSet = jwtSet.setAudience(audience);
    if (issuer) jwtSet = jwtSet.setIssuer(issuer);
    if (notBefore) jwtSet = jwtSet.setNotBefore(notBefore);

    const jwt = await jwtSet.sign(privateKey);
    
    return jwt;
}

// Function to verify a JWT
export async function verifyJwt(token) {
    const publicKey = await getPublicKey();
    try {
        const { payload } = await jwtVerify(token, publicKey);
        return payload;
    } catch (err) {
        return null;
    }
}

export {generateAndExportKeys, signJwt, verifyJwt};