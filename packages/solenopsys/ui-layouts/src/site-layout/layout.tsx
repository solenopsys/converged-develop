import { Dynamic } from "solid-js/web";
import { signal, Component, createResource } from "@solenopsys/converged";
import styles from "./layout.module.css"


import { UiButton } from '@solenopsys/ui-controls';

interface MdItemComponentProps {
    top: string,
    central: string,
    left: string,
    components: { [name: string]: Component }
}


export const SiteLayout: Component<MdItemComponentProps> = (props) => {
    const [mobileMenu, mobileMenuTop] = signal(false);
    const [top, setTop] = signal(props.top);
    const [central, setCentral] = signal(props.central);
    const [left, setLeft] = signal(props.left);


    return (
        <div class={styles.body_wrapper}>
            <div class={styles.full_height}>
                <div class={styles.top_pane_wrapper} >
                    <Dynamic component={props.components[top()]} />
                </div>
                <div class={styles.left_block}>
                    <div class={mobileMenu() ? styles.main_menu_mobile : styles.main_menu} >
                        <div class={styles.main_menu_wrapper}  >
                            <Dynamic component={props.components[left()]} />
                        </div>
                    </div>
                </div>
                <div class={styles.main_content}>
                    <UiButton title="bla" ></UiButton>
                    <Dynamic component={props.components[central()]} />
                </div>
            </div>

        </div>
    );
}






