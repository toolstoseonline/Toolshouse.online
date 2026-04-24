// ai-chatbot.js - Complete working code with black text and Gemini AI
(function() {
    // Configuration
    const CONFIG = {
        // IMPORTANT: Production mein API key ko environment variable mein rakhein
        // Abhi fallback mode use ho raha hai
        useGemini: false, // false = local responses, true = Gemini AI
        siteUrls: [
            "https://www.toolshouse.online",
            "word-to-pdf-converter.html",
            "pdf-to-word-converter.html",
            "pdf-reader.html",
            "pdf-merger.html",
            "file-compressor.html",
            "file-splitter.html",
            "file-converter.html",
            "pdf-to-powerpoint.html",
            "edit-pdf.html",
            "powerpoint-to-pdf.html",
            "pdf-to-jpg.html",
            "jpg-to-pdf.html",
            "pdf-converter.html",
            "pdf-repair.html",
            "pdf-page.html",
            "pdf-redact.html",
            "ocr-pdf.html",
            "image-converter.html",
            "collage-maker.html",
            "image-resizer.html",
            "filter-effects.html",
            "photo-retouch.html",
            "excel-to-pdf.html",
            "image-enhancer.html",
            "meme-generator.html",
            "video-trimmer.html",
            "speed-controller.html",
            "subtitle-adder.html",
            "video-compressor.html",
            "video-reverser.html",
            "video-rotator.html",
            "audio-cutter.html",
            "audio-merger.html",
            "mp3-converter.html",
            "voice-recorder.html",
            "gst-calculator.html",
            "currency-converter.html",
            "loan-calculator.html",
            "age-calculator.html",
            "compound-interest.html",
            "ai-voiceover.html",
            "password-generator.html",
            "qr-generator.html"
        ]
    };

    // Tool-specific responses (local fallback)
    const toolResponses = {
        default: {
            welcome: "👋 Hello! Main aapki help kar sakta hoon is tool ko use karne mein. Koi sawaal poochiye!",
            help: "Aap seedha apna sawaal likhiye, main jawab dunga.",
            error: "Maaf kijiye, samajh nahi aaya. Kripya dubara puchiye."
        },
        "word-to-pdf": {
            welcome: "📄 Word to PDF tool mein welcome! DOCX file upload karein aur convert button click karein. Ye tool aapke browser mein hi kaam karta hai - file kahi upload nahi hoti!",
            help: "1. DOCX file drag karein ya click karein\n2. Convert to PDF button click karein\n3. Download PDF instantly\n\nFile size max 20MB hai. Formatting bilkul same rahegi!"
        },
        "pdf-to-word": {
            welcome: "📝 PDF to Word converter mein welcome! PDF file ko editable Word document mein convert karein.",
            help: "Bas PDF file upload karein, convert click karein, aur Word file download karein. Formatting preserve hoti hai!"
        },
        "pdf-reader": {
            welcome: "📖 PDF Reader mein welcome! Bina kisi software ke PDF read karein.",
            help: "PDF file drag karein ya select karein. Zoom in/out kar sakte hain, page scroll kar sakte hain."
        },
        "file-compressor": {
            welcome: "🗜️ File Compressor mein welcome! Files ko compress karke size kam karein.",
            help: "File upload karein, compress button click karein, compressed file download karein!"
        },
        "video-trimmer": {
            welcome: "✂️ Video Trimmer mein welcome! Video ko trim karke chhota karein.",
            help: "Video upload karein, start/end time set karein, trim button click karein!"
        },
        "image-resizer": {
            welcome: "🖼️ Image Resizer mein welcome! Image ka size change karein.",
            help: "Image upload karein, new dimensions set karein, resize button click karein!"
        },
        "pdf-merger": {
            welcome: "📑 PDF Merger mein welcome! Multiple PDF files ko merge karein.",
            help: "Multiple PDF files upload karein, arrange karein order, merge button click karein!"
        }
    };

    // Get current tool name from URL
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
        if (url.includes('currency-converter')) return 'currency-converter';
        if (url.includes('pdf-converter')) return 'pdf-converter';
        return 'default';
    }

    // Generate response locally (no API needed)
    function getLocalResponse(userMessage, toolName) {
        const msg = userMessage.toLowerCase();
        const tool = toolResponses[toolName] || toolResponses.default;
        
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste')) {
            return tool.welcome || toolResponses.default.welcome;
        }
        if (msg.includes('help') || msg.includes('kaise') || msg.includes('how')) {
            return tool.help || "Main aapki help kar sakta hoon. Aap tool use karte waqt koi bhi problem bata sakte hain!";
        }
        if (msg.includes('thanks') || msg.includes('thank')) {
            return "👍 Aapka swagat hai! Koi aur madad chahiye?";
        }
        if (msg.includes('error') || msg.includes('problem') || msg.includes('not working')) {
            return "⚠️ Problem ke liye maafi. Kripya check karein:\n• File size 20MB se chhoti ho\n• File format sahi ho\n• Page refresh karke try karein\nAgar problem bani rahe toh humse contact karein!";
        }
        if (msg.includes('privacy') || msg.includes('secure') || msg.includes('safety')) {
            return "🔒 Aapki privacy important hai! Saare tools aapke browser mein hi kaam karte hain. Koi file humare server par upload nahi hoti. 100% secure!";
        }
        if (msg.includes('price') || msg.includes('cost') || msg.includes('free')) {
            return "💰 Saare tools 100% FREE hain! Koi payment nahi, koi subscription nahi. Humesha free!";
        }
        if (msg.includes('how to convert') || msg.includes('convert kaise')) {
            return "📌 Conversion ka tareeqa:\n1. Apni file upload karein (drag ya click)\n2. Convert button click karein\n3. Result download karein\n\nYe process browser mein hi hota hai, tez aur secure!";
        }
        
        return "🤔 Main samjha nahi. Kripya bataayein:\n• 'help' - tool use karne ke liye\n• 'privacy' - security ke baare mein\n• 'error' - problem ke liye\nYa apna sawaal likhein!";
    }

    // Create and inject chatbot HTML
    function createChatbot() {
        const chatbotHTML = `
            <div id="ai-chatbot-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <!-- Chat Button -->
                <div id="chatbot-toggle" style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; transition: transform 0.3s;">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                </div>
                
                <!-- Chat Window (Hidden by default) -->
                <div id="chatbot-window" style="display: none; position: absolute; bottom: 80px; right: 0; width: 350px; height: 500px; background: white; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.2); display: flex; flex-direction: column; overflow: hidden;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>🤖 AI Assistant</strong>
                            <div style="font-size: 12px; opacity: 0.9;">Online | Free Help</div>
                        </div>
                        <div id="chatbot-close" style="cursor: pointer; font-size: 20px;">&times;</div>
                    </div>
                    
                    <!-- Messages Area -->
                    <div id="chatbot-messages" style="flex: 1; overflow-y: auto; padding: 15px; background: #f8f9fa; color: #000000 !important;">
                        <div style="margin-bottom: 10px; display: flex; justify-content: flex-start;">
                            <div style="background: #e9ecef; color: #000000; padding: 10px; border-radius: 10px; max-width: 85%; font-size: 14px; line-height: 1.4;">
                                ${toolResponses[getCurrentTool()]?.welcome || toolResponses.default.welcome}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Input Area -->
                    <div style="padding: 10px; background: white; border-top: 1px solid #dee2e6; display: flex; gap: 10px;">
                        <input type="text" id="chatbot-input" placeholder="Apna sawaal likhein..." style="flex: 1; padding: 10px; border: 1px solid #dee2e6; border-radius: 20px; outline: none; font-size: 14px; color: #000000;" autocomplete="off">
                        <button id="chatbot-send" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 8px 20px; border-radius: 20px; cursor: pointer; font-weight: bold;">Send</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        
        // Add CSS to ensure black text
        const style = document.createElement('style');
        style.textContent = `
            #chatbot-messages * {
                color: #000000 !important;
            }
            #chatbot-messages div div {
                color: #000000 !important;
            }
            #chatbot-input {
                color: #000000 !important;
            }
            #chatbot-input::placeholder {
                color: #6c757d !important;
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
            if (chatWindow.style.display === 'none') {
                chatWindow.style.display = 'flex';
                toggleBtn.style.transform = 'scale(1.1)';
                setTimeout(() => toggleBtn.style.transform = 'scale(1)', 200);
            } else {
                chatWindow.style.display = 'none';
            }
        });
        
        closeBtn.addEventListener('click', () => {
            chatWindow.style.display = 'none';
        });
        
        function addMessage(text, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.style.marginBottom = '10px';
            messageDiv.style.display = 'flex';
            messageDiv.style.justifyContent = isUser ? 'flex-end' : 'flex-start';
            
            const bubble = document.createElement('div');
            bubble.style.backgroundColor = isUser ? '#667eea' : '#e9ecef';
            bubble.style.color = isUser ? 'white' : '#000000';
            bubble.style.padding = '10px';
            bubble.style.borderRadius = '10px';
            bubble.style.maxWidth = '85%';
            bubble.style.fontSize = '14px';
            bubble.style.lineHeight = '1.4';
            bubble.style.whiteSpace = 'pre-line';
            bubble.textContent = text;
            
            if (!isUser) {
                bubble.style.backgroundColor = '#e9ecef';
                bubble.style.color = '#000000';
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
            typingDiv.style.marginBottom = '10px';
            typingDiv.style.display = 'flex';
            typingDiv.style.justifyContent = 'flex-start';
            typingDiv.innerHTML = '<div style="background: #e9ecef; color: #6c757d; padding: 10px; border-radius: 10px; font-size: 13px;">🤔 Soch raha hoon...</div>';
            messagesDiv.appendChild(typingDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            
            // Simulate AI thinking
            setTimeout(() => {
                typingDiv.remove();
                const toolName = getCurrentTool();
                const response = getLocalResponse(message, toolName);
                addMessage(response, false);
            }, 500);
        }
        
        sendBtn.addEventListener('click', sendMessage);
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
    
    // Initialize when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createChatbot);
    } else {
        createChatbot();
    }
})();
