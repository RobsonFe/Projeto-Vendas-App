import { InputProps } from "app/types/input.type";
import React, { InputHTMLAttributes } from "react";
import CurrencyInput from "react-currency-input-field";

type BaseProps = InputProps & InputHTMLAttributes<HTMLInputElement>;

type Props = BaseProps & {
    maskType?: "currency"; 
};

export const Input: React.FC<Props> = ({
		label,
		name,
		value,
		onChange,
		disabled,
		type,
		maskType,
		...props
}) => {
	return (
        <div className={`field column ${props?.className}`}>
        <label className="label" htmlFor={name}>{label}</label>
                <div className="control">
            {maskType === "currency" ? (
        <CurrencyInput
            id={props?.id || name}
            name={name}
            value={value}
            onValueChange={(value) => {
            if (onChange) {
                const event = {
                    target: { value: value || '' }
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(event);
            }
            }}
            prefix="R$ "
            decimalSeparator=","
            groupSeparator="."
            disabled={disabled}
            className="input"
            placeholder={props?.placeholder}
        />
    ) : (
        <input
            id={props?.id || name}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            disabled={disabled}
            className="input"
            placeholder={props?.placeholder}
        />
        )}
			</div>
	</div>
);
};