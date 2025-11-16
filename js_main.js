/*
╔═══════════════════════════════════════════════════════════════════════════╗
║                    PORTFÓLIO ARTHUR MARQUES (theusXS8292)                 ║
║                    Desenvolvedor Full Stack | FATEC Araras                ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  Arquivo: main.js                                                         ║
║  Versão: 3.6 (FINAL - Mobile Universal)                                  ║
║  Data/Hora UTC: 2025-11-16 08:15:16                                       ║
║  Login: theusXS8292                                                       ║
║  Email: arthurdearaujomarques@gmail.com                                   ║
║                                                                           ║
║  ✅ Touch swipe habilitado para mobile                                    ║
║  ✅ Grid de projetos em 1 coluna (mobile)                                 ║
║  ✅ Animações otimizadas                                                  ║
║  ✅ Formulário mailto funcional                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
*/

// LOG DE INICIALIZAÇÃO
console.log('%c🚀 Portfólio Carregado | Arthur Marques (theusXS8292)', 'color: #00f7ff; font-size: 16px; font-weight: bold;');
console.log('%cData/Hora UTC: 2025-11-16 08:15:16', 'color: #39ff14; font-size: 12px;');
console.log('%cEmail: arthurdearaujomarques@gmail.com', 'color: #bf00ff; font-size: 12px;');
console.log('%cVersão: 3.6 (Mobile Universal)', 'color: #00f7ff; font-size: 12px;');

// VARIÁVEL GLOBAL: SWIPER
let swiper;

// PROTEÇÃO 1: TIMEOUT DE SEGURANÇA (2 SEGUNDOS)
setTimeout(() => {
    const loader = document.querySelector('.loader-wrapper');
    if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        console.warn('⚠️ Loader escondido por timeout (2s)');
    }
}, 2000);

// PROTEÇÃO 2: EXECUÇÃO IMEDIATA (IIFE)
(function immediateHide() {
    const loader = document.querySelector('.loader-wrapper');
    if (loader && document.readyState !== 'loading') {
        setTimeout(() => {
            loader.classList.add('hidden');
            console.log('✅ Loader escondido (execução imediata)');
        }, 800);
    }
})();

// EVENT LISTENER: DOM CONTENT LOADED
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Pronto');
    
    setTimeout(() => {
        const loader = document.querySelector('.loader-wrapper');
        if (loader) {
            loader.classList.add('hidden');
            console.log('✅ Loader escondido (DOMContentLoaded)');
        }
    }, 1200);

    try {
        initSwiper();
        initTypingEffect();
        initProgressBar();
        initStatsCounter();
        initScrollAnimations();
        initKeyboardShortcuts();
        console.log('✅ Todos os sistemas inicializados');
    } catch (error) {
        console.error('❌ Erro na inicialização:', error);
        const loader = document.querySelector('.loader-wrapper');
        if (loader) loader.classList.add('hidden');
    }
});

// FUNÇÃO: INIT SWIPER (CORRIGIDO - MOBILE UNIVERSAL)
function initSwiper() {
    if (typeof Swiper === 'undefined') {
        console.error('❌ Swiper não carregado. Verifique CDN ou conexão.');
        const loader = document.querySelector('.loader-wrapper');
        if (loader) loader.classList.add('hidden');
        return;
    }

    try {
        // Detecta dispositivo mobile
        const isMobile = window.innerWidth < 900;
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        console.log(`📱 Dispositivo: ${isMobile ? 'Mobile' : 'Desktop'}`);
        console.log(`👆 Touch: ${isTouchDevice ? 'Sim' : 'Não'}`);

        swiper = new Swiper('.portfolio-swiper', {
            effect: 'fade',
            fadeEffect: { crossFade: true },
            speed: 800,
            
            // CORREÇÃO: Touch em mobile, mousewheel em desktop
            allowTouchMove: isMobile || isTouchDevice,
            
            mousewheel: {
                enabled: !isMobile && !isTouchDevice,
                sensitivity: 1,
                releaseOnEdges: true,
            },
            
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            
            // Configurações de toque otimizadas
            touchRatio: 1,
            touchAngle: 45,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            
            on: {
                slideChange: function() {
                    updateActiveLink(this.activeIndex);
                    updateProgressBar(this.activeIndex);
                    triggerSlideAnimations(this.activeIndex);
                },
                init: function() {
                    updateActiveLink(0);
                    updateProgressBar(0);
                },
                // Listener de resize para alternar dinamicamente
                resize: function() {
                    const isMobileNow = window.innerWidth < 900;
                    const isTouchNow = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
                    
                    this.params.allowTouchMove = isMobileNow || isTouchNow;
                    this.params.mousewheel.enabled = !isMobileNow && !isTouchNow;
                    
                    console.log(`🔄 Resize: Touch ${this.params.allowTouchMove ? 'ON' : 'OFF'} | Mousewheel ${this.params.mousewheel.enabled ? 'ON' : 'OFF'}`);
                }
            }
        });

        console.log('✅ Swiper inicializado (Touch:', swiper.params.allowTouchMove, '| Mousewheel:', swiper.params.mousewheel.enabled, ')');
    } catch (error) {
        console.error('❌ Erro ao inicializar Swiper:', error);
    }
}

