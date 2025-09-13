"use client";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { useState } from "react";
import { getPlants } from "@/actions/plant.action";

type Plant = Awaited<ReturnType<typeof getPlants>>;
interface InventoryTableProps {
	plants: Plant;
}

export default function InventoryTable({ plants }: InventoryTableProps) {
	const [selectedCategory, setSelectedCategory] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	// Filter plants by name and category ( if selected )
	const filteredPlants = plants?.userPlants?.filter(
		(plant) =>
			plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(selectedCategory === "" || plant.category === selectedCategory)
	);

	return (
		<div className="w-full">
			<div className="flex items-center gap-2 py-4">
				<div className="relative max-w--sm w-full">
					<Input
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Filter plants..."
						className="pl-10"
					/>
					<Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
				</div>
				<Combobox
					value={selectedCategory}
					onChange={(value) => setSelectedCategory(value)}
				/>
			</div>

			<Table>
				<TableCaption>A list of your plants.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Plant ID</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Category</TableHead>
						<TableHead className="text-right">Price</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredPlants.map((plants) => (
						<TableRow key={plants.id}>
							<TableCell className="font-medium">{plants.id}</TableCell>
							<TableCell>{plants.name}</TableCell>
							<TableCell>{plants.category}</TableCell>
							<TableCell className="text-right font-bold">
								{plants.price}
							</TableCell>
							<TableCell className="space-x-2">
								<button className="text-blue-500 hover:underline">Edit</button>
								<button className="text-blue-500 hover:underline">
									Delete
								</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
