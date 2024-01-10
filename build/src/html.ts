


export function indexHtmlTransform(
    indexHtmlBody: Response,
    indexJs: string,
    imports: any,
    entry: any
):Response {
    const rewriter = new HTMLRewriter();

    rewriter.on('*', {
        element(el) {
            console.log(el.tagName); // "body" | "div" | ...

            if (el.tagName === 'script') {
                if (el.getAttribute('type') === 'module') {
                    const src=`const entry=JSON.parse(\`${entry}\`);\n`+indexJs;
                 
                    el.setInnerContent(src,{html:false});
                }
                if (el.getAttribute('type') === 'importmap') {
                    el.setInnerContent(JSON.stringify({ imports }),{html:false});
                }
            }
        },
    });

    return rewriter.transform(indexHtmlBody);
}




