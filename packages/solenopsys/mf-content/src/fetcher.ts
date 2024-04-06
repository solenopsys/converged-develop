 
async function fetchArticle(id:string) {
	return (await fetch(`/dag?key=md&cid=${id}`)).json();
}

export async function cascadeFetch(menuId: string) {
	console.log("MENUID MD FETH", menuId);

	const menuObj = await (await fetch(`/dag?key=object&cid=${menuId}`)).json();
	const articlesIds = menuObj.articles;

	const articlesData = [];
	for (const id of articlesIds) {
		const articleData = await fetchArticle(id);
		articlesData.push(articleData);
	}

	return articlesData;
}