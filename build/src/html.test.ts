import { indexHtmlTransform } from "./html";

const SOURCE_HTML = `
<html>
<head>
</head>
<body id="layout" style="padding: 0;margin: 0;">
</body>
<script></script>
</html>
`;

const INDEX_JS=`
  console.log()
  `

  const RESULT_HTML = `
  <html>
  <head>
  </head>
  <body id="layout" style="padding: 0;margin: 0;">
  </body>
  <script>
  console.log()
  </script>
  </html>
  `;  



describe("html", () => {
    test("inject", async () => {
        const resultHtmlt= indexHtmlTransform(SOURCE_HTML,INDEX_JS,undefined,undefined)
        expect(resultHtmlt).toEqual(RESULT_HTML);
    });
});