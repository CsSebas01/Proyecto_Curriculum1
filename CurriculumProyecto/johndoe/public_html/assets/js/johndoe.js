//Autor: Sebastian Escobar

// Añadir al inicio del archivo, después del comentario del autor

// Animaciones del header
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const headerContent = document.querySelector('.header-content');
    
    // Reiniciar animaciones cuando el header está visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reiniciar animaciones
                const animatedElements = headerContent.querySelectorAll(
                    '.animate-typing, .animate-slide-up, .animate-fade-in'
                );
                
                animatedElements.forEach(el => {
                    el.style.animation = 'none';
                    el.offsetHeight; // Trigger reflow
                    el.style.animation = '';
                });
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(header);
});



// Scroll suave mejorado
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            const offset = $(hash).offset().top;

            $('html, body').animate({
                scrollTop: offset
            }, {
                duration: 800,
                easing: 'easeInOutQuad',
                complete: function() {
                    window.location.hash = hash;
                }
            });
        } 
    });
});

// Portfolio carrusel y flip cards
document.addEventListener('DOMContentLoaded', function(){
    const carousel = document.querySelector('.portfolio-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const inner = track.querySelector('.carousel-track-inner');
    const slides = Array.from(inner.querySelectorAll('.carousel-slide'));
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsWrap = carousel.querySelector('.carousel-indicators');
    let index = 0;

    function createIndicators() {
        if (!dotsWrap) return;
        dotsWrap.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'dot' + (i === index ? ' active' : '');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.addEventListener('click', () => {
                index = i;
                updateCarousel();
            });
            dotsWrap.appendChild(dot);
        });
    }

    function updateCarousel() {
        const offset = -index * 100;
        inner.style.transform = `translateX(${offset}%)`;
        
        // Actualizar dots
        if (dotsWrap) {
            Array.from(dotsWrap.children).forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        // Actualizar botones
        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.disabled = index === slides.length - 1;
    }

    // Navegación
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (index > 0) {
                index--;
                updateCarousel();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (index < slides.length - 1) {
                index++;
                updateCarousel();
            }
        });
    }

    // Flip cards con delegación de eventos
    carousel.addEventListener('click', function(ev) {
        const card = ev.target.closest('.flip-card-inner');
        if (!card) return;
        // Ignorar clicks en controles
        if (ev.target.closest('.carousel-prev, .carousel-next, .carousel-indicators')) return;
        card.classList.toggle('flipped');
    });

    // Soporte para teclado
    carousel.addEventListener('keydown', function(ev) {
        if (ev.key === 'ArrowLeft' && prevBtn) prevBtn.click();
        if (ev.key === 'ArrowRight' && nextBtn) nextBtn.click();
        if (ev.key === 'Enter' || ev.key === ' ') {
            const card = ev.target.closest('.flip-card-inner');
            if (card) {
                ev.preventDefault();
                card.classList.toggle('flipped');
            }
        }
    });

    // Inicialización
    createIndicators();
    updateCarousel();

    // Respuesta a resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateCarousel, 100);
    });
});

// Portfolio filtros (mantener compatibilidad con isotope si existe)
$(window).on("load", function() {
    const portfolio = $(".portfolio-container");
    if (portfolio.length && typeof portfolio.isotope === 'function') {
        portfolio.isotope({
            filter: ".new",
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: false
            }
        });

        $(".filters a").click(function(e) {
            e.preventDefault();
            $(".filters .active").removeClass("active");
            $(this).addClass("active");
            
            const filterValue = $(this).attr("data-filter");
            portfolio.isotope({
                filter: filterValue,
                animationOptions: {
                    duration: 750,
                    easing: "linear",
                    queue: false
                }
            });
            return false;
        });
    }
});

