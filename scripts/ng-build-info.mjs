#!/usr/bin/env node
// Chạy `ng <args>` kèm `--define __BUILD_INFO__=...` để nhúng version / commit / thời điểm build
// vào bundle — dashboard hiển thị để biết trình duyệt đang chạy đúng bản nào.
// Build thẳng bằng `ng build` (không qua script này) vẫn chạy, chỉ hiện "dev".
// Build từ bản copy không có .git: đặt env GIT_COMMIT.
import { execSync, spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const git = (cmd) => {
  try {
    return execSync(`git ${cmd}`, { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch {
    return '';
  }
};

const commit = process.env.GIT_COMMIT?.slice(0, 7) || git('rev-parse --short HEAD') || 'unknown';
const dirty = !process.env.GIT_COMMIT && git('status --porcelain --untracked-files=no') !== '';
const buildInfo = {
  version: JSON.parse(readFileSync(new URL('../package.json', import.meta.url))).version,
  commit: dirty ? `${commit}-dirty` : commit,
  builtAt: new Date().toISOString(),
};

const ng = createRequire(import.meta.url).resolve('@angular/cli/bin/ng.js');
const args = [...process.argv.slice(2), '--define', `__BUILD_INFO__=${JSON.stringify(buildInfo)}`];
console.log(`[build-info] ${buildInfo.version} · ${buildInfo.commit} · ${buildInfo.builtAt}`);

spawn(process.execPath, [ng, ...args], { stdio: 'inherit' }).on('exit', (code) =>
  process.exit(code ?? 1),
);
