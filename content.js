function addGPTBox(text) {
  let box = document.getElementById('gpt-helper-result');
  if (!box) {
    box = document.createElement('div');
    box.id = 'gpt-helper-result';
    box.style.border = '1px solid #ddd';
    box.style.padding = '10px';
    box.style.margin = '10px 0';
    box.style.background = '#f8f8f8';
    const container = document.getElementById('rcnt');
    if (container) container.prepend(box);
  }
  box.textContent = text;
}

chrome.storage.sync.get(['showSearch'], ({ showSearch }) => {
  if (!showSearch) return;
  const q = new URL(location.href).searchParams.get('q');
  if (!q) return;
  addGPTBox('Loading GPT result...');
  chrome.runtime.sendMessage({ action: 'askGPT', prompt: q }, (resp) => {
    if (resp && resp.answer) addGPTBox(resp.answer);
    else addGPTBox(resp.error || 'Error fetching result');
  });
});
