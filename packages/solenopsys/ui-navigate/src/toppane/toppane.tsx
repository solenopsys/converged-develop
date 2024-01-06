import { Component, createSignal } from 'solid-js';
import { UiTabs, UiLogo } from '@solenopsys/ui-navigate';
import styles from './TopPane.module.css'; 

 

interface TopPaneProps {
  logo: string;
  tabsState: TabsProps;
  actions: ActionButton[];
  tabSelect: (tab: string) => void;
  actionSelect: (action: string) => void;
}

export const UiTopPane: Component<TopPaneProps> = (props) => {
  const [logo] = createSignal(props.logo);

  return (
    <div class={styles['top-pane']} if={props.config}>
      <div>
        <div class={styles['logo-container']}>
          <UiLogo logo={logo()}></UiLogo>
        </div>
        <div class={styles['tabs-container']}>
           <UiTabs
           // tabClick={(event) => props.tabSelect(event)}
          //  selected={props.tabsState.current}
            tabs={props.tabsState.tabs}
          ></UiTabs> 
        </div>
      </div>
      <div class={styles['actions-container']}>
        {/* <ui-button-group
          actions={props.config.actions}
          emmitAction={(event) => props.actionSelect(event)}
        ></ui-button-group> */}
      </div>
    </div>
  );
};
