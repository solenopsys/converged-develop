import { Dynamic } from "solid-js/web";
import { createSignal, Component, createResource } from "solid-js";
import styles from "./layout.module.css"
import { UiTreeMenu,UiTabs } from "@solenopsys/ui-navigate";
import { MdView } from "@solenopsys/ui-content";
 

const Empty: Component = () => {
    return (<div>Empty</div>)
}

const EMPTY: string = "EMPTY"
const MENU: string = "MENU"
const MD: string = "MD"
const TABS: string = "TABS"

const components: { [name: string]: Component } = {
    EMPTY: Empty
}

const fetchMenuData = async () =>
    (await fetch(`/dag?key=menu&cid=bafyreicpz3bnf3xqabciyypjssfue54csygb3fn4soz3wbztppvzdfahsy`)).json();

const fetchMdData = async () =>
    (await fetch(`/dag?key=md&cid=bafyreienpilu4q7xgxvwyeb6prawxju2jq6axojffv63v4744ncogem4gy`)).json();

const [menuData] = createResource(fetchMenuData);
const [mdData] = createResource(fetchMdData);

const tabs= [{id:"tab1",title:"Title1"},{id:"tab2",title:"Title2"}]


components[MENU] = () => { return <> {menuData() && <UiTreeMenu data={menuData()}/>}</> }
components[MD] = () => { return  <> {mdData() && <MdView data={mdData()}/>} </>}
components[TABS] = () => { return  <> {  <UiTabs selected="tab1" tabs={tabs}/>} </>}


const [top, setTop] = createSignal(EMPTY);
const [central, setCentral] = createSignal(EMPTY);
const [left, setLeft] = createSignal(EMPTY);


setLeft(MENU)
setCentral(MD)
setTop(TABS)


export const SiteLayout: Component = () => {
    const [mobileMenu, mobileMenuTop] = createSignal(false);

    return (
        <div class={styles.body_wrapper}>
            <div class={styles.full_height}>
                <div class={styles.top_pane_wrapper} >
                    <Dynamic component={components[top()]} />
                </div>
                <div class={styles.left_block}>
                    <div class={mobileMenu() ? styles.main_menu_mobile : styles.main_menu} >
                        <div class={styles.main_menu_wrapper}  >
                            <Dynamic component={components[left()]} />
                        </div>
                    </div>
                </div>
                <div class={styles.main_content}>
                    <Dynamic component={components[central()]} />
                </div>
            </div>
        </div>
    );
}



