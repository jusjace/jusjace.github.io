document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded and DOMContentLoaded fired.");

    const splashScreen = document.getElementById('splash-screen');
    const logoBigSplash = document.getElementById('logo-big-splash');
    const mainContent = document.getElementById('main-content');

    // Define a key for sessionStorage
    const SPLASH_SHOWN_KEY = 'splashScreenShown';
    // --- Gallery Image Modal Logic ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalImageTitle = document.getElementById('modal-image-title');
    const modalImageDescription = document.getElementById('modal-image-description');

    if (galleryItems.length > 0 && imageModal && modalImage && modalImageTitle && modalImageDescription) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.dataset.imageSrc;
                const imgAlt = item.dataset.imageAlt;
                const imgDescription = item.dataset.imageDescription;

                modalImage.src = imgSrc;
                modalImage.alt = imgAlt;
                modalImageTitle.textContent = imgAlt; // Using alt as title for consistency
                modalImageDescription.textContent = imgDescription;

                openModal(imageModal);
            });
        });

        // Close modal when clicking outside the content
        imageModal.addEventListener('click', (event) => {
            if (event.target === imageModal) {
                 closeModal(imageModal);
            }
        });
    }

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

    const nonCoffeeSection = document.getElementById('non-coffee-section'); // New: Non-Coffee section
    const nonCoffeeProductContainer = nonCoffeeSection ? nonCoffeeSection.querySelector('.grid') : null;
    const showAllNonCoffeeLink = document.getElementById('show-all-non-coffee-link');


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

    // Generic Drink Order Modal Elements (Renamed from Coffee Modal)
    const drinkOrderModal = document.getElementById('drink-order-modal');
    const modalCloseButtonDrink = document.getElementById('modal-close-button-drink');
    const modalDrinkImage = document.getElementById('modal-drink-image');
    const modalDrinkName = document.getElementById('modal-drink-name');
    const modalDrinkDescription = document.getElementById('modal-drink-description');
    const drinkPricePlaceholder = document.getElementById('drink-price-placeholder');
    const drinkOptionButtons = document.querySelectorAll('#drink-order-modal .button-drink-option');
    const drinkAddOnCheckboxes = document.querySelectorAll('#drink-order-modal .add-on-checkbox');
    const drinkCoffeeTypeSection = document.getElementById('drink-coffee-type-section'); // To hide for non-coffee

    // Matcha Series Order Modal Elements (New Specific Modal)
    const matchaSeriesModal = document.getElementById('matcha-series-modal');
    const modalCloseButtonMatcha = document.getElementById('modal-close-button-matcha');
    const modalMatchaImage = document.getElementById('modal-matcha-image');
    const modalMatchaName = document.getElementById('modal-matcha-name');
    const modalMatchaDescription = document.getElementById('modal-matcha-description');
    const matchaPricePlaceholder = document.getElementById('matcha-price-placeholder');
    const matchaFlavorButtons = document.querySelectorAll('#matcha-series-modal .button-matcha-flavor');
    const matchaOptionButtons = document.querySelectorAll('#matcha-series-modal .button-matcha-option');
    const matchaAddOnCheckboxes = document.querySelectorAll('#matcha-series-modal .matcha-add-on-checkbox');

    // Mini Waffles Order Modal Elements (New Specific Modal)
    const miniWafflesModal = document.getElementById('mini-waffles-modal');
    const modalCloseButtonWaffles = document.getElementById('modal-close-button-waffles');
    const modalWafflesImage = document.getElementById('modal-waffles-image');
    const modalWafflesName = document.getElementById('modal-waffles-name');
    const modalWafflesDescription = document.getElementById('modal-waffles-description');
    const wafflesPricePlaceholder = document.getElementById('waffles-price-placeholder');
    const wafflesFlavorButtons = document.querySelectorAll('#mini-waffles-modal .button-waffles-flavor');
    const wafflesOptionButtons = document.querySelectorAll('#mini-waffles-modal .button-waffles-option');
    const wafflesAddOnCheckboxes = document.querySelectorAll('#mini-waffles-modal .waffles-add-on-checkbox');


    // --- State Variables for Generic Drink Order ---
    let currentDrinkBasePrice = 0;
    let selectedDrinkOptions = {
        size: { value: null, price: 0 },
        type: { value: null, price: 0 },
        'coffee-type': { value: null, price: 0 },
        milk: { value: null, price: 0 },
        sweetener: { value: null, price: 0 }
    };
    let selectedDrinkAddOns = [];

    // --- State Variables for Matcha Series Order ---
    let currentMatchaBasePrice = 0;
    let selectedMatchaOptions = {
        flavor: { value: null, price: 0, image: null }, // Added image to flavor option
        size: { value: null, price: 0 },
        milk: { value: null, price: 0 },
        sweetener: { value: null, price: 0 }
    };
    let selectedMatchaAddOns = [];

    // --- State Variables for Mini Waffles Order ---
    let currentWafflesBasePrice = 0;
    let selectedWafflesOptions = {
        flavor: { value: null, price: 0, image: null }, // Added image to flavor option
        size: { value: null, price: 0 },
        milk: { value: null, price: 0 },
        sweetener: { value: null, price: 0 }
    };
    let selectedWafflesAddOns = [];


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
                } else if (card.dataset.category === 'iced-coffee' || card.dataset.category === 'non-coffee') {
                    // For coffee/non-coffee, assume the smallest size is the base price for filtering
                    const sizePrices = prices.size || {};
                    const flavorPrices = prices; // For matcha, prices might be directly flavors
                    
                    if (Object.keys(sizePrices).length > 0) {
                        return Math.min(...Object.values(sizePrices));
                    } else if (card.dataset.modalType === 'matcha-series' && Object.keys(flavorPrices).length > 0) {
                        // For matcha, get the lowest base_price from flavors
                        const flavorBasePrices = Object.values(flavorPrices).map(f => f.base_price);
                        return Math.min(...flavorBasePrices);
                    }
                    // Fallback for non-coffee if no size or flavor prices are defined, use data-price
                    return parseFloat(card.dataset.price) || 0;
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
        [cakesSection, pastriesSection, icedCoffeeSection, nonCoffeeSection].forEach(section => {
            if (section) section.classList.add('hidden');
        });
        [showAllCakesLink, showAllPastriesLink, showAllIcedCoffeeLink, showAllNonCoffeeLink].forEach(link => {
            if (link) link.classList.add('hidden'); // Hide all "Show All" links during filtering
        });

        let cakesVisibleCount = 0;
        let pastriesVisibleCount = 0;
        let icedCoffeeVisibleCount = 0;
        let nonCoffeeVisibleCount = 0; // New: Non-Coffee visible count

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
                else if (productCategory === 'non-coffee') nonCoffeeVisibleCount++; // Increment non-coffee count
            }
        });

        // Show category sections if they have visible products
        if (cakesVisibleCount > 0) cakesSection.classList.remove('hidden');
        if (pastriesVisibleCount > 0) pastriesSection.classList.remove('hidden');
        if (icedCoffeeVisibleCount > 0) icedCoffeeSection.classList.remove('hidden');
        if (nonCoffeeVisibleCount > 0) nonCoffeeSection.classList.remove('hidden'); // Show non-coffee section

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
    if (showAllNonCoffeeLink) showAllNonCoffeeLink.classList.add('hidden'); // All non-coffee visible initially


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

    if (showAllNonCoffeeLink) { // New: Show All Non-Coffee link
        showAllNonCoffeeLink.addEventListener('click', (event) => {
            event.preventDefault();
            nonCoffeeProductContainer.querySelectorAll('.product-card.hidden').forEach(product => {
                product.classList.remove('hidden');
            });
            showAllNonCoffeeLink.classList.add('hidden'); // Hide the "Show All" link
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

            // Prioritize specific modals first
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

            } else if (modalType === 'mini-waffles') { // This must be checked BEFORE the generic drink modal
                console.log("Opening specific modal for Matcha Series.");

                // Populate the matcha modal with product data
                if (modalWafflesImage) modalWafflesImage.src = image || ''; // Initial image from product card
                if (modalWafflesName) modalWafflesName.textContent = name || 'N/A'; // "Matcha Series"
                if (modalWafflesDescription) modalWafflesDescription.textContent = description || 'No description available.';

                // Reset selected options and add-ons for matcha modal
                selectedWafflesOptions = {
                    flavor: { value: null, price: 0, image: null },
                    size: { value: null, price: 0 },
                    milk: { value: null, price: 0 },
                    sweetener: { value: null, price: 0 }
                };
                selectedWafflesAddOns = [];

                // Deselect all buttons/checkboxes visually
                wafflesFlavorButtons.forEach(btn => {
                    btn.classList.remove('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
                    btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
                });
                wafflesOptionButtons.forEach(btn => {
                    btn.classList.remove('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
                    btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
                });
                wafflesAddOnCheckboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });

                // Store prices data for flavors on the modal for easy access
                miniWafflesModal.dataset.currentPrices = pricesString;

                // Initialize price to 0.00, it will be updated when a flavor is selected
                currentWafflesBasePrice = 0;
                updateWafflesTotalPrice();

                openModal(miniWafflesModal);
            
            }    else if (category === 'cakes') {
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
            } else if (modalType === 'matcha-series') { // This must be checked BEFORE the generic drink modal
                console.log("Opening specific modal for Matcha Series.");

                // Populate the matcha modal with product data
                if (modalMatchaImage) modalMatchaImage.src = image || ''; // Initial image from product card
                if (modalMatchaName) modalMatchaName.textContent = name || 'N/A'; // "Matcha Series"
                if (modalMatchaDescription) modalMatchaDescription.textContent = description || 'No description available.';

                // Reset selected options and add-ons for matcha modal
                selectedMatchaOptions = {
                    flavor: { value: null, price: 0, image: null },
                    size: { value: null, price: 0 },
                    milk: { value: null, price: 0 },
                    sweetener: { value: null, price: 0 }
                };
                selectedMatchaAddOns = [];

                // Deselect all buttons/checkboxes visually
                matchaFlavorButtons.forEach(btn => {
                    btn.classList.remove('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
                    btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
                });
                matchaOptionButtons.forEach(btn => {
                    btn.classList.remove('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
                    btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
                });
                matchaAddOnCheckboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });

                // Store prices data for flavors on the modal for easy access
                matchaSeriesModal.dataset.currentPrices = pricesString;

                // Initialize price to 0.00, it will be updated when a flavor is selected
                currentMatchaBasePrice = 0;
                updateMatchaTotalPrice();

                openModal(matchaSeriesModal);
            } else if (category === 'iced-coffee' || category === 'non-coffee') { // Generic Drink Modal - This is the fallback for drinks without specific modalType
                console.log("Category is 'iced-coffee' or generic 'non-coffee'. Preparing drink modal.");

                // Populate the drink modal with product data
                if (modalDrinkImage) modalDrinkImage.src = image || '';
                if (modalDrinkImage) modalDrinkImage.alt = name || '';
                if (modalDrinkName) modalDrinkName.textContent = name || 'N/A';
                if (modalDrinkDescription) modalDrinkDescription.textContent = description || 'No description available.';

                // Hide/Show coffee-type section based on category
                if (drinkCoffeeTypeSection) {
                    if (category === 'iced-coffee') {
                        drinkCoffeeTypeSection.classList.remove('hidden');
                    } else {
                        drinkCoffeeTypeSection.classList.add('hidden');
                    }
                }

                // Reset selected options and add-ons for drink modal
                selectedDrinkOptions = {
                    size: { value: null, price: 0 },
                    type: { value: null, price: 0 },
                    'coffee-type': { value: null, price: 0 },
                    milk: { value: null, price: 0 },
                    sweetener: { value: null, price: 0 }
                };
                selectedDrinkAddOns = [];

                // Deselect all buttons/checkboxes visually
                drinkOptionButtons.forEach(btn => {
                    btn.classList.remove('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
                    btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
                });
                drinkAddOnCheckboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });

                // Set base price for the drink
                let basePrice = 0;
                if (prices.size && prices.size.Small) {
                    basePrice = prices.size.Small;
                } else if (card.dataset.price) { // Fallback to data-price if no size options
                    basePrice = parseFloat(card.dataset.price);
                }
                currentDrinkBasePrice = basePrice;
                
                updateDrinkTotalPrice(); // Initialize price to base price or 0.00

                openModal(drinkOrderModal);
            
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

    if (modalCloseButtonWaffles) { // Close button for Matcha Series modal
        modalCloseButtonWaffles.addEventListener('click', () => closeModal(miniWafflesModal));
    }
    if (miniWafflesModal) {
        miniWafflesModal.addEventListener('click', (event) => {
            if (event.target === miniWafflesModal) {
                closeModal(miniWafflesModal);
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

    if (modalCloseButtonDrink) { // Close button for Generic Drink modal
        modalCloseButtonDrink.addEventListener('click', () => closeModal(drinkOrderModal));
    }
    if (drinkOrderModal) {
        drinkOrderModal.addEventListener('click', (event) => {
            if (event.target === drinkOrderModal) {
                closeModal(drinkOrderModal);
            }
        });
    }

    if (modalCloseButtonMatcha) { // Close button for Matcha Series modal
        modalCloseButtonMatcha.addEventListener('click', () => closeModal(matchaSeriesModal));
    }
    if (matchaSeriesModal) {
        matchaSeriesModal.addEventListener('click', (event) => {
            if (event.target === matchaSeriesModal) {
                closeModal(matchaSeriesModal);
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

    // --- Generic Drink Option Buttons Logic (Size, Type, Milk, Sweetener, Coffee Type) ---
    drinkOptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const optionType = this.dataset.optionType;
            const optionValue = this.dataset.optionValue;
            const optionPrice = parseFloat(this.dataset.optionPrice);

            // Remove 'selected' classes from previously selected button of the same type
            document.querySelectorAll(`#drink-order-modal .option-${optionType}`).forEach(btn => {
                btn.classList.remove('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
                btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
            });

            // Add 'selected' classes to the clicked button
            this.classList.add('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
            this.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');

            // Update the selected option in our state
            selectedDrinkOptions[optionType] = { value: optionValue, price: optionPrice };

            updateDrinkTotalPrice();
        });
    });

    // --- Generic Drink Add-on Checkboxes Logic ---
    drinkAddOnCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const addOnValue = this.dataset.addOnValue;
            const addOnPrice = parseFloat(this.dataset.addOnPrice);

            if (this.checked) {
                selectedDrinkAddOns.push({ value: addOnValue, price: addOnPrice });
            } else {
                selectedDrinkAddOns = selectedDrinkAddOns.filter(item => item.value !== addOnValue);
            }

            updateDrinkTotalPrice();
        });
    });

    // --- Function to update the total price for generic drinks ---
    function updateDrinkTotalPrice() {
        let totalPrice = currentDrinkBasePrice;

        for (const optionType in selectedDrinkOptions) {
            totalPrice += selectedDrinkOptions[optionType].price;
        }

        selectedDrinkAddOns.forEach(addOn => {
            totalPrice += addOn.price;
        });

        drinkPricePlaceholder.textContent = totalPrice.toFixed(2);
    }


    // --- Matcha Flavor Buttons Logic ---
    matchaFlavorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const flavor = this.dataset.flavor;
            const basePrice = parseFloat(this.dataset.basePrice);
            const imageSrc = this.dataset.imageSrc;

            // Remove 'selected' classes from all flavor buttons
            matchaFlavorButtons.forEach(btn => {
                btn.classList.remove('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
                btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
            });

            // Add 'selected' classes to the clicked button
            this.classList.add('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
            this.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');

            // Update image and name
            if (modalMatchaImage) modalMatchaImage.src = imageSrc;
            if (modalMatchaName) modalMatchaName.textContent = flavor;

            // Update selected flavor in state and base price
            selectedMatchaOptions.flavor = { value: flavor, price: basePrice, image: imageSrc };
            currentMatchaBasePrice = basePrice; // Set the base price for the entire modal calculation

            updateMatchaTotalPrice();
        });
    });

    // --- Matcha Option Buttons Logic (Size, Milk, Sweetener) ---
    matchaOptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const optionType = this.dataset.optionType;
            const optionValue = this.dataset.optionValue;
            const optionPrice = parseFloat(this.dataset.optionPrice);

            // Remove 'selected' classes from previously selected button of the same type
            document.querySelectorAll(`#matcha-series-modal .option-${optionType}`).forEach(btn => {
                btn.classList.remove('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
                btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
            });

            // Add 'selected' classes to the clicked button
            this.classList.add('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
            this.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');

            // Update the selected option in our state
            selectedMatchaOptions[optionType] = { value: optionValue, price: optionPrice };

            updateMatchaTotalPrice();
        });
    });

    // --- Matcha Add-on Checkboxes Logic ---
    matchaAddOnCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const addOnValue = this.dataset.addOnValue;
            const addOnPrice = parseFloat(this.dataset.addOnPrice);

            if (this.checked) {
                selectedMatchaAddOns.push({ value: addOnValue, price: addOnPrice });
            } else {
                selectedMatchaAddOns = selectedMatchaAddOns.filter(item => item.value !== addOnValue);
            }

            updateMatchaTotalPrice();
        });
    });

    // --- Function to update the total price for Matcha Series ---
    function updateMatchaTotalPrice() {
        let totalPrice = currentMatchaBasePrice;

        // Add prices from selected options (size, milk, sweetener)
        for (const optionType in selectedMatchaOptions) {
            // Skip 'flavor' as its price is already in currentMatchaBasePrice
            if (optionType !== 'flavor') {
                totalPrice += selectedMatchaOptions[optionType].price;
            }
        }

        // Add prices from selected add-ons
        selectedMatchaAddOns.forEach(addOn => {
            totalPrice += addOn.price;
        });

        matchaPricePlaceholder.textContent = totalPrice.toFixed(2);
    }

    // --- Matcha Flavor Buttons Logic ---
    matchaFlavorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const flavor = this.dataset.flavor;
            const basePrice = parseFloat(this.dataset.basePrice);
            const imageSrc = this.dataset.imageSrc;

            // Remove 'selected' classes from all flavor buttons
            matchaFlavorButtons.forEach(btn => {
                btn.classList.remove('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
                btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
            });

            // Add 'selected' classes to the clicked button
            this.classList.add('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
            this.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');

            // Update image and name
            if (modalMatchaImage) modalMatchaImage.src = imageSrc;
            if (modalMatchaName) modalMatchaName.textContent = flavor;

            // Update selected flavor in state and base price
            selectedMatchaOptions.flavor = { value: flavor, price: basePrice, image: imageSrc };
            currentMatchaBasePrice = basePrice; // Set the base price for the entire modal calculation

            updateMatchaTotalPrice();
        });
    });

    // --- Mini Waffles Option Buttons Logic (Size, Milk, Sweetener) ---
    wafflesOptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const optionType = this.dataset.optionType;
            const optionValue = this.dataset.optionValue;
            const optionPrice = parseFloat(this.dataset.optionPrice);

            // Remove 'selected' classes from previously selected button of the same type
            document.querySelectorAll(`#mini-waffles-modal .option-${optionType}`).forEach(btn => {
                btn.classList.remove('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
                btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
            });

            // Add 'selected' classes to the clicked button
            this.classList.add('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
            this.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');

            // Update the selected option in our state
            selectedWafflesOptions[optionType] = { value: optionValue, price: optionPrice };

            updateWafflesTotalPrice();
        });
    });

    // --- Waffles Add-on Checkboxes Logic ---
    wafflesAddOnCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const addOnValue = this.dataset.addOnValue;
            const addOnPrice = parseFloat(this.dataset.addOnPrice);

            if (this.checked) {
                selectedWafflesAddOns.push({ value: addOnValue, price: addOnPrice });
            } else {
                selectedWafflesAddOns = selectedWafflesAddOns.filter(item => item.value !== addOnValue);
            }

            updateWafflesTotalPrice();
        });
    });

    // --- Function to update the total price for mini waffles ---
    function updateWafflesTotalPrice() {
        let totalPrice = currentWafflesBasePrice;

        // Add prices from selected options (size, milk, sweetener)
        for (const optionType in selectedWafflesOptions) {
            // Skip 'flavor' as its price is already in currentMatchaBasePrice
            if (optionType !== 'flavor') {
                totalPrice += selectedWafflesOptions[optionType].price;
            }
        }

        // Add prices from selected add-ons
        selectedWafflesAddOns.forEach(addOn => {
            totalPrice += addOn.price;
        });

        wafflesPricePlaceholder.textContent = totalPrice.toFixed(2);
    }
    // --- Matcha Flavor Buttons Logic ---
    wafflesFlavorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const flavor = this.dataset.flavor;
            const basePrice = parseFloat(this.dataset.basePrice);
            const imageSrc = this.dataset.imageSrc;

            // Remove 'selected' classes from all flavor buttons
            wafflesFlavorButtons.forEach(btn => {
                btn.classList.remove('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
                btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
            });

            // Add 'selected' classes to the clicked button
            this.classList.add('bg-indigo-100', 'text-indigo-800', 'ring-2', 'ring-indigo-500');
            this.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');

            // Update image and name
            if (modalWafflesImage) modalWafflesImage.src = imageSrc;
            if (modalWafflesName) modalWafflesName.textContent = flavor;

            // Update selected flavor in state and base price
            selectedWafflesOptions.flavor = { value: flavor, price: basePrice, image: imageSrc };
            currentWafflesBasePrice = basePrice; // Set the base price for the entire modal calculation

            updateWafflesTotalPrice();
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
