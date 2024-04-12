import { Component, For, If } from "@solenopsys/converged-renderer";
import styles from "./styles/frameworks.module.css";

type FrameworProps = {
	name: string;
	description: string;
	link?: string;
	image?: string;
};

export const Framework = (props: FrameworProps) => {
	return (
		<div
			class={` ${styles.shadow_transition} border-2 rounded-md min-w-[300px]  m-5  min-h-[100px]`}
		>
			<If when={props.image}>
				<img src={props.image} width={300} class="rounded-t-md"  /> 
			</If>

			<div class="p-7 ">
				<b>{props.name}</b>
				<div>
					<p>{props.description}</p>
				</div>

				<If when={props.link}>
					<div class="font-size-3">
						<a href={props.link}>Learn more...</a>
					</div>
				</If>
			</div>
		</div>
	);
};

export const FrameworksList = (props: { frameworks: FrameworProps[] }) => {
	return () => {
		return (
			<div class="flex flex-row flex-wrap ">
				{props.frameworks.map((movie: any) => (
					<Framework {...movie} />
				))}
			</div>
		);
	};
};
