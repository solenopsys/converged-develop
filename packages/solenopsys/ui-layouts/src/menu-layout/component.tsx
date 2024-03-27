import styles from "./styles.module.css";


export const MenuLayout = (props: any) => {
    const mobileMenu = $(false);

    return (
        <div class={styles.left_block}>
        <div
            class={
                mobileMenu() ? styles.main_menu_mobile : styles.main_menu
            }
        >
            <div class={styles.main_menu_wrapper}>
                <If when={compLeft}>
                    <Dynamic component={compLeft} />
                </If>
                <If when={!compLeft}>
                    loading..
                </If>
         
            </div>
        </div>
    </div>
    <div class={styles.main_content}>
        <If when={compCentral}>
            <Dynamic component={compCentral} />
        </If>
        <If when={!compCentral}>
                    loading...
                    <UiButton title="bla"></UiButton>
                </If>
    </div>
        )
}