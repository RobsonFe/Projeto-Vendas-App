import { InputProps } from "app/types/input.type";
import React, { InputHTMLAttributes } from "react";

type Props = InputProps & InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = ({
		label,
		name,
		value,
		onChange,
		disabled,
		type,
		...props
}) => {
	return (
			
					<div className={`field column ${props?.className}`}>
					<label className="label" htmlFor={name}>{label}</label>
							<div className="control">
						<input className="input"
							id={props?.id || name}
							name={name}
							value={value}
							onChange={onChange}
							type={type}
							placeholder={props?.placeholder}
							disabled={disabled}
							/>
							</div>
				</div>


		);
};