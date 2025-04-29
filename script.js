// Animação de rolagem suave para links de navegação
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Ajuste para o cabeçalho fixo
                behavior: 'smooth'
            });
        });
    });

    // Animação das barras de progresso de habilidades
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
    
    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar o código para processar o formulário
            // Por exemplo, enviando os dados para um servidor
            const formData = {
                name: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                message: document.getElementById('mensagem').value
            };
            
            console.log('Dados do formulário:', formData);
            
            // Exemplo de feedback para o usuário
            alert('Obrigado pelo contato! Sua mensagem foi enviada com sucesso.');
            contactForm.reset();
        });
    }
    
    // Adicionar classe ativa ao menu de navegação com base na seção visível
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
    
    // Inicialização
    animateSkills();
    setActiveNavLink();
    
    // Botão de download do currículo
    const downloadBtn = document.getElementById('downloadCV');
    const contactSection = document.getElementById('contato');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Não interrompe o download, mas adiciona o efeito de ocultar o contato
            setTimeout(() => {
                // Anima a seção de contato para desaparecer
                contactSection.style.opacity = '0';
                contactSection.style.height = '0';
                contactSection.style.overflow = 'hidden';
                contactSection.style.padding = '0';
                contactSection.style.margin = '0';
                contactSection.style.transition = 'all 0.5s ease';
                
                // Para garantir que o usuário veja a mensagem, rolamos até o botão
                setTimeout(() => {
                    window.scrollTo({
                        top: downloadBtn.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Mostra mensagem de agradecimento
                    const downloadSection = document.querySelector('.download-cv');
                    const thankMessage = document.createElement('div');
                    thankMessage.className = 'thank-message';
                    thankMessage.innerHTML = '<p>Obrigado pelo interesse! Seu download foi iniciado.</p>';
                    
                    // Adiciona a mensagem após o botão
                    downloadSection.querySelector('.container').appendChild(thankMessage);
                }, 300);
            }, 100);
        });
    }
    
    // Seletor de idiomas
    const langPT = document.getElementById('lang-pt');
    const langEN = document.getElementById('lang-en');
    let currentLanguage = 'pt'; // Idioma padrão
    
    // Inicializar verificando se há idioma salvo
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        updateLanguage(currentLanguage);
        updateActiveLanguageButton(currentLanguage);
    }
    
    // Botões de idioma
    if (langPT && langEN) {
        langPT.addEventListener('click', function() {
            if (currentLanguage !== 'pt') {
                currentLanguage = 'pt';
                updateLanguage('pt');
                updateActiveLanguageButton('pt');
                localStorage.setItem('language', 'pt');
            }
        });
        
        langEN.addEventListener('click', function() {
            if (currentLanguage !== 'en') {
                currentLanguage = 'en';
                updateLanguage('en');
                updateActiveLanguageButton('en');
                localStorage.setItem('language', 'en');
            }
        });
    }
    
    // Atualiza os botões ativos
    function updateActiveLanguageButton(lang) {
        if (lang === 'pt') {
            langPT.classList.add('active');
            langEN.classList.remove('active');
        } else {
            langEN.classList.add('active');
            langPT.classList.remove('active');
        }
    }
    
    // Atualiza o texto do site para o idioma selecionado
    function updateLanguage(lang) {
        // Navegação
        document.querySelector('nav ul li:nth-child(1) a').textContent = translations[lang]['nav-sobre'];
        document.querySelector('nav ul li:nth-child(2) a').textContent = translations[lang]['nav-experiencias'];
        document.querySelector('nav ul li:nth-child(3) a').textContent = translations[lang]['nav-habilidades'];
        document.querySelector('nav ul li:nth-child(4) a').textContent = translations[lang]['nav-projetos'];
        document.querySelector('nav ul li:nth-child(5) a').textContent = translations[lang]['nav-formacao'];
        document.querySelector('nav ul li:nth-child(6) a').textContent = translations[lang]['nav-contato'];
        
        // Títulos de seções
        document.querySelector('#sobre h2').textContent = translations[lang]['titulo-sobre'];
        document.querySelector('#experiencias h2').textContent = translations[lang]['titulo-experiencias'];
        document.querySelector('#habilidades h2').textContent = translations[lang]['titulo-habilidades'];
        document.querySelector('#projetos h2').textContent = translations[lang]['titulo-projetos'];
        document.querySelector('#formacao h2').textContent = translations[lang]['titulo-formacao'];
        document.querySelector('#contato h2').textContent = translations[lang]['titulo-contato'];
        
        // Seção Sobre
        const sobreTexts = document.querySelectorAll('.profile-text p');
        sobreTexts[0].textContent = translations[lang]['sobre-p1'];
        sobreTexts[1].textContent = translations[lang]['sobre-p2'];
        
        // Seção Experiências
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Experiência 1
        timelineItems[0].querySelector('h3').textContent = translations[lang]['exp1-cargo'];
        timelineItems[0].querySelector('.timeline-company').textContent = translations[lang]['exp1-empresa'];
        timelineItems[0].querySelector('.timeline-date').textContent = translations[lang]['exp1-periodo'];
        timelineItems[0].querySelector('p:not(.timeline-company):not(.timeline-date)').textContent = translations[lang]['exp1-desc'];
        
        // Experiência 2
        timelineItems[1].querySelector('h3').textContent = translations[lang]['exp2-cargo'];
        timelineItems[1].querySelector('.timeline-company').textContent = translations[lang]['exp2-empresa'];
        timelineItems[1].querySelector('.timeline-date').textContent = translations[lang]['exp2-periodo'];
        timelineItems[1].querySelector('p:not(.timeline-company):not(.timeline-date)').textContent = translations[lang]['exp2-desc'];
        
        // Experiência 3
        timelineItems[2].querySelector('h3').textContent = translations[lang]['exp3-cargo'];
        timelineItems[2].querySelector('.timeline-company').textContent = translations[lang]['exp3-empresa'];
        timelineItems[2].querySelector('.timeline-date').textContent = translations[lang]['exp3-periodo'];
        timelineItems[2].querySelector('p:not(.timeline-company):not(.timeline-date)').textContent = translations[lang]['exp3-desc'];
        
        // Experiência 4
        timelineItems[3].querySelector('h3').textContent = translations[lang]['exp4-cargo'];
        timelineItems[3].querySelector('.timeline-company').textContent = translations[lang]['exp4-empresa'];
        timelineItems[3].querySelector('.timeline-date').textContent = translations[lang]['exp4-periodo'];
        timelineItems[3].querySelector('p:not(.timeline-company):not(.timeline-date)').textContent = translations[lang]['exp4-desc'];
        
        // Seção Habilidades
        const skillCategories = document.querySelectorAll('.skill-category h3');
        skillCategories[0].textContent = translations[lang]['hab-linguagens'];
        skillCategories[1].textContent = translations[lang]['hab-frameworks'];
        skillCategories[2].textContent = translations[lang]['hab-ferramentas'];
        
        // Seção Projetos
        const projectCards = document.querySelectorAll('.project-card');
        
        // Projeto 1
        projectCards[0].querySelector('h3').textContent = translations[lang]['proj1-titulo'];
        projectCards[0].querySelector('p').textContent = translations[lang]['proj1-desc'];
        
        // Projeto 2
        projectCards[1].querySelector('h3').textContent = translations[lang]['proj2-titulo'];
        projectCards[1].querySelector('p').textContent = translations[lang]['proj2-desc'];
        
        // Projeto 3
        projectCards[2].querySelector('h3').textContent = translations[lang]['proj3-titulo'];
        projectCards[2].querySelector('p').textContent = translations[lang]['proj3-desc'];
        
        // Links de projetos
        document.querySelectorAll('.project-link').forEach(link => {
            link.innerHTML = translations[lang]['ver-projeto'] + ' <i class="fas fa-arrow-right"></i>';
        });
        
        document.querySelector('.github-link a').innerHTML = 
            '<i class="fab fa-github"></i> ' + translations[lang]['mais-projetos'];
        
        // Seção Formação
        const formacaoItem = document.querySelector('#formacao .timeline-item');
        formacaoItem.querySelector('p:not(.timeline-date)').textContent = translations[lang]['formacao-curso'];
        formacaoItem.querySelector('h3').textContent = translations[lang]['formacao-instituicao'];
        formacaoItem.querySelector('.timeline-date').textContent = translations[lang]['formacao-periodo'];
        
        // Download CV
        document.querySelector('.download-info h3').textContent = translations[lang]['download-titulo'];
        document.querySelector('.download-info p').textContent = translations[lang]['download-desc'];
        document.querySelector('#downloadCV').innerHTML = 
            '<i class="fas fa-file-download"></i> ' + translations[lang]['download-btn'];
        
        // Seção Contato
        document.querySelector('.contact-form h3').textContent = translations[lang]['contato-msg-titulo'];
        document.querySelector('#nome').placeholder = translations[lang]['contato-nome'];
        document.querySelector('#email').placeholder = translations[lang]['contato-email'];
        document.querySelector('#mensagem').placeholder = translations[lang]['contato-mensagem'];
        document.querySelector('.btn-submit').textContent = translations[lang]['contato-enviar'];
        
        // Rodapé
        document.querySelector('footer p').textContent = translations[lang]['rodape-direitos'];
        
        // Também atualizar mensagens que podem ser adicionadas dinamicamente
        const thankMessage = document.querySelector('.thank-message p');
        if (thankMessage) {
            thankMessage.textContent = translations[lang]['download-obrigado'];
        }
    }
});

// Tema claro/escuro (para implementação futura)
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    // Salvar preferência do usuário em localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
}

// Verificar preferência salva do usuário
const savedDarkMode = localStorage.getItem('dark-mode');
if (savedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
}