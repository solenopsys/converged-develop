import { render } from 'solid-js/web';
import { Component, createSignal, For } from 'solid-js';
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

export default App



const Counter: Component = () => {
  const [count, setCount] = createSignal(0);
  return (
      <div onClick={() => setCount((c) => c + 1)}>
          {count()}
      </div>
  );
};

