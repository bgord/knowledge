const { promises: fs } = require("fs");

const pathsToSkip = [
  ".git",
  ".gitignore",
  "README.md",
  "roadmap.md",
  "build-readme.js",
  "libs-and-techniques.md",
  "node_modules",
  "package.json",
  "package-lock.json"
];

async function main() {
  const allFiles = await fs.readdir(__dirname);
  const mdFiles = allFiles.filter(file => !pathsToSkip.includes(file));

  const data = {};

  for (const filename of mdFiles) {
    const file = await fs.readFile(filename);

    const titles = file
      .toString()
      .split("\n")
      .filter(line => line.startsWith("**") && line.endsWith("**"))
      .map(titleLine => titleLine.substring(2, titleLine.length - 2));

    data[filename] = titles;
  }

  const total = Object.values(data)
    .map(file => file.length)
    .reduce((a, b) => a + b, 0);

  let readme = "# Knowledge\n\n";

  readme += `Total entries: ${total}\n`;

  for (const [filename, titles] of Object.entries(data)) {
    const [category] = filename.split(".");
    readme += `\n### [${category}](${filename})\n`;
    readme += titles.map(title => `- ${title}\n`).join("");
  }

  await fs.writeFile("README.md", readme);
}

main();
