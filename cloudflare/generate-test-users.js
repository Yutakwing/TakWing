import { randomBytes, webcrypto } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PBKDF2_ITERATIONS = 100_000;
const usernames = ["TEST001", "TEST002", "TEST003", "TEST004", "TEST005"];
const root = dirname(fileURLToPath(import.meta.url));
const preservePasswords = process.argv.includes("--preserve-passwords");

function toBase64(bytes) {
  return Buffer.from(bytes).toString("base64");
}

function sqlValue(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function temporaryPassword() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
  const bytes = randomBytes(20);
  return Array.from(bytes, byte => alphabet[byte % alphabet.length]).join("");
}

async function existingPasswords() {
  if (!preservePasswords) return new Map();
  const text = await readFile(join(root, "test-credentials.txt"), "utf8");
  return new Map(text.split(/\r?\n/u).flatMap(line => {
    const match = /^(TEST\d{3}):\s*(.+)$/u.exec(line);
    return match ? [[match[1], match[2]]] : [];
  }));
}

async function deriveHash(password, salt) {
  const key = await webcrypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await webcrypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: PBKDF2_ITERATIONS },
    key,
    256,
  );
  return toBase64(new Uint8Array(bits));
}

const accounts = [];
const preserved = await existingPasswords();
for (const username of usernames) {
  const password = preserved.get(username) || temporaryPassword();
  const salt = randomBytes(16);
  accounts.push({
    username,
    password,
    salt: toBase64(salt),
    hash: await deriveHash(password, salt),
  });
}

const sql = [
  "-- Private generated account seed. Do not commit this file.",
  ...accounts.map(account =>
    `INSERT INTO users (username, password_hash, password_salt, role, active) VALUES (${sqlValue(account.username)}, ${sqlValue(account.hash)}, ${sqlValue(account.salt)}, 'student', 1) ON CONFLICT(username) DO UPDATE SET password_hash = excluded.password_hash, password_salt = excluded.password_salt, role = 'student', active = 1;`
  ),
  "",
].join("\n");

const credentials = [
  "Physiotherapy Skills Lab test credentials",
  `Generated: ${new Date().toISOString()}`,
  "Keep this file private. Passwords cannot be recovered from D1.",
  "",
  ...accounts.map(account => `${account.username}: ${account.password}`),
  "",
].join("\n");

await Promise.all([
  writeFile(join(root, "seed-users.private.sql"), sql, { mode: 0o600 }),
  writeFile(join(root, "test-credentials.txt"), credentials, { mode: 0o600 }),
]);

console.log("Generated five test accounts.");
console.log("Private SQL: cloudflare/seed-users.private.sql");
console.log("Private credentials: cloudflare/test-credentials.txt");
