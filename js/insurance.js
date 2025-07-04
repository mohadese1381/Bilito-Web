document.addEventListener('DOMContentLoaded', function () {

    const searchButton = document.querySelector('.search-button');

    let notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        document.body.appendChild(notificationContainer);
    }

    function showNotification(message, type = 'error') {
        const existingNotification = document.querySelector('.notification-message');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notificationDiv = document.createElement('div');
        notificationDiv.className = `notification-message ${type}`;
        notificationDiv.textContent = message;

        notificationContainer.appendChild(notificationDiv);

        notificationDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color:rgb(244, 67, 54); 
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
            direction: rtl;
            font-family: "Vazir", sans-serif;
            font-size: 0.95rem;
            min-width: 250px;
            text-align: center;
        `;

        setTimeout(() => {
            notificationDiv.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            notificationDiv.style.opacity = '0';
            notificationDiv.addEventListener('transitionend', function () {
                notificationDiv.remove();
            }, { once: true });
        }, 3000);
    }

    if (searchButton) {
        searchButton.addEventListener('click', function (event) {
            event.preventDefault();
            showNotification('بیمه‌ای یافت نشد.');
            console.log('دکمه جستجو کلیک شد و اعلان نمایش داده شد.');
        });
    } else {
        console.warn('دکمه جستجو (.search-button) یافت نشد.');
    }

    const originalPlaceholders = {};

    function setupMobileDropdowns() {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const searchItems = document.querySelectorAll('.search-item');

        searchItems.forEach(searchItem => {
            const input = searchItem.querySelector('.search-input');
            const label = searchItem.querySelector('.search-item-title');

            if (!input) return;

            if (!originalPlaceholders[input.id]) {
                originalPlaceholders[input.id] = input.placeholder;
            }

            const currentMobileSetup = searchItem.dataset.mobileSetup === 'true';

            if (isMobile) {
                if (!currentMobileSetup) {
                    const mobilePlaceholderText = label ? label.textContent : originalPlaceholders[input.id];
                    input.placeholder = mobilePlaceholderText;
                    input.setAttribute('readonly', 'readonly');
                    input.style.cursor = 'pointer';

                    const nativeSelect = document.createElement('select');
                    nativeSelect.classList.add('hidden-native-select');
                    nativeSelect.style.position = 'absolute';
                    nativeSelect.style.opacity = '0';
                    nativeSelect.style.width = '100%';
                    nativeSelect.style.height = '100%';
                    nativeSelect.style.top = '0';
                    nativeSelect.style.left = '0';
                    nativeSelect.style.cursor = 'pointer';
                    nativeSelect.style.zIndex = '10';

                    const optionsData = {
                        'destination': ['استانبول', 'تهران', 'شیراز', 'مشهد'],
                        'duration': ['۱ روز', '۳ روز', '۷ روز', '۱۴ روز'],
                        'passengers': ['۱ بزرگسال', '۲ بزرگسال', 'خانواده']
                    };

                    const inputId = input.id;
                    const currentOptions = optionsData[inputId];

                    if (currentOptions) {
                        const defaultOption = document.createElement('option');
                        defaultOption.value = '';
                        defaultOption.textContent = mobilePlaceholderText;
                        defaultOption.disabled = true;
                        defaultOption.selected = true;
                        defaultOption.hidden = true;
                        nativeSelect.appendChild(defaultOption);

                        currentOptions.forEach(optionText => {
                            const option = document.createElement('option');
                            option.value = optionText;
                            option.textContent = optionText;
                            nativeSelect.appendChild(option);
                        });
                    } else {
                        console.warn(`گزینه ای برای ورودی با ID: ${inputId} تعریف نشده است.`);
                        input.removeAttribute('readonly');
                        input.style.cursor = '';
                        input.placeholder = originalPlaceholders[input.id];
                        searchItem.dataset.mobileSetup = 'false';
                        return;
                    }

                    searchItem.appendChild(nativeSelect);

                    nativeSelect.addEventListener('change', function () {
                        input.value = nativeSelect.value;
                        if (nativeSelect.value !== '') {
                            input.classList.add('has-value');
                        } else {
                            input.classList.remove('has-value');
                        }
                    });

                    input.mobileClickHandler = function () {
                        nativeSelect.click();
                    };
                    input.addEventListener('click', input.mobileClickHandler);

                    searchItem.dataset.mobileSetup = 'true';

                }
                if (input.value === '' && input.placeholder !== (label ? label.textContent : originalPlaceholders[input.id])) {
                    input.placeholder = (label ? label.textContent : originalPlaceholders[input.id]);
                }

            } else {
                if (currentMobileSetup) {
                    input.removeAttribute('readonly');
                    input.style.cursor = '';
                    if (input.mobileClickHandler) {
                        input.removeEventListener('click', input.mobileClickHandler);
                        delete input.mobileClickHandler;
                    }

                    const existingNativeSelect = searchItem.querySelector('select.hidden-native-select');
                    if (existingNativeSelect) {
                        existingNativeSelect.remove();
                    }
                    input.value = '';
                    input.placeholder = originalPlaceholders[input.id];
                    input.classList.remove('has-value');
                }
                searchItem.dataset.mobileSetup = 'false';
            }
        });
    }
    setupMobileDropdowns();

    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setupMobileDropdowns, 150);
    });
});