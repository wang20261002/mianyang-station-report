(() => {
  const nav = document.querySelector('.nav-actions');
  const add = (label, handler) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.onclick = handler;
    nav.prepend(button);
  };
  add('复制本页链接', async () => {
    const url = new URL(location.href);
    url.searchParams.set('page', String(slides.indexOf(document.querySelector('.slide.active')) + 1));
    try { await navigator.clipboard.writeText(url.href); alert('本页链接已复制'); }
    catch { prompt('复制本页链接', url.href); }
  });
  const viewer = document.createElement('dialog');
  viewer.className = 'wide-view';
  viewer.innerHTML = '<div class="wide-stage"><header><button data-back>上一图</button><span></span><button data-next>下一图</button><button data-zoom>放大</button><button data-close>关闭</button></header><div class="wide-picture"><img alt=""></div></div>';
  document.body.append(viewer);
  const picture = viewer.querySelector('img');
  let sources = [], current = 0, zoom = 1;
  function render() {
    picture.src = sources[current];
    viewer.querySelector('span').textContent = (current + 1) + ' / ' + sources.length;
    zoom = 1;
    picture.style.width = '100%';
    picture.style.height = '100%';
  }
  add('横屏看图', () => {
    const active = document.querySelector('.slide.active');
    sources = [...new Set([...active.querySelectorAll('img')].map(img => img.currentSrc || img.src).filter(Boolean))];
    const background = getComputedStyle(active).backgroundImage.match(/url\(["']?(.*?)["']?\)/);
    if (!sources.length && background) sources.push(background[1]);
    if (!sources.length) { alert('本页没有独立图片，可旋转手机查看页面内容。'); return; }
    current = 0;
    viewer.showModal();
    render();
  });
  viewer.querySelector('[data-close]').onclick = () => viewer.close();
  viewer.querySelector('[data-back]').onclick = () => { current = (current + sources.length - 1) % sources.length; render(); };
  viewer.querySelector('[data-next]').onclick = () => { current = (current + 1) % sources.length; render(); };
  viewer.querySelector('[data-zoom]').onclick = () => {
    zoom = zoom >= 3 ? 1 : zoom + 1;
    picture.style.width = zoom * 100 + '%';
    picture.style.height = zoom * 100 + '%';
  };
})();
