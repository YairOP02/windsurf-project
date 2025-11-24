// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');
    const header = document.querySelector('.header');
    let lastScroll = 0;

    // Inicializar animaciones
    initAnimations();
    
    // Inicializar menú móvil
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Cerrar menú móvil al hacer clic en un enlace
    navItems.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Efecto de cambio de color del header al hacer scroll
    window.addEventListener('scroll', handleScroll);

    // Inicializar GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Configurar animaciones con GSAP
    setupAnimations();

    // Función para alternar el menú móvil
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    // Función para cerrar el menú móvil
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Función para manejar el scroll
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Mostrar/ocultar header al hacer scroll
        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll hacia abajo
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll hacia arriba
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        }
        
        lastScroll = currentScroll;
    }

    // Función para inicializar animaciones
    function initAnimations() {
        // Animación de aparición de elementos con la clase .animate-fade-in
        const fadeElements = document.querySelectorAll('.animate-fade-in');
        fadeElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2}s`;
        });

        // Animación de botones con la clase .animate-slide-up
        const slideUpElements = document.querySelectorAll('.animate-slide-up');
        slideUpElements.forEach((el, index) => {
            el.style.animationDelay = `${0.5 + (index * 0.1)}s`;
        });
    }

    // Función para configurar animaciones con GSAP
    function setupAnimations() {
        // Animación de elementos al hacer scroll
        gsap.utils.toArray('.fade-up, .fade-left, .fade-right').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power2.out',
                immediateRender: false
            });
        });

    // Hacer clicable toda la tarjeta de especie usando el enlace interno
    const specieCards = document.querySelectorAll('.especie-card');
    specieCards.forEach(card => {
        const link = card.querySelector('a[href]');
        if (!link) return;

        card.style.cursor = 'pointer';

        card.addEventListener('click', (e) => {
            // Si el usuario hizo clic directamente en un enlace dentro de la tarjeta, respetar su comportamiento por defecto
            if (e.target.closest('a')) return;

            window.location.href = link.href;
        });
    });

        // Animación para tarjetas de especies
        gsap.utils.toEach('.especie-card', (card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                delay: i * 0.06,
                ease: 'back.out(1.4)',
                immediateRender: false
            });
        });

        // Efecto parallax para el héroe
        const hero = document.querySelector('.hero');
        if (hero) {
            gsap.to(hero, {
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                y: '20%',
                ease: 'none'
            });
        }
    }

    // Navegación suave para enlaces internos del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            e.preventDefault();

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navegación suave para botones "Ver detalles" de las tarjetas
    const detailButtons = document.querySelectorAll('.link-button[data-scroll]');
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-scroll');
            if (!targetId) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto hover para tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Inicializar tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', showTooltip);
        tooltip.addEventListener('mouseleave', hideTooltip);
    });

    function showTooltip(e) {
        const tooltipText = this.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${rect.left + (this.offsetWidth / 2) - (tooltip.offsetWidth / 2)}px`;
        
        this.tooltipElement = tooltip;
    }

    function hideTooltip() {
        if (this.tooltipElement) {
            this.tooltipElement.remove();
            this.tooltipElement = null;
        }
    }
});

// Función para cargar más especies (paginación)
function cargarMasEspecies() {
    // Implementar lógica para cargar más especies
    console.log('Cargando más especies...');
}

// Exportar funciones para uso global
window.cargarMasEspecies = cargarMasEspecies;
