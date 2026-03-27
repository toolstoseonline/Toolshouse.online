<?php
/**
 * AUTO UPDATE META DESCRIPTIONS
 * Tools House Online - All Pages
 * 
 * INSTRUCTIONS:
 * 1. Upload this file to your website root directory
 * 2. Access it in browser: https://www.toolshouse.online/auto_update_meta_descriptions.php
 * 3. Click the button to automatically update all HTML files
 * 4. After completion, delete this file for security
 */

// Define all pages with their meta descriptions
$pages = array(
    // Home Page
    'Home.html' => 'Tools House Online - 100+ free online tools for PDF, image, video, audio, calculators and AI. No signup required, fast and secure.',
    
    // Document & File Tools
    'Word to PDF Converter.html' => 'Free Word to PDF converter online. Convert DOC/DOCX to PDF instantly without signup. Fast, secure and no file size limit.',
    'pdf reader.html' => 'Free PDF reader online - open and read PDF files directly in your browser on mobile and PC. No software or signup needed.',
    'PDF Merger.html' => 'Free PDF merger tool online. Merge multiple PDF files into one document instantly without signup. Secure and easy to use.',
    'PDF Splitter.html' => 'Free PDF splitter online. Split PDF files and extract pages instantly without signup. Fast, secure and works on all devices.',
    'PDF Compressor.html' => 'Free PDF compressor online. Compress PDF files and reduce file size instantly without losing quality. No signup required.',
    'File Compressor.html' => 'Free file compressor online. ZIP/RAR compression tool to reduce file size quickly. Works on mobile and PC without signup.',
    'File Splitter.html' => 'Free file splitter online. Split large files into smaller parts instantly without signup. Fast and easy on all devices.',
    'File Converter.html' => 'Free file converter online. Change file formats quickly on mobile and PC without any software or signup required.',
    'PDF to PowerPoint.html' => 'Free PDF to PowerPoint converter online. Convert PDF to PPTX instantly preserving layout, images and formatting. No signup.',
    'PowerPoint to PDF.html' => 'Free PowerPoint to PDF converter online. Convert PPTX to PDF instantly preserving layout, images and formatting. No signup.',
    'Edit PDF.html' => 'Free PDF editor online. Edit PDFs easily - modify text, images and pages instantly without signup required.',
    'PDF to JPG.html' => 'Free PDF to JPG converter online. Convert PDF pages to high-quality JPG images instantly without signup or software.',
    'JPG TO PDF.html' => 'Free JPG to PDF converter online. Combine multiple images into PDF instantly without signup. Fast and easy conversion.',
    'PDF Signer.html' => 'Free PDF signer online. Add your signature to PDFs electronically without signup. Secure and instant signing.',
    'HTML to PDF.html' => 'Free HTML to PDF converter online. Save any webpage as high-quality PDF instantly without signup or software.',
    'unlock Pdf.html' => 'Free PDF unlock tool online. Remove password protection from PDF files instantly without signup or software.',
    'PDF Organizer.html' => 'Free PDF organizer online. Rearrange, rotate, delete and merge PDF pages easily without signup required.',
    'PDF Converter.html' => 'Free PDF converter online. Convert any file to PDF instantly preserving formatting with high-quality output. No signup.',
    'PDF Repair.html' => 'Free PDF repair tool online. Repair corrupted PDF files instantly and recover readable content without signup.',
    'PDF Page.html' => 'Free page number tool for PDFs. Add page numbers to PDFs online easily with customizable position and format. No signup.',
    'PDF Redact.html' => 'Free PDF redact tool online. Permanently blackout sensitive information in PDFs securely without signup.',
    'OCR - PDF.html' => 'Free OCR PDF tool online. Convert scanned documents into searchable and editable text instantly without signup.',
    'Excel to PDF.html' => 'Free Excel to PDF converter online. Convert XLS/XLSX to PDF instantly without signup. Download your PDF quickly.',
    
    // Photo & Image Tools
    'Image Converter.html' => 'Free image converter online. Convert JPG, PNG, WEBP and other image formats instantly without signup. Easy and fast.',
    'Collage Maker.html' => 'Free collage maker online. Create beautiful photo collages by combining multiple photos into one image easily. No signup.',
    'Image Resizer.html' => 'Free image resizer online. Change image width and height to any dimension instantly without signup. Works on all devices.',
    'Filter & Effects.html' => 'Free photo filters and effects online. Apply Instagram-like filters to your photos instantly without signup or software.',
    'Photo Retouch.html' => 'Free photo retouch online. Enhance portrait photos and remove imperfections instantly and free without any software.',
    'Image Enhancer.html' => 'Free image enhancer online. Enhance and upscale images automatically and improve quality and sharpness instantly. No signup.',
    'Meme Generator.html' => 'Free meme generator online. Create funny memes easily - add text to images and make viral memes instantly without app.',
    
    // Video Tools
    'Video Trimmer.html' => 'Free video trimmer online. Trim and cut video segments easily - remove unwanted parts from videos in seconds. No signup.',
    'Speed Controller.html' => 'Free video speed controller online. Speed up or slow down videos instantly without software. Works in your browser.',
    'Subtitle Adder.html' => 'Free subtitle adder online. Add subtitles to videos easily - upload video and SRT file to add subtitles instantly and free.',
    'Video Compressor.html' => 'Free video compressor online. Compress videos and reduce file size instantly without losing quality. No signup required.',
    'Video Reverser.html' => 'Free video reverser online. Reverse your videos easily and play videos backwards instantly without any software.',
    'Video Rotator.html' => 'Free video rotator online. Rotate videos 90°, 180° or 270° in seconds without signup. Works directly in your browser.',
    
    // Audio Tools
    'Audio Cutter.html' => 'Free audio cutter online. Cut and trim MP3 and other audio files instantly in your browser without signup. Easy and fast.',
    'Audio Merger.html' => 'Free audio merger online. Merge multiple audio files into one instantly. Combine MP3 tracks easily and free in seconds.',
    'MP3 Converter.html' => 'Free MP3 converter online. Convert AAC, WAV, M4A and more to high-quality MP3 instantly without signup. Free forever.',
    'Voice Recorder.html' => 'Free voice recorder online. Record voice and audio instantly for memos and voice notes. Works on mobile and PC.',
    
    // Calculator Tools
    'GST Calculator.html' => 'Free GST calculator online. Calculate GST instantly - add or remove GST, find net price and tax amount for businesses.',
    'Currency Converter.html' => 'Free currency converter online. Convert currencies instantly with live rates. Support for USD, PKR, EUR, GBP and 150+ currencies.',
    'Loan Calculator.html' => 'Free loan calculator online. Calculate loan EMI, interest and total payment instantly for home, car and personal loans.',
    'Age Calculator.html' => 'Free age calculator online. Calculate exact age in years, months, weeks, days, hours and minutes instantly without signup.',
    'Compound Interest.html' => 'Free compound interest calculator online. Calculate compound interest and investment growth with different compounding options.',
    
    // AI & Dev Tools
    'AI Voiceover.html' => 'Free AI voiceover generator online. Convert text to natural speech with free AI voiceover. Multiple voices and languages available.',
    'Password Generator.html' => 'Free password generator online. Generate strong secure passwords instantly - customize length, symbols and characters freely.',
    'QR Generator.html' => 'Free QR code generator online. Generate QR codes for URLs, text, WiFi and more - download in high quality without signup.',
    
    // Other Pages
    'Tools.html' => 'All Tools - Browse 100+ free online tools at Tools House Online. PDF, image, video, audio, calculator and AI tools all in one place.',
    'Contact.html' => 'Contact Tools House Online - Get in touch with our team. Questions about our free online tools? Send us a message today.',
);

