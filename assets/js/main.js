// ========================================
// Main JavaScript — Interactions
// ========================================

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// --- Mobile nav toggle ---
function toggleNav() {
  const links = document.getElementById('nav-links');
  const toggle = document.getElementById('nav-toggle');
  links.classList.toggle('open');
  toggle.classList.toggle('active');
}

// Close mobile nav on link click
document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => {
    const links = document.getElementById('nav-links');
    const toggle = document.getElementById('nav-toggle');
    links.classList.remove('open');
    toggle.classList.remove('active');
  });
});

// --- Scroll animations (Intersection Observer) ---
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
  // Animate cards and sections on scroll
  document.querySelectorAll('.post-card, .card, .timeline__item, .skills').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
    observer.observe(el);
  });
});

// --- Blog search ---
const searchInput = document.getElementById('search-input');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const posts = document.querySelectorAll('#posts-list .post-card');
    
    posts.forEach(post => {
      const title = post.getAttribute('data-title') || '';
      const tags = post.getAttribute('data-tags') || '';
      const match = title.includes(query) || tags.includes(query);
      post.style.display = match ? '' : 'none';
    });
  });
}

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
