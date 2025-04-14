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