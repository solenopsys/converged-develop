import { MdDynamic } from "./mddynamic"
import { UiTreeMenu } from '@solenopsys/ui-navigate';

export const createMicrofronend = (conf: any) => {
    return {
         "central":(<MdDynamic />),
         "left":(<UiTreeMenu />)
    } 
}
