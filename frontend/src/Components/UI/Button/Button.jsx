import { memo } from "react";
import { Button as MuiButton } from '@mui/material';
import { useSelector } from "react-redux";

const Button = ({ children, onClick, variant, color, disabled, fullWidth = false }) => {
    const { loading } = useSelector((state) => state.app);

    return (
        <MuiButton onClick={onClick} variant={variant} color={color} disabled={disabled} fullWidth={fullWidth} loading={loading}>
            {children}
        </MuiButton>
    );
};

export default memo(Button);