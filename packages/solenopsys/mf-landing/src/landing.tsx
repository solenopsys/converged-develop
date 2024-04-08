import { Component } from "@solenopsys/converged-renderer";
import { FrameworksList } from "./frameworks";

const frameworks = [
	{
		name: "Converged",
		description: "Ui framework",
		link: "/technologies/converged",
	},
	{
		name: "ShockWaves",
		description: "Distributed computing framework",
		link: "/technologies/shockwaves",
	},
	{
		name: "Combinatorics",
		description: "Industrial framework",
		link: "/technologies/combinatorics",
	},
	{
		name: "Matrix",
		description: "Code driven rules system",
		link: "/technologies/matrix",
	},
];


const ecosistem = [
	{
		name: "Platform",
		description: "Decentrasized platform",
	},

	{
		name: "Robotization",
		description: "DeFi platform for startups",
	},

	{
		name: "Graphene",
		description: "Decentralized, colabarative R&D infrastructure",
	},
];

export const HwLanding: Component = (conf: any) => {
	console.log("HW LANDING", conf);
	return () => (<>
		<div>
			<h1>Technologies</h1>
			<FrameworksList frameworks={frameworks}></FrameworksList>
		</div>
		<div>
			<h1>Ecosystem</h1>
			<FrameworksList frameworks={ecosistem}></FrameworksList>
		</div>
	</>

	);
};
