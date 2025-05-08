document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    menuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      menuIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
        header.classList.remove('transparent');
      } else {
        header.classList.remove('scrolled');
        header.classList.add('transparent');
      }
    });
    
    // Initialize scroll animations for skill bars
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.progress');
          progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          });
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.skill-category').forEach(category => {
      observer.observe(category);
    });
    
    // Project modal functionality
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalTags = document.getElementById('modalTags');
    const modalDetails = document.getElementById('modalDetails');
    const closeModal = document.querySelector('.modal-close');
    
    window.openProjectModal = function(projectId) {
      // Sample project data - in a real site, this would come from a database or JSON file
      const projects = {
        'line-follower': {
          title: 'Line Following Robot',
          tags: ['Arduino', 'C++', 'PID Control', 'IR Sensors'],
          details: `An autonomous robot designed to follow a black line on a white surface using infrared sensors.
  
  Features:
  - Uses an array of 5 IR sensors for precise line detection
  - Implements PID control algorithm for smooth tracking and minimal oscillation
  - Designed custom PCB for sensor array and motor control
  - 3D printed chassis for optimal sensor placement
  - Capable of handling curves and intersections
  
  Technical challenges included calibrating the sensors for different lighting conditions and tuning the PID constants for optimal performance across various track designs.`
        }
        // Add more projects as needed
      };
      
      const project = projects[projectId];
      if (project) {
        modalTitle.textContent = project.title;
        modalImage.innerHTML = `<div class="placeholder">${project.title} Preview</div>`;
        
        // Clear and populate tags
        modalTags.innerHTML = '';
        project.tags.forEach(tag => {
          const tagSpan = document.createElement('span');
          tagSpan.className = 'tech-tag';
          tagSpan.textContent = tag;
          modalTags.appendChild(tagSpan);
        });
        
        modalDetails.textContent = project.details;
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      }
    };
    
    // Close modal when clicking the X
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validate form (simple validation)
        if (!name || !email || !message) {
          showToast('Please fill out all fields', 'error');
          return;
        }
        
        // This would normally send to a server
        console.log('Form submission:', { name, email, message });
        
        // For demo purposes, just show a success message
        showToast('Message sent successfully!');
        
        // Reset the form
        contactForm.reset();
      });
    }
    
    // Toast notification function
    function showToast(message, type = 'success') {
      const toast = document.getElementById('toast');
      toast.textContent = message;
      toast.className = 'toast';
      
      if (type === 'error') {
        toast.classList.add('error');
      }
      
      toast.classList.add('show');
      
      setTimeout(function() {
        toast.classList.remove('show');
      }, 3000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80, // Offset for header height
            behavior: 'smooth'
          });
        }
      });
    });
  });