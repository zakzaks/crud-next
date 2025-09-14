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
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import CreateDialog from "./CreateDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

type Plant = Awaited<ReturnType<typeof getPlants>>;
interface InventoryTableProps {
	plants: Plant;
}

export default function InventoryTable({ plants }: InventoryTableProps) {
	const [selectedCategory, setSelectedCategory] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	const router = useRouter();

	// Filter plants by name and category ( if selected )
	const filteredPlants = plants?.userPlants?.filter(
		(plant) =>
			plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(selectedCategory === "" || plant.category === selectedCategory)
	);

	if (!plants) {
		return (
			<div className="w-full space-y-4">
				<div className="flex items-center gap-2 py-4">
					<Skeleton className="h-10 w-full max-w-sm" />
					<Skeleton className="h-10 w-32" />
					<Skeleton className="h-10 w-32" />
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>
								<Skeleton className="w-full h-4" />
							</TableHead>
							<TableHead>
								<Skeleton className="w-full h-4" />
							</TableHead>
							<TableHead>
								<Skeleton className="w-full h-4" />
							</TableHead>
							<TableHead>
								<Skeleton className="w-full h-4" />
							</TableHead>
							<TableHead>
								<Skeleton className="w-full h-4" />
							</TableHead>
							<TableHead className="text-right">
								<Skeleton className="w-full h-4" />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: 5 }).map((_, i) => (
							<TableRow key={i}>
								<TableCell>
									<Skeleton className="w-full h-4" />
								</TableCell>
								<TableCell>
									<Skeleton className="w-full h-4" />
								</TableCell>
								<TableCell>
									<Skeleton className="w-full h-4" />
								</TableCell>
								<TableCell>
									<Skeleton className="w-full h-4" />
								</TableCell>
								<TableCell>
									<Skeleton className="w-full h-4" />
								</TableCell>
								<TableCell className="text-right">
									<Skeleton className="w-full h-4" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="flex items-center gap-2 py-4">
				<div className="relative max-w-sm w-full">
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
				<CreateDialog />
			</div>

			<Table>
				<TableCaption>A list of your plants.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Plant ID</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Category</TableHead>
						<TableHead className="text-right">Price</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredPlants.map((plants) => {
						const slugifiedName = plants.name
							.toLowerCase()
							.replace(/\s+/g, "-");
						const slug = `${plants.id}--${slugifiedName}`;
						const plantUrl = `/plants/${slug}`;

						return (
							<TableRow key={plants.id} onClick={() => router.push(plantUrl)}>
								<TableCell className="font-medium">{plants.id}</TableCell>
								<TableCell>{plants.name}</TableCell>
								<TableCell>{plants.category}</TableCell>
								<TableCell className="text-right font-bold">
									{plants.price}
								</TableCell>
								<TableCell className="text-right">
									<div
										className="flex justify-end items-center gap-2"
										onClick={(e) => e.stopPropagation()}
									>
										{/* Edit Button with Tooltip */}
										<div className="group relative hover:cursor-pointer">
											<EditDialog plant={plants} />
											<span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none z-10">
												Edit
											</span>
										</div>
										{/* Divider */}
										<span className="h-5 w-px bg-gray-300 mx-1" />
										{/* Delete Button with Tooltip */}
										<div className="group relative hover:cursor-pointer">
											<DeleteDialog plant={plants} />
											<span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none z-10">
												Delete
											</span>
										</div>
									</div>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
