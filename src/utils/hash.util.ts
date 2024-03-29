import { hash, compare } from 'bcrypt';

const createHash = async (text: string, salt: number) => hash(text, salt);
const compareWithHashed = async (text: string, hashed: string) =>
  compare(text, hashed);

export { createHash, compareWithHashed };
