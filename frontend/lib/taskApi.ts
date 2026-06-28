import { apiFetch } from "./api";

export async function createTask(task: any) {
  return apiFetch("/tasks/create", {
    method: "POST",
    body: JSON.stringify(task),
  });
}

export async function getTasks() {
  return apiFetch("/tasks");
}
