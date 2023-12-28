import { createSignal } from "solid-js";

const [num, setNum] = createSignal( 10   );


function Butt() {
  return <div>Work {num()} <button onClick={() => setNum(num()+1)} >increment</button></div>;
}

export default Butt;
