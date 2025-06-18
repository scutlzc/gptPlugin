function createButton() {
  const btn = document.createElement('button');
  btn.textContent = 'Summarize Video';
  btn.style.marginLeft = '8px';
  btn.addEventListener('click', summarize);
  return btn;
}

function insertButton() {
  const title = document.querySelector('#above-the-fold #title h1');
  if (title && !document.getElementById('gpt-helper-btn')) {
    const btn = createButton();
    btn.id = 'gpt-helper-btn';
    title.appendChild(btn);
  }
}

async function summarize() {
  const url = location.href;
  const btn = document.getElementById('gpt-helper-btn');
  if (btn) btn.textContent = 'Loading...';
  chrome.runtime.sendMessage({ action: 'askGPT', prompt: `Summarize this video: ${url}` }, (resp) => {
    if (btn) btn.textContent = 'Summarize Video';
    if (resp && resp.answer) alert(resp.answer);
    else alert(resp.error || 'Error fetching summary');
  });
}

setInterval(insertButton, 2000);
