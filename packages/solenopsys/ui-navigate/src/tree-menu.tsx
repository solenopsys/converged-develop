import $ from "@solenopsys/converged-reactive";
import { If, type Component } from "@solenopsys/converged-renderer";
// @ts-ignore
import styles from "./styles/tree-menu.module.css";

type CID = string;

export type MenuItemData = {
	name: string;
	link: string;
	icon?: string;
	items?: MenuItemData[];
	onClickLink: (link: string) => void;
};

type MenuProps<P = {}> = P & {
	data: MenuItemData;
	onClickLink: (link: string) => void;
};

type MenuComponent<P = {}> = Component<ItemProps<P>>;

export const UiTreeMenu: MenuComponent = (props: ItemProps) => {
	console.log("MENU UiTreeMenu", props.data);

	return (
		<div>
			<MenuItemGroup
				data={props.data}
				onClickLink={props.onClickLink}
				baseUrl={props.baseUrl}
			/>
		</div>
	);
};

type ItemProps<P = {}> = P & {
	collapsed?: boolean;
	data: MenuItemData[];

};

type ParentComponent<P = {}> = Component<ItemProps<P>>;

const MenuItem: ParentComponent<MenuItemData> = (props: MenuItemData) => {
	const collapsed = $<boolean>(true);
	return () => (
		<div class={styles.item}>
			<a
				class={styles.link}
				onClick={(event) => {
					collapsed(!collapsed());
					event.preventDefault();
					props.onClickLink(props.link);
				}}
				href={`${props.link}/`}>
				{props.name}
			</a>

			<If when={!collapsed()}>
				<div class={styles.sub_item}>
					<MenuItemGroup data={props.items} onClickLink={props.onClickLink} />
				</div>
			</If>
		</div>
	);
};

const MenuItemGroup: ParentComponent<ItemProps> = (props: ItemProps) => {
	return () => (
		<>
			{props.data.map((item) => (
				<MenuItem {...item} onClickLink={props.onClickLink} />
			))}
		</>
	);
};
