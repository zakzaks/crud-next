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

const plants = [
	{
		id: "PL001",
		name: "Fiddle Leaf Fig",
		category: "Indoor",
		price: "$150.00",
	},
];

export default function InventoryTable() {
	const [searchTerm, setSearchTerm] = useState("");
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
				<Combobox />
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
					{plants.map((plant) => (
						<TableRow key={plant.id}>
							<TableCell className="font-medium">{plant.id}</TableCell>
							<TableCell>{plant.name}</TableCell>
							<TableCell>{plant.category}</TableCell>
							<TableCell className="text-right font-bold">
								{plant.price}
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
