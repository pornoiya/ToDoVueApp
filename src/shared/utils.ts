export function getUid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(0, 2)
}

export const getPercentage = (completedTasksCount: number, tasksCount: number) => {
  return tasksCount > 0 ? Math.round((completedTasksCount * 100) / tasksCount) : 0
}
