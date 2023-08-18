import React, {useState} from "react";
import {AuthMode} from "./AuthMode";
import {AuthInputs} from "./AuthInputs";
import {Button, Card, CardActions, CardContent, CardHeader, Stack} from "@mui/material";
import {InputField} from "../UI/InputField";
import {PasswordInput} from "../UI/PasswordInput";
import {CustomDatePicker} from "../UI/CustomDatePicker";
import {toTitleCase} from "../../utils/toTitleCase";

interface AuthFormProps {
    mode: AuthMode
}

export const AuthForm: React.FC<AuthFormProps> = ({mode}) => {
    const emailValidator = {
        "Invalid E-mail format": /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    };
    const [email, setEmail] = useState('');
    const passwordValidator = {
        "Password must have at least 12 character, 1 lower case letter, 1 upper case letter, 1 number and 1 special character":
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/
    };
    const [password, setPassword] = useState('');

    const [name, setName] = useState('');
    const nameValidator = (label: string) => {
        return {
            [`${label} can only contain as least 2 character and spaces`]: /^(?=.*[a-zA-Z])[a-zA-Z\s]{2,}$/
        }
    };

    const [surname, setSurname] = useState('');

    const [birthDate, setBirthDate] = useState('');

    const [farmName, setFarmName] = useState('');

    const changeHandler = (inputType: AuthInputs) => {
        let methodToExecute: (value: string) => void;
        switch (inputType) {
            case AuthInputs.EMAIL:
                methodToExecute = setEmail;
                break;
            case AuthInputs.PASSWORD:
                methodToExecute = setPassword;
                break;
            case AuthInputs.NAME:
                methodToExecute = setName;
                break;
            case AuthInputs.SURNAME:
                methodToExecute = setSurname;
                break;
            default:
                methodToExecute = setFarmName;
                break;
        }
        return (value: string) => methodToExecute(value)
    }

    return (
        <Card className={"form"} sx={{maxWidth: {xs: "80%", sm: "500px"},}}>
            <CardHeader
                title={toTitleCase(mode)}
                titleTypographyProps={{component: "h1", variant: "h4"}}
                subheader={`Please fill out your information to ${mode}.`}
                subheaderTypographyProps={{component: "p", variant: "subtitle1", gutterBottom: true}}
            />
            <CardContent>
                <Stack spacing={4}>
                    <Stack spacing={2} direction={'column'}>
                        <InputField label={"E-mail"} type={"email"} id={"email"} value={email}
                                    onChange={changeHandler(AuthInputs.EMAIL)} required={true}
                                    validators={emailValidator}/>
                        <PasswordInput label={"Password"} id={"password"} value={password}
                                       onChange={changeHandler(AuthInputs.PASSWORD)} required={true}
                                       validators={passwordValidator}/>
                    </Stack>
                    {mode === AuthMode.SIGN_UP && <>
                      <Stack spacing={2} direction={'column'}>
                        <InputField label={"Name"} type={"text"} id={"name"} value={name}
                                    onChange={changeHandler(AuthInputs.NAME)} required={true}
                                    validators={nameValidator('Name')}/>
                        <InputField label={"Surname"} type={"text"} id={"surname"} value={surname}
                                    onChange={changeHandler(AuthInputs.SURNAME)} required={true}
                                    validators={nameValidator('Surname')}/>
                        <CustomDatePicker label={"Birthday"} value={birthDate}
                                          onChange={(value: any) => (setBirthDate(value))}/>
                      </Stack>
                      <Stack spacing={2} direction={'column'}>
                        <InputField label={"Farm Name"} type={"text"} id={"farmName"} value={farmName}
                                    onChange={changeHandler(AuthInputs.FARM_NAME)} required={true}
                                    validators={nameValidator('Farm name')}/>
                      </Stack>
                    </>}
                </Stack>
            </CardContent>
            <CardActions style={{justifyContent: "center", marginTop: "16px"}}>
                <Button size={"medium"} variant={"contained"}>{mode}</Button>
            </CardActions>
        </Card>
    );
};
