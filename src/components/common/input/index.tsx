import React, { InputHTMLAttributes } from "react";
import { InputProps } from "types/input.type";

type Props = InputProps & InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = ({
		label,
		name,
		value,
		onChange,
		type,
		...props
}) => {
	return (
			<div className="columns">
					<div className={`field column ${props?.className}`}>
					<label className="label" htmlFor={name}>{label}</label>
							<div className="control">
						<input className="input"
							id={props?.id}
							name={name}
							value={value}
							onChange={onChange}
							type={type}
							placeholder={props?.placeholder}
							required 
							/>
							</div>
				</div>
			</div>

		);
};