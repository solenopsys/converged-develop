Bun.serve({
    async fetch(req) {
      const path = new URL(req.url).pathname;
      console.log(`Serving ${path}`);
      if(path === '/') {
        const file = Bun.file('./dist/index.html');
        return new Response(file);
      }else{
        const file = Bun.file(`./dist${path}`);
        return new Response(file);
      }
    },
  });