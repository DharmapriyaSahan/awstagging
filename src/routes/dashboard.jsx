import Home from "views/Home/Home.jsx";

var dashRoutes = [
  // {
  //   path: "/home",
  //   name: "Home",
  //   icon: "design_app",
  //   component: Home
  // },
  {
    path: "/home",
    name: "Instances",
    icon: "design_app",
    component: Home
  },
  { redirect: true, path: "/", pathTo: "/home", name: "Dashboard" }
];
export default dashRoutes;
