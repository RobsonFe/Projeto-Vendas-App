import React from "react";

export type InputProps = {
		label: string;
		name: string;
	  value?: string | number | Date;
		type?: string;
		onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} 