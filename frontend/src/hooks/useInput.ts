import {useState} from "react";

export interface UseInputArgs {
    required?: boolean;
    label: string;
    onChange: (value: string) => void;
    onValidityChange: (value: boolean) => void;
    validators?: { [key: string]: RegExp };
}

export interface UseInputRes {
    isValid: boolean,
    error: string,
    handleOnChange: (value: string) => void
}

export const useInput: (args: UseInputArgs) => UseInputRes = ({
                                                                  required,
                                                                  label,
                                                                  onChange,
                                                                  validators,
                                                                  onValidityChange,
                                                              }) => {
    const [isTouched, setIsTouched] = useState(false);
    const [error, setError] = useState('');
    const isValid = !isTouched || error === "";

    const handleOnChange = (value: any) => {
        if (!isTouched) {
            setIsTouched(true);
        }
        if (required && (value === '' || !value)) {
            setError(`${label} is a mandatory field`);
            onValidityChange(false);
        } else if (!testValue(value)) {
            onValidityChange(false);
        } else {
            setError("");
            onValidityChange(true);
        }
        onChange(value);
    }

    const testValue = (value: string): boolean => {
        if (validators) {
            for (let rule in validators) {
                if (!validators[rule].test(value)) {
                    setError(rule);
                    return false;
                }
            }
        }
        return true;
    }

    return {
        isValid,
        error,
        handleOnChange
    }
}
