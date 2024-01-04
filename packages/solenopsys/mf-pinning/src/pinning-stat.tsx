import { UiButton } from "@solenopsys/ui-navigate";
import {Counter} from "./counter"
 
import { createSignal, Component } from 'solid-js';

interface UiButtonProps {
  title: string;
  onButtonClick: () => void;
}

const PinnginStat: Component = () => {
  

  return (
    <div>
      <UiButton title="{'ok1'}"   />
      <Counter/>
     </div>
  );
};

export default PinnginStat;
