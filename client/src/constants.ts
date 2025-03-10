import MARIO_GAME_ANIMATION_404_ERROR_PAGE_V3 from "/mario404.gif";
const AUTH_COOKIES_REMOVE_LIST: Array<string> = [
    "refreshToken",
    "accessToken",
  ] as const;
export { MARIO_GAME_ANIMATION_404_ERROR_PAGE_V3,AUTH_COOKIES_REMOVE_LIST };
export const SUPPORT_ESSUE_TYPE_ENUM = Object.freeze({
  TECHNICAL: "Technical",
  ACCOUNT: "Account",
  OTHER: "Other",
});
export const SUPPORT_ESSUE_TYPE = Object.values(SUPPORT_ESSUE_TYPE_ENUM)
export const VITE_HOST_URL = String(import.meta.env.VITE_HOST_URL)