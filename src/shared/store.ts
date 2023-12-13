import type { TToDoListItem } from './types'
import { reactive } from 'vue'

export const ringDataStore = reactive<{
  tasksList: TToDoListItem[],
  completedTasksCount: number;
  incrementCompletedTasksCount: () => void;
  decrementCompletedTasksCount: () => void;
}>({
  tasksList: [],
  completedTasksCount: 0,
  incrementCompletedTasksCount() {
    this.completedTasksCount++
  },
  decrementCompletedTasksCount() {
    if (this.completedTasksCount > 0) this.completedTasksCount--
  }
})
