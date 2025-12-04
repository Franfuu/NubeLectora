import "./Footer.css";
function Footer() {
    const year = new Date().getFullYear();
    
    return (<footer className="footer">© {year} NubeLectora</footer>);
}

export default Footer;