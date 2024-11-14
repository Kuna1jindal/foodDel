import {useRouteError,useLocation} from "react-router-dom";
const Error = () =>{
    const err = useRouteError();

    const errorMessage=useLocation().state;
    return(
        <div>
            <h2>ooppsss....</h2>
            <h3>Something went wrong</h3>
            <h3>{errorMessage}</h3>
            <h3>{err.status}:{err.statusText}</h3>
        </div>
    )
}
export default Error;