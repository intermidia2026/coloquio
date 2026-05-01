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
                
                // CORREÇÃO DOS DOIS BOTÕES ACESOS:
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

/* ==========================================
   4. LÓGICA DO PLAYER DE ÁUDIO
   ========================================== */
const audio = document.getElementById('bgAudio');
if (audio) { // Só executa se o player existir nesta página
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

/* ==========================================
   5. LÓGICA DO SLIDESHOW DE FOTOS
   ========================================== */
const carrosselFotos = document.getElementById("carrossel-fotos");
if (carrosselFotos) { 
    let slideIndex = 1;
    let timer;

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
        showSlidesFotos(slideIndex += n);
    };

    function showSlidesFotos(n) {
        let slides = carrosselFotos.getElementsByClassName("slide");
        let textoCredito = document.getElementById("credito-galeria");
        
        if (slides.length === 0) return;
        
        if (n > slides.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = slides.length}
        
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        
        slides[slideIndex-1].style.display = "block";  
        
        if(textoCredito) {
            textoCredito.innerHTML = creditosFotos[slideIndex-1];
        }
        
        timer = setTimeout(function() {
            slideIndex++;
            showSlidesFotos(slideIndex);
        }, 10000); 
    }

    showSlidesFotos(slideIndex);
}

/* ==========================================
   6. LÓGICA DO SLIDESHOW DE VÍDEOS (MANUAL)
   ========================================== */
const carrosselVideos = document.getElementById("carrossel-videos");
if (carrosselVideos) {
    let slideIndexVideo = 1;

    const creditosVideos = [
      "",                             // Vídeo 1 (Sem crédito)
      "&copy; Alzira Agostini Haddad" // Vídeo 2 (YouTube)
    ];

    window.plusSlidesVideo = function(n) {
        pausarVideosAtivos(carrosselVideos);
        showSlidesVideos(slideIndexVideo += n);
    };

    function showSlidesVideos(n) {
        let slides = carrosselVideos.getElementsByClassName("slide");
        let textoCredito = document.getElementById("credito-galeria-videos");

        if (slides.length === 0) return;

        if (n > slides.length) {slideIndexVideo = 1}
        if (n < 1) {slideIndexVideo = slides.length}

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slideIndexVideo-1].style.display = "block";

        if(textoCredito) {
            textoCredito.innerHTML = creditosVideos[slideIndexVideo-1];
        }
    }

    // Função bônus: Pausa o vídeo anterior quando o usuário passa para o próximo slide
    function pausarVideosAtivos(container) {
        // Pausa os vídeos mp4 locais
        let videos = container.getElementsByTagName("video");
        for(let i = 0; i < videos.length; i++) {
            videos[i].pause();
        }
        // Pausa os vídeos do YouTube dando um "reload" leve no frame
        let iframes = container.getElementsByTagName("iframe");
        for(let i = 0; i < iframes.length; i++) {
            let iframeSrc = iframes[i].src;
            iframes[i].src = iframeSrc; 
        }
    }

    showSlidesVideos(slideIndexVideo);
}

// =========================================
// 7. FUNÇÃO PARA TROCAR AS ABAS DA PROGRAMAÇÃO
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
// 8. GOATCOUNTER (Analytics Minimalista e Privado)
// =========================================
const scriptGC = document.createElement('script');
scriptGC.dataset.goatcounter = 'https://intermidia2026.goatcounter.com/count';
scriptGC.async = true;
scriptGC.src = '//gc.zgo.at/count.js';
document.head.appendChild(scriptGC);
