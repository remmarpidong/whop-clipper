// Generate a random 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate a unique token for various purposes
export function generateToken(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomPart}`;
}

// Check if OTP is expired
export function isOTPExpired(expiresAt: number | null): boolean {
  if (!expiresAt) return true;
  return Date.now() > expiresAt;
}

// Get OTP expiry time (15 minutes from now)
export function getOTPExpiry(): number {
  return Date.now() + 15 * 60 * 1000; // 15 minutes
}

// Mask email for display (e.g., john@example.com -> j***@example.com)
export function maskEmail(email: string): string {
  const [localPart, domain] = email.split("@");
  if (!domain) return email;
  
  const maskedLocal = localPart.length > 2 
    ? localPart[0] + "*".repeat(localPart.length - 2) + localPart[localPart.length - 1]
    : localPart[0] + "*";
  
  return `${maskedLocal}@${domain}`;
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
