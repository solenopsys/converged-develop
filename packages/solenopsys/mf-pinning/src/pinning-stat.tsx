import { UiButton } from "@solenopsys/ui-controls";
import { UiProperties } from "@solenopsys/ui-lists";



import { createSignal, Component,createResource } from 'solid-js';
 

const fetchProperties = async () =>
    (await fetch(`/stat`)).json();



interface StatProps {
  values: {[key:string]:string};
  onButtonClick: () => void;
}

const PinnginStat: Component = () => {

  const [properties] = createResource( fetchProperties);
 

  return (
    <div>
      <span>{properties.loading && "Loading..."}</span>
      {properties() && <UiProperties properties={properties()}></UiProperties>}

     

      <UiButton title="HW"  />
    </div>
  );
};

export default PinnginStat;
