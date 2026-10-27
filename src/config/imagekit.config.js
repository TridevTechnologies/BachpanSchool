/**
 * Enterprise ImageKit Configuration
 * Follows Single Responsibility Principle (SRP) for centralizing third-party CDN configuration.
 */

export const IMAGEKIT_CONFIG = Object.freeze({
  urlEndpoint: "https://ik.imagekit.io/vbjia17nu",
  publicKey: "public_RRrwwhLifYVcRlm",
  folders: {
    banner: "Banner",
    campus: "Gallery/Campus",
    events: "Gallery/Events",
  },
  defaultTransform: {
    quality: 85,
    format: "auto",
  },
});
