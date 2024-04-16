import { Component } from "@solenopsys/converged-renderer";
import { FrameworksList } from "./frameworks";
import { Banner } from "./banner";

import { frameworks, ecosistem } from "./conf";

export const HwLanding: Component = (conf: any) => {
	console.log("HW LANDING", conf);
	return () => (
		<>
			<Banner />
			<div class="m-10">
				<div>
					<h2>Technologies</h2>
					<FrameworksList frameworks={frameworks}></FrameworksList>
				</div>
				<div>
					<h2>Ecosystem</h2>
					<FrameworksList frameworks={ecosistem}></FrameworksList>
				</div>
			</div>
		</>
	);
};
