function load() {
  chrome.storage.sync.get(['apiKey', 'showSearch'], ({ apiKey, showSearch }) => {
    if (apiKey) document.getElementById('key').value = apiKey;
    document.getElementById('search').checked = !!showSearch;
  });
}

function save() {
  const apiKey = document.getElementById('key').value.trim();
  const showSearch = document.getElementById('search').checked;
  chrome.storage.sync.set({ apiKey, showSearch });
  alert('Saved');
}

document.getElementById('save').addEventListener('click', save);
load();
