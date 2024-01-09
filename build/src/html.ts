


export function indexHtmlTransform(
    indexHtmlBody: string,
    indexJs: string,
    imports: any,
    entry: any
) {
    const rewriter = new HTMLRewriter();

    rewriter.on('*', {
        element(el) {
            console.log(el.tagName); // "body" | "div" | ...

            if (el.tagName === 'script') {
                if (el.getAttribute('type') === 'module') {
                    const src=`const entry=JSON.parse(${entry});\n`+indexJs;
                    el.setInnerContent(src);
                }
                if (el.getAttribute('type') === 'importmap') {
                    el.setInnerContent(JSON.stringify({ imports }));
                }
            }
        },
    });

    return rewriter.transform(indexHtmlBody);
}




