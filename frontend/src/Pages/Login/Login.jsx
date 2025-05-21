import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, useValidateSession } from '../../Store/Thunks/SessionThunks';
import TextField from '@mui/material/TextField';
import Button from '../../Components/UI/Button/Button';
import { setMessage } from '../../Store/Slices/AppSlice';
import { StyledLoginLinks, StyledLoginWrapper, StyledLogo, StyledPagesTitle } from '../../Styles/Pages/Pages';
import { DASHBOARD } from '../../Routes/Routes';
import { selectIsLogged } from '../../Store/Selectors/SessionSelectors';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

const Login = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const validateSession = useValidateSession();
    const isLogged = useSelector(selectIsLogged);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback(async () => {
        if (!username || !password) {
            dispatch(setMessage({ type: 'warning', message: 'Inserisci username e password' }));
            return;
        }

        const res = await dispatch(loginUser(username.trim(), password));

        if (res) {
            nav(DASHBOARD);
        }
    }, [username, password, dispatch, nav]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') handleSubmit();
    }, [handleSubmit]);


    useEffect(() => {
        const asyncValidateSession = async () => {
            await validateSession();
        };

        asyncValidateSession().then(() => {
            if (isLogged) nav(DASHBOARD, { viewTransition: false, replace: true });
        })
    }, [isLogged, nav, validateSession]);

    return (
        <>
            <StyledPagesTitle>Easy Ticket - Login</StyledPagesTitle>
            <StyledLoginWrapper>
                <StyledLogo>Easy Ticket</StyledLogo>

                <TextField value={username} onChange={(e) => setUsername(e.target.value)} label="Username" variant="outlined" fullWidth onKeyDown={handleKeyDown} />
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} label="Password" type="password" variant="outlined" fullWidth onKeyDown={handleKeyDown} />
                <StyledLoginLinks>
                    <Button icon={<LoginRoundedIcon />} onClick={handleSubmit} variant="contained" color="primary" >
                        Accedi
                    </Button>
                </StyledLoginLinks>
            </StyledLoginWrapper>
        </>
    );
};

export default Login;