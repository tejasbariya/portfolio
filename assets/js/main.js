(async function () {
  'use strict';

  // 1. Fetch the data from the CMS JSON file
  const response = await fetch('data/data.json');
  const DATA = await response.json();

  // --- START DYNAMIC CONTENT INJECTION ---
  if (document.getElementById('site-title')) {
    document.getElementById('site-title').textContent = `${DATA.name || 'Portfolio'} — ${DATA.role || 'Developer'}`;
    document.getElementById('site-desc').setAttribute('content', `${DATA.name || ''} — ${DATA.role || ''}. ${DATA.tagline || ''}`);
    
    const firstName = (DATA.name || 'Hello').split(' ')[0].toLowerCase();
    const lastName = (DATA.name || '').split(' ').slice(1).join(' ');
    
    document.getElementById('nav-logo-text').textContent = firstName;
    
    document.getElementById('hero-eyebrow').innerHTML = DATA.heroEyebrow || '';
    document.getElementById('hero-name-first').textContent = firstName;
    document.getElementById('hero-name-last').textContent = lastName;
    document.getElementById('hero-desc').innerHTML = DATA.heroDesc || '';
    
    document.getElementById('about-body').innerHTML = DATA.aboutBody || '';
    
    document.getElementById('contact-intro').innerHTML = DATA.contactIntro || '';
    document.getElementById('contact-email-text').textContent = DATA.email || '';
    document.getElementById('contact-email-link').href = `mailto:${DATA.email || ''}`;
    
    document.getElementById('footer-name').textContent = DATA.name || '';
    if (document.getElementById('footer-tagline')) {
      document.getElementById('footer-tagline').textContent = DATA.tagline || 'Built with intent.';
    }
  }
  // --- END DYNAMIC CONTENT INJECTION ---

  // Cursor Animation
  const curDot  = document.getElementById('curDot');
  const curRing = document.getElementById('curRing');
  let curX = -200, curY = -200, ringX = -200, ringY = -200, cursorReady = false;

  function animateCursor() {
    curDot.style.left  = curX + 'px';
    curDot.style.top   = curY + 'px';
    ringX += (curX - ringX) * 0.12;
    ringY += (curY - ringY) * 0.12;
    curRing.style.left = ringX + 'px';
    curRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateCursor);
  }

  function attachHover(els) {
    els.forEach(el => {
      el.addEventListener('mouseenter', () => { curDot.classList.add('hov'); curRing.classList.add('hov'); });
      el.addEventListener('mouseleave', () => { curDot.classList.remove('hov'); curRing.classList.remove('hov'); });
    });
  }

  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', e => {
      curX = e.clientX; curY = e.clientY;
      if (!cursorReady) {
        cursorReady = true;
        document.body.classList.add('mouse-active');
        animateCursor();
      }
    }, { passive: true });
    attachHover(document.querySelectorAll('a, button, .filter-btn, .tech-tag, .proj-card'));
  }

  // Navigation Logic
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('lit', window.scrollY > 30);
  }, { passive: true });

  const sections   = ['home', 'about', 'projects', 'contact'];
  const navAnchors = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = 'home';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 140) current = id;
    });
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  }, { passive: true });

  // Mobile Menu Logic
  const burger  = document.getElementById('burgerBtn');
  const mobMenu = document.getElementById('mobMenu');
  let menuOpen  = false;

  const openMenu  = () => {
    menuOpen = true;
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    mobMenu.classList.add('open');
    mobMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    menuOpen = false;
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    mobMenu.classList.remove('open');
    mobMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
  document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('click', e => {
    if (menuOpen && !mobMenu.contains(e.target) && !burger.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen) closeMenu(); });

  // Tech Stack (Safe Fallback)
  const techContainer = document.getElementById('heroTech');
  (DATA.stack || []).forEach(tech => {
    const span = document.createElement('span');
    span.className = 'tech-tag';
    span.textContent = tech;
    techContainer.appendChild(span);
  });

  // Terminal Widget (Safe Fallback)
  const termBody = document.getElementById('termBody');
  (DATA.terminal || []).forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 't-row';
    rowDiv.innerHTML = `<span class="t-prompt">›</span><span class="t-cmd">${row.cmd || ''}</span>`;
    termBody.appendChild(rowDiv);
    const outDiv = document.createElement('div');
    outDiv.className = 't-row';
    const outSpan = document.createElement('span');
    outSpan.className = 't-out' + (row.hi ? ' hi' : '');
    outSpan.textContent = row.out || '';
    outDiv.appendChild(outSpan);
    termBody.appendChild(outDiv);
  });
  const lastRow = document.createElement('div');
  lastRow.className = 't-row';
  lastRow.innerHTML = '<span class="t-prompt">›</span><span class="t-cmd"><span class="t-cursor"></span></span>';
  termBody.appendChild(lastRow);

  // Info Cards (Safe Fallback)
  const infoContainer = document.getElementById('infoCards');
  [
    { label: 'focused on',         items: DATA.focus || [] },
    { label: 'currently learning', items: DATA.learning || [] },
  ].forEach(block => {
    if (block.items.length > 0) {
      const card = document.createElement('div');
      card.className = 'info-card';
      card.innerHTML = `<div class="info-card-label">${block.label}</div><ul>${
        block.items.map(i => `<li>${i}</li>`).join('')
      }</ul>`;
      infoContainer.appendChild(card);
    }
  });

  // Project Icons
  const GH_ICON   = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`;
  const LIVE_ICON = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

  // Projects Grid (Safe Fallback)
  const projGrid  = document.getElementById('projGrid');
  const projCount = document.getElementById('projCount');

  (DATA.projects || []).forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'proj-card';
    card.dataset.cat = p.cat || 'misc';
    
    // Ensure tags safely map even if left blank
    const tagHtml = (p.tags || []).map(t => `<span class="p-tag">${t}</span>`).join('');

    card.innerHTML = `
      <div class="pc-header">
        <div>
          <div class="pc-num">// ${String(i + 1).padStart(2, '0')}</div>
          ${p.fork ? '<div class="pc-badge">forked</div>' : ''}
        </div>
        <div class="pc-links-row">
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="pc-icon" title="GitHub">${GH_ICON}</a>` : ''}
          ${p.live   ? `<a href="${p.live}"   target="_blank" rel="noopener" class="pc-icon" title="Live">${LIVE_ICON}</a>` : ''}
        </div>
      </div>
      <div class="pc-title">${p.title || 'Untitled'}</div>
      <div class="pc-desc">${p.desc || ''}</div>
      <div class="pc-tags">${tagHtml}</div>`;
    projGrid.appendChild(card);
  });

  if (window.matchMedia('(pointer: fine)').matches) {
    attachHover(document.querySelectorAll('.proj-card, .pc-icon'));
  }

  // Filter Bar Logic
  const filterBar = document.getElementById('filterBar');
  const cats = ['all', ...new Set((DATA.projects || []).map(p => p.cat).filter(Boolean))];

  function applyFilter(cat) {
    let visible = 0;
    document.querySelectorAll('.proj-card').forEach(card => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    projCount.textContent = visible;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
  }

  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat === 'all' ? ' active' : '');
    btn.dataset.cat = cat;
    btn.textContent = cat;
    btn.addEventListener('click', () => applyFilter(cat));
    filterBar.appendChild(btn);
  });

  // Contact Form Logic
  const contactForm  = document.getElementById('contactForm');
  const formStatus   = document.getElementById('formStatus');
  const submitBtn    = document.getElementById('submitBtn');

  const setStatus = (msg, err) => {
    formStatus.textContent = msg;
    formStatus.className = 'form-status' + (err ? ' error' : '');
  };

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name    = contactForm.querySelector('#fname').value.trim();
    const email   = contactForm.querySelector('#femail').value.trim();
    const message = contactForm.querySelector('#fmsg').value.trim();
    if (!name || !email || !message) { setStatus('All fields are required.', true); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus('Invalid email address.', true); return; }
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    setStatus('', false);
    
    fetch(DATA.formEndpoint || 'https://formspree.io/f/xaqpalbv', {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    })
    .then(res => {
      if (res.ok) { setStatus("Sent. I'll reply promptly.", false); contactForm.reset(); }
      else return res.json().then(d => { throw new Error(d?.error || 'Server error'); });
    })
    .catch(err => {
      console.error(err);
      setStatus('Failed — email me directly at ' + (DATA.email || 'tejasbariya@gmail.com'), true);
    })
    .finally(() => { submitBtn.disabled = false; submitBtn.textContent = 'Send Message →'; });
  });

  // Reveal Animations
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); obs.unobserve(entry.target); } });
    }, { threshold: 0.07 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id     = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 68, behavior: 'smooth' });
      }
    });
  });

  document.getElementById('footYear').textContent = new Date().getFullYear();
})();