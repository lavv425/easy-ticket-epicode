import { memo } from "react";
import { useSelector } from "react-redux";
import { selectIsLogged } from "../Store/Selectors/SessionSelectors";
import AppDrawer from "../Components/AppDrawer/AppDrawer";
import { Outlet } from "react-router-dom";
import { selectIsNavbarOpen } from "../Store/Selectors/AppSelectors";
import { StyledLayoutWrapper } from "../Styles/Pages/Pages";

const DefaultLayout = () => {
    const isLogged = useSelector(selectIsLogged);
    const isLeftNavbarOpen = useSelector(selectIsNavbarOpen);

    return (
        <StyledLayoutWrapper $isLeftNavbarOpen={isLeftNavbarOpen} $isLayoutShown={isLogged}>
            {isLogged && <AppDrawer />}
            <Outlet />
        </StyledLayoutWrapper>
    );
};

export default memo(DefaultLayout);