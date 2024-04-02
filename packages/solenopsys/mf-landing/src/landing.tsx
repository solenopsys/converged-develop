import { Component } from "@solenopsys/converged-renderer";
import { FrameworksList } from "./frameworks";

const frameworks = [
	{
		name: "Converged",
		description: "Ui framework",
	},
	{
		name: "ShowckWaves",
		description: "Distributed computing framework",
	},
	{
		name: "Combinatorics",
		description: "Industrial framework",
	},
	{
		name: "Matrix",
		description: "Code driven rules system",
	},
	{
		name: "Graphene",
		description: "Decentralized, colabarative R&D infrastructure",
	},
];

export const HwLanding: Component = (conf: any) => {
	console.log("HW LANDING", conf);
	return () => (
		<div>
			<h1>Frameworks</h1>
			<FrameworksList frameworks={frameworks}></FrameworksList>
		</div>
	);
};
