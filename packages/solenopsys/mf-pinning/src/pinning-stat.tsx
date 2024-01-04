import { UiButton } from "@solenopsys/ui-navigate";
import { createSignal, Component } from 'solid-js';

interface UiButtonProps {
  title: string;
  onButtonClick: () => void;
}

const PinnginStat: Component = () => {
  

  return (
    <div>
      <UiButton title="HW"   />
     </div>
  );
};

export default PinnginStat;
