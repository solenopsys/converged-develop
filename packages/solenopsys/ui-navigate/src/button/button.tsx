import { createSignal, Component } from 'solid-js';

interface UiButtonProps {
  title: string;
}

export const UiButton: Component<UiButtonProps> = (props) => {
  const [state, setState] = createSignal(props.title);

  const handleClick = () => {
    setState("Button Clicked!");
  };

  return (
    <button onClick={handleClick} title={state()}>
      {state()}
    </button>
  );
};
 
