// Mock Products Dataset across categories
        const PRODUCTS = [
            {
                id: 1,
                name: "Studio Wireless Headphones Pro",
                category: "Electronics",
                price: 249.99,
                originalPrice: 299.99,
                rating: 4.8,
                reviewsCount: 128,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
                description: "Experience high-fidelity spatial audio with active noise cancellation, custom acoustic platform, and up to 40 hours of battery life.",
                inStock: true,
                badge: "Bestseller",
                tags: ["Discount", "Audio", "Tech"]
            },
            {
                id: 2,
                name: "Minimalist Ergonomic Watch",
                category: "Accessories",
                price: 129.50,
                originalPrice: 160.00,
                rating: 4.6,
                reviewsCount: 84,
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600",
                description: "Crafted with premium grade stainless steel casing and genuine Italian leather strap. Water resistant up to 50 meters.",
                inStock: true,
                badge: "Hot",
                tags: ["Fashion", "Watch"]
            },
            {
                id: 3,
                name: "Smart Fitness Companion Watch",
                category: "Electronics",
                price: 199.00,
                originalPrice: 220.00,
                rating: 4.5,
                reviewsCount: 210,
                image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600",
                description: "Track your workouts, heart rate, sleep cycles, and stay connected with real-time phone notifications on an AMOLED retina display.",
                inStock: true,
                badge: "New",
                tags: ["Tech", "Fitness"]
            },
            {
                id: 4,
                name: "Ultra-Lightweight Running Shoes",
                category: "Fashion",
                price: 89.99,
                originalPrice: 119.99,
                rating: 4.7,
                reviewsCount: 95,
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
                description: "Breathable mesh upper with ultra-responsive foam cushioning engineered for maximum speed and shock absorption.",
                inStock: true,
                badge: "Sale",
                tags: ["Discount", "Fashion"]
            },
            {
                id: 5,
                name: "Ceramic Minimalist Desk Lamp",
                category: "Home & Living",
                price: 64.00,
                originalPrice: 75.00,
                rating: 4.3,
                reviewsCount: 42,
                image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600",
                description: "Warm, eye-friendly LED lighting with touch sensitivity control and wireless phone charging pad base.",
                inStock: true,
                badge: null,
                tags: ["Home"]
            },
            {
                id: 6,
                name: "Natural Botanical Scented Candle",
                category: "Home & Living",
                price: 28.00,
                originalPrice: 32.00,
                rating: 4.9,
                reviewsCount: 67,
                image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600",
                description: "Hand-poured 100% soy wax candle infused with lavender, sandalwood, and organic essential oils for 50+ hours burn time.",
                inStock: true,
                badge: "Popular",
                tags: ["Home"]
            },
            {
                id: 7,
                name: "Leather Executive Travel Backpack",
                category: "Accessories",
                price: 145.00,
                originalPrice: 180.00,
                rating: 4.8,
                reviewsCount: 112,
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600",
                description: "Water-resistant vegan leather backpack with dedicated 16-inch laptop compartment, hidden anti-theft pocket, and USB port.",
                inStock: false,
                badge: "Out of Stock",
                tags: ["Travel", "Accessories"]
            },
            {
                id: 8,
                name: "Noise-Cancelling Wireless Earbuds",
                category: "Electronics",
                price: 119.99,
                originalPrice: 149.99,
                rating: 4.4,
                reviewsCount: 153,
                image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600",
                description: "Compact wireless earbuds delivering deep bass, crystal clear mics for calls, and quick charging case.",
                inStock: true,
                badge: "Sale",
                tags: ["Discount", "Audio"]
            }
        ];

        // Application State
        let state = {
            cart: JSON.parse(localStorage.getItem('shopease_cart')) || [],
            wishlist: JSON.parse(localStorage.getItem('shopease_wishlist')) || [],
            appliedCoupon: null,
            filters: {
                category: 'All',
                maxPrice: 1000,
                rating: 0,
                inStockOnly: false,
                searchQuery: '',
                sortBy: 'featured'
            }
        };

        // DOM Initialization
        document.addEventListener('DOMContentLoaded', () => {
            initCategoryFilters();
            renderProducts();
            updateCartUI();
            updateWishlistUI();
            setupEventListeners();
        });

        // Event Listeners Registration
        function setupEventListeners() {
            // Cart Drawers
            document.getElementById('btn-open-cart').addEventListener('click', () => toggleModal('cart-drawer', true));
            document.getElementById('btn-close-cart').addEventListener('click', () => toggleModal('cart-drawer', false));
            document.getElementById('cart-backdrop').addEventListener('click', () => toggleModal('cart-drawer', false));

            // Wishlist Drawers
            document.getElementById('btn-open-wishlist').addEventListener('click', () => toggleModal('wishlist-drawer', true));
            document.getElementById('btn-close-wishlist').addEventListener('click', () => toggleModal('wishlist-drawer', false));
            document.getElementById('wishlist-backdrop').addEventListener('click', () => toggleModal('wishlist-drawer', false));

            // Quick View
            document.getElementById('btn-close-qv').addEventListener('click', () => toggleModal('quick-view-modal', false));
            document.getElementById('qv-backdrop').addEventListener('click', () => toggleModal('quick-view-modal', false));

            // Checkout
            document.getElementById('btn-proceed-checkout').addEventListener('click', () => {
                if (state.cart.length === 0) {
                    showToast('Your cart is empty!', 'warning');
                    return;
                }
                toggleModal('cart-drawer', false);
                toggleModal('checkout-modal', true);
            });
            document.getElementById('btn-close-checkout').addEventListener('click', () => toggleModal('checkout-modal', false));
            document.getElementById('checkout-backdrop').addEventListener('click', () => toggleModal('checkout-modal', false));

            // Search inputs
            const searchInput = document.getElementById('search-input');
            const mobileSearch = document.getElementById('mobile-search-input');
            
            [searchInput, mobileSearch].forEach(input => {
                if(!input) return;
                input.addEventListener('input', (e) => {
                    state.filters.searchQuery = e.target.value.toLowerCase().trim();
                    renderProducts();
                    if(input === searchInput) handleAutocomplete(e.target.value);
                });
            });

            document.getElementById('clear-search').addEventListener('click', () => {
                searchInput.value = '';
                state.filters.searchQuery = '';
                document.getElementById('search-suggestions').classList.add('hidden');
                document.getElementById('clear-search').classList.add('hidden');
                renderProducts();
            });

            // Price Slider
            const priceSlider = document.getElementById('price-slider');
            priceSlider.addEventListener('input', (e) => {
                state.filters.maxPrice = parseFloat(e.target.value);
                document.getElementById('price-range-value').textContent = `₹${e.target.value}`;
                renderProducts();
            });

            // Rating radios
            document.querySelectorAll('input[name="rating-filter"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    state.filters.rating = parseFloat(e.target.value);
                    renderProducts();
                });
            });

            // In Stock Checkbox
            document.getElementById('in-stock-only').addEventListener('change', (e) => {
                state.filters.inStockOnly = e.target.checked;
                renderProducts();
            });

            // Sort Select
            document.getElementById('sort-select').addEventListener('change', (e) => {
                state.filters.sortBy = e.target.value;
                renderProducts();
            });

            // Reset Filters
            document.getElementById('reset-filters').addEventListener('click', resetAllFilters);

            // Coupon Application
            document.getElementById('btn-apply-coupon').addEventListener('click', applyCoupon);
        }

        // Initialize Category Filter Sidebar
        function initCategoryFilters() {
            const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
            const container = document.getElementById('category-filter-list');
            
            container.innerHTML = categories.map(cat => `
                <button onclick="setCategory('${cat}')" 
                    class="category-btn w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex justify-between items-center ${cat === 'All' ? 'bg-brand-50 text-brand-600 font-bold shadow-sm' : 'text-slate-600 hover:bg-slate-100'}">
                    <span>${cat}</span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${cat === 'All' ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-500'}">
                        ${cat === 'All' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length}
                    </span>
                </button>
            `).join('');
        }

        function setCategory(cat) {
            state.filters.category = cat;
            document.querySelectorAll('.category-btn').forEach(btn => {
                const isActive = btn.innerText.includes(cat);
                btn.className = `category-btn w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex justify-between items-center ${isActive ? 'bg-brand-50 text-brand-600 font-bold shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`;
            });
            renderProducts();
        }

        function filterByTag(tag) {
            state.filters.searchQuery = tag.toLowerCase();
            document.getElementById('search-input').value = tag;
            renderProducts();
        }

        function resetAllFilters() {
            state.filters = {
                category: 'All',
                maxPrice: 1000,
                rating: 0,
                inStockOnly: false,
                searchQuery: '',
                sortBy: 'featured'
            };
            document.getElementById('search-input').value = '';
            document.getElementById('mobile-search-input').value = '';
            document.getElementById('price-slider').value = 1000;
            document.getElementById('price-range-value').textContent = '₹1,000';
            document.querySelector('input[name="rating-filter"][value="0"]').checked = true;
            document.getElementById('in-stock-only').checked = false;
            document.getElementById('sort-select').value = 'featured';
            setCategory('All');
        }

        // Render Product Cards Grid
        function renderProducts() {
            let filtered = PRODUCTS.filter(p => {
                const matchesCategory = state.filters.category === 'All' || p.category === state.filters.category;
                const matchesPrice = p.price <= state.filters.maxPrice;
                const matchesRating = p.rating >= state.filters.rating;
                const matchesStock = !state.filters.inStockOnly || p.inStock;
                const matchesSearch = !state.filters.searchQuery || 
                    p.name.toLowerCase().includes(state.filters.searchQuery) || 
                    p.description.toLowerCase().includes(state.filters.searchQuery) ||
                    p.category.toLowerCase().includes(state.filters.searchQuery) ||
                    p.tags.some(t => t.toLowerCase().includes(state.filters.searchQuery));

                return matchesCategory && matchesPrice && matchesRating && matchesStock && matchesSearch;
            });

            // Sorting logic
            if (state.filters.sortBy === 'price-low') filtered.sort((a,b) => a.price - b.price);
            if (state.filters.sortBy === 'price-high') filtered.sort((a,b) => b.price - a.price);
            if (state.filters.sortBy === 'rating') filtered.sort((a,b) => b.rating - a.rating);

            document.getElementById('product-count').textContent = filtered.length;

            const grid = document.getElementById('product-grid');
            const emptyView = document.getElementById('no-products-view');

            if (filtered.length === 0) {
                grid.classList.add('hidden');
                emptyView.classList.remove('hidden');
                return;
            }

            grid.classList.remove('hidden');
            emptyView.classList.add('hidden');

            grid.innerHTML = filtered.map(product => {
                const isWishlisted = state.wishlist.some(id => id === product.id);
                return `
                    <div class="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden relative">
                        
                        <!-- Top Image & Quick Badges -->
                        <div class="relative h-60 overflow-hidden bg-slate-100">
                            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                            <div class="absolute inset-0 bg-slate-950/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            ${product.badge ? `
                                <span class="absolute top-3.5 left-3.5 bg-slate-950/85 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-md border border-white/10">
                                    ${product.badge}
                                </span>
                            ` : ''}

                            <!-- Wishlist Toggle -->
                            <button onclick="toggleWishlist(${product.id})" class="absolute top-3.5 right-3.5 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md text-slate-700 hover:text-rose-500 flex items-center justify-center transition-all shadow-md ${isWishlisted ? 'text-rose-500 bg-white' : ''}">
                                <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart text-sm"></i>
                            </button>

                            <!-- Quick View Overlay Button -->
                            <button onclick="openQuickView(${product.id})" class="absolute inset-x-4 bottom-3.5 py-2.5 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white">
                                <i class="fa-solid fa-eye text-brand-600"></i> Quick View
                            </button>
                        </div>

                        <!-- Card Body -->
                        <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
                            <div>
                                <div class="flex justify-between items-center mb-1.5">
                                    <span class="text-[10px] font-extrabold text-brand-600 uppercase tracking-widest">${product.category}</span>
                                    <span class="text-xs font-bold text-slate-800 flex items-center px-2 py-0.5 bg-amber-400/10 rounded-lg text-amber-600 border border-amber-400/20">
                                        <i class="fa-solid fa-star text-[10px] mr-1 text-amber-500"></i>${product.rating} <span class="text-slate-400 text-[10px] font-medium ml-1">(${product.reviewsCount})</span>
                                    </span>
                                </div>
                                <h3 class="font-extrabold text-slate-900 text-base line-clamp-1 group-hover:text-brand-600 transition-colors">${product.name}</h3>
                                <p class="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">${product.description}</p>
                            </div>

                            <!-- Pricing & Add to Cart -->
                            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    <span class="text-xl font-black text-slate-900">₹${product.price.toFixed(2)}</span>
                                    ${product.originalPrice ? `<span class="text-xs text-slate-400 font-semibold line-through ml-1.5">₹${product.originalPrice.toFixed(2)}</span>` : ''}
                                </div>
                                <button onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''} 
                                    class="px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${product.inStock ? 'bg-brand-50 text-brand-600 hover:bg-brand-600 hover:text-white shadow-sm' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}">
                                    <i class="fa-solid fa-cart-plus"></i> ${product.inStock ? 'Add' : 'Out of Stock'}
                                </button>
                            </div>
                        </div>

                    </div>
                `;
            }).join('');
        }

        // Cart Logic & Management
        function addToCart(productId, qty = 1) {
            const product = PRODUCTS.find(p => p.id === productId);
            if(!product || !product.inStock) return;

            const existingIndex = state.cart.findIndex(item => item.id === productId);
            if (existingIndex > -1) {
                state.cart[existingIndex].quantity += qty;
            } else {
                state.cart.push({ ...product, quantity: qty });
            }

            saveCart();
            updateCartUI();
            showToast(`Added ${product.name} to your cart!`, 'success');
        }

        function updateCartQuantity(productId, delta) {
            const index = state.cart.findIndex(item => item.id === productId);
            if (index === -1) return;

            state.cart[index].quantity += delta;
            if (state.cart[index].quantity <= 0) {
                state.cart.splice(index, 1);
            }
            saveCart();
            updateCartUI();
        }

        function removeFromCart(productId) {
            state.cart = state.cart.filter(item => item.id !== productId);
            saveCart();
            updateCartUI();
            showToast('Item removed from cart', 'info');
        }

        function saveCart() {
            localStorage.setItem('shopease_cart', JSON.stringify(state.cart));
        }

        function updateCartUI() {
            const cartCount = state.cart.reduce((total, item) => total + item.quantity, 0);
            
            // Badges
            const badge = document.getElementById('cart-badge');
            document.getElementById('cart-drawer-count').textContent = cartCount;
            if (cartCount > 0) {
                badge.textContent = cartCount;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }

            // Cart Items List
            const container = document.getElementById('cart-items-container');
            if (state.cart.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-16 space-y-3">
                        <div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto text-2xl">
                            <i class="fa-solid fa-basket-shopping"></i>
                        </div>
                        <p class="text-sm font-bold text-slate-700">Your cart is currently empty</p>
                        <p class="text-xs text-slate-400">Discover awesome items in our shop catalog.</p>
                    </div>
                `;
            } else {
                container.innerHTML = state.cart.map(item => `
                    <div class="flex items-center space-x-3.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl flex-shrink-0">
                        <div class="flex-1 min-w-0">
                            <h4 class="text-xs font-bold text-slate-900 truncate">${item.name}</h4>
                            <p class="text-xs font-extrabold text-brand-600 mt-0.5">₹${item.price.toFixed(2)}</p>
                            <div class="flex items-center space-x-2 mt-2">
                                <button onclick="updateCartQuantity(${item.id}, -1)" class="w-6 h-6 rounded-lg bg-white text-slate-700 border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-100">-</button>
                                <span class="text-xs font-black text-slate-900 w-5 text-center">${item.quantity}</span>
                                <button onclick="updateCartQuantity(${item.id}, 1)" class="w-6 h-6 rounded-lg bg-white text-slate-700 border border-slate-200 flex items-center justify-center text-xs font-bold hover:bg-slate-100">+</button>
                            </div>
                        </div>
                        <button onclick="removeFromCart(${item.id})" class="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                            <i class="fa-solid fa-trash-can text-sm"></i>
                        </button>
                    </div>
                `).join('');
            }

            // Calculation
            const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            let discount = state.appliedCoupon ? subtotal * 0.20 : 0;
            const tax = (subtotal - discount) * 0.08;
            const shipping = subtotal > 99 || subtotal === 0 ? 0 : 15.00;
            const total = subtotal - discount + tax + (subtotal > 0 ? shipping : 0);

            document.getElementById('cart-subtotal').textContent = `₹${subtotal.toFixed(2)}`;
            document.getElementById('cart-tax').textContent = `₹${tax.toFixed(2)}`;
            document.getElementById('cart-shipping').textContent = shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`;
            document.getElementById('cart-total').textContent = `₹${total.toFixed(2)}`;
            document.getElementById('checkout-final-amount').textContent = `₹${total.toFixed(2)}`;

            if(state.appliedCoupon) {
                document.getElementById('discount-row').classList.remove('hidden');
                document.getElementById('cart-discount').textContent = `-₹${discount.toFixed(2)}`;
            } else {
                document.getElementById('discount-row').classList.add('hidden');
            }
        }

        // Coupon Application
        function applyCoupon() {
            const input = document.getElementById('coupon-code-input').value.trim().toUpperCase();
            if (input === 'EASE20') {
                state.appliedCoupon = 'EASE20';
                showToast('20% Discount Coupon Applied!', 'success');
                updateCartUI();
            } else {
                showToast('Invalid Coupon Code', 'error');
            }
        }

        // Wishlist Logic
        function toggleWishlist(productId) {
            const index = state.wishlist.indexOf(productId);
            if (index > -1) {
                state.wishlist.splice(index, 1);
                showToast('Removed from wishlist', 'info');
            } else {
                state.wishlist.push(productId);
                showToast('Saved to your wishlist!', 'success');
            }
            localStorage.setItem('shopease_wishlist', JSON.stringify(state.wishlist));
            updateWishlistUI();
            renderProducts();
        }

        function updateWishlistUI() {
            const count = state.wishlist.length;
            const badge = document.getElementById('wishlist-badge');
            if (count > 0) {
                badge.textContent = count;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }

            const container = document.getElementById('wishlist-items-container');
            if (count === 0) {
                container.innerHTML = `
                    <div class="text-center py-16 space-y-3">
                        <div class="w-16 h-16 bg-rose-50 text-rose-400 rounded-3xl flex items-center justify-center mx-auto text-2xl">
                            <i class="fa-regular fa-heart"></i>
                        </div>
                        <p class="text-sm font-bold text-slate-700">No saved items yet</p>
                    </div>
                `;
            } else {
                const items = PRODUCTS.filter(p => state.wishlist.includes(p.id));
                container.innerHTML = items.map(item => `
                    <div class="flex items-center space-x-3.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-xl flex-shrink-0">
                        <div class="flex-1 min-w-0">
                            <h4 class="text-xs font-bold text-slate-900 truncate">${item.name}</h4>
                            <p class="text-xs font-extrabold text-brand-600 mt-0.5">₹${item.price.toFixed(2)}</p>
                        </div>
                        <button onclick="addToCart(${item.id}); toggleWishlist(${item.id});" class="px-3.5 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-brand-700 transition-colors">
                            Move to Cart
                        </button>
                    </div>
                `).join('');
            }
        }

        // Quick View Modal
        function openQuickView(productId) {
            const p = PRODUCTS.find(item => item.id === productId);
            if (!p) return;

            const qvContent = document.getElementById('qv-content');
            qvContent.innerHTML = `
                <div class="h-64 sm:h-full bg-slate-100 relative">
                    <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover">
                </div>
                <div class="p-6 sm:p-8 flex flex-col justify-between space-y-5">
                    <div>
                        <span class="text-[10px] font-extrabold text-brand-600 uppercase tracking-widest">${p.category}</span>
                        <h2 class="text-xl font-extrabold text-slate-900 mt-1">${p.name}</h2>
                        <div class="flex items-center space-x-2 mt-2">
                            <span class="text-amber-500 text-xs flex"><i class="fa-solid fa-star"></i></span>
                            <span class="text-xs font-bold text-slate-800">${p.rating}</span>
                            <span class="text-xs text-slate-400">(${p.reviewsCount} customer reviews)</span>
                        </div>
                        <p class="text-slate-600 text-xs leading-relaxed mt-4 font-normal">${p.description}</p>
                    </div>

                    <div class="space-y-4 pt-4 border-t border-slate-100">
                        <div class="flex items-baseline space-x-2">
                            <span class="text-2xl font-black text-slate-900">₹${p.price.toFixed(2)}</span>
                            ${p.originalPrice ? `<span class="text-xs text-slate-400 line-through font-semibold">₹${p.originalPrice.toFixed(2)}</span>` : ''}
                        </div>
                        <button onclick="addToCart(${p.id}); toggleModal('quick-view-modal', false);" class="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-2xl shadow-lg shadow-brand-600/30 transition-all text-xs sm:text-sm flex items-center justify-center gap-2">
                            <i class="fa-solid fa-cart-shopping"></i> Add to Cart Now
                        </button>
                    </div>
                </div>
            `;
            toggleModal('quick-view-modal', true);
        }

        // Search Autocomplete Handling
        function handleAutocomplete(query) {
            const suggestions = document.getElementById('search-suggestions');
            const clearBtn = document.getElementById('clear-search');

            if (!query.trim()) {
                suggestions.classList.add('hidden');
                clearBtn.classList.add('hidden');
                return;
            }

            clearBtn.classList.remove('hidden');

            const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4);

            if (matches.length === 0) {
                suggestions.classList.add('hidden');
                return;
            }

            suggestions.innerHTML = matches.map(p => `
                <div onclick="openQuickView(${p.id}); document.getElementById('search-suggestions').classList.add('hidden');" class="p-3.5 hover:bg-slate-50 cursor-pointer flex items-center space-x-3.5 transition-colors">
                    <img src="${p.image}" alt="${p.name}" class="w-11 h-11 rounded-xl object-cover">
                    <div>
                        <p class="text-xs font-bold text-slate-900">${p.name}</p>
                        <p class="text-[11px] text-brand-600 font-extrabold">₹${p.price.toFixed(2)}</p>
                    </div>
                </div>
            `).join('');

            suggestions.classList.remove('hidden');
        }

        // Modal Toggling Utility
        function toggleModal(modalId, show) {
            const el = document.getElementById(modalId);
            if (!el) return;
            if (show) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        }

        // Checkout & Order Completion
        function processCheckout() {
            const randomOrderId = '#SE-' + Math.floor(10000 + Math.random() * 90000);
            document.getElementById('success-order-id').textContent = randomOrderId;
            
            // Reset Cart
            state.cart = [];
            state.appliedCoupon = null;
            saveCart();
            updateCartUI();

            toggleModal('checkout-modal', false);
            toggleModal('order-success-modal', true);
        }

        function closeSuccessModal() {
            toggleModal('order-success-modal', false);
        }

        // Toast Notification System
        function showToast(message, type = 'info') {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            
            const bgColors = {
                success: 'bg-slate-950 text-white border-l-4 border-emerald-500',
                error: 'bg-slate-950 text-white border-l-4 border-rose-500',
                warning: 'bg-slate-950 text-white border-l-4 border-amber-500',
                info: 'bg-slate-950 text-white border-l-4 border-brand-500'
            };

            const icons = {
                success: '<i class="fa-solid fa-circle-check text-emerald-400 mr-2.5"></i>',
                error: '<i class="fa-solid fa-circle-xmark text-rose-400 mr-2.5"></i>',
                warning: '<i class="fa-solid fa-triangle-exclamation text-amber-400 mr-2.5"></i>',
                info: '<i class="fa-solid fa-circle-info text-brand-400 mr-2.5"></i>'
            };

            toast.className = `pointer-events-auto px-4 py-3.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center ${bgColors[type]} transition-all duration-300 transform translate-y-2 opacity-0`;
            toast.innerHTML = `${icons[type]} <span>${message}</span>`;

            container.appendChild(toast);

            // Animate in
            requestAnimationFrame(() => {
                toast.classList.remove('translate-y-2', 'opacity-0');
            });

            // Auto dismiss
            setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-2');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
