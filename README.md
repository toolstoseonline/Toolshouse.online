# 🛠️ ToolsHouse.online – 100+ Free Online Tools

[![Website](https://img.shields.io/badge/🌐-toolshouse.online-blue)](https://www.toolshouse.online)
[![GitHub](https://img.shields.io/badge/🐙-GitHub%20Repo-green)](https://github.com/toolstoseonline/Toolshouse.online)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Tools](https://img.shields.io/badge/Tools-100%2B-brightgreen)]()

**ToolsHouse.online** is a collection of 100+ completely free online tools. No signup, no uploads – everything runs in your browser.

---

## ✨ Features
- 🔒 **100% Privacy** – Files never leave your browser
- 🚀 **No Signup Required** – Use instantly
- 📱 **Mobile Friendly** – Works on all devices
- 🆓 **Completely Free** – No hidden charges

---

## 🛠️ Tools Categories
- 📄 **PDF Tools** (Merge, Split, Compress, Convert, OCR)
- 🖼️ **Image Tools** (Resize, Convert, Background Remover, Collage)
- 🎬 **Video Tools** (Trim, Compress, Convert, Rotate)
- 🎵 **Audio Tools** (Cutter, Merger, MP3 Converter)
- 🧮 **Calculator Tools** (GST, Loan, Age, Currency)
- 🤖 **AI & Dev Tools** (QR Generator, Password Generator)
- ## The Problem with Most "Free" Tools

Last month, I needed to quickly merge two PDFs. I googled "free PDF merger" and clicked the first result.

It worked perfectly. But then I wondered: where did my PDF go?

I checked the network tab. My file was uploaded to their server. They stored it. I had no idea who had access to my personal documents.

That's when I decided to build something different.

## Introducing ToolsHouse

**ToolsHouse is a collection of 100+ completely free online tools that run entirely in your browser.**

🔗 **Live:** [https://www.toolshouse.online](https://www.toolshouse.online)  
🐙 **Open Source:** [https://github.com/toolstoseonline/Toolshouse.online](https://github.com/toolstoseonline/Toolshouse.online)

Your files never leave your device. No signup. No uploads. No tracking.

## What's Included?

**📄 PDF Tools** (20+ tools)
- Merge, split, compress, convert
- OCR scanned documents
- Sign, unlock, repair, redact
- Convert Word/Excel/PPT to/from PDF

**🖼️ Image Tools**
- Resize, convert, compress
- Background remover
- Collage maker
- Photo enhancer

**🎬 Video Tools**
- Trim, compress, convert
- Rotate, reverse
- Video to GIF
- Speed controller

**🎵 Audio Tools**
- Cut, merge, convert
- MP3 converter
- Voice recorder

**🧮 Calculator Tools**
- GST, loan, age, currency
- Compound interest

**🤖 AI & Dev Tools**
- QR generator
- Password generator
- AI voiceover (coming soon)

## How It Works (The Tech Stack)

Everything runs client-side using modern browser APIs:

| Tool Type | Technology Used |
|-----------|-----------------|
| PDF Processing | PDF.js, jsPDF, pdf-lib |
| Video/Audio | FFmpeg.wasm (WebAssembly) |
| OCR | Tesseract.js |
| Image Editing | Canvas API, Fabric.js |
| Compression | Browser native APIs |

**No backend servers. No API calls. No data collection.**

## The Biggest Technical Challenge: FFmpeg.wasm on Mobile

The hardest part was making video tools work on mobile devices. FFmpeg.wasm is heavy (~20MB) and mobile browsers have memory constraints.

**Solution:**
- Lazy loading – only load when user opens video tool
- Progress indicators for processing
- File size warnings for large videos
- Graceful fallbacks

## Performance Metrics

After optimization:

- **First Contentful Paint:** 1.2s
- **Time to Interactive:** 2.1s
- **Lighthouse Score:** 94/100

## What's Next?

I'm planning to add:

- [ ] More AI tools (image generation, text-to-speech)
- [ ] Batch processing for multiple files
- [ ] PWA support for offline use
- [ ] Dark mode

## Try It Yourself

All tools are free, no signup required:

👉 **https://www.toolshouse.online**

## Contribute

This project is open source (MIT license). If you'd like to add a tool, fix a bug, or improve documentation:

🐙 **GitHub:** [https://github.com/toolstoseonline/Toolshouse.online](https://github.com/toolstoseonline/Toolshouse.online)

Star it if you find it useful! ⭐

## FAQ

**Q: Is it really free?**  
A: Yes, 100% free. No premium tiers, no watermarks, no hidden charges.

**Q: Do you store my files?**  
A: No. All processing happens locally in your browser. Files never leave your device.

**Q: Do I need to create an account?**  
A: No. Just open the tool and use it instantly.

**Q: Does it work on mobile?**  
A: Yes, fully responsive. Works on Android, iPhone, and tablets.

---

*Built with HTML, CSS, JavaScript, and ❤️*
