import { createSignal, Component, createEffect } from 'solid-js';
import styles from "./ui-properties.module.css";

interface UiPropertiesProps {
  properties: { [key: string]: string };
}

export const UiProperties: Component<UiPropertiesProps> = (props) => {
  const [state, setState] = createSignal(props.properties);

  return (
    <>List
      <div class={styles.button}>
        {Object.keys(state()).map(key => (
          <div>{key} -- {state()[key]}</div>
        ))}
      </div>
    </>
  );
};
