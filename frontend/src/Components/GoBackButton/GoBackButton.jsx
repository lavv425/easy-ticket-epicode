import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useIsMobile } from "../../Hooks/useIsMobile";

const GoBackButton = ({ className, backTo = -1, text = "Go Back" }) => {
    const nav = useNavigate();
    const isMobile = useIsMobile();

    const handleGoBack = useCallback(() => {
        nav(backTo);
    }, [backTo, nav]);

    return (
        <Button className={className} variant="contained" color="primary" onClick={handleGoBack} icon={<ArrowBackRoundedIcon />}>
            {!isMobile && text}
        </Button>
    );

};

export default memo(GoBackButton);