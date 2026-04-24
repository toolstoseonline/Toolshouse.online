<!-- AI CHATBOT FOR TOOLSHOUSE -->
<div id="ai-chatbot-widget" style="position: fixed; bottom: 20px; right: 20px; width: 380px; height: 600px; background: white; border-radius: 12px; box-shadow: 0 5px 40px rgba(0,0,0,0.16); display: flex; flex-direction: column; z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
  
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px 12px 0 0; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <h3 style="margin: 0; font-size: 18px; font-weight: 600;">ToolsHouse AI</h3>
      <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Ask about our tools</p>
    </div>
    <button id="chatbot-close-btn" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; padding: 0; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">✕</button>
  </div>

  <!-- Chat Messages Area -->
  <div id="chatbot-messages" style="flex: 1; overflow-y: auto; padding: 20px; background: #f8f9fa;">
    <div style="text-align: center; color: #666; font-size: 14px;">
      <p>👋 Hello! I'm the ToolsHouse AI Assistant</p>
      <p style="font-size: 12px; color: #999;">Ask me anything about our PDF converters, image editors, video tools, calculators, and more!</p>
    </div>
  </div>

  <!-- Input Area -->
  <div style="padding: 15px; border-top: 1px solid #e0e0e0; background: white; border-radius: 0 0 12px 12px;">
    <div style="display: flex; gap: 10px;">
      <input id="chatbot-input" type="text" placeholder="Ask about our tools..." style="flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 24px; outline: none; font-size: 14px; color: #000;" />
      <button id="chatbot-send-btn" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; transition: transform 0.2s;">📤</button>
    </div>
    <div id="chatbot-loading" style="display: none; margin-top: 10px; text-align: center;">
      <p style="color: #999; font-size: 12px;">⏳ Thinking...</p>
    </div>
  </div>
</div>

<!-- Floating Button (when chatbot is closed) -->
<button id="chatbot-floating-btn" style="position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 50%; cursor: pointer; font-size: 28px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); z-index: 9998; transition: transform 0.2s;" title="Chat with AI">💬</button>

<script>
(function() {
  'use strict';

  const GEMINI_API_KEY = 'AIzaSyBK80xhpJcY37btHRG29Dnq5YHr0InyrG4';
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  // DOM Elements
  const chatWidget = document.getElementById('ai-chatbot-widget');
  const messagesDiv = document.getElementById('chatbot-messages');
  const inputField = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send-btn');
  const closeBtn = document.getElementById('chatbot-close-btn');
  const floatingBtn = document.getElementById('chatbot-floating-btn');
  const loadingDiv = document.getElementById('chatbot-loading');

  // ToolsHouse Tools Database
  const toolsDatabase = {
    pdf: {
      name: 'PDF Tools',
      tools: [
        { name: 'Word to PDF', url: '/word-to-pdf-converter.html', desc: 'Convert Word documents to PDF' },
        { name: 'PDF to Word', url: '/pdf-to-word-converter.html', desc: 'Convert PDF to Word documents' },
        { name: 'PDF Reader', url: '/pdf-reader.html', desc: 'Read PDF files in browser' },
        { name: 'PDF Merger', url: '/pdf-merger.html', desc: 'Merge multiple PDFs into one' },
        { name: 'PDF Compressor', url: '/file-compressor.html', desc: 'Reduce PDF file size' },
        { name: 'PDF to PowerPoint', url: '/pdf-to-powerpoint.html', desc: 'Convert PDF to PowerPoint' },
        { name: 'PowerPoint to PDF', url: '/powerpoint-to-pdf.html', desc: 'Convert PowerPoint to PDF' },
        { name: 'Edit PDF', url: '/edit-pdf.html', desc: 'Edit PDFs online' },
        { name: 'PDF to JPG', url: '/pdf-to-jpg.html', desc: 'Extract images from PDF' },
        { name: 'JPG to PDF', url: '/jpg-to-pdf.html', desc: 'Combine images into PDF' },
        { name: 'PDF Repair', url: '/pdf-repair.html', desc: 'Fix corrupted PDFs' },
        { name: 'OCR PDF', url: '/ocr-pdf.html', desc: 'Convert scanned PDFs to text' },
        { name: 'PDF Redact', url: '/pdf-redact.html', desc: 'Remove sensitive info from PDF' },
      ]
    },
    image: {
      name: 'Image Tools',
      tools: [
        { name: 'Image Converter', url: '/image-converter.html', desc: 'Convert JPG, PNG, WEBP formats' },
        { name: 'Image Resizer', url: '/image-resizer.html', desc: 'Resize images to any dimension' },
        { name: 'Collage Maker', url: '/collage-maker.html', desc: 'Create photo collages' },
        { name: 'Filter & Effects', url: '/filter-effects.html', desc: 'Add Instagram-like filters' },
        { name: 'Photo Retouch', url: '/photo-retouch.html', desc: 'Enhance portrait photos' },
        { name: 'Image Enhancer', url: '/image-enhancer.html', desc: 'Upscale and sharpen images' },
        { name: 'Meme Generator', url: '/meme-generator.html', desc: 'Create funny memes' },
      ]
    },
    video: {
      name: 'Video Tools',
      tools: [
        { name: 'Video Trimmer', url: '/video-trimmer.html', desc: 'Trim and cut video segments' },
        { name: 'Video Speed Controller', url: '/speed-controller.html', desc: 'Speed up or slow down videos' },
        { name: 'Subtitle Adder', url: '/subtitle-adder.html', desc: 'Add subtitles to videos' },
        { name: 'Video Compressor', url: '/video-compressor.html', desc: 'Reduce video file size' },
        { name: 'Video Reverser', url: '/video-reverser.html', desc: 'Reverse videos' },
        { name: 'Video Rotator', url: '/video-rotator.html', desc: 'Rotate videos 90°, 180°, 270°' },
      ]
    },
    audio: {
      name: 'Audio Tools',
      tools: [
        { name: 'Audio Cutter', url: '/audio-cutter.html', desc: 'Cut and trim audio files' },
        { name: 'Audio Merger', url: '/audio-merger.html', desc: 'Merge multiple audio files' },
        { name: 'MP3 Converter', url: '/mp3-converter.html', desc: 'Convert to MP3 format' },
        { name: 'Voice Recorder', url: '/voice-recorder.html', desc: 'Record voice online' },
      ]
    },
    calculator: {
      name: 'Calculator & Financial Tools',
      tools: [
        { name: 'GST Calculator', url: '/gst-calculator.html', desc: 'Calculate GST instantly' },
        { name: 'Currency Converter', url: '/currency-converter.html', desc: 'Convert currencies with live rates' },
        { name: 'Loan Calculator', url: '/loan-calculator.html', desc: 'Calculate loan EMI' },
        { name: 'Age Calculator', url: '/age-calculator.html', desc: 'Calculate exact age' },
        { name: 'Compound Interest', url: '/compound-interest.html', desc: 'Calculate investment growth' },
      ]
    },
    ai: {
      name: 'AI & Dev Tools',
      tools: [
        { name: 'AI Voiceover', url: '/ai-voiceover.html', desc: 'Text to speech converter' },
        { name: 'Password Generator', url: '/password-generator.html', desc: 'Generate secure passwords' },
        { name: 'QR Code Generator', url: '/qr-generator.html', desc: 'Create QR codes' },
      ]
    },
    file: {
      name: 'File Tools',
      tools: [
        { name: 'File Compressor', url: '/file-compressor.html', desc: 'Compress files (ZIP/RAR)' },
        { name: 'File Splitter', url: '/file-splitter.html', desc: 'Split large files' },
        { name: 'File Converter', url: '/file-converter.html', desc: 'Convert file formats' },
        { name: 'Excel to PDF', url: '/excel-to-pdf.html', desc: 'Convert Excel to PDF' },
      ]
    }
  };

  let chatHistory = [];

  // Initialize
  function init() {
    chatWidget.style.display = 'none';
    floatingBtn.style.display = 'flex';
    
    floatingBtn.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closeChat);
    sendBtn.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  function openChat() {
    chatWidget.style.display = 'flex';
    floatingBtn.style.display = 'none';
    inputField.focus();
  }

  function closeChat() {
    chatWidget.style.display = 'none';
    floatingBtn.style.display = 'flex';
  }

  function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.style.marginBottom = '15px';
    messageDiv.style.display = 'flex';
    messageDiv.style.justifyContent = isUser ? 'flex-end' : 'flex-start';

    const bubble = document.createElement('div');
    bubble.style.maxWidth = '85%';
    bubble.style.padding = '12px 15px';
    bubble.style.borderRadius = '18px';
    bubble.style.fontSize = '14px';
    bubble.style.lineHeight = '1.4';
    bubble.style.color = isUser ? 'white' : '#000';
    bubble.style.background = isUser ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e9ecef';
    bubble.style.wordWrap = 'break-word';
    
    bubble.textContent = text;
    messageDiv.appendChild(bubble);
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function addToolSuggestions(category) {
    if (!toolsDatabase[category]) return;
    
    const tools = toolsDatabase[category].tools;
    const suggestionDiv = document.createElement('div');
    suggestionDiv.style.marginBottom = '15px';
    suggestionDiv.style.marginTop = '10px';

    const title = document.createElement('p');
    title.textContent = toolsDatabase[category].name;
    title.style.fontSize = '13px';
    title.style.fontWeight = '600';
    title.style.margin = '0 0 10px 0';
    title.style.color = '#333';
    suggestionDiv.appendChild(title);

    tools.forEach(tool => {
      const btn = document.createElement('button');
      btn.textContent = `📌 ${tool.name}`;
      btn.style.display = 'block';
      btn.style.width = '100%';
      btn.style.padding = '10px';
      btn.style.marginBottom = '8px';
      btn.style.border = '1px solid #ddd';
      btn.style.borderRadius = '8px';
      btn.style.background = 'white';
      btn.style.color = '#000';
      btn.style.cursor = 'pointer';
      btn.style.fontSize = '13px';
      btn.style.transition = 'all 0.2s';
      btn.style.textAlign = 'left';

      btn.onmouseover = () => {
        btn.style.background = '#f0f0f0';
        btn.style.borderColor = '#667eea';
      };
      btn.onmouseout = () => {
        btn.style.background = 'white';
        btn.style.borderColor = '#ddd';
      };

      btn.onclick = () => {
        window.location.href = tool.url;
      };

      suggestionDiv.appendChild(btn);
    });

    messagesDiv.appendChild(suggestionDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  async function sendMessage() {
    const userMessage = inputField.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, true);
    inputField.value = '';
    loadingDiv.style.display = 'block';

    try {
      // Add to chat history
      chatHistory.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      // Prepare system prompt
      const systemPrompt = `You are ToolsHouse AI, a helpful assistant for the ToolsHouse online tools website. 
ToolsHouse offers 100+ free online tools including:
- PDF Tools: Word to PDF, PDF to Word, PDF Merger, PDF Reader, PDF Compressor, PDF to PowerPoint, Edit PDF, PDF to JPG, JPG to PDF, OCR PDF, PDF Repair, PDF Redact, and more
- Image Tools: Image Converter, Image Resizer, Collage Maker, Photo Filters, Photo Retouch, Image Enhancer, Meme Generator
- Video Tools: Video Trimmer, Speed Controller, Subtitle Adder, Video Compressor, Video Reverser, Video Rotator
- Audio Tools: Audio Cutter, Audio Merger, MP3 Converter, Voice Recorder
- Calculators: GST Calculator, Currency Converter, Loan Calculator, Age Calculator, Compound Interest
- AI Tools: AI Voiceover, Password Generator, QR Code Generator
- File Tools: File Compressor, File Splitter, File Converter, Excel to PDF

Important: When users ask about tools, provide a helpful response about what that tool does. Keep responses concise (under 100 words). Be friendly and professional. Always answer in English with clear, simple language.`;

      const response = await fetch(GEMINI_API_URL + '?key=' + GEMINI_API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system: {
            parts: [{ text: systemPrompt }]
          },
          contents: chatHistory.map(msg => ({
            role: msg.role,
            parts: msg.parts
          })),
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 150,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusCode}`);
      }

      const data = await response.json();
      const aiMessage = data.candidates[0].content.parts[0].text;

      // Add to history
      chatHistory.push({
        role: 'model',
        parts: [{ text: aiMessage }]
      });

      addMessage(aiMessage, false);

      // Show tool suggestions based on keywords
      if (userMessage.toLowerCase().includes('pdf')) {
        addToolSuggestions('pdf');
      } else if (userMessage.toLowerCase().includes('image') || userMessage.toLowerCase().includes('photo')) {
        addToolSuggestions('image');
      } else if (userMessage.toLowerCase().includes('video')) {
        addToolSuggestions('video');
      } else if (userMessage.toLowerCase().includes('audio') || userMessage.toLowerCase().includes('mp3')) {
        addToolSuggestions('audio');
      } else if (userMessage.toLowerCase().includes('calc') || userMessage.toLowerCase().includes('gst') || userMessage.toLowerCase().includes('loan')) {
        addToolSuggestions('calculator');
      } else if (userMessage.toLowerCase().includes('ai') || userMessage.toLowerCase().includes('voice') || userMessage.toLowerCase().includes('password') || userMessage.toLowerCase().includes('qr')) {
        addToolSuggestions('ai');
      } else if (userMessage.toLowerCase().includes('file') || userMessage.toLowerCase().includes('compress') || userMessage.toLowerCase().includes('convert')) {
        addToolSuggestions('file');
      }

    } catch (error) {
      console.error('Error:', error);
      addMessage('Sorry, I encountered an error. Please try again. 🔧', false);
    } finally {
      loadingDiv.style.display = 'none';
    }
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
