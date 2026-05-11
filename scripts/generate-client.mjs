import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";

execSync("pnpm exec openapi-ts", { stdio: "inherit" });

const patches = [
  {
    file: "./app/api/client/types.gen.ts",
    find: /credits: bigint/g,
    replace: "credits: number",
  },
  {
    file: "./app/api/client/transformers.gen.ts",
    find: /data\.credits = BigInt\(data\.credits\.toString\(\)\)/g,
    replace: "data.credits = Number(data.credits)",
  },
  {
    file: "./app/api/client/transformers.gen.ts",
    find: /item\.credits = BigInt\(item\.credits\.toString\(\)\)/g,
    replace: "item.credits = Number(item.credits)",
  },
];

for (const { file, find, replace } of patches) {
  const original = readFileSync(file, "utf8");
  const patched = original.replace(find, replace);
  if (patched !== original) {
    writeFileSync(file, patched, "utf8");
    console.log(`[generate-client] patched ${file}`);
  }
}
