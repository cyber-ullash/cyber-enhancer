# Cyber Enhancer - AI Image Enhancement v1.0.0

Cyber Enhancer is a powerful AI-driven image enhancement tool that transforms low-resolution photos into stunning, high-definition masterpieces. Powered by advanced neural networks, it reconstructs details and upscales images with remarkable precision.

## Features

- **AI Upscaling:** Increase image resolution without losing quality.
- **Detail Reconstruction:** Restore blurred or low-quality details in photos.
- **Multiple Enhancement Methods:** Choose from 4 different AI models tailored for various image types.
- **High-Quality Output:** Default output is set to high resolution for the best results.
- **Dual API Support:** Enhance images via URL or direct file upload.
- **Fast Processing:** Get your enhanced images in seconds.

## How It Works

Cyber Enhancer acts as a proxy to high-end AI enhancement services. When you provide an image (via URL or upload), the server:
1. Fetches or receives the image data.
2. Forwards it to the AI processing engine with your selected parameters (method and size).
3. Receives the enhanced image buffer.
4. Saves the result locally and provides a temporary URL for access.

## API Documentation

### 1. Enhance via URL

**Endpoint:** `GET /api`

**Parameters:**
- `imgurl` (Required): The public URL of the image you want to enhance.
- `method` (Optional): AI model to use (1, 2, 3, or 4). Default is `3`.
- `size` (Optional): Output quality (`low`, `medium`, `high`). Default is `high`.

**Example Request:**
```
GET /api?imgurl=https://example.com/photo.jpg&method=4&size=high
```

**Response:**
```json
{
  "success": true,
  "original_url": "https://example.com/photo.jpg",
  "enhanced_url": "/uploads/enhanced_123456789.jpg",
  "method": 4,
  "size": "high"
}
```

### 2. Enhance via File Upload

**Endpoint:** `POST /api/upload`

**Body (Multipart/Form-Data):**
- `image`: The image file to upload.
- `method` (Optional): AI model to use (1, 2, 3, or 4). Default is `3`.
- `size` (Optional): Output quality (`low`, `medium`, `high`). Default is `high`.

**Response:**
```json
{
  "success": true,
  "enhanced_url": "/uploads/enhanced_123456789.jpg",
  "method": 3,
  "size": "high"
}
```

## Credits

**CYBER BOT COMMUNITY**
**ULLASH × SHAON**

---
© 2026 Cyber Enhancer. All rights reserved.
