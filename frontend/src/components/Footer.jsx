import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} School Directory | Designed with in React</p>
    </footer>
  );
};

export default Footer;
