document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------
    // 1. Trip Type Pills Logic
    // --------------------------------------------------
    const pills = document.querySelectorAll('.trip-type-pills .pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    // --------------------------------------------------
    // 2. Desktop Flight Tabs Logic
    // --------------------------------------------------
    const internationalTab = document.getElementById('tab-international');
    const domesticTab = document.getElementById('tab-domestic');

    if (internationalTab && domesticTab) {
        const activateTab = (tabToActivate, tabToDeactivate, iconActive, iconInactive) => {
            tabToActivate.classList.add('active');
            tabToActivate.classList.remove('inactive');
            tabToActivate.querySelector('.flight-icon').src = iconActive;

            tabToDeactivate.classList.remove('active');
            tabToDeactivate.classList.add('inactive');
            tabToDeactivate.querySelector('.flight-icon').src = iconInactive;
        };

        internationalTab.addEventListener('click', () => {
            activateTab(internationalTab, domesticTab, 'assets/icons/airplane-vertical-on.png', 'assets/icons/airplane-vertical.png');
        });

        domesticTab.addEventListener('click', () => {
            activateTab(domesticTab, internationalTab, 'assets/icons/airplane-vertical-on.png', 'assets/icons/airplane-vertical.png');
        });
    }

    // --------------------------------------------------
    // 3. Mobile Flight Tabs Logic
    // --------------------------------------------------
    const mobileTabs = document.querySelectorAll('.tab-mobile');
    mobileTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            mobileTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --------------------------------------------------
    // 4. Search History Logic
    // --------------------------------------------------
    const historyItemsContainer = document.querySelector('.history-items');
    if (historyItemsContainer) {
        // --- DELETE ALL history items ---
        const clearAllBtn = document.querySelector('.clear-all');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => {
                historyItemsContainer.innerHTML = '';
            });
        }
        
        // --- DELETE SINGLE history item ---
        historyItemsContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('close-icon')) {
                const historyBox = event.target.closest('.history-box');
                if (historyBox) {
                    historyBox.remove();
                }
            }
        });

        // --- SCROLL BUTTONS LOGIC (Corrected) ---
        const scrollRightBtn = document.getElementById('scroll-right-btn');
        const scrollLeftBtn = document.getElementById('scroll-left-btn');
        if (scrollRightBtn && scrollLeftBtn) {
            const isRTL = getComputedStyle(historyItemsContainer).direction === 'rtl';
            const scrollAmount = 300;

            scrollLeftBtn.addEventListener('click', () => {
                historyItemsContainer.scrollBy({ 
                    left: isRTL ? -scrollAmount : scrollAmount, 
                    behavior: 'smooth' 
                });
            });

            scrollRightBtn.addEventListener('click', () => {
                historyItemsContainer.scrollBy({ 
                    left: isRTL ? scrollAmount : -scrollAmount, 
                    behavior: 'smooth' 
                });
            });
        }
    }

    // --------------------------------------------------
    // 5. Popular Flights Filter Logic
    // --------------------------------------------------
    const chips = document.querySelectorAll('.popular-flights-section .chip');
    const flightCards = document.querySelectorAll('.popular-flights-section .flight-card');
    
    if (chips.length > 0 && flightCards.length > 0) {
        const filterAndStyleCards = (selectedCity) => {
            flightCards.forEach(card => {
                const citySpans = card.querySelectorAll('.origin, .destination');
                let cardContainsCity = false;

                for (const span of citySpans) {
                    if (span.textContent.trim() === selectedCity) {
                        cardContainsCity = true;
                        break;
                    }
                }

                if (cardContainsCity) {
                    card.style.display = 'flex';
                    citySpans.forEach(span => {
                        span.classList.toggle('origin', span.textContent.trim() === selectedCity);
                        span.classList.toggle('destination', span.textContent.trim() !== selectedCity);
                    });
                } else {
                    card.style.display = 'none';
                }
            });
        };

        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                filterAndStyleCards(chip.textContent.trim());
            });
        });

        const initiallyActiveChip = document.querySelector('.popular-flights-section .chip.active');
        if (initiallyActiveChip) {
            initiallyActiveChip.click();
        }
    }

    // --------------------------------------------------
    // 6. FAQ Accordion Logic
    // --------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const wasActive = item.classList.contains('active');
                faqItems.forEach(otherItem => otherItem.classList.remove('active'));
                if (!wasActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // --------------------------------------------------
    // 7. Search Form Logic (Alert, History, Swap)
    // --------------------------------------------------
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        const inputFields = searchForm.querySelectorAll('.input-field');
        const originInput = inputFields[0];
        const destinationInput = inputFields[1];
        const swapBtn = searchForm.querySelector('.swap-btn');
        const searchBtn = searchForm.querySelector('.search-btn');
        const historyItemsContainer = document.querySelector('.history-items');

        // Swap origin and destination
        if (swapBtn && originInput && destinationInput) {
            swapBtn.addEventListener('click', () => {
                const temp = originInput.value;
                originInput.value = destinationInput.value;
                destinationInput.value = temp;
            });
        }

        // Search button logic
        if (searchBtn && originInput && destinationInput && historyItemsContainer) {
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Check all fields are filled
                let allFilled = true;
                inputFields.forEach(input => {
                    if (!input.value.trim()) allFilled = false;
                });
                if (allFilled) {
                    alert('در حال حاضر بلیط برای این سفر نداریم');
                    // Add to history
                    const from = originInput.value.trim();
                    const to = destinationInput.value.trim();
                    if (from && to) {
                        const box = document.createElement('div');
                        box.className = 'history-box';
                        box.innerHTML = `<div class="history-text">${from} به ${to}</div><img src="assets/icons/close-square.png" alt="close" class="close-icon" />`;
                        historyItemsContainer.prepend(box);
                    }
                }
            });
        }
    }

});