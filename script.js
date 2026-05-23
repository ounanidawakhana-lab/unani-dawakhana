// ==========================================================================
// UNANI DAWAKHANA OFFICIAL - APP LOGIC & STATE ENGINE
// ==========================================================================

// 1. DEFAULT DATA INJECTOR (Run on initial setup)
// Supabase Configuration
const supabaseUrl = 'https://jsekxtywryrclkyouwvy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzZWt4dHl3cnlyY2xreW91d3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MDE5NzcsImV4cCI6MjA5NDE3Nzk3N30.C19DuTRyy8ohkxED2HfU4Tl2eAaUILWZN7EbOFiK2WU';
window.supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const DEFAULT_PRODUCTS = [
    {
      id: "qasmi-unani-hair-shampoo",
      name: "Qasmi Unani Hair Shampoo",
      price: 499,
      originalPrice: 999,
      description: "Qasmi Unani Hair Shampoo is a premium herbal hair care formula specially crafted with natural ingredients to gently cleanse, nourish, and support heal...",
      image: "https://cdn.shopify.com/s/files/1/0679/0470/0459/files/IMG-20260509-WA0035.jpg?v=1778789827",
      stock: 50,
      sold: Math.floor(Math.random() * 50) + 10,
      category: "General Wellness",
      highlights: ["Premium quality herbal product.", "Safe and natural ingredients.", "Trusted Unani formulation."],
      gstPercent: 0,
      extraCharge: 40
    },
    {
      id: "qasmi-unani-hair-oil",
      name: "Qasmi Unani Hair Oil",
      price: 499,
      originalPrice: 999,
      description: "Qasmi Unani Hair Oil is a premium Ayurvedic herbal hair care formula specially crafted with Aloe Vera and natural herbal ingredients to support health...",
      image: "https://cdn.shopify.com/s/files/1/0679/0470/0459/files/IMG-20260509-WA0034_6baacfe9-d5c0-4e6d-add4-7dc012820c62.jpg?v=1778789355",
      stock: 50,
      sold: Math.floor(Math.random() * 50) + 10,
      category: "General Wellness",
      highlights: ["Premium quality herbal product.", "Safe and natural ingredients.", "Trusted Unani formulation."],
      gstPercent: 0,
      extraCharge: 40
    },
    {
      id: "badshahi-nuksa",
      name: "Badshahi Nuksa",
      price: 5199,
      originalPrice: 5699,
      description: "Badshahii Nuksa is a premium Ayurvedic herbal wellness formula specially crafted to support men’s vitality, strength, stamina, and overall physical we...",
      image: "https://cdn.shopify.com/s/files/1/0679/0470/0459/files/file_00000000305472078a467e1cd460d1b3_5fb3cc94-50fa-4bf6-b15a-69e8b9c74b3a.png?v=1778792258",
      stock: 50,
      sold: Math.floor(Math.random() * 50) + 10,
      category: "General Wellness",
      highlights: ["Premium quality herbal product.", "Safe and natural ingredients.", "Trusted Unani formulation."],
      gstPercent: 0,
      extraCharge: 40
    },
    {
      id: "ling-ka-tel",
      name: "Ling Ka Tel",
      price: 499,
      originalPrice: 999,
      description: "Ling Ka Tel by Qasmi Unani Dawakhana is a premium Ayurvedic herbal oil specially formulated to support men’s wellness, vitality, stamina, and overall ...",
      image: "https://cdn.shopify.com/s/files/1/0679/0470/0459/files/IMG-20260507-WA0019_3.jpg?v=1778783924",
      stock: 50,
      sold: Math.floor(Math.random() * 50) + 10,
      category: "General Wellness",
      highlights: ["Premium quality herbal product.", "Safe and natural ingredients.", "Trusted Unani formulation."],
      gstPercent: 0,
      extraCharge: 40
    },
    {
      id: "badshahi-safuf",
      name: "Badshahi Safuf",
      price: 999,
      originalPrice: 1499,
      description: "Badshahi Safuf is a premium herbal wellness formula specially crafted using traditional Ayurvedic ingredients to help support energy, stamina, strengt...",
      image: "https://cdn.shopify.com/s/files/1/0679/0470/0459/files/IMG-20260507-WA0017_3.jpg?v=1778783038",
      stock: 50,
      sold: Math.floor(Math.random() * 50) + 10,
      category: "General Wellness",
      highlights: ["Premium quality herbal product.", "Safe and natural ingredients.", "Trusted Unani formulation."],
      gstPercent: 0,
      extraCharge: 40
    },
    {
      id: "badshahi-safuf-ling-ka-tel-combo-ayurvedic-men-wellness-pack",
      name: "Badshahi Safuf & Ling Ka Tel Combo | Ayurvedic Men Wellness Pack",
      price: 1499,
      originalPrice: 1999,
      description: "Experience the power of traditional Ayurvedic care with the Badshahi Safuf &amp; Ling Ka Tel Combo by Qasmi Unani Dawakhana. This specially formulated...",
      image: "https://cdn.shopify.com/s/files/1/0679/0470/0459/files/WhatsAppImage2026-05-14at12.04.56PM.jpg?v=1778740571",
      stock: 50,
      sold: Math.floor(Math.random() * 50) + 10,
      category: "General Wellness",
      highlights: ["Premium quality herbal product.", "Safe and natural ingredients.", "Trusted Unani formulation."],
      gstPercent: 0,
      extraCharge: 40
    }
  ];

let products = DEFAULT_PRODUCTS; // Initial fast-load state
let isProductsLoaded = false;

// Async fetch from Supabase
const fetchCloudProducts = async () => {
  try {
    const { data, error } = await window.supabaseClient.from('products').select('*').order('name', { ascending: true });
    if (!error && data && data.length > 0) {
      products = data.map(p => ({
        ...p,
        price: parseFloat(p.price),
        originalPrice: parseFloat(p.originalPrice),
        rating: p.rating ? parseFloat(p.rating) : null,
        reviews: p.reviews ? parseInt(p.reviews) : null
      }));
      isProductsLoaded = true;
      if (window.location.hash === "#home" || window.location.hash === "") {
        if(typeof renderProductsGrid === "function") renderProductsGrid();
      }
    }
  } catch (err) {
    console.error("Failed to fetch cloud products", err);
  }
};
// Trigger fetch
setTimeout(fetchCloudProducts, 50);
let orders = JSON.parse(localStorage.getItem("ud_orders")) || [];
let appointments = JSON.parse(localStorage.getItem("ud_appointments")) || [];
let cart = JSON.parse(localStorage.getItem("ud_cart")) || [];

let adminActiveTab = "dashboard";
let orderFilterStatus = "All";
let orderSearchQuery = "";

// Storefront dynamic filters
let storeActiveCategory = "All";
let storeSearchQuery = "";

// Save current states
const saveProductsState = () => {
  localStorage.setItem("ud_products", JSON.stringify(products));
};
const saveOrdersState = () => {
  localStorage.setItem("ud_orders", JSON.stringify(orders));
};
const saveAppointmentsState = () => {
  localStorage.setItem("ud_appointments", JSON.stringify(appointments));
};
const saveCartState = () => {
  localStorage.setItem("ud_cart", JSON.stringify(cart));
};

// Base64 Image Converter
window.handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById("crud-image-b64").value = e.target.result;
    const preview = document.getElementById("crud-image-preview");
    preview.src = e.target.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
};

// ==========================================================================
// THEME SWITCHER
// ==========================================================================
const initTheme = () => {
  const savedTheme = localStorage.getItem("ud_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcons(savedTheme);
};

const updateThemeIcons = (theme) => {
  const sunIcon = document.querySelector(".theme-icon-sun");
  const moonIcon = document.querySelector(".theme-icon-moon");
  if (!sunIcon || !moonIcon) return;
  if (theme === "dark") {
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  } else {
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  }
};

window.showToast = (msg, type='info') => {
  const toast = document.createElement('div');
  toast.innerText = msg;
  toast.style.position = 'fixed';
  toast.style.bottom = '80px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = type === 'error' ? '#ef4444' : '#10b981';
  toast.style.color = '#fff';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '30px';
  toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  toast.style.zIndex = '99999';
  toast.style.fontSize = '0.9rem';
  toast.style.fontWeight = '600';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

// ==========================================================================
// SPA ROUTER ENGINE
// ==========================================================================
const renderAdminLogin = (container) => {
  container.innerHTML = `
    <div class="admin-login-wrapper">
      <div class="admin-login-card">
        <div class="admin-login-logo">🌿</div>
        <h2 class="admin-login-title">Dawakhana Owner Portal</h2>
        <p class="admin-login-desc">Please verify your clinical security passcode to access diagnostics and operations.</p>
        <form id="admin-login-form" class="admin-login-form">
          <div class="admin-login-input-group">
            <input type="password" id="admin-passcode" class="admin-login-input" required placeholder="••••" maxlength="10">
          </div>
          <button type="submit" class="admin-login-btn">Verify Security Passcode</button>
          <div class="admin-login-error" id="admin-login-error">⚠️ Invalid Owner Passcode! Access Denied.</div>
        </form>
        <a href="#home" style="display: inline-block; margin-top: 20px; font-size: 0.85rem; color: var(--accent); font-weight: 600;">← Back to Main Clinic Site</a>
      </div>
    </div>
  `;

  const form = document.getElementById("admin-login-form");
  const errorMsg = document.getElementById("admin-login-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const passcode = document.getElementById("admin-passcode").value;
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Verifying...";
    submitBtn.disabled = true;

    try {
      // Secure Cloud Bcrypt Authentication Check
      const { data, error } = await window.supabaseClient.rpc('admin_get_orders', { passcode: passcode });
      
      if (error) throw new Error("Invalid Auth");
      
      // Auth success
      sessionStorage.setItem("ud_admin_auth", "true");
      sessionStorage.setItem("ud_admin_token", passcode); 
      errorMsg.style.display = "none";
      router(); 
    } catch (err) {
      errorMsg.style.display = "block";
      document.getElementById("admin-passcode").value = "";
      
      const card = document.querySelector(".admin-login-card");
      if (card) {
        card.classList.remove("shake-effect");
        void card.offsetWidth; 
        card.classList.add("shake-effect");
      }
    } finally {
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
    }
  });
};

const router = () => {
  const hash = window.location.hash || "#home";
  document.body.classList.remove("admin-mode");
  
  // Highlight navbar active link
  const cleanHash = hash.split("/")[0];
  document.querySelectorAll(".nav-link, .mobile-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === cleanHash) {
      link.classList.add("active");
    }
  });

  const appRoot = document.getElementById("app-root");
  appRoot.innerHTML = "";

  const updateSEO = (title, desc) => {
    document.title = title + " | Unani Dawakhana";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", desc);
  };

  if (hash === '#tracker') {
    updateSEO("Track Order", "Track your Unani Dawakhana delivery status in real-time.");
    window.renderTrackerView(appRoot);
    window.scrollTo(0, 0);
  } else if (hash === '#admin') {
    updateSEO("Admin Panel", "Secure Dawakhana Owner Portal.");
    window.renderAdminView(appRoot);
    window.scrollTo(0, 0);
  } else if (hash === '#menu') {
    updateSEO("Menu", "Explore our services and navigation menu.");
    window.renderMenuView(appRoot);
    window.scrollTo(0, 0);
  } else if (hash === '#appointment') {
    updateSEO("Book Appointment", "Consult with our expert Hakeems for personalized Unani treatment.");
    window.renderAppointmentView(appRoot);
    window.scrollTo(0, 0);
  } else if (hash === '#about') {
    updateSEO("About Us", "Learn about our 30+ year legacy in authentic Unani healing.");
    window.renderAboutView(appRoot);
    window.scrollTo(0, 0);
  } else if (hash === '#services') {
    updateSEO("Services", "Hijama, Nadi Pariksha, and more Unani therapies.");
    window.renderServicesView(appRoot);
    window.scrollTo(0, 0);
  } else if (hash === '#privacy') {
    updateSEO("Privacy Policy", "Read our Privacy Policy.");
    window.renderPrivacyView(appRoot);
    window.scrollTo(0, 0);
  } else if (hash === '#terms') {
    updateSEO("Terms & Conditions", "Read our Terms and Conditions.");
    window.renderTermsView(appRoot);
    window.scrollTo(0, 0);
  } else if (hash.startsWith("#product/")) {
    const productId = hash.split("/")[1];
    renderProductDetails(appRoot, productId);
    window.scrollTo(0, 0);
  } else {
    updateSEO("Premium Herbal Formulations", "100% Original Unani & Ayurvedic Formulations. Get premium herbal medicines delivered directly to you.");
    // Normal store pages are sections of home view
    renderHomeView(appRoot);
    
    // Smooth scroll to segment if targeted
    if (hash && hash !== "#home") {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }
};

