// VARIABEL GLOBAL
const tombolMenu = document.getElementById('tombolMenu');
const menuSamping = document.getElementById('menuSamping');
const kontenUtama = document.getElementById('kontenUtama');
const videoBackground = document.getElementById('videoBackground');
const header = document.getElementById('header');
const tombolBackToTop = document.getElementById('tombolBackToTop');
const teksMengetik = document.getElementById('teksMengetik');
const allNavLinks = document.querySelectorAll('.daftar-menu a');
const subMenuAbout = document.getElementById('submenu-about');
const itemMenuSub = document.querySelector('.item-menu-sub');

// Teks yang akan diketik
const teksUntukDiketik = [
    "Seorang Desainer UI/UX",
    "Seorang Pengembang Web", 
    "Seorang Data Scientist"
];
let indeksTeks = 0;
let indeksKarakter = 0;
let isMenghapus = false;

// FUNGSI TYPING ANIMATION
function ketikTeks() {
    if (!teksMengetik) return;
    
    const teksSekarang = teksUntukDiketik[indeksTeks];
    const karakterSekarang = teksSekarang.substring(0, indeksKarakter);
    teksMengetik.textContent = karakterSekarang;

    if (!isMenghapus) {
        indeksKarakter++;
        if (indeksKarakter > teksSekarang.length) {
            isMenghapus = true;
            setTimeout(ketikTeks, 2000);
        } else {
            setTimeout(ketikTeks, 100);
        }
    } else {
        indeksKarakter--;
        if (indeksKarakter < 0) {
            isMenghapus = false;
            indeksTeks = (indeksTeks + 1) % teksUntukDiketik.length;
            setTimeout(ketikTeks, 500);
        } else {
            setTimeout(ketikTeks, 50);
        }
    }
}

// FUNGSI TOGGLE MENU
function toggleMenu() {
    menuSamping.classList.toggle('tampil');
    tombolMenu.classList.toggle('active');
    kontenUtama.classList.toggle('blur');
}

// FUNGSI SCROLL SMOOTH
function scrollToSection(sectionId, offset = 70) {
    const section = document.getElementById(sectionId);
    if (section) {
        const targetPosition = section.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function scrollToHome() {
    scrollToSection('home', 0);
    closeMenu();
    updateActiveNavigation('home');
}

function scrollToAbout(subsection = 'biodata') {
    scrollToSection('about');
    if (subsection) {
        setTimeout(() => {
            switchAboutSection(subsection);
        }, 500);
    }
    closeMenu();
    updateActiveNavigation('about', subsection);
}

function scrollToTop() {
    scrollToHome();
}

// FUNGSI SWITCH ABOUT SECTION
function switchAboutSection(section) {
    // Hide all sections
    const allSections = document.querySelectorAll('.bagian-about');
    allSections.forEach(sec => sec.classList.remove('aktif'));
    
    // Show target section
    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.add('aktif');
    }
    
    // Update navigation dots
    const allDots = document.querySelectorAll('.titik-nav');
    allDots.forEach(dot => dot.classList.remove('aktif'));
    
    const targetDot = document.querySelector(`[data-bagian="${section}"]`);
    if (targetDot) {
        targetDot.classList.add('aktif');
    }
    
    // Update submenu active state
    const subMenuLinks = document.querySelectorAll('.submenu-link');
    subMenuLinks.forEach(link => link.classList.remove('aktif'));
    
    if (section === 'biodata') {
        subMenuLinks[0].classList.add('aktif');
    } else if (section === 'pengalaman') {
        subMenuLinks[1].classList.add('aktif');
    }
}

// FUNGSI UPDATE ACTIVE NAVIGATION
function updateActiveNavigation(section, subsection = null) {
    // Clear all active states
    allNavLinks.forEach(link => link.classList.remove('aktif'));
    
    if (section === 'home') {
        const homeLink = document.querySelector('a[onclick*="scrollToHome"]');
        if (homeLink) homeLink.classList.add('aktif');
    } else if (section === 'about') {
        const aboutLink = document.querySelector('a[onclick*="scrollToAbout"][data-submenu]');
        if (aboutLink) aboutLink.classList.add('aktif');
        
        if (subsection) {
            const subMenuLinks = document.querySelectorAll('.submenu-link');
            subMenuLinks.forEach(link => link.classList.remove('aktif'));
            
            if (subsection === 'biodata') {
                subMenuLinks[0].classList.add('aktif');
            } else if (subsection === 'pengalaman') {
                subMenuLinks[1].classList.add('aktif');
            }
        }
    }
}

// FUNGSI CLOSE MENU
function closeMenu() {
    menuSamping.classList.remove('tampil');
    tombolMenu.classList.remove('active');
    kontenUtama.classList.remove('blur');
    subMenuAbout.classList.remove('tampil');
    itemMenuSub.classList.remove('dibuka');
}

// FUNGSI VIDEO PLAYER
function playVideo() {
    if (videoBackground) {
        videoBackground.muted = true;
        videoBackground.play().then(() => {
            console.log('Video berhasil diputar');
        }).catch(function(error) {
            console.log('Error memutar video: ', error);
            if (videoBackground) {
                videoBackground.style.display = 'none';
            }
        });
    }
}

// EVENT LISTENERS
if (tombolMenu) {
    tombolMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
}

// Toggle submenu about
if (itemMenuSub) {
    const aboutMainLink = itemMenuSub.querySelector('a[data-submenu]');
    if (aboutMainLink) {
        aboutMainLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            subMenuAbout.classList.toggle('tampil');
            itemMenuSub.classList.toggle('dibuka');
        });
    }
}

