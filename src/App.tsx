import { useLocation, useRoutes } from "react-router-dom";
import "./App.css";
import configureRoutes from "./config/configureRoutes";
import useCheckAuthOnReload from "./hooks/useCheckAuthOnReload";
import { LoadingAuthentication } from "./components/Loading/Authentication";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const { role, isAuthentication, isPending } = useCheckAuthOnReload();
  const routing = useRoutes(configureRoutes(role, isAuthentication));

  useEffect(() => {
    document.querySelector("main")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  if (isPending) return <LoadingAuthentication />;

  return <>{routing}</>;
}

export default App;
