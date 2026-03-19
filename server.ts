import express from "express";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import FormData from "form-data";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Version Checking System
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));

const LOCAL_VERSION = pkg.version;
const REMOTE_PACKAGE_URL = "https://raw.githubusercontent.com/cyber-ullash/cyber-enhancer/refs/heads/main/package.json";
let isVersionValid = true;
let lastVersionCheck = 0;

async function checkVersion() {
    try {
        console.log("[Version Check] Checking for updates...");
        const response = await axios.get(REMOTE_PACKAGE_URL, { timeout: 10000 });
        const remoteVersion = response.data.version;
        
        if (remoteVersion && remoteVersion !== LOCAL_VERSION) {
            console.error(`[Version Check] UPDATE REQUIRED! Local: ${LOCAL_VERSION}, Remote: ${remoteVersion}`);
            console.error("[Version Check] Please update your API to the latest version to continue using it.");
            isVersionValid = false;
        } else {
            console.log(`[Version Check] Version is up to date (${LOCAL_VERSION}).`);
            isVersionValid = true;
        }
        lastVersionCheck = Date.now();
    } catch (error: any) {
        console.error("[Version Check] Failed to check version:", error.message);
        // If check fails, we assume it's valid to avoid blocking due to network issues, 
        // but you might want to change this behavior if strictness is required.
        // For now, we keep the previous state.
    }
}

// Initial check
checkVersion();

// Check every 12 hours
setInterval(checkVersion, 12 * 60 * 60 * 1000);

// Middleware to block API if version is invalid
const versionGuard = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!isVersionValid) {
        return res.status(426).json({
            success: false,
            error: "UPDATE_REQUIRED",
            message: "A new version of Cyber Enhancer is available. Update is mandatory to continue using the API.",
            update_url: "https://github.com/cyber-ullash/cyber-enhancer",
            credits: "CYBER BOT COMMUNITY | ULLASH × SHAON"
        });
    }
    next();
};

// Setup local storage for images (max 30 files)
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

let savedFiles: string[] = [];