window.addEventListener("hashchange", router);
window.addEventListener("load", () => {
  initTheme();
  
  // Hide splash screen
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.style.opacity = '0';
      setTimeout(() => splash.remove(), 500);
    }
  }, 1200);
  
  if (sessionStorage.getItem("ud_admin_auth") === "true") {
    const token = sessionStorage.getItem("ud_admin_token");
    fetch('/api/admin/orders', { headers: { 'Authorization': `Bearer ${token}` }})
      .then(r => r.json()).then(data => { 
        if(Array.isArray(data)) {
          orders = data.map(d=>({id: `ORD-${d.id}`, date: d.created_at.split(" ")[0], name: d.customerName, phone: d.customerPhone, address: d.address, city: d.city, pincode: d.pincode, productName: Array.isArray(d.items) ? d.items.map(i=>`${i.name} (x${i.qty})`).join(", ") : '', total: d.totalAmount, status: d.status, paymentStatus: d.paymentMethod}));
          saveOrdersState();
        }
      });
      
    fetch('/api/admin/appointments', { headers: { 'Authorization': `Bearer ${token}` }})
      .then(r => r.json()).then(data => { 
        if(Array.isArray(data)) {
          appointments = data.map(d=>({id: `APT-${d.id}`, date: d.date, time: d.time, name: d.name, phone: d.phone, symptoms: d.concern, status: "Pending"}));
          saveAppointmentsState();
        }
        router();
      });
  } else {
    router();
  }
  
  updateCartBadge();
});

// ==========================================================================
// CART ACTION HANDLERS
// ==========================================================================
let userLocationStr = "Location tracked automatically.";

window.buyNowDirect = (productId) => {
  // Direct Buy Now flow: clear cart, add item, go to checkout
  cart = [];
  saveCartState();
  addToCart(productId, 1);
  openCheckoutModal();
  
  // Attempt to fetch IP Location for the tracker silently
  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => {
      if(data && data.city) {
        userLocationStr = `(IP Location: ${data.city}, ${data.region})`;
      }
    }).catch(e => console.log("Location fetch failed"));
};
const addToCart = (productId, qty = 1) => {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (product.stock <= 0) {
    alert("This herbal remedy is currently out of stock.");
    return;
  }

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    if (existingItem.qty + qty > product.stock) {
      alert(`Only ${product.stock} units are currently available.`);
      return;
    }
    existingItem.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: qty,
      gstPercent: product.gstPercent || 0,
      extraCharge: product.extraCharge || 0
    });
  }

  saveCartState();
  updateCartBadge();
  openCartDrawer();
};

const updateCartQty = (productId, newQty) => {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);
  if (!cartItem || !product) return;

  if (newQty <= 0) {
    cart = cart.filter(item => item.id !== productId);
  } else {
    if (newQty > product.stock) {
      alert(`Only ${product.stock} units are currently available.`);
      return;
    }
    cartItem.qty = newQty;
  }
  saveCartState();
  updateCartBadge();
  renderCartItems();
};

const updateCartBadge = () => {
  const badge = document.getElementById("cart-badge-count");
  const drawerCount = document.getElementById("cart-drawer-count");
  const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  
  if (badge) badge.innerText = totalCount;
  if (drawerCount) drawerCount.innerText = totalCount;
  
  // Sticky Cart Strip Zepto Style
  const stickyStrip = document.getElementById("sticky-cart-strip");
  if (stickyStrip) {
    if (totalCount > 0) {
      stickyStrip.style.display = "flex";
      document.getElementById("sticky-cart-qty").innerText = totalCount;
      document.getElementById("sticky-cart-total").innerText = "₹" + totalPrice;
    } else {
      stickyStrip.style.display = "none";
    }
  }

  renderCartItems();
};

const renderCartItems = () => {
  const container = document.getElementById("cart-items-container");
  const subtotalText = document.getElementById("cart-subtotal");
  const footerDetails = document.getElementById("cart-footer-details");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-message">
        <p>Your shopping cart is empty.</p>
        <a href="#products" class="btn btn-primary" id="empty-cart-shop-btn">Browse Shop</a>
      </div>
    `;
    if (subtotalText) subtotalText.innerText = "₹0.00";
    if (footerDetails) footerDetails.style.display = "none";
    
    // Add close trigger to Browse Shop inside cart
    const browseBtn = document.getElementById("empty-cart-shop-btn");
    if (browseBtn) {
      browseBtn.addEventListener("click", closeCartDrawer);
    }
    return;
  }

  if (footerDetails) footerDetails.style.display = "flex";
  
  let subtotal = 0;
  let totalGst = 0;
  let totalExtraCharges = 0;

  container.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    // GST calculation per product
    const gstPct = item.gstPercent || 0;
    const gstAmt = Math.round((itemTotal * gstPct) / 100);
    totalGst += gstAmt;

    // Extra charge is per unique product (not per qty) — fixed shipping per product
    const extraCharge = item.extraCharge || 0;
    totalExtraCharges += extraCharge;

    return `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <div>
            <h4 class="cart-item-name">${item.name}</h4>
            <span class="cart-item-price">₹${item.price}</span>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 8px;">
            <div class="cart-qty-controls">
              <button class="cart-qty-btn" onclick="updateCartQty('${item.id}', ${item.qty - 1})">-</button>
              <span style="font-weight:700; min-width:16px; text-align:center;">${item.qty}</span>
              <button class="cart-qty-btn" onclick="updateCartQty('${item.id}', ${item.qty + 1})">+</button>
            </div>
            <button onclick="updateCartQty('${item.id}', 0)" style="background:none; border:none; color:var(--text-muted); cursor:pointer; padding:4px; display:flex; align-items:center; justify-content:center;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  const toPay = subtotal + totalGst + totalExtraCharges;

  if (subtotalText) subtotalText.innerText = `₹${toPay}`;
  const itemTotalEl = document.getElementById("cart-item-total");
  if (itemTotalEl) itemTotalEl.innerText = `₹${subtotal}`;

  const deliveryEl = document.getElementById("cart-delivery-fee");
  if (deliveryEl) {
    if (totalExtraCharges === 0) {
      deliveryEl.innerHTML = `<span style="color:green; font-weight:700;">FREE</span>`;
    } else {
      deliveryEl.innerText = `₹${totalExtraCharges}`;
    }
  }

  const gstEl = document.getElementById("cart-gst");
  if (gstEl) gstEl.innerText = totalGst > 0 ? `₹${totalGst}` : "Included";
};


// Make updateCartQty global so inline onclick works
window.updateCartQty = updateCartQty;

// Cart Drawer open/close
const openCartDrawer = () => {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) drawer.classList.add("open");
};

const closeCartDrawer = () => {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) drawer.classList.remove("open");
};

// ==========================================================================
// RENDER CLIENT VIEWS
// ==========================================================================

// A. Product Details Page View
const renderProductDetails = (container, productId) => {
  const product = products.find(p => p.id === productId);
  if (!product) {
    container.innerHTML = `<div class="container section text-center"><h2>Remedy Not Found</h2><a href="#products" class="btn btn-primary">Back to Shop</a></div>`;
    return;
  }

  // Calculate discount percentage
  const discount = (product.originalPrice && product.originalPrice > product.price) 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  container.innerHTML = `
    <section class="section" style="padding-top: 40px;">
      <div class="container">
        <div class="about-grid">
          <!-- Product Left Image -->
          <div class="hero-featured-wrapper" style="background-color: var(--primary-ultra-light); padding: 40px; border-radius: var(--radius-lg); border: 1px solid var(--border);">
            <img src="${product.image}" alt="${product.name}" style="max-height: 380px; object-fit: contain; width: 100%; max-width: 320px; filter: drop-shadow(0 15px 25px rgba(11,61,51,0.15));">
          </div>
          
          <!-- Product Right Details -->
          <div class="about-text">
            <span class="badge" style="margin-bottom: 12px; background-color: ${product.stock <= 0 ? 'var(--danger)' : 'var(--primary-ultra-light)'}; color: ${product.stock <= 0 ? 'white' : 'var(--primary)'}">
              ${product.stock <= 0 ? 'Out of Stock' : product.stock < 10 ? `Low Stock (Only ${product.stock} left!)` : 'In Stock'}
            </span>
            <h2 style="font-size: 2.2rem; line-height: 1.2; margin-bottom: 8px; color: var(--primary); text-align: left;">${product.name}</h2>
            
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px;">
              <span style="color: #ffb400; font-weight: bold; font-size: 1.2rem;">${product.rating || (4.5 + Math.random()*0.4).toFixed(1)} ⭐⭐⭐⭐⭐</span>
              <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: 500;">(${product.reviews || Math.floor(Math.random()*400 + 50)}+ Patient Reviews)</span>
            </div>
            <p style="font-size: 1.05rem; margin-bottom: 24px; color: var(--text-muted);">${product.description}</p>
            
            <div style="background-color: var(--primary-ultra-light); border: 1px solid var(--border-light); border-radius: var(--radius); padding: 20px; display: inline-flex; flex-direction: column; min-width: 250px; margin-bottom: 30px;">
              <div style="display: flex; align-items: baseline; gap: 12px;">
                <span style="font-size: 2.2rem; font-weight: 700; color: var(--primary);">₹${product.price}</span>
                <span style="text-decoration: line-through; color: var(--text-muted); font-size: 1.1rem;">₹${product.originalPrice}</span>
                <span class="badge" style="background-color: var(--accent); color: white; border: none; font-size: 0.75rem;">Save ${discount}%</span>
              </div>
              <small style="color: var(--text-muted); margin-top: 4px;">Free Shipping & Cash on Delivery</small>
            </div>

            <!-- Buy Buttons -->
            <div style="display: flex; gap: 16px; margin-bottom: 30px; flex-wrap: wrap;">
              <div class="cart-item-qty" style="border: 1px solid var(--border); padding: 8px 16px; border-radius: var(--radius); background-color: var(--surface); display: flex; align-items: center; gap: 16px; height: 50px;">
                <span style="font-weight: 600; font-size: 0.9rem;">Quantity:</span>
                <button class="qty-btn" id="det-qty-minus" style="width: 28px; height: 28px;">-</button>
                <strong id="det-qty-val">1</strong>
                <button class="qty-btn" id="det-qty-plus" style="width: 28px; height: 28px;">+</button>
              </div>
              
              <button class="btn btn-primary" id="det-add-cart-btn" style="height: 50px; flex: 1; min-width: 160px;">${window.t('add_to_cart')}</button>
              <button class="btn btn-whatsapp" id="det-buy-wa-btn" style="height: 50px; flex: 1; min-width: 200px;">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                ${window.t('buy_whatsapp')}
              </button>
            </div>

            <!-- Highlights -->
            <div>
              <h3 style="font-size: 1.15rem; margin-bottom: 12px; color: var(--primary);">Key Highlights:</h3>
              <ul style="display: flex; flex-direction: column; gap: 8px;">
                ${product.highlights.map(hl => `<li style="font-size: 0.9rem; color: var(--text-muted); display: flex; align-items: center; gap: 8px;"><span style="color:var(--accent);">✦</span> ${hl}</li>`).join("")}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  `;

  // Detail view quantity button listeners
  const detQtyVal = document.getElementById("det-qty-val");
  const minus = document.getElementById("det-qty-minus");
  const plus = document.getElementById("det-qty-plus");
  const addCart = document.getElementById("det-add-cart-btn");
  const buyWa = document.getElementById("det-buy-wa-btn");

  let currentQty = 1;
  minus.addEventListener("click", () => {
    if (currentQty > 1) {
      currentQty--;
      detQtyVal.innerText = currentQty;
    }
  });
  plus.addEventListener("click", () => {
    if (currentQty < product.stock) {
      currentQty++;
      detQtyVal.innerText = currentQty;
    } else {
      alert(`Only ${product.stock} units are currently in stock.`);
    }
  });

  addCart.addEventListener("click", () => {
    addToCart(product.id, currentQty);
  });

  buyWa.addEventListener("click", () => {
    const textMsg = encodeURIComponent(
      `Hello Unani Dawakhana Official, I would like to order:\n\n` +
      `- *${product.name}* (Qty: ${currentQty})\n` +
      `Total Price: ₹${product.price * currentQty}\n\n` +
      `Please confirm my order and shipping details. Thank you!`
    );
    window.open(`https://wa.me/918796982661?text=${textMsg}`, "_blank");
  });
};

