import { createSignal } from 'solid-js';
import type { JSX, Component } from 'solid-js';
import styles from './tree-menu.module.css'; // Make sure to import your styles

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
};

type MenuComponent<P = {}> = Component<ItemProps<P>>;

export const UiTreeMenu: MenuComponent = (props) => {
  return (
    <div>
      <MenuItem data={props.data} />
    </div>
  );
};

type ItemProps<P = {}> = P & {
 
    collapsed?: boolean;
    data: MenuItemData;
    onClick: (link: string) => void;
  };

type ParentComponent<P = {}> = Component<ItemProps<P>>;

const MenuItem: ParentComponent = (props) => {
    const [collapsed] = createSignal<boolean>(props.collapsed ?? false);
  
    return (
      <>
        <div class={styles.item}>
          <a class={styles.link} onClick={() => props.onClick(props.data.cid)} href={`/${props.data.cid}/`}>
            {props.data.name}
          </a>
        </div>
        {props.data.children.map((sub_item) => (
          <div class={styles.sub_item}>
            <MenuItem data={sub_item} />
          </div>
        ))}
      </>
    );
  };
  

export default MenuItem;
