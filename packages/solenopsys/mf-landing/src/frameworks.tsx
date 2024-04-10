import { Component, For, If } from "@solenopsys/converged-renderer";

type FrameworProps = {
	name: string;
	description: string;
	link?: string;
};

export const Framework = (props: FrameworProps) => {
	return (
		<div class="pd-10  border-2 shadow-lg rounded-md m-5 p-5 min-w-[200px] min-h-[100px]">
			<h3>{props.name}</h3>
			<div >
				<p>{props.description}</p>
			</div>

			<If when={props.link}>
				<div class="font-size-3">
					<a href={props.link}>Learn more...</a>
				</div>

			</If>
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
