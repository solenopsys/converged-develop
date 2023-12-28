import { render } from 'solid-js/web';
import { createSignal, For } from 'solid-js';
import Butt from './butt';


function App() {
  const [cats, setCats] = createSignal([
    { id: 'J---aiyznGQ', name: 'Keyboard Cat' },
    { id: 'z_AbfPXTKms', name: 'Maru' },
    { id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
  ]);
  
  return (
    <div>
    <For each={cats()}>{(cat, index) =>
      <li>
        <a target="_blank" href={`https://www.youtube.com/watch?v=${cat.id}`}>
          {index() + 1}: {cat.name}
        </a>
       
      </li>
    }</For>
    <Butt />
  </div>
  );
}

render(() => <App />, document.getElementById('app'))