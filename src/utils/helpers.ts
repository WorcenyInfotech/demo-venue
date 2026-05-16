/**
 * Helper Utility Functions
 */

/**
 * Format date to Indian locale string
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format date for input[type="date"]
 */
export function formatDateForInput(date: string | Date): string {
  return new Date(date).toISOString().split("T")[0];
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generate WhatsApp URL
 */
export function getWhatsAppUrl(
  phone: string,
  message: string = "Hello! I'm interested in booking Ramayan Farm for my wedding."
): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

/**
 * Validate Indian mobile number
 */
export function isValidIndianMobile(mobile: string): boolean {
  return /^[6-9]\d{9}$/.test(mobile.replace(/\D/g, ""));
}

/**
 * Get status badge color
 */
export function getStatusColor(
  status: string
): { bg: string; text: string; border: string } {
  switch (status) {
    case "new":
      return {
        bg: "bg-blush",
        text: "text-rose-gold-deep",
        border: "border-rose-gold/25",
      };
    case "contacted":
      return {
        bg: "bg-cream",
        text: "text-ink",
        border: "border-rose-gold/20",
      };
    case "confirmed":
      return {
        bg: "bg-rose-gold/15",
        text: "text-rose-gold-deep",
        border: "border-rose-gold/35",
      };
    case "cancelled":
      return {
        bg: "bg-red-50",
        text: "text-red-800",
        border: "border-red-200",
      };
    default:
      return {
        bg: "bg-blush/50",
        text: "text-ink/80",
        border: "border-rose-gold/15",
      };
  }
}

/**
 * Capitalize first letter of each word
 */
export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Generate slug from string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Get minimum date for event booking (tomorrow)
 */
export function getMinBookingDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}
