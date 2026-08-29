const API_URL = 'https://YOUR-RENDER-URL.onrender.com/api/data';

// Load data from server on startup
async function loadFromServer() {
  try {
    const res = await fetch(API_URL);
    const serverData = await res.json();
    if (serverData) {
      data = serverData;
      setupMonths();
      render();
    }
  } catch (err) {
    console.error('Failed to load from server, using local storage fallback', err);
  }
}

// Save data to server and local backup
async function save() {
  localStorage.setItem('kanakku_data', JSON.stringify(data));
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.error('Failed to sync changes to server', err);
  }
}