// Jhajjar Chess Association - Animation Logic

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// 1. Custom Cursor Follower
function initCursor() {
    const cursor = document.querySelector('.cursor-follower');

    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
        });

        // Hover effects
        const hoverTargets = document.querySelectorAll('a, .btn, .feature-card, .glass-card');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 3,
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    borderColor: 'transparent',
                    duration: 0.3
                });
            });

            target.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    backgroundColor: 'rgba(212, 175, 55, 0.3)',
                    borderColor: '#d4af37',
                    duration: 0.3
                });
            });
        });
    }
}

// 2. Header Animations (For ALL pages - same as home page)
function initHeaderAnimations() {
    const tl = gsap.timeline();

    // Logo animation
    tl.from('.logo', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    })
        // Nav links animation with stagger
        .from('.nav-links li', {
            y: -20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'back.out(1.7)'
        }, '-=0.5');
}

// 3. Hero Section Animations (Only for Home Page)
function initHeroAnimations() {
    // Only run if we are on the home page with the hero section
    if (!document.querySelector('.hero-3d')) return;

    const tl = gsap.timeline({ delay: 0.5 }); // Start after header

    // Hero content animations
    tl.from('.glitch-text', {
        scale: 0.8,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.6,
        ease: 'expo.out'
    })
        .from('.sub-hero', {
            x: -50,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.hero-desc', {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, '-=0.4')
        .from('.hero-btns .btn', {
            y: 20,
            autoAlpha: 0, // Better than opacity
            stagger: 0.2,
            duration: 0.8,
            clearProps: 'all' // Ensure buttons are fully visible and interactable after animation
        }, '-=0.4')
        .from('.hero-main-image', {
            y: 50,
            opacity: 0,
            duration: 1.0,
            ease: 'power3.out'
        }, '-=0.6');

    // Mouse Parallax for Hero
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 20;
        const y = (window.innerHeight / 2 - e.clientY) / 20;

        gsap.to('.hero-main-image', { x: x, y: y, duration: 1, ease: 'power1.out' });
    });
}

// 4. General Page Animations (For all pages)
function initGeneralAnimations() {
    // Animate Page Headers (h1 that are NOT in hero-3d) - same timing as home page
    const pageHeaders = document.querySelectorAll('h1:not(.hero-3d h1)');
    if (pageHeaders.length > 0) {
        gsap.from(pageHeaders, {
            y: 50,
            opacity: 0,
            duration: 0.6, // Same as hero glitch-text
            delay: 0.5, // Same delay as hero section
            ease: 'expo.out', // Same easing as hero
            stagger: 0.2
        });
    }

    // Animate page descriptions (paragraphs right after h1)
    const pageDescs = document.querySelectorAll('h1:not(.hero-3d h1) + p');
    if (pageDescs.length > 0) {
        gsap.from(pageDescs, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            delay: 0.9, // After header
            ease: 'power2.out'
        });
    }

    // Animate Section Titles
    const sectionTitles = document.querySelectorAll('.section-title, h2:not(.news-header h2)');
    sectionTitles.forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8, // Slower
            ease: 'power2.out'
        });
    });

    // Animate glass cards with slower timing
    const glassCards = document.querySelectorAll('.glass-card:not(.feature-card)');
    if (glassCards.length > 0) {
        ScrollTrigger.batch(glassCards, {
            onEnter: batch => gsap.from(batch, {
                y: 60, // Less movement
                opacity: 0,
                rotation: 2, // Less rotation
                stagger: 0.2, // Slower stagger
                duration: 1.2, // Slower duration
                ease: 'power2.out', // Smoother easing
                overwrite: true,
                clearProps: 'all' // Clear properties after animation
            }),
            start: 'top 75%',
            once: true // Only animate once
        });
    }

    // Animate other content with slower timing
    ScrollTrigger.batch('.news-item, .footer-col, .grid-2 > div', {
        onEnter: batch => gsap.from(batch, {
            y: 40, // Less movement
            opacity: 0,
            stagger: 0.15, // Slower stagger
            duration: 1.0, // Slower
            ease: 'power2.out',
            overwrite: true,
            clearProps: 'all' // Clear properties after animation
        }),
        start: 'top 80%',
        once: true // Only animate once
    });
}