// B. General Home Page View
window.renderAppointmentView = (container) => {
  container.innerHTML = `
    <section class="section" style="padding-top:20px;">
      <div class="container" style="max-width:500px; margin:auto;">
        <div style="background:var(--primary-ultra-light); padding:24px; border-radius:16px; text-align:center; margin-bottom:20px; border:1px solid var(--border);">
          <div style="font-size:3rem; margin-bottom:10px;">🩺</div>
          <h2 style="font-family:'Outfit',sans-serif; color:var(--primary); font-size:1.5rem;">Book an Appointment</h2>
          <p style="color:var(--text-muted); font-size:0.9rem; margin-top:8px;">Consult with our expert Hakeem for personalized Unani treatment.</p>
        </div>
        <form id="appointment-form" style="background:#fff; padding:20px; border-radius:16px; box-shadow:0 4px 15px rgba(0,0,0,0.05); border:1px solid var(--border);">
          <div class="form-group" style="margin-bottom:15px;">
            <label style="display:block; font-size:0.85rem; font-weight:600; color:var(--text-main); margin-bottom:6px;">Patient Name *</label>
            <input type="text" id="apt-name" required placeholder="Enter full name" style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px; font-size:1rem;">
          </div>
          <div class="form-group" style="margin-bottom:15px;">
            <label style="display:block; font-size:0.85rem; font-weight:600; color:var(--text-main); margin-bottom:6px;">Mobile Number *</label>
            <input type="tel" id="apt-phone" required placeholder="10-digit mobile number" style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px; font-size:1rem;">
          </div>
          <div class="form-group" style="margin-bottom:15px;">
            <label style="display:block; font-size:0.85rem; font-weight:600; color:var(--text-main); margin-bottom:6px;">Preferred Date *</label>
            <input type="date" id="apt-date" required style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px; font-size:1rem;">
          </div>
          <div class="form-group" style="margin-bottom:15px;">
            <label style="display:block; font-size:0.85rem; font-weight:600; color:var(--text-main); margin-bottom:6px;">Health Concern / Symptoms *</label>
            <textarea id="apt-concern" rows="3" required placeholder="Describe your health issue briefly..." style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px; font-size:1rem; resize:none;"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%; font-size:1.1rem; margin-top:10px; padding:14px;">Confirm Booking</button>
        </form>
      </div>
    </section>
  `;

  const form = document.getElementById("appointment-form");
  if(form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("apt-name").value;
      const phone = document.getElementById("apt-phone").value;
      const date = document.getElementById("apt-date").value;
      const concern = document.getElementById("apt-concern").value;
      
      const newApt = {
        id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
        date: date,
        time: "To be confirmed",
        name: name,
        phone: phone,
        symptoms: concern,
        status: "Pending"
      };
      
      try {
        const { error } = await window.supabaseClient.from('appointments').insert([newApt]);
        if (error) console.error("Supabase Error:", error);
      } catch (err) {
        console.error("Supabase Catch Error:", err);
      }

      // Update local appointments array for backwards compatibility
      appointments.push(newApt);
      saveAppointmentsState();

      alert(`Appointment Request Sent!\n\nID: ${newApt.id}\nThank you ${name}, we will contact you on ${phone} to confirm the time.`);
      window.location.hash = "menu";
    });
  }
};

window.renderServicesView = (container) => {
  container.innerHTML = `
    <section class="section" style="padding-top:20px;">
      <div class="container" style="max-width:600px; margin:auto;">
        <h2 style="font-family:'Outfit',sans-serif; color:var(--primary); text-align:center; margin-bottom:20px; font-size:1.5rem;">Our Services</h2>
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="background:#fff; border-radius:12px; border:1px solid var(--border); overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
            <div style="height:140px; background:var(--primary-ultra-light); display:flex; align-items:center; justify-content:center; font-size:4rem;">🩸</div>
            <div style="padding:20px;">
              <h3 style="color:var(--primary); font-family:'Outfit',sans-serif; margin-bottom:8px;">Hijama (Cupping Therapy)</h3>
              <p style="color:var(--text-muted); font-size:0.9rem; line-height:1.5;">Ancient Unani detoxification therapy that helps improve blood circulation, relieve pain, and extract toxins from the body.</p>
            </div>
          </div>
          <div style="background:#fff; border-radius:12px; border:1px solid var(--border); overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
            <div style="height:140px; background:#fef08a; display:flex; align-items:center; justify-content:center; font-size:4rem;">🤲</div>
            <div style="padding:20px;">
              <h3 style="color:var(--primary); font-family:'Outfit',sans-serif; margin-bottom:8px;">Nadi Pariksha (Pulse Diagnosis)</h3>
              <p style="color:var(--text-muted); font-size:0.9rem; line-height:1.5;">Traditional diagnostic method to accurately determine the root cause of ailments by reading the pulse rate and rhythm.</p>
            </div>
          </div>
          <div style="background:#fff; border-radius:12px; border:1px solid var(--border); overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
            <div style="height:140px; background:#e0f2fe; display:flex; align-items:center; justify-content:center; font-size:4rem;">👨‍⚕️</div>
            <div style="padding:20px;">
              <h3 style="color:var(--primary); font-family:'Outfit',sans-serif; margin-bottom:8px;">General Consultation</h3>
              <p style="color:var(--text-muted); font-size:0.9rem; line-height:1.5;">Personalized health advice and custom Unani herbal prescriptions tailored to your specific body temperament (Mizaj).</p>
            </div>
          </div>
        </div>
        <div style="text-align:center; margin-top:24px;">
          <a href="#appointment" class="btn btn-primary">Book a Session</a>
        </div>
      </div>
    </section>
  `;
};

window.renderAboutView = (container) => {
  container.innerHTML = `
    <section class="section" style="padding-top:20px;">
      <div class="container" style="max-width:600px; margin:auto;">
        <div style="text-align:center; margin-bottom:30px;">
          <div style="width:100px; height:100px; background:var(--primary); border-radius:50%; margin:0 auto 16px; display:flex; align-items:center; justify-content:center; font-size:3rem; color:#fff; box-shadow:0 8px 24px rgba(18,53,36,0.3);">🌿</div>
          <h2 style="font-family:'Outfit',sans-serif; color:var(--primary); font-size:1.8rem; margin-bottom:8px;">Unani Dawakhana</h2>
          <p style="color:var(--text-muted); font-size:1rem; font-weight:600;">Authentic Healing Since 1990</p>
        </div>
        
        <div style="background:#fff; padding:24px; border-radius:16px; border:1px solid var(--border); box-shadow:0 4px 12px rgba(0,0,0,0.05); line-height:1.7; color:var(--text-main);">
          <p style="margin-bottom:16px;">Welcome to <strong>Unani Dawakhana Official</strong>. We are dedicated to providing pure, unadulterated, and highly effective Unani and Ayurvedic formulations.</p>
          <p style="margin-bottom:16px;">With over 30 years of clinical experience, our expert Hakeems have formulated remedies that address the root cause of ailments without any side effects.</p>
          <h3 style="color:var(--primary); font-family:'Outfit',sans-serif; margin:24px 0 12px;">Our Mission</h3>
          <p style="margin-bottom:16px;">To make ancient Unani healing accessible to everyone across India through pure ingredients and authentic compounding methods.</p>
          <h3 style="color:var(--primary); font-family:'Outfit',sans-serif; margin:24px 0 12px;">Contact Details</h3>
          <ul style="list-style:none; padding:0; margin:0; color:var(--text-muted);">
            <li style="margin-bottom:8px;">📍 <strong>Clinic:</strong> Main Market Road, Near Jama Masjid</li>
            <li style="margin-bottom:8px;">📞 <strong>Phone:</strong> +91 8796982661</li>
            <li style="margin-bottom:8px;">📧 <strong>Email:</strong> support@unanidawakhana.com</li>
          </ul>
        </div>
      </div>
    </section>
  `;
};

window.renderMenuView = (container) => {
  container.innerHTML = `
    <section class="section" style="padding-top:20px;">
      <div class="container">
        <h2 style="font-family:'Outfit',sans-serif; color:var(--primary); text-align:center; margin-bottom:20px; font-size:1.5rem;">Main Menu</h2>
        <div style="display:grid; grid-template-columns:1fr; gap:12px; max-width:500px; margin:auto;">
          <a href="#appointment" style="display:flex; align-items:center; gap:16px; background:#fff; padding:16px; border-radius:12px; text-decoration:none; color:var(--text-main); border:1px solid var(--border); box-shadow:0 2px 8px rgba(0,0,0,0.04);">
            <div style="background:#e0f2fe; width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">🩺</div>
            <div>
              <div style="font-weight:700; font-size:1.1rem; color:var(--primary);">Book Appointment</div>
              <div style="font-size:0.8rem; color:var(--text-muted);">Consult our expert Hakeem</div>
            </div>
          </a>
          <a href="#services" style="display:flex; align-items:center; gap:16px; background:#fff; padding:16px; border-radius:12px; text-decoration:none; color:var(--text-main); border:1px solid var(--border); box-shadow:0 2px 8px rgba(0,0,0,0.04);">
            <div style="background:#fef08a; width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">🌿</div>
            <div>
              <div style="font-weight:700; font-size:1.1rem; color:var(--primary);">Our Services</div>
              <div style="font-size:0.8rem; color:var(--text-muted);">Hijama, Nadi Pariksha & more</div>
            </div>
          </a>
          <a href="#about" style="display:flex; align-items:center; gap:16px; background:#fff; padding:16px; border-radius:12px; text-decoration:none; color:var(--text-main); border:1px solid var(--border); box-shadow:0 2px 8px rgba(0,0,0,0.04);">
            <div style="background:#fed7aa; width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">ℹ️</div>
            <div>
              <div style="font-weight:700; font-size:1.1rem; color:var(--primary);">About Us</div>
              <div style="font-size:0.8rem; color:var(--text-muted);">Know our legacy and mission</div>
            </div>
          </a>
          <a href="#tracker" style="display:flex; align-items:center; gap:16px; background:#fff; padding:16px; border-radius:12px; text-decoration:none; color:var(--text-main); border:1px solid var(--border); box-shadow:0 2px 8px rgba(0,0,0,0.04);">
            <div style="background:#dcf8c6; width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">📦</div>
            <div>
              <div style="font-weight:700; font-size:1.1rem; color:var(--primary);">Track Order</div>
              <div style="font-size:0.8rem; color:var(--text-muted);">Check your delivery status</div>
            </div>
          </a>
          <a href="#admin" style="display:flex; align-items:center; gap:16px; background:#fff; padding:16px; border-radius:12px; text-decoration:none; color:var(--text-main); border:1px solid var(--border); box-shadow:0 2px 8px rgba(0,0,0,0.04); margin-top:20px;">
            <div style="background:#f3f4f6; width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">⚙️</div>
            <div>
              <div style="font-weight:700; font-size:1.1rem; color:var(--text-main);">Admin Panel</div>
              <div style="font-size:0.8rem; color:var(--text-muted);">Manage dawakhana records</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  `;
};

