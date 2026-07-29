// Asserts the pt dictionary mirrors en exactly.
// TypeScript already enforces object keys via `const pt: Dict`, but it cannot
// check array lengths — a translated bullet list that drops an item still
// compiles and silently renders a shorter section. This catches that.
import en from '../src/i18n/en';
import pt from '../src/i18n/pt';

const problems: string[] = [];

function walk(a: unknown, b: unknown, path: string) {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
      problems.push(`${path}: array in one language, not the other`);
      return;
    }
    if (a.length !== b.length) {
      problems.push(`${path}: en has ${a.length} item(s), pt has ${b.length}`);
    }
    a.forEach((item, i) => { if (i < b.length) walk(item, b[i], `${path}[${i}]`); });
    return;
  }

  if (typeof a === 'function' || typeof b === 'function') {
    if (typeof a !== typeof b) problems.push(`${path}: function in one language, value in the other`);
    return;
  }

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const ak = Object.keys(a);
    const bk = Object.keys(b);
    for (const k of ak) if (!bk.includes(k)) problems.push(`${path}.${k}: missing from pt`);
    for (const k of bk) if (!ak.includes(k)) problems.push(`${path}.${k}: present in pt but not en`);
    for (const k of ak) {
      if (bk.includes(k)) {
        walk((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], `${path}.${k}`);
      }
    }
    return;
  }

  // ponytail: no empty-string check — a blank side is legitimate (e.g. the PT
  // article "A " before a brand name has no English equivalent).
  if (typeof a !== typeof b) problems.push(`${path}: ${typeof a} in en, ${typeof b} in pt`);
}

walk(en, pt, 'i18n');

if (problems.length) {
  console.error(`i18n parity FAILED — ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}

console.log('i18n parity OK — en and pt match in shape, keys and array lengths.');
