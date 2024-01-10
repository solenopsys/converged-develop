import { lazy, Component, createSignal } from "solid-js";


interface Props {
    component: string;
    props: any;
}

const DunamicLazy: Component<Props> = (props) => {
    const [libName, compName] = props.component.split(":")
    const LoadedComp = lazy(async() => await import(libName)[compName]);

    return (<LoadedComp props={...props.props} />)
}