/**
 * Kazemi Website - Main JavaScript
 * Handles language switching and UI interactions
 */

// ========================================
// State Management
// ========================================
const state = {
    currentLang: 'en',
    translations: {},
    isMenuOpen: false,
    isModalOpen: false
};

// ========================================
// Guide Content
// ========================================
const guideContent = {
    'getting-started': {
        get title() {
            return state.translations[state.currentLang]?.guides?.gettingStarted?.title || 'Getting Started with Kazemi';
        },
        get content() {
            const t = state.translations[state.currentLang]?.guides?.gettingStarted;
            const steps = t?.steps || {};
            const tabs = (steps.explore?.tabs || []).map(tab => `<li>${tab}</li>`).join('');
            
            return `
                <h2>${t?.title || 'Getting Started'}</h2>
                <p>Welcome to Kazemi! This guide will help you set up and start using your personal media library.</p>
                
                <div class="step">
                    <div class="step-number">${steps.install?.title || 'Step 1: Install Kazemi'}</div>
                    <p>${steps.install?.desc || 'Download Kazemi from our <a href="#download">Download section</a> and install it via AltStore or sideloading.'}</p>
                </div>
                
                <div class="step">
                    <div class="step-number">${steps.open?.title || 'Step 2: Open the App'}</div>
                    <p>${steps.open?.desc || 'Launch Kazemi from your home screen. On first launch, the app will request notification permissions (optional).'}</p>
                </div>
                
                <div class="step">
                    <div class="step-number">${steps.explore?.title || 'Step 3: Explore the Interface'}</div>
                    <p>${steps.explore?.desc || 'Kazemi has 5 main tabs:'}</p>
                    <ul>${tabs || '<li>Sources</li><li>Library</li><li>Updates</li><li>History</li><li>Settings</li>'}</ul>
                </div>
                
                <div class="step">
                    <div class="step-number">${steps.extensions?.title || 'Step 4: Add Extensions'}</div>
                    <p>${steps.extensions?.desc || 'Go to Settings and import JavaScript extensions to add new content sources.'}</p>
                </div>
            `;
        }
    },
    'importing-extensions': {
        get title() {
            return state.translations[state.currentLang]?.guides?.importingExtensions?.title || 'Importing Extensions';
        },
        get content() {
            const t = state.translations[state.currentLang]?.guides?.importingExtensions;
            const types = (t?.types || []).map(type => `<li>${type}</li>`).join('');
            const options = (t?.steps?.import?.options || []).map(opt => `<li><strong>${opt.split(' - ')[0]}</strong> - ${opt.split(' - ')[1] || ''}</li>`).join('');
            
            return `
                <h2>${t?.title || 'Importing Extensions'}</h2>
                <p>${t?.intro || 'Kazemi uses a JavaScript extension system. Extensions are plain .js files that add new functionality to the app.'}</p>
                
                <h3>Types of Extensions</h3>
                <ul>${types || '<li>Source Extensions</li><li>Extractor Extensions</li>'}</ul>
                
                <div class="step">
                    <div class="step-number">${t?.steps?.find?.title || 'Step 1: Find an Extension'}</div>
                    <p>${t?.steps?.find?.desc || 'Extensions are .js files that can be shared via direct download links or local files.'}</p>
                </div>
                
                <div class="step">
                    <div class="step-number">${t?.steps?.settings?.title || 'Step 2: Open Settings'}</div>
                    <p>${t?.steps?.settings?.desc || 'In Kazemi, navigate to the Settings tab and find the Extensions section.'}</p>
                </div>
                
                <div class="step">
                    <div class="step-number">${t?.steps?.import?.title || 'Step 3: Import'}</div>
                    <p>${t?.steps?.import?.desc || 'Choose between:'}</p>
                    <ul>${options || '<li>Import from URL</li><li>Import from File</li>'}</ul>
                </div>
                
                <div class="step">
                    <div class="step-number">${t?.steps?.verify?.title || 'Step 4: Verify'}</div>
                    <p>${t?.steps?.verify?.desc || 'The extension will be validated and added to your installed extensions list. It\'s now ready to use!'}</p>
                </div>
                
                <h3>${t?.managing || 'Managing Extensions'}</h3>
                <p>${t?.managingDesc || 'You can disable or remove extensions at any time from the Settings menu. Removed extensions are permanently deleted from the app.'}</p>
            `;
        }
    },
    'local-library': {
        title: 'Local Library',
        get content() {
            const t = state.translations[state.currentLang]?.guides?.localLibrary?.folderStructure;
            const root = t?.root || 'MyMedia/';
            const weddingFolder = t?.wedding?.folder || 'Ana & Carlos Wedding/';
            const weddingFiles = t?.wedding?.files || ['ceremony.mp4', 'party.mp4', 'cover.jpg'];
            const birthdayFolder = t?.birthday?.folder || '50th Birthday/';
            const birthdayFiles = t?.birthday?.files || ['video.mp4'];
            
            const weddingFileLines = weddingFiles.map((f, i) => {
                const prefix = i === weddingFiles.length - 1 ? '│   └── ' : '│   ├── ';
                return prefix + f;
            }).join('\n');
            
            const birthdayFileLines = birthdayFiles.map((f, i) => {
                const prefix = i === birthdayFiles.length - 1 ? '    └── ' : '    ├── ';
                return prefix + f;
            }).join('\n');
            
            return `
                <h2>Local Library</h2>
                <p>Kazemi can scan your local media folder to organize and play your offline content.</p>
                
                <div class="step">
                    <div class="step-number">Step 1: Prepare Your Folder</div>
                    <p>Organize your media files in a folder structure like this:</p>
                    <pre><code>${root}
├── ${weddingFolder}
${weddingFileLines}
└── ${birthdayFolder}
${birthdayFileLines}</code></pre>
                </div>
                
                <div class="step">
                    <div class="step-number">Step 2: Enable Local Library</div>
                    <p>Go to Settings → Local Library and toggle it ON.</p>
                </div>
                
                <div class="step">
                    <div class="step-number">Step 3: Select Folder</div>
                    <p>Tap "Select Folder" and navigate to your media folder. Grant permission when prompted.</p>
                </div>
                
                <div class="step">
                    <div class="step-number">Step 4: Browse</div>
                    <p>Your local content will appear in the Sources tab under "Local". Tap to browse and play!</p>
                </div>
                
                <h3>Optional: info.json</h3>
                <p>Add an <code>info.json</code> file in each media folder for metadata like title, synopsis, tags, and year.</p>
            `;
        }
    },
    'downloads': {
        get title() {
            return state.translations[state.currentLang]?.guides?.downloads?.title || 'Downloads';
        },
        get content() {
            const t = state.translations[state.currentLang]?.guides?.downloads;
            const steps = t?.steps || {};
            const items = (t?.managingItems || []).map(item => `<li><strong>${item.split(' - ')[0]}</strong> - ${item.split(' - ')[1] || ''}</li>`).join('');
            
            return `
                <h2>${t?.title || 'Downloads'}</h2>
                <p>${t?.intro || 'Download content for offline viewing with Kazemi\'s built-in download manager.'}</p>
                
                <div class="step">
                    <div class="step-number">${steps.find?.title || 'Step 1: Find Content'}</div>
                    <p>${steps.find?.desc || 'Browse to the item you want to download.'}</p>
                </div>
                
                <div class="step">
                    <div class="step-number">${steps.tap?.title || 'Step 2: Tap Download'}</div>
                    <p>${steps.tap?.desc || 'On the item detail page, tap the download button (↓) in the toolbar.'}</p>
                </div>
                
                <div class="step">
                    <div class="step-number">${steps.quality?.title || 'Step 3: Choose Quality'}</div>
                    <p>${steps.quality?.desc || 'Select your preferred video quality and mirror. Downloads with an extractor icon are recommended.'}</p>
                </div>
                
                <div class="step">
                    <div class="step-number">${steps.monitor?.title || 'Step 4: Monitor Progress'}</div>
                    <p>${steps.monitor?.desc || 'Check download progress in the Downloads view (Settings → Downloads). Downloads continue in the background!'}</p>
                </div>
                
                <h3>${t?.managing || 'Managing Downloads'}</h3>
                <ul>${items || '<li>Play</li><li>Delete</li><li>Batch Download</li>'}</ul>
            `;
        }
    },
    'subtitles': {
        get title() {
            return state.translations[state.currentLang]?.guides?.subtitles?.title || 'Subtitles';
        },
        get content() {
            const t = state.translations[state.currentLang]?.guides?.subtitles;
            const localSteps = t?.localSteps || {};
            const controlsItems = (t?.controlsItems || []).map(item => `<li>${item}</li>`).join('');
            
            return `
                <h2>${t?.title || 'Subtitles'}</h2>
                <p>${t?.intro || 'Kazemi supports external VTT subtitle files for your content.'}</p>
                
                <h3>${t?.online || 'For Online Content'}</h3>
                <p>${t?.onlineDesc || 'Many sources provide subtitles automatically. When available, you\'ll see a CC button in the player to toggle subtitles on/off.'}</p>
                
                <h3>${t?.local || 'For Local Content'}</h3>
                <div class="step">
                    <div class="step-number">${localSteps.name?.title || 'Step 1: Name Your Files'}</div>
                    <p>${localSteps.name?.desc || 'Name subtitle files the same as your video files, with a .vtt extension:'}</p>
                    <pre><code>ep1.mp4
ep1.vtt</code></pre>
                </div>
                
                <div class="step">
                    <div class="step-number">${localSteps.place?.title || 'Step 2: Place in Same Folder'}</div>
                    <p>${localSteps.place?.desc || 'Keep the subtitle file in the same folder as the video.'}</p>
                </div>
                
                <div class="step">
                    <div class="step-number">${localSteps.detect?.title || 'Step 3: Automatic Detection'}</div>
                    <p>${localSteps.detect?.desc || 'Kazemi will automatically detect and load matching subtitle files when you play the video.'}</p>
                </div>
                
                <h3>${t?.controls || 'Subtitle Controls'}</h3>
                <p>${t?.controlsDesc || 'While playing, tap the CC button to:'}</p>
                <ul>${controlsItems || '<li>Enable/disable subtitles</li><li>Switch between available languages</li>'}</ul>
            `;
        }
    },
    'troubleshooting': {
        get title() {
            return state.translations[state.currentLang]?.guides?.troubleshooting?.title || 'Troubleshooting';
        },
        get content() {
            const t = state.translations[state.currentLang]?.guides?.troubleshooting;
            
            const wontOpenItems = (t?.wontOpen?.items || []).map(item => `<li>${item}</li>`).join('');
            const extItems = (t?.extensionsNotLoading?.items || []).map(item => `<li>${item}</li>`).join('');
            const videoItems = (t?.videoWontPlay?.items || []).map(item => `<li>${item}</li>`).join('');
            const dlItems = (t?.downloadsFailing?.items || []).map(item => `<li>${item}</li>`).join('');
            const libItems = (t?.localLibraryNotScanning?.items || []).map(item => `<li>${item}</li>`).join('');
            
            return `
                <h2>${t?.title || 'Troubleshooting'}</h2>
                <p>${t?.intro || 'Having issues? Here are some common solutions.'}</p>
                
                <h3>${t?.wontOpen?.title || 'App Won\'t Open'}</h3>
                <ul>${wontOpenItems || '<li>Restart your device</li><li>Reinstall via AltStore</li><li>Check certificate</li>'}</ul>
                
                <h3>${t?.extensionsNotLoading?.title || 'Extensions Not Loading'}</h3>
                <ul>${extItems || '<li>Check .js syntax</li><li>Verify format</li><li>Re-import</li>'}</ul>
                
                <h3>${t?.videoWontPlay?.title || 'Video Won\'t Play'}</h3>
                <ul>${videoItems || '<li>Check internet</li><li>Try different source</li><li>Extractor unavailable</li>'}</ul>
                
                <h3>${t?.downloadsFailing?.title || 'Downloads Failing'}</h3>
                <ul>${dlItems || '<li>Check storage</li><li>Enable background refresh</li><li>Try different quality</li>'}</ul>
                
                <h3>${t?.localLibraryNotScanning?.title || 'Local Library Not Scanning'}</h3>
                <ul>${libItems || '<li>Verify permissions</li><li>Check file formats</li><li>Re-select folder</li>'}</ul>
                
                <h3>${t?.stillHavingIssues || 'Still Having Issues?'}</h3>
                <p>${t?.stillHavingIssuesDesc || 'Visit our <a href="https://github.com/kazemiapp/Kazemi/issues" target="_blank">GitHub Issues</a> page to report bugs or request help.'}</p>
            `;
        }
    }
};

