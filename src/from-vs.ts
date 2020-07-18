import * as fs from "fs";
import * as path from "path";
import JSON5 from "json5";

export const fromVSSnippets = (fileName: string | undefined, extension: string | undefined, option: Record<string, unknown>) => {
    if (fileName === undefined || extension === undefined) {
        console.error("usage: from-vs <vs-snippet-file> <file-extension>");
        console.info("example: from-vs ../vscode/snippets/typescriptreact.json tsx")
        return;
    }
    console.log(fileName, extension);
    const snippetsDir = "snippets";

    const extDir = path.join(snippetsDir, `${path.basename(fileName, ".json")}`);
    if (!fs.existsSync(extDir)) {
        fs.mkdirSync(extDir);
    }
    const j = JSON5.parse(fs.readFileSync(fileName, "utf8")) as Record<string, Record<string, string | string[]>>;
    Object.entries(j).forEach(([k, v]) => {
      if (!("body" in v)) {
        console.log(`cannot fine body in ${k}`);
      }
      const data = typeof v.body === "string" ? v.body : v.body.join("\n");
      const dist = path.join(extDir, `${k}.${extension}`);
      fs.writeFile(dist, data, (err) => {
          if (err) throw err;
          console.log(`${dist} has changed!`);
      })
    })
};