$result = array();
$success = 0;
$failed = 0;

// Check if update requested
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update'])) {
    foreach ($pages as $filename => $description) {
        $filepath = dirname(__FILE__) . '/' . $filename;
        
        // Check if file exists
        if (!file_exists($filepath)) {
            $result[] = "❌ File not found: " . $filename;
            $failed++;
            continue;
        }
        
        // Read file content
        $content = file_get_contents($filepath);
        
        // Check if meta description already exists
        if (preg_match('/<meta name="description"/', $content)) {
            // Replace existing meta description
            $content = preg_replace(
                '/<meta name="description" content="[^"]*"/',
                '<meta name="description" content="' . htmlspecialchars($description) . '"',
                $content
            );
            $result[] = "✏️ UPDATED: " . $filename;
        } else {
            // Add new meta description after <title> tag
            $content = preg_replace(
                '/(<\/title>)/i',
                '$1' . "\n    " . '<meta name="description" content="' . htmlspecialchars($description) . '">',
                $content
            );
            $result[] = "✅ ADDED: " . $filename;
        }
        
        // Write back to file
        if (file_put_contents($filepath, $content)) {
            $success++;
        } else {
            $result[] = "❌ FAILED TO WRITE: " . $filename;
            $failed++;
        }
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auto Update Meta Descriptions - Tools House Online</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 800px;
            width: 100%;
            padding: 40px;
        }
        
        h1 {
            color: #333;
            margin-bottom: 10px;
            text-align: center;
            font-size: 2em;
        }
        
        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
            font-size: 1.1em;
        }
        
        .info-box {
            background-color: #e3f2fd;
            border-left: 4px solid #2196F3;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            color: #1565c0;
            line-height: 1.6;
        }
        
        .warning-box {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            color: #856404;
            line-height: 1.6;
        }
        
        .stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 20px 0;
        }
        
        .stat-box {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #667eea;
        }
        
        .stat-label {
            color: #666;
            margin-top: 5px;
        }
        
        form {
            margin: 30px 0;
        }
        
        button {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.1em;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
        }
        
        button:active {
            transform: translateY(0);
        }
        
        .results {
            background: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin-top: 30px;
            max-height: 400px;
            overflow-y: auto;
        }
        
        .result-item {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
            font-family: 'Courier New', monospace;
            font-size: 0.95em;
        }
        
        .result-item:last-child {
            border-bottom: none;
        }
        
        .success-message {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: bold;
        }
        
        .error-message {
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: bold;
        }
        
        .steps {
            background: #f5f5f5;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        
        .steps h3 {
            color: #333;
            margin-bottom: 15px;
        }
        
        .steps ol {
            margin-left: 20px;
            line-height: 2;
            color: #666;
        }
        
        .steps li {
            margin-bottom: 10px;
        }
        
        .footer {
            text-align: center;
            color: #999;
            margin-top: 30px;
            font-size: 0.9em;
            border-top: 1px solid #ddd;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Auto Update Meta Descriptions</h1>
        <p class="subtitle">Tools House Online - All Pages</p>
        
        <div class="info-box">
            <strong>📊 What This Does:</strong><br>
            Automatically adds or updates meta descriptions on all your HTML pages for better Google SEO ranking.
        </div>
        
        <div class="stats">
            <div class="stat-box">
                <div class="stat-number"><?php echo count($pages); ?></div>
                <div class="stat-label">Total Pages</div>
            </div>
            <div class="stat-box">
                <div class="stat-number">51</div>
                <div class="stat-label">Meta Descriptions</div>
            </div>
        </div>
        
        <?php if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update'])): ?>
            <?php if ($failed === 0): ?>
                <div class="success-message">
                    ✅ SUCCESS! All <?php echo $success; ?> pages updated successfully!
                </div>
            <?php else: ?>
                <div class="error-message">
                    ⚠️ Completed with issues: <?php echo $success; ?> success, <?php echo $failed; ?> failed
                </div>
            <?php endif; ?>
            
            <div class="results">
                <strong>Update Log:</strong><br><br>
                <?php foreach ($result as $msg): ?>
                    <div class="result-item"><?php echo $msg; ?></div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
        
        <form method="POST">
            <button type="submit" name="update" value="1">
                🔄 UPDATE ALL META DESCRIPTIONS NOW
            </button>
        </form>
        
        <div class="warning-box">
            <strong>⚠️ Important:</strong><br>
            1. Make sure all your HTML files are in the same directory as this script<br>
            2. After successful update, DELETE this file for security<br>
            3. Check your website to make sure everything looks correct<br>
            4. Submit sitemap to Google Search Console
        </div>
        
        <div class="steps">
            <h3>📋 Next Steps After Update:</h3>
            <ol>
                <li>✅ Verify all pages have the correct meta descriptions</li>
                <li>✅ Delete this PHP file from your server (security)</li>
                <li>✅ Submit your sitemap to Google Search Console</li>
                <li>✅ Use URL Inspection tool to check indexing status</li>
                <li>✅ Request re-indexing for all pages</li>
                <li>✅ Wait 2-4 weeks for Google to process changes</li>
            </ol>
        </div>
        
        <div class="footer">
            <p>Tools House Online | Auto Meta Description Updater</p>
            <p>Version 1.0 | Safe & Secure</p>
        </div>
    </div>
</body>
</html>
