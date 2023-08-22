import React from "react";
import {useAppSelector} from "../store/hooks";
import {selectIsAuthenticated} from "../store/features/authSlice";
import {Navigate} from "react-router";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return <Navigate to={"/auth/login"} replace/>;
};
