import React from "react";
import {FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {InputProps} from "../../model/props/InputProps";
import {useInput} from "../../hooks/useInput";

export const PasswordInput: React.FC<InputProps> = ({
                                                        label,
                                                        id,
                                                        validators,
                                                        value,
                                                        required,
                                                        onChange,
                                                        onValidityChange
                                                    }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const {isValid, error, handleOnChange} = useInput({required, label, validators, onChange, onValidityChange});

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <FormControl variant="outlined">
            <InputLabel error={!isValid} htmlFor={id}>{label + (required ? " *" : "")}</InputLabel>
            <OutlinedInput
                id={id}
                value={value}
                label={label}
                required={required}
                type={showPassword ? 'text' : 'password'}
                error={!isValid}
                onChange={(event) => handleOnChange(event.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
            />
            {!isValid && <FormHelperText
              error={!isValid}
            >{error}</FormHelperText>}
        </FormControl>
    );
};
