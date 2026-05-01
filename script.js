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
                menuPlaceholder.insertAdjacentHTML('afterend', data);
                menuPlaceholder.remove();
                
                let savedLang = localStorage.getItem('lang') || 'pt'; 
                switchLang(savedLang, null);
                
                let btnPt = document.querySelector('.lang-toggle button:nth-child(1)');
                let btnEn = document.querySelector('.lang-toggle button:nth-child(2)');
                
                if (btnPt && btnEn) {
                    btnPt.classList.remove('active'); 
                    btnEn.classList.remove('active');
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

// ==========================================
// 4. LÓGICA DO PLAYER DE ÁUDIO
// ==========================================
const audio = document.getElementById('bgAudio');
if (audio) { 
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const timeDisplay = document.getElementById('timeDisplay');

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        let minutes = Math.floor(seconds / 60);
        let secs = Math.floor(seconds % 60);
        if (secs < 10) secs = '0' + secs;
        return minutes + ':' + secs;
    }

    audio.addEventListener('loadedmetadata', () => {
        timeDisplay.innerText = `0:00 / ${formatTime(audio.duration)}`;
    });

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerText = '❚❚'; 
        } else {
            audio.pause();
            playPauseBtn.innerText = '▶'; 
        }
    });

    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percent}%`;
        timeDisplay.innerText = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    });

    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth; 
        const clickX = e.offsetX; 
        const duration = audio.duration; 
        audio.currentTime = (clickX / width) * duration;
    });

    audio.addEventListener('ended', () => {
        playPauseBtn.innerText = '▶';
        progressBar.style.width = '0%';
    });
}

// ==========================================
// 5. LÓGICA DO SLIDESHOW COM CRÉDITO DINÂMICO
// ==========================================
const slideshowContainers = document.getElementsByClassName("slideshow-container");
if (slideshowContainers.length > 0) { 
    let slideIndex = 1;
    let timer;

    // Array com os nomes dos autores na ordem exata das fotos
    const creditosFotos = [
      "&copy; Kátia Lombardi",    // Foto 1
      "&copy; Kátia Lombardi",    // Foto 2
      "&copy; Kátia Lombardi",    // Foto 3
      "&copy; Kátia Lombardi",    // Foto 4
      "&copy; Kátia Lombardi",    // Foto 5
      "&copy; Kátia Lombardi",    // Foto 6
      "&copy; Kátia Lombardi",    // Foto 7
      "&copy; Kátia Lombardi",    // Foto 8
      "&copy; Kátia Lombardi",    // Foto 9
      "&copy; Kátia Lombardi",    // Foto 10
      "&copy; Nydia Negromonte",  // Foto 11
      "&copy; Nydia Negromonte",  // Foto 12
      "&copy; Nydia Negromonte"   // Foto 13
    ];

    window.plusSlides = function(n) {
        clearTimeout(timer); 
        showSlides(slideIndex += n);
    };

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("slide");
        let textoCredito = document.getElementById("credito-galeria");
        
        if (slides.length === 0) return;
        
        if (n > slides.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = slides.length}
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        
        slides[slideIndex-1].style.display = "block";  
        
        // Atualiza o texto do crédito
        if(textoCredito) {
            textoCredito.innerHTML = creditosFotos[slideIndex-1];
        }
        
        // Timer para passar automaticamente a cada 10 segundos
        timer = setTimeout(function() {
            slideIndex++;
            showSlides(slideIndex);
        }, 10000); 
    }

    // Inicia o slideshow
    showSlides(slideIndex);
}

// =========================================
// 6. FUNÇÃO PARA TROCAR AS ABAS DA PROGRAMAÇÃO
// =========================================
window.abrirDia = function(evt, idDoDia) {
    let conteudos = document.getElementsByClassName("tab-content");
    for (let i = 0; i < conteudos.length; i++) { 
        conteudos[i].classList.remove("active"); 
    }
    
    let botoes = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < botoes.length; i++) { 
        botoes[i].classList.remove("active"); 
    }
    
    document.getElementById(idDoDia).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// =========================================
// 7. GOATCOUNTER (Analytics Minimalista e Privado)
// =========================================
const scriptGC = document.createElement('script');
scriptGC.dataset.goatcounter = 'https://intermidia2026.goatcounter.com/count';
scriptGC.async = true;
scriptGC.src = '//gc.zgo.at/count.js';
document.head.appendChild(scriptGC);
