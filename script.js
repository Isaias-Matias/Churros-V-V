const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles;

function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

function initParticles() {
    particles = Array.from({ length: 38 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1.5 + Math.random() * 3,
      dx: (Math.random() - .5) * .5,
      dy: -(.2 + Math.random() * .5),
      alpha: .1 + Math.random() * .25,
      color: Math.random() > .5 ? '#F5A623' : '#FF3D87'
    }));
}

function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => { resize(); initParticles(); });
  resize(); initParticles(); drawParticles();

    const cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'; cursor.style.opacity = '.25'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)';   cursor.style.opacity = '.55'; });
});


window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
  });

  document.getElementById('hamburger').addEventListener('click', () => document.getElementById('navOverlay').classList.add('open'));
  document.getElementById('overlayClose').addEventListener('click', closeNav);
  function closeNav() { document.getElementById('navOverlay').classList.remove('open'); }

  const menuItems = [
  { cat:'doce', emoji:'🍡', name:'Doce de Leite', desc:'O clássico que nunca sai de moda. Recheio cremoso de doce de leite na massa crocante com canela.', price:'R$ 5,00', badge:'Mais Pedido' },
  { cat:'doce', emoji:'🍫', name:'Chocolate', desc:'Recheio de chocolate derretendo em cada mordida. Impossível comer só um.', price:'R$ 5,00', badge:'' },
  { cat:'doce', emoji:'🍈', name:'Goiabada', desc:'O sabor brasileiro que todo mundo ama. Goiabada cremosa dentro da massa quentinha.', price:'R$ 5,00', badge:'' },
  { cat:'doce', emoji:'🧀', name:'Romeu e Julieta', desc:'A combinação clássica de goiabada com queijo cremoso. Doce e salgado juntos em perfeita harmonia.', price:'R$ 10,00', badge:'' },
  { cat:'doce', emoji:'🍓', name:'Nutella com Morango', desc:'Avelã aveludada com pedaços de morango fresco. O mais pedido entre os especiais!', price:'R$ 18,00', badge:'Especial' },
  { cat:'doce', emoji:'🥜', name:'Amendoim', desc:'Creme de amendoim artesanal com aquele sabor torradinho irresistível.', price:'R$ 15,00', badge:'' },

  { cat:'kcchurros', emoji:'🌭', name:'K-Churros Calabresa', desc:'Churros salgado recheado com calabresa e coberto com queijo cremoso, cheddar e acompanhamentos especiais.', price:'R$ 15,00', badge:'' },
  { cat:'kcchurros', emoji:'🥩', name:'K-Churros Carne Moída', desc:'Carne moída temperadinha com queijo cremoso, alho torrado e muito mais. Uma explosão de sabor!', price:'R$ 15,00', badge:'Mais Pedido' },
  { cat:'kcchurros', emoji:'🦐', name:'K-Churros Camarão', desc:'Para os amantes do mar! Camarão ao molho com queijo cremoso e acompanhamentos especiais.', price:'R$ 18,00', badge:'Premium' },
  { cat:'kcchurros', emoji:'🍗', name:'K-Churros Frango', desc:'Frango temperado e desfiado com queijo cheddar, molho tártaro e batata palha crocante.', price:'R$ 15,00', badge:'' },

  { cat:'pastel', emoji:'🥟', name:'Pastel 20cm – Com Tudo Dentro!', desc:'Frango, carne ou calabresa com queijo cremoso, cheddar, muçarela, alho torrado e orégano. Gigante!', price:'R$ 13,00', badge:'Destaque' },
  { cat:'pastel', emoji:'🔲', name:'Porção de Mini Pastéis (6 un.)', desc:'Seis mini pastéis crocantes de carne e queijo. Perfeito para dividir — se você quiser compartilhar!', price:'R$ 12,00', badge:'' },

  { cat:'bebida', emoji:'🍊', name:'Suco de Laranja Natural', desc:'Garrafa 400ml de suco de laranja espremido na hora. Fresquinho e natural.', price:'R$ 10,00', badge:'' },
  { cat:'bebida', emoji:'🍍', name:'Abacaxi com Hortelã', desc:'Suco gelado de abacaxi com toque de hortelã. Refrescante e delicioso.', price:'R$ 15,00', badge:'' },
  { cat:'bebida', emoji:'🍋', name:'Limonada', desc:'Limonada cremosa e refrescante, feita na hora para acompanhar seu churros.', price:'R$ 12,00', badge:'' },
  { cat:'bebida', emoji:'🧃', name:'Guaravita', desc:'O energético clássico brasileiro para dar aquela animada.', price:'R$ 2,50', badge:'' },
  ];

  function renderMenu(items) {
    const grid = document.getElementById('menuGrid');
    grid.innerHTML = items.map(item => `
      <div class="menu-card reveal">
        ${item.badge ? `<span class="card-badge">${item.badge}</span>` : ''}
        <div class="card-emoji-wrap">${item.emoji}</div>
        <div class="card-body">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <div class="card-footer">
            <span class="card-price">${item.price}</span>
            <button class="card-order" onclick="orderItem('${item.name}')">Pedir Agora</button>
          </div>
        </div>
      </div>
    `).join('');
    observeReveal();
  }

  function filterMenu(cat, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filtered = cat === 'todos' ? menuItems : menuItems.filter(i => i.cat === cat);
    renderMenu(filtered);
  }

  function orderItem(name) {
    const msg = encodeURIComponent(`Olá! Quero pedir: ${name} 🍡`);
    window.open(`https://wa.me/5521965542485?text=${msg}`, '_blank');
  }

  renderMenu(menuItems);

  function observeReveal() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  }
  observeReveal();