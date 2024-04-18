import { Component } from "@solenopsys/converged-renderer";
import { FrameworksList } from "./frameworks";
import { Banner } from "./banner";

import { frameworks, ecosistem } from "./conf";

export const HwLanding: Component = (conf: any) => {
	console.log("HW LANDING", conf);
	return () => (
		<>
			<Banner />
			<div class="flex items-center justify-center ">
				<div class="flex flex-col ">
					<div>
						<h2 class="text-center">Frameworks for Ecosystem</h2>
						<FrameworksList frameworks={frameworks}></FrameworksList>
					</div>
					<div>
						<h2 class="text-center">Ecosystem parts</h2>
						<FrameworksList frameworks={ecosistem}></FrameworksList>
					</div>
				</div>
			</div>
		</>
	);
};
