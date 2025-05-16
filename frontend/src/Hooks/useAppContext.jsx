import { use } from "react";
import { AppContext } from "../Contexts/App/AppContext";

export const useAppContext = () => {
    const context = use(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};