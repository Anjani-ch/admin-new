import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// Code snippet found here:
// www.servicenow.com/community/itsm-forum/javascript-how-can-i-covert-bytes-to-mega-bytes/m-p/553517
export function bytesToMb(bytes: number) {
	return (bytes / Math.pow(1024, 2)).toFixed(2)
}
