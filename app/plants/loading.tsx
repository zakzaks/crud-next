import { Loader2Icon } from "lucide-react";
import React from "react";

function loading() {
	return (
		<div className="flex items-center justify-center min-h-[80vh] w-full">
			<Loader2Icon className="animate-spin w-12 h-12 text-gray-500 dark:text-gray-300" />
		</div>
	);
}

export default loading;
