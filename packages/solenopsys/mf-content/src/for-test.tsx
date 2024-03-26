import { useParams } from "@solenopsys/converged-router";

import {UiTreeMenu} from "@solenopsys/ui-navigate";




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