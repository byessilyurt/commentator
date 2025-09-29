/**
 * Extract YouTube video ID from various URL formats
 */
export function extractYouTubeVideoId(url: string): string | null {
    // Handle various YouTube URL formats:
    // https://www.youtube.com/watch?v=VIDEO_ID
    // https://youtu.be/VIDEO_ID
    // https://www.youtube.com/embed/VIDEO_ID
    // https://www.youtube.com/live/VIDEO_ID
    
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/,
        /youtube\.com\/user\/[^\/]+\/[^\/]+\/([^&\n?#]+)/
    ];
    
    for (let pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    
    return null;
}

/**
 * Validate YouTube URL and check if it's a valid video
 */
export function validateYouTubeUrl(url: string): boolean {
    const videoId = extractYouTubeVideoId(url);
    return videoId !== null && videoId.length >= 10;
}

/**
 * Check if YouTube URL is a live stream
 */
export function isYouTubeLiveUrl(url: string): boolean {
    return url.includes('/live/') || url.includes('&live=1');
}

/**
 * Generate YouTube embed URL for audio-only playback
 */
export function generateYouTubeEmbedUrl(videoId: string, startTime?: number): string {
    const params = new URLSearchParams({
        autoplay: '1',
        controls: '0',
        modestbranding: '1',
        rel: '0',
        iv_load_policy: '3',
        fs: '0',
        playsinline: '1',
        enablejsapi: '1'
    });

    if (startTime) {
        params.set('start', Math.floor(startTime).toString());
    }

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}