const renderHomeView = (container) => {
  container.innerHTML = `
    <div class="app-top-header">
      <div class="top-bar">
        <div class="location-selector">
          <span style="font-size:1.2rem;">🚚</span>
          <div>
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Cash On Delivery Available</div>
            <div style="font-weight:700; font-size:0.95rem; display:flex; align-items:center; gap:4px;">All India Delivery <svg width="12" height="12" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z" fill="currentColor"/></svg></div>
          </div>
        </div>
        <a href="#tracker" class="profile-icon" title="Track Order" style="text-decoration:none;">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="var(--primary)"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </a>
      </div>

      <div class="search-container">
        <div class="search-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#666"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <input type="text" placeholder="Search for 'Herbal Oils'..." oninput="handleShopSearch(this.value)" value="${storeSearchQuery}">
        </div>
      </div>

      <div class="category-scroll">
        <div class="cat-item ${storeActiveCategory === 'All' ? 'active' : ''}" onclick="setStoreCategory('All')">
          <div class="cat-icon-box" style="background:#fef08a;">🌿</div>
          <span>All</span>
        </div>
        <div class="cat-item ${storeActiveCategory === 'General Wellness' ? 'active' : ''}" onclick="setStoreCategory('General Wellness')">
          <div class="cat-icon-box" style="background:#fed7aa;">💪</div>
          <span>Wellness</span>
        </div>
        <div class="cat-item ${storeActiveCategory === 'Oils' ? 'active' : ''}" onclick="setStoreCategory('Oils')">
          <div class="cat-icon-box" style="background:#bbf7d0;">💧</div>
          <span>Oils</span>
        </div>
        <div class="cat-item ${storeActiveCategory === 'Powders' ? 'active' : ''}" onclick="setStoreCategory('Powders')">
          <div class="cat-icon-box" style="background:#bfdbfe;">✨</div>
          <span>Powders</span>
        </div>
        <div class="cat-item" onclick="setStoreCategory('Combo')">
          <div class="cat-icon-box" style="background:#e9d5ff;">🎁</div>
          <span>Combos</span>
        </div>
      </div>
    </div>

    <div class="promo-banner">
      <div class="promo-content">
        <h2>Get 100% Original Unani Formulations</h2>
        <p style="margin-top:4px; font-weight:600; color:var(--primary); background:rgba(255,255,255,0.8); display:inline-block; padding:2px 6px; border-radius:4px;">Delivered in Days!</p>
      </div>
    </div>

    <!-- Trust / Testimonials Marquee -->
    <div style="margin: 20px 0;">
      <h3 style="font-family:'Outfit',sans-serif; font-size:1.2rem; color:var(--primary); padding: 0 16px; margin-bottom: 12px; font-weight:700;">What Our Customers Say ❤️</h3>
      <div class="review-marquee-container">
        <div class="review-marquee">
          ${typeof customerReviews !== 'undefined' ? customerReviews.map(r => `
            <div class="review-card">
              <div class="review-header">
                <div>
                  <div class="review-author">${r.name}</div>
                  <div class="review-location">📍 ${r.location}</div>
                </div>
                <div class="review-rating">${'⭐'.repeat(r.rating)}</div>
              </div>
              <div class="review-text" style="direction: ${r.lang === 'ur' ? 'rtl' : 'ltr'}; font-family: ${r.lang === 'ur' ? 'Arial, sans-serif' : 'inherit'};">"${r.text}"</div>
            </div>
          `).join('') : '<p>Loading reviews...</p>'}
        </div>
      </div>
    </div>

    <section class="section" id="products" style="padding-top: 10px; background: #fdfdfd;">
      <div class="container">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px; padding: 0 4px;">
          <h2 style="font-family:'Outfit',sans-serif; font-size:1.3rem; color:var(--primary); font-weight:700;">Premium Remedies</h2>
          <span style="color:#e91e63; font-weight:600; font-size:0.9rem;">See All ></span>
        </div>
        <div class="products-showcase-grid" id="products-grid-container"></div>
      </div>
    </section>

    <!-- Trust Badges & Footer -->
    <div style="background:var(--primary-ultra-light); padding:30px 16px; margin-top:10px; text-align:center; padding-bottom:90px;">
      <div style="display:flex; justify-content:center; gap:12px; margin-bottom:20px; flex-wrap:wrap;">
        <div style="background:#fff; padding:12px; border-radius:12px; font-size:0.75rem; font-weight:700; color:var(--primary); flex:1; min-width:90px; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
          <div style="font-size:1.8rem; margin-bottom:6px;">💯</div>
          100% Genuine
        </div>
        <div style="background:#fff; padding:12px; border-radius:12px; font-size:0.75rem; font-weight:700; color:var(--primary); flex:1; min-width:90px; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
          <div style="font-size:1.8rem; margin-bottom:6px;">🚚</div>
          Fast Delivery
        </div>
        <div style="background:#fff; padding:12px; border-radius:12px; font-size:0.75rem; font-weight:700; color:var(--primary); flex:1; min-width:90px; box-shadow:0 4px 12px rgba(0,0,0,0.03);">
          <div style="font-size:1.8rem; margin-bottom:6px;">🔒</div>
          Secure COD
        </div>
      </div>
      
      <div style="width:50px; height:4px; background:var(--primary); border-radius:4px; margin:0 auto 16px;"></div>
      <h3 style="font-family:'Outfit',sans-serif; font-size:1.2rem; color:var(--primary); margin-bottom:4px;">Unani Dawakhana</h3>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:16px; font-weight:500;">Authentic Herbal Formulations Since 1990</p>
      
      <div style="background:#fff; padding:16px; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.05); text-align:left; max-width:400px; margin:0 auto 20px;">
        <h4 style="font-size:0.9rem; color:var(--primary); margin-bottom:12px; border-bottom:1px solid #eee; padding-bottom:6px;">Contact Us</h4>
        
        <div style="display:flex; align-items:flex-start; gap:10px; margin-bottom:10px;">
          <span style="font-size:1.2rem;">📍</span>
          <div>
            <p style="font-size:0.8rem; font-weight:700; color:#111; margin:0;">Clinic Address</p>
            <p style="font-size:0.75rem; color:var(--text-muted); margin:0; line-height:1.4;">Main Market Road, Near Jama Masjid, Delhi - 110006</p>
          </div>
        </div>
        
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
          <span style="font-size:1.2rem;">📞</span>
          <div>
            <p style="font-size:0.8rem; font-weight:700; color:#111; margin:0;">Helpline Number</p>
            <a href="tel:+918796982662" style="font-size:0.85rem; color:var(--accent); text-decoration:none; font-weight:600;">+91 8796982662</a>
          </div>
        </div>
        
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-size:1.2rem;">✉️</span>
          <div>
            <p style="font-size:0.8rem; font-weight:700; color:#111; margin:0;">Email Support</p>
            <a href="mailto:ounanidawakhana@gmail.com" style="font-size:0.85rem; color:var(--accent); text-decoration:none; font-weight:600;">ounanidawakhana@gmail.com</a>
          </div>
        </div>
      </div>
      
      <div style="margin-bottom: 20px; font-size: 0.8rem; font-weight: 600; display: flex; justify-content: center; gap: 15px;">
        <a href="#privacy" style="color: var(--accent); text-decoration: none;">Privacy Policy</a>
        <span style="color: #ccc;">|</span>
        <a href="#terms" style="color: var(--accent); text-decoration: none;">Terms & Conditions</a>
      </div>
      
      <p style="font-size:0.75rem; color:var(--text-muted); opacity:0.8; line-height:1.5;">Made with ❤️ in India<br><br>Disclaimer: Our products are based on Unani medicine principles. Please consult our Hakeem before starting any new remedy, especially if you have chronic medical conditions.</p>
    </div>
  `;
  renderProductsGrid();
};

// Shop dynamic filter/search functions
const renderProductsGrid = () => {
  const container = document.getElementById("products-grid-container");
  if (!container) return;

  let filtered = products;
  if (storeActiveCategory !== "All") {
    filtered = filtered.filter(p => p.category === storeActiveCategory);
  }
  if (storeSearchQuery.trim() !== "") {
    const q = storeSearchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: span 3; text-align: center; padding: 40px; color: var(--text-muted);">
        <span style="font-size: 3rem;">🌿</span>
        <h3 style="margin-top: 10px; color: var(--primary);">No Remedies Found</h3>
        <p style="font-size: 0.9rem; margin-top: 4px;">Try searching for other keywords or select a different category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const rating = p.rating || (4.5 + Math.random()*0.4).toFixed(1);
    const reviews = p.reviews || Math.floor(Math.random()*400 + 50);
    const badges = ['Bestseller', 'Trending', 'Most Ordered'];
    const randomBadge = badges[Math.floor(Math.random() * badges.length)];
    const badgeHtml = p.badge ? `<div style="background:#fef08a; padding:2px 6px; border-radius:4px; font-size:0.65rem; font-weight:700; color:#b45309;">${p.badge}</div>` : `<div style="background:#fef08a; padding:2px 6px; border-radius:4px; font-size:0.65rem; font-weight:700; color:#b45309;">${randomBadge}</div>`;
    
    const discountPercent = (p.originalPrice && p.originalPrice > p.price) ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
    const discountBadge = discountPercent > 0 ? `<span class="badge discount" style="position:absolute; top:8px; left:8px; background:#e91e63; font-size:0.65rem; padding:3px 6px;">${discountPercent}% OFF</span>` : '';
    
    return `
    <div class="product-card fade-in" onclick="buyNowDirect('${p.id}')" style="cursor:pointer;">
      <div class="product-img-box">
        <img class="product-img" src="${p.image}" alt="${p.name}" loading="lazy">
        ${discountBadge}
        <button class="quick-add-btn" onclick="event.stopPropagation(); buyNowDirect('${p.id}')">+</button>
      </div>
      <div class="product-info">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <span class="product-price">₹${p.price} <span style="font-size:0.7rem; color:var(--text-muted); text-decoration:line-through; font-weight:400;">₹${p.originalPrice}</span></span>
        </div>
        <h3 class="product-title">${p.name}</h3>
        
        <div style="display:flex; align-items:center; gap:4px; margin-bottom:8px; margin-top:2px;">
          <span style="font-size:0.8rem; font-weight:700; color:#111;">${rating}</span>
          <span style="font-size:0.8rem; color:#ffb400;">⭐</span>
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:500;">(${reviews} reviews)</span>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          ${badgeHtml}
          <button onclick="event.preventDefault(); addToCart('${p.id}', 1); showToast('Added to Cart', 'success');" class="btn-add">ADD</button>
        </div>
      </div>
    </div>
  `}).join("");
};
window.renderProductsGrid = renderProductsGrid;

const setStoreCategory = (category) => {
  storeActiveCategory = category;
  
  // Highlight active tab
  document.querySelectorAll(".filter-tag").forEach(btn => {
    btn.classList.remove("active");
    if (btn.innerText.trim().toLowerCase() === category.toLowerCase()) {
      btn.classList.add("active");
    }
  });

  renderProductsGrid();
};
window.setStoreCategory = setStoreCategory;

const handleShopSearch = (val) => {
  storeSearchQuery = val;
  renderProductsGrid();
};
window.handleShopSearch = handleShopSearch;

// FAQ accordion toggler
const toggleFaq = (btn) => {
  const item = btn.parentElement;
  const answer = item.querySelector(".faq-answer");
  const arrow = item.querySelector(".faq-arrow");
  const isAlreadyOpen = item.classList.contains("open");

  // Close all other accordions first
  document.querySelectorAll(".faq-item").forEach(el => {
    el.classList.remove("open");
    const ans = el.querySelector(".faq-answer");
    if (ans) ans.style.maxHeight = null;
    const arr = el.querySelector(".faq-arrow");
    if (arr) arr.style.transform = "rotate(0deg)";
  });

  if (!isAlreadyOpen) {
    item.classList.add("open");
    answer.style.maxHeight = answer.scrollHeight + "px";
    arrow.style.transform = "rotate(180deg)";
  } else {
    answer.style.maxHeight = null;
    arrow.style.transform = "rotate(0deg)";
  }
};
window.toggleFaq = toggleFaq;

// Make addToCart globally accessible
window.addToCart = addToCart;

// ==========================================================================
// ADVANCED OWNER ADMIN DASHBOARD RENDERER
// ==========================================================================
const renderAdminDashboard = (container) => {
  container.innerHTML = `
    <div class="admin-dashboard-container">
      <!-- Admin Sidebar -->
      <aside class="admin-sidebar">
        <div class="admin-sidebar-header">
          <h2>Owner Portal</h2>
          <span>Unani Dawakhana</span>
        </div>
        <nav class="admin-nav">
          <button class="admin-nav-item ${adminActiveTab === 'dashboard' ? 'active' : ''}" onclick="switchAdminTab('dashboard')">📊 Dashboard</button>
          <button class="admin-nav-item ${adminActiveTab === 'orders' ? 'active' : ''}" onclick="switchAdminTab('orders')">📦 Order Manager</button>
          <button class="admin-nav-item ${adminActiveTab === 'products' ? 'active' : ''}" onclick="switchAdminTab('products')">🌿 Product Stock</button>
          <button class="admin-nav-item ${adminActiveTab === 'appointments' ? 'active' : ''}" onclick="switchAdminTab('appointments')">📅 Appointments</button>
        </nav>
        <div class="admin-sidebar-footer" style="display: flex; flex-direction: column; gap: 8px; padding: 0 16px;">
          <button onclick="adminLogout()" class="btn btn-outline btn-full" style="color: white; border-color: var(--danger); background-color: rgba(239, 68, 68, 0.15); font-size: 0.8rem; padding: 8px 16px;">🔒 Log Out</button>
          <a href="#home" class="btn btn-outline btn-full" style="color: white; border-color: rgba(255, 255, 255, 0.4); font-size: 0.8rem; padding: 8px 16px;">← Exit Shop</a>
        </div>
      </aside>

      <!-- Main Panel area -->
      <div class="admin-main-content">
        <!-- Header status bar -->
        <header class="admin-header-bar">
          <div class="admin-header-title">
            <h1 id="admin-panel-title-text">Dashboard Analytics</h1>
          </div>
          <div class="admin-header-meta">
            <span>🛡️ Owner Authenticated</span>
            <span>Date: ${new Date().toISOString().split("T")[0]}</span>
          </div>
        </header>

        <!-- Body Render Target -->
        <div class="admin-body" id="admin-dashboard-body">
          <!-- Dynamic Content -->
        </div>
      </div>
    </div>
  `;

  renderAdminTabContent();
};

const switchAdminTab = (tabId) => {
  adminActiveTab = tabId;
  const titleText = document.getElementById("admin-panel-title-text");
  if (titleText) {
    if (tabId === 'dashboard') titleText.innerText = "Dashboard Analytics";
    if (tabId === 'orders') titleText.innerText = "Order & Returns Tracker";
    if (tabId === 'products') titleText.innerText = "Product Inventory Control";
    if (tabId === 'appointments') titleText.innerText = "Consultation Appointments";
  }

  // Update menu highlight
  document.querySelectorAll(".admin-nav-item").forEach(item => {
    item.classList.remove("active");
  });
  // Re-run parent view to update sidebar highlights if needed, or update dynamically
  const buttons = document.querySelectorAll(".admin-nav-item");
  if (tabId === 'dashboard') buttons[0].classList.add("active");
  if (tabId === 'orders') buttons[1].classList.add("active");
  if (tabId === 'products') buttons[2].classList.add("active");
  if (tabId === 'appointments') buttons[3].classList.add("active");

  renderAdminTabContent();
};
window.switchAdminTab = switchAdminTab;

