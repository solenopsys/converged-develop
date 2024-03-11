// @ts-ignore
import { transformAsync } from "@babel/core";
 // @ts-ignore
import ts from "@babel/preset-typescript";
 // @ts-ignore
import solid from "babel-preset-solid";
import { type BunPlugin } from "bun";

export interface SolidPluginOptions {
  generate?: "dom" | "ssr";
  hydratable?: boolean;
}

export function SolidPlugin(options: SolidPluginOptions = {}): BunPlugin {
  return {
    name: "bun-plugin-solid",
    setup: (build) => {
      build.onLoad({ filter: /\.(js|ts)x$/ }, async (args) => {
        const { readFile } = await import("node:fs/promises");
        const code = await readFile(args.path, "utf8");
        const transforms = await transformAsync(code, {
          filename: args.path,
          presets: [
            [solid, options],
            [ts, {}],
          ],
        });

        return {
          contents: transforms!.code!,
          loader: "js",
        };
      });
    },
  };
}