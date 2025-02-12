import MARIO_GAME_ANIMATION_404_ERROR_PAGE_V3 from "/mario404.gif";
const GRAPHQL_SERVER_URL = String(import.meta.env.VITE_GRAPHQL_SERVER_URL);

const AUTH_COOKIES_REMOVE_LIST: Array<string> = [
  "refreshToken",
  "accessToken",
] as const;

export {
  MARIO_GAME_ANIMATION_404_ERROR_PAGE_V3,
  GRAPHQL_SERVER_URL,
  AUTH_COOKIES_REMOVE_LIST,
};
