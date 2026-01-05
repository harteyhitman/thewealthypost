// Admin API utility - uses environment variable for API URL
const getApiUrl = () => {
  // Use environment variable, fallback to localhost for development
  if (typeof window !== 'undefined') {
    // Client-side: use environment variable
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }
  // Server-side: use environment variable
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
};

export const API_URL = getApiUrl();

// Helper function to get full API endpoint URL
export const getApiEndpoint = (endpoint: string) => {
  const baseUrl = API_URL;
  // Remove leading slash from endpoint if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  // Ensure base URL doesn't have trailing slash
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  return `${cleanBaseUrl}/${cleanEndpoint}`;
};

