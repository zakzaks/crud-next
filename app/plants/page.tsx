import { stackServerApp } from "@/stack";
import { SignIn, SignUp } from "@stackframe/stack";

export default async function PlantsPage() {
	const user = await stackServerApp.getUser();
	const app = stackServerApp.urls;

	return (
		<>
			{user ? (
				<>
					<h1 className="text-2xl font-bold">Plants</h1>
					<p className="mt-2">Explore our collection of plants.</p>
				</>
			) : (
				<div className="flex justify-center items-center mt-20">
					<SignIn />
				</div>
			)}
		</>
	);
}
