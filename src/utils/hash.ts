import { ArgonType, hash, verify } from "argon2-browser";

export async function hashPassword(password: string) {
  const result = await hash({
    pass: password,
    salt: crypto.getRandomValues(new Uint8Array(16)), // secure salt
    type: ArgonType.Argon2id, // best and OWASP recommended
    time: 3, // CPU cost
    mem: 65536, // 64MB memory cost -> defeats GPU attackers
    parallelism: 1,
  });
  return result.encoded; // store this in DB
}

export async function verifyPassword(password: string, hashed: string) {
  return await verify({
    pass: password,
    encoded: hashed,
    type: ArgonType.Argon2id,
  });
}
