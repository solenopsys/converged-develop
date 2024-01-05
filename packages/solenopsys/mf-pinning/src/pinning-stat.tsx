import { UiButton } from "@solenopsys/ui-controls";
import { UiProperties } from "@solenopsys/ui-lists";
import { UiTreeMenu } from "@solenopsys/ui-navigate";
import { MdView } from "@solenopsys/ui-content";


import { createSignal, Component,createResource } from 'solid-js';
 

const fetchProperties = async () =>
    (await fetch(`/stat`)).json();

    const fetchMenuData = async () =>
    (await fetch(`/dag?key=menu&cid=bafyreicpz3bnf3xqabciyypjssfue54csygb3fn4soz3wbztppvzdfahsy`)).json();

    const fetchMdData = async () =>
    (await fetch(`/dag?key=md&cid=bafyreienpilu4q7xgxvwyeb6prawxju2jq6axojffv63v4744ncogem4gy`)).json();
 

interface StatProps {
  values: {[key:string]:string};
  onButtonClick: () => void;
}

const PinnginStat: Component = () => {

  const [properties] = createResource( fetchProperties);
  const [menuData] = createResource( fetchMenuData);
  const [mdData] = createResource( fetchMdData);


  return (
    <div>
      <span>{properties.loading && "Loading..."}</span>
      {properties() && <UiProperties properties={properties()}></UiProperties>}

      {menuData() && <UiTreeMenu data={menuData()}></UiTreeMenu>}

      {mdData() && <MdView data={mdData()}></MdView>}

      <UiButton title="HW"  />
    </div>
  );
};

export default PinnginStat;
