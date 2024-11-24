document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission handling
    const form = document.getElementById('contact-form');
    const responseDiv = document.createElement('div');
    responseDiv.id = 'form-response';
    form.insertAdjacentElement('afterend', responseDiv);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);

        // Send form data to email using FormSubmit
        fetch('mailto:ruthmwaniki2020@gmail.com', { // Replace with your email
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                responseDiv.textContent = 'Thank you! Your message has been sent.';
                responseDiv.style.color = 'green';
                form.reset(); // Clear the form
            } else {
                responseDiv.textContent = 'Something went wrong. Please try again.';
                responseDiv.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            responseDiv.textContent = 'An error occurred while sending your message.';
            responseDiv.style.color = 'red';
        });
    });

    // Add a throttled scroll event listener to change header background on scroll
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    window.addEventListener('scroll', debounce(() => {
        const header = document.querySelector('header');
        header.style.backgroundColor = window.scrollY > 50 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(255, 255, 255, 0.8)';
    }, 50));

    // Scroll to top when button is clicked
    const scrollToTopButton = document.getElementById("scrollToTop");
    scrollToTopButton.onclick = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling effect
        });
    };
});
