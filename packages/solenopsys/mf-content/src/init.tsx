const fetchMenuData = async () =>
    (await fetch(`/dag?key=menu&cid=bafyreicpz3bnf3xqabciyypjssfue54csygb3fn4soz3wbztppvzdfahsy`)).json();


const [menuData] = createResource(fetchMenuData);


const LeftMenu=() => {
    return (
        <>
            {menuData() && <UiTreeMenu style={{ margin: '20px' }} data={menuData()} baseUrl="/article" />}
        </>
    );
}



const mdDynamicWrapper = () => {
    const params = useParams();

    return <>
        <Show when={params.id} keyed ><MdDynamic /></Show>
    </>;
};


components[MD] = () => {

    return (
        <Router>
            <Route path="/article/:id/" component={mdDynamicWrapper} />
        </Router>
    )
}