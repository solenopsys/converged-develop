import { SiteLayout } from "./layout/layout"
import { createSignal, Component, createResource, Show } from "solid-js";

import { UiTreeMenu, UiTabs, UiTopPane } from "@solenopsys/ui-navigate";
import { MdDynamic } from "./layout/mddynamic"
import { Router, Route, A, useNavigate, useParams } from "@solidjs/router";




const fetchMenuData = async () =>
    (await fetch(`/dag?key=menu&cid=bafyreicpz3bnf3xqabciyypjssfue54csygb3fn4soz3wbztppvzdfahsy`)).json();


const [menuData] = createResource(fetchMenuData);


const tabs = [{ id: "tab1", title: "Title1" }, { id: "tab2", title: "Title2" }]



export const Site = () => {


    const MENU: string = "MENU"
    const MD: string = "MD"
    const TABS: string = "TABS"

    const components: { [key: string]: Component } = {}




    components[MENU] = () => {
        return (
            <>
                {menuData() && <UiTreeMenu style={{ margin: '20px' }} onClickLink={updateArticle} data={menuData()} baseUrl="/article" />}
            </>
        );
    }

    components[TABS] = () => { return <UiTopPane logo={"/images/logo.svg"} tabsState={tabs} /> }



    const mdDynamicWrapper = () => {
        const params = useParams();

        return <>
            <Show when={params.id} keyed ><MdDynamic /></Show>
        </>;
    };


    components[MD] = () => {

        return (
            <Router>
                <Route path="/article/:id/" component={mdDynamicWrapper} />
            </Router>
        )
    }

    function updateArticle(link: string) {

        console.log("LINK", link);

        //setArticleId(link);      
        //  navigate("/article/"+link+"/", { replace: true })
    }

    return <>  <SiteLayout components={components} top={TABS} central={MD} left={MENU} /></>
}

