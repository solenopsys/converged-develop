import { MdView } from "@solenopsys/ui-content";
import { createSignal, Component, createResource } from "solid-js";
import { useParams } from "@solidjs/router";

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

export const MdDynamic: Component = (props) => {
  const params = useParams();

  const fetchMdData = () => cascadeFetch(params.id);

  const [mdData] = createResource(fetchMdData);

  return (
    <>
      {mdData() &&
        mdData().map((element) => (
          <MdView key={element.id} data={element} />
        ))}
    </>
  );
};
