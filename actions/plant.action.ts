import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import type { Prisma } from "@/lib/generated/prisma";

export async function getPlants(searchTerm?: string) {
	try {
		const currentUserId = await getUserId();
		const whereClause: Prisma.PlantsWhereInput = { userId: currentUserId };

		if (searchTerm) {
			whereClause.name = { contains: searchTerm, mode: "insensitive" };
		}

		const userPlants = await prisma.plants.findMany({
			where: whereClause,
			orderBy: { createdAt: "desc" },
		});

		return { success: true, userPlants };
	} catch (error) {
		console.error("Error in get plants:", error);
		throw new Error("Failed to fetch plants");
	}
}

export async function getPlantById(id: string) {
	return await prisma.plants.findUnique({
		where: { id },
	});
}
