import $ from "@solenopsys/converged-reactive";
import type { Component } from "@solenopsys/converged-renderer";
// @ts-ignore
import styles from "./tree-menu.module.css";

type CID = string;

export type MenuItemData = {
	name: string;
	link: string;
	icon?: string;
	items?: MenuItemData[];
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
	onClickLink: (link: string) => void;
};

type ParentComponent<P = {}> = Component<ItemProps<P>>;

const MenuItemGroup: ParentComponent<ItemProps> = (props: ItemProps) => {
	const collapsed = $<boolean>(props.collapsed ?? false);
	return () => (
		<>
			{props.data.map((item) => (
				<div class={styles.item}>
					<a
						class={styles.link}
						onClick={(event) => {
							event.preventDefault();
							props.onClickLink(item.link);
						}}
						href={`${item.link}/`}
					>
						{item.name}
					</a>

					<div class={styles.sub_item}>
						<MenuItemGroup data={item.items} onClickLink={props.onClickLink} />
					</div>
				</div>
			))}
		</>
	);
};
