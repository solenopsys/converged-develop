import styles from "./md.module.css";
import { Component, For, usePromise } from "@solenopsys/converged-renderer";
import { MdView } from "@solenopsys/ui-content";
import { cascadeFetch } from "./fetcher";



interface Props {
	menuId: string;
}

export const MdDynamic: Component<Props> = (props: any) => {
	const ftch = () => cascadeFetch(props.ipfs);
	const mdData = usePromise<any[]>(ftch);

	return () => {
		const state: any = mdData();
		if (state.pending) return <div></div>;

		const articles = state.value.articles;

		console.log("IMTEM");

		return (
			<div class=" flex flex-col">
				<div class=" p-10">
					<For values={articles}>
						{(article: any) => (
							<>
								<div id={article.name} style="scroll-margin-top: 70px;">
									<MdView data={article} />
								</div>
							</>
						)}
					</For>
				</div>
				<div class={styles.navList}>
					<div class={styles.nav} >
						<For values={articles}>
							{(article: any) => (
								<div id={article.key} class="p-1 font-size-3">
									<a href={"#" + article.name} style="overflow-y: auto;"> {article.title}</a>
								</div>
							)}
						</For>
					</div>
				</div>
			</div>
		);
	};
}; //<MdView key={value?.cid} data={value} />;
