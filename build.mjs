import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith(".b64")) {
      const text = (await readFile(path, "utf8")).replace(/\s/g, "");
      if (text.length < 1000) {
        console.log("skip", path);
        continue;
      }
      const out = path.slice(0, -4);
      await mkdir(dirname(out), { recursive: true });
      await writeFile(out, Buffer.from(text, "base64"));
      console.log(out);
    }
  }
}

await walk(".");
