// ai-chatbot.js - IMPROVED VERSION with better understanding
(function() {
    // Smart response system
    function getSmartResponse(userMessage, toolName) {
        const msg = userMessage.toLowerCase().trim();
        
        // Tool name mapping for better matching
        const toolKeywords = {
            'word-to-pdf': ['word', 'docx', 'document', 'microsoft word', 'word file', 'doc to pdf'],
            'pdf-to-word': ['pdf to word', 'pdf to doc', 'extract text', 'edit pdf'],
            'pdf-reader': ['read pdf', 'open pdf', 'view pdf', 'pdf open'],
            'pdf-merger': ['merge', 'combine', 'join pdf', 'multiple pdf'],
            'file-compressor': ['compress', 'reduce size', 'smaller file', 'zip'],
            'video-trimmer': ['trim video', 'cut video', 'video length', 'shorten video'],
            'image-resizer': ['resize image', 'change size', 'dimensions', 'smaller image'],
            'audio-cutter': ['cut audio', 'trim audio', 'audio trim', 'music cut']
        };
        
        // Check if user is asking about current tool
        let isAboutCurrentTool = false;
        const currentToolKeywords = toolKeywords[toolName] || [];
        for (let keyword of currentToolKeywords) {
            if (msg.includes(keyword)) {
                isAboutCurrentTool = true;
                break;
            }
        }
        
        // Greetings
        if (msg.match(/^(hi|hello|hey|namaste|hello there|hi there)/)) {
            return "👋 Namaste! Main aapka AI assistant hoon. Aap is tool ke baare mein kuch bhi pooch sakte hain!";
        }
        
        // Current tool specific help (Word to PDF)
        if (toolName === 'word-to-pdf' || msg.includes('word to pdf') || msg.includes('convert word')) {
            return `📄 **Word to PDF Converter Guide:**

✅ **Kaise use karein:**
1. Apni DOCX file yahan drag karein ya click karein
2. "Convert to PDF" button par click karein
3. Converted PDF automatically download ho jayegi

✨ **Features:**
• Formatting same rahegi (fonts, tables, images)
• File size limit: 20MB
• 100% secure - browser mein hi kaam hota hai
• FREE - koi payment nahi

❓ Koi specific problem? Bataayein main help karunga!`;
        }
        
        // PDF to Word
        if (toolName === 'pdf-to-word' || msg.includes('pdf to word')) {
            return `📝 **PDF to Word Converter Guide:**

**Steps:**
1. PDF file upload karein
2. "Convert to Word" click karein
3. Editable Word file download karein

**Benefits:**
• Text editable ho jayega
• Images preserve hongi
• Formatting maintain rahegi
• No signup required!`;
        }
        
        // File upload help
        if (msg.includes('upload') || msg.includes('file select') || msg.includes('kaise upload')) {
            return `📤 **File Upload Karne Ka Tarika:**

• File par click karein
• Ya phir file ko drag karke drop karein (drag & drop)
• Browse kar ke select karein

**Note:** Max file size 20MB hai. Agar file badi hai toh pehle compress karein.`;
        }
        
        // Error handling
        if (msg.includes('error') || msg.includes('not working') || msg.includes('problem') || msg.includes('nahi ho raha')) {
            return `⚠️ **Troubleshooting Guide:**

Common issues aur solutions:

1. **File upload nahi ho rahi:**
   → Check karein file size 20MB se chhoti hai
   → File format sahi hai (DOCX for Word to PDF)

2. **Convert button kaam nahi kar raha:**
   → Page refresh karein (F5)
   → Browser cache clear karein

3. **Download nahi ho rahi:**
   → Popup blocker disable karein
   → Dobara convert try karein

Agar problem continue hoti hai toh browser change karke try karein (Chrome recommended).`;
        }
        
        // Privacy & Security
        if (msg.includes('privacy') || msg.includes('secure') || msg.includes('safety') || msg.includes('safe') || msg.includes('private')) {
            return `🔒 **Privacy & Security:**

✅ **100% Secure!**
• Aapki files kabhi bhi humare server par upload nahi hoti
• Saara processing aapke browser mein hota hai (client-side)
• Koi data stored nahi kiya jaata
• Files automatically delete ho jaati hain after conversion

✅ **No Tracking**
• Koi personal info nahi maangte
• No cookies for tracking
• Anonymous usage

Aap bilkul safe rahenge! 👍`;
        }
        
        // Pricing
        if (msg.includes('price') || msg.includes('cost') || msg.includes('free') || msg.includes('payment') || msg.includes('paid')) {
            return `💰 **Pricing Information:**

🎉 **SAB KUCH FREE HAI!**

• 100% Free - Koi payment nahi
• No subscription
• No hidden charges
• No credit card required
• Unlimited conversions

Humesha free! Koi tension nahi. 😊`;
        }
        
        // How to use general
        if (msg.includes('how to') || msg.includes('kaise') || msg.includes('process') || msg.includes('steps')) {
            return `📌 **General Steps:**

1️⃣ Select / Upload - Apni file choose karein
2️⃣ Convert - Convert button par click karein  
3️⃣ Download - Converted file save karein

Simple! Koi technical knowledge nahi chahiye.`;
        }
        
        // Time estimate
        if (msg.includes('time') || msg.includes('kitna time') || msg.includes('fast')) {
            return `⏱️ **Processing Time:**

• Small files (<1MB): 2-3 seconds
• Medium files (1-10MB): 5-10 seconds
• Large files (10-20MB): 15-20 seconds

Fast hai! Internet speed par bhi depend karta hai.`;
        }
        
        // Quality question
        if (msg.includes('quality') || msg.includes('sharpness') || msg.includes('resolution')) {
            return `✨ **Output Quality:**

• Original quality preserve hoti hai
• No compression loss
• High resolution maintain
• Formatting exactly same rahegi

Quality compromise nahi karte! 🎯`;
        }
        
        // Supported formats
        if (msg.includes('format') || msg.includes('supported') || msg.includes('file type')) {
            return `📁 **Supported File Formats:**

**Current Tool:** ${toolName.replace('-', ' ').toUpperCase()}

**General:** PDF, DOCX, JPG, PNG, MP4, MP3

Specific format ke liye relevant tool select karein!`;
        }
        
        // Thanks/Welcome
        if (msg.includes('thank') || msg.includes('thanks') || msg.includes('dhanyavad') || msg.includes('shukriya')) {
            return `🙏 Aapka swagat hai! Happy to help!

Koi aur sawaal ho toh pooch lijiye. Main yahan hoon aapki help karne ke liye. 😊`;
        }
        
        // Default response with menu
        return `🤔 **Main samajh gaya aap pooch rahe hain: "${userMessage}"**

Kya aap poochna chahte hain:

💬 **"help"** - Tool use kaise karein
🔒 **"privacy"** - Security ke baare mein
💰 **"free"** - Pricing ke baare mein
⚠️ **"error"** - Problems solve karne ke liye
📤 **"upload"** - File upload kaise karein

Ya phir apna sawaal clear karke likhein, main zaroor help karunga! 🌟`;
    }
    
    // Get tool name from URL
    function getCurrentTool() {
        const url = window.location.href.toLowerCase();
        if (url.includes('word-to-pdf')) return 'word-to-pdf';
        if (url.includes('pdf-to-word')) return 'pdf-to-word';
        if (url.includes('pdf-reader')) return 'pdf-reader';
        if (url.includes('pdf-merger')) return 'pdf-merger';
        if (url.includes('file-compressor')) return 'file-compressor';
        if (url.includes('video-trimmer')) return 'video-trimmer';
        if (url.includes('image-resizer')) return 'image-resizer';
        if (url.includes('audio-cutter')) return 'audio-cutter';
        return 'default';
    }
    
    // Create and inject chatbot
    function createChatbot() {
        const toolName = getCurrentTool();
        
        // Welcome message based on tool
        let welcomeMessage = "👋 Hello! Main AI Assistant hoon. Aap is tool ke baare mein kuch bhi pooch sakte hain!";
        if (toolName === 'word-to-pdf') {
            welcomeMessage = "📄 **Word to PDF Assistant here!** \n\nMain aapko bata sakta hoon kaise Word file ko PDF mein convert karein. \n\n• Upload karein DOCX file\n• Convert button click karein  \n• PDF download ho jayegi\n\nKoi problem? Bus poochiye! 😊";
        } else if (toolName === 'pdf-to-word') {
            welcomeMessage = "📝 **PDF to Word Assistant!** \n\nPDF ko editable Word document mein convert karein. \n\nKoi sawaal? 'help' likhein!";
        }
        
        const chatbotHTML = `
            <div id="ai-chatbot-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <!-- Chat Button -->
                <div id="chatbot-toggle" style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; transition: all 0.3s ease;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                </div>
                
                <!-- Chat Window -->
                <div id="chatbot-window" style="display: none; position: absolute; bottom: 80px; right: 0; width: 380px; height: 550px; background: white; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); display: flex; flex-direction: column; overflow: hidden;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="font-size: 16px;">🤖 AI Assistant</strong>
                            <div style="font-size: 11px; opacity: 0.9; margin-top: 2px;">● Online | Free Help</div>
                        </div>
                        <div id="chatbot-close" style="cursor: pointer; font-size: 24px; line-height: 1;">&times;</div>
                    </div>
                    
                    <!-- Messages -->
                    <div id="chatbot-messages" style="flex: 1; overflow-y: auto; padding: 16px; background: #f7f9fc;">
                        <div style="margin-bottom: 12px; display: flex; justify-content: flex-start;">
                            <div style="background: #e8eef5; color: #1a1a1a !important; padding: 12px; border-radius: 12px; max-width: 85%; font-size: 14px; line-height: 1.5; white-space: pre-line;">
                                ${welcomeMessage}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Suggestions -->
                    <div style="padding: 8px 12px; background: #f7f9fc; border-top: 1px solid #e2e8f0; display: flex; gap: 8px; flex-wrap: wrap;">
                        <button class="quick-btn" data-msg="help" style="background: #edf2f7; border: none; padding: 5px 12px; border-radius: 20px; font-size: 12px; cursor: pointer; color: #4a5568;">❓ Help</button>
                        <button class="quick-btn" data-msg="how to use" style="background: #edf2f7; border: none; padding: 5px 12px; border-radius: 20px; font-size: 12px; cursor: pointer; color: #4a5568;">📖 How to use</button>
                        <button class="quick-btn" data-msg="privacy" style="background: #edf2f7; border: none; padding: 5px 12px; border-radius: 20px; font-size: 12px; cursor: pointer; color: #4a5568;">🔒 Privacy</button>
                        <button class="quick-btn" data-msg="error not working" style="background: #edf2f7; border: none; padding: 5px 12px; border-radius: 20px; font-size: 12px; cursor: pointer; color: #4a5568;">⚠️ Error</button>
                    </div>
                    
                    <!-- Input Area -->
                    <div style="padding: 12px; background: white; border-top: 1px solid #e2e8f0; display: flex; gap: 10px;">
                        <input type="text" id="chatbot-input" placeholder="Apna sawaal likhein... (Hindi/English)" style="flex: 1; padding: 10px 14px; border: 1px solid #cbd5e0; border-radius: 24px; outline: none; font-size: 14px; color: #1a1a1a !important; background: white;" autocomplete="off">
                        <button id="chatbot-send" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 8px 22px; border-radius: 24px; cursor: pointer; font-weight: 600; font-size: 14px;">Send</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        
        // CSS to ensure black text everywhere
        const style = document.createElement('style');
        style.textContent = `
            #chatbot-messages div div {
                color: #1a1a1a !important;
            }
            #chatbot-input {
                color: #1a1a1a !important;
            }
            #chatbot-input::placeholder {
                color: #a0aec0 !important;
            }
            .quick-btn:hover {
                background: #e2e8f0 !important;
            }
        `;
        document.head.appendChild(style);
        
        // Setup event listeners
        const toggleBtn = document.getElementById('chatbot-toggle');
        const chatWindow = document.getElementById('chatbot-window');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const inputField = document.getElementById('chatbot-input');
        const messagesDiv = document.getElementById('chatbot-messages');
        
        toggleBtn.addEventListener('click', () => {
            if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
                chatWindow.style.display = 'flex';
                toggleBtn.style.transform = 'scale(0.95)';
                setTimeout(() => toggleBtn.style.transform = 'scale(1)', 200);
            } else {
                chatWindow.style.display = 'none';
            }
        });
        
        closeBtn.addEventListener('click', () => {
            chatWindow.style.display = 'none';
        });
        
        // Quick suggestion buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const msg = btn.getAttribute('data-msg');
                inputField.value = msg;
                sendMessage();
            });
        });
        
        function addMessage(text, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.style.marginBottom = '12px';
            messageDiv.style.display = 'flex';
            messageDiv.style.justifyContent = isUser ? 'flex-end' : 'flex-start';
            
            const bubble = document.createElement('div');
            bubble.style.backgroundColor = isUser ? '#667eea' : '#e8eef5';
            bubble.style.color = isUser ? 'white' : '#1a1a1a';
            bubble.style.padding = '12px';
            bubble.style.borderRadius = '12px';
            bubble.style.maxWidth = '85%';
            bubble.style.fontSize = '14px';
            bubble.style.lineHeight = '1.5';
            bubble.style.whiteSpace = 'pre-line';
            bubble.textContent = text;
            
            if (!isUser) {
                bubble.style.backgroundColor = '#e8eef5';
                bubble.style.color = '#1a1a1a';
            }
            
            messageDiv.appendChild(bubble);
            messagesDiv.appendChild(messageDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
        
        async function sendMessage() {
            const message = inputField.value.trim();
            if (!message) return;
            
            addMessage(message, true);
            inputField.value = '';
            
            // Show typing indicator
            const typingDiv = document.createElement('div');
            typingDiv.style.marginBottom = '12px';
            typingDiv.style.display = 'flex';
            typingDiv.style.justifyContent = 'flex-start';
            typingDiv.innerHTML = '<div style="background: #e8eef5; color: #718096; padding: 8px 12px; border-radius: 12px; font-size: 12px;">🤔 Typing...</div>';
            messagesDiv.appendChild(typingDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            
            // Get response
            setTimeout(() => {
                typingDiv.remove();
                const response = getSmartResponse(message, getCurrentTool());
                addMessage(response, false);
            }, 600);
        }
        
        sendBtn.addEventListener('click', sendMessage);
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createChatbot);
    } else {
        createChatbot();
    }
})();
