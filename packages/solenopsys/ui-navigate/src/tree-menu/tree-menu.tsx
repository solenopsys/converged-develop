import { signal } from '@solenopsys/converged';
import type { JSX, Component } from '@solenopsys/converged';
import styles from './tree-menu.module.css'; 

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

export const UiTreeMenu: MenuComponent = (props) => {
 
 
 
  return (
    <div>
      <MenuItem data={props.data} onClickLink={props.onClickLink} baseUrl={props.baseUrl} />
    </div>
  );
};

type ItemProps<P = {}> = P & {
    baseUrl?:string
    collapsed?: boolean;
    data: MenuItemData;
    onClickLink: (link: string) => void;
  };

type ParentComponent<P = {}> = Component<ItemProps<P>>;



const MenuItem: ParentComponent = (props) => {
    const [collapsed] = signal<boolean>(props.collapsed ?? false);

 

  
    return (
      <>
        <div class={styles.item}>
          <a class={styles.link} onClick={ ()=>props.onClickLink(props.data.cid)}
         href={`${props.baseUrl}/${props.data.cid}/`}>
            {props.data.name} 
          </a>
        </div>
        {props.data.children.map((sub_item) => (
          <div class={styles.sub_item}>
            <MenuItem data={sub_item} baseUrl={props.baseUrl} onClickLink={ props.onClickLink}/>
          </div>
        ))}
      </>
    );
  };
  

export default MenuItem;
