import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function getPlants(searchTerm?: string) {
	try {
		const currentUserId = await getUserId();
		const whereClause: any = { user_id: currentUserId };

		if (searchTerm) {
			whereClause.name = { contains: searchTerm, mode: "insensitive" };
		}

		const userPlants = await prisma.plant.findMany({
			where: whereClause,
			orderBy: { created_at: "desc" },
		});

		revalidatePath("/");
		return { success: true, userPlants };
	} catch (error) {
		console.error("Error fetching plants:", error);
		throw new Error("Failed to fetch plants");
	}
}
