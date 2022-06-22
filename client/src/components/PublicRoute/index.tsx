import {Route} from "react-router-dom";

function PublicRoute(props) {
    console.log("PublicRoute props: ", props);

    return (
        <>
            <Route {...props} />
        </>
    );
}

export default PublicRoute;