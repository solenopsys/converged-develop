import { Component, If } from "@solenopsys/converged-renderer";
import Prism from 'prismjs';


interface HighlightProps {
	code: string;
	language: string;
	inline?: boolean;
}

export const Highlight: Component<HighlightProps> = (props) => {
  Prism.highlightAll();
	return (
		<>
			<If when={props.inline}>
				<code class={"language-" + props.language}>{props.code}</code>
			</If>
			<If when={!props.inline}>
				<pre class=" p-2 m-2 border-2 rounded-md border-gray-300 background-gray-100 ">
					<code class={"language-" + props.language}>{props.code}</code>
				</pre>
			</If>
		</>
	);
};
