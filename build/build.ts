console.log('Building...');

import { SolidPlugin } from "./plugin";

const start = Bun.nanoseconds()

export const EXTERNALS= ['solid-js', 'solid-js/web'];

await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  external:EXTERNALS,
  plugins: [SolidPlugin()],
}).catch((err) => {
  console.error(err);
}).then(() => {
  const end = Bun.nanoseconds();
  const time = (end - start) / 1000000;
  console.log('Build complete! ', time);
});