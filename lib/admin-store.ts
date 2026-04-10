/**
 * Shared in-memory stores for admin session management and rate limiting.
 * These live in lib/ so they can be imported by multiple API routes without
 * creating circular dependencies through route files.
 */

export type RateLimitEntry = {
	attempts: number;
	lockedUntil: number | null;
};

export type SessionEntry = {
	createdAt: number;
};

export type StoredImage = {
	data: Buffer;
	contentType: string;
	createdAt: number;
};

export const rateLimitStore = new Map<string, RateLimitEntry>();
export const sessionStore = new Map<string, SessionEntry>();
export const imageStore = new Map<string, StoredImage>();
