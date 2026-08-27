#!/usr/bin/env node
// One-shot publish.  Usage:  npm run ship -- "commit message"
//   1. npm run build        (regenerate the committed build/ artifact)
//   2. commit everything + git push
//   3. pull on the box — but ONLY if the box's tree is clean, so a stray
//      edit there is never silently stomped (see CLAUDE.md deploy notes).
import { execSync } from 'node:child_process';

const msg = process.argv.slice(2).join(' ').trim();
if (!msg) {
	console.error('usage: npm run ship -- "commit message"');
	process.exit(1);
}

const run = (cmd) => {
	console.log(`\n$ ${cmd}`);
	execSync(cmd, { stdio: 'inherit' });
};
const cap = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim();

// 1. Build the static artifact that the box actually serves.
run('npm run build');

// 2. Commit (if anything changed) and push.
if (cap('git status --porcelain')) {
	run('git add -A');
	run(`git commit -m ${JSON.stringify(msg)}`);
} else {
	console.log('\n• nothing new to commit — pushing existing commits');
}
run('git push');

// 3. Deploy: refuse to pull onto a dirty box tree.
const boxDirty = cap("ssh nerdcave 'git -C /srv/www/ildotdev status --porcelain'");
if (boxDirty) {
	console.error('\n✗ box working tree is DIRTY — refusing to pull. Inspect it:');
	console.error(boxDirty);
	console.error("\n   ssh nerdcave 'git -C /srv/www/ildotdev status'");
	process.exit(1);
}
run("ssh nerdcave 'git -C /srv/www/ildotdev pull --ff-only'");
console.log('\n✓ live at https://ivanlugo.dev/');
