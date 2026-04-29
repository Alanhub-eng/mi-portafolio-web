/**
 * ============================================
 * PORTAFOLIO PROFESIONAL - JAVASCRIPT
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initNavbarScroll();
    initBackToTop();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initSmoothScroll();
});

/**
 * ============================================
 * NAVBAR - Cambiar estilo al hacer scroll
 * ============================================
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Cerrar menu mobile al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

/**
 * ============================================
 * BOTON VOLVER ARRIBA
 * ============================================
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // Mostrar/ocultar boton segun scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Click para volver arriba
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * ============================================
 * ANIMACIONES AL HACER SCROLL
 * ============================================
 */
function initScrollAnimations() {
    // Seleccionar todos los elementos a animar
    const animatedElements = document.querySelectorAll(
        '.about-card, .timeline-item, .project-card, .skill-item, .interest-card, .contact-item'
    );
    
    // Agregar clase para animacion
    animatedElements.forEach(function(element) {
        element.classList.add('animate-on-scroll');
    });
    
    // Observer para detectar cuando los elementos son visibles
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Agregar delay escalonado para elementos hermanos
                const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
                const index = Array.from(siblings).indexOf(entry.target);
                
                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, index * 100);
                
                // Dejar de observar una vez animado
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar cada elemento
    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
}

/**
 * ============================================
 * BARRAS DE HABILIDADES - Animacion
 * ============================================
 */
function initSkillBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    // Guardar el ancho original y resetear
    progressBars.forEach(function(bar) {
        const width = bar.style.width;
        bar.setAttribute('data-width', width);
        bar.style.width = '0%';
    });
    
    // Observer para animar cuando sea visible
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.progress-bar');
                
                bars.forEach(function(bar, index) {
                    setTimeout(function() {
                        bar.style.width = bar.getAttribute('data-width');
                    }, index * 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    // Observar la seccion de habilidades
    const skillsSection = document.getElementById('habilidades');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

/**
 * ============================================
 * FORMULARIO DE CONTACTO
 * ============================================
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(form);
            const nombre = formData.get('nombre');
            const email = formData.get('email');
            const asunto = formData.get('asunto');
            const mensaje = formData.get('mensaje');
            
            // Validacion basica
            if (!nombre || !email || !asunto || !mensaje) {
                showAlert('Por favor, completa todos los campos.', 'danger');
                return;
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Por favor, ingresa un email valido.', 'danger');
                return;
            }
            
            // Simular envio (aqui puedes integrar con un servicio real)
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
            submitBtn.disabled = true;
            
            // Simular delay de envio
            setTimeout(function() {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                form.reset();
                
                showAlert('Mensaje enviado correctamente. Te contactare pronto!', 'success');
            }, 2000);
        });
    }
}

/**
 * Mostrar alerta
 */
function showAlert(message, type) {
    // Remover alertas existentes
    const existingAlerts = document.querySelectorAll('.alert-floating');
    existingAlerts.forEach(function(alert) {
        alert.remove();
    });
    
    // Crear nueva alerta
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-floating position-fixed`;
    alert.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px; animation: slideInRight 0.3s ease;';
    alert.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi ${type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remover despues de 5 segundos
    setTimeout(function() {
        if (alert.parentElement) {
            alert.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(function() {
                alert.remove();
            }, 300);
        }
    }, 5000);
}

/**
 * ============================================
 * SMOOTH SCROLL - Navegacion suave
 * ============================================
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                event.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const navbarHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * ============================================
 * EFECTO TYPING (Opcional)
 * ============================================
 */
function initTypingEffect() {
    const element = document.querySelector('.typing-text');
    if (!element) return;
    
    const texts = ['Desarrollador Web', 'Full Stack Developer', 'UI/UX Enthusiast'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

/**
 * ============================================
 * AGREGAR ESTILOS DINAMICOS PARA ALERTAS
 * ============================================
 */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);
