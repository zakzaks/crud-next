import React from "react";
import PlantCard from "./PlantCard";
import { getPlantById } from "@/actions/plant.action";
import { stackServerApp } from "@/stack";
import { SignIn } from "@stackframe/stack";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	// Extract the id from the slug by splitting on the delimiter
	const [id] = (await params).slug.split("--");
	const plant = await getPlantById(id);
	return {
		title: plant ? plant.name : "Plant Details",
		description: plant ? plant.description : "Plant details page",
	};
}

async function page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const user = await stackServerApp.getUser();
	const [id] = slug.split("--");
	const plant = await getPlantById(id);

	if (!user) {
		return <SignIn />;
	}

	return (
		<div className="max-w-7xl mx-auto px-4 py-4">
			<PlantCard plant={plant} />
		</div>
	);
}

export default page;
