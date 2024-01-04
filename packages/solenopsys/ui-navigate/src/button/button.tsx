import { createSignal, Component ,createEffect} from 'solid-js';
import { render } from 'solid-js/web';

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
      <button onClick={handleClick} title={state()}>
        {state()} 
      </button>
    </>
  );
};
