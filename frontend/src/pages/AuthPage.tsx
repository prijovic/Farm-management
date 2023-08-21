import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AuthMode} from "../components/auth/AuthMode";
import {AuthForm} from "../components/auth/AuthForm";

export const AuthPage: React.FC = () => {
    const {mode} = useParams();
    const [modeEnum, setModeEnum] = useState(AuthMode.LOGIN);

    const navigate = useNavigate();

    useEffect(() => {
        if (mode === "signUp") {
            setModeEnum(AuthMode.SIGN_UP);
        } else if (mode === "login") {
            setModeEnum(AuthMode.LOGIN);
        } else {
            navigate("/auth/login", {replace: true})
        }
    }, [mode, navigate]);

    return (
        <AuthForm mode={modeEnum}/>
    );
};
