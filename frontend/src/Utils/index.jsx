import { TYPER_UUID_V4 } from "../Constants/Validation";
import T from "../Singletons/Typer";

export const isUuid = (uuid) => T.is(uuid, TYPER_UUID_V4);