const renderAdminTabContent = async () => {
  const container = document.getElementById("admin-dashboard-body");
  if (!container) return;

  // Show loading while fetching
  container.innerHTML = '<div style="padding:40px; text-align:center; color:var(--primary); font-family:\'Outfit\',sans-serif;">Fetching Secure Database...<br><br>⏳</div>';

  let orders = [];
  let appointments = [];
  
  try {
    const { data: oData, error: oErr } = await window.supabaseClient.rpc('admin_get_orders', { passcode: '789576' });
    if (!oErr && oData) {
      orders = oData.map(o => ({...o, total: parseFloat(o.total)}));
    } else if (oErr) {
      console.error("Supabase Order Error:", oErr);
    }
    
    const { data: aData, error: aErr } = await window.supabaseClient.rpc('admin_get_appointments', { passcode: '789576' });
    if (!aErr && aData) {
      appointments = aData;
    } else if (aErr) {
      console.error("Supabase Apt Error:", aErr);
    }
  } catch(e) {
    console.error("Supabase fetch exception:", e);
  }

  if (adminActiveTab === "dashboard") {
    // Calculate total values
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === "New Order" || o.status === "Packing" || o.status === "Confirmed").length;
    const shippedOrders = orders.filter(o => o.status === "Shipped" || o.status === "Out For Delivery").length;
    const deliveredOrders = orders.filter(o => o.status === "Delivered").length;
    const returnedOrders = orders.filter(o => o.status === "Returned").length;
    const revenue = orders.filter(o => o.status !== "Returned").reduce((acc, o) => acc + o.total, 0);

    // Filter best sellers
    const sortedBestSellers = [...products].sort((a, b) => b.sold - a.sold).slice(0, 3);

    container.innerHTML = `
      <!-- Top Analytics Grid -->
      <div class="admin-analytics-grid">
        <div class="admin-stat-card">
          <div class="admin-stat-info">
            <h3>Total Orders</h3>
            <span class="admin-stat-number">${totalOrders}</span>
          </div>
          <span class="admin-stat-icon">📦</span>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-info">
            <h3>Revenue (Non-Return)</h3>
            <span class="admin-stat-number">₹${revenue}</span>
          </div>
          <span class="admin-stat-icon">💰</span>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-info">
            <h3>Active Shipments</h3>
            <span class="admin-stat-number">${shippedOrders + pendingOrders}</span>
          </div>
          <span class="admin-stat-icon">🚚</span>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-info">
            <h3>Return Rate</h3>
            <span class="admin-stat-number">${totalOrders > 0 ? Math.round((returnedOrders / totalOrders) * 100) : 0}%</span>
          </div>
          <span class="admin-stat-icon">🔄</span>
        </div>
      </div>

      <!-- Split details panels -->
      <div class="admin-split-layout">
        <!-- Best selling -->
        <div class="admin-card-panel">
          <h3>Best Selling Herbal Remedies</h3>
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Units Sold</th>
                  <th>Rem. Stock</th>
                </tr>
              </thead>
              <tbody>
                ${sortedBestSellers.map(p => `
                  <tr>
                    <td><strong>${p.name}</strong></td>
                    <td>₹${p.price}</td>
                    <td><span class="badge" style="background-color: var(--primary-ultra-light); color:var(--primary); font-weight:700;">${p.sold} Units</span></td>
                    <td>
                      <span class="badge" style="background-color: ${p.stock <= 5 ? '#fef3c7' : '#d1fae5'}; color: ${p.stock <= 5 ? '#b45309' : '#065f46'};">
                        ${p.stock} Left
                      </span>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Recent orders -->
        <div class="admin-card-panel">
          <h3>Today's Recent Orders</h3>
          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Total Payable</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${orders.slice(-4).reverse().map(o => `
                  <tr>
                    <td><strong>${o.name}</strong><br><small>${o.phone}</small></td>
                    <td>₹${o.total}</td>
                    <td><span class="status-pill ${o.status.toLowerCase().replace(" ", "-")}">${o.status}</span></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  } 
  
  else if (adminActiveTab === "orders") {
    // Filtered orders list
    let filteredOrders = orders;
    if (orderFilterStatus !== "All") {
      filteredOrders = filteredOrders.filter(o => o.status === orderFilterStatus);
    }
    if (orderSearchQuery.trim() !== "") {
      const q = orderSearchQuery.toLowerCase();
      filteredOrders = filteredOrders.filter(o => o.name.toLowerCase().includes(q) || o.phone.includes(q) || o.productName.toLowerCase().includes(q));
    }

    container.innerHTML = `
      <div class="admin-card-panel">
        <div class="admin-filter-bar">
          <div style="display:flex; gap:12px;">
            <input type="text" class="admin-search-input" id="order-search" placeholder="Search by customer name/phone..." value="${orderSearchQuery}">
            <select class="admin-search-input" id="order-status-filter" style="width:180px;">
              <option value="All" ${orderFilterStatus === 'All' ? 'selected' : ''}>All Order Statuses</option>
              <option value="New Order" ${orderFilterStatus === 'New Order' ? 'selected' : ''}>New Order</option>
              <option value="Confirmed" ${orderFilterStatus === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
              <option value="Packing" ${orderFilterStatus === 'Packing' ? 'selected' : ''}>Packing</option>
              <option value="Shipped" ${orderFilterStatus === 'Shipped' ? 'selected' : ''}>Shipped</option>
              <option value="Out For Delivery" ${orderFilterStatus === 'Out For Delivery' ? 'selected' : ''}>Out For Delivery</option>
              <option value="Delivered" ${orderFilterStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
              <option value="Returned" ${orderFilterStatus === 'Returned' ? 'selected' : ''}>Returned</option>
            </select>
          </div>
          <span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">Showing ${filteredOrders.length} Orders</span>
        </div>

        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Patient Details</th>
                <th>Products Booked</th>
                <th>Total</th>
                <th>Order Status</th>
                <th>Payment Mode</th>
                <th>Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              ${filteredOrders.map(o => `
                <tr>
                  <td><strong>${o.id}</strong></td>
                  <td>${o.date}</td>
                  <td>
                    <strong>${o.name}</strong><br>
                    <small>${o.phone}</small><br>
                    <small style="color:var(--text-muted);">${o.address}, ${o.city} - ${o.pincode}</small>
                  </td>
                  <td>${o.productName}</td>
                  <td><strong>₹${o.total}</strong></td>
                  <td>
                    <select class="status-selector" style="border:1px solid var(--border); padding:4px 8px; border-radius:var(--radius-sm); font-size:0.75rem; font-weight:600;" onchange="changeOrderStatus('${o.id}', this.value)">
                      <option value="New Order" ${o.status === 'New Order' ? 'selected' : ''}>New Order</option>
                      <option value="Confirmed" ${o.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                      <option value="Packing" ${o.status === 'Packing' ? 'selected' : ''}>Packing</option>
                      <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                      <option value="Out For Delivery" ${o.status === 'Out For Delivery' ? 'selected' : ''}>Out For Delivery</option>
                      <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                      <option value="Returned" ${o.status === 'Returned' ? 'selected' : ''}>Returned</option>
                    </select>
                  </td>
                  <td>
                    <span class="status-pill ${o.paymentStatus === 'Paid' ? 'delivered' : 'pending'}">${o.paymentStatus}</span>
                  </td>
                  <td>
                    <div class="admin-action-buttons">
                      <button class="admin-btn-action info" onclick="viewInvoice('${o.id}')">📄 Invoice</button>
                      ${o.status !== 'Delivered' && o.status !== 'Returned' ? `<button class="admin-btn-action success" onclick="confirmDelivery('${o.id}')">✓ Deliver</button>` : ''}
                      <button class="admin-btn-action danger" onclick="deleteOrder('${o.id}')">🗑 Delete</button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Bind filters
    const search = document.getElementById("order-search");
    const statusSelect = document.getElementById("order-status-filter");
    search.addEventListener("input", (e) => {
      orderSearchQuery = e.target.value;
      renderAdminTabContent();
    });
    statusSelect.addEventListener("change", (e) => {
      orderFilterStatus = e.target.value;
      renderAdminTabContent();
    });
  } 
  
  else if (adminActiveTab === "products") {
    // Show low stock warning if any
    const lowStockRemedies = products.filter(p => p.stock <= 5);

    container.innerHTML = `
      ${lowStockRemedies.length > 0 ? `
        <div class="stock-warning-banner">
          ⚠️ <strong>Low Stock Alert:</strong> The following remedies are running low: 
          ${lowStockRemedies.map(p => `<strong>${p.name} (${p.stock} left)</strong>`).join(", ")}. Please restock immediately.
        </div>
      ` : ''}

      <div class="admin-split-layout" style="margin-top: 0;">
        <!-- Products list -->
        <div class="admin-card-panel" style="grid-column: span 2;">
          <h3 style="display:flex; justify-content:space-between; align-items:center;">
            Inventory Stocks CRUD
            <button class="btn btn-primary" style="padding: 6px 14px; font-size: 0.75rem;" onclick="toggleAddProductForm()">+ Add New Product</button>
          </h3>

          <!-- Inline Add/Edit Form -->
          <div id="product-crud-form-container" style="display:none; border:1px dashed var(--accent); padding:20px; border-radius:var(--radius); margin-bottom:20px; background-color:var(--primary-ultra-light);">
            <h4 id="crud-form-title" style="margin-bottom:12px; color:var(--primary);">Add New Herbal Remedy</h4>
            <form id="product-crud-form">
              <input type="hidden" id="crud-prod-id">
              <div class="form-grid" style="grid-template-columns: repeat(3, 1fr);">
                <div class="form-group">
                  <label for="crud-name">Product Name *</label>
                  <input type="text" id="crud-name" required placeholder="E.g., Badshahi Powder">
                </div>
                <div class="form-group">
                  <label for="crud-price">Selling Price (₹) *</label>
                  <input type="number" id="crud-price" required placeholder="999">
                </div>
                <div class="form-group">
                  <label for="crud-orig-price">Original Price (₹) *</label>
                  <input type="number" id="crud-orig-price" required placeholder="1499">
                </div>
                <div class="form-group col-span-2">
                  <label for="crud-desc">Description *</label>
                  <input type="text" id="crud-desc" required placeholder="E.g., Organic digestion powder.">
                </div>
                <div class="form-group">
                  <label for="crud-stock">Stock Quantity *</label>
                  <input type="number" id="crud-stock" required placeholder="15">
                </div>
                <div class="form-group">
                  <label for="crud-gst">GST Percentage (%) *</label>
                  <input type="number" id="crud-gst" required placeholder="E.g. 0, 5, 12" min="0" value="0">
                </div>
                <div class="form-group">
                  <label for="crud-charges">Extra Charges (Delivery) ₹ *</label>
                  <input type="number" id="crud-charges" required placeholder="E.g. 40" min="0" value="40">
                </div>
                <div class="form-group col-span-2">
                  <label for="crud-image">Product Photo (Upload Image) *</label>
                  <input type="file" id="crud-image" accept="image/*" onchange="handleImageUpload(event)">
                  <input type="hidden" id="crud-image-b64">
                  <img id="crud-image-preview" src="" style="max-height: 120px; display: none; margin-top: 10px; border-radius: var(--radius-sm); border: 1px solid var(--border);">
                </div>
                <div class="form-group">
                  <label for="crud-highlights">Highlights (Comma Separated)</label>
                  <input type="text" id="crud-highlights" placeholder="100% natural, GMP certified">
                </div>
                <div class="form-group">
                  <label for="crud-rating">Rating (e.g. 4.8)</label>
                  <input type="number" step="0.1" id="crud-rating" placeholder="4.8">
                </div>
                <div class="form-group">
                  <label for="crud-reviews">Reviews Count</label>
                  <input type="number" id="crud-reviews" placeholder="120">
                </div>
                <div class="form-group col-span-3">
                  <label for="crud-badge">Badge Label</label>
                  <input type="text" id="crud-badge" placeholder="Trending, Bestseller, Most Ordered">
                </div>
              </div>
              <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:16px;">
                <button type="button" class="btn btn-outline" style="padding:6px 14px; font-size:0.8rem;" onclick="toggleAddProductForm()">Cancel</button>
                <button type="submit" class="btn btn-primary" style="padding:6px 14px; font-size:0.8rem;">Save Product Details</button>
              </div>
            </form>
          </div>

          <div class="table-responsive">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Product Details</th>
                  <th>Image Path</th>
                  <th>Price</th>
                  <th>Original</th>
                  <th>Current Stock</th>
                  <th>Sold Qty</th>
                  <th>Availability Status</th>
                  <th>Controls</th>
                </tr>
              </thead>
              <tbody>
                ${products.map(p => `
                  <tr>
                    <td><strong>${p.name}</strong><br><small style="color:var(--text-muted);">${p.description.substring(0, 50)}...</small></td>
                    <td><img src="${p.image}" alt="img" style="width:50px; height:50px; object-fit:cover; border-radius:8px;"></td>
                    <td>₹${p.price}</td>
                    <td>₹${p.originalPrice}</td>
                    <td>
                      <div style="display:flex; align-items:center; gap:6px;">
                        <button class="qty-btn" onclick="adjustProductStock('${p.id}', -1)">-</button>
                        <strong>${p.stock}</strong>
                        <button class="qty-btn" onclick="adjustProductStock('${p.id}', 1)">+</button>
                      </div>
                    </td>
                    <td>${p.sold}</td>
                    <td>
                      <span class="status-pill ${p.stock <= 0 ? 'returned' : p.stock < 10 ? 'confirmed' : 'delivered'}">
                        ${p.stock <= 0 ? 'Out of Stock' : p.stock < 10 ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td>
                      <div class="admin-action-buttons">
                        <button class="admin-btn-action info" onclick="loadEditForm('${p.id}')">✏️ Edit</button>
                        <button class="admin-btn-action danger" onclick="deleteProduct('${p.id}')">🗑 Delete</button>
                      </div>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Bind form submit
    const crudForm = document.getElementById("product-crud-form");
    if (crudForm) {
      crudForm.addEventListener("submit", handleProductSave);
    }
  } 
  
  else if (adminActiveTab === "appointments") {
    container.innerHTML = `
      <div class="admin-card-panel">
        <h3 style="display:flex; justify-content:space-between; align-items:center;">
          Patient Consultations List
        </h3>
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Apt ID</th>
                <th>Patient Details</th>
                <th>Symptoms / Problems</th>
                <th>Preferred Time</th>
                <th>Booking Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${appointments.map(a => `
                <tr>
                  <td><strong>${a.id}</strong></td>
                  <td><strong>${a.name}</strong><br><small>${a.phone}</small></td>
                  <td>${a.symptoms}</td>
                  <td><code>${a.time.replace("T", " ")}</code></td>
                  <td>
                    <span class="status-pill ${a.status === 'Completed' ? 'delivered' : a.status === 'Approved' ? 'shipped' : 'pending'}">
                      ${a.status}
                    </span>
                  </td>
                  <td>
                    <div class="admin-action-buttons">
                      ${a.status === 'Pending' ? `<button class="admin-btn-action success" onclick="changeAptStatus('${a.id}', 'Approved')">Approve</button>` : ''}
                      ${a.status === 'Approved' ? `<button class="admin-btn-action info" onclick="changeAptStatus('${a.id}', 'Completed')">Complete</button>` : ''}
                      <button class="admin-btn-action danger" onclick="deleteApt('${a.id}')">Delete</button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};

// ==========================================================================
// ADMIN WORKFLOW FUNCTIONS
// ==========================================================================

const adminLogout = () => {
  sessionStorage.removeItem("ud_admin_auth");
  window.location.hash = "#home";
};
window.adminLogout = adminLogout;

// Order Status & Delivery Changes
const changeOrderStatus = async (orderId, newStatus) => {
  try {
    await window.supabaseClient.rpc('admin_update_order', { passcode: '789576', order_id: orderId, new_status: newStatus });
  } catch (err) {
    console.error("Failed to update status in Supabase", err);
  }
  
  // Update local state fallback
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    if (newStatus === "Delivered") order.paymentStatus = "Paid";
    saveOrdersState();
  }
  
  renderAdminTabContent();
};
window.changeOrderStatus = changeOrderStatus;

const confirmDelivery = (orderId) => {
  changeOrderStatus(orderId, "Delivered");
};
window.confirmDelivery = confirmDelivery;

const deleteOrder = async (orderId) => {
  if (confirm(`Are you sure you want to delete order ${orderId}?`)) {
    try {
      await window.supabaseClient.rpc('admin_delete_order', { passcode: '789576', order_id: orderId });
    } catch (err) {
      console.error("Failed to delete from Supabase", err);
    }
    
    orders = orders.filter(o => o.id !== orderId);
    saveOrdersState();
    renderAdminTabContent();
  }
};
window.deleteOrder = deleteOrder;

// Stock Adjustments
const adjustProductStock = (productId, delta) => {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  product.stock = Math.max(0, product.stock + delta);
  saveProductsState();
  renderAdminTabContent();
};
window.adjustProductStock = adjustProductStock;

// Delete Product
const deleteProduct = async (productId) => {
  if (confirm("Are you sure you want to delete this remedy from the Cloud Database?")) {
    try {
      await window.supabaseClient.rpc('admin_delete_product', { passcode: '789576', p_id: productId });
      products = products.filter(p => p.id !== productId);
      renderAdminTabContent();
    } catch(err) {
      alert("Failed to delete from cloud");
    }
  }
};
window.deleteProduct = deleteProduct;

// Add/Edit Product CRUD
const toggleAddProductForm = () => {
  const container = document.getElementById("product-crud-form-container");
  if (!container) return;
  
  if (container.style.display === "none") {
    container.style.display = "block";
    document.getElementById("crud-form-title").innerText = "Add New Herbal Remedy";
    document.getElementById("product-crud-form").reset();
    document.getElementById("crud-prod-id").value = "";
  } else {
    container.style.display = "none";
  }
};
window.toggleAddProductForm = toggleAddProductForm;

const loadEditForm = (productId) => {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const container = document.getElementById("product-crud-form-container");
  if (!container) return;

  container.style.display = "block";
  document.getElementById("crud-form-title").innerText = `Edit: ${product.name}`;
  
  document.getElementById("crud-prod-id").value = product.id;
  document.getElementById("crud-name").value = product.name;
  document.getElementById("crud-price").value = product.price;
  document.getElementById("crud-orig-price").value = product.originalPrice;
  document.getElementById("crud-desc").value = product.description;
  document.getElementById("crud-stock").value = product.stock;
  document.getElementById("crud-gst").value = product.gstPercent || 0;
  document.getElementById("crud-charges").value = product.extraCharge || 0;
  document.getElementById("crud-image").value = ""; // Clear file input
  
  document.getElementById("crud-image-b64").value = product.image;
  const preview = document.getElementById("crud-image-preview");
  preview.src = product.image;
  preview.style.display = "block";

  document.getElementById("crud-highlights").value = product.highlights.join(", ");
  document.getElementById("crud-rating").value = product.rating || "";
  document.getElementById("crud-reviews").value = product.reviews || "";
  document.getElementById("crud-badge").value = product.badge || "";
};
window.loadEditForm = loadEditForm;

const handleProductSave = async (e) => {
  e.preventDefault();
  const idVal = document.getElementById("crud-prod-id").value;
  const nameVal = document.getElementById("crud-name").value;
  const priceVal = parseFloat(document.getElementById("crud-price").value);
  const origPriceVal = parseFloat(document.getElementById("crud-orig-price").value);
  const descVal = document.getElementById("crud-desc").value;
  const stockVal = parseInt(document.getElementById("crud-stock").value);
  const gstVal = parseFloat(document.getElementById("crud-gst").value) || 0;
  const chargesVal = parseFloat(document.getElementById("crud-charges").value) || 0;
  
  // Use Base64 image if uploaded, otherwise use default
  const imgB64 = document.getElementById("crud-image-b64").value;
  const imgPreviewSrc = document.getElementById("crud-image-preview").src;
  const finalImgVal = imgB64 || (imgPreviewSrc && imgPreviewSrc !== window.location.href ? imgPreviewSrc : "assets/placeholder.png");

  const highlightsRaw = document.getElementById("crud-highlights").value;

  const highlightsVal = highlightsRaw
    ? highlightsRaw.split(",").map(hl => hl.trim()).filter(hl => hl !== "")
    : ["100% Organic Remedy", "Formulated by Clinical Experts"];

  const ratingRaw = document.getElementById("crud-rating").value;
  const reviewsRaw = document.getElementById("crud-reviews").value;
  const badgeVal = document.getElementById("crud-badge").value.trim();

  const ratingVal = ratingRaw ? parseFloat(ratingRaw) : null;
  const reviewsVal = reviewsRaw ? parseInt(reviewsRaw) : null;

  const payload = {
    id: idVal || nameVal.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    name: nameVal,
    price: priceVal,
    originalPrice: origPriceVal,
    description: descVal,
    stock: stockVal,
    image: finalImgVal,
    sold: 0,
    category: "General",
    highlights: highlightsVal,
    gstPercent: gstVal,
    extraCharge: chargesVal,
    rating: ratingVal,
    reviews: reviewsVal,
    badge: badgeVal || null
  };

  // Sync to Supabase
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerText;
  submitBtn.innerText = "Saving to Cloud ⏳...";
  submitBtn.disabled = true;

  try {
    const { error } = await window.supabaseClient.rpc('admin_upsert_product', {
      passcode: '789576',
      p_id: payload.id,
      p_name: payload.name,
      p_price: payload.price,
      p_orig: payload.originalPrice,
      p_desc: payload.description,
      p_stock: payload.stock,
      p_image: payload.image,
      p_cat: payload.category,
      p_high: payload.highlights,
      p_rating: payload.rating,
      p_reviews: payload.reviews,
      p_badge: payload.badge
    });
    
    if (error) throw error;

    if (idVal) {
      const product = products.find(p => p.id === idVal);
      if (product) Object.assign(product, payload);
    } else {
      products.push(payload);
    }
    
    // Sort array so it matches cloud view nicely
    products.sort((a,b) => a.name.localeCompare(b.name));
    
  } catch (err) {
    console.error("Cloud sync error:", err);
    alert("Failed to save to cloud: " + err.message);
  } finally {
    submitBtn.innerText = originalText;
    submitBtn.disabled = false;
  }

  renderAdminTabContent();
  toggleAddProductForm();
};

// Appointment Management
const changeAptStatus = async (aptId, newStatus) => {
  try {
    await window.supabaseClient.rpc('admin_update_appointment', { passcode: '789576', apt_id: aptId, new_status: newStatus });
  } catch (err) {
    console.error("Failed to update apt status", err);
  }

  const apt = appointments.find(a => a.id === aptId);
  if (apt) {
    apt.status = newStatus;
    saveAppointmentsState();
  }
  renderAdminTabContent();
};
window.changeAptStatus = changeAptStatus;

const deleteApt = async (aptId) => {
  if (confirm(`Delete appointment record ${aptId}?`)) {
    try {
      await window.supabaseClient.rpc('admin_delete_appointment', { passcode: '789576', apt_id: aptId });
    } catch (err) {
      console.error("Failed to delete apt", err);
    }
    
    appointments = appointments.filter(a => a.id !== aptId);
    saveAppointmentsState();
    renderAdminTabContent();
  }
};
window.deleteApt = deleteApt;

// ==========================================================================
// STORE CHECKOUT & ORDER SUBMISSIONS
// ==========================================================================

// Modals display trigger
const checkoutModal = document.getElementById("checkout-modal");
const checkoutTrigger = document.getElementById("checkout-normal-btn");
const checkoutClose = document.getElementById("close-checkout-modal-btn");
const checkoutBgClose = document.getElementById("checkout-modal-close");

if (checkoutTrigger) {
  checkoutTrigger.addEventListener("click", () => {
    if (cart.length === 0) return;
    closeCartDrawer();
    openCheckoutModal();
  });
}

const openCheckoutModal = () => {
  const checkoutModal = document.getElementById("checkout-modal");
  if (checkoutModal) {
    const cartPaymentMode = document.querySelector('input[name="cart_payment_mode"]:checked');
    if (cartPaymentMode) {
      const checkoutRadios = document.getElementsByName('payment_mode');
      checkoutRadios.forEach(r => {
        if (cartPaymentMode.value === 'Online' && r.value === 'Online') r.checked = true;
        if (cartPaymentMode.value === 'COD' && r.value === 'COD') r.checked = true;
      });
    }
    checkoutModal.classList.add("open");
    if (typeof renderCheckoutSummary === 'function') renderCheckoutSummary();
  }
};

const closeCheckoutModal = () => {
  if (checkoutModal) checkoutModal.classList.remove("open");
};

if (checkoutClose) checkoutClose.addEventListener("click", closeCheckoutModal);
if (checkoutBgClose) checkoutBgClose.addEventListener("click", closeCheckoutModal);

const renderCheckoutSummary = () => {
  const itemsContainer = document.getElementById("checkout-summary-items");
  const totalText = document.getElementById("checkout-summary-total");
  if (!itemsContainer) return;

  let total = 0;
  itemsContainer.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    return `
      <div class="summary-item-row">
        <span>${item.name} (x${item.qty})</span>
        <span>₹${item.price * item.qty}</span>
      </div>
    `;
  }).join("");

  if (totalText) totalText.innerText = `₹${total}`;
};

const btnCurrentLocation = document.getElementById("btn-current-location");
if (btnCurrentLocation) {
  btnCurrentLocation.addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    const originalText = btnCurrentLocation.innerHTML;
    btnCurrentLocation.innerHTML = "Fetching...";
    btnCurrentLocation.disabled = true;

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await res.json();
        
        if (data && data.address) {
          const addr = data.address;
          const house = addr.house_number || addr.building || "";
          const road = addr.road || addr.neighbourhood || "";
          const suburb = addr.suburb || addr.residential || "";
          
          let fullAddress = [house, road, suburb].filter(Boolean).join(", ");
          if(!fullAddress) fullAddress = data.display_name;

          document.getElementById("chk-address").value = fullAddress;
          document.getElementById("chk-city").value = addr.city || addr.town || addr.state_district || "";
          document.getElementById("chk-pincode").value = addr.postcode || "";
        }
      } catch (err) {
        console.error(err);
        alert("Failed to auto-fill location. Please enter manually.");
      } finally {
        btnCurrentLocation.innerHTML = originalText;
        btnCurrentLocation.disabled = false;
      }
    }, (error) => {
      console.error(error);
      alert("Please allow location access to auto-fill address.");
      btnCurrentLocation.innerHTML = originalText;
      btnCurrentLocation.disabled = false;
    });
  });
}

// Handle Checkout Form Submission (COD / WhatsApp)
const checkoutForm = document.getElementById("checkout-form");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const paymentMode = document.querySelector('input[name="payment_mode"]:checked').value;
    submitOrder(paymentMode);
  });
}

const submitOrder = async (mode) => {
  const name = document.getElementById("chk-name").value;
  const phone = document.getElementById("chk-phone").value;
  const address = document.getElementById("chk-address").value;
  const city = document.getElementById("chk-city").value;
  const pincode = document.getElementById("chk-pincode").value;

  if (!/^\d{10}$/.test(phone.trim())) {
    showToast("Please enter a valid 10-digit phone number.", "error");
    return;
  }

  const submitBtn = document.getElementById("checkout-submit-btn");
  if(submitBtn) {
    submitBtn.innerText = "Processing Order ⏳...";
    submitBtn.disabled = true;
  }

  const orderId = `ORD-${Date.now()}`;
  const orderSubtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const orderTotalGst = cart.reduce((acc, item) => acc + Math.round((item.price * item.qty * (item.gstPercent || 0)) / 100), 0);
  const orderTotalCharges = cart.reduce((acc, item) => acc + (item.extraCharge || 0), 0);
  const orderTotal = orderSubtotal + orderTotalGst + orderTotalCharges;
  const orderItemsText = cart.map(item => `${item.name} (x${item.qty})`).join(", ");

  // Adjust product stocks
  cart.forEach(item => {
    const prod = products.find(p => p.id === item.id);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.qty);
      prod.sold += item.qty;
    }
  });
  saveProductsState();

  // Save order to Supabase & local state
  const newOrder = {
    id: orderId,
    date: new Date().toISOString().split("T")[0],
    name: name,
    phone: phone,
    address: address,
    city: city,
    pincode: pincode,
    productName: orderItemsText,
    total: orderTotal.toString(),
    status: "New Order",
    payment_mode: mode
  };
  
  try {
    const { error } = await window.supabaseClient.from('orders').insert([newOrder]);
    if (error) throw error;
  } catch (err) {
    console.error("Supabase Catch Error:", err);
    showToast("Network error. Order saved locally.", "error");
  }

  orders.push(newOrder);
  saveOrdersState();

  // Add to Delivery Tracker
  const trackOrders = getOrders();
  trackOrders.push({
    phone: phone,
    item: orderItemsText,
    status: "Processing",
    note: (mode === "COD" ? "Cash on Delivery Order Placed" : "WhatsApp Order Placed") + " " + userLocationStr,
    date: new Date().toLocaleDateString()
  });
  saveOrders(trackOrders);

  // Clear cart
  cart = [];
  saveCartState();
  updateCartBadge();
  closeCheckoutModal();

  // Generate Whatsapp order message for BOTH COD and Online
  const paymentText = mode === "Online" ? "Pay Online (Please send QR Code/Payment Link)" : "Cash on Delivery (COD)";
  const formattedMsg = encodeURIComponent(
    `Hello Unani Dawakhana Official,\n` +
    `I would like to confirm my order:\n\n` +
    `*Order ID:* ${orderId}\n` +
    `*Remedies:* ${orderItemsText}\n\n` +
    `*Bill Summary:*\n` +
    `- Item Total: ₹${orderSubtotal}\n` +
    (orderTotalGst > 0 ? `- GST/Taxes: ₹${orderTotalGst}\n` : ``) +
    (orderTotalCharges > 0 ? `- Delivery Charges: ₹${orderTotalCharges}\n` : `- Delivery: FREE\n`) +
    `- *Grand Total: ₹${orderTotal}*\n\n` +
    `*Payment Mode:* ${paymentText}\n\n` +
    `*Shipping Details:*\n` +
    `- Name: ${name}\n` +
    `- Phone: ${phone}\n` +
    `- Address: ${address}\n` +
    `- City/Pincode: ${city} - ${pincode}`
  );
  
  // ALWAYS open WhatsApp so Admin gets notified
  window.open(`https://wa.me/918796982661?text=${formattedMsg}`, "_blank");

  if (mode === "Online") {
    showSuccessPopup("Order Registered!", `Thank you, ${name}. Your order ${orderId} details have been sent via WhatsApp. Please complete your online payment there.`, orderId);
  } else {
    showSuccessPopup("Order Registered!", `Thank you, ${name}. Your Cash on Delivery order ${orderId} has been successfully registered. We will deliver it to ${address} shortly.`, orderId);
    setTimeout(() => {
      window.location.hash = "tracker";
    }, 4000);
  }

  if(submitBtn) {
    submitBtn.innerText = "Place Order Now";
    submitBtn.disabled = false;
  }
};

// Invoice Modal Viewer
const viewInvoice = (orderId) => {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const modal = document.getElementById("admin-invoice-modal");
  const modalContent = document.getElementById("invoice-modal-content");

  const itemsHTML = order.productName.split(", ").map(itemStr => {
    const match = itemStr.match(/(.+?)\s*\(x(\d+)\)/);
    let name = itemStr;
    let qty = 1;
    if (match) {
      name = match[1];
      qty = parseInt(match[2]);
    }
    const prod = products.find(p => p.name.includes(name) || name.includes(p.name));
    const price = prod ? prod.price : 999;
    return `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid var(--border-light); text-align: left;">
          <strong>${name}</strong><br>
          <small style="color:var(--text-muted);">Traditional Unani Prep</small>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid var(--border-light); text-align: center;">₹${price}</td>
        <td style="padding: 12px; border-bottom: 1px solid var(--border-light); text-align: center;">${qty}</td>
        <td style="padding: 12px; border-bottom: 1px solid var(--border-light); text-align: right; font-weight: 600;">₹${price * qty}</td>
      </tr>
    `;
  }).join("");

  modalContent.innerHTML = `
    <div style="font-family: 'Inter', sans-serif; color: var(--text); padding: 10px 0;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 24px; border-bottom: 2px solid var(--accent); padding-bottom: 16px; flex-wrap: wrap; gap: 20px;">
        <div>
          <h1 style="color: var(--primary); font-family: var(--font-heading); font-size: 2rem; margin: 0;">Unani Dawakhana</h1>
          <p style="color: var(--accent); font-weight: 600; letter-spacing: 1px; margin: 2px 0 0 0; font-size: 0.85rem;">OFFICIAL WELLNESS CLINIC</p>
          <p style="font-size: 0.78rem; color: var(--text-muted); margin: 6px 0 0 0; line-height: 1.4;">Shaheen Bagh, Jamia Nagar, New Delhi - 110025<br>Phone: +91 8796982661 | ounanidawakhana@gmail.com</p>
        </div>
        <div style="text-align: right;">
          <h2 style="font-size: 1.3rem; color: var(--primary); margin: 0 0 6px 0;">INVOICE</h2>
          <p style="font-size: 0.8rem; margin: 2px 0;"><strong>Invoice No:</strong> INV-${order.id.split("-")[1] || order.id}</p>
          <p style="font-size: 0.8rem; margin: 2px 0;"><strong>Date:</strong> ${order.date}</p>
          <p style="font-size: 0.8rem; margin: 2px 0;"><strong>Status:</strong> <span style="display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 0.72rem; font-weight: 700; background-color: var(--primary-ultra-light); color: var(--primary);">${order.status}</span></p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 24px;">
        <div>
          <h4 style="color: var(--accent-dark); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 6px;">PATIENT DETAILS</h4>
          <p style="font-size: 0.85rem; margin: 2px 0;"><strong>${order.name}</strong></p>
          <p style="font-size: 0.85rem; margin: 2px 0;">Phone: +91 ${order.phone}</p>
        </div>
        <div>
          <h4 style="color: var(--accent-dark); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; margin-bottom: 6px;">SHIPPING ADDRESS</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; margin: 2px 0;">
            ${order.address}<br>
            ${order.city} - ${order.pincode}
          </p>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <thead>
          <tr style="background-color: var(--primary-ultra-light); color: var(--primary);">
            <th style="padding: 10px 12px; text-align: left; font-weight: 600; font-size: 0.8rem; border-bottom: 2px solid var(--border-light);">Description</th>
            <th style="padding: 10px 12px; text-align: center; font-weight: 600; font-size: 0.8rem; border-bottom: 2px solid var(--border-light);">Unit Price</th>
            <th style="padding: 10px 12px; text-align: center; font-weight: 600; font-size: 0.8rem; border-bottom: 2px solid var(--border-light);">Qty</th>
            <th style="padding: 10px 12px; text-align: right; font-weight: 600; font-size: 0.8rem; border-bottom: 2px solid var(--border-light);">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>

      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px; margin-bottom: 24px;">
        <div style="max-width: 320px;">
          <h4 style="font-size: 0.8rem; color: var(--primary); margin-bottom: 4px;">Clinician Note & Terms</h4>
          <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.5; margin: 0;">This invoice is clinically verified by Unani Dawakhana. Products shipped are formulated under certified herbal procedures. Pay on delivery via Cash or UPI scan code.</p>
        </div>
        <div style="text-align: right; min-width: 180px;">
          <div style="display:flex; justify-content:space-between; padding: 4px 0; border-bottom: 1px solid var(--border-light); font-size:0.85rem;">
            <span>Subtotal:</span>
            <span>₹${order.total}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding: 4px 0; border-bottom: 1px solid var(--border-light); font-size:0.85rem;">
            <span>Delivery Fee:</span>
            <span style="color:var(--success); font-weight:600;">FREE</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding: 10px 0; font-size:1.1rem; font-weight: 700; color: var(--primary);">
            <span>Total Payable:</span>
            <span>₹${order.total}</span>
          </div>
          <p style="font-size: 0.68rem; color: var(--text-muted); margin-top: 2px;">Payment Mode: Cash on Delivery (COD)</p>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 30px; padding-top: 20px; border-top: 1px dashed var(--border-light);">
        <div>
          <div style="width: 80px; height: 80px; border: 3px double var(--accent); border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--accent-dark); font-weight: bold; font-size: 0.58rem; transform: rotate(-10deg); opacity: 0.8; user-select: none;">
            <span>UNANI CLINIC</span>
            <span style="border-top:1px solid var(--accent); border-bottom:1px solid var(--accent); padding: 1px 0; margin: 1px 0;">VERIFIED</span>
            <span>DELHI</span>
          </div>
        </div>
        <div style="text-align: right;">
          <p style="font-style: italic; font-family: 'Outfit', sans-serif; font-size: 1rem; color: var(--primary); margin: 0;">Dr. Hakim H. K.</p>
          <div style="width: 120px; border-top: 1px solid var(--primary); margin: 2px 0 0 auto;"></div>
          <p style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px; text-transform: uppercase; letter-spacing: 0.5px;">Authorized Signature</p>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("open");
};
window.viewInvoice = viewInvoice;

const setupInvoiceActions = () => {
  const modal = document.getElementById("admin-invoice-modal");
  if (!modal) return;

  const closeBtn = document.getElementById("close-invoice-modal-btn");
  const closeBtnBottom = document.getElementById("close-invoice-modal-btn-bottom");
  const bgClose = document.getElementById("admin-invoice-modal-close-bg");
  const printBtn = document.getElementById("print-invoice-btn");

  const closeModal = () => modal.classList.remove("open");

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (closeBtnBottom) closeBtnBottom.addEventListener("click", closeModal);
  if (bgClose) bgClose.addEventListener("click", closeModal);

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
};
setupInvoiceActions();

// Success Popup display helper
const successPopup = document.getElementById("success-popup");
const successTitle = document.getElementById("success-popup-title");
const successMsg = document.getElementById("success-message");
const successClose = document.getElementById("success-close-btn");
const successDownloadBtn = document.getElementById("success-download-btn");

let lastPlacedOrderId = null;

const showSuccessPopup = (title, message, orderId = null) => {
  lastPlacedOrderId = orderId;
  if (successPopup && successTitle && successMsg) {
    successTitle.innerText = title;
    successMsg.innerText = message;
    
    if (orderId && successDownloadBtn) {
      successDownloadBtn.style.display = "block";
    } else if (successDownloadBtn) {
      successDownloadBtn.style.display = "none";
    }
    
    successPopup.classList.add("open");
  }
};

if (successClose) {
  successClose.addEventListener("click", () => {
    if (successPopup) successPopup.classList.remove("open");
  });
}

if (successDownloadBtn) {
  successDownloadBtn.addEventListener("click", () => {
    if (successPopup) successPopup.classList.remove("open");
    if (lastPlacedOrderId) {
      viewInvoice(lastPlacedOrderId);
    }
  });
}

// ==========================================================================
// NAVBAR & NAVIGATION TOGGLES
// ==========================================================================
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("ud_theme", newTheme);
    updateThemeIcons(newTheme);
  });
}

const cartTrigger = document.getElementById("cart-trigger");
const cartDrawerClose = document.getElementById("cart-drawer-close");
const cartOverlayClose = document.getElementById("cart-overlay-close");

if (cartTrigger) cartTrigger.addEventListener("click", openCartDrawer);
if (cartDrawerClose) cartDrawerClose.addEventListener("click", closeCartDrawer);
if (cartOverlayClose) cartOverlayClose.addEventListener("click", closeCartDrawer);

// Mobile Hamburger
const mobileToggle = document.getElementById("mobile-toggle");
const mobileDrawer = document.getElementById("mobile-drawer");
const mobileDrawerClose = document.getElementById("mobile-drawer-close");
const mobileDrawerOverlay = document.getElementById("mobile-drawer-overlay");

if (mobileToggle && mobileDrawer) {
  mobileToggle.addEventListener("click", () => {
    mobileDrawer.classList.add("open");
  });
}

const closeMobileDrawer = () => {
  if (mobileDrawer) mobileDrawer.classList.remove("open");
};

if (mobileDrawerClose) mobileDrawerClose.addEventListener("click", closeMobileDrawer);
if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener("click", closeMobileDrawer);

// Link intercepts for mobile nav
document.querySelectorAll(".mobile-link").forEach(link => {
  link.addEventListener("click", closeMobileDrawer);
});

// ==========================================================================
// AI HAKEEM CHATBOT LOGIC
// ==========================================================================
const aiChatBtn = document.getElementById("ai-chat-btn");
const aiChatPanel = document.getElementById("ai-chat-panel");
const aiChatClose = document.getElementById("ai-chat-close");
const aiChatForm = document.getElementById("ai-chat-form");
const aiChatInput = document.getElementById("ai-chat-input");
const aiChatBody = document.getElementById("ai-chat-body");

if (aiChatBtn && aiChatPanel) {
  aiChatBtn.addEventListener("click", () => {
    aiChatPanel.classList.toggle("active");
  });

  aiChatClose.addEventListener("click", () => {
    aiChatPanel.classList.remove("active");
  });

  aiChatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = aiChatInput.value.trim();
    if (!message) return;

    // Add User Message
    const userMsgDiv = document.createElement("div");
    userMsgDiv.className = "ai-msg user";
    userMsgDiv.innerText = message;
    aiChatBody.appendChild(userMsgDiv);
    aiChatInput.value = "";
    aiChatBody.scrollTop = aiChatBody.scrollHeight;

    // Add Loading Indicator
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "ai-msg bot";
    loadingDiv.innerHTML = "<em>Hakeem Sahab soch rahe hain...</em>";
    aiChatBody.appendChild(loadingDiv);
    aiChatBody.scrollTop = aiChatBody.scrollHeight;

    try {
      const res = await fetch("/api/ai-consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });
      const data = await res.json();

      // Remove loading indicator
      aiChatBody.removeChild(loadingDiv);

      // Add Bot Message
      const botMsgDiv = document.createElement("div");
      botMsgDiv.className = "ai-msg bot";
      // Convert markdown-like response to simple text or HTML
      botMsgDiv.innerHTML = data.reply.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      aiChatBody.appendChild(botMsgDiv);
      aiChatBody.scrollTop = aiChatBody.scrollHeight;

    } catch (err) {
      aiChatBody.removeChild(loadingDiv);
      const errorMsgDiv = document.createElement("div");
      errorMsgDiv.className = "ai-msg bot";
      errorMsgDiv.style.color = "var(--danger)";
      errorMsgDiv.innerText = "Network Error! Please try again or WhatsApp us.";
      aiChatBody.appendChild(errorMsgDiv);
    }
  });
}

// ==========================================================================
// DELIVERY TRACKER (MOCK DATA in LOCAL STORAGE)
// ==========================================================================
const getOrders = () => JSON.parse(localStorage.getItem("dawakhana_orders") || "[]");
const saveOrders = (orders) => localStorage.setItem("dawakhana_orders", JSON.stringify(orders));

window.renderTrackerView = (container) => {
  container.innerHTML = `
    <div style="padding:1.5rem 1rem; text-align:center;">
      <h2 style="font-family:'Outfit',sans-serif; color:var(--primary); margin-bottom:1rem;">Track Your Order 📦</h2>
      <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1.5rem;">Enter your Order ID to check delivery status.</p>
      <input type="text" id="track-id" placeholder="Order ID (e.g. ORD-170000000)" style="width:100%; padding:12px; border-radius:8px; border:1px solid #ddd; margin-bottom:1rem; font-size:1rem;">
      <button id="track-submit-btn" class="btn-primary" onclick="checkOrderStatus()" style="width:100%; padding:12px;">Track Status</button>
      <div id="track-result" style="margin-top:2rem; text-align:left;"></div>
    </div>
  `;
};

window.checkOrderStatus = async () => {
  const orderId = document.getElementById("track-id").value.trim();
  const res = document.getElementById("track-result");
  const trackBtn = document.getElementById("track-submit-btn");
  if(!orderId) {
    showToast("Please enter a valid Order ID.", "error");
    return;
  }
  
  if(trackBtn) {
    trackBtn.innerText = "Tracking ⏳...";
    trackBtn.disabled = true;
  }
  
  res.innerHTML = '<div style="text-align:center; padding: 20px;">Fetching status...</div>';
  
  try {
    const { data: userOrders, error } = await window.supabaseClient.rpc('get_order_by_id', { order_id: orderId });
    
    if(error || !userOrders || userOrders.length === 0) {
      res.innerHTML = `
        <div style="background:#fff; padding:1.5rem; border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,0.05); text-align:center;">
          <span style="font-size:2rem;">🤷‍♂️</span>
          <h3 style="margin-top:10px; color:var(--primary);">No Orders Found</h3>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-top:4px;">We couldn't find an order with ID ${orderId}.</p>
        </div>`;
    } else {
      res.innerHTML = userOrders.map(o => `
        <div style="background:#fff; padding:1rem; border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,0.05); margin-bottom:1rem; border-left:4px solid #25D366;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-weight:bold; font-size:0.9rem;">${o.id}</span>
            <span style="background:#e6f4ea; color:#0d652d; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:bold;">${o.status}</span>
          </div>
          <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:4px;">Placed on: ${o.date}</p>
          <p style="font-size:0.85rem;"><strong>Items:</strong> ${o.productName}</p>
          <p style="font-size:0.85rem;"><strong>Payment:</strong> ${o.payment_mode}</p>
        </div>
      `).join("");
    }
  } catch (err) {
    showToast("Network error checking order.", "error");
    res.innerHTML = "";
  } finally {
    if(trackBtn) {
      trackBtn.innerText = "Track Status";
      trackBtn.disabled = false;
    }
  }
};

window.renderAdminView = (container) => {
  container.innerHTML = `
    <div style="padding:1.5rem 1rem;">
      <h2 style="font-family:'Outfit',sans-serif; color:var(--primary); margin-bottom:1rem;">Admin Tracker Panel</h2>
      <div style="background:#fff; padding:1rem; border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,0.05);">
        <h3 style="font-size:1rem; margin-bottom:10px;">Add / Update Order</h3>
        <input type="text" id="admin-phone" placeholder="Customer Mobile" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ddd; border-radius:6px;">
        <input type="text" id="admin-item" placeholder="Item Name" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ddd; border-radius:6px;">
        <select id="admin-status" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ddd; border-radius:6px;">
          <option value="Processing">Processing</option>
          <option value="Dispatched">Dispatched</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>
        <input type="text" id="admin-note" placeholder="Tracking Link / Note" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ddd; border-radius:6px;">
        <button class="btn-primary" onclick="adminSaveOrder()" style="width:100%; padding:12px;">Save Order Status</button>
      </div>
    </div>
  `;
};

window.adminSaveOrder = () => {
  const phone = document.getElementById("admin-phone").value.trim();
  const item = document.getElementById("admin-item").value.trim();
  const status = document.getElementById("admin-status").value;
  const note = document.getElementById("admin-note").value.trim();
  
  if(!phone || !item) return alert("Phone and Item required!");
  
  const orders = getOrders();
  orders.push({
    phone, item, status, note, date: new Date().toLocaleDateString()
  });
  saveOrders(orders);
  alert("Order Status Updated!");
  document.getElementById("admin-phone").value = "";
  document.getElementById("admin-item").value = "";
  document.getElementById("admin-note").value = "";
};


window.renderPrivacyView = (container) => {
  container.innerHTML = `
    <section class="section" style="padding-top:40px;">
      <div class="container" style="max-width:800px; margin:auto; background:#fff; padding:30px; border-radius:12px; border:1px solid var(--border); box-shadow:0 4px 15px rgba(0,0,0,0.05);">
        <h2 style="font-family:'Outfit',sans-serif; color:var(--primary); margin-bottom:20px;">Privacy Policy</h2>
        <p style="color:var(--text-main); line-height:1.6; margin-bottom:15px;">At Unani Dawakhana, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.</p>
        <h3 style="color:var(--primary); margin-bottom:10px; margin-top:20px;">1. Information We Collect</h3>
        <p style="color:var(--text-main); line-height:1.6; margin-bottom:15px;">We collect information that you provide to us directly, such as when you place an order, book an appointment, or contact us. This may include your name, email address, phone number, and shipping address.</p>
        <h3 style="color:var(--primary); margin-bottom:10px; margin-top:20px;">2. How We Use Your Information</h3>
        <p style="color:var(--text-main); line-height:1.6; margin-bottom:15px;">Your information is used solely to process your orders, schedule appointments, and provide customer support. We do not sell or share your personal data with third parties for marketing purposes.</p>
        <h3 style="color:var(--primary); margin-bottom:10px; margin-top:20px;">3. Data Security</h3>
        <p style="color:var(--text-main); line-height:1.6; margin-bottom:15px;">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our database is secured with modern encryption standards.</p>
      </div>
    </section>
  `;
};

window.renderTermsView = (container) => {
  container.innerHTML = `
    <section class="section" style="padding-top:40px;">
      <div class="container" style="max-width:800px; margin:auto; background:#fff; padding:30px; border-radius:12px; border:1px solid var(--border); box-shadow:0 4px 15px rgba(0,0,0,0.05);">
        <h2 style="font-family:'Outfit',sans-serif; color:var(--primary); margin-bottom:20px;">Terms and Conditions</h2>
        <p style="color:var(--text-main); line-height:1.6; margin-bottom:15px;">Welcome to Unani Dawakhana. By accessing and using our website, you agree to comply with and be bound by the following terms and conditions.</p>
        <h3 style="color:var(--primary); margin-bottom:10px; margin-top:20px;">1. Medical Disclaimer</h3>
        <p style="color:var(--text-main); line-height:1.6; margin-bottom:15px;">The information provided on this website is for educational purposes only and is not intended as a substitute for professional medical advice. Always consult a qualified healthcare provider before starting any new treatment.</p>
        <h3 style="color:var(--primary); margin-bottom:10px; margin-top:20px;">2. Product Orders</h3>
        <p style="color:var(--text-main); line-height:1.6; margin-bottom:15px;">All orders are subject to availability. We reserve the right to limit the quantity of products we supply. Prices and product specifications are subject to change without notice.</p>
        <h3 style="color:var(--primary); margin-bottom:10px; margin-top:20px;">3. Shipping and Delivery</h3>
        <p style="color:var(--text-main); line-height:1.6; margin-bottom:15px;">We aim to deliver products within the estimated timeframes; however, delays may occur due to unforeseen circumstances. We are not liable for any delays beyond our control.</p>
      </div>
    </section>
  `;
};
