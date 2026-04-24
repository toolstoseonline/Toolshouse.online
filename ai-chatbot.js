<!-- AI Assistant Script - ToolsHouse -->
<!-- Is code ko index.html ke <body> tag ke end mein lagayein -->

<style>
  /* AI Assistant Styles - Black Text Version */
  #ai-assistant-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    transition: transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  #ai-assistant-btn:hover {
    transform: scale(1.1);
  }
  
  #ai-assistant-btn svg {
    width: 30px;
    height: 30px;
    fill: white;
  }
  
  #ai-chat-window {
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 350px;
    height: 500px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    display: none;
    flex-direction: column;
    z-index: 9998;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow: hidden;
  }
  
  #ai-chat-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  #ai-chat-header h3 {
    margin: 0;
    font-size: 16px;
  }
  
  #ai-close-chat {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
  }
  
  #ai-messages {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    background: #f8f9fa;
  }
  
  .ai-message {
    margin-bottom: 12px;
    padding: 10px 12px;
    border-radius: 12px;
    max-width: 85%;
    word-wrap: break-word;
    font-size: 14px;
    line-height: 1.4;
  }
  
  .ai-message.bot {
    background: white;
    color: #1a1a1a;
    border: 1px solid #e0e0e0;
  }
  
  .ai-message.user {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    margin-left: auto;
  }
  
  #ai-input-area {
    display: flex;
    padding: 12px;
    background: white;
    border-top: 1px solid #e0e0e0;
  }
  
  #ai-user-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 14px;
    outline: none;
  }
  
  #ai-send-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    color: white;
    padding: 8px 16px;
    margin-left: 8px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    #ai-chat-window {
      width: calc(100% - 40px);
      right: 20px;
      left: 20px;
    }
  }
  
  .typing-indicator {
    display: flex;
    gap: 4px;
    padding: 8px 12px;
  }
  
  .typing-indicator span {
    width: 6px;
    height: 6px;
    background: #999;
    border-radius: 50%;
    animation: typing 1.4s infinite;
  }
  
  .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
  .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
  
  @keyframes typing {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-8px); opacity: 1; }
  }
</style>

<div id="ai-assistant-btn">
  <svg viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98 1.02 4.28L2 22l5.72-1.02C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.43 0-2.8-.38-3.98-1.04L6.5 19.5l1.54-1.52C7.38 17.2 6 15.43 6 13c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6z"/>
  </svg>
</div>

<div id="ai-chat-window">
  <div id="ai-chat-header">
    <h3>🤖 ToolsHouse AI Assistant</h3>
    <button id="ai-close-chat">×</button>
  </div>
  <div id="ai-messages">
    <div class="ai-message bot">
      👋 Hello! Main ToolsHouse AI Assistant hoon. Aap mujhse kisi bhi tool ke baare mein pooch sakte hain. Jaise:
      <br><br>
      • "Word to PDF kaise use karein?"
      • "PDF merge kaise karein?"
      • "Image resize kaise karein?"
    </div>
  </div>
  <div id="ai-input-area">
    <input type="text" id="ai-user-input" placeholder="Apna sawaal likhein...">
    <button id="ai-send-btn">Send</button>
  </div>
</div>

