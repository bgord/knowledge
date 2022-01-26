const { promises: fs } = require("fs");
const exec = require("child_process").exec;

const pathsToSkip = [
  ".git",
  ".gitignore",
  "README.md",
  "books.md",
  "build-readme.js",
  "libs-and-techniques.md",
  "movies.md",
  "node_modules",
  "package-lock.json",
  "package.json",
  "roadmap.md",
  "series.md",
];

async function main() {
  const allFiles = await fs.readdir(__dirname);
  const markdownFiles = allFiles.filter((file) => !pathsToSkip.includes(file));

  const filenameToTitles = {};

  for (const filename of markdownFiles) {
    const file = await fs.readFile(filename);

    const titles = file
      .toString()
      // convert to lines
      .split("\n")
      // grab only lines with a title (e.g **== vs ===**)
      .filter((line) => line.startsWith("**") && line.endsWith("**"))
      // extract the title from between the asterisks
      .map((titleLine) => titleLine.substring(2, titleLine.length - 2));

    filenameToTitles[filename] = titles;
  }

  const totalNumberOfTitles = Object.values(filenameToTitles)
    .map((file) => file.length)
    .reduce(add, 0);

  let readmeContent = "# Knowledge\n\n";

  readmeContent += `Total entries: ${totalNumberOfTitles}\n`;

  for (const [filename, titles] of Object.entries(filenameToTitles)) {
    const [category] = filename.split(".");

    readmeContent += `\n### [${category}](${filename})\n`;
    readmeContent += titles.map((title) => `- ${title}\n`).join("");
  }

  await fs.writeFile("README.md", readmeContent);
  await execShellCommand("git add README.md");
}

main();

function execShellCommand(cmd) {
  return new Promise((resolve) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

function add(a, b) {
  return a + b;
}
