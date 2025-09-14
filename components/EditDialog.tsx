import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { EditIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Combobox } from "./ui/combo-box";
import { Textarea } from "./ui/textarea";
import { editPlant, getPlantById } from "@/actions/plant.action";
import toast from "react-hot-toast";

type Plant = NonNullable<Awaited<ReturnType<typeof getPlantById>>>;

interface EditDialogProps {
	plant: Plant;
}

function EditDialog({ plant }: EditDialogProps) {
	const [formData, setFormData] = useState({
		name: plant?.name.trim(),
		category: plant?.category,
		description: plant?.description || "",
		stock: plant?.stock,
		price: plant?.price,
		imageUrl: plant?.imageUrl,
		userId: plant?.userId,
	});

	const handleChange = (field: string, value: string | number) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await editPlant(plant.id, formData);
			toast.success("Plant edited successfully!");
		} catch (err) {
			console.error("Error editing plant:", err);
			toast.error("Failed to edit plant. Please try again.");
		}
	};

	return (
		<div>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						variant="secondary"
						className="ml-auto flex items-center gap-2"
						asChild
					>
						<span>
							<EditIcon className="w-4 h-4" />
						</span>
					</Button>
				</AlertDialogTrigger>

				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Edit a Plant</AlertDialogTitle>
						<AlertDialogDescription>
							Fill out the form below to edit a plant in your inventory
						</AlertDialogDescription>
					</AlertDialogHeader>

					<form
						onSubmit={handleSubmit}
						className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-6"
					>
						<div>
							<h3 className="text-lg font-semibold mb-2">Plant Details</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										type="text"
										placeholder="Enter name"
										value={formData.name}
										onChange={(e) => handleChange("name", e.target.value)}
										className="mt-1"
									/>
								</div>
								<div>
									<Label htmlFor="category">Category</Label>
									<Combobox
										value={formData.category}
										onChange={(val) => handleChange("category", val)}
									/>
								</div>
							</div>
						</div>

						<div>
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								placeholder="Type your message here."
								rows={4}
								value={formData.description}
								onChange={(e) => handleChange("description", e.target.value)}
								className="mt-1"
							/>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-2">Inventory</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<Label htmlFor="stock">Stock</Label>
									<Input
										id="stock"
										type="number"
										placeholder="Enter stock quantity"
										value={formData.stock}
										onChange={(e) =>
											handleChange("stock", Number(e.target.value))
										}
										className="mt-1"
										min={0}
									/>
								</div>
								<div>
									<Label htmlFor="price">Price</Label>
									<Input
										id="price"
										type="number"
										placeholder="Enter price"
										value={formData.price}
										onChange={(e) =>
											handleChange("price", Number(e.target.value))
										}
										className="mt-1"
										min={0}
										step="0.01"
									/>
								</div>
							</div>
						</div>

						{/* Uncomment and style if you want image upload */}
						{/* <div>
        <Label>Image</Label>
        <ImageUpload
            endpoint="postImage"
            value={formData.imageUrl}
            onChange={(url) => handleChange("imageUrl", url)}
        />
    </div> */}

						<AlertDialogFooter className="flex flex-row justify-end gap-2 pt-4">
							<AlertDialogCancel className="w-28 hover:cursor-pointer">
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								className=" hover:cursor-pointer"
								type="submit"
							>
								Save Changes
							</AlertDialogAction>
						</AlertDialogFooter>
					</form>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

export default EditDialog;
