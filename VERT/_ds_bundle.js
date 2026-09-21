/* @ds-bundle: {"format":4,"namespace":"VRTEXCalisthenicsDesignSystem_019e03","components":[],"sourceHashes":{"ui_kits/website/shared.js":"0a972cbfb722"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.VRTEXCalisthenicsDesignSystem_019e03 = window.VRTEXCalisthenicsDesignSystem_019e03 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/website/shared.js
try { (() => {
/* ============================================================
   VÉRTEX — Shared site partials (nav + footer + reveal engine)
   Inject by adding <div id="vx-nav"></div> and <div id="vx-footer"></div>
   then <script src="../shared.js"></script> at bottom of <body>.
   data-active="skills|diario|tienda|metodo|app|contacto" on <body> highlights link.
   PATH_PREFIX should be set on window before this script if not at site root.
   ============================================================ */
(function () {
  const P = window.VX_PREFIX || '';
  const active = document.body.getAttribute('data-active') || '';
  const navHTML = `
    <nav class="nav" id="nav">
      <a href="${P}index.html" class="nav-mark">VÉRTEX<span class="dot">.</span></a>
      <ul class="nav-links">
        <li><a href="${P}index.html" ${active === '' ? 'class="active"' : ''}>Inicio</a></li>
        <li><a href="${P}skills.html" ${active === 'skills' ? 'class="active"' : ''}>Skills</a></li>
        <li><a href="${P}metodo.html" ${active === 'metodo' ? 'class="active"' : ''}>Método</a></li>
        <li><a href="${P}diario.html" ${active === 'diario' ? 'class="active"' : ''}>Diario</a></li>
        <li><a href="${P}tienda.html" ${active === 'tienda' ? 'class="active"' : ''}>Tienda</a></li>
        <li><a href="${P}app.html" ${active === 'app' ? 'class="active"' : ''}>App</a></li>
        <li><a href="${P}contacto.html" ${active === 'contacto' ? 'class="active"' : ''}>Contacto</a></li>
      </ul>
      <div class="nav-cta">
        <button data-open-search class="nav-search" aria-label="Buscar">⌕ <span>Buscar</span><kbd>⌘K</kbd></button>
        <a href="#" class="t-mono" style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--mist)">Acceder</a>
        <a href="${P}app.html" class="pill">Empezar</a>
      </div>
    </nav>`;
  const footerHTML = `
    <footer class="footer">
      <div class="footer-top">
        <div class="footer-brand">
          <h2 class="footer-mark">Vértex<span class="dot">.</span></h2>
          <p>Una carta cada dos semanas. Técnica, lecturas, una sesión. Cero ruido.</p>
          <form class="newsletter" onsubmit="event.preventDefault();this.querySelector('button').textContent='Apuntado'">
            <input type="email" placeholder="tu@correo.com">
            <button>Suscribirse →</button>
          </form>
        </div>
        <div class="footer-cols">
          <div class="footer-col"><h5>Producto</h5><ul>
            <li><a href="${P}skills.html">Skills</a></li>
            <li><a href="${P}metodo.html">Método</a></li>
            <li><a href="${P}app.html">App móvil</a></li>
          </ul></div>
          <div class="footer-col"><h5>Marca</h5><ul>
            <li><a href="${P}index.html#manifiesto">Manifiesto</a></li>
            <li><a href="${P}diario.html">Diario</a></li>
            <li><a href="${P}tienda.html">Tienda</a></li>
          </ul></div>
          <div class="footer-col"><h5>Soporte</h5><ul>
            <li><a href="${P}contacto.html">Contacto</a></li>
            <li><a href="#">Envíos</a></li>
            <li><a href="#">Devoluciones</a></li>
          </ul></div>
          <div class="footer-col"><h5>Social</h5><ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">YouTube</a></li>
            <li><a href="#">Vimeo</a></li>
          </ul></div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Vértex Training, S.L.</span>
        <div class="legal"><a href="#">Aviso legal</a><a href="#">Privacidad</a><a href="#">Cookies</a></div>
      </div>
    </footer>`;
  const navEl = document.getElementById('vx-nav');
  const footEl = document.getElementById('vx-footer');
  if (navEl) navEl.outerHTML = navHTML;
  if (footEl) footEl.outerHTML = footerHTML;

  // Nav scroll state
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    onScroll();
  }

  // Reveal observer — with rootMargin and "already visible" fallback
  const isVisibleNow = el => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.92 && r.bottom > 0;
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }), {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });
  const observeOrReveal = el => {
    if (isVisibleNow(el)) {
      // Reveal on next frame so CSS transition still plays from initial state
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('in')));
    } else {
      io.observe(el);
    }
  };
  document.querySelectorAll('.reveal, .auto-reveal').forEach(observeOrReveal);

  // Word-by-word reveal for [data-words]
  document.querySelectorAll('[data-words]').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    text.split(/(\s+)/).forEach((w, i) => {
      if (/^\s+$/.test(w)) {
        el.appendChild(document.createTextNode(w));
        return;
      }
      const span = document.createElement('span');
      span.className = 'word';
      span.style.setProperty('--i', i);
      span.textContent = w;
      el.appendChild(span);
    });
    observeOrReveal(el);
  });

  // Parallax for [data-parallax]
  const parallax = [...document.querySelectorAll('[data-parallax]')];
  if (parallax.length) {
    const tick = () => {
      parallax.forEach(el => {
        const r = el.getBoundingClientRect();
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        const y = (r.top + r.height / 2 - window.innerHeight / 2) * speed * -1;
        el.style.setProperty('--py', y.toFixed(1) + 'px');
      });
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
  }

  // ---------- Reading progress bar (articles) ----------
  const article = document.querySelector('.article-body');
  if (article) {
    const bar = document.createElement('div');
    bar.id = 'read-progress';
    bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:var(--ember);z-index:200;width:0%;transition:width 80ms linear';
    document.body.appendChild(bar);
    const onRead = () => {
      const r = article.getBoundingClientRect();
      const total = article.offsetHeight - window.innerHeight;
      const scrolled = -r.top;
      const p = Math.max(0, Math.min(100, scrolled / total * 100));
      bar.style.width = p + '%';
    };
    window.addEventListener('scroll', onRead, {
      passive: true
    });
    onRead();
  }

  // ---------- Wishlist (localStorage) ----------
  const WL_KEY = 'vx_wishlist';
  const getWishlist = () => {
    try {
      return JSON.parse(localStorage.getItem(WL_KEY)) || [];
    } catch (e) {
      return [];
    }
  };
  const setWishlist = arr => localStorage.setItem(WL_KEY, JSON.stringify(arr));
  window.vxToggleWish = (id, btn) => {
    let list = getWishlist();
    const on = list.includes(id);
    list = on ? list.filter(x => x !== id) : [...list, id];
    setWishlist(list);
    document.querySelectorAll(`[data-wish-id="${id}"]`).forEach(b => b.classList.toggle('on', !on));
  };
  document.querySelectorAll('[data-wish-id]').forEach(b => {
    if (getWishlist().includes(b.dataset.wishId)) b.classList.add('on');
  });

  // ---------- Filters ----------
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const targetSel = group.dataset.filterGroup;
    const items = [...document.querySelectorAll(targetSel)];
    group.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
        const val = btn.dataset.filter;
        items.forEach(it => {
          const show = val === 'all' || it.dataset.tag === val;
          it.style.display = show ? '' : 'none';
        });
      });
    });
  });

  // ---------- Share / copy link ----------
  document.querySelectorAll('[data-share]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const url = window.location.href;
      try {
        if (navigator.share) {
          await navigator.share({
            title: document.title,
            url
          });
          return;
        }
        await navigator.clipboard.writeText(url);
        const orig = btn.textContent;
        btn.textContent = 'Enlace copiado';
        setTimeout(() => btn.textContent = orig, 1800);
      } catch (e) {}
    });
  });

  // ---------- Command palette (⌘K / Ctrl+K) ----------
  const PAGES = [{
    t: 'Inicio',
    u: 'index.html',
    c: 'Página'
  }, {
    t: 'Skills',
    u: 'skills.html',
    c: 'Página'
  }, {
    t: 'One Arm Handstand',
    u: 'skills/one-arm-handstand.html',
    c: 'Skill'
  }, {
    t: 'Planche',
    u: 'skills/planche.html',
    c: 'Skill'
  }, {
    t: 'Front Lever',
    u: 'skills/front-lever.html',
    c: 'Skill'
  }, {
    t: 'Human Flag',
    u: 'skills/human-flag.html',
    c: 'Skill'
  }, {
    t: 'Maltese',
    u: 'skills/maltese.html',
    c: 'Skill'
  }, {
    t: 'Método',
    u: 'metodo.html',
    c: 'Página'
  }, {
    t: 'Diario',
    u: 'diario.html',
    c: 'Página'
  }, {
    t: 'El pino a una mano no empieza por el hombro',
    u: 'diario/pino-una-mano.html',
    c: 'Artículo'
  }, {
    t: 'Comer para sostener, no para inflar',
    u: 'diario/comer-para-sostener.html',
    c: 'Artículo'
  }, {
    t: 'Front Lever: el error invisible de los codos',
    u: 'diario/front-lever-codos.html',
    c: 'Artículo'
  }, {
    t: 'Tienda',
    u: 'tienda.html',
    c: 'Página'
  }, {
    t: 'Hoodie Oversized · Carbon',
    u: 'tienda/hoodie-carbon.html',
    c: 'Producto'
  }, {
    t: 'Grips de calistenia · Tan',
    u: 'tienda/grips-tan.html',
    c: 'Producto'
  }, {
    t: 'App móvil',
    u: 'app.html',
    c: 'Página'
  }, {
    t: 'Test de nivel',
    u: 'test-de-nivel.html',
    c: 'Página'
  }, {
    t: 'Contacto',
    u: 'contacto.html',
    c: 'Página'
  }];
  const cp = document.createElement('div');
  cp.id = 'cmdk';
  cp.innerHTML = `
    <div class="cmdk-backdrop"></div>
    <div class="cmdk-box">
      <div class="cmdk-input-row">
        <span class="cmdk-icon">⌕</span>
        <input class="cmdk-input" placeholder="Buscar skills, diario, tienda…" autocomplete="off">
        <span class="cmdk-esc">ESC</span>
      </div>
      <div class="cmdk-list"></div>
    </div>`;
  document.body.appendChild(cp);
  const cpInput = cp.querySelector('.cmdk-input');
  const cpList = cp.querySelector('.cmdk-list');
  let cpSel = 0,
    cpItems = [];
  const cpRender = q => {
    const query = (q || '').toLowerCase();
    cpItems = PAGES.filter(p => p.t.toLowerCase().includes(query));
    cpList.innerHTML = cpItems.map((p, i) => `<a href="${P}${p.u}" class="cmdk-item ${i === 0 ? 'sel' : ''}" data-i="${i}"><span class="cmdk-item-t">${p.t}</span><span class="cmdk-item-c">${p.c}</span></a>`).join('') || '<div class="cmdk-empty">Sin resultados</div>';
    cpSel = 0;
  };
  const cpOpen = () => {
    cp.classList.add('open');
    cpInput.value = '';
    cpRender('');
    cpInput.focus();
  };
  const cpClose = () => cp.classList.remove('open');
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      cp.classList.contains('open') ? cpClose() : cpOpen();
    }
    if (e.key === 'Escape') cpClose();
    if (cp.classList.contains('open')) {
      const links = [...cpList.querySelectorAll('.cmdk-item')];
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        cpSel = Math.min(cpSel + 1, links.length - 1);
        links.forEach((l, i) => l.classList.toggle('sel', i === cpSel));
        links[cpSel]?.scrollIntoView({
          block: 'nearest'
        });
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        cpSel = Math.max(cpSel - 1, 0);
        links.forEach((l, i) => l.classList.toggle('sel', i === cpSel));
        links[cpSel]?.scrollIntoView({
          block: 'nearest'
        });
      }
      if (e.key === 'Enter') {
        links[cpSel]?.click();
      }
    }
  });
  cp.querySelector('.cmdk-backdrop').addEventListener('click', cpClose);
  cpInput.addEventListener('input', () => cpRender(cpInput.value));

  // Hook up any [data-open-search] trigger buttons
  document.querySelectorAll('[data-open-search]').forEach(b => b.addEventListener('click', cpOpen));

  // Scroll-scrubbed scale-in for [data-scale-in]
  const scaleEls = [...document.querySelectorAll('[data-scale-in]')];
  if (scaleEls.length) {
    const onS = () => {
      scaleEls.forEach(el => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.max(0, Math.min(1, 1 - r.top / vh));
        const scale = 0.9 + p * 0.1;
        const op = 0.4 + p * 0.6;
        el.style.transform = `scale(${scale})`;
        el.style.opacity = op;
      });
    };
    window.addEventListener('scroll', onS, {
      passive: true
    });
    onS();
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/shared.js", error: String((e && e.message) || e) }); }

})();
