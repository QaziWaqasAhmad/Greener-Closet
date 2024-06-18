import { useContext } from "react";
import { Link, Navigate, useOutlet } from "react-router-dom";
import { AppContext } from "../context";

export const ProtectedLayout = () => {
    const { user } = useContext(AppContext);
    const outlet = useOutlet();

    if (!user) {
        return <Navigate to="/" />;
    }

    return <div>{outlet}</div>;
};
