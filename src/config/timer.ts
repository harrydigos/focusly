import { Timer } from "~/types";

/**
 * A pomo is always 25 minutes.
 * A short break is 5 minutes while a long (happens every 4 pomos) is 15 minutes.
 */
export const INIT_TIMER: Pick<
  Timer,
  "currentTime" | "currentPomo" | "isOnBreak"
> = {
  currentTime: 25 * 60,
  currentPomo: 0,
  isOnBreak: false,
};