// FUNÇÃO: NAVIGATE TO
function navigateTo(index) {
    if (swiper) {
        swiper.slideTo(index, 800);
    } else {
        console.warn('⚠️ Swiper não inicializado');
    }
}

// FUNÇÃO: UPDATE ACTIVE LINK
function updateActiveLink(index) {
    const links = document.querySelectorAll('.nav-links li');
    links.forEach((link, i) => {
        if (i === index) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });
}

// FUNÇÃO: INIT PROGRESS BAR
function initProgressBar() {
    updateProgressBar(0);
}

// FUNÇÃO: UPDATE PROGRESS BAR
function updateProgressBar(activeIndex) {
    const totalSlides = document.querySelectorAll('.swiper-slide').length || 1;
    const progress = ((activeIndex + 1) / totalSlides) * 100;
    const progressFill = document.querySelector('.progress-fill');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
        progressFill.setAttribute('aria-valuenow', progress);
    }
}

// FUNÇÃO: INIT TYPING EFFECT
function initTypingEffect() {
    const typingElement = document.querySelector('.typing');
    if (!typingElement) {
        console.warn('⚠️ Elemento typing não encontrado');
        return;
    }

    const texts = [
        'Desenvolvedor Full Stack',
        'Estudante de Tecnologia',
        'Backend com Go/Golang',
        'Solucionador de Problemas',
        'Criador de Experiências'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } 
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
    console.log('✅ Efeito de digitação iniciado');
}

// FUNÇÃO: INIT STATS COUNTER
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

// FUNÇÃO: ANIMATE COUNTER
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// FUNÇÃO: INIT SCROLL ANIMATIONS (CORRIGIDO)
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    });

    // Project Cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // Skill Cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });

    // Contact Items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Experience Cards
    const expCards = document.querySelectorAll('.exp-card');
    expCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    console.log('✅ Animações de scroll inicializadas');
}

// FUNÇÃO: TRIGGER SLIDE ANIMATIONS
function triggerSlideAnimations(slideIndex) {
    if (slideIndex === 0) {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            if (stat.textContent === '0') {
                animateCounter(stat);
            }
        });
    }
}

