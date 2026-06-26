#!/usr/bin/env node
import { Command } from "commander";
import { runConvert } from "./commands/convert";
import { runMigrate } from "./commands/migrate";
import { runSearch } from "./commands/search";
import { runVersion } from "./commands/version";
import { PACKAGE_VERSION } from "../package-version";

const program = new Command();

program
  .name("vietnam-address-kit")
  .description("Vietnam address migration toolkit CLI")
  .version(PACKAGE_VERSION);

program.command("version").description("Print package and data version").action(runVersion);

program
  .command("convert")
  .argument("<address>", "Address text to convert")
  .option("--json", "Print JSON")
  .option("--pretty", "Pretty-print JSON")
  .action(runConvert);

program
  .command("search")
  .argument("<kind>", "province or ward")
  .argument("<keyword>", "Search keyword")
  .option("--province <code>", "Filter wards by province code")
  .option("--json", "Print JSON")
  .option("--pretty", "Pretty-print JSON")
  .action(runSearch);

program
  .command("migrate")
  .argument("<file>", "CSV file to migrate")
  .requiredOption("--address-column <column>", "Address column name")
  .requiredOption("--out <file>", "Output CSV path")
  .option("--report <file>", "Migration report JSON path")
  .option("--pretty", "Pretty-print summary")
  .action(runMigrate);

program.parse();
