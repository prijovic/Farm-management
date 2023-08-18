import React from "react";
import {useInput} from "../../hooks/useInput";
import {DatePicker, DateValidationError} from "@mui/x-date-pickers";

interface DateTimePickerProps {
    label: string;
    value: any;
    onChange: (value: unknown) => void;
    onValidityChange: (value: boolean) => void;
}

export const CustomDatePicker: React.FC<DateTimePickerProps> = ({label, onChange, value, onValidityChange}) => {
    const {error, isValid, handleOnChange} = useInput({label, onChange, onValidityChange});

    return (
        <DatePicker
            disableFuture
            value={value ? value : null}
            label={label + " *"}
            format={"DD.MM.YYYY"}
            onChange={(newValue) => handleOnChange(newValue)}
            onError={(e: DateValidationError) => {
                onValidityChange(false);
            }}
            slotProps={!isValid ? {
                textField: {
                    helperText: error,
                }
            } : undefined}
        />
    );
};
