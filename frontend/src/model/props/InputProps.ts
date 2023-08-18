export interface InputProps {
    label: string;
    type?: string;
    id: string;
    value: any;
    onChange: (value: any) => void;
    onValidityChange: (value: boolean) => void;
    validators?: { [key: string]: RegExp };
    required?: boolean;
}
