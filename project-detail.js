// Interactive System Architecture

// Component Data
const componentData = {
    sensor: {
        icon: '<i class="fas fa-thermometer-half"></i>',
        title: 'DS18B20 Temperature Sensor',
        description: 'Sensor suhu digital waterproof dengan komunikasi 1-Wire. Digunakan untuk mengukur suhu motor DC secara real-time dengan akurasi tinggi.',
        specs: {
            'Tipe': 'Digital, Waterproof',
            'Protokol': '1-Wire Communication',
            'Range': '-55°C hingga +125°C',
            'Akurasi': '±0.5°C',
            'Sampling': 'Periodik (setiap detik)'
        }
    },
    esp32: {
        icon: '<i class="fas fa-microchip"></i>',
        title: 'ESP32 Microcontroller',
        description: 'Mikrokontroler dual-core dengan WiFi terintegrasi. Berperan sebagai edge device yang menjalankan inferensi machine learning secara lokal dan mengontrol sistem proteksi.',
        specs: {
            'Processor': 'Dual-core 32-bit Xtensa',
            'Clock Speed': 'Up to 240 MHz',
            'Memory': '520 KB SRAM',
            'Connectivity': 'WiFi 802.11 b/g/n',
            'ML Framework': 'Edge Impulse deployed model'
        }
    },
    mqtt: {
        icon: '<i class="fas fa-exchange-alt"></i>',
        title: 'MQTT Protocol',
        description: 'Protokol komunikasi ringan dengan arsitektur publish-subscribe. Memungkinkan transmisi data real-time dengan latensi rendah dan bandwidth efisien.',
        specs: {
            'Arsitektur': 'Publish-Subscribe',
            'QoS Level': 'QoS 0, 1, 2',
            'Payload': 'JSON format',
            'Topics': 'motor/temp, motor/status, motor/ml',
            'Broker': 'Cloud MQTT Broker'
        }
    },
    dashboard: {
        icon: '<i class="fas fa-mobile-alt"></i>',
        title: 'Mobile Dashboard',
        description: 'Interface monitoring berbasis mobile untuk memantau kondisi motor secara real-time. Menampilkan suhu, status ML, confidence level, dan status aktuator.',
        specs: {
            'Platform': 'Web-based (Responsive)',
            'Data Update': 'Real-time via MQTT',
            'Display': 'Temperature, ML Status, Alerts',
            'Controls': 'Remote monitoring only',
            'Accessibility': 'Any device with browser'
        }
    }
};

// Get DOM elements
const components = document.querySelectorAll('.arch-component.clickable');
const popup = document.getElementById('infoPopup');
const popupClose = document.getElementById('popupClose');
const popupIcon = document.getElementById('popupIcon');
const popupTitle = document.getElementById('popupTitle');
const popupDescription = document.getElementById('popupDescription');
const popupSpecs = document.getElementById('popupSpecs');

// Add click event to each component
components.forEach(component => {
    component.addEventListener('click', function() {
        const componentType = this.getAttribute('data-component');
        const data = componentData[componentType];
        
        if (data) {
            // Update popup content
            popupIcon.innerHTML = data.icon;
            popupTitle.textContent = data.title;
            popupDescription.textContent = data.description;
            
            // Build specs HTML
            let specsHTML = '';
            for (const [key, value] of Object.entries(data.specs)) {
                specsHTML += `
                    <div>
                        <strong>${key}:</strong>
                        <span>${value}</span>
                    </div>
                `;
            }
            popupSpecs.innerHTML = specsHTML;
            
            // Show popup
            popup.classList.add('active');
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close popup
function closePopup() {
    popup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

popupClose.addEventListener('click', closePopup);

// Close popup when clicking outside
popup.addEventListener('click', function(e) {
    if (e.target === popup) {
        closePopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
        closePopup();
    }
});

// Smooth scroll for anchor links
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

// Intersection Observer for fade-in animations
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

// Observe sections for animation
document.querySelectorAll('.project-visualization, .system-architecture, .tech-features, .research-impact, .paper-cta').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add hover sound effect (optional - disabled by default)
// Uncomment if you want to add sound feedback
/*
const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZWRILE5vV8sx8MQUiccnw2JA+ChVbsOro');

components.forEach(component => {
    component.addEventListener('mouseenter', () => {
        // hoverSound.play();
    });
});
*/

// Add component highlight on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    components.forEach(component => {
        const rect = component.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            component.style.animation = 'componentPulse 2s infinite';
        }
    });
});

// Add CSS animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes componentPulse {
        0%, 100% { border-color: rgba(0, 255, 255, 0.3); }
        50% { border-color: rgba(0, 255, 255, 0.8); }
    }
`;
document.head.appendChild(style);

// Console easter egg
console.log('%c🚀 IoT Digital Twin Prototype', 'color: #00ffff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ESP32 + Edge ML + MQTT', 'color: #b400ff; font-size: 14px;');
console.log('%cMuflikhul Hakim - UIN Malang', 'color: #a0a0b0; font-size: 12px;');
