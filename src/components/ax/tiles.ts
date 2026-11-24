import {
  siFacebook,
  siGmail,
  siGoogle,
  siGoogleads,
  siGooglemaps,
  siInstagram,
  siMessenger,
  siMeta,
  siShopify,
  siTiktok,
  siWhatsapp,
  siWordpress,
  siYoutube,
} from "simple-icons";
import { heroTiles, type HeroTile } from "../brandIcons";

/* Positions are % of the panel's content box (a half-screen on desktop).
   The lower-start corner stays clear for the big word and the line under it. */

const pick = (id: string, x: number, y: number, size: number, depth: number): HeroTile => {
  const tile = heroTiles.find((t) => t.id === id);
  if (!tile) throw new Error(`Unknown tile ${id}`);
  return { ...tile, x, y, size, depth };
};

/** The engineer's stack: the same tiles as the portfolio hero. */
export const techTiles: HeroTile[] = [
  pick("claude", 14, 14, 1.2, 1.5),
  pick("openai", 46, 9, 1.0, 1.2),
  pick("kubernetes", 68, 16, 0.85, 0.9),
  pick("python", 30, 30, 0.8, 1.4),
  pick("aws", 64, 31, 1.1, 1.1),
  pick("n8n", 88, 38, 0.9, 1.7),
  pick("typescript", 10, 44, 0.8, 1.0),
  pick("googlegemini", 48, 48, 0.95, 1.3),
  pick("docker", 92, 62, 0.95, 1.6),
  pick("react", 66, 78, 0.85, 1.2),
  pick("github", 90, 84, 0.75, 0.8),
];

const tile = (
  id: string,
  title: string,
  path: string,
  bg: string,
  fg: string,
  x: number,
  y: number,
  size: number,
  depth: number,
  glow?: string,
): HeroTile => ({ id, title, path, bg, fg, x, y, size, depth, glow });

/** The tools a small business lives in: where the services happen. */
export const businessTiles: HeroTile[] = [
  tile("whatsapp", "WhatsApp", siWhatsapp.path, "#25D366", "#FFFFFF", 84, 14, 1.25, 1.5, "rgba(37, 211, 102, 0.5)"),
  tile("instagram", "Instagram", siInstagram.path, "#E1306C", "#FFFFFF", 52, 9, 1.0, 1.2, "rgba(225, 48, 108, 0.45)"),
  tile("facebook", "Facebook", siFacebook.path, "#0866FF", "#FFFFFF", 33, 15, 0.95, 0.9, "rgba(8, 102, 255, 0.45)"),
  tile("meta", "Meta", siMeta.path, "#FFFFFF", "#0467DF", 68, 30, 0.85, 1.4),
  tile("google", "Google", siGoogle.path, "#FFFFFF", "#4285F4", 36, 31, 0.9, 1.1),
  tile("tiktok", "TikTok", siTiktok.path, "#111111", "#FFFFFF", 12, 40, 0.85, 1.7),
  tile("shopify", "Shopify", siShopify.path, "#7AB55C", "#FFFFFF", 90, 44, 0.9, 1.0),
  tile("googleads", "Google Ads", siGoogleads.path, "#FFFFFF", "#FBBC04", 52, 50, 0.8, 1.3),
  tile("wordpress", "WordPress", siWordpress.path, "#21759B", "#FFFFFF", 31, 58, 0.85, 1.6),
  tile("messenger", "Messenger", siMessenger.path, "#0866FF", "#FFFFFF", 8, 82, 0.75, 1.2),
  tile("gmail", "Gmail", siGmail.path, "#FFFFFF", "#EA4335", 36, 80, 0.8, 0.8),
  tile("googlemaps", "Google Maps", siGooglemaps.path, "#FFFFFF", "#34A853", 4, 60, 0.75, 1.4),
];

/** Wider scatter for the services hero (full width). */
export const businessHeroTiles: HeroTile[] = [
  { ...businessTiles[0], x: 88, y: 26, size: 1.35 },
  { ...businessTiles[1], x: 70, y: 20, size: 1.0 },
  { ...businessTiles[2], x: 9, y: 24, size: 1.05 },
  { ...businessTiles[3], x: 30, y: 19, size: 0.85 },
  { ...businessTiles[4], x: 52, y: 22, size: 0.8 },
  { ...businessTiles[5], x: 94, y: 46, size: 0.85 },
  { ...businessTiles[6], x: 77, y: 38, size: 0.9 },
  { ...businessTiles[7], x: 22, y: 32, size: 0.75 },
  { ...businessTiles[8], x: 5, y: 44, size: 0.85 },
  { ...businessTiles[9], x: 62, y: 30, size: 0.7 },
  { ...businessTiles[10], x: 41, y: 28, size: 0.7 },
  { id: "youtube", title: "YouTube", path: siYoutube.path, bg: "#FF0000", fg: "#FFFFFF", x: 86, y: 66, size: 0.8, depth: 1.3 },
];
