export interface InputProps {
    label: string;
    type?: string;
    id: string;
    value: any;
    onChange: (value: string) => void;
    validators?: { [key: string]: RegExp };
    required?: boolean;
}
