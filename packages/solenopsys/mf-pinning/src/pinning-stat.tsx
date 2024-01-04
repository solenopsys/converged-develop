import { UiButton } from "@solenopsys/ui-controls";
import { UiProperties } from "@solenopsys/ui-lists";
import { UiTreeMenu } from "@solenopsys/ui-navigate";

import { createSignal, Component,createResource } from 'solid-js';
 

const fetchProperties = async () =>
    (await fetch(`/stat`)).json();

    const fetchMenuData = async () =>
    (await fetch(`/data.json`)).json();



interface StatProps {
  values: {[key:string]:string};
  onButtonClick: () => void;
}

const PinnginStat: Component = () => {

  const [properties] = createResource( fetchProperties);
  const [menuData] = createResource( fetchMenuData);


  return (
    <div>
      <span>{properties.loading && "Loading..."}</span>

      {menuData() && <UiTreeMenu data={menuData()}></UiTreeMenu>}


      {properties() && <UiProperties properties={properties()}></UiProperties>}

      <UiButton title="HW"  />
    </div>
  );
};

export default PinnginStat;
