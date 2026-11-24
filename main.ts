// Funniest Autocorrect Fail — make.fun entry (program/v1).
// Writes one original funny line about an autocorrect fail to entry.txt.
//
// Winner of a five-way local race (V1, 4-0, rubric 10/10): one premise, one
// twist, and the twist lands in the last words. It beat V5 (proposal,
// "marry my mum", 9/10), V2 (contract/coffin, 8/10), V3 (see/sue you, 8/10)
// and V4 (salad/Satan, 7/10). Congratulations and
// condolences are both long formal words starting with "con" — exactly the
// kind of pair autocorrect swaps — and the swap flips a birth announcement
// into a bereavement message in front of the whole family group chat.
//
// Gate check (verified locally before submit): the line is 119 characters
// of plain UTF-8, one line, not only whitespace — inside the 1–200 window.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I texted my cousin congratulations on her new baby, and autocorrect changed it to condolences in the family group chat.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");

// Read it back and enforce the competition gate before exiting: the file
// must hold UTF-8 text of 1 to 200 characters, a single line, not only
// whitespace. Anything else is not a valid entry, so fail loudly here
// instead of handing the grader a bad file.
const back = readFileSync(target, "utf8");
const chars = [...back].length;
if (
  chars < 1 ||
  chars > 200 ||
  back.trim().length === 0 ||
  back.includes("\n")
) {
  throw new Error(`gate failed: entry.txt holds ${chars} characters`);
}
console.log(`wrote ${chars} chars to ${target}`);
