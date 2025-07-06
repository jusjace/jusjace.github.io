document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded and DOMContentLoaded fired.");

    const splashScreen = document.getElementById('splash-screen');
    const logoBigSplash = document.getElementById('logo-big-splash');
    const mainContent = document.getElementById('main-content');

    // Define a key for sessionStorage
    const SPLASH_SHOWN_KEY = 'splashScreenShown';

    if (splashScreen && logoBigSplash && mainContent) {
        // Check if the splash screen has already been shown in this session
        if (sessionStorage.getItem(SPLASH_SHOWN_KEY)) {
            // If shown, skip the animation and directly show main content
            splashScreen.classList.add('hidden'); // Ensure splash screen is hidden
            mainContent.classList.remove('hidden');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
            console.log("Splash screen already shown, skipping animation.");
        } else {
            // If not shown, run the animation
            mainContent.classList.add('hidden'); // Initially hide main content
            document.body.style.overflow = 'hidden'; // Hide scrollbar during splash screen

            setTimeout(() => {
                splashScreen.classList.add('logo-animate');

                logoBigSplash.addEventListener('transitionend', function(event) {
                    if (event.propertyName === 'opacity' && window.getComputedStyle(logoBigSplash).opacity === '0') {
                        this.removeEventListener('transitionend', arguments.callee);
                        splashScreen.classList.add('splash-hidden');
                        mainContent.classList.remove('hidden');
                        document.body.style.overflow = 'auto'; // Re-enable scrolling
                        sessionStorage.setItem(SPLASH_SHOWN_KEY, 'true'); // Set flag after animation
                        console.log("Splash screen animation completed and flag set.");
                    }
                });
            }, 1000);
        }
    } else {
        // Fallback if elements are not found, ensure main content is visible and scrolling is enabled
        if (mainContent) {
            mainContent.classList.remove('hidden');
        }
        document.body.style.overflow = 'auto'; // Ensure scrolling is enabled by default
    }

    // --- General Modal Handling Functions ---
    function openModal(modalElement) {
        console.log("Attempting to open modal:", modalElement ? modalElement.id : 'undefined element');
        if (modalElement) {
            modalElement.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling on body when modal is open
            console.log("Modal 'hidden' class removed. Current display style:", window.getComputedStyle(modalElement).display);
        } else {
            console.error("openModal called with an undefined modalElement.");
        }
    }

    function closeModal(modalElement) {
        console.log("Attempting to close modal:", modalElement ? modalElement.id : 'undefined element');
        if (modalElement) {
            modalElement.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Re-enable scrolling on body
            console.log("Modal 'hidden' class added.");
        } else {
            console.error("closeModal called with an undefined modalElement.");
        }
    }

    // --- DOM Elements ---
    const productCards = document.querySelectorAll('.product-card');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');

    // Category Sections and their 'Show All' links
    const cakesSection = document.getElementById('cakes-section');
    const cakesProductContainer = document.getElementById('cakes-product-container');
    const showAllCakesLink = document.getElementById('show-all-cakes-link');

    const pastriesSection = document.getElementById('pastries-section');
    const pastriesProductContainer = document.getElementById('pastries-product-container');
    const showAllPastriesLink = document.getElementById('show-all-pastries-link');

    const icedCoffeeSection = document.getElementById('iced-coffee-section');
    const icedCoffeeProductContainer = document.getElementById('iced-coffee-product-container');
    const showAllIcedCoffeeLink = document.getElementById('show-all-iced-coffee-link');

    const dessertSection = document.getElementById('dessert-section'); // Assuming this exists and might be hidden
    const dessertProductContainer = dessertSection ? dessertSection.querySelector('.grid') : null; // Get its product container
    const showAllDessertLink = dessertSection ? dessertSection.querySelector('a[href="#"]') : null; // Get its show all link


    // Cake Modal Elements (Standard Cakes)
    const cakeOrderModal = document.getElementById('cake-order-modal');
    const modalCloseButtonCake = document.getElementById('modal-close-button-cake');
    const modalProductImageCake = document.getElementById('modal-product-image-cake');
    const modalProductNameCake = document.getElementById('modal-product-name-cake');
    const modalProductDescriptionCake = document.getElementById('modal-product-description-cake');
    const modalBakersNoteCake = document.getElementById('modal-bakers-note-cake');
    const cakeSizeButtons = document.querySelectorAll('#cake-order-modal .cake-size-button');
    const cakeSizePricePlaceholder = document.getElementById('cake-size-price-placeholder');
    const facebookOrderButton = document.getElementById('facebook-order-button'); // Standard cake FB button


    // Burnt Basque Cheesecake Modal Elements (Specific)
    const basqueCheesecakeModal = document.getElementById('basque-cheesecake-modal');
    const modalCloseButtonBasque = document.getElementById('modal-close-button-basque');
    const modalBasqueImage = document.getElementById('modal-basque-image');
    const modalBasqueName = document.getElementById('modal-basque-name');
    const modalBasqueDescription = document.getElementById('modal-basque-description');
    const modalBasqueBakersNote = document.getElementById('modal-basque-bakers-note');
    const basqueSizeButtons = document.querySelectorAll('#basque-cheesecake-modal .basque-size-button');
    const basquePricePlaceholder = document.getElementById('basque-price-placeholder');
    const basqueFacebookOrderButton = document.getElementById('basque-facebook-order-button'); // Basque specific FB button


    // Cookie Modal Elements
    const cookieOrderModal = document.getElementById('cookie-order-modal');
    const modalCloseButtonCookie = document.getElementById('modal-close-button-cookie');
    const modalCookieImage = document.getElementById('modal-cookie-image');
    const modalCookieName = document.getElementById('modal-cookie-name');
    const modalCookieDescription = document.getElementById('modal-cookie-description');
    const cookieQuantityButtons = document.querySelectorAll('#cookie-order-modal .button-quantity');
    const cookiePricePlaceholder = document.getElementById('cookie-price-placeholder');


    // --- Helper function to get product price for filtering ---
    function getProductFilterPrice(card) {
        const pricesString = card.dataset.prices;
        if (pricesString) {
            try {
                const prices = JSON.parse(pricesString);
                // For filtering, use the lowest price option if multiple, or the first one found
                if (card.dataset.category === 'cakes' || card.dataset.modalType === 'basque-cheesecake') {
                    const priceValues = Object.values(prices);
                    return priceValues.length > 0 ? Math.min(...priceValues) : 0;
                } else if (card.dataset.category === 'pastries') {
                    // For pastries, assume '1' is the single piece price
                    return prices['1'] || 0;
                }
            } catch (e) {
                console.error("Error parsing prices for filtering:", card.dataset.name, e);
            }
        }
        // Fallback to data-price if data-prices is not available or parsing fails
        return parseFloat(card.dataset.price) || 0;
    }


    // --- Filtering Logic ---
    function filterProducts() {
        const selectedCategory = categoryFilter.value;
        const selectedPriceRange = priceFilter.value;

        // Hide all products initially for filtering
        productCards.forEach(card => {
            card.classList.add('hidden');
        });

        // Hide all category sections and show all links initially
        [cakesSection, pastriesSection, icedCoffeeSection, dessertSection].forEach(section => {
            if (section) section.classList.add('hidden');
        });
        [showAllCakesLink, showAllPastriesLink, showAllIcedCoffeeLink, showAllDessertLink].forEach(link => {
            if (link) link.classList.add('hidden'); // Hide all "Show All" links during filtering
        });

        let cakesVisibleCount = 0;
        let pastriesVisibleCount = 0;
        let icedCoffeeVisibleCount = 0;
        let dessertVisibleCount = 0;

        productCards.forEach(card => {
            const productCategory = card.dataset.category;
            const productPrice = getProductFilterPrice(card);

            const categoryMatch = selectedCategory === 'all' || productCategory === selectedCategory;

            let priceMatch = false;
            if (selectedPriceRange === 'all') {
                priceMatch = true;
            } else {
                const [minStr, maxStr] = selectedPriceRange.split('-');
                const minPrice = parseFloat(minStr);
                const maxPrice = maxStr === 'above' ? Infinity : parseFloat(maxStr);

                // Check if the product's price falls within the selected range
                if (productPrice >= minPrice && productPrice <= maxPrice) {
                    priceMatch = true;
                }
            }

            if (categoryMatch && priceMatch) {
                card.classList.remove('hidden'); // Show the product card
                if (productCategory === 'cakes') cakesVisibleCount++;
                else if (productCategory === 'pastries') pastriesVisibleCount++;
                else if (productCategory === 'iced-coffee') icedCoffeeVisibleCount++;
                else if (productCategory === 'dessert') dessertVisibleCount++;
            }
        });

        // Show category sections if they have visible products
        if (cakesVisibleCount > 0) cakesSection.classList.remove('hidden');
        if (pastriesVisibleCount > 0) pastriesSection.classList.remove('hidden');
        if (icedCoffeeVisibleCount > 0) icedCoffeeSection.classList.remove('hidden');
        if (dessertVisibleCount > 0) dessertSection.classList.remove('hidden');

        // Restore initial limited view and "Show All" links if filters are reset
        if (selectedCategory === 'all' && selectedPriceRange === 'all') {
            // Re-hide initially hidden products
            document.querySelectorAll('.hidden-initial').forEach(product => {
                product.classList.add('hidden');
            });

            // Re-show "Show All" links for categories that have hidden products
            if (pastriesProductContainer.querySelectorAll('.hidden-initial').length > 0) {
                showAllPastriesLink.classList.remove('hidden');
            }
            // Add similar logic for other categories if they have hidden-initial products
            // For now, cakes and iced coffee don't have hidden-initial products so their "Show All" links remain hidden.
        }
    }

    // --- Event Listeners for Filters ---
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }

    // --- Initial Product Visibility on Load ---
    // This runs once when the DOM is ready to set up the initial limited view
    const allProductCards = document.querySelectorAll('.product-card');
    allProductCards.forEach(card => {
        // Ensure all products are visible before applying initial hiding for 'hidden-initial'
        card.classList.remove('hidden');
    });

    // Apply initial hiding for products marked with 'hidden-initial'
    document.querySelectorAll('#pastries-product-container .hidden-initial').forEach(product => {
        product.classList.add('hidden');
    });
    // If other categories also had .hidden-initial, add similar lines here
    // For now, cakes and iced coffee are fully visible.

    // Show/hide "Show All" links based on initial visibility
    if (pastriesProductContainer.querySelectorAll('.hidden-initial').length > 0) {
        if (showAllPastriesLink) showAllPastriesLink.classList.remove('hidden');
    } else {
        if (showAllPastriesLink) showAllPastriesLink.classList.add('hidden'); // Hide if no products are hidden
    }
    if (showAllCakesLink) showAllCakesLink.classList.add('hidden'); // All cakes visible initially
    if (showAllIcedCoffeeLink) showAllIcedCoffeeLink.classList.add('hidden'); // All iced coffee visible initially


    // --- Show All Link Event Listeners ---
    if (showAllCakesLink) {
        showAllCakesLink.addEventListener('click', (event) => {
            event.preventDefault();
            cakesProductContainer.querySelectorAll('.product-card.hidden').forEach(product => {
                product.classList.remove('hidden');
            });
            showAllCakesLink.classList.add('hidden'); // Hide the "Show All" link
        });
    }

    if (showAllPastriesLink) {
        showAllPastriesLink.addEventListener('click', (event) => {
            event.preventDefault();
            pastriesProductContainer.querySelectorAll('.product-card.hidden').forEach(product => {
                product.classList.remove('hidden');
            });
            showAllPastriesLink.classList.add('hidden'); // Hide the "Show All" link
        });
    }

    if (showAllIcedCoffeeLink) {
        showAllIcedCoffeeLink.addEventListener('click', (event) => {
            event.preventDefault();
            icedCoffeeProductContainer.querySelectorAll('.product-card.hidden').forEach(product => {
                product.classList.remove('hidden');
            });
            showAllIcedCoffeeLink.classList.add('hidden'); // Hide the "Show All" link
        });
    }


    // --- Product Card Click Logic (for all categories) ---
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            console.log("Product card clicked:", card.dataset.name);
            const category = card.dataset.category;
            const modalType = card.dataset.modalType; // Get the specific modal type
            const name = card.dataset.name;
            const image = card.dataset.image;
            const description = card.dataset.description;
            const pricesString = card.dataset.prices;
            let prices = {};
            try {
                prices = JSON.parse(pricesString);
            } catch (e) {
                console.error("Error parsing prices for product:", name, e, "Prices string:", pricesString);
            }

            if (modalType === 'basque-cheesecake') {
                console.log("Opening specific modal for Burnt Basque Cheesecake.");
                const bakersNote = card.dataset.bakersNote;
                const availabilityString = card.dataset.availability;
                let availability = {};
                try {
                    availability = JSON.parse(availabilityString);
                } catch (e) {
                    console.error("Error parsing availability for Basque Cheesecake:", e, "Availability string:", availabilityString);
                }

                // Populate Basque Cheesecake modal
                if (modalBasqueImage) modalBasqueImage.src = image || '';
                if (modalBasqueImage) modalBasqueImage.alt = name || '';
                if (modalBasqueName) modalBasqueName.textContent = name || 'N/A';
                if (modalBasqueDescription) modalBasqueDescription.textContent = description || 'No description available.';
                if (modalBasqueBakersNote) modalBasqueBakersNote.textContent = bakersNote || 'No baker\'s note available.';

                // Reset selected button and price for Basque modal
                basqueSizeButtons.forEach(btn => {
                    btn.classList.remove('selected');
                    // Clear availability status
                    const statusSpan = btn.querySelector('.availability-status');
                    if (statusSpan) {
                        statusSpan.textContent = '';
                        statusSpan.classList.remove('available', 'not-available');
                    }
                });
                if (basquePricePlaceholder) basquePricePlaceholder.textContent = '0.00'; // Initial price placeholder

                // Store prices and availability on the modal for easy access
                basqueCheesecakeModal.dataset.currentPrices = pricesString;
                basqueCheesecakeModal.dataset.currentAvailability = availabilityString;

                // Update initial availability statuses for all buttons
                basqueSizeButtons.forEach(btn => {
                    const size = btn.dataset.basqueSize;
                    const statusSpan = btn.querySelector('.availability-status');
                    if (statusSpan && availability[size] !== undefined) {
                        if (availability[size]) {
                            statusSpan.textContent = '(Available)';
                            statusSpan.classList.add('available');
                            statusSpan.classList.remove('not-available');
                        } else {
                            statusSpan.textContent = '(Not Available)';
                            statusSpan.classList.add('not-available');
                            statusSpan.classList.remove('available');
                        }
                    }
                });

                openModal(basqueCheesecakeModal);

            } else if (category === 'cakes') {
                console.log("Category is 'cakes'. Preparing standard cake modal.");
                const bakersNote = card.dataset.bakersNote;

                // Populate the standard cake modal with product data
                if (modalProductImageCake) modalProductImageCake.src = image || '';
                if (modalProductImageCake) modalProductImageCake.alt = name || '';
                if (modalProductNameCake) modalProductNameCake.textContent = name || 'N/A';
                if (modalProductDescriptionCake) modalProductDescriptionCake.textContent = description || 'No description available.';
                if (modalBakersNoteCake) modalBakersNoteCake.textContent = bakersNote || 'No baker\'s note available.';

                // Reset selected button and price for standard cake modal
                cakeSizeButtons.forEach(btn => {
                    btn.classList.remove('selected');
                });
                if (cakeSizePricePlaceholder) cakeSizePricePlaceholder.textContent = '0.00'; // Initial price placeholder

                // Store prices on the modal for easy access by size buttons
                cakeOrderModal.dataset.currentPrices = pricesString;

                openModal(cakeOrderModal);
            } else if (category === 'pastries') {
                console.log("Category is 'pastries'. Preparing cookie modal.");
                // Populate the cookie modal with product data
                if (modalCookieImage) modalCookieImage.src = image || '';
                if (modalCookieImage) modalCookieImage.alt = name || '';
                if (modalCookieName) modalCookieName.textContent = name || 'N/A';
                if (modalCookieDescription) modalCookieDescription.textContent = description || 'No description available.';

                // Reset selected button and price for cookie modal
                cookieQuantityButtons.forEach(btn => {
                    btn.classList.remove('selected');
                });
                if (cookiePricePlaceholder) cookiePricePlaceholder.textContent = '0.00'; // Initial price placeholder

                // Store prices on the modal for easy access by quantity buttons
                cookieOrderModal.dataset.currentPrices = pricesString;

                openModal(cookieOrderModal);
            }
        });
    });

    // --- Close Modal Event Listeners ---
    if (modalCloseButtonCake) {
        modalCloseButtonCake.addEventListener('click', () => closeModal(cakeOrderModal));
    }
    if (cakeOrderModal) {
        cakeOrderModal.addEventListener('click', (event) => {
            if (event.target === cakeOrderModal) {
                closeModal(cakeOrderModal);
            }
        });
    }

    if (modalCloseButtonBasque) { // New close button for Basque modal
        modalCloseButtonBasque.addEventListener('click', () => closeModal(basqueCheesecakeModal));
    }
    if (basqueCheesecakeModal) {
        basqueCheesecakeModal.addEventListener('click', (event) => {
            if (event.target === basqueCheesecakeModal) {
                closeModal(basqueCheesecakeModal);
            }
        });
    }

    if (modalCloseButtonCookie) {
        modalCloseButtonCookie.addEventListener('click', () => closeModal(cookieOrderModal));
    }
    if (cookieOrderModal) {
        cookieOrderModal.addEventListener('click', (event) => {
            if (event.target === cookieOrderModal) {
                closeModal(cookieOrderModal);
            }
        });
    }

    // --- Cookie Quantity Button Logic ---
    cookieQuantityButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log("Cookie quantity button clicked:", button.dataset.quantity);
            // Remove 'selected' class from all buttons in the cookie modal
            cookieQuantityButtons.forEach(btn => btn.classList.remove('selected'));

            // Add 'selected' class to the clicked button
            button.classList.add('selected');

            // Update the price placeholder based on the data-prices from the active cookie
            const selectedQuantity = button.dataset.quantity;
            const currentPricesString = cookieOrderModal.dataset.currentPrices;
            let currentPrices = {};
            try {
                currentPrices = JSON.parse(currentPricesString);
            } catch (e) {
                console.error("Error parsing current prices from modal data:", e, "Prices string:", currentPricesString);
            }

            if (currentPrices && currentPrices[selectedQuantity]) {
                cookiePricePlaceholder.textContent = currentPrices[selectedQuantity].toFixed(2);
            } else {
                cookiePricePlaceholder.textContent = 'N/A';
            }
        });
    });

    // --- Cake Size Button Logic (Standard Cakes) ---
    cakeSizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log("Cake size button clicked:", button.dataset.size);
            // Remove 'selected' class from all buttons in the cake modal
            cakeSizeButtons.forEach(btn => btn.classList.remove('selected'));

            // Add 'selected' class to the clicked button
            button.classList.add('selected');

            // Update the price placeholder based on the data-prices from the active cake
            const selectedSize = button.dataset.size;
            const currentPricesString = cakeOrderModal.dataset.currentPrices;
            let currentPrices = {};
            try {
                currentPrices = JSON.parse(currentPricesString);
            } catch (e) {
                console.error("Error parsing current prices from cake modal data:", e, "Prices string:", currentPricesString);
            }

            if (currentPrices && currentPrices[selectedSize]) {
                cakeSizePricePlaceholder.textContent = currentPrices[selectedSize].toFixed(2);
            } else {
                cakeSizePricePlaceholder.textContent = 'N/A';
            }
        });
    });

    // --- Basque Cheesecake Size/Quantity Button Logic ---
    basqueSizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log("Basque Cheesecake size/quantity button clicked:", button.dataset.basqueSize);
            // Remove 'selected' class from all buttons in the Basque modal
            basqueSizeButtons.forEach(btn => btn.classList.remove('selected'));

            // Add 'selected' class to the clicked button
            button.classList.add('selected');

            // Update the price placeholder and availability based on the data-prices and availability from the active Basque Cheesecake
            const selectedSize = button.dataset.basqueSize;
            const currentPricesString = basqueCheesecakeModal.dataset.currentPrices;
            const currentAvailabilityString = basqueCheesecakeModal.dataset.currentAvailability;

            let currentPrices = {};
            try {
                currentPrices = JSON.parse(currentPricesString);
            } catch (e) {
                console.error("Error parsing current prices from Basque modal data:", e, "Prices string:", currentPricesString);
            }

            let currentAvailability = {};
            try {
                currentAvailability = JSON.parse(currentAvailabilityString);
            } catch (e) {
                console.error("Error parsing current availability from Basque modal data:", e, "Availability string:", currentAvailabilityString);
            }

            if (currentPrices && currentPrices[selectedSize]) {
                basquePricePlaceholder.textContent = currentPrices[selectedSize].toFixed(2);
            } else {
                basquePricePlaceholder.textContent = 'N/A';
            }

            // Update availability status for all buttons based on the current availability data
            basqueSizeButtons.forEach(btn => {
                const size = btn.dataset.basqueSize;
                const statusSpan = btn.querySelector('.availability-status');
                if (statusSpan && currentAvailability[size] !== undefined) {
                    if (currentAvailability[size]) {
                        statusSpan.textContent = '(Available)';
                        statusSpan.classList.add('available');
                        statusSpan.classList.remove('not-available');
                    } else {
                        statusSpan.textContent = '(Not Available)';
                        statusSpan.classList.add('not-available');
                        statusSpan.classList.remove('available');
                    }
                }
            });
        });
    });

    // --- Facebook Order Button Logic (Standard Cake) ---
    if (facebookOrderButton) {
        facebookOrderButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior if it's an anchor tag
            console.log("Standard Cake Facebook order button clicked. Redirecting...");
            // The href is already set in the HTML for the <a> tag
            // If it were a <button>, you would use: window.open('YOUR_FACEBOOK_PAGE_URL_HERE', '_blank');
            // Since it's an <a> tag, the default behavior will handle the navigation.
        });
    }

    // --- Facebook Order Button Logic (Basque Cheesecake Specific) ---
    if (basqueFacebookOrderButton) {
        basqueFacebookOrderButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior if it's an anchor tag
            console.log("Basque Cheesecake Facebook order button clicked. Redirecting...");
            // The href is already set in the HTML for the <a> tag
            // If it were a <button>, you would use: window.open('YOUR_FACEBOOK_PAGE_URL_HERE', '_blank');
            // Since it's an <a> tag, the default behavior will handle the navigation.
        });
    }

    // Call filterProducts initially to set up the default view
    filterProducts();
});
