
import "./layout.css"
import { lazy, Component,KeepAlive,createContext } from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";
import { UiTopPane } from "@solenopsys/ui-navigate"
import { SiteLayout } from "@solenopsys/ui-layouts"
import { useNavigate } from "@solenopsys/converged-router";
import { loadModule } from "@solenopsys/ui-state";


interface Props {
    navigate: { [path: string]: string };
    logo: string;
    routes: {
        [path: string]: {
            module: string,
            data: {
                ipfs: string
            }
        }
    }
}


function navigateToTab(navigate: any) {
    return Object.keys(navigate).map((key: string) => { return { id: key, title: navigate[key]['title'] } });
}




export const Site: Component<Props> = (props) => {
    console.log("SITE RERENDER")

    const SiteContext= createContext<any>({
        
    })

    const tabs = navigateToTab(props.navigate);

    const topComponentName= $("")
    const centralComponentName = $("")
    const leftComponentName= $("")

    const mfCache = new MFCache();

   

    const tabClick = async (tabId: string) => {
       //  const navigate = useNavigate();
   //     navigate(`${tabId}/`)
         console.log("CLICK TAB",tabId);

         const rt = props.routes[tabId];
         const importPath = rt.module

        await  mfCache.load(importPath,rt.data)

         centralComponentName("central")
         leftComponentName("left")

     }


 

    console.log("TABS-01")
    mfCache.set("top",    <UiTopPane logo={props.logo} tabsState={{ selected: "/solenopsys", tabs: props.navigate.tabs, tabClick: tabClick }} /> )
    topComponentName("top")

    return () => {
        console.log("SiteLayout RERENDER" )
        return (<SiteContext.Provider>
            <SiteLayout
                components={mfCache.components}
            />
        </SiteContext.Provider>)    
      
    }
}

