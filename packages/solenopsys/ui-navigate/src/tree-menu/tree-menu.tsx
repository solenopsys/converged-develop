import $ from "@solenopsys/converged-reactive";
import type { Component } from "@solenopsys/converged-renderer";
// @ts-ignore
import styles from "./tree-menu.module.css";

type CID = string;

export interface MenuItemData {
	cid: CID;
	name: string;
	path: string;
	type: string;
	articles: CID[];
	children: MenuItemData[];
}

type MenuProps<P = {}> = P & {
	data: MenuItemData;
	onClickLink: (link: string) => void;
};

type MenuComponent<P = {}> = Component<ItemProps<P>>;

export const UiTreeMenu: MenuComponent = (props: ItemProps) => {
	console.log("MENU UiTreeMenu", props.data);

	return (
		<div>
			<MenuItem
				data={props.data}
				onClickLink={props.onClickLink}
				baseUrl={props.baseUrl}
			/>
		</div>
	);
};

type ItemProps<P = {}> = P & {
	baseUrl?: string;
	collapsed?: boolean;
	data: MenuItemData;
	onClickLink: (link: string) => void;
};

type ParentComponent<P = {}> = Component<ItemProps<P>>;

const MenuItem: ParentComponent<ItemProps> = (props: ItemProps) => {
	const collapsed = $<boolean>(props.collapsed ?? false);
	const cid = props.data.cid;
	const path = props.data.path;
	const baseUrl = props.baseUrl + "/" + path;
	return () => (
		<>
			<div class={styles.item}>
				<a
					class={styles.link}
					onClick={(event) => {
						event.preventDefault();
						props.onClickLink(cid);
					}}
					href={`${baseUrl}/`}
				>
					{props.data.name}
				</a>
			</div>
			{props.data.children.map((sub_item) => (
				<div class={styles.sub_item}>
					<MenuItem
						data={sub_item}
						baseUrl={baseUrl}
						onClickLink={props.onClickLink}
					/>
				</div>
			))}
		</>
	);
};

export default MenuItem;
