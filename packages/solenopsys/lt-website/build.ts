import lightningcssPlugin from '@solenopsys/converged-style/src/plugins/lightningcss-plugin' ;

await Bun.build({
  entrypoints: ['./src/index.tsx'],
  outdir: './dist',
   plugins: [lightningcssPlugin()],
   external: ['@solenopsys/converged-reactive',
    '@solenopsys/converged-renderer',
    '@solenopsys/converged-style',
   ]
}).then(result=>{
  console.log("result",result)
}).catch(e=>{
  console.log("err",e)
})

 