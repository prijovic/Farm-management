import React from "react";
import {Navigate} from "react-router";

export const ErrorPage: React.FC = () => {
    return (<Navigate to={"/"}/>);
};
