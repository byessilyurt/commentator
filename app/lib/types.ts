// User role types
export enum UserRole {
    ADMIN = 'ADMIN',
    COMMENTATOR = 'COMMENTATOR',
    USER = 'USER'
}

// User approval status
export enum ApprovalStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

// User profile interface
export interface UserProfile {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    approvalStatus: ApprovalStatus;
    bio?: string;
    profilePicture?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Match interface
export interface Match {
    id: string;
    title: string;
    league: string;
    teams: string[];
    date: string;
    startTime: string;
    duration: string;
    isLive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Commentary interface
export interface Commentary {
    id: string;
    title: string;
    commentatorId: string;
    commentatorName: string;
    matchId: string;
    date: string;
    duration: string;
    audioUrl: string;
    startTimeOffset: number; // When the commentator marked the game start (in seconds)
    rating?: number;
    listens: number;
    createdAt: Date;
    updatedAt: Date;
}

// Sample commentary for approval
export interface SampleCommentary {
    id: string;
    userId: string;
    audioUrl: string;
    description: string;
    createdAt: Date;
}

// Authentication-related types
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData extends LoginCredentials {
    name: string;
    role: UserRole;
}

export interface AuthResponse {
    user: UserProfile;
    token: string;
}

// API response interfaces
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
} 