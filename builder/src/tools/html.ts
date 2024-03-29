import { join } from "path";

export function indexHtmlTransform(
	indexHtmlBody: Response,
	indexJs: string,
	imports: any,
	entry: any,
): Response {
	const rewriter = new HTMLRewriter();

	rewriter.on("*", {
		element(el) {
			console.log(el.tagName);

			if (el.tagName === "script") {
				if (el.getAttribute("type") === "module") {
					const src = `const entry=JSON.parse(\`${entry}\`);\n` + indexJs;

					el.setInnerContent(src, { html: false });
				}
				if (el.getAttribute("type") === "importmap") {
					el.setInnerContent(JSON.stringify({ imports }), { html: false });
				}
			}
		},
	});

	return rewriter.transform(indexHtmlBody);
}

import { CONFIG_MAP } from "../confs";

export async function indexBuild(
	dirPath: string,
	dirBs: string,
): Promise<Response> {
	const htmlStrng = await Bun.file(join(dirPath, "/index.html")).text();
	const scriptString = await Bun.file(join(dirPath, "/index.js")).text();
	const entryString = await Bun.file(join(dirBs, "/entry.json")).text();

	const htmlContent = await indexHtmlTransform(
		htmlStrng,
		scriptString,
		CONFIG_MAP,
		entryString,
	);
	return htmlContent;
}
