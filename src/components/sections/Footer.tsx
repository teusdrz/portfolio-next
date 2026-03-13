export default function Footer() {
    return (
        <footer id="footer" data-footer>
            {/* CTA */}
            <div data-footer-cta>
                <a href="mailto:matheusviniciusdrs5555@gmail.com">
                    DISCUSS THE PROJECT <span aria-hidden="true">&#8599;</span>
                </a>
            </div>

            {/* Top area: email on the right */}
            <div data-footer-top>
                <div data-footer-email>
                    <a href="mailto:matheusviniciusdrs5555@gmail.com">
                        matheusviniciusdrs5555@gmail.com
                    </a>
                </div>
            </div>

            {/* Middle area: nav links left, social + address right */}
            <div data-footer-middle>
                <nav data-footer-nav>
                    <a href="#about">ABOUT ME</a>
                    <a href="#services">SERVICES</a>
                </nav>
                <div data-footer-right>
                    <div data-footer-social>
                        <a href="https://www.instagram.com/teusdrz/" target="_blank" rel="noopener noreferrer">
                            INSTAGRAM <span aria-hidden="true">&#8599;</span>
                        </a>
                        <a href="https://www.linkedin.com/in/matheus-vinicius-82b50a26b/" target="_blank" rel="noopener noreferrer">
                            LINKEDIN <span aria-hidden="true">&#8599;</span>
                        </a>
                    </div>
                    <address data-footer-address>
                        <span>Address:</span>
                        São Paulo, SP<br />
                        Brasil
                    </address>
                </div>
            </div>

            {/* Large name at the bottom */}
            <h2 data-footer-name aria-label="Matheus Vinicius">
                MATHEUS VINICIUS
            </h2>
        </footer>
    )
}
