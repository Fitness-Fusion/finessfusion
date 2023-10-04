import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import PersonalCabinet from "./pages/PersonalCabinet"
import { DASHBOARD_ROUTE, LOGIN_ROUTE, PERSONAL_CABINET_ROUTE, REGISTER_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: DASHBOARD_ROUTE,
        Component: Dashboard
    },
    {
        path: PERSONAL_CABINET_ROUTE,
        Component: PersonalCabinet
    }
]

export const publicRoutes = [
    {
        path: REGISTER_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    }
]