// FUNÇÃO: SEND EMAIL (MAILTO)
function sendEmail(e) {
    e.preventDefault();
    
    console.log('📧 Preparando email via mailto... (theusXS8292)');
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // VALIDAÇÃO CLIENT-SIDE
    if (!name || name.length < 3) {
        showFormMessage('⚠️ Por favor, insira seu nome completo (mín. 3 caracteres).', 'error');
        document.getElementById('name').focus();
        return;
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        showFormMessage('⚠️ Por favor, insira um e-mail válido (ex: nome@dominio.com).', 'error');
        document.getElementById('email').focus();
        return;
    }
    
    if (!subject || subject.length < 3) {
        showFormMessage('⚠️ Por favor, insira um assunto (mín. 3 caracteres).', 'error');
        document.getElementById('subject').focus();
        return;
    }
    
    if (!message || message.length < 10) {
        showFormMessage('⚠️ A mensagem deve ter pelo menos 10 caracteres.', 'error');
        document.getElementById('message').focus();
        return;
    }
    
    // MONTA O CORPO DO EMAIL
    const timestamp = new Date().toLocaleString('pt-BR', { 
        timeZone: 'America/Sao_Paulo',
        dateStyle: 'full',
        timeStyle: 'short'
    });
    
    const emailBody = `
🚀 NOVA MENSAGEM DO PORTFÓLIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 NOME:
${name}

📧 EMAIL:
${email}

📋 ASSUNTO:
${subject}

💬 MENSAGEM:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Enviado via: Portfólio Arthur Marques (theusXS8292)
Data/Hora: ${timestamp}
UTC: 2025-11-16 08:15:16
    `.trim();
    
    // MONTA A URL MAILTO
    const mailtoLink = `mailto:arthurdearaujomarques@gmail.com?subject=${encodeURIComponent('🚀 ' + subject + ' - Portfólio theusXS8292')}&body=${encodeURIComponent(emailBody)}`;
    
    // FEEDBACK VISUAL
    showFormMessage('✅ Abrindo seu cliente de email... Aguarde!', 'success');
    
    console.log('✅ Mailto preparado');
    console.log('👤 Nome:', name);
    console.log('📧 Email:', email);
    console.log('📋 Assunto:', subject);
    console.log('📍 Destino: arthurdearaujomarques@gmail.com');
    
    // ABRE O CLIENTE DE EMAIL
    try {
        window.location.href = mailtoLink;
        
        setTimeout(() => {
            document.getElementById('contactForm').reset();
            showFormMessage('📧 Cliente de email aberto! Complete o envio por lá. Se não abriu, use WhatsApp.', 'success');
        }, 1500);
        
    } catch (error) {
        console.error('❌ Erro ao abrir mailto:', error);
        showFormMessage('❌ Não foi possível abrir o cliente de email. Tente via WhatsApp: (19) 98612-4243', 'error');
    }
}

// FUNÇÃO: SHOW FORM MESSAGE
function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    if (!messageDiv) return;
    
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Scroll suave até a mensagem em mobile
    if (window.innerWidth < 768) {
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Auto-hide após 7 segundos
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 7000);
}

// FUNÇÃO: INIT KEYBOARD SHORTCUTS
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navigateTo(0);
        }
        if (e.key >= '1' && e.key <= '4') {
            navigateTo(parseInt(e.key) - 1);
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            if (swiper) swiper.slidePrev();
        }
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            if (swiper) swiper.slideNext();
        }
    });

    console.log('✅ Atalhos de teclado habilitados (1-4, setas, ESC)');
}

// SMOOTH SCROLL PARA ÂNCORAS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// DETECÇÃO DE SCROLL NOS SLIDES
const swiperSlides = document.querySelectorAll('.swiper-slide');
swiperSlides.forEach(slide => {
    slide.addEventListener('scroll', function() {
        const scrollHint = slide.querySelector('.scroll-hint');
        if (scrollHint && this.scrollTop > 50) {
            scrollHint.style.opacity = '0';
        } else if (scrollHint) {
            scrollHint.style.opacity = '1';
        }
    });
});

// PERFORMANCE MONITORING
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Página carregada em ${pageLoadTime}ms`);
        
        if (performance.memory) {
            const memoryUsed = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
            console.log(`💾 Memória JS usada: ${memoryUsed} MB`);
        }
    }
});

// MOBILE RUNTIME TWEAKS (APLICADO AUTOMATICAMENTE)
(function mobileRuntimeTweaks() {
    function isMobileMode() {
        return document.documentElement.classList.contains('is-mobile') ||
               ('ontouchstart' in window) ||
               (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
               window.innerWidth <= 900;
    }

    function applyTweaks() {
        try {
            // 1) SWIPER: habilita touch e desabilita mousewheel
            if (typeof swiper !== 'undefined' && swiper) {
                swiper.params.allowTouchMove = true;
                if (swiper.params.mousewheel) swiper.params.mousewheel.enabled = false;
                swiper.update();
                console.log('📱 Swiper ajustado para mobile: touch ON, mousewheel OFF');
            }

            // 2) Força grid 1 coluna
            const grid = document.querySelector('.projects-grid');
            if (grid) {
                grid.style.display = 'grid';
                grid.style.gridTemplateColumns = '1fr';
                grid.style.gap = '1.2rem';
                grid.style.maxWidth = '100%';
                grid.style.margin = '0 auto';
            }

            // 3) Remove transform/opacity que possam esconder cards
            document.querySelectorAll('.project-card, .skill-card, .exp-card, .contact-item').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });

            // 4) Ajustes touch-action
            document.querySelectorAll('.swiper-slide, .projects-grid').forEach(el => {
                el.style.touchAction = 'pan-y';
            });

        } catch (err) {
            console.warn('mobileRuntimeTweaks error:', err);
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        if (isMobileMode()) setTimeout(applyTweaks, 120);
    });

    window.addEventListener('load', function() {
        if (isMobileMode()) setTimeout(applyTweaks, 300);
    });

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (isMobileMode()) applyTweaks();
        }, 200);
    });
})();

// CONSOLE ART: Logo ASCII
console.log(`
%c
 █████╗ ██████╗ ████████╗██╗  ██╗██╗   ██╗██████╗ 
