"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const plantCategories = [
	{ value: "", label: "None" },
	{ value: "Indoor", label: "Indoor" },
	{ value: "Outdoor", label: "Outdoor" },
	{ value: "Succulent", label: "Succulent" },
	{ value: "Flowering", label: "Flowering" },
	{ value: "Herb", label: "Herb" },
	{ value: "Fern", label: "Fern" },
	{ value: "Tree", label: "Tree" },
	{ value: "Shrub", label: "Shrub" },
];

export function Combobox() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value
						? plantCategories.find((category) => category.value === value)
								?.label
						: "Select category..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search category..." className="h-9" />
					<CommandList>
						<CommandEmpty>No category found.</CommandEmpty>
						<CommandGroup>
							{plantCategories.map((category) => (
								<CommandItem
									key={category.value}
									value={category.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									{category.label}
									<Check
										className={cn(
											"ml-auto",
											value === category.value ? "opacity-100" : "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
