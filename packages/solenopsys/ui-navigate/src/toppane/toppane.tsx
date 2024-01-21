import { Component, createSignal } from '@solenopsys/converged';
import styles from './TopPane.module.css';
import { TabsProps, UiTabs } from '../tabs/tabs';
import { UiLogo } from '../logo/logo';



interface TopPaneProps {
  logo: string;
  tabsState: TabsProps;
  actions: ActionButton[];
  tabSelect: (tab: string) => void;
  actionSelect: (action: string) => void;
}

export const UiTopPane: Component<TopPaneProps> = (props) => {
  const [logo] = createSignal(props.logo);
  const [tabs] = createSignal(props.tabsState);

  return (
    <div class={styles['top-pane']} >

      <div class={styles['logo-container']}>
        <UiLogo logo={logo()}></UiLogo>
      </div>
      <div class={styles['tabs-container']}>

        <UiTabs
          // tabClick={(event) => props.tabSelect(event)}
          selected={tabs().selected}
          tabs={tabs().tabs}
          tabClick={tabs().tabClick}
          
        ></UiTabs>
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
