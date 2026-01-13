// PDF Viewer Controls

// Get DOM elements
const pdfFrame = document.getElementById('pdfFrame');
const pdfLoading = document.querySelector('.pdf-loading');
const pdfFallback = document.querySelector('.pdf-fallback');
const downloadBtn = document.getElementById('downloadBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const copyCitationBtn = document.getElementById('copyCitationBtn');
const citationText = document.getElementById('citationText');

// Check if PDF loaded successfully
pdfFrame.addEventListener('load', function() {
    pdfLoading.style.display = 'none';
    pdfFrame.style.display = 'block';
});

// Fallback for browsers that don't support iframe PDF
pdfFrame.addEventListener('error', function() {
    pdfLoading.style.display = 'none';
    pdfFallback.style.display = 'block';
});

// Timeout fallback (if PDF doesn't load in 5 seconds)
setTimeout(() => {
    if (pdfFrame.style.display === 'none') {
        pdfLoading.style.display = 'none';
        pdfFallback.style.display = 'block';
    }
}, 5000);

// Download Button
downloadBtn.addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = 'paper.pdf';
    link.download = 'Muflikhul_Hakim_IoT_Digital_Twin_Paper.pdf';
    link.click();
    
    // Visual feedback
    const originalHTML = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-check"></i> <span>Downloaded!</span>';
    downloadBtn.style.background = 'rgba(0, 255, 136, 0.2)';
    downloadBtn.style.borderColor = '#00ff88';
    
    setTimeout(() => {
        downloadBtn.innerHTML = originalHTML;
        downloadBtn.style.background = '';
        downloadBtn.style.borderColor = '';
    }, 2000);
});

// Fullscreen Button
fullscreenBtn.addEventListener('click', function() {
    if (!document.fullscreenElement) {
        if (pdfFrame.requestFullscreen) {
            pdfFrame.requestFullscreen();
        } else if (pdfFrame.webkitRequestFullscreen) {
            pdfFrame.webkitRequestFullscreen();
        } else if (pdfFrame.msRequestFullscreen) {
            pdfFrame.msRequestFullscreen();
        }
        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i> <span>Exit Fullscreen</span>';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> <span>Fullscreen</span>';
    }
});

// Listen for fullscreen changes
document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> <span>Fullscreen</span>';
    }
});

// Copy Citation
copyCitationBtn.addEventListener('click', function() {
    const citation = citationText.textContent;
    
    // Copy to clipboard
    navigator.clipboard.writeText(citation).then(() => {
        // Visual feedback
        const originalHTML = copyCitationBtn.innerHTML;
        copyCitationBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyCitationBtn.classList.add('copied');
        
        setTimeout(() => {
            copyCitationBtn.innerHTML = originalHTML;
            copyCitationBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy citation:', err);
        alert('Failed to copy citation. Please try again.');
    });
});

// PDF Controls (Zoom, Navigation)
// Note: These controls work best with PDF.js library
// For basic iframe, we'll provide alternative controls

let currentZoom = 100;
const zoomStep = 10;
const minZoom = 50;
const maxZoom = 200;

const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const zoomLevel = document.getElementById('zoomLevel');
const fitWidthBtn = document.getElementById('fitWidthBtn');
const fitPageBtn = document.getElementById('fitPageBtn');

// Zoom In
zoomInBtn.addEventListener('click', function() {
    if (currentZoom < maxZoom) {
        currentZoom += zoomStep;
        applyZoom();
    }
});

// Zoom Out
zoomOutBtn.addEventListener('click', function() {
    if (currentZoom > minZoom) {
        currentZoom -= zoomStep;
        applyZoom();
    }
});

// Apply Zoom
function applyZoom() {
    pdfFrame.style.transform = `scale(${currentZoom / 100})`;
    pdfFrame.style.transformOrigin = 'top center';
    zoomLevel.textContent = `${currentZoom}%`;
    
    // Adjust container height
    const pdfContainer = document.getElementById('pdfContainer');
    pdfContainer.style.height = `${1000 * (currentZoom / 100)}px`;
    pdfContainer.style.overflow = 'auto';
}

// Fit Width
fitWidthBtn.addEventListener('click', function() {
    const containerWidth = document.getElementById('pdfContainer').offsetWidth;
    const frameWidth = 850; // Approximate PDF width
    currentZoom = Math.floor((containerWidth / frameWidth) * 100);
    applyZoom();
});

// Fit Page
fitPageBtn.addEventListener('click', function() {
    currentZoom = 100;
    applyZoom();
    pdfFrame.style.transform = '';
});

// Page Navigation (Basic - for display only)
// Note: Actual page navigation requires PDF.js
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const currentPage = document.getElementById('currentPage');
const totalPages = document.getElementById('totalPages');

// Simulate page count (update this with actual page count)
const estimatedPages = 15; // Update berdasarkan jumlah halaman paper kamu
totalPages.textContent = estimatedPages;

// Disable navigation for iframe (can be enabled with PDF.js)
prevPageBtn.disabled = true;
nextPageBtn.disabled = true;

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.paper-header, .pdf-viewer-section, .citation-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + D = Download
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        downloadBtn.click();
    }
    
    // F = Fullscreen
    if (e.key === 'f' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        fullscreenBtn.click();
    }
    
    // + = Zoom In
    if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        zoomInBtn.click();
    }
    
    // - = Zoom Out
    if (e.key === '-') {
        e.preventDefault();
        zoomOutBtn.click();
    }
    
    // 0 = Reset Zoom
    if (e.key === '0') {
        e.preventDefault();
        fitPageBtn.click();
    }
});

// Console message
console.log('%c📄 Research Paper Viewer', 'color: #00ffff; font-size: 20px; font-weight: bold;');
console.log('%cKeyboard Shortcuts:', 'color: #b400ff; font-size: 14px;');
console.log('Ctrl+D or Cmd+D: Download PDF');
console.log('F: Toggle Fullscreen');
console.log('+: Zoom In');
console.log('-: Zoom Out');
console.log('0: Reset Zoom');
