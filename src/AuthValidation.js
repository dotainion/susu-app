import { Redirect, Route } from "react-router";
import { routes } from "./global/Routes";
import { useStore } from "./stateContext/AuthContext";


export const AuthValidate = ({component}) =>{
  const { isLogin } = useStore();
  return(
    <Route
      render={()=>{
        return(
          isLogin?
          component
          :
          <Redirect to={routes.login}/>
        )}
      }
    />
  )
};