// TUTUP MENU KETIKA MENGKLIK DI LUAR MENU
document.addEventListener('click', function(event) {
    if (menuSamping && !menuSamping.contains(event.target) && 
        tombolMenu && !tombolMenu.contains(event.target)) {
        closeMenu();
    }
});

// SCROLL EVENT LISTENER
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    
    // Header scroll effect
    if (header) {
        if (scrollY > 50) {
            header.classList.add('scrolled');
            if (tombolBackToTop) {
                tombolBackToTop.classList.add('aktif');
            }
        } else {
            header.classList.remove('scrolled');
            if (tombolBackToTop) {
                tombolBackToTop.classList.remove('aktif');
            }
        }
    }
    
    // Update active navigation based on scroll position
    const homeSection = document.getElementById('home');
    const aboutSection = document.getElementById('about');
    
    if (homeSection && aboutSection) {
        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight - 100;
        
        if (scrollY < homeBottom) {
            updateActiveNavigation('home');
        } else {
            updateActiveNavigation('about', getCurrentAboutSection());
        }
    }
});

// FUNGSI GET CURRENT ABOUT SECTION
function getCurrentAboutSection() {
    const biodataSection = document.getElementById('biodata');
    const pengalamanSection = document.getElementById('pengalaman');
    
    if (biodataSection && biodataSection.classList.contains('aktif')) {
        return 'biodata';
    } else if (pengalamanSection && pengalamanSection.classList.contains('aktif')) {
        return 'pengalaman';
    }
    
    return 'biodata'; // default
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', function() {
    // Start typing animation
    if (teksMengetik) {
        setTimeout(ketikTeks, 1000);
    }
    
    // Initialize video
    if (videoBackground) {
        videoBackground.muted = true;
        videoBackground.defaultMuted = true;
        videoBackground.autoplay = true;
        videoBackground.loop = true;
        videoBackground.playsInline = true;

        setTimeout(() => {
            playVideo();
        }, 100);
    }
    
    // Set initial active navigation
    updateActiveNavigation('home');
});

// Video interaction handlers
let videoPlayed = false;
function handleUserInteraction() {
    if (!videoPlayed && videoBackground) {
        playVideo();
        videoPlayed = true;
    }
}

['click', 'touchstart', 'scroll', 'keydown'].forEach(event => {
    document.addEventListener(event, handleUserInteraction, { once: true });
});

// Video error handling
if (videoBackground) {
    videoBackground.addEventListener('error', function(e) {
        console.log('Video error:', e);
        videoBackground.style.display = 'none';
    });

    videoBackground.addEventListener('loadstart', function() {
        console.log('Video mulai dimuat');
    });

    videoBackground.addEventListener('canplay', function() {
        console.log('Video siap diputar');
        playVideo();
    });
}