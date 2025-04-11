import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let docs = {};

// Load mock doc data
async function loadDocs() {
  try {
    const data = await fs.readFile('./data/docs.json', 'utf-8');
    docs = JSON.parse(data);
    console.log('📚 Docs loaded.');
  } catch (err) {
    console.error('⚠️ Failed to load docs:', err);
  }
}

await loadDocs();

// Simple rule-based logic
function getBotReply(userMessage) {
  const msg = userMessage.toLowerCase();  
  if (msg.includes('sdk')) return docs.sdk;
  if (msg.includes('http')) return docs.http;
  if (msg.includes('version')) return docs.API_Version;
  if (msg.includes('data')) return docs.data;
  if (msg.includes('advance')) return docs.advance;
  if (msg.includes('insig')) return docs.insights;
  if (msg.includes('loyal')) return docs.loyalty;
  if (msg.includes('policy')) return docs.loyalty;
  if (msg.includes('engag')) return docs.engage;
  if (msg.includes('hello')) return docs.hello;
  if (msg.includes('hi')) return docs.hello;
  if (msg.includes('thank')) return docs.thanks;
  if (msg.includes('hey')) return docs.hello;
  if (msg.includes('ok')) return docs.ok;
  if (msg.includes('yes')) return docs.yes;
  if (msg.includes('as')) return docs.asia;
  if (msg.includes('auth')) return docs.authentication;
  if (msg.includes('company')) return docs.create_company;
  if (msg.includes('json') || msg.includes('format')) return docs.api_format;

  return "I'm not sure about that. Please ask about authentication, companies, or API format.";
}

app.post('/chat', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: 'No message received.' });

  const reply = getBotReply(message);
  return res.json({ reply });
});

app.listen(port, () => {
  console.log(`🤖 Chatbot server running at http://localhost:${port}`);
});
