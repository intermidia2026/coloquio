// ==========================================
// 1. CONTROLE DE IDIOMA
// ==========================================
function switchLang(lang, btn) {
    localStorage.setItem('lang', lang);

    // O SEGREDO ESTÁ AQUI: Atualiza a classe principal do body para o CSS voltar a funcionar!
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
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    // Agora vai funcionar porque a estrutura HTML estará livre da div!
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// ==========================================
// 3. CARREGAMENTO DE COMPONENTES
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            const menuPlaceholder = document.getElementById('menu-placeholder');
            if (menuPlaceholder) {
                // outerHTML "destrói" a div placeholder e coloca o menu solto no body, exatamente como o CSS gosta!
                menuPlaceholder.outerHTML = data;
                
                let savedLang = localStorage.getItem('lang') || 'pt'; 
                switchLang(savedLang, null);
                
                let btnPt = document.querySelector('.lang-toggle button:nth-child(1)');
                let btnEn = document.querySelector('.lang-toggle button:nth-child(2)');
                if (savedLang === 'pt' && btnPt) btnPt.classList.add('active');
                if (savedLang === 'en' && btnEn) btnEn.classList.add('active');
            }
        })
        .catch(error => console.error('Erro ao carregar o menu:', error));

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                // outerHTML no footer também para garantir o layout!
                footerPlaceholder.outerHTML = data;
            }
        })
        .catch(error => console.error('Erro ao carregar o footer:', error));
});
