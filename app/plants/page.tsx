import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack";
import { SignIn } from "@stackframe/stack";

export default async function PlantsPage() {
	const user = await stackServerApp.getUser();
	// const app = stackServerApp.urls;

	return (
		<>
			{user ? (
				<div className="max-w-7xl mx-auto px-4">
					<InventoryTable />
				</div>
			) : (
				<div className="flex justify-center items-center mt-20">
					<SignIn />
				</div>
			)}
		</>
	);
}
