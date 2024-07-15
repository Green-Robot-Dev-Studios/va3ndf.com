import { promises as fs } from 'fs';
export default async (file) => JSON.parse(await fs.readFile(process.cwd() + "/src/app/" + file))
