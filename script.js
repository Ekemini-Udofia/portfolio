// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  mobileMenuBtn.addEventListener('click', function() {
    // Toggle mobile menu
    mobileNav.classList.toggle('hidden');
    mobileNav.classList.toggle('show');
    
    // Change icon based on menu state
    if (mobileNav.classList.contains('show')) {
      mobileMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>`;
    } else {
      mobileMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>`;
    }
  });
  
  // Close mobile menu when clicking on mobile nav links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('show');
      mobileNav.classList.add('hidden');
      mobileMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>`;
    });
  });
  
  // Scroll event for header
  window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 10) {
      header.classList.add('fixed-header');
    } else {
      header.classList.remove('fixed-header');
    }
  });
  
  // Toast message functionality
  const toast = document.getElementById('toast');
  const toastTitle = document.querySelector('.toast-title');
  const toastMessage = document.querySelector('.toast-message');
  const toastClose = document.querySelector('.toast-close');
  
  function showToast(title, message, duration = 5000) {
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('show');
    
    // Auto hide after duration
    if (duration > 0) {
      setTimeout(() => {
        hideToast();
      }, duration);
    }
  }
  
  function hideToast() {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 300);
  }
  
  // Close toast when clicking on close button
  toastClose.addEventListener('click', hideToast);
  
  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link with form data
    const mailtoLink = `mailto:ekeminiabasiudofia@gmail.com?subject=Portfolio Contact: ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    
    // Open the mailto link
    window.location.href = mailtoLink;
    
    // Show success toast
    showToast('Email client opened!', 'Your message has been prepared in your email client.');
    
    // Reset form
    contactForm.reset();
  });
  
  // Add smooth scroll behavior for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Get header height to offset the scroll position
        const headerHeight = document.getElementById('header').offsetHeight;
        
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add animation classes to elements when they come into view
  function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .info-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let delay = 0;
          
          // If this is a card in a grid, calculate a staggered delay
          const parent = entry.target.parentElement;
          if (parent && (parent.classList.contains('skills-grid') || parent.classList.contains('projects-grid'))) {
            const index = Array.from(parent.children).indexOf(entry.target);
            delay = index * 100; // 100ms delay between each card
          }
          
          // Apply animation with delay
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, delay);
          
          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    elements.forEach(element => {
      element.style.opacity = '0';
      observer.observe(element);
    });
  }
  
  // Initialize animations
  animateOnScroll();
});