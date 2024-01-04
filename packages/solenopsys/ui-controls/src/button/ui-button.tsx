import { createSignal, Component ,createEffect} from 'solid-js';
import { render } from 'solid-js/web';

 
import styles from "./button.module.css";



interface UiButtonProps {
  title: string;
  onButtonClick?: () => void;
}

export const UiButton: Component<UiButtonProps> = (props) => {
  const [state, setState] = createSignal(props.title);

  createEffect(() => {
    console.log('The count is now', state());
});
  

  const handleClick = () => {
    setState("Button Clicked!");
    console.log("CLICK", state());
    if (props.onButtonClick) {
      props.onButtonClick();
    }
  };

  

  return (
    <>
      <button class={styles.button} onClick={handleClick} title={state()}>
        {state()} 
      </button>
    </>
  );
};
