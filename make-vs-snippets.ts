import fs from "fs";
import path from "path";
import process from "process";
import { program, option } from "commander";


(() => {
  program
    .usage("<dir-name> [options]")
    .description("make snippets for VSCode from multiple files in a target directory")
    .option("-o, --output <output-dir>", "determine output directory");
  program.parse(process.argv);

  const output =
    program.output && typeof program.output === "string"
      ? program.output
      : "../vscode/snippets/"; // TODO:

  const dir = program.args[0];
  if (!dir) {
    console.error("make-snippet <dir-name>");
    console.info("example: make-snippet typescriptreact");
    process.exit(1);
  }

  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    const content = files
      .filter((f) => fs.statSync(path.join(dir, f)).isFile())
      .map((f) => {
        const m = f.match(/^(.*)\.(\S+)$/) ?? f;
        const prefix = m[1] === "" ? m[2] : m[1];

        const fileName = path.join(dir, f);
        const body = String(fs.readFileSync(fileName, "utf8")).split("\n");
        // TODO: 最初の行以降続くコメントをpropertyにしたい
        // const configEnd = body.findIndex(s => s.match(/^\s*$/));
        // const configs = body.slice(0, configEnd);
        const snippet = {
          prefix,
          body,
        };
        return { [prefix]: snippet };
      })
      .reduce((prev, cur) => {
        return { ...prev, ...cur };
      }, {} as Record<string, Record<string, any>>);
    const dist = path.join(output, `${path.basename(dir)}.json`);
    fs.writeFile(dist, JSON.stringify(content), (err) => {
      if (err) throw err;
      console.log(`make-snippet: ${dist} has changed!`);
    });
  });
})();
