document.addEventListener('DOMContentLoaded', () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        timeZone: 'Africa/Nairobi',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const ids = ['termsDate', 'privacyDate', 'cookieDate', 'refundDate', 'safetyDate', 'rentsDate'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = currentDate;
    });
});

// Cookie preferences functionality
document.querySelectorAll('#cookieModal .form-check-input').forEach(checkbox => {
    if (!checkbox.disabled) {
        checkbox.addEventListener('change', function () {
            console.log(`Cookie preference changed: ${this.id} - ${this.checked}`);
            // Implement actual cookie preference saving here
        });
    }
});

// Sticky navbar
const navbarWrapper = document.getElementById('navbarWrapper');
window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
        if (!navbarWrapper.classList.contains('sticky-nav')) {
            navbarWrapper.classList.add('sticky-nav');
            document.body.classList.add('nav-fixed-padding');
        }
    } else {
        if (navbarWrapper.classList.contains('sticky-nav')) {
            navbarWrapper.classList.remove('sticky-nav');
            document.body.classList.remove('nav-fixed-padding');
        }
    }
});

// Offcanvas hide navbar
const offcanvasEl = document.getElementById('mobileOffcanvas');
if (offcanvasEl) {
    offcanvasEl.addEventListener('show.bs.offcanvas', () => { navbarWrapper.style.display = 'none'; });
    offcanvasEl.addEventListener('hidden.bs.offcanvas', () => { navbarWrapper.style.display = ''; });
}

const offcanvasElement = document.getElementById('mobileOffcanvas');
if (offcanvasElement) {
    offcanvasElement.addEventListener('show.bs.offcanvas', function () {
        if (navbarWrapper) navbarWrapper.style.display = 'none';
    });
    offcanvasElement.addEventListener('hidden.bs.offcanvas', function () {
        if (navbarWrapper) navbarWrapper.style.display = '';
    });
}

// Category filtering for tours
const filterButtons = document.querySelectorAll('.filter-btn');
const safariItems = document.querySelectorAll('.safari-item');
function filterItems(category) {
    safariItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterItems(btn.getAttribute('data-filter'));
    });
});

// Blog filtering (using .filter-btn)
const filterBtns = document.querySelectorAll('.filter-btn');
const blogPosts = document.querySelectorAll('.blog-post');

function filterBlogPosts(category) {
    blogPosts.forEach(post => {
        if (category === 'all' || post.getAttribute('data-category') === category) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-filter');
        filterBlogPosts(category);
    });
});

// Load More functionality (shows all 9 initially, then 'Load More' does nothing extra because all are visible)
// But we keep the button for UX – it could be used to load additional posts via AJAX in future.
const loadBtn = document.getElementById('loadMoreBtn');
loadBtn.addEventListener('click', () => {
    alert('All articles are already displayed. Stay tuned for more stories!');
});

function showTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}
function toggleItinerary(headerElement) {
    headerElement.classList.toggle('collapsed');
    const content = headerElement.nextElementSibling;
    if (content.style.display === 'none') content.style.display = 'block';
    else content.style.display = 'none';
}

function escapeHtml(str) { return str.replace(/[&<>]/g, function (m) { if (m === '&') return '&amp;'; if (m === '<') return '&lt;'; if (m === '>') return '&gt;'; return m; }); }
document.querySelectorAll('.itinerary-content').forEach(c => c.style.display = 'block');


(function () {
    // Tab switching functionality (pure JS)
    const tabButtons = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    function switchTab(tabId) {
        // hide all panes
        tabPanes.forEach(pane => pane.classList.remove('active'));
        // deactivate all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // activate target pane
        const activePane = document.getElementById(tabId);
        if (activePane) activePane.classList.add('active');
        // activate clicked button
        const activeBtn = document.querySelector(`.tab-link[data-tab="${tabId}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const targetTabId = this.getAttribute('data-tab');
            if (targetTabId) switchTab(targetTabId);
        });
    });

    const initialActive = document.querySelector('.tab-link.active');
    if (!initialActive) {
        switchTab('bookingTab');
    }
})();