██╔══██╗██╔══██╗╚══██╔══╝██║  ██║██║   ██║██╔══██╗
███████║██████╔╝   ██║   ███████║██║   ██║██████╔╝
██╔══██║██╔══██╗   ██║   ██╔══██║██║   ██║██╔══██╗
██║  ██║██║  ██║   ██║   ██║  ██║╚██████╔╝██║  ██║
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝
    
    Arthur Marques | theusXS8292
    Desenvolvedor Full Stack | FATEC Araras
    Login: theusXS8292
    Data/Hora UTC: 2025-11-16 08:15:16
    Email: arthurdearaujomarques@gmail.com
    
    ✅ Versão 3.6 - Mobile Universal
`, 'color: #00f7ff; font-family: monospace;');

// API DE DEBUG (PORTFOLIO API)
window.portfolioAPI = {
    version: '3.6',
    author: 'theusXS8292',
    email: 'arthurdearaujomarques@gmail.com',
    date: '2025-11-16 08:15:16',
    
    navigateTo,
    getSwiper: () => swiper,
    reloadAnimations: initScrollAnimations,
    hideLoader: () => document.querySelector('.loader-wrapper')?.classList.add('hidden'),
    
    stats: {
        slideCount: () => document.querySelectorAll('.swiper-slide').length,
        projectCount: () => document.querySelectorAll('.project-card').length,
        getCurrentSlide: () => swiper ? swiper.activeIndex : null,
        isTouchEnabled: () => swiper ? swiper.params.allowTouchMove : null,
        isMousewheelEnabled: () => swiper ? swiper.params.mousewheel.enabled : null
    },
    
    debug: {
        forceShowLoader: () => document.querySelector('.loader-wrapper')?.classList.remove('hidden'),
        resetCounters: () => document.querySelectorAll('.stat-number').forEach(s => s.textContent = '0'),
        testFormMessage: (msg, type) => showFormMessage(msg, type),
        testMailto: () => {
            console.log('🧪 Teste de mailto...');
            document.getElementById('name').value = 'Teste';
            document.getElementById('email').value = 'teste@exemplo.com';
            document.getElementById('subject').value = 'Teste de formulário';
            document.getElementById('message').value = 'Esta é uma mensagem de teste.';
            sendEmail({ preventDefault: () => {} });
        },
        checkOverflow: () => {
            const overflowElements = [];
            document.querySelectorAll('*').forEach(el => {
                if (el.scrollWidth > document.documentElement.clientWidth) {
                    overflowElements.push({
                        element: el,
                        scrollWidth: el.scrollWidth,
                        clientWidth: document.documentElement.clientWidth,
                        tag: el.tagName,
                        class: el.className
                    });
                }
            });
            if (overflowElements.length > 0) {
                console.warn('⚠️ Elementos com overflow detectados:', overflowElements);
            } else {
                console.log('✅ Nenhum overflow detectado');
            }
            return overflowElements;
        }
    }
};

console.log('💻 Digite "portfolioAPI" no console para ferramentas de debug');
console.log('📧 Formulário configurado com Mailto (sem servidor)');
console.log('📱 Mobile Universal ativado - detecta automaticamente celulares');

/*
╔═══════════════════════════════════════════════════════════════════════════╗
║                        FIM DO ARQUIVO main.js v3.6                        ║
║                                                                           ║
║  ✅ Touch swipe: automático em mobile                                     ║
║  ✅ Grid projetos: 1 coluna em celulares                                  ║
║  ✅ Sem overflow horizontal                                               ║
║  ✅ Cross-browser (Chrome, Firefox, Safari, Opera, Edge)                  ║
║                                                                           ║
║  Login: theusXS8292                                                       ║
║  Data/Hora UTC: 2025-11-16 08:15:16                                       ║
║  Email: arthurdearaujomarques@gmail.com                                   ║
╚═══════════════════════════════════════════════════════════════════════════╝
*/