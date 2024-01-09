 


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
          el.setInnerContent(indexJs); // Set the content of the <script> element
        }
      },
    });
  
    return rewriter.transform(indexHtmlBody);
  }


