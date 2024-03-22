import {  Component } from '@solenopsys/converged-renderer';

import $ from '@solenopsys/converged-reactive';;

 
import styles from "./ui-button.module.css";



interface UiButtonProps {
  title: string;
  onButtonClick?: () => void;
}

export const UiButton: Component<UiButtonProps> = (props) => {
  const state = $(props.title);

  $.effect(() => {
    console.log('Title', state());
});
  

  const handleClick = () => {
    state("Button Clicked!");
    console.log("CLICK", state());
    if (props.onButtonClick) {
      props.onButtonClick();
    }
  };

  

  return ()=>{
    return<>
      <button class={styles.button} onClick={handleClick} title={state()}>
        {state()} 
      </button>
    </>
  };
};


export default UiButton