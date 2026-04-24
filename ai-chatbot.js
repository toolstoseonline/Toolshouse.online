// ai-chatbot.js - Complete AI Agent for Tools House
// Place this file in your website root folder

(function() {
    // Your Gemini API Key
    const API_KEY = 'AIzaSyBK80xhpJcY37btHRG29Dnq5YHr0InyrG4';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
    
    // Tool URLs and their descriptions for context
    const toolDatabase = {
        '/word-to-pdf-converter.html': 'Convert Word documents to PDF format',
        '/pdf-to-word-converter.html': 'Convert PDF files back to editable Word format',
        '/pdf-reader.html': 'View and read PDF files directly in browser',
        '/pdf-merger.html': 'Combine multiple PDF files into one document',
        '/file-compressor.html': 'Reduce file sizes without losing quality',
        '/file-splitter.html': 'Split large files into smaller parts',
        '/file-converter.html': 'Convert between different file formats',
        '/pdf-to-powerpoint.html': 'Convert PDF to editable PowerPoint presentations',
        '/edit-pdf.html': 'Edit text, images, and pages in PDF files',
        '/powerpoint-to-pdf.html': 'Convert PowerPoint to PDF format',
        '/pdf-to-jpg.html': 'Extract images from PDF as JPG files',
        '/jpg-to-pdf.html': 'Convert JPG images to PDF documents',
        '/pdf-converter.html': 'Universal PDF conversion tool',
        '/pdf-repair.html': 'Fix corrupted or damaged PDF files',
        '/pdf-page.html': 'Add or manage page numbers in PDF',
        '/pdf-redact.html': 'Remove sensitive information from PDF',
        '/ocr-pdf.html': 'Extract text from scanned PDFs',
        '/image-converter.html': 'Convert images between formats (PNG, JPG, WEBP)',
        '/collage-maker.html': 'Create photo collages from multiple images',
        '/image-resizer.html': 'Resize and scale images to any dimensions',
        '/filter-effects.html': 'Apply artistic filters to photos',
        '/photo-retouch.html': 'Retouch and enhance portrait photos',
        '/excel-to-pdf.html': 'Convert Excel spreadsheets to PDF',
        '/image-enhancer.html': 'Improve image quality automatically',
        '/meme-generator.html': 'Create custom memes with text',
        '/video-trimmer.html': 'Cut and trim video clips',
        '/speed-controller.html': 'Change video playback speed',
        '/subtitle-adder.html': 'Add subtitles to videos',
        '/video-compressor.html': 'Reduce video file size',
        '/video-reverser.html': 'Play videos in reverse',
        '/video-rotator.html': 'Rotate video orientation',
        '/audio-cutter.html': 'Trim audio files to desired length',
        '/audio-merger.html': 'Combine multiple audio files',
        '/mp3-converter.html': 'Convert audio to MP3 format',
        '/voice-recorder.html': 'Record voice directly in browser',
        '/gst-calculator.html': 'Calculate GST tax amounts',
        '/currency-converter.html': 'Convert between world currencies',
        '/loan-calculator.html': 'Calculate loan EMI and interest',
        '/age-calculator.html': 'Calculate exact age from birth date',
        '/compound-interest.html': 'Calculate investment growth over time',
        '/ai-voiceover.html': 'Generate voice from text using AI',
        '/password-generator.html': 'Create secure random passwords',
        '/qr-generator.html': 'Generate QR codes from text or URLs'
    };
    
    // Helper to get current tool info
    function getCurrentToolInfo() {
        const currentPath = window.location.pathname;
        const toolName = currentPath.split('/').pop().replace('.html', '').replace(/-/g, ' ');
        const description = toolDatabase[currentPath] || 'Useful online tool for document, image, video, or audio processing';
        
        return {
            name: toolName,
            description: description,
            path: currentPath
        };
    }
    
    // System prompt for the AI
    function getSystemPrompt() {
        const currentTool = getCurrentToolInfo();
        
        return `You are "ToolsBot" - a helpful AI assistant for Tools House Online (toolshouse.online). 
        
Current Tool Page: ${currentTool.name}
Tool Description: ${currentTool.description}

Website Info:
- Tools House offers 100+ free online tools (No signup required)
- Categories: PDF Tools, Image Editing, Video Editing, Audio Tools, Calculators, AI Tools
- All tools work directly in browser - files never leave user's device
- Maximum file size: 20MB for most tools
- Privacy first approach - no data storage on servers

Your Guidelines:
1. Be friendly, concise, and helpful (2-3 sentences max)
2. Focus on helping with the CURRENT tool first
3. Suggest other related tools when relevant
4. Never ask for API keys or personal information
5. If someone asks about pricing: "All tools are 100% free forever"
6. If asked about privacy: "Your files never leave your browser - completely secure"
7. Keep responses short but informative

Examples of good responses:
- "To convert Word to PDF, just drag your DOCX file to the upload area and click 'Convert'! Need help with other formats?"
- "This tool processes everything in your browser - your document stays on your device. Maximum file size is 20MB."
- "You're on our Word to PDF tool. If you need PDF to Word instead, check our other converter at tools house online."`;
    }
    
    // Create chatbot UI
    function createChatbot() {
        const chatbotHTML = `
            <div id="tools-ai-chatbot" style="position: fixed; bottom: 20px; right: 20px; z-index: 10000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <!-- Chat Button -->
                <div id="chatbot-toggle" style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: transform 0.3s;">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
                
                <!-- Chat Window (hidden by default) -->
                <div id="chatbot-window" style="display: none; position: absolute; bottom: 80px; right: 0; width: 350px; height: 500px; background: white; border-radius: 15px; box-shadow: 0 5px 25px rgba(0,0,0,0.2); overflow: hidden; flex-direction: column;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 15px; color: white;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong style="font-size: 16px;">✨ ToolsBot AI</strong>
                                <div style="font-size: 11px; opacity: 0.9;">Online Tools Assistant</div>
                            </div>
                            <button id="chatbot-close" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; width: 30px; height: 30px;">×</button>
                        </div>
                    </div>
                    
                    <!-- Messages Area -->
                    <div id="chatbot-messages" style="flex: 1; overflow-y: auto; padding: 15px; background: #f8f9fa;">
                        <div style="text-align: center; color: #666; font-size: 12px; margin-bottom: 15px;">
                            🤖 Ask me about any tool!
                        </div>
                        <div style="background: white; padding: 10px; border-radius: 10px; margin-bottom: 10px; max-width: 85%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                            Hello! I can help you use ${getCurrentToolInfo().name.replace(/-/g, ' ')}. What would you like to know?
                        </div>
                    </div>
                    
                    <!-- Input Area -->
                    <div style="padding: 15px; background: white; border-top: 1px solid #dee2e6;">
                        <div style="display: flex; gap: 10px;">
                            <input type="text" id="chatbot-input" placeholder="Ask me anything..." style="flex: 1; padding: 10px; border: 1px solid #dee2e6; border-radius: 20px; outline: none; font-size: 14px;">
                            <button id="chatbot-send" style="background: #667eea; border: none; color: white; padding: 8px 20px; border-radius: 20px; cursor: pointer; font-weight: 500;">Send</button>
                        </div>
                        <div style="font-size: 10px; color: #999; text-align: center; margin-top: 8px;">
                            Powered by Gemini AI
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #chatbot-messages::-webkit-scrollbar {
                width: 6px;
            }
            #chatbot-messages::-webkit-scrollbar-track {
                background: #f1f1f1;
            }
            #chatbot-messages::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 3px;
            }
        `;
        document.head.appendChild(style);
        
        // Event listeners
        const toggle = document.getElementById('chatbot-toggle');
        const window2 = document.getElementById('chatbot-window');
        const close = document.getElementById('chatbot-close');
        const send = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        const messages = document.getElementById('chatbot-messages');
        
        toggle.addEventListener('click', () => {
            if (window2.style.display === 'none' || window2.style.display === '') {
                window2.style.display = 'flex';
                toggle.style.transform = 'scale(1.1)';
                setTimeout(() => toggle.style.transform = '', 300);
            } else {
                window2.style.display = 'none';
            }
        });
        
        close.addEventListener('click', () => {
            window2.style.display = 'none';
        });
        
        async function sendMessage() {
            const userMessage = input.value.trim();
            if (!userMessage) return;
            
            // Add user message
            const userDiv = document.createElement('div');
            userDiv.style.cssText = 'background: #667eea; color: white; padding: 10px; border-radius: 10px; margin-bottom: 10px; max-width: 85%; margin-left: auto; box-shadow: 0 1px 2px rgba(0,0,0,0.1);';
            userDiv.textContent = userMessage;
            messages.appendChild(userDiv);
            messages.scrollTop = messages.scrollHeight;
            
            input.value = '';
            
            // Add loading indicator
            const loadingDiv = document.createElement('div');
            loadingDiv.id = 'ai-loading';
            loadingDiv.style.cssText = 'background: white; padding: 10px; border-radius: 10px; margin-bottom: 10px; max-width: 85%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);';
            loadingDiv.textContent = 'Typing...';
            messages.appendChild(loadingDiv);
            messages.scrollTop = messages.scrollHeight;
            
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: getSystemPrompt() + '\n\nUser Question: ' + userMessage + '\n\nAnswer concisely (2-3 sentences max):'
                            }]
                        }]
                    })
                });
                
                const data = await response.json();
                loadingDiv.remove();
                
                let aiResponse = "I can help with that! Could you please rephrase?";
                if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                    aiResponse = data.candidates[0].content.parts[0].text;
                }
                
                const aiDiv = document.createElement('div');
                aiDiv.style.cssText = 'background: white; padding: 10px; border-radius: 10px; margin-bottom: 10px; max-width: 85%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);';
                aiDiv.textContent = aiResponse;
                messages.appendChild(aiDiv);
                messages.scrollTop = messages.scrollHeight;
                
            } catch (error) {
                loadingDiv.remove();
                const errorDiv = document.createElement('div');
                errorDiv.style.cssText = 'background: #fff3cd; color: #856404; padding: 10px; border-radius: 10px; margin-bottom: 10px; max-width: 85%;';
                errorDiv.textContent = '📱 Just drag & drop your file to the upload area and click convert! Need help finding a specific tool?';
                messages.appendChild(errorDiv);
                messages.scrollTop = messages.scrollHeight;
            }
        }
        
        send.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
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
