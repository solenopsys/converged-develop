import { createSignal } from 'solid-js';
import type { JSX,Component, } from 'solid-js';



type CID = string;


interface MenuItemData {
    cid: CID;
    name: string;
    path: string;
    type: string;
    articles: CID[];
    children: MenuItemData[];
}
 
type ParentProps<P = {}> = P & {
    children?: JSX.Element
    collapsed?: boolean;
    data: MenuItemData;
    onClick: (link: string) => void;
};

type ParentComponent<P = {}> = Component<ParentProps<P>>;

 
const MenuItem: ParentComponent = (props) => {
    const [collapsed] = createSignal<boolean>(props.collapsed ?? false);

    return (
        <>
            <div class="item">
                <a onClick={() => props.onClick(props.data.cid)} href={`/${props.data.cid}/`} >
                    {props.data.name}
                </a>
            </div>
            {!collapsed() && (
                <div class="sub_item">
                    {props.children}
                </div>
            )}
        </>
    );
};

export default MenuItem;
