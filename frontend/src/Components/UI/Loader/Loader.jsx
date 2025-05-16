import { memo } from "react";
import { SquareLoader } from "react-spinners";
import { StyledLoaderWrapper } from "../../../Styles/Components/Components";
const Loader = () => {
    return (<StyledLoaderWrapper><SquareLoader color="#06007b" size={55} speedMultiplier={1} /></StyledLoaderWrapper>)
}
export default memo(Loader);