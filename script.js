document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    const animateSkills = () => {
        const skillsSection = document.getElementById('habilidades');
        const progressBars = document.querySelectorAll('.progress');
        
        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(sectionPosition < screenPosition) {
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            window.removeEventListener('scroll', animateSkills);
        }
    };
    
    window.addEventListener('scroll', animateSkills);

    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                message: document.getElementById('mensagem').value
            };
            
            alert('Obrigado pelo contato! Sua mensagem foi enviada com sucesso.');
            contactForm.reset();
        });
    }
    
    const sections = document.querySelectorAll('.section');
    
    function setActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    animateSkills();
    setActiveNavLink();
    
    const downloadBtn = document.getElementById('downloadCV');
    const contactSection = document.getElementById('contato');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            setTimeout(() => {
                contactSection.style.opacity = '0';
                contactSection.style.height = '0';
                contactSection.style.overflow = 'hidden';
                contactSection.style.padding = '0';
                contactSection.style.margin = '0';
                contactSection.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    window.scrollTo({
                        top: downloadBtn.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    const downloadSection = document.querySelector('.download-cv');
                    const thankMessage = document.createElement('div');
                    thankMessage.className = 'thank-message';
                    thankMessage.innerHTML = '<p>Obrigado pelo interesse! Seu download foi iniciado.</p>';
                    
                    downloadSection.querySelector('.container').appendChild(thankMessage);
                }, 300);
            }, 100);
        });
    }
  
    const langPT = document.getElementById('lang-pt');
    const langEN = document.getElementById('lang-en');
    
    setTimeout(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            updateActiveLanguageButton(savedLanguage);
        } else {
            updateActiveLanguageButton('pt');
        }
    }, 150);
    
    if (langPT && langEN) {
        langPT.addEventListener('click', function() {
            if (getCurrentLanguage() !== 'pt') {
                translate('pt');
                updateActiveLanguageButton('pt');
            }
        });
        
        langEN.addEventListener('click', function() {
            if (getCurrentLanguage() !== 'en') {
                translate('en');
                updateActiveLanguageButton('en');
            }
        });
    }
    
    function updateActiveLanguageButton(lang) {
        if (lang === 'pt') {
            langPT.classList.add('active');
            langEN.classList.remove('active');
        } else {
            langEN.classList.add('active');
            langPT.classList.remove('active');
        }
    }
});

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
}

const savedDarkMode = localStorage.getItem('dark-mode');
if (savedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
}