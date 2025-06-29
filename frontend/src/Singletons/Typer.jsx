import Typer from "@illavv/run_typer"
import { TYPER_UUID_V4, UUIDV4_REGEX } from "../Constants/Validation";

const T = Typer;

/**
 * @description Register a new type with a custom validation function using Typer
 * @param {string} typeName
 * @param {Function} type
 * @returns {void}
 * @throws {TypeError}
 * 
 * @see https://github.com/lavv425/Typer
 * @see https://lavv425.github.io/Typer/
 */
T.registerType(TYPER_UUID_V4, (uuid) => {
    const isValidUuid = (uuid) => {
        try {
            return T.is(uuid, "s") && UUIDV4_REGEX.test(uuid) && uuid.length > 0 && uuid.length === 36;
        } catch (error) {
            throw new TypeError(Error.isError(error).message);
        }
    }

    if (!isValidUuid(uuid)) {
        throw new TypeError(`Invalid uuid-v4 given: ${uuid}`);
    }

    return uuid;
});

export default T;