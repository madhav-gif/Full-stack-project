import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HeroSlider from "./HeroSlider";

export default function Layout() {
  const location = useLocation();

  const hideNavbarFooter =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      {!hideNavbarFooter && <HeroSlider />}
      <Outlet />
      {!hideNavbarFooter && <Footer />}
    </>
  );
}
