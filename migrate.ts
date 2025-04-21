import { execSync } from 'child_process';
import * as path from 'path';

const [action, moduleName] = process.argv.slice(2);

if (!action || !moduleName) {
  console.error(
    '❌ Usage: npm run migrate <generate|run|revert> <module-name>',
  );
  process.exit(1);
}

const configPath = path.resolve(
  `src/${moduleName}/infrastructure/typeorm/typeorm.config.ts`,
);
const migrationsDir = `src/${moduleName}/infrastructure/typeorm/migrations/${moduleName}`;

let command = '';

switch (action) {
  case 'generate':
    command = `ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate ${migrationsDir} --dataSource ${configPath}`;
    break;
  case 'run':
    command = `ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run --dataSource ${configPath}`;
    break;
  case 'revert':
    command = `ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:revert --dataSource ${configPath}`;
    break;
  default:
    console.error(`❌ Unknown action: ${action}`);
    process.exit(1);
}

console.log(`🛠️  Running: ${command}`);
execSync(command, { stdio: 'inherit' });
