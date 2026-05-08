const BASE = '/angus-neale.io';

async function renderWriting() {
  const res = await fetch(BASE + '/data/writing.json');
  const items = await res.json();
  const container = document.getElementById('writing-list');
  if (!container) return;
  container.innerHTML = items.map(item => `
    <a class="writing-item" href="${item.url}" target="_blank" rel="noopener">
      <div class="writing-date">${item.date}</div>
      <div class="writing-body">
        <div class="writing-title">${item.title}</div>
        ${item.sub ? `<div class="writing-sub">${item.sub}</div>` : ''}
        <span class="writing-outlet">${item.outlet}${item.role ? ' · ' + item.role : ''}</span>
      </div>
    </a>
  `).join('');
}

async function renderTikToks() {
  const res = await fetch(BASE + '/data/tiktoks.json');
  const items = await res.json();
  const container = document.getElementById('tiktok-list');
  if (!container) return;
  container.innerHTML = items.map(item => `
    <div class="tiktok-item">
      <blockquote class="tiktok-embed" cite="${item.url}" data-video-id="${item.id}">
        <section></section>
      </blockquote>
    </div>
  `).join('');
  const script = document.createElement('script');
  script.src = 'https://www.tiktok.com/embed.js';
  script.async = true;
  document.body.appendChild(script);
}

document.addEventListener('DOMContentLoaded', () => {
  renderWriting();
  renderTikToks();
});
