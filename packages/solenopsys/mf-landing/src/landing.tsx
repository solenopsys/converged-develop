import { Component } from "@solenopsys/converged-renderer";
import { FrameworksList } from "./frameworks";

const frameworks = [
	{
		name: "Converged",
		description: "Ui framework",
	},
	{
		name: "ShockWaves",
		description: "Distributed computing framework",
	},
	{
		name: "Combinatorics",
		description: "Industrial framework",
	},
	{
		name: "Robotization",
		description: "DeFi platform for startups",
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
