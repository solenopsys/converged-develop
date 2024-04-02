import { Component, For } from "@solenopsys/converged-renderer";

type FrameworProps = {
	name: string;
	description: string;
};

export const Framework = (props: FrameworProps) => {
	return (
		<div class="pd-10  border-2 shadow-lg rounded-md m-5 p-5 min-w-[200px] min-h-[100px]">
			<h3>{props.name}</h3>
			<div >
				<p>{props.description}</p>
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
