import { TYPER_UUID_V4 } from "../Constants/Validation";
import T from "../Singletons/Typer";

/**
 * isUuid
 * @description Checks if a value is a valid UUID
 * @param {any} uuid 
 * @returns {boolean}
 */
export const isUuid = (uuid) => T.is(uuid, TYPER_UUID_V4);