<script>
  // Tools Database - Aapke saare tools ki information
  const toolsDatabase = {
    // PDF Tools
    'word to pdf': 'Word to PDF converter aapko DOCX file ko PDF mein badalne deta hai. Bas file upload karein, convert button dabayein, aur download karein. Processing aapke browser mein hoti hai, file server par nahi jaati.',
    'pdf to word': 'PDF to Word converter se aap PDF file ko editable Word document mein convert kar sakte hain. Formatting preserve hoti hai.',
    'pdf reader': 'PDF Reader se aap directly browser mein PDF file open aur read kar sakte hain. Koi software install karne ki zaroorat nahi.',
    'pdf merger': 'PDF Merger se multiple PDF files ko ek single document mein merge kar sakte hain. Bas files select karein aur merge karein.',
    'pdf compressor': 'PDF Compressor se PDF file ka size reduce kar sakte hain bina quality khoye.',
    'file compressor': 'File Compressor se ZIP/RAR files compress kar sakte hain. File size kam karne mein helpful hai.',
    'file splitter': 'File Splitter se large files ko chhote parts mein divide kar sakte hain.',
    'file converter': 'File Converter se different file formats convert kar sakte hain.',
    'pdf to powerpoint': 'PDF to PowerPoint se PDF ko editable PPTX mein convert karta hai.',
    'edit pdf': 'Edit PDF tool se PDF mein text, images aur pages modify kar sakte hain.',
    'powerpoint to pdf': 'PowerPoint to PDF se PPT/PPTX files ko PDF mein convert karta hai.',
    'pdf to jpg': 'PDF to JPG se PDF pages ko images mein convert karta hai.',
    'jpg to pdf': 'JPG to PDF se multiple images ko ek PDF file mein combine karta hai.',
    'pdf converter': 'PDF Converter se kisi bhi file ko PDF mein badal sakte hain.',
    'pdf repair': 'PDF Repair se corrupted PDF files ko fix karta hai.',
    'pdf page': 'PDF Page Number tool se PDF mein page numbers add kar sakte hain.',
    'pdf redact': 'PDF Redact se sensitive information ko permanently blackout kar sakte hain.',
    'ocr pdf': 'OCR PDF se scanned documents ko searchable aur editable text mein convert karta hai.',
    
    // Image Tools
    'image converter': 'Image Converter se images ko different formats (JPG, PNG, WebP etc.) mein convert kar sakte hain.',
    'collage maker': 'Collage Maker se multiple photos ka creative collage bana sakte hain.',
    'image resizer': 'Image Resizer se photos ka size adjust kar sakte hain. Dimensions aur file size dono control kar sakte hain.',
    'filter effects': 'Filter Effects se photos par Instagram-like filters apply kar sakte hain.',
    'photo retouch': 'Photo Retouch tool se images edit kar sakte hain, blemishes remove kar sakte hain.',
    'image enhancer': 'Image Enhancer se photo ki quality improve karta hai. Brightness, contrast, sharpness adjust karta hai.',
    'meme generator': 'Meme Generator se funny memes bana sakte hain. Text add karein aur download karein.',
    
    // Video Tools
    'video trimmer': 'Video Trimmer se video clips ko cut aur trim kar sakte hain.',
    'speed controller': 'Speed Controller se video ki playback speed badha ya ghati sakte hain.',
    'subtitle adder': 'Subtitle Adder se videos mein subtitles add kar sakte hain.',
    'video compressor': 'Video Compressor se video file ka size reduce karta hai.',
    'video reverser': 'Video Reverser se video ko reverse play karta hai.',
    'video rotator': 'Video Rotator se video ko rotate ya flip kar sakte hain.',
    
    // Audio Tools
    'audio cutter': 'Audio Cutter se audio clips ko trim aur cut kar sakte hain.',
    'audio merger': 'Audio Merger se multiple audio files ko ek mein merge karta hai.',
    'mp3 converter': 'MP3 Converter se audio files ko MP3 format mein convert karta hai.',
    'voice recorder': 'Voice Recorder se directly browser mein audio record kar sakte hain.',
    
    // Calculator Tools
    'gst calculator': 'GST Calculator se GST amount calculate kar sakte hain. Original price aur GST percentage daalein.',
    'currency converter': 'Currency Converter se real-time exchange rates ke saath currency convert kar sakte hain.',
    'loan calculator': 'Loan Calculator se EMI, interest aur loan tenure calculate kar sakte hain.',
    'age calculator': 'Age Calculator se date of birth ke basis par exact age calculate karta hai.',
    'compound interest': 'Compound Interest Calculator se investment returns calculate kar sakte hain.',
    
    // AI & Dev Tools
    'ai voiceover': 'AI Voiceover se text ko natural-sounding voice mein convert kar sakte hain.',
    'password generator': 'Password Generator se strong aur secure passwords generate karta hai.',
    'qr generator': 'QR Generator se text, URL ya any information ka QR code bana sakte hain.',
    'excel to pdf': 'Excel to PDF se Excel files ko PDF mein convert karta hai formatting ke saath.',
    
    // General Questions
    'free': 'Ji haan, ToolsHouse ke saare tools 100% free hain. Koi hidden charges nahi, koi subscription nahi. Aap unlimited tools use kar sakte hain.',
    'signup': 'Nahi, aapko koi account banane ya signup karne ki zaroorat nahi hai. Sab tools instantly use kar sakte hain.',
    'safe': 'Haan, saare tools safe hain. File processing aapke browser mein hoti hai (client-side). Files server par upload nahi hoti, isliye aapki privacy fully protected hai.',
    'mobile': 'Haan, saare tools fully mobile-friendly hain. Android, iPhone, tablet aur desktop sab par kaam karte hain.',
  };
  
  // Get current page tool name
  function getCurrentTool() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    
    // Convert filename to tool name
    let toolName = filename.replace(/-/g, ' ');
    
    // Special mappings
    const mappings = {
      'word to pdf converter': 'word to pdf',
      'pdf to word converter': 'pdf to word',
      'pdf reader': 'pdf reader',
      'pdf merger': 'pdf merger',
      'file compressor': 'file compressor',
      'pdf compressor': 'pdf compressor'
    };
    
    return mappings[toolName] || toolName;
  }
  
  // AI Response function (using fallback mode - API key not exposed)
  function getAIResponse(userMessage) {
    userMessage = userMessage.toLowerCase();
    let response = null;
    
    // Check for specific tool queries
    for (const [keyword, answer] of Object.entries(toolsDatabase)) {
      if (userMessage.includes(keyword)) {
        response = answer;
        break;
      }
    }
    
    if (response) {
      return response;
    }
    
    // Default responses based on question type
    if (userMessage.includes('how to use') || userMessage.includes('kaise use')) {
      const currentTool = getCurrentTool();
      const toolAnswer = toolsDatabase[currentTool];
      if (toolAnswer) {
        return toolAnswer;
      }
      return `Is tool ko use karne ke liye: 
1. File upload karein ya input daalein
2. Process/Convert button dabayein
3. Result download karein
Sab kuch aapke browser mein secure hota hai.`;
    }
    
    if (userMessage.includes('price') || userMessage.includes('cost') || userMessage.includes('kitne paise')) {
      return 'ToolsHouse ke saare tools 100% FREE hain! Koi payment nahi, koi subscription nahi, koi hidden charges nahi. Aap as many tools as you want use kar sakte hain completely free mein.';
    }
    
    if (userMessage.includes('security') || userMessage.includes('safety') || userMessage.includes('safe')) {
      return 'Haan, bilkul safe! Aapki files server par upload nahi hoti. Saara processing aapke browser mein (client-side) hota hai. Isliye aapki data fully private aur secure rehti hai.';
    }
    
    if (userMessage.includes('mobile') || userMessage.includes('phone')) {
      return 'Haan, saare tools mobile-friendly hain. Aap apne phone ya tablet se bhi comfortably use kar sakte hain. Koi app install karne ki zaroorat nahi.';
    }
    
    return `Main aapki madad kar sakta hoon. Aap mujhse pooch sakte hain:
• Kisi specific tool ke baare mein (jaise "PDF merger kaise use karein")
• Pricing ke baare mein ("ye free hai?")
• Security ke baare mein ("ye safe hai?")
• Ya kisi bhi tool ke features ke baare mein

Aap currently ${getCurrentTool().replace(/-/g, ' ').toUpperCase()} tool par hain. Kya aap iske baare mein kuch poochna chahenge?`;
  }
  
  // DOM Elements
  const chatBtn = document.getElementById('ai-assistant-btn');
  const chatWindow = document.getElementById('ai-chat-window');
  const closeBtn = document.getElementById('ai-close-chat');
  const sendBtn = document.getElementById('ai-send-btn');
  const userInput = document.getElementById('ai-user-input');
  const messagesDiv = document.getElementById('ai-messages');
  
  // Toggle chat window
  chatBtn.onclick = () => {
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
  };
  
  closeBtn.onclick = () => {
    chatWindow.style.display = 'none';
  };
  
  // Add message to chat
  function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${isUser ? 'user' : 'bot'}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  
  // Show typing indicator
  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-message bot';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    messagesDiv.appendChild(typingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  
  function removeTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
  }
  
  // Send message
  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    addMessage(message, true);
    userInput.value = '';
    showTyping();
    
    // Simulate AI thinking
    setTimeout(() => {
      removeTyping();
      const response = getAIResponse(message);
      addMessage(response, false);
    }, 500);
  }
  
  sendBtn.onclick = sendMessage;
  userInput.onkeypress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };
  
  // Auto-show welcome message on page load
  console.log('🤖 AI Assistant Loaded - ToolsHouse');
</script>
