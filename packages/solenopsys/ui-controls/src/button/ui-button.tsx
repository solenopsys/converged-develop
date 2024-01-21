import { createSignal, Component ,createEffect} from '@solenopsys/converged';
import { render } from 'solid-js/web';

 
import styles from "./ui-button.module.css";



interface UiButtonProps {
  title: string;
  onButtonClick?: () => void;
}

export const UiButton: Component<UiButtonProps> = (props) => {
  const [state, setState] = createSignal(props.title);

  createEffect(() => {
    console.log('Title', state());
});
  

  const handleClick = () => {
    setState("Button Clicked!");
    console.log("CLICK", state());
    if (props.onButtonClick) {
      props.onButtonClick();
    }
  };

  

  return (
    <>yes
      <button class={styles.button} onClick={handleClick} title={state()}>
        {state()} 
      </button>
    </>
  );
};


export default UiButton