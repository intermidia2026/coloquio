// ==========================================
// 1. CONTROLE DE IDIOMA
// ==========================================
function switchLang(lang, btn) {
    localStorage.setItem('lang', lang);

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
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    // Só tenta abrir/fechar se os elementos existirem na página
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// ==========================================
// 3. CARREGAMENTO DE COMPONENTES (MENU E FOOTER)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    
    // Carrega o Menu
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            const menuPlaceholder = document.getElementById('menu-placeholder');
            if (menuPlaceholder) {
                menuPlaceholder.innerHTML = data;
                
                // Aplica o idioma salvo assim que o menu carregar
                let savedLang = localStorage.getItem('lang') || 'pt'; 
                switchLang(savedLang, null);
                
                // Acerta os botões de idioma do menu
                let btnPt = document.querySelector('.lang-toggle button:nth-child(1)');
                let btnEn = document.querySelector('.lang-toggle button:nth-child(2)');
                if (savedLang === 'pt' && btnPt) btnPt.classList.add('active');
                if (savedLang === 'en' && btnEn) btnEn.classList.add('active');
            }
        })
        .catch(error => console.error('Erro ao carregar o menu:', error));

    // Carrega o Footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Erro ao carregar o footer:', error));
});
