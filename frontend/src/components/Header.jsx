import { Link, useLocation } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">School Directory</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <Link className={location.pathname === "/" ? "active" : ""} to="/">Add School</Link>
            </li>
            <li>
              <Link className={location.pathname === "/schools" ? "active" : ""} to="/schools">Show Schools</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
