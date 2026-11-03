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
    const button = add('退出横屏', () => parent.postMessage('toggle-presentation-landscape', location.origin));
    addEventListener('message', event => {
      if (event.source === parent && event.origin === location.origin && typeof event.data.landscape === 'boolean') {
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
    addEventListener('message', event => {
      if (event.source !== frame.contentWindow || event.origin !== location.origin || event.data !== 'toggle-presentation-landscape') return;
      const landscape = frame.classList.toggle('landscape');
      frame.contentWindow.postMessage({landscape}, location.origin);
    });
  });
})();
