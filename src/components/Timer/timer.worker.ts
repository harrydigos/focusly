// import { Timer } from "~/types";

// type WorkerMessage = Pick<
//   Timer,
//   "currentTime" | "currentPomo" | "isOnBreak"
// > & { isRunning: boolean };

let timerId: number;

const resetTimer = () => {
  clearInterval(timerId);
  timerId = 0;
};

// onmessage = (e: MessageEvent<WorkerMessage>) => {
onmessage = (e) => {
  let time = e.data.currentTime;
  const pomo = e.data.currentPomo;

  if (time <= 0) {
    if (e.data.isOnBreak) {
      /* Break ended, starting new pomo session */
      postMessage({
        currentTime: 25 * 60,
        currentPomo: pomo === 3 ? 0 : pomo + 1,
        isOnBreak: false,
      });
    } else {
      /* Pomo ended, starting break */
      postMessage({
        currentTime: (pomo + 1) % 4 ? 5 * 60 : 15 * 60,
        currentPomo: pomo,
        isOnBreak: true,
      });
    }
    resetTimer();
    return;
  }

  if (!e.data.isRunning) {
    resetTimer();
  } else if (e.data.isRunning && !timerId) {
    timerId = setInterval(
      () => postMessage({ currentTime: --time }),
      1000,
    ) as unknown as number;
  }
};
