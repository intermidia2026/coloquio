// ==========================================
// 1. CONTROLE DE IDIOMA
// ==========================================
function switchLang(lang, btn) {
    localStorage.setItem('lang', lang);
    document.body.className = 'lang-' + lang;

    let elementosPT = document.querySelectorAll('.pt');
    let elementosEN = document.querySelectorAll('.en');

    if (lang === 'pt') {
        elementosEN.forEach(el => el.style.display = 'none');
        elementosPT.forEach(el => el.style.display = ''); 
    } else {
        elementosPT.forEach(el => el.style.display = 'none');
        elementosEN.forEach(el => el.style.display = ''); 
    }

    if (btn) {
        document.querySelectorAll('.lang-toggle button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

// ==========================================
// 2. CONTROLE DO MENU LATERAL
// ==========================================

window.toggleMenu = function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    } else {
        console.error("Erro: Sidebar ou Overlay não foram encontrados na página!");
    }
};

// ==========================================
// 3. CARREGAMENTO DE COMPONENTES
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    
    // Carrega o Menu
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            const menuPlaceholder = document.getElementById('menu-placeholder');
            if (menuPlaceholder) {
                // Método mais seguro para injetar o HTML sem quebrar as referências
                menuPlaceholder.insertAdjacentHTML('afterend', data);
                menuPlaceholder.remove(); // Remove a div vazia
                
                let savedLang = localStorage.getItem('lang') || 'pt'; 
                switchLang(savedLang, null);
                
                // CORREÇÃO DOS DOIS BOTÕES ACESOS:
                let btnPt = document.querySelector('.lang-toggle button:nth-child(1)');
                let btnEn = document.querySelector('.lang-toggle button:nth-child(2)');
                
                if (btnPt && btnEn) {
                    btnPt.classList.remove('active'); // Apaga a luz de todos primeiro
                    btnEn.classList.remove('active');
                    // Acende só o correto
                    if (savedLang === 'pt') btnPt.classList.add('active');
                    if (savedLang === 'en') btnEn.classList.add('active');
                }
            }
        })
        .catch(error => console.error('Erro ao carregar o menu:', error));

    // Carrega o Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.insertAdjacentHTML('afterend', data);
                footerPlaceholder.remove();
            }
        })
        .catch(error => console.error('Erro ao carregar o footer:', error));
});
