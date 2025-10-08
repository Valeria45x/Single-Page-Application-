// assets/js/main.js
// WEB ATELIER (UDIT) - Student Project Template JavaScript

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function () {
	// Initialize your project functionality
	console.log('WEB ATELIER (UDIT) - Student project initialized');
	console.log('Dark mode, back-to-top, and navigation features loaded');

	// Smooth scrolling for anchor links (original template functionality)
	const links = document.querySelectorAll('a[href^="#"]');
	links.forEach((link) => {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			const targetId = this.getAttribute('href').substring(1);
			const targetElement = document.getElementById(targetId);

			if (targetElement) {
				targetElement.scrollIntoView({
					behavior: 'smooth',
				});
			}
		});
	});

	// Skip link functionality (original template functionality)
	const skipLink = document.querySelector('.skip-link');
	if (skipLink) {
		skipLink.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.focus();
				target.scrollIntoView({ behavior: 'smooth' });
			}
		});
	}
});

// ===== CUSTOM UTILITY FUNCTIONS =====
// Function to update page metadata (original template functionality)
function updatePageMetadata(title, description) {
	document.title = title;

	let metaDescription = document.querySelector('meta[name="description"]');
	if (metaDescription) {
		metaDescription.setAttribute('content', description);
	} else {
		metaDescription = document.createElement('meta');
		metaDescription.setAttribute('name', 'description');
		metaDescription.setAttribute('content', description);
		document.head.appendChild(metaDescription);
	}
}

// ===== DARK MODE TOGGLE =====
(function() {
	const darkModeToggle = document.getElementById('darkModeToggle');
	const body = document.body;
	
	if (!darkModeToggle) return;
	
	// Check for saved theme preference or default to 'light'
	const currentTheme = localStorage.getItem('theme') || 'light';
	body.setAttribute('data-bs-theme', currentTheme);
	
	// Update button icon based on current theme
	function updateIcon(theme) {
		const icon = darkModeToggle.querySelector('i');
		if (theme === 'dark') {
			icon.className = 'bi bi-sun-fill';
			console.log('Dark mode activated');
		} else {
			icon.className = 'bi bi-moon-stars-fill';
			console.log('Light mode activated');
		}
	}
	
	// Set initial icon
	updateIcon(currentTheme);
	
	// Toggle theme on button click
	darkModeToggle.addEventListener('click', function() {
		const currentTheme = body.getAttribute('data-bs-theme');
		const newTheme = currentTheme === 'light' ? 'dark' : 'light';
		
		body.setAttribute('data-bs-theme', newTheme);
		localStorage.setItem('theme', newTheme);
		updateIcon(newTheme);
	});
})();

// ===== BACK TO TOP BUTTON =====
(function() {
	const backToTopButton = document.getElementById('backToTop');
	
	if (!backToTopButton) return; // Exit if button doesn't exist
	
	// Show button when user scrolls down 300px
	window.addEventListener('scroll', function() {
		if (window.scrollY > 300) {
			backToTopButton.style.display = 'block';
		} else {
			backToTopButton.style.display = 'none';
		}
	});
	
	// Smooth scroll to top when clicked
	backToTopButton.addEventListener('click', function() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
})();

// ===== ACTIVE NAV LINK HIGHLIGHT =====
(function() {
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('.nav-link');
	
	if (sections.length === 0 || navLinks.length === 0) return;
	
	window.addEventListener('scroll', function() {
		let current = '';
		
		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			if (scrollY >= (sectionTop - 100)) {
				current = section.getAttribute('id');
			}
		});
		
		navLinks.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href') === `#${current}`) {
				link.classList.add('active');
			}
		});
	});
})();

// ===== NAVBAR COLLAPSE ON LINK CLICK (Mobile) =====
(function() {
	const navLinks = document.querySelectorAll('.nav-link');
	const navbarCollapse = document.querySelector('.navbar-collapse');
	
	if (!navbarCollapse) return;
	
	navLinks.forEach(link => {
		link.addEventListener('click', function() {
			// Close mobile menu after clicking a link
			if (navbarCollapse.classList.contains('show')) {
				const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
					toggle: true
				});
			}
		});
	});
})();



// Example function: Log viewport size on resize
window.addEventListener('resize', function() {
	console.log('Viewport size:', window.innerWidth, 'x', window.innerHeight);
});

// Example function: Console log when user switches themes
window.addEventListener('storage', function(e) {
	if (e.key === 'theme') {
		console.log('Theme changed to:', e.newValue);
	}
});