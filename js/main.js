document.addEventListener('DOMContentLoaded', function () {

    fetch('components/header.html')
        .then(response => response.text())
        .then(html => {
            const headerElement = document.getElementById('header');
            if (headerElement) {
                headerElement.innerHTML = html;

                const hamburgerButton = headerElement.querySelector('.hamburger-menu-button');
                const mobileMenuOverlay = headerElement.querySelector('.mobile-menu-overlay');
                const closeMenuButton = headerElement.querySelector('.close-mobile-menu-button');
                const mobileMenuBackdrop = headerElement.querySelector('.mobile-menu-backdrop');


                if (hamburgerButton && mobileMenuOverlay && closeMenuButton) {
                    hamburgerButton.addEventListener('click', function () {
                        mobileMenuOverlay.classList.add('open');
                        if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add('open');
                        document.body.style.overflow = 'hidden';
                    });

                    closeMenuButton.addEventListener('click', function () {
                        mobileMenuOverlay.classList.remove('open');
                        if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove('open');
                        document.body.style.overflow = 'auto';
                    });

                    if (mobileMenuBackdrop) {
                        mobileMenuBackdrop.addEventListener('click', function () {
                            mobileMenuOverlay.classList.remove('open');
                            mobileMenuBackdrop.classList.remove('open');
                            document.body.style.overflow = 'auto';
                        });
                    }
                }
            }
        })
        .catch(error => console.error('Error loading header:', error));

    fetch('components/footer.html')
        .then(response => response.text())
        .then(html => {
            const footerElement = document.getElementById('footer');
            if (footerElement) {
                footerElement.innerHTML = html;
            }
        })
        .catch(error => console.error('Error loading footer:', error));
});