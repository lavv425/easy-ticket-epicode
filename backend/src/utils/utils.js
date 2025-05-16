import { JWT_SECRET } from "../constants/constants.js";
import jwt from 'jsonwebtoken';

export const readableDate = (date) => {
    if (!date) return null;

    if (!(date instanceof Date)) {
        date = new Date(date);

        if (isNaN(d.getTime())) {
            return null;
        }
    }

    return new Date(date).toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}


export const getUserFromJwt = (token) => {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.uuid) {
        return null;
    }

    return decoded?.uuid; // {uuid: string} SHOULD BE ALWAYS PRESENT, BUT JUST TO BE SURE LET'S USE IT AS NULLISH x?.uuid
};