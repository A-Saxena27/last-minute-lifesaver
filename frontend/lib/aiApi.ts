import { apiFetch } from "./api";

export async function prioritizeTasks() {
  return apiFetch("/ai/prioritize", {
    method: "POST",
  });
}

export async function futureSelf() {
  return apiFetch("/ai/future-self", {
    method: "POST",
  });
}

export async function getBattlePlan() {
  return apiFetch("/ai/battle-plan", {
    method: "POST",
  });
}

export async function getReplan() {
  return apiFetch("/ai/replan", {
    method: "POST",
  });
}
