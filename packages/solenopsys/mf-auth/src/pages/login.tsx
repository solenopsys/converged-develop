import { useRouter, useLocation } from "solid-router";
import {
	CryptoWrapper,
	Hash,
	SeedClipper,
	Tokens,
} from "@solenopsys/fl-crypto";
import { SessionsService } from "../SessionsService";
import { KeysService } from "../KeysService";
import $ from "@solenopsys/converged-reactive";

import { Component } from "@solenopsys/converged-renderer";

const cw = new CryptoWrapper(window.crypto);

const LoginComponent: Component = () => {
	const login = $("");
	const password = $("");
	const error = $(undefined);
	const clipper = $(null);
	const result = $("");
	const [, { navigate }] = useRouter();

	const load = async () => {
		const h = new Hash(cw);
		const hash = await h.genHash(password(), login());
		try {
			const res = await SESSION_SERVICE.key(hash);
			const privateKey = await clipper().decryptData(
				res.encryptedKey,
				password(),
			);

			console.log("succesed", res, privateKey);

			const dayMills = 24 * 60 * 60 * 1000;
			const expired = new Date().getTime() + 14 * dayMills;

			const t = new Tokens(cw);
			const token = await t.createToken(
				{ user: res.publicKey, access: "simple", expired: expired.toString() },
				privateKey,
			);

			await SESSION_SERVICE.saveSession(res.publicKey, token);

			navigate("/status", { state: token });
			console.log("succes token", token);
		} catch (e) {
			result(`Error: ${e.message}`);
			error(e);
		}
	};

	
	setClipper(new SeedClipper("AES-CBC", cw));
	

	return (
		<div>
			<h4>Login</h4>
			<div class="field-block">
				<div>
					<UiTextField
						title="Login"
						value={login()}
						onInput={(e) => login(e.target.value)}
					/>
				</div>
				<div class="field-description">Account name</div>
			</div>
			{login() && (
				<>
					<h4>Password</h4>
					<div class="field-block">
						<div>
							<UiTextField
								title="Password"
								password={true}
								value={password()}
								onInput={(e) => password(e.target.value)}
							/>
						</div>
						<div class="field-description">password for seed decryption</div>
					</div>
					{password() && <UiButton title="Login" onClick={load} />}
				</>
			)}
			<div class="field-block">
				<a
					style={{
						cursor: "pointer",
						color: "red",
						textDecoration: "underline",
					}}
					href="/register"
				>
					register
				</a>
			</div>
			<div class="field-block">{error() && `Error: ${error().message}`}</div>
		</div>
	);
};

export default LoginComponent;