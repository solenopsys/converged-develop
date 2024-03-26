import { MdDynamic } from "./mddynamic"
import { UiTreeMenu } from '@solenopsys/ui-navigate';
import { useResource,useResolved,If } from "@solenopsys/converged-renderer";

const fetchMenuData = async (cid:string) =>
    (await fetch(`/dag?key=menu&cid=${cid}`)).json();




 

export const createMicrofronend = async (conf: any) => {
  console.log("CONF2",conf)
  const menuResource= await useResolved (fetchMenuData(conf.ipfs));
  console.log("RES LOAD",menuResource)
    return {
       //  "central":mdDynamicWrapper(),
        "central":(<MdDynamic  menuId={conf.ipfs} />),
      //   "left":LeftMenu()
        "left":(
          
          <div class="p-2">
            <UiTreeMenu class="" data={menuResource} baseUrl="/article" />
          </div>
            
                  
              
              
       
      )//  todo need params for menu
    } 
}
