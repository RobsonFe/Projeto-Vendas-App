import React from "react";

export type InputProps = {
		label: string;
		name: string;
		value: string | undefined | number;
		type?: string;
		onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} 