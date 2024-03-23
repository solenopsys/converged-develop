import { MdDynamic } from "./mddynamic"
import { UiTreeMenu } from '@solenopsys/ui-navigate';
import { LeftMenu } from "./for-test"
 

export const createMicrofronend = (conf: any) => {
    console.log("CONF2",conf)
    return {
         "central":(<mdDynamicWrapper/>),
       //  "central":(<MdDynamic  />),
         "left":LeftMenu
      //   "left":(<UiTreeMenu />)  todo need params for menu
    } 
}
