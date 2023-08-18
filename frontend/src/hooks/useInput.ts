import {useState} from "react";

export interface UseInputArgs {
    required?: boolean;
    label: string;
    onChange: (value: string) => void;
    validators?: { [key: string]: RegExp };
}

export interface UseInputRes {
    isValid: boolean,
    error: string,
    handleOnChange: (value: string) => void
}

export const useInput: (args: UseInputArgs) => UseInputRes = ({required, label, onChange, validators}) => {
    const [isTouched, setIsTouched] = useState(false);
    const [error, setError] = useState('');
    const isValid = !isTouched || error === "";

    const handleOnChange = (value: string) => {
        if (!isTouched) {
            setIsTouched(true);
        }
        if (required && value === '') {
            setError(`${label} is a mandatory field`);
        } else if (!testValue(value)) {

        } else {
            setError("");
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