// 5. Specific Scroll Animations
function initScrollAnimations() {
    // Features Stagger (Specific for Why Play section)
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        gsap.from(featureCards, {
            scrollTrigger: {
                trigger: '.features-grid',
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true
            },
            y: 60,
            opacity: 0,
            rotation: 2,
            stagger: 0.2,
            duration: 1.0,
            ease: 'power2.out',
            clearProps: 'all'
        });
    }
}

// 6. Mobile Menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate links in
            if (navLinks.classList.contains('active')) {
                gsap.from('.nav-links li', {
                    x: 50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.5
                });
            }
        });
    }
}

// 7. Lightbox Logic
function initLightbox() {
    // Inject HTML if not present
    if (!document.getElementById('lightbox')) {
        const lightboxHTML = `
            <div id="lightbox" class="lightbox">
                <span class="close-lightbox">&times;</span>
                <img class="lightbox-content" id="lightbox-img">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.close-lightbox');

    // Close on click
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.style.display = 'none', 300);
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            setTimeout(() => lightbox.style.display = 'none', 300);
        }
    });
}

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    lightboxImg.src = src;
    lightbox.style.display = 'flex';
    // Small delay to allow display:flex to apply before adding active class for transition
    setTimeout(() => lightbox.classList.add('active'), 10);
}

// 8. Dynamic Content Loading (From Admin Panel / LocalStorage)
function loadDynamicContent() {
    // --- Load Latest Intel (News) ---
    const newsContainer = document.querySelector('.news-cards-grid');
    if (newsContainer) {
        const storedNews = localStorage.getItem('jca_news_data');
        if (storedNews) {
            const newsData = JSON.parse(storedNews);
            if (newsData.length > 0) {
                newsContainer.innerHTML = ''; // Clear hardcoded content

                newsData.forEach((item, index) => {
                    // Create Card HTML
                    const card = document.createElement('div');
                    card.className = 'glass-card news-card';
                    card.innerHTML = `
                        <div class="card-glow"></div>
                        <div class="news-icon">
                            <i class="fa-solid ${item.icon}"></i>
                        </div>
                        <div class="news-date-badge">${item.date}</div>
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                        <a href="${item.link}" class="link-arrow">Read More <i class="fa-solid fa-arrow-right"></i></a>
                    `;
                    newsContainer.appendChild(card);
                });
                ScrollTrigger.refresh();
            }
        }
    }

    // --- Load Tournaments (Calendar) ---
    const tournamentContainer = document.getElementById('tournament-grid');
    if (tournamentContainer) {
        const storedTournaments = localStorage.getItem('jca_tournaments_data');
        if (storedTournaments) {
            const tData = JSON.parse(storedTournaments);
            if (tData.length > 0) {

                // NO AUTO SORT - Respect Array Order from Admin
                // tData.sort(...) removed

                tournamentContainer.innerHTML = '';
                tData.forEach(item => {
                    // Brochure Button Logic
                    let brochureBtn = '';
                    if (item.brochureLink && item.brochureLink !== '#') {
                        brochureBtn = `
                            <a href="${item.brochureLink}" target="_blank" class="btn btn-glass" style="width: 100%; text-align: center; display: block; padding: 12px; margin-top: 10px; font-size: 0.9rem;">
                                <i class="fa-solid fa-file-pdf" style="margin-right: 8px;"></i>Download Brochure
                            </a>
                        `;
                    }

                    // Entry Fee Logic
                    let entryText = '';
                    if (item.entry) {
                        entryText = `<span style="color: var(--primary-gold); font-size: 0.9rem; display: block; margin-top: 5px;">Entry Fee: ${item.entry}</span>`;
                    }

                    const card = document.createElement('div');
                    card.className = 'glass-card';
                    card.style.padding = '30px';
                    card.style.position = 'relative';
                    card.innerHTML = `
                        <div class="card-glow"></div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <div class="news-date" style="font-size: 1rem;">${item.date}</div>
                            <span style="background: var(--primary-gold); color: #000; padding: 8px 15px; font-weight: 700; font-size: 0.75rem; border-radius: 3px;">${item.status}</span>
                        </div>
                        <h3 style="margin: 0 0 15px 0; font-size: 1.6rem; color: var(--text-main);">${item.name}</h3>
                        <p style="color: var(--text-muted); margin-bottom: 15px; font-size: 1rem;">
                            <i class="fa-solid fa-location-dot" style="color: var(--primary-gold); margin-right: 8px;"></i>
                            ${item.location}
                            ${entryText}
                        </p>
                        
                        <a href="${item.regLink || '#'}" target="_blank" class="btn btn-glow" style="width: 100%; text-align: center; display: block; padding: 12px;">
                            <i class="fa-solid fa-user-plus" style="margin-right: 8px;"></i>Register Now
                        </a>
                        ${brochureBtn}
                    `;
                    tournamentContainer.appendChild(card);
                });
                ScrollTrigger.refresh();
            }
        }
    }

    // --- Load Top Players ---
    const playersContainer = document.getElementById('players-grid');
    if (playersContainer) {
        const storedPlayers = localStorage.getItem('jca_players_data');
        if (storedPlayers) {
            const pData = JSON.parse(storedPlayers);
            if (pData.length > 0) {
                playersContainer.innerHTML = '';
                pData.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'glass-card text-center';
                    card.innerHTML = `
                        <div style="width: 150px; height: 150px; border-radius: 50%; margin: 0 auto 20px; overflow: hidden; border: 3px solid var(--primary-gold);">
                            <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <h3 style="font-size: 1.8rem; margin-bottom: 10px; color: var(--text-main);">${item.name}</h3>
                        <p style="color: var(--primary-gold); font-weight: 700; margin-bottom: 5px;">${item.title}</p>
                        <p style="color: var(--text-muted);">FIDE Rating: ${item.rating}</p>
                    `;
                    playersContainer.appendChild(card);
                });
                ScrollTrigger.refresh();
            }
        }
    }

    // --- Load Executives ---
    const executiveContainer = document.getElementById('executive-grid');
    if (executiveContainer) {
        // Default executives if none exist
        const defaultExecutives = [
            { id: 1, name: "Mr. Rajesh Kumar", role: "President", image: "https://via.placeholder.com/150" },
            { id: 2, name: "Mr. Amit Singh", role: "Secretary", image: "https://via.placeholder.com/150" },
            { id: 3, name: "Mrs. Suman Devi", role: "Treasurer", image: "https://via.placeholder.com/150" }
        ];

        let eData = [];
        const storedExecutives = localStorage.getItem('jca_executives_data');

        if (storedExecutives) {
            eData = JSON.parse(storedExecutives);
        }

        // If no data in localStorage, use defaults
        if (!eData || eData.length === 0) {
            eData = defaultExecutives;
            localStorage.setItem('jca_executives_data', JSON.stringify(defaultExecutives));
        }

        // Render executives
        executiveContainer.innerHTML = '';
        eData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'glass-card text-center';
            card.innerHTML = `
                <div style="width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 20px; overflow: hidden; border: 3px solid var(--primary-gold);">
                    <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <h4>${item.name}</h4>
                <p class="text-gold" style="font-weight: 600;">${item.role}</p>
            `;
            executiveContainer.appendChild(card);
        });
        ScrollTrigger.refresh();
    }

    // --- Load Results ---
    const resultsContainer = document.getElementById('results-table-body');
    if (resultsContainer) {
        const storedResults = localStorage.getItem('jca_results_data');
        if (storedResults) {
            const rData = JSON.parse(storedResults);
            if (rData.length > 0) {
                resultsContainer.innerHTML = '';
                rData.forEach(item => {
                    const row = document.createElement('tr');
                    row.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
                    row.innerHTML = `
                        <td style="padding: 20px;">${item.tournament}</td>
                        <td style="padding: 20px; color: var(--text-muted);">${item.date}</td>
                        <td style="padding: 20px;">${item.category}</td>
                        <td style="padding: 20px;"><a href="${item.link}" class="text-gold"><i class="fa-solid fa-eye"></i> View Result</a></td>
                    `;
                    resultsContainer.appendChild(row);
                });
            }
        }
    }

    // --- Load Certificates ---
    const certificatesContainer = document.getElementById('certificates-table-body');
    if (certificatesContainer) {
        const storedCertificates = localStorage.getItem('jca_certificates_data');
        if (storedCertificates) {
            const cData = JSON.parse(storedCertificates);
            if (cData.length > 0) {
                certificatesContainer.innerHTML = '';
                cData.forEach(item => {
                    const row = document.createElement('tr');
                    row.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
                    row.innerHTML = `
                        <td style="padding: 20px;">${item.title}</td>
                        <td style="padding: 20px; color: var(--text-muted);"> - </td>
                        <td style="padding: 20px;">
                            <a href="${item.link}" target="_blank" class="btn btn-glass" style="padding: 10px 20px; font-size: 0.8rem;">
                                <i class="fa-solid fa-download"></i> Download
                            </a>
                        </td>
                    `;
                    certificatesContainer.appendChild(row);
                });
            }
        }
    }

    // --- Load Gallery (Homepage) ---
    const galleryContainer = document.getElementById('gallery-grid');
    if (galleryContainer) {
        // Default Data (Fallback)
        const defaultGalleryData = [
            {
                id: 1,
                name: "District Championship 2024",
                photos: [
                    { id: 101, url: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", caption: "Opening Ceremony" },
                    { id: 102, url: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", caption: "Final Match" }
                ]
            },
            {
                id: 2,
                name: "Summer Rapid 2024",
                photos: [
                    { id: 201, url: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", caption: "Intense Game" }
                ]
            }
        ];

        let galleryData = localStorage.getItem('jca_gallery_v2');

        // If no data or old format, use defaults
        if (!galleryData) {
            galleryData = defaultGalleryData;
            localStorage.setItem('jca_gallery_v2', JSON.stringify(defaultGalleryData));
        } else {
            galleryData = JSON.parse(galleryData);
        }

        // Flatten all photos from all tournaments
        const allPhotos = [];
        if (Array.isArray(galleryData)) {
            galleryData.forEach(tournament => {
                if (tournament.photos) {
                    tournament.photos.forEach(photo => {
                        allPhotos.push({ ...photo, tournament: tournament.name });
                    });
                }
            });
        }

        if (allPhotos.length > 0) {
            galleryContainer.innerHTML = '';

            // Show only first 8 photos on homepage
            const photosToShow = allPhotos.slice(0, 8);

            photosToShow.forEach(item => {
                const card = document.createElement('div');
                card.className = 'glass-card';
                card.style.padding = '10px';
                card.style.overflow = 'hidden';
                card.innerHTML = `
                    <img src="${item.url}" alt="${item.caption || item.tournament}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; transition: transform 0.5s;">
                `;

                // Add Click Event for Lightbox (assuming openLightbox is global or just link to gallery)
                const img = card.querySelector('img');
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    window.location.href = 'gallery.html';
                });

                galleryContainer.appendChild(card);
            });
            ScrollTrigger.refresh();
        }
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initHeaderAnimations();
    initHeroAnimations();
    initGeneralAnimations();
    initScrollAnimations();
    initMobileMenu();
    initLightbox(); // Initialize Lightbox
    loadDynamicContent(); // Load dynamic data
});
