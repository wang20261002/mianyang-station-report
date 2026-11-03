(() => {
  const embedded = new URLSearchParams(location.search).has('presentationFrame');
  const nav = document.querySelector('.nav-actions');
  const add = (label, handler) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.onclick = handler;
    nav.prepend(button);
    return button;
  };
  add('复制本页链接', async () => {
    const url = new URL(location.href);
    url.searchParams.delete('presentationFrame');
    url.searchParams.set('page', String(slides.indexOf(document.querySelector('.slide.active')) + 1));
    try { await navigator.clipboard.writeText(url.href); alert('本页链接已复制'); }
    catch { prompt('复制本页链接', url.href); }
  });
  if (embedded && parent !== window) {
    let active, scheduled, settled;
    function fitSlide() {
      if (active) {
        active.style.removeProperty('--fit-height');
        active.style.removeProperty('--fit-scale');
      }
      active = document.querySelector('.slide.active');
      if (!active || !document.documentElement.classList.contains('fit-presentation')) return;
      const height = active.scrollHeight;
      const top = Math.max(0, active.offsetTop);
      const anchor = top ? 0 : 62;
      const available = innerHeight - top - anchor;
      if (height - anchor > available + 1) {
        active.style.setProperty('--fit-height', height + 'px');
        active.style.setProperty('--fit-scale', String(available / (height - anchor)));
        active.style.setProperty('--fit-anchor', anchor + 'px');
      }
    }
    function scheduleFit() {
      cancelAnimationFrame(scheduled);
      scheduled = requestAnimationFrame(fitSlide);
      clearTimeout(settled);
      settled = setTimeout(fitSlide, 180);
    }
    document.documentElement.classList.add('fit-presentation');
    new MutationObserver(scheduleFit).observe(document.getElementById('deck'), {
      subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'hidden']
    });
    addEventListener('resize', scheduleFit);
    document.addEventListener('load', scheduleFit, true);
    scheduleFit();
    const button = add('退出横屏', () => parent.postMessage('toggle-presentation-landscape', location.origin));
    addEventListener('message', event => {
      if (event.source === parent && event.origin === location.origin && typeof event.data.landscape === 'boolean') {
        document.documentElement.classList.toggle('fit-presentation', event.data.landscape);
        scheduleFit();
        button.textContent = event.data.landscape ? '退出横屏' : '横屏汇报';
      }
    });
    return;
  }
  add('横屏汇报', () => {
    const url = new URL(location.href);
    url.searchParams.set('page', String(slides.indexOf(document.querySelector('.slide.active')) + 1));
    url.searchParams.set('presentationFrame', '1');
    const frame = document.createElement('iframe');
    frame.title = '全套汇报';
    frame.className = 'presentation-frame landscape';
    frame.src = url.href;
    document.body.append(frame);
    [...document.body.children].filter(node => node !== frame).forEach(node => { node.inert = true; });
    function fit() {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      const landscape = frame.classList.contains('landscape');
      const rotate = landscape && height > width;
      const availableWidth = rotate ? height : width;
      const availableHeight = rotate ? width : height;
      const scale = landscape ? Math.min(1, availableWidth / 1366, availableHeight / 900) : 1;
      Object.assign(frame.style, {
        left: rotate ? width + 'px' : '0px',
        width: availableWidth / scale + 'px',
        height: availableHeight / scale + 'px',
        transform: (rotate ? 'rotate(90deg) ' : '') + 'scale(' + scale + ')'
      });
    }
    addEventListener('resize', fit);
    window.visualViewport?.addEventListener('resize', fit);
    fit();
    addEventListener('message', event => {
      if (event.source !== frame.contentWindow || event.origin !== location.origin || event.data !== 'toggle-presentation-landscape') return;
      const landscape = frame.classList.toggle('landscape');
      fit();
      frame.contentWindow.postMessage({landscape}, location.origin);
    });
  });
})();
