import React from "react";
import {useInput} from "../../hooks/useInput";
import {DatePicker} from "@mui/x-date-pickers";

interface DateTimePickerProps {
    label: string;
    value: any;
    onChange: (value: unknown) => void;
}

export const CustomDatePicker: React.FC<DateTimePickerProps> = ({label, onChange, value}) => {
    const {handleOnChange} = useInput({label, onChange});

    return (
        <DatePicker
            disableFuture
            value={value ? value : null}
            label={label}
            format={"DD.MM.YYYY"}
            onChange={(newValue) => handleOnChange(newValue)}
        />
    );
};
