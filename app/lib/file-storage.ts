import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Define storage paths
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const AUDIO_DIR = path.join(UPLOADS_DIR, 'audio');

// Ensure directories exist
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

if (!fs.existsSync(AUDIO_DIR)) {
    fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

/**
 * Save a base64 audio file to the local filesystem
 */
export async function saveAudioFile(base64Audio: string, fileExtension = 'webm'): Promise<string> {
    // Remove the data URL prefix if present
    const base64Data = base64Audio.replace(/^data:audio\/\w+;base64,/, '');

    // Generate a unique filename
    const filename = `${uuidv4()}.${fileExtension}`;
    const filePath = path.join(AUDIO_DIR, filename);

    // Write the file
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

    // Return the public URL
    return `/uploads/audio/${filename}`;
}

/**
 * Get absolute file path from public URL
 */
export function getFilePath(publicUrl: string): string {
    const relativePath = publicUrl.startsWith('/')
        ? publicUrl.substring(1)
        : publicUrl;

    return path.join(process.cwd(), 'public', relativePath);
}

/**
 * Delete a file by its public URL
 */
export function deleteFile(publicUrl: string): boolean {
    try {
        const filePath = getFilePath(publicUrl);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error deleting file:', error);
        return false;
    }
} 