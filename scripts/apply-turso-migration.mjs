// Aplica uma migration do Prisma no banco Turso.
//
// Uso:
//   npm run db:push-turso                      -> aplica a migration mais recente
//   npm run db:push-turso -- 20260524_add_x    -> aplica uma migration especifica (pelo nome da pasta)
//
// Requer o CLI do Turso instalado e logado (turso auth login).
// O nome do banco vem de TURSO_DB_NAME (padrao: "finly").

import { readdirSync, statSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const MIGRATIONS_DIR = join(process.cwd(), "prisma", "migrations");
const DB_NAME = process.env.TURSO_DB_NAME || "finly";

function getMigrationFolders() {
  return readdirSync(MIGRATIONS_DIR)
    .filter((name) => statSync(join(MIGRATIONS_DIR, name)).isDirectory())
    .sort(); // timestamp no nome garante ordem cronologica
}

function fail(msg) {
  console.error(`\x1b[31m✖ ${msg}\x1b[0m`);
  process.exit(1);
}

const folders = getMigrationFolders();
if (folders.length === 0) fail("Nenhuma migration encontrada em prisma/migrations.");

// Argumento opcional: nome da pasta de uma migration especifica.
const requested = process.argv[2];
const target = requested
  ? folders.find((f) => f === requested)
  : folders[folders.length - 1];

if (!target) {
  fail(
    `Migration "${requested}" nao encontrada. Disponiveis:\n  ` +
      folders.join("\n  ")
  );
}

const sqlPath = join(MIGRATIONS_DIR, target, "migration.sql");
let sql;
try {
  sql = readFileSync(sqlPath, "utf8");
} catch {
  fail(`Arquivo nao encontrado: ${sqlPath}`);
}

console.log(`→ Aplicando migration "${target}" no banco Turso "${DB_NAME}"...`);

const result = spawnSync("turso", ["db", "shell", DB_NAME], {
  input: sql,
  stdio: ["pipe", "inherit", "inherit"],
  shell: process.platform === "win32", // resolve turso.cmd no Windows
});

if (result.error) {
  if (result.error.code === "ENOENT") {
    fail(
      "CLI do Turso nao encontrado. Instale com:\n" +
        "  irm get.tur.so/install.ps1 | iex   (PowerShell)\n" +
        "e rode: turso auth login"
    );
  }
  fail(result.error.message);
}

if (result.status !== 0) {
  fail(`turso db shell terminou com codigo ${result.status}.`);
}

console.log(`\x1b[32m✔ Migration "${target}" aplicada com sucesso.\x1b[0m`);
