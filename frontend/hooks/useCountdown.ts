const countdownEl = document.querySelector(".tabular-nums");
if (countdownEl) {
  let totalSeconds = 42 * 60 + 15;
  setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      const h = Math.floor(totalSeconds / 3600)
        .toString()
        .padStart(2, "0");
      const m = Math.floor((totalSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const s = (totalSeconds % 60).toString().padStart(2, "0");
      countdownEl.textContent = `${h}:${m}:${s}`;
    }
  }, 1000);
}
