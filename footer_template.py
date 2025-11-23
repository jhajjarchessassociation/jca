# Footer Fix Script
# This script will add proper footer with developer credits to all HTML pages

footer_html = '''
    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h3>Jhajjar Chess Association</h3>
                    <p>Empowering minds through the royal game. <br>
                        <a href="https://www.haryanachess.com" target="_blank"
                            style="color: var(--primary-gold); text-decoration: none; font-weight: bold;">
                            <i class="fa-solid fa-link"></i> Affiliated with Haryana Chess Association
                        </a>
                    </p>
                    <div class="footer-social">
                        <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#"><i class="fa-brands fa-twitter"></i></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="calendar.html">Calendar</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Contact Info</h3>
                    <p><i class="fa-solid fa-location-dot"></i> House No. 77/2, Ward no. 6, Mohalla teela, JHAJJAR 124103</p>
                    <p><i class="fa-solid fa-envelope"></i> chessassociation.jhajjar@gmail.com</p>
                    <p><i class="fa-solid fa-phone"></i> +91 9416273230</p>
                </div>
            </div>
            
            <!-- Developer Credits -->
            <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 10px;">Developed by</p>
                <h4 style="color: var(--primary-gold); font-size: 1.2rem; margin-bottom: 15px; letter-spacing: 2px;">WEBXDEVELOPER</h4>
                <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; color: var(--text-muted); font-size: 0.85rem;">
                    <p><i class="fa-solid fa-phone" style="color: var(--primary-gold); margin-right: 5px;"></i> +91 9911298836 | +91 8307136089</p>
                    <p><i class="fa-solid fa-envelope" style="color: var(--primary-gold); margin-right: 5px;"></i> yasshmittal3@gmail.com</p>
                </div>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 10px;">
                    <i class="fa-solid fa-location-dot" style="color: var(--primary-gold); margin-right: 5px;"></i> BH-73 East Shalimar Bagh, Delhi - 110088
                </p>
            </div>
            
            <div class="copyright">
                <p>&copy; 2024 Jhajjar Chess Association. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>

</html>
'''

print("Footer HTML template created")
print(footer_html)
