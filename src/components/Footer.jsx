// src/components/Footer.jsx
const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="container">
                <p>
                    Powered by <a href="https://boardgamegeek.com/" target="_blank" rel="noopener noreferrer">BoardGameGeek</a> API.
                </p>
                <p className="copyright">
                    &copy; {new Date().getFullYear()} GameShelf. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
