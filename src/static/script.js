document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const cartItemCount = document.getElementById('cart-item-count');
    const categoryButtons = document.querySelectorAll('.category-button');
    const searchInput = document.getElementById('search-input');
    const marketValueDisplay = document.getElementById('market-value-display');
    const sellerGrid = document.getElementById('seller-grid');
    const marketValuePanel = document.getElementById('market-value-panel');
    const marketValueToggle = document.getElementById('market-value-toggle');
    const cartIconLink = document.getElementById('cart-icon-link');
    const personIconLink = document.getElementById('person-icon-link');

    let cart = JSON.parse(localStorage.getItem('ventraCart')) || [];
    let users = JSON.parse(localStorage.getItem('ventraUsers')) || [];
    let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')) || null;

    const products = [
        {
            id: 1,
            name: "Ramesh Rice Mandi",
            description: "Basmati rice - 5kg",
            price: 500,
            image: "https://images.pexels.com/photos/1039864/pexels-photo-1039864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            category: "grains",
            sellerId: 1
        },
        {
            id: 2,
            name: "Fresh Local Potatoes",
            description: "Organic potatoes - 1kg",
            price: 50,
            image: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            category: "veggies",
            sellerId: 2
        },
        {
            id: 3,
            name: "Premium Turmeric Powder",
            description: "Organic Haldi - 200g",
            price: 120,
            image: "https://images.pexels.com/photos/3387137/pexels-photo-3387137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            category: "masala",
            sellerId: 3
        },
        {
            id: 4,
            name: "Cinnamon Sticks",
            description: "Ceylon Cinnamon - 50g",
            price: 80,
            image: "https://images.pexels.com/photos/2085350/pexels-photo-2085350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            category: "spices",
            sellerId: 4
        },
        {
            id: 5,
            name: "Artisan Sourdough Bread",
            description: "Freshly baked daily",
            price: 180,
            image: "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            category: "bakery",
            sellerId: 5
        },
        {
            id: 6,
            name: "Farm Fresh Apples",
            description: "Crisp & juicy - 1kg",
            price: 150,
            image: "https://images.pexels.com/photos/1020479/pexels-photo-1020479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            category: "fruits",
            sellerId: 1
        },
        {
            id: 7,
            name: "Whole Wheat Flour",
            description: "Chakki Atta - 10kg",
            price: 350,
            image: "https://images.pexels.com/photos/3387133/pexels-photo-3387133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            category: "grains",
            sellerId: 2
        },
        {
            id: 8,
            name: "Red Chilli Powder",
            description: "Spicy Mirchi - 250g",
            price: 90,
            image: "https://images.pexels.com/photos/2092911/pexels-photo-2092911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            category: "masala",
            sellerId: 3
        },
        {
            id: 9,
            name: "Fresh Bell Peppers",
            description: "Mixed colors - 500g",
            price: 70,
            image: "https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            category: "veggies",
            sellerId: 4
        },
        {
            id: 10,
            name: "Garlic Powder",
            description: "Aromatic - 100g",
            price: 60,
            image: "https://images.pexels.com/photos/236625/pexels-photo-236625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            category: "spices",
            sellerId: 5
        }
    ];

    const sellers = [
        { id: 1, name: "Shree Balaji Suppliers", location: "Delhi", score: 1250, avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { id: 2, name: "Green Harvest Mandi", location: "Noida", score: 980, avatar: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { id: 3, name: "Spice Route Traders", location: "Gurgaon", score: 1520, avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { id: 4, name: "Urban Farms Connect", location: "Faridabad", score: 810, avatar: "https://images.pexels.com/photos/712521/pexels-photo-712521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { id: 5, name: "Bake Haven Supplies", location: "Ghaziabad", score: 1100, avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }
    ];

    // Detailed seller profiles (matching structure of seller-profile.html)
    const sellerDetailedProfiles = {
        1: {
            companyName: "Shree Balaji Suppliers",
            ownerName: "Anil Sharma",
            phone: "+91 99887 76655",
            email: "balaji@example.com",
            location: "Delhi",
            tagline: "Quality grains, reliable delivery, every time.",
            avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            addresses: [
                { street: "Plot No. 1, Okhla Ind. Area", city: "Delhi", state: "Delhi", pincode: "110020", label: "Main Depot", isDefault: true },
                { street: "Shop 2, Azadpur Mandi", city: "Delhi", state: "Delhi", pincode: "110033", label: "Retail Outlet", isDefault: false }
            ],
            reachablePlaces: [
                "All Delhi NCR regions",
                "Bulk orders nationwide (via tie-ups)"
            ],
            reviews: [
                { rating: 4.8, reviewer: "Food Corner", comment: "Excellent rice quality and quick dispatch. Highly recommended for bulk purchases." },
                { rating: 4.5, reviewer: "Local Dhaba", comment: "Consistent supply, prices are competitive. Sometimes delivery is a bit slow during peak hours." }
            ],
            stats: {
                products: 85,
                shipping: 350,
                delivery: 1200,
                cancelled: 15,
                rating: "4.7/5",
                totalWorth: "75 lakh+"
            },
            weeklyInsights: [
                { label: "Orders Received", value: "150 this week", dotColor: "primary-yellow" },
                { label: "Products Sold", value: "2500 units total", dotColor: "secondary-red" },
                { label: "Avg. Dispatch Time", value: "1.0 days", dotColor: "primary-yellow" },
                { label: "Average Rating", value: "4.7", icon: "star", dotColor: "primary-yellow" },
                { label: "Repeat Customers", value: "80 buyers returned", dotColor: "secondary-red" },
                { label: "Top Product", value: "Basmati Rice", dotColor: "primary-yellow" }
            ]
        },
        2: {
            companyName: "Green Harvest Mandi",
            ownerName: "Prakash Kumar",
            phone: "+91 98765 43210",
            email: "greenharvest@example.com",
            location: "Noida",
            tagline: "Fresh, organic, direct from farm to table.",
            avatar: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            addresses: [
                { street: "Farm Road 5, Sector 135", city: "Noida", state: "Uttar Pradesh", pincode: "201304", label: "Farmhouse & Dispatch", isDefault: true }
            ],
            reachablePlaces: [
                "Noida, Greater Noida, Ghaziabad",
                "Limited Delhi areas"
            ],
            reviews: [
                { rating: 4.9, reviewer: "Chef's Kitchen", comment: "The freshest vegetables we've ever received. Fantastic quality and vibrant produce!" },
                { rating: 4.7, reviewer: "Local Vendor", comment: "Reliable source for organic veggies. Prices are fair, and their greens are exceptional." }
            ],
            stats: {
                products: 45,
                shipping: 100,
                delivery: 400,
                cancelled: 5,
                rating: "4.8/5",
                totalWorth: "20 lakh+"
            },
            weeklyInsights: [
                { label: "Orders Received", value: "80 this week", dotColor: "primary-yellow" },
                { label: "Products Sold", value: "750 units total", dotColor: "secondary-red" },
                { label: "Avg. Dispatch Time", value: "0.8 days", dotColor: "primary-yellow" },
                { label: "Average Rating", value: "4.8", icon: "star", dotColor: "primary-yellow" },
                { label: "Repeat Customers", value: "40 buyers returned", dotColor: "secondary-red" },
                { label: "Top Product", value: "Spinach", dotColor: "primary-yellow" }
            ]
        },
        3: {
            companyName: "Spice Route Traders",
            ownerName: "Deepak Gupta",
            phone: "+91 99112 23344",
            email: "spiceroute@example.com",
            location: "Gurgaon",
            tagline: "Aromatic spices from across the globe, delivered to your door.",
            avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            addresses: [
                { street: "Unit 15, Spices Hub, Sector 34", city: "Gurgaon", state: "Haryana", pincode: "122001", label: "Processing Unit", isDefault: true }
            ],
            reachablePlaces: [
                "Gurgaon, Delhi NCR",
                "Pan-India (bulk orders)"
            ],
            reviews: [
                { rating: 5.0, reviewer: "Biryani House", comment: "Their garam masala is simply divine! Always enhances the flavor." },
                { rating: 4.8, reviewer: "Mom's Kitchen", comment: "Finest quality spices, fresh and potent. Packaging is excellent too." }
            ],
            stats: {
                products: 200,
                shipping: 500,
                delivery: 1500,
                cancelled: 10,
                rating: "4.9/5",
                totalWorth: "80 lakh+"
            },
            weeklyInsights: [
                { label: "Orders Received", value: "180 this week", dotColor: "primary-yellow" },
                { label: "Products Sold", value: "3000 units total", dotColor: "secondary-red" },
                { label: "Avg. Dispatch Time", value: "1.5 days", dotColor: "primary-yellow" },
                { label: "Average Rating", value: "4.9", icon: "star", dotColor: "primary-yellow" },
                { label: "Repeat Customers", value: "90 buyers returned", dotColor: "secondary-red" },
                { label: "Top Product", value: "Cumin Powder", dotColor: "primary-yellow" }
            ]
        },
        4: {
            companyName: "Urban Farms Connect",
            ownerName: "Meena Devi",
            phone: "+91 87654 32109",
            email: "urbanfarms@example.com",
            location: "Faridabad",
            tagline: "Connecting urban vendors to farm-fresh produce.",
            avatar: "https://images.pexels.com/photos/712521/pexels-photo-712521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            addresses: [
                { street: "Village Road, Sector 86", city: "Faridabad", state: "Haryana", pincode: "121004", label: "Collection Point", isDefault: true }
            ],
            reachablePlaces: [
                "Faridabad, Palwal, Gurgaon (select areas)"
            ],
            reviews: [
                { rating: 4.5, reviewer: "Fruit Cart", comment: "Their seasonal fruits are always a hit with my customers. Good quality!" },
                { rating: 4.2, reviewer: "Juice Stand", comment: "Sometimes delivery is delayed, but produce quality is generally good." }
            ],
            stats: {
                products: 60,
                shipping: 110,
                delivery: 380,
                cancelled: 7,
                rating: "4.4/5",
                totalWorth: "18 lakh+"
            },
            weeklyInsights: [
                { label: "Orders Received", value: "70 this week", dotColor: "primary-yellow" },
                { label: "Products Sold", value: "600 units total", dotColor: "secondary-red" },
                { label: "Avg. Dispatch Time", value: "1.1 days", dotColor: "primary-yellow" },
                { label: "Average Rating", value: "4.4", icon: "star", dotColor: "primary-yellow" },
                { label: "Repeat Customers", value: "35 buyers returned", dotColor: "secondary-red" },
                { label: "Top Product", value: "Mangoes (seasonal)", dotColor: "primary-yellow" }
            ]
        },
        5: {
            companyName: "Bake Haven Supplies",
            ownerName: "Rohan Varma",
            phone: "+91 90123 45678",
            email: "bakehaven@example.com",
            location: "Ghaziabad",
            tagline: "Your daily dose of fresh baked goods supplies.",
            avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            addresses: [
                { street: "Bakery Lane, Main Road", city: "Ghaziabad", state: "Uttar Pradesh", pincode: "201001", label: "Central Bakery", isDefault: true }
            ],
            reachablePlaces: [
                "Ghaziabad, East Delhi",
                "Limited Noida areas"
            ],
            reviews: [
                { rating: 4.7, reviewer: "Street Bakery", comment: "Fresh bread daily, my customers love it. Never faced any issues." },
                { rating: 4.0, reviewer: "Cafe Corner", comment: "Good quality, but their delivery slot is a bit early for our needs." }
            ],
            stats: {
                products: 25,
                shipping: 90,
                delivery: 300,
                cancelled: 3,
                rating: "4.6/5",
                totalWorth: "15 lakh+"
            },
            weeklyInsights: [
                { label: "Orders Received", value: "60 this week", dotColor: "primary-yellow" },
                { label: "Products Sold", value: "500 units total", dotColor: "secondary-red" },
                { label: "Avg. Dispatch Time", value: "0.5 days", dotColor: "primary-yellow" },
                { label: "Average Rating", value: "4.6", icon: "star", dotColor: "primary-yellow" },
                { label: "Repeat Customers", value: "30 buyers returned", dotColor: "secondary-red" },
                { label: "Top Product", value: "Sourdough Loaf", dotColor: "primary-yellow" }
            ]
        }
    };

    const orders = JSON.parse(localStorage.getItem('ventraOrders')) || [];

    function showAlert(message, type = 'error') {
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', type);
        alertDiv.innerHTML = `<span class="material-icons">${type === 'error' ? 'error_outline' : 'check_circle'}</span> ${message}`;
        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.classList.add('show');
        }, 10);

        setTimeout(() => {
            alertDiv.classList.remove('show');
            alertDiv.addEventListener('transitionend', () => alertDiv.remove());
        }, 3000);
    }

    function updateAuthHeader() {
        if (personIconLink) {
            if (loggedInUser) {
                if (loggedInUser.role === 'buyer') {
                    personIconLink.href = "buyer-profile.html";
                } else if (loggedInUser.role === 'seller') {
                    personIconLink.href = "seller-profile.html";
                } else {
                    personIconLink.href = "#"; // Fallback for other roles
                }
                personIconLink.title = `Logged in as ${loggedInUser.name} (${loggedInUser.role})`;
            } else {
                personIconLink.href = "signin.html";
                personIconLink.title = "Sign In / Sign Up";
            }
        }
    }

    function renderProducts(filterCategory = 'all', searchTerm = '') {
        if (!productGrid) return; // Exit if not on the index page

        productGrid.innerHTML = '';
        const filteredProducts = products.filter(product => {
            const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  product.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (filteredProducts.length === 0) {
            productGrid.innerHTML = '<p style="text-align: center; width: 100%; color: #777; font-size: 1.1em; padding: 20px;">No products found matching your criteria.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </div>
                <div class="product-info">
                    <div>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                    </div>
                    <div class="product-price-wrapper">
                        <span class="product-price">₹${product.price}</span>
                        <button class="add-to-cart-button" data-product-id="${product.id}">
                            Add to cart <span class="material-icons">add_shopping_cart</span>
                        </button>
                    </div>
                </div>
            `;
            productGrid.appendChild(productCard);
        });

        document.querySelectorAll('.add-to-cart-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.currentTarget.dataset.productId);
                addToCart(productId);
            });
        });
    }

    function addToCart(productId) {
        if (!loggedInUser || loggedInUser.role !== 'buyer') {
            showAlert('Please log in as a buyer to add items to cart.', 'error');
            return;
        }
        const product = products.find(p => p.id === productId);
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCartCount();
            showAlert(`${product.name} added to cart!`, 'success');
            updateSellerScore(product.sellerId, 10); // Add 10 points for a purchase
        } else {
            showAlert('Error: Product not found.', 'error');
        }
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartItemCount.textContent = totalItems;
        localStorage.setItem('ventraCart', JSON.stringify(cart));
    }

    function updateSellerScore(sellerId, points) {
        const seller = sellers.find(s => s.id === sellerId);
        if (seller) {
            seller.score += points;
            if (sellerGrid) renderBestSellers(); // Only re-render if on main page
        }
    }

    // Category filter logic (only on index.html)
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const category = button.dataset.category;
                const currentSearchTerm = searchInput.value;
                renderProducts(category, currentSearchTerm);
            });
        });
    }

    // Search input logic (only on index.html)
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const currentCategory = document.querySelector('.category-button.active').dataset.category;
            const searchTerm = searchInput.value;
            renderProducts(currentCategory, searchTerm);
        });
    }

    // Real-time Market Value Simulation (always update panel if present)
    const marketData = {
        'Basmati Rice (5kg)': { price: 520, change: 0.025 },
        'Potatoes (1kg)': { price: 25, change: -0.012 },
        'Onions (1kg)': { price: 30, change: 0.008 },
        'Tomatoes (1kg)': { price: 40, change: 0.035 },
        'Wheat (10kg)': { price: 380, change: -0.005 }
    };

    function updateMarketValue() {
        if (!marketValueDisplay) return; // Exit if panel content not present

        marketValueDisplay.innerHTML = '';
        for (const item in marketData) {
            const data = marketData[item];
            const priceChange = (Math.random() - 0.5) * 0.03; // Random change between -1.5% and +1.5%
            data.price = Math.round(data.price * (1 + priceChange));
            data.change = priceChange;

            const changeClass = data.change >= 0 ? 'positive' : 'negative';
            const changeText = `${data.change >= 0 ? '+' : ''}${(data.change * 100).toFixed(1)}%`;

            const marketItemDiv = document.createElement('div');
            marketItemDiv.classList.add('market-item');
            marketItemDiv.innerHTML = `
                <span class="item-name">${item}</span>
                <span class="item-price">₹${data.price} <span class="change ${changeClass}">(${changeText})</span></span>
            `;
            marketValueDisplay.appendChild(marketItemDiv);
        }
    }

    // Best Sellers display (only on index.html)
    function renderBestSellers() {
        if (!sellerGrid) return; // Exit if not on the index page

        sellerGrid.innerHTML = '';
        const sortedSellers = [...sellers].sort((a, b) => b.score - a.score);

        sortedSellers.forEach(seller => {
            // Changed from 'div' to 'a' tag to make the entire card clickable
            const sellerCard = document.createElement('a');
            sellerCard.classList.add('seller-card');
            sellerCard.href = `seller-profile.html?sellerId=${seller.id}`; // Set the href directly

            sellerCard.innerHTML = `
                <img src="${seller.avatar}" alt="${seller.name}" class="seller-avatar">
                <div class="seller-info">
                    <h3 class="seller-name">${seller.name}</h3>
                    <p class="seller-location"><span class="material-icons">location_on</span> ${seller.location}</p>
                    <p class="seller-score"><span class="material-icons">star</span> Score: ${seller.score}</p>
                </div>
            `;
            sellerGrid.appendChild(sellerCard);

            // Removed explicit click listener as the <a> tag handles navigation
        });
    }

    // Event listener for Market Value Panel toggle
    if (marketValueToggle) {
        // Set initial state for desktop icon (points left when panel is closed)
        // Mobile icon state is managed by CSS based on media query
        if (window.innerWidth >= 769) {
            marketValueToggle.querySelector('.material-icons').style.transform = 'rotate(0deg)';
        }

        marketValueToggle.addEventListener('click', () => {
            const isExpanded = marketValuePanel.classList.toggle('expanded');
            marketValueToggle.classList.toggle('is-open', isExpanded); // Toggle class on the toggle itself
        });
    }

    // Handle cart icon link click to go to checkout page
    if (cartIconLink) {
        cartIconLink.addEventListener('click', (event) => {
            // The href is already set to checkout.html, so default behavior is fine unless complex logic is needed
            // For now, let the anchor tag handle navigation
        });
    }

    // Checkout page specific logic
    const orderSummaryContainer = document.getElementById('order-summary');
    const checkoutTotalElement = document.getElementById('checkout-total');
    const checkoutForm = document.getElementById('checkout-form');

    function renderCheckoutSummary() {
        if (!orderSummaryContainer || !checkoutTotalElement) return;

        orderSummaryContainer.innerHTML = '';
        let subtotal = 0;

        if (cart.length === 0) {
            orderSummaryContainer.innerHTML = '<p style="text-align: center; color: #777;">Your cart is empty.</p>';
            checkoutTotalElement.textContent = '₹0';
            if (checkoutForm) checkoutForm.querySelector('.place-order-button').disabled = true;
            return;
        }

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            const orderItemDiv = document.createElement('div');
            orderItemDiv.classList.add('order-item');
            orderItemDiv.innerHTML = `
                <span class="item-name-qty">${item.name} (x${item.quantity})</span>
                <span class="item-price-total">₹${itemTotal.toFixed(2)}</span>
            `;
            orderSummaryContainer.appendChild(orderItemDiv);
        });

        const subtotalDiv = document.createElement('div');
        subtotalDiv.classList.add('subtotal');
        subtotalDiv.innerHTML = `<span>Subtotal:</span><span>₹${subtotal.toFixed(2)}</span>`;
        orderSummaryContainer.appendChild(subtotalDiv);

        // Example for delivery fee, tax etc.
        const deliveryFee = 40; // Example flat fee
        const grandTotal = subtotal + deliveryFee;

        const deliveryFeeDiv = document.createElement('div');
        deliveryFeeDiv.classList.add('order-item');
        deliveryFeeDiv.innerHTML = `<span>Delivery Fee:</span><span class="item-price-total">₹${deliveryFee.toFixed(2)}</span>`;
        orderSummaryContainer.appendChild(deliveryFeeDiv);

        checkoutTotalElement.textContent = `₹${grandTotal.toFixed(2)}`;

        if (checkoutForm) checkoutForm.querySelector('.place-order-button').disabled = false;
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (cart.length === 0) {
                showAlert('Your cart is empty. Please add items before placing an order.', 'error');
                return;
            }
            if (!loggedInUser || loggedInUser.role !== 'buyer') {
                showAlert('Please log in as a buyer to place an order.', 'error');
                return;
            }
            // Simulate order placement
            const orderId = 'ORD' + Date.now();
            const customerName = document.getElementById('customer-name').value;
            const customerAddress = document.getElementById('delivery-address').value;

            const newOrder = {
                id: orderId,
                items: cart,
                total: parseFloat(checkoutTotalElement.textContent.replace('₹', '')),
                customer: customerName,
                address: customerAddress,
                status: 'Order Placed',
                timestamp: new Date().toISOString(),
                trackingSteps: [
                    { status: 'Order Placed', time: new Date().toISOString(), completed: true },
                    { status: 'Packed', time: null, completed: false },
                    { status: 'Out for Delivery', time: null, completed: false },
                    { status: 'Delivered', time: null, completed: false }
                ]
            };
            orders.push(newOrder);
            localStorage.setItem('ventraOrders', JSON.stringify(orders));
            localStorage.removeItem('ventraCart'); // Clear cart after order
            cart = []; // Update in-memory cart
            updateCartCount(); // Update cart count in header

            showAlert(`Order ${orderId} placed successfully!`, 'success');
            setTimeout(() => {
                // Redirect to delivery tracking page with order ID
                window.location.href = `delivery.html?orderId=${orderId}`;
            }, 1500);
        });
    }

    // Delivery Tracking page specific logic
    const trackingInfoDiv = document.getElementById('tracking-info');
    const trackingStatusContainer = document.getElementById('tracking-status-container');
    const progressLineFill = document.getElementById('progress-line-fill');
    const mapContainer = document.getElementById('map-container');
    const driverInfoCard = document.getElementById('driver-info-card');

    function getUrlParameter(name) {
        name = name.replace(/[[]/,'\\[').replace(/[\\]/,'\\\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    function renderTrackingDetails() {
        if (!trackingInfoDiv || !trackingStatusContainer) return;

        const orderId = getUrlParameter('orderId');
        const order = orders.find(o => o.id === orderId);

        if (!order) {
            trackingInfoDiv.innerHTML = '<p>Order not found. Please check the Order ID.</p>';
            trackingStatusContainer.innerHTML = '';
            if(mapContainer) mapContainer.innerHTML = '';
            if(driverInfoCard) driverInfoCard.innerHTML = '';
            return;
        }

        trackingInfoDiv.innerHTML = `
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Status:</strong> <span id="current-order-status">${order.status}</span></p>
            <p><strong>Estimated Delivery:</strong> ${new Date(new Date().getTime() + 3 * 60 * 60 * 1000).toLocaleString('en-IN', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
        `;

        trackingStatusContainer.innerHTML = '';
        const statusSteps = ['Order Placed', 'Packed', 'Out for Delivery', 'Delivered'];
        let completedSteps = 0;

        statusSteps.forEach((step, index) => {
            const stepData = order.trackingSteps[index];
            const isCompleted = stepData ? stepData.completed : false;
            const isActive = order.status === step;

            if (isCompleted) completedSteps++;

            const statusStepDiv = document.createElement('div');
            statusStepDiv.classList.add('status-step');
            if (isCompleted) statusStepDiv.classList.add('completed');
            if (isActive) statusStepDiv.classList.add('active');

            let icon = '';
            switch (step) {
                case 'Order Placed': icon = 'playlist_add_check'; break;
                case 'Packed': icon = 'inventory_2'; break;
                case 'Out for Delivery': icon = 'local_shipping'; break;
                case 'Delivered': icon = 'assignment_turned_in'; break;
            }

            statusStepDiv.innerHTML = `
                <div class="status-icon"><span class="material-icons">${icon}</span></div>
                <p>${step}</p>
            `;
            trackingStatusContainer.appendChild(statusStepDiv);
        });

        if (progressLineFill) {
            const progressPercentage = (completedSteps / statusSteps.length) * 100;
            progressLineFill.style.width = `${progressPercentage}%`;
        }

        // Simulate map and driver info
        if (mapContainer) {
            const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112108.35821360565!2d77.16432655!3d28.59508975!3d28.59508975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb629%3A0x377fcf87019d651c!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin`;
            mapContainer.innerHTML = `<iframe src="${mapSrc}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
        }

        if (driverInfoCard) {
            driverInfoCard.innerHTML = `
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Driver Avatar" class="driver-avatar">
                <div class="driver-details">
                    <h3>Delivery Partner: Raj Sharma</h3>
                    <p>Contact: +91 98765 43210</p>
                </div>
            `;
        }

        // Simulate status updates (for demonstration)
        let currentStatusIndex = statusSteps.indexOf(order.status);
        if (currentStatusIndex < statusSteps.length - 1) {
            setTimeout(() => {
                currentStatusIndex++;
                order.status = statusSteps[currentStatusIndex];
                order.trackingSteps[currentStatusIndex].completed = true;
                order.trackingSteps[currentStatusIndex].time = new Date().toISOString();
                localStorage.setItem('ventraOrders', JSON.stringify(orders));
                showAlert(`Order ${order.id} status updated to: ${order.status}`, 'success');
                renderTrackingDetails(); // Re-render with updated status
            }, 15000); // Simulate status update every 15 seconds
        }
    }

    // Sign Up page logic
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            const role = document.querySelector('input[name="role"]:checked').value;

            if (!name || !email || !password || !confirmPassword || !role) {
                showAlert('Please fill in all fields.', 'error');
                return;
            }
            if (password !== confirmPassword) {
                showAlert('Passwords do not match.', 'error');
                return;
            }
            if (users.some(user => user.email === email)) {
                showAlert('User with this email already exists.', 'error');
                return;
            }

            const newUser = { name, email, password, role, cart: [], orders: [], addresses: [], stats: { totalCart: 0, totalOrders: 0, totalDelivered: 0, totalCancelled: 0, rating: 0, lifetimeSpent: 0 }, transactions: [], categoriesOrdered: {}, paymentLogs: {} };
            users.push(newUser);
            localStorage.setItem('ventraUsers', JSON.stringify(users));
            showAlert('Registration successful! Please sign in.', 'success');
            signupForm.reset();
            setTimeout(() => {
                window.location.href = 'signin.html';
            }, 1500);
        });
    }

    // Sign In page logic
    const signinForm = document.getElementById('signin-form');
    const forgotPasswordLink = document.getElementById('forgot-password-link');

    function handleLogout() {
        loggedInUser = null;
        sessionStorage.removeItem('loggedInUser');
        showAlert('You have been logged out.', 'success');
        updateAuthHeader(); // Update header on logout
        setTimeout(() => {
            window.location.href = 'index.html'; // Redirect to home page after logout
        }, 1000);
    }

    if (signinForm) {
        signinForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('signin-email').value;
            const password = document.getElementById('signin-password').value;
            const role = document.querySelector('input[name="role"]:checked').value;

            if (!email || !password || !role) {
                showAlert('Please enter email, password, and select a role.', 'error');
                return;
            }

            const user = users.find(u => u.email === email && u.password === password && u.role === role);

            if (user) {
                loggedInUser = user;
                sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                showAlert(`Welcome, ${user.name}! You are logged in as ${user.role}.`, 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showAlert('Invalid email, password, or role.', 'error');
            }
        });

        const logoutButton = document.getElementById('logout-button'); // From signin.html
        if(logoutButton) {
            logoutButton.addEventListener('click', handleLogout);
        }
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            showAlert('Password reset functionality is coming soon!', 'info');
        });
    }

    // Buyer Profile Page Logout Button
    const logoutButtonProfile = document.getElementById('profile-logout-button');
    if(logoutButtonProfile) {
        logoutButtonProfile.addEventListener('click', handleLogout);
    }

    // Buyer Profile Page Logic
    const profileUserName = document.getElementById('profile-user-name');
    const profilePhone = document.getElementById('profile-phone');
    const profileEmail = document.getElementById('profile-email');
    const profileLocation = document.getElementById('profile-location');
    const profileRole = document.getElementById('profile-role');
    const profileDescription = document.querySelector('.profile-description');
    const profileAvatar = document.querySelector('.profile-avatar');
    const walletBalance = document.getElementById('wallet-balance');
    const savedAddressesList = document.getElementById('saved-addresses-list');
    const transactionList = document.getElementById('transaction-list');
    const categoriesList = document.getElementById('categories-list');
    const paymentLogsList = document.getElementById('payment-logs-list');

    // Stat Elements
    const statCart = document.getElementById('stat-cart');
    const statOrders = document.getElementById('stat-orders');
    const statDelivered = document.getElementById('stat-delivered');
    const statCancelled = document.getElementById('stat-cancelled');
    const statRating = document.getElementById('stat-rating');
    const statLifetimeSpent = document.getElementById('stat-lifetime-spent');

    function renderBuyerProfile() {
        if (!document.querySelector('.profile-page-container') || !loggedInUser || loggedInUser.role !== 'buyer') {
            if (document.querySelector('.profile-page-container')) {
                showAlert('You must be logged in as a buyer to view this page.', 'error');
                setTimeout(() => { window.location.href = 'signin.html'; }, 1500);
            }
            return; // Exit if not on profile page or not a buyer
        }

        // Mock data for Alex John (if no actual user data is available)
        const AlexJohnData = {
            name: "Alex John",
            phone: "0123456789",
            email: "Alex062000@gmail.com",
            location: "Chennai",
            role: "Buyer",
            description: "Actively building long-term supplier partnerships.",
            avatar: "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Example Pexels image for Alex John
            balance: 202500,
            addresses: [
                { street: "123, Industrial Area, Peenya", city: "Bangalore", state: "Karnataka", pincode: "560058", label: "Main Warehouse", isDefault: true },
                { street: "45, Market Road, Yeshwanthpur", city: "Bangalore", state: "Karnataka", pincode: "560022", label: "Secondary Godown", isDefault: false }
            ],
            stats: {
                cart: cart.length, // Use actual cart length
                orders: 38,
                delivered: 84,
                cancelled: 18,
                rating: "4.8/5",
                lifetimeSpent: "2,00,000"
            },
            transactions: [
                { id: 1, item: "Onions 60kg", status: "Delivered", price: 1500, icon: "onion" },
                { id: 2, item: "Carrots 35kg", status: "Delivered", price: 875, icon: "carrot" },
                { id: 3, item: "Green Chillies 12kg", status: "Cancelled", price: 300, icon: "pepper-hot" },
                { id: 4, item: "Potatoes 80kg", status: "Out for Delivery", price: 1840, icon: "potato" },
                { id: 5, item: "Garlic 25kg", status: "Delivered", price: 1250, icon: "garlic" },
                { id: 6, item: "Corn 40kg", status: "Delivered", price: 1000, icon: "corn" },
                { id: 7, item: "Tomatoes 45kg", status: "Pending", price: 1125, icon: "tomato" },
                { id: 8, item: "Capsicum 20kg", status: "Delivered", price: 760, icon: "bell-pepper" },
                { id: 9, item: "Salt 15kg", status: "Delivered", price: 135, icon: "salt" },
                { id: 10, item: "Toor Dal 50kg", status: "Delivered", price: 3600, icon: "bean" }
            ],
            categoriesOrdered: [
                { name: "Vegetables", percentage: "40%", icon: "carrot" },
                { name: "Grains", percentage: "25%", icon: "grain" },
                { name: "Packaging", percentage: "15%", icon: "package" },
                { name: "Cleaning", percentage: "10%", icon: "broom" },
                { name: "Beverages", percentage: "10%", icon: "coffee" }
            ],
            paymentLogs: [
                { method: "GPay", amount: 10000 },
                { method: "Cash", amount: 4300 },
                { method: "UPI", amount: 6150 }
            ]
        };

        // Use actual logged-in user data if available, otherwise use mock data
        const currentUserData = loggedInUser || AlexJohnData;

        if (profileUserName) profileUserName.textContent = currentUserData.name;
        if (profilePhone) profilePhone.textContent = currentUserData.phone || 'N/A';
        if (profileEmail) profileEmail.textContent = currentUserData.email || 'N/A';
        if (profileLocation) profileLocation.textContent = currentUserData.location || 'N/A';
        if (profileRole) profileRole.textContent = currentUserData.role || 'N/A';
        if (profileDescription) profileDescription.textContent = currentUserData.description || '';
        if (profileAvatar) profileAvatar.src = currentUserData.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"; // Default avatar
        if (walletBalance) walletBalance.textContent = `₹${currentUserData.balance ? currentUserData.balance.toLocaleString('en-IN') : '0'}`;

        // Render Saved Addresses
        if (savedAddressesList) {
            savedAddressesList.innerHTML = '';
            currentUserData.addresses.forEach(address => {
                const addressDiv = document.createElement('div');
                addressDiv.classList.add('address-item');
                addressDiv.innerHTML = `
                    <p>${address.street}, ${address.city}, ${address.state} - ${address.pincode}</p>
                    <p class="address-label">${address.label} ${address.isDefault ? '<span class="default-address-tag">Default Address</span>' : ''}</p>
                `;
                savedAddressesList.appendChild(addressDiv);
            });
        }

        // Render Stats
        if (statCart) statCart.textContent = currentUserData.stats.cart;
        if (statOrders) statOrders.textContent = currentUserData.stats.orders;
        if (statDelivered) statDelivered.textContent = currentUserData.stats.delivered;
        if (statCancelled) statCancelled.textContent = currentUserData.stats.cancelled;
        if (statRating) statRating.textContent = currentUserData.stats.rating;
        if (statLifetimeSpent) statLifetimeSpent.textContent = `${currentUserData.stats.lifetimeSpent}+`;

        // Render Transaction History
        if (transactionList) {
            transactionList.innerHTML = '';
            currentUserData.transactions.forEach((transaction, index) => {
                const transactionDiv = document.createElement('div');
                transactionDiv.classList.add('transaction-item');
                let statusClass = '';
                let iconifyIcon = '';
                switch(transaction.status) {
                    case 'Delivered': statusClass = 'status-delivered'; iconifyIcon = 'mdi:truck-check'; break;
                    case 'Pending': statusClass = 'status-pending'; iconifyIcon = 'mdi:clock-outline'; break;
                    case 'Cancelled': statusClass = 'status-cancelled'; iconifyIcon = 'mdi:cancel'; break;
                    case 'Out for Delivery': statusClass = 'status-out-for-delivery'; iconifyIcon = 'mdi:truck-delivery'; break;
                }
                transactionDiv.innerHTML = `
                    <div class="transaction-details">
                        <span class="transaction-name">${index + 1}. ${transaction.item}</span>
                        <span class="transaction-status ${statusClass}"><iconify-icon icon="${iconifyIcon}"></iconify-icon> ${transaction.status}</span>
                    </div>
                    <span class="transaction-price">₹${transaction.price.toLocaleString('en-IN')}</span>
                `;
                transactionList.appendChild(transactionDiv);
            });
        }

        // Render Top Categories Ordered
        if (categoriesList) {
            categoriesList.innerHTML = '';
            const categoryIcons = {
                "Vegetables": "mdi:carrot",
                "Grains": "mdi:grain",
                "Packaging": "mdi:package",
                "Cleaning": "mdi:broom",
                "Beverages": "mdi:coffee"
            };
            currentUserData.categoriesOrdered.forEach(category => {
                const categoryLi = document.createElement('li');
                categoryLi.innerHTML = `
                    <span class="category-name"><iconify-icon icon="${categoryIcons[category.name] || 'mdi:food'}"></iconify-icon> ${category.name}</span>
                    <span class="category-percentage">${category.percentage}</span>
                `;
                categoriesList.appendChild(categoryLi);
            });
        }

        // Render Payment Mode Logs
        if (paymentLogsList) {
            paymentLogsList.innerHTML = '';
            currentUserData.paymentLogs.forEach(log => {
                const paymentLi = document.createElement('li');
                paymentLi.innerHTML = `
                    <span class="payment-method">${log.method}</span>
                    <span class="payment-amount">₹${log.amount.toLocaleString('en-IN')}</span>
                `;
                paymentLogsList.appendChild(paymentLi);
            });
        }
    }

    // Seller Profile Page Logic
    const sellerCompanyName = document.getElementById('seller-company-name');
    const sellerOwnerName = document.getElementById('seller-owner-name');
    const sellerPhone = document.getElementById('seller-phone');
    const sellerEmail = document.getElementById('seller-email');
    const sellerLocation = document.getElementById('seller-location');
    const sellerTagline = document.getElementById('seller-tagline');
    const sellerAvatar = document.querySelector('.seller-info-card .seller-avatar');
    const sellerAddressesList = document.getElementById('seller-addresses-list');
    const sellerReviewsList = document.getElementById('seller-reviews-list');

    const sellerStatProducts = document.getElementById('seller-stat-products');
    const sellerStatShipping = document.getElementById('seller-stat-shipping');
    const sellerStatDelivery = document.getElementById('seller-stat-delivery');
    const sellerStatCancelled = document.getElementById('seller-stat-cancelled');
    const sellerStatRating = document.getElementById('seller-stat-rating');
    const sellerStatTotalWorth = document.getElementById('seller-stat-total-worth');

    const weeklyInsightsList = document.getElementById('weekly-insights-list');

    function renderSellerProfile() {
        const isSellerProfilePage = document.querySelector('.seller-profile-page-container');
        if (!isSellerProfilePage) return;

        const sellerId = getUrlParameter('sellerId');
        let currentSellerData = sellerDetailedProfiles[sellerId];

        if (!currentSellerData) {
            // Fallback if sellerId is not found or not provided, use a default seller for display
            currentSellerData = sellerDetailedProfiles[Object.keys(sellerDetailedProfiles)[0]]; 
            if (!currentSellerData) {
                isSellerProfilePage.innerHTML = '<p style="text-align: center; color: #777; font-size: 1.2em; padding: 50px;">Seller profile not found.</p>';
                return;
            }
            showAlert('Seller profile not found for the given ID. Displaying a default profile.', 'info');
        }

        // Populate general info
        if (sellerCompanyName) sellerCompanyName.textContent = currentSellerData.companyName;
        if (sellerOwnerName) sellerOwnerName.textContent = currentSellerData.ownerName;
        if (sellerPhone) sellerPhone.textContent = currentSellerData.phone;
        if (sellerEmail) sellerEmail.textContent = currentSellerData.email;
        if (sellerLocation) sellerLocation.textContent = currentSellerData.location;
        if (sellerTagline) sellerTagline.textContent = `"${currentSellerData.tagline}"`;
        if (sellerAvatar) sellerAvatar.src = currentSellerData.avatar;

        // Populate addresses
        const reachablePlacesInfo = document.querySelector('.reachable-places-info ul');
        if (sellerAddressesList) {
            sellerAddressesList.innerHTML = '';
            currentSellerData.addresses.forEach(address => {
                const addressDiv = document.createElement('div');
                addressDiv.classList.add('address-item');
                addressDiv.innerHTML = `
                    <p>${address.street}, ${address.city}, ${address.state} - ${address.pincode}</p>
                    <p class="address-label">${address.label} ${address.isDefault ? '<span class="default-address-tag">Default Address</span>' : ''}</p>
                `;
                sellerAddressesList.appendChild(addressDiv);
            });
        }

        if (reachablePlacesInfo) {
            reachablePlacesInfo.innerHTML = '';
            currentSellerData.reachablePlaces.forEach(place => {
                const li = document.createElement('li');
                li.textContent = place;
                reachablePlacesInfo.appendChild(li);
            });
        }

        // Populate reviews
        if (sellerReviewsList) {
            sellerReviewsList.innerHTML = '';
            currentSellerData.reviews.forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.classList.add('review-item');
                reviewDiv.innerHTML = `
                    <p class="review-meta">${review.rating} <span class="material-icons star-rating">star</span> by ${review.reviewer}</p>
                    <p class="review-text">"${review.comment}"</p>
                `;
                sellerReviewsList.appendChild(reviewDiv);
            });
        }

        // Populate stats
        if (sellerStatProducts) sellerStatProducts.textContent = currentSellerData.stats.products;
        if (sellerStatShipping) sellerStatShipping.textContent = currentSellerData.stats.shipping;
        if (sellerStatDelivery) sellerStatDelivery.textContent = currentSellerData.stats.delivery;
        if (sellerStatCancelled) sellerStatCancelled.textContent = currentSellerData.stats.cancelled;
        if (sellerStatRating) sellerStatRating.textContent = currentSellerData.stats.rating;
        if (sellerStatTotalWorth) sellerStatTotalWorth.textContent = currentSellerData.stats.totalWorth;

        // Populate weekly insights
        if (weeklyInsightsList) {
            weeklyInsightsList.innerHTML = '';
            currentSellerData.weeklyInsights.forEach(insight => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="dot ${insight.dotColor}"></span> ${insight.label}: ${insight.value}
                    ${insight.icon ? `<span class="material-icons small-star">${insight.icon}</span>` : ''}
                `;
                weeklyInsightsList.appendChild(li);
            });
        }
    }

    // Initial renders based on page
    if (document.querySelector('.product-grid')) {
        renderProducts();
        renderBestSellers();
    }
    if (document.querySelector('.market-value-panel')) {
        updateMarketValue();
        setInterval(updateMarketValue, 10000);
    }
    if (document.querySelector('.checkout-section')) {
        renderCheckoutSummary();
    }
    if (document.querySelector('.delivery-tracking-section')) {
        renderTrackingDetails();
    }
    if (document.querySelector('.profile-page-container')) {
        renderBuyerProfile();
    }
    if (document.querySelector('.seller-profile-page-container')) {
        renderSellerProfile();
    }

    // Ensure cart count and auth header are updated on every page load
    updateCartCount();
    updateAuthHeader();
});
