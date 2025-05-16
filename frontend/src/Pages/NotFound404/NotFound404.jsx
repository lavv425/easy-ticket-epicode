
import { Link } from 'react-router-dom';
import Button from '../../Components/UI/Button/Button';
import { DASHBOARD } from "../../Routes/Routes";
import { Styled404Container } from '../../Styles/Pages/Pages';


const NotFound404 = () => {
    return (
        <Styled404Container>
            <h1>404 - Page not found!</h1>
            <h3>The page you're looking for doesn't exist or has been moved</h3>
            <Link to={DASHBOARD} replace>
                <Button color="danger">
                    Back to home
                </Button>
            </Link>
        </Styled404Container>
    );
};

export default NotFound404;