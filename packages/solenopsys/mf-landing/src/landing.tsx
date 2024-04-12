import { Component } from "@solenopsys/converged-renderer";
import { FrameworksList } from "./frameworks";

const frameworks = [
	{
		name: "Converged",
		description: "Ui framework",
		link: "/technology/converged",
		image: "/images/converged.png",
		
	},
	{
		name: "Detonation",
		description: "Computing framework",
		link: "/technology/detonation",
		image: "/images/detonation.png",
	},
	{
		name: "Combinatorics",
		description: "Industrial framework",
		link: "/technology/combinatorics",
		image: "/images/combinatorics.png",
	},
	{
		name: "Graphene",
		description: "Archeture framework",
		image: "/images/graphene.png",
	},
];

const ecosistem = [
	{
		name: "Solenopsys",
		description: "Community",
	},

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
	return () => (
		<>
			<div>
				<h2>Technologies</h2>
				<FrameworksList frameworks={frameworks}></FrameworksList>
			</div>
			<div>
				<h2>Ecosystem</h2>
				<FrameworksList frameworks={ecosistem}></FrameworksList>
			</div>
		</>
	);
};
