chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'askGPT') {
    chrome.storage.sync.get(['apiKey'], async ({ apiKey }) => {
      if (!apiKey) {
        sendResponse({ error: 'No API key set' });
        return;
      }
      try {
        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: request.prompt }]
          })
        });
        const data = await resp.json();
        const answer = data.choices && data.choices[0] ? data.choices[0].message.content.trim() : '';
        sendResponse({ answer });
      } catch (e) {
        sendResponse({ error: e.toString() });
      }
    });
    return true; // async
  }
});
