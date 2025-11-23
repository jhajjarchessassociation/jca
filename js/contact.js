// Contact Form Handler
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            // Validate form
            if (!name || !email || !message) {
                showMessage('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                // Using FormSubmit.co (free email service)
                const response = await fetch('https://formsubmit.co/ajax/jhajjarchessassociation@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message,
                        _subject: `Contact Form Submission from ${name}`,
                        _captcha: 'false'
                    })
                });

                if (response.ok) {
                    showMessage('Your message has been sent successfully! We will get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }

            } catch (error) {
                console.error('Error sending message:', error);
                // Fallback to mailto if AJAX fails (common when running from file://)
                const mailtoLink = `mailto:jhajjarchessassociation@gmail.com?subject=Contact Form Submission from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;

                if (confirm('It seems the direct email service is not working (possibly due to running locally). Would you like to send via your default email client instead?')) {
                    window.location.href = mailtoLink;
                    showMessage('Opening your email client...', 'success');
                    contactForm.reset();
                } else {
                    showMessage('Sorry, there was an error sending your message. Please email us at jhajjarchessassociation@gmail.com', 'error');
                }
            } finally {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.style.display = 'block';

        if (type === 'success') {
            formMessage.style.background = 'rgba(46, 204, 113, 0.2)';
            formMessage.style.border = '1px solid rgba(46, 204, 113, 0.5)';
            formMessage.style.color = '#2ecc71';
        } else {
            formMessage.style.background = 'rgba(231, 76, 60, 0.2)';
            formMessage.style.border = '1px solid rgba(231, 76, 60, 0.5)';
            formMessage.style.color = '#e74c3c';
        }

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});
