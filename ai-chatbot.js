<!-- AI Chatbot Component -->
<div id="aiChatbot" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: Arial, sans-serif;">
    <!-- Chat Button -->
    <button id="chatToggle" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 50px; padding: 12px 20px; color: white; cursor: pointer; font-size: 16px; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.2); display: flex; align-items: center; gap: 8px;">
        💬 AI Help Assistant
    </button>
    
    <!-- Chat Window (Hidden by default) -->
    <div id="chatWindow" style="display: none; position: absolute; bottom: 60px; right: 0; width: 350px; height: 500px; background: white; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); display: flex; flex-direction: column; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 15px; color: white; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <strong>🤖 ToolsHouse AI</strong>
                <div style="font-size: 12px;">Online | Free Support</div>
            </div>
            <button id="closeChat" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">✕</button>
        </div>
        
        <!-- Messages Area -->
        <div id="chatMessages" style="flex: 1; padding: 15px; overflow-y: auto; background: #f8f9fa; color: #000000; font-size: 14px; line-height: 1.5;">
            <div style="background: white; padding: 10px; border-radius: 10px; margin-bottom: 10px; max-width: 85%; box-shadow: 0 1px 2px rgba(0,0,0,0.1); color: #000000;">
                👋 Hello! I'm ToolsHouse AI. Ask me anything about our tools!
            </div>
        </div>
        
        <!-- Input Area -->
        <div style="padding: 15px; background: white; border-top: 1px solid #dee2e6; display: flex; gap: 10px;">
            <input type="text" id="chatInput" placeholder="Type your question..." style="flex: 1; padding: 10px; border: 1px solid #dee2e6; border-radius: 25px; outline: none; font-size: 14px; color: #000000;">
            <button id="sendMessage" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 25px; padding: 10px 20px; color: white; cursor: pointer; font-weight: bold;">Send</button>
        </div>
    </div>
</div>

<script>
// API Key (for production, use environment variable)
const GEMINI_API_KEY = 'AIzaSyBK80xhpJcY37btHRG29Dnq5YHr0InyrG4';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Tool-specific context based on current page
const currentPage = window.location.pathname;
let toolContext = "General PDF and document conversion tools";

// Set context based on page
if (currentPage.includes('word-to-pdf')) toolContext = "Word to PDF converter tool";
else if (currentPage.includes('pdf-to-word')) toolContext = "PDF to Word converter tool";
else if (currentPage.includes('pdf-reader')) toolContext = "PDF reader tool";
else if (currentPage.includes('pdf-merger')) toolContext = "PDF merger tool";
else if (currentPage.includes('file-compressor')) toolContext = "File compressor tool";
else if (currentPage.includes('image')) toolContext = "Image editing tools";
else if (currentPage.includes('video')) toolContext = "Video editing tools";
else if (currentPage.includes('audio')) toolContext = "Audio editing tools";
else if (currentPage.includes('calculator')) toolContext = "Calculator tools";
else toolContext = "Online free tools website";

// DOM Elements
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const closeChat = document.getElementById('closeChat');
const sendBtn = document.getElementById('sendMessage');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

// Toggle chat window
chatToggle.onclick = () => {
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
};
closeChat.onclick = () => {
    chatWindow.style.display = 'none';
};

// Send message function
async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    
    // Add user message to chat
    addMessage(userMessage, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    const typingDiv = addTypingIndicator();
    
    try {
        // Call Gemini API
        const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a helpful assistant for ToolsHouse website. Current tool: ${toolContext}. 
                        Website info: 100+ free online tools, no signup required, privacy-focused (files processed in browser).
                        Answer this user question concisely and helpfully: ${userMessage}`
                    }]
                }]
            })
        });
        
        if (!response.ok) throw new Error('API failed');
        
        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // Remove typing indicator and add response
        typingDiv.remove();
        addMessage(aiResponse, 'ai');
        
    } catch (error) {
        console.error('Error:', error);
        typingDiv.remove();
        // Fallback responses when API fails
        const fallbackResponses = {
            'how to use': 'Simply upload your file, click convert, and download! All tools work directly in your browser.',
            'free': 'Yes! All 100+ tools are completely free. No signup, no credit card needed.',
            'safe': 'Your files are 100% safe! Processing happens in your browser - nothing is uploaded to any server.',
            'default': `I'm here to help! This ${toolContext} is free and easy to use. Just upload your file and follow the instructions.`
        };
        
        let fallbackReply = fallbackResponses.default;
        for (const [key, reply] of Object.entries(fallbackResponses)) {
            if (userMessage.toLowerCase().includes(key)) {
                fallbackReply = reply;
                break;
            }
        }
        addMessage(fallbackReply, 'ai');
    }
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.style.marginBottom = '10px';
    messageDiv.style.display = 'flex';
    messageDiv.style.justifyContent = sender === 'user' ? 'flex-end' : 'flex-start';
    
    const bubble = document.createElement('div');
    bubble.style.maxWidth = '80%';
    bubble.style.padding = '10px';
    bubble.style.borderRadius = '15px';
    bubble.style.backgroundColor = sender === 'user' ? '#667eea' : 'white';
    bubble.style.color = sender === 'user' ? 'white' : '#000000';
    bubble.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';
    bubble.innerText = text;
    
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add typing indicator
function addTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'typing-indicator';
    div.style.marginBottom = '10px';
    div.style.display = 'flex';
    div.style.justifyContent = 'flex-start';
    
    const bubble = document.createElement('div');
    bubble.style.backgroundColor = 'white';
    bubble.style.padding = '10px 15px';
    bubble.style.borderRadius = '15px';
    bubble.style.color = '#000000';
    bubble.innerText = 'Typing...';
    
    div.appendChild(bubble);
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
}

// Event listeners
sendBtn.onclick = sendMessage;
chatInput.onkeypress = (e) => {
    if (e.key === 'Enter') sendMessage();
};
</script>
