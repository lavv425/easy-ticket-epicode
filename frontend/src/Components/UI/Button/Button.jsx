import { memo, useMemo } from "react";
import { Button as MuiButton } from '@mui/material';
import { useSelector } from "react-redux";

const Button = ({ children, className, onClick, variant, color, icon, disabled, fullWidth = false }) => {
    const { loading } = useSelector((state) => state.app);

    const memoizedIcon = useMemo(() => icon, [icon]);

    return (
        <MuiButton className={className} onClick={onClick} variant={variant} color={color} disabled={disabled} fullWidth={fullWidth} loading={loading} startIcon={memoizedIcon}>
            {children}
        </MuiButton>
    );
};

export default memo(Button);