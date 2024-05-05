import { createSignal, onMount } from "solid-js";
import {Component} from "@solenopsys/converged-renderer";
import { ColorSchemesService } from "@solenopsys/ui-themes";
import { createStore } from "solid-js/store";
import $ from "@solenopsys/converged-reactive";
import store from "@solenopsys/converged-reactive";


function RegisterTemplateComponent:Component=(props)=> {
  const logo = $(props.logo);
  const cs = store(ColorSchemesService);
  const ref = null; // SolidJS doesn't have ElementRef, you can use ref instead

  onMount(() => {
    cs.initColors(ref.style);
  });

  return (
    <body class="body-wrapper">
      <div class="panel">
        <ui-logo logo={logo()} />
        {/* Router outlet equivalent in SolidJS would be a Switch with Routes */}
      </div>
    </body>
  );
}

export default RegisterTemplateComponent;