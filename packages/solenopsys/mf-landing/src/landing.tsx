import { Component } from "@solenopsys/converged-renderer";
import { FrameworksList } from "./frameworks";

const frameworks = [
	{
		name: "Converged",
		description: "Ui framework",
		link: "/technology/converged",
	},
	{
		name: "Detonation",
		description: "Computing framework",
		link: "/technology/detonation",
	},
	{
		name: "Combinatorics",
		description: "Industrial framework",
		link: "/technology/combinatorics",
	},
	{
		name: "Graphene",
		description: "Archeture framework",
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
		name: "Matrix",
		description: "Code driven rules system",
		link: "/technologies/matrix",
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
