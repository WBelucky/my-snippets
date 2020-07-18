import * as process from "process";
import { Command } from "commander";
import { makeVSSnippets } from "./make-vs-snippets";
import { fromVSSnippets } from "./from-vs";

const program = new Command();

program
  .command("to-vs <dir>")
  .description(
    "make snippets for VSCode from multiple files in target a directory"
  )
  .option("-o, --output <output-dir>", "determine output directory")
  .action(makeVSSnippets);
program
  .command("from-vs <file-name> <extension>")
  .description("make multiple snippet files from json file of VSCode snippets")
  .action(fromVSSnippets);

program.parse(process.argv);