// Function to save image and keep only the last 30
function saveImageLocally(buffer: Buffer): string {
    let ext = 'jpg';
    if (buffer.length > 4) {
        const hex = buffer.subarray(0, 4).toString('hex').toLowerCase();
        if (hex === '89504e47') ext = 'png';
        else if (hex.startsWith('ffd8ff')) ext = 'jpg';
        else if (hex === '47494638') ext = 'gif';
        else if (hex === '52494646' && buffer.subarray(8, 12).toString('ascii') === 'WEBP') ext = 'webp';
    }

    const filename = `enhanced_${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
    const filepath = path.join(UPLOADS_DIR, filename);
    fs.writeFileSync(filepath, buffer);
    
    savedFiles.push(filepath);
    
    // Remove oldest if more than 30
    if (savedFiles.length > 30) {
        const oldestFile = savedFiles.shift();
        if (oldestFile && fs.existsSync(oldestFile)) {
            try {
                fs.unlinkSync(oldestFile);
            } catch (err) {
                console.error("Failed to delete old file:", err);
            }
        }
    }
    
    return `/uploads/${filename}`;
}

// Setup multer for file uploads (in memory, then we process and save to disk)
const upload = multer({ storage: multer.memoryStorage() });

// The ihancer function provided by the user
async function ihancer(buffer: Buffer, { method = 3, size = 'high', contentType = 'image/jpeg', filename = '' } = {}) {
    try {
        const _size = ['low', 'medium', 'high'];
        
        if (!buffer || !Buffer.isBuffer(buffer)) throw new Error('Image buffer is required');
        if (method < 1 || method > 4) throw new Error('Available methods: 1, 2, 3, 4');
        if (!_size.includes(size)) throw new Error(`Available sizes: ${_size.join(', ')}`);
        
        const ext = contentType.split('/')[1] || 'jpg';
        const finalFilename = filename || `rynn_${Date.now()}.${ext}`;

        const form = new FormData();
        form.append('method', method.toString());
        form.append('is_pro_version', 'false');
        form.append('is_enhancing_more', 'false');
        form.append('max_image_size', size);
        form.append('file', buffer, { filename: finalFilename, contentType });
        
        const { data } = await axios.post('https://ihancer.com/api/enhance', form, {
            headers: {
                ...form.getHeaders(),
                'accept-encoding': 'gzip',
                host: 'ihancer.com',
                'user-agent': 'Dart/3.5 (dart:io)'
            },
            responseType: 'arraybuffer',
            timeout: 30000 // 30 seconds timeout
        });
        
        return Buffer.from(data);
    } catch (error: any) {
        let errorMsg = error.message;
        if (error.response && error.response.data) {
            try {
                const parsed = JSON.parse(Buffer.from(error.response.data).toString('utf-8'));
                errorMsg = parsed.message || parsed.error || errorMsg;
            } catch {
                const text = Buffer.from(error.response.data).toString('utf-8').substring(0, 200);
                if (text) errorMsg = text;
            }
        }
        throw new Error(`Upstream API Error: ${errorMsg}`);
    }
}

// Serve the uploads directory statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Version Status Endpoint
app.get("/api/version-status", (req, res) => {
    res.json({
        is_valid: isVersionValid,
        local_version: LOCAL_VERSION,
        last_check: lastVersionCheck,
        message: isVersionValid ? "Version is up to date." : "Update required."
    });
});

// API Endpoint (URL based)
app.get("/api", versionGuard, async (req, res) => {
    const imgurl = (req.query.imgurl || req.query.imageurl) as string;
    const method = parseInt(req.query.method as string) || 3; // Default to 3
    const size = (req.query.size as string) || 'high'; // Default to high

    if (!imgurl) {
        return res.status(400).json({
            error: "Missing required parameter",
            details: "Please provide an image URL to enhance via the 'imgurl' parameter.",
            examples: {
                default: "/api?imgurl=https://example.com/image.jpg",
                custom: "/api?imgurl=https://example.com/image.jpg&method=4&size=high",
                available_methods: "1, 2, 3, 4 (default: 3)",
                available_sizes: "low, medium, high (default: high)"
            }
        });
    }

    let imageBuffer: Buffer;
    let contentType = 'image/jpeg';
    try {
        // Fetch the image from the provided URL
        const imageResponse = await axios.get(imgurl, {
            responseType: 'arraybuffer',
            timeout: 15000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
            }
        });

        const resContentType = imageResponse.headers['content-type'];
        if (resContentType) {
            if (!resContentType.startsWith('image/')) {
                throw new Error(`URL returned non-image content (Content-Type: ${resContentType})`);
            }
            contentType = resContentType;
        }

        imageBuffer = Buffer.from(imageResponse.data);
    } catch (error: any) {
        return res.status(400).json({ 
            error: "Image Fetch Error", 
            details: `Could not download the source image. ${error.message}` 
        });
    }

    try {
        // Enhance the image
        const enhancedBuffer = await ihancer(imageBuffer, { method, size, contentType });

        // Save locally and get URL
        const savedUrlPath = saveImageLocally(enhancedBuffer);

        res.json({
            success: true,
            original_url: imgurl,
            enhanced_url: savedUrlPath,
            method,
            size
        });
    } catch (error: any) {
        console.error("Enhancement error:", error.message);
        res.status(500).json({ error: "Enhancement Processing Error", details: error.message });
    }
});

// API Endpoint (File Upload based)
app.post("/api/upload", versionGuard, upload.single('image'), async (req, res) => {
    const method = parseInt(req.body.method as string) || 3;
    const size = (req.body.size as string) || 'high';

    if (!req.file) {
        return res.status(400).json({ error: "Upload Error", details: "No image file provided in the request." });
    }
    
    if (!req.file.mimetype.startsWith('image/')) {
        return res.status(400).json({ error: "Invalid File", details: "Uploaded file must be an image." });
    }

    try {
        // Enhance the image
        const enhancedBuffer = await ihancer(req.file.buffer, { 
            method, 
            size, 
            contentType: req.file.mimetype,
            filename: req.file.originalname 
        });

        // Save locally and get URL
        const savedUrlPath = saveImageLocally(enhancedBuffer);

        res.json({
            success: true,
            enhanced_url: savedUrlPath,
            method,
            size
        });
    } catch (error: any) {
        console.error("Enhancement error:", error.message);
        res.status(500).json({ error: "Enhancement Processing Error", details: error.message });
    }
});

async function startServer() {
    // Vite middleware for development
    if (process.env.NODE_ENV !== "production") {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: "spa",
        });
        app.use(vite.middlewares);
    } else {
        const distPath = path.join(process.cwd(), 'dist');
        app.use(express.static(distPath));
        app.get('*', (req, res) => {
            res.sendFile(path.join(distPath, 'index.html'));
        });
    }

    app.listen(Number(PORT), "0.0.0.0", () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
