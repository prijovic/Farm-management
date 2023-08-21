import React from "react";
import {TextField} from "@mui/material";
import {InputProps} from "../../model/props/InputProps";
import {useInput} from "../../hooks/useInput";

export const InputField: React.FC<InputProps> = ({
                                                     label,
                                                     type,
                                                     id,
                                                     validators,
                                                     value,
                                                     required,
                                                     onChange,
                                                     onValidityChange
                                                 }) => {
    const {isValid, error, handleOnChange} = useInput({required, label, validators, onChange, onValidityChange});

    return (
        <TextField variant={"outlined"} type={type} label={label} id={id}
                   required={required}
                   value={value}
                   error={!isValid}
                   helperText={!isValid && error}
                   onChange={(event) => handleOnChange(event.target.value)}></TextField>
    );
};
