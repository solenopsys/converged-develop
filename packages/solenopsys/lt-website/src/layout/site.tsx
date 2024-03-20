
import "./layout.css"
import { lazy, Component } from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-renderer";
import { UiTopPane } from "@solenopsys/ui-navigate"
import { SiteLayout } from "@solenopsys/ui-layouts"

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

    const tabs = navigateToTab(props.navigate);

    const topComponentName= $.signal("")
    const centralComponentName = $.signal("")
    const leftComponentName= $.signal("")

    const components: { [key: string]: Component } = {}

    const TopPanel = () => {
        const navigate = useNavigate();
        const tabClick = async (tabId: string) => {
            navigate(`${tabId}/`)

            const rt = props.routes[tabId];
            const importPath = rt.module.replace("@", "/packages/")

            const importModule = await import(importPath)
            const componentsMap = importModule.createMicrofronend()
            Object.keys(componentsMap).forEach(
                key => {
                    components[key] = componentsMap[key]
                }
               
            )
            centralComponentName.set("central")
            leftComponentName.set("left")

        }
        return <UiTopPane logo={props.logo} tabsState={{ selected: "/solenopsys", tabs: tabs, tabClick: tabClick }} />
    }

    components["top"] = () => { return (<TopPanel/>) }
    topComponentName.set("top")

    return () => {
        return (<SiteLayout
            components={components}
            top={topComponentName()}
            central={centralComponentName()}
            left={leftComponentName()}
        />)
    }
}

