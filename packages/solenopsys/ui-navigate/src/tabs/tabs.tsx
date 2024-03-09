import { signal, Component } from "@solenopsys/converged";
import styles from './tabs.module.css';

export type Tab = {
    id: string,
    title: string
}

export type TabsProps<P = {}> = P & {
    selected: string,
    tabs: Tab[],
    tabClick?: (tabId: string) => void;
};

export type ParentComponent<P = {}> = Component<TabsProps<P>>;
export const UiTabs: ParentComponent = (props) => {
    const [selected, setSelected] = signal<string | undefined>(props.selected);
    const [tabs] = signal(props.tabs);

    const tabClickHandler = (tabId: string) => {
        setSelected(tabId);
        if (props.tabClick) {
            props.tabClick(tabId);
        }
    };

    return (
        <div style={{ display: "flex" }}>
            {tabs()?.map((tab) => (
               
                    <div
                        onClick={() => tabClickHandler(tab.id)}
                        classList={{ [styles.tab_style]: true, [styles.selected]: selected() === tab.id }}

                    >
                        {tab.title}
                    </div>
            ))}
        </div>
    );
};

