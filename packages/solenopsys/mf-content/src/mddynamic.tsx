import { MdView } from "@solenopsys/ui-content";
import {  Component, useResource, If } from "@solenopsys/converged-renderer";
import {  useParams } from "@solenopsys/converged-router";
async function fetchArticle(id) {
  return (await fetch(`/dag?key=md&cid=${id}`)).json();
}

async function cascadeFetch(menuId) {
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
  const params = useParams();
  

  const ftch=()=>cascadeFetch(params.id)
  const mdData=useResource<any[]>(ftch)

  return (
    <>
     
      {mdData() &&
        mdData()?.map((element) => ( <>
    
          <MdView key={element.id} data={element} />
       
          </>
        ))}
        
    </>
  );
};
