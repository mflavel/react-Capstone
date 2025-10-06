import logo from "./images/Logo .svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const location = useLocation(); // get current path
  const navigate = useNavigate();

  const handleNavClick = (sectionId) => {
    console.log("Nav: clicked ->", sectionId, "current path:", location.pathname);
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      console.log("Nav: found element on / ?", !!el);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    // navigate to home and pass target in state (reliable)
    navigate("/", { state: { scrollTo: sectionId } });
  };

  return (
    <nav className="Nav">
      <div className="site-inner">
        <img src={logo} alt="Logo" />
        <div className="nav-links">
          {/* Links for navigation bar */}
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          <button
            type="button"
            className="link-button"
            data-test="about-btn"
            onClick={() => handleNavClick("about-section")}
          > About
          </button>
          <Link to="/menu" className={location.pathname === "/menu" ? "active" : ""}>Menu</Link>
          <Link to="/reservations" className={location.pathname === "/reservations" ? "active" : ""}>Reservations</Link>
          <Link to="/order-online" className={location.pathname === "/order-online" ? "active" : ""}>Order Online</Link>
          <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

