import {useLocation, useNavigate} from 'react-router-dom';

//Detali: https://stackoverflow.com/questions/70143135/how-to-use-react-router-dom-v6-navigate-in-class-component

export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();
        const location = useLocation();

        return (
            <Component
                navigate={navigate}
                location={location}
                {...props}
            />
        );
    };

    return Wrapper;
};

