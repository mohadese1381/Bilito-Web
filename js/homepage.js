
const pills = document.querySelectorAll('.trip-type-pills .pill');

pills.forEach(pill => {
    pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
    });
});


const internationalTab = document.getElementById('tab-international');
const domesticTab = document.getElementById('tab-domestic');

function activateTab(tabToActivate, tabToDeactivate, iconActive, iconInactive) {
    tabToActivate.classList.add('active');
    tabToActivate.classList.remove('inactive');
    tabToActivate.querySelector('.flight-icon').src = iconActive;

    tabToDeactivate.classList.remove('active');
    tabToDeactivate.classList.add('inactive');
    tabToDeactivate.querySelector('.flight-icon').src = iconInactive;
}

internationalTab.addEventListener('click', () => {
    activateTab(internationalTab, domesticTab, 'assets/icons/airplane-vertical-on.png', 'assets/icons/airplane-vertical.png');
});

domesticTab.addEventListener('click', () => {
    activateTab(domesticTab, internationalTab, 'assets/icons/airplane-vertical-on.png', 'assets/icons/airplane-vertical.png');
});


// DELETE ALL history items
const clearAllBtn = document.querySelector('.clear-all');
const historyItemsContainer = document.querySelector('.history-items');

clearAllBtn.addEventListener('click', () => {
    historyItemsContainer.innerHTML = ''; // remove all children
});

// DELETE SINGLE history item
historyItemsContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('close-icon')) {
        const historyBox = event.target.closest('.history-box');
        if (historyBox) {
            historyBox.remove();
        }
    }
});



// منتظر بمانید تا تمام محتوای صفحه بارگذاری شود
document.addEventListener('DOMContentLoaded', () => {

    // انتخاب دقیق‌تر چیپ‌ها و کارت‌ها برای جلوگیری از تداخل با بخش‌های دیگر
    const chips = document.querySelectorAll('.popular-flights-section .chip');
    const flightCards = document.querySelectorAll('.popular-flights-section .flight-card');

    // تابع برای فیلتر کردن و به‌روزرسانی کارت‌ها
    function filterAndStyleCards(selectedCity) {
        flightCards.forEach(card => {
            const citySpans = card.querySelectorAll('.origin, .destination');
            let cardContainsCity = false;

            // ابتدا بررسی می‌کنیم که آیا کارت شامل شهر انتخاب شده هست یا نه
            for (const span of citySpans) {
                if (span.textContent.trim() === selectedCity) {
                    cardContainsCity = true;
                    break; // اگر پیدا شد، از حلقه خارج شو
                }
            }

            // اگر کارت شامل شهر مورد نظر بود، آن را نمایش بده و استایلش را آپدیت کن
            if (cardContainsCity) {
                card.style.display = 'flex';

                // رنگبندی متن شهرها را آپدیت کن
                citySpans.forEach(span => {
                    if (span.textContent.trim() === selectedCity) {
                        // شهر انتخاب شده را آبی کن (با افزودن کلاس origin)
                        span.classList.add('origin');
                        span.classList.remove('destination');
                    } else {
                        // شهر دیگر را مشکی کن (با افزودن کلاس destination)
                        span.classList.add('destination');
                        span.classList.remove('origin');
                    }
                });
            } else {
                // در غیر این صورت، کارت را مخفی کن
                card.style.display = 'none';
            }
        });
    }

    // به هر چیپ یک event listener اضافه می‌کنیم
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // کلاس active را بین چیپ‌ها جابجا کن
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const selectedCity = chip.textContent.trim();
            filterAndStyleCards(selectedCity);
        });
    });

    // برای نمایش اولیه صحیح، روی چیپ فعال پیش‌فرض کلیک می‌کنیم
    const initiallyActiveChip = document.querySelector('.popular-flights-section .chip.active');
    if (initiallyActiveChip) {
        initiallyActiveChip.click();
    }
});



document.querySelectorAll('.tab-mobile').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.tab-mobile').forEach(t => {
        t.classList.remove('active');
      });
      this.classList.add('active');
    });
  });