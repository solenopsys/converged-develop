import { useParams } from "@solenopsys/converged-router";
import { useResource,If } from "@solenopsys/converged-renderer";
import {UiTreeMenu} from "@solenopsys/ui-navigate";


const fetchMenuData = async () =>
    (await fetch(`/dag?key=menu&cid=bafyreicpz3bnf3xqabciyypjssfue54csygb3fn4soz3wbztppvzdfahsy`)).json();


const menuData= useResource(fetchMenuData);


const LeftMenu=() => {
    return (
        <>
            {menuData() && <UiTreeMenu style={{ margin: '20px' }} data={menuData()} baseUrl="/article" />}
        </>
    );
}



const mdDynamicWrapper = () => {
    const params = useParams();

    return <>
        <If when={params.id} keyed ><MdDynamic /></If>
    </>;
};


components[MD] = () => {

    return (
        <mdDynamicWrapper/>
    )
}