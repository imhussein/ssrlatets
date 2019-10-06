import Users from "./client/components/Users";
import App from "./client/App";

// Global Route Configuration For Both Renderer Server And Client To Be Used With The StaticRouter In Server and BrowserRouter In Client
export default [
  {
    path: "/",
    component: App,
    exact: true
  },
  {
    path: "/users",
    component: Users.component,
    exact: true,
    loadData: Users.loadData,
  }
];
