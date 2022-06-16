import Home from "./pages/Home/home.js";
import DetailMovie from "./pages/Home/detailMovie.js";
import UserLoginPage from "./pages/Home/login";
import UserSignupPage from "./pages/Home/signup.js";
import BookingMovie from "./pages/Home/booking";
import UserInfoPage from "./pages/Home/UserInfoPage.js";
import Dashboard from "./pages/Admin/dashboard.js";
import InfoAdmin from "./pages/Admin/infoAdmin";
import UserManagement from "./pages/Admin/UserManagement";
import MovieManagement from "./pages/Admin/MovieManagement";
import TicketManageMent from "./pages/Admin/ticket-management.js";
import TicketDetail from "./Components/Home/BookingPage/ticketDetail.js";
const routeHome = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/detail-movie/:id",
    exact: false,
    component: DetailMovie
  },
  {
    path: "/login",
    exact: false,
    component: UserLoginPage
  },
  {
    path: "/sign-up",
    exact: false,
    component: UserSignupPage
  },
  {
    path: "/dat-ve/:id",
    exact: false,
    component: BookingMovie
  },
  {
    path: "/info",
    exact: false,
    component: UserInfoPage
  },
  {
    path: "/ticket-detail",
    exact: false,
    component: TicketDetail
  }
];
const routeAdmin = [
  {
    path: "/dashboard",
    exact: false,
    component: Dashboard
  },
  {
    path: "/infoAdmin",
    exact: false,
    component: InfoAdmin
  },
  {
    path: "/quan-ly-user",
    exact: false,
    component: UserManagement
  },
  {
    path: "/quan-ly-movie",
    exact: false,
    component: MovieManagement
  },
  {
    path: "/quan-ly-ve/:id",
    exact: false,
    component: TicketManageMent
  }
];
export { routeHome, routeAdmin };
