import { MdView } from "@solenopsys/ui-content";
import {  Component, useResource, If, usePromise } from "@solenopsys/converged-renderer";
import {  useLocation } from "@solenopsys/converged-router";
async function fetchArticle(id) {
  return (await fetch(`/dag?key=md&cid=${id}`)).json();
}

async function cascadeFetch(menuId:string) {
  console.log("MENUID MD",menuId)
  menuId="bafyreicpz3bnf3xqabciyypjssfue54csygb3fn4soz3wbztppvzdfahsy"
  const menuObj = await (await fetch(`/dag?key=object&cid=${menuId}`)).json();
  const articlesIds = menuObj.articles;

  const articlesData = [];
  for (const id of articlesIds) {
    const articleData = await fetchArticle(id);
    articlesData.push(articleData);
  }

  return articlesData;
}



interface Props {

}

export const MdDynamic: Component<Props> = (props) => {

  const location = useLocation();

  console.log("PARAMS MD",location)
  

  const ftch=()=>cascadeFetch("bla")
  const mdData=usePromise<any[]>(ftch)


  return ()=>{
    const res=mdData()
   console.log("RES",res)

    return
    <>
     
      {res &&  <MdView key={res.value?.cid} data={res.value} />}
       
        
      
        
    </>
  };
};
