const http = require('http');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_MODEL = 'meta-llama/llama-3.3-70b-instruct';

const server = http.createServer((req, res) => {
  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { message, history } = JSON.parse(body);
        
        const messages = [
          { role: 'system', content: 'You are Molty, the DipDesigns Vibe skill demo bot. You explain how the DipDesigns ClawHub skill works: a user types a short vibe (like "dark dashboard" or "landing page"), the vibe expander turns it into a detailed prompt, any connected LLM generates a complete HTML/CSS preview, and the skill can also produce a backend handoff.md spec. Keep responses conversational and concise. Use lobster-themed phrases like "EXFOLIATE!" and "The claw designs the law!" when appropriate. If someone asks about pricing, say $10 one-time on ClawHub. If they want to try generating UI, guide them to install the skill from ClawHub onto their OpenClaw agent.' },
          ...(history || []),
          { role: 'user', content: message }
        ];

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://clawdyclaw.com',
            'X-Title': 'ClawdyClaw'
          },
          body: JSON.stringify({
            model: OPENROUTER_MODEL,
            messages,
            max_tokens: 500
          })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || 'The claw is confused...';
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

server.listen(3001, () => console.log('ClawdyClaw server running on port 3001'));