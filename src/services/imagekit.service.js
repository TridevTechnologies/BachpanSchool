/**
 * ImageKit Media Service
 * 100% Dynamic - Fetches live assets from ImageKit Media API via reverse proxy.
 * Zero fallback images, zero third-party patchwork.
 */

class ImageKitMediaService {
  constructor() {
    this.privateKey = "private_jM8qtJZ+GzAwkea1dpucoPMaCC4=";
    this.authHeader = "Basic " + btoa(`${this.privateKey}:`);
  }

  /**
   * Fetches real-time file list from ImageKit folder.
   * Uses same-origin reverse-proxy (/v1/files) to completely avoid CORS.
   */
  async fetchFolderFiles(folderPath) {
    try {
      const response = await fetch(`/v1/files?path=${encodeURIComponent(folderPath)}`, {
        method: "GET",
        headers: {
          Authorization: this.authHeader,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        console.warn(`[ImageKit] Fetch status ${response.status} for folder: ${folderPath}`);
        return [];
      }

      const data = await response.json();
      const files = Array.isArray(data) ? data : data.results || [];

      return files.map((file) => ({
        id: file.fileId || file.name,
        name: file.name,
        url: file.url,
        caption: file.name
          ? file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ")
          : "School Memory",
        alt: file.name || "School Image",
      }));
    } catch (err) {
      console.error(`[ImageKit] Failed to fetch folder ${folderPath}:`, err);
      return [];
    }
  }

  /**
   * Dynamically fetch banners from ImageKit 'Banner' folder.
   * If Banner folder is empty, also checks root '/' directory.
   */
  async fetchBanners() {
    let banners = await this.fetchFolderFiles("Banner");

    // If no images found inside /Banner, check root '/'
    if (!banners || banners.length === 0) {
      banners = await this.fetchFolderFiles("/");
    }

    return banners;
  }

  /**
   * Dynamically fetch gallery images for category ('campus' or 'events').
   */
  async fetchGallery(category) {
    const folder = category === "events" ? "Gallery/Events" : "Gallery/Campus";
    return this.fetchFolderFiles(folder);
  }

  getCategories() {
    return [
      { id: "campus", label: "Campus Life" },
      { id: "events", label: "Special Events" },
    ];
  }
}

export const mediaService = new ImageKitMediaService();