// ========================================
// Translation System
// ========================================

/**
 * Get nested property from object using dot notation
 */
function getNestedProperty(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : null;
    }, obj);
}

/**
 * Load translations for a specific language
 */
async function loadTranslations(lang) {
    try {
        const basePath = document.documentElement.getAttribute('data-base-path') || '.';
        const response = await fetch(`${basePath}/i18n/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load translations for ${lang}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
        return null;
    }
}

/**
 * Update all translatable elements on the page
 */
function updateTranslations() {
    const translations = state.translations[state.currentLang];
    if (!translations) return;

    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = getNestedProperty(translations, key);
        if (value !== null) {
            element.textContent = value;
        }
    });

    // Update meta tags
    const metaTitle = getNestedProperty(translations, 'meta.title');
    const metaDescription = getNestedProperty(translations, 'meta.description');
    if (metaTitle) document.title = metaTitle;
    if (metaDescription) {
        document.querySelector('meta[name="description"]')?.setAttribute('content', metaDescription);
    }

    // Update html lang attribute
    document.documentElement.lang = state.currentLang;

    // Update modal content if open (for dynamic content like local library)
    if (state.isModalOpen) {
        const modalBody = document.getElementById('modalBody');
        const currentGuideId = getCurrentGuideId();
        if (modalBody && currentGuideId && guideContent[currentGuideId]) {
            modalBody.innerHTML = guideContent[currentGuideId].content;
        }
    }

    // Save preference
    localStorage.setItem('kazemi_lang', state.currentLang);
}

/**
 * Get the current guide ID from the open modal
 */
function getCurrentGuideId() {
    // Try to get from modal body data attribute first
    const modalBody = document.getElementById('modalBody');
    if (modalBody && modalBody.getAttribute('data-guide-id')) {
        return modalBody.getAttribute('data-guide-id');
    }
    return null;
}

/**
 * Change the current language
 */
async function changeLanguage(lang) {
    if (state.currentLang === lang) return;

    state.currentLang = lang;

    // Update language button text
    const langCurrent = document.querySelector('.lang-current');
    if (langCurrent) {
        langCurrent.textContent = lang.toUpperCase();
    }

    // Update translations
    await updateTranslations();

    // Close dropdown
    closeLanguageDropdown();
}

// ========================================
// Language Dropdown
// ========================================

function toggleLanguageDropdown() {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

function closeLanguageDropdown() {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

// ========================================
// Mobile Menu
// ========================================

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');

    state.isMenuOpen = !state.isMenuOpen;

    if (state.isMenuOpen) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(15, 15, 26, 0.98)';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid var(--border-color)';
        mobileMenuBtn.classList.add('active');
    } else {
        navLinks.style.display = '';
        navLinks.style.flexDirection = '';
        navLinks.style.position = '';
        navLinks.style.top = '';
        navLinks.style.left = '';
        navLinks.style.right = '';
        navLinks.style.background = '';
        navLinks.style.padding = '';
        navLinks.style.borderBottom = '';
        mobileMenuBtn.classList.remove('active');
    }
}

function closeMobileMenu() {
    if (state.isMenuOpen) {
        toggleMobileMenu();
    }
}

// ========================================
// Modal / Guides
// ========================================

function openModal(guideId) {
    const guide = guideContent[guideId];
    if (!guide) return;

    const modal = document.getElementById('guide-modal');
    const modalBody = document.getElementById('modalBody');

    if (modal && modalBody) {
        modalBody.setAttribute('data-guide-id', guideId);
        modalBody.innerHTML = guide.content;
        modal.classList.add('active');
        state.isModalOpen = true;
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('guide-modal');
    if (modal) {
        modal.classList.remove('active');
        state.isModalOpen = false;
        document.body.style.overflow = '';
    }
}

function setupGuides() {
    // Add click handlers to guide cards
    document.querySelectorAll('.guide-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const guideId = href.substring(1);
                openModal(guideId);
            }
        });
    });

    // Close modal on close button
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal on outside click
    const modal = document.getElementById('guide-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && state.isModalOpen) {
            closeModal();
        }
    });
}

// ========================================
// Smooth Scroll
// ========================================

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            // Don't scroll for guide links (they open modals)
            const guideLinks = ['getting-started', 'importing-extensions', 'local-library', 'downloads', 'subtitles', 'troubleshooting'];
            if (guideLinks.includes(targetId.substring(1))) {
                return;
            }

            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                closeMobileMenu();
            }
        });
    });
}

// ========================================
// Scroll Animations
// ========================================

function setupScrollAnimations() {
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

    // Observe feature cards, download cards, etc.
    document.querySelectorAll('.feature-card, .download-card, .tier-card, .extension-type').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================

function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// ========================================
// Initialize
// ========================================

async function init() {
    // Load saved language preference or default to 'en'
    const savedLang = localStorage.getItem('kazemi_lang') || 'en';
    state.currentLang = savedLang;

    // Load all language files
    const languages = ['en', 'es', 'zh'];
    for (const lang of languages) {
        const translations = await loadTranslations(lang);
        if (translations) {
            state.translations[lang] = translations;
        }
    }

    // Update UI with current language
    if (state.translations[state.currentLang]) {
        await updateTranslations();
    }

    // Update language button
    const langCurrent = document.querySelector('.lang-current');
    if (langCurrent) {
        langCurrent.textContent = state.currentLang.toUpperCase();
    }

    // Setup event listeners
    setupEventListeners();
    setupGuides();

    // Setup animations
    setupSmoothScroll();
    setupScrollAnimations();
    setupNavbarScroll();
}

function setupEventListeners() {
    // Language toggle button
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleLanguageDropdown();
        });
    }

    // Language dropdown buttons
    document.querySelectorAll('.lang-dropdown button').forEach(btn => {
        btn.addEventListener('click', async () => {
            const lang = btn.getAttribute('data-lang');
            await changeLanguage(lang);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-selector')) {
            closeLanguageDropdown();
        }
    });

    // Mobile menu button
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Handle resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 968 && state.isMenuOpen) {
            closeMobileMenu();
        }
    });
}

// ========================================
// Start Application
// ========================================

document.addEventListener('DOMContentLoaded', init);
