// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: 'You are a helpful wedding planner assistant for Wedwise.ai' },
          { role: 'user', content: userMessage }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Groq API error:', error.message);
    res.status(500).json({ reply: "Sorry, something went wrong while talking to the assistant." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
