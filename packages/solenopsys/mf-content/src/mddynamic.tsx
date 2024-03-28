import { MdView } from "@solenopsys/ui-content";
import {  Component, useResource, If, usePromise } from "@solenopsys/converged-renderer";
//import {  useLocation } from "@solenopsys/converged-router";
async function fetchArticle(id) {
  return (await fetch(`/dag?key=md&cid=${id}`)).json();
}

async function cascadeFetch(menuId:string) {
  console.log("MENUID MD FETH",menuId)

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
  menuId:string

}


export const MdDynamic: Component<Props> = (props:any) => {
  // const location = useLocation();
 console.log("PARAMS MdDynamic",props)
  const ftch=()=>cascadeFetch(props.ipfs)
  const mdData=usePromise<any[]>(ftch)


  return ()=>{
    const state=mdData()
   console.log("RES",state)
   if (state.pending) return <div>pending...</div>;

   
    return<MdView key={state.value?.cid} data={state.value} />
   
  };
};
