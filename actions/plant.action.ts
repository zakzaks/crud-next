"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import type { Prisma } from "@/lib/generated/prisma";
import { revalidatePath } from "next/cache";

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

export async function createPlant(data: Prisma.PlantsCreateInput) {
	try {
		const currentUserId = await getUserId();
		if (!currentUserId) return;
		console.log("Creating plant with data:", data);

		const newPlant = await prisma.plants.create({
			data: {
				...data,
				userId: currentUserId,
			},
		});
		revalidatePath("/plants");
		return newPlant;
	} catch (error) {
		console.error("Error Creating Plant:", error);
		throw error;
	}
}

export async function editPlant(
	id: string, //identify which plant we are editing
	data: Prisma.PlantsUpdateInput
) {
	try {
		const currentUserId = await getUserId();
		await prisma.plants.update({
			where: { id },
			data: {
				...data,
				userId: currentUserId,
			},
		});
		revalidatePath("/plants");
	} catch (error) {
		console.error("Error updating plant:", error);
		throw error;
	}
}

export async function deletePlant(
	id: string //identify which plant we are deleting
) {
	try {
		const currentUserId = await getUserId();
		if (!currentUserId) return;

		const deletedPlant = await prisma.plants.delete({
			where: { id },
		});
		revalidatePath("/plants");
		return deletedPlant;
	} catch (error) {
		console.error("Error deleting plant:", error);
		throw error;
	}
}
