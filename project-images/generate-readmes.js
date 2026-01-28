const fs = require("fs");
const path = require("path");

const BASE_DIR = __dirname;
const IMAGE_EXTS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".heic",
  ".heif",
];

const folders = fs
  .readdirSync(BASE_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .filter((name) => name !== "node_modules"); // safety

folders.forEach((folder) => {
  const folderPath = path.join(BASE_DIR, folder);

  const images = fs
    .readdirSync(folderPath)
    .filter((f) => IMAGE_EXTS.includes(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (!images.length) return;

  const title = folder
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const markdown = `# ${title}

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap:20px;">
${images.map((img) => `<img src="./${img}" width="240" />`).join("\n")}
</div>
`;

  fs.writeFileSync(path.join(folderPath, "README.md"), markdown);
  console.log(`✅ README.md generated for ${folder}`);
});

console.log("🎉 All READMEs generated");
