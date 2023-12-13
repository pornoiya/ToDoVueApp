<script setup lang="ts">
import type { TToDoListItem } from '@/shared/types'
import { getUid, getPercentage } from '@/shared/utils'
import ToDoListItem from './ToDoListItem.vue'
import ToDoRing from './ToDoRing.vue'
import {ringDataStore} from '@/shared/store'

import { ref } from 'vue'

defineProps<{
  title: string
  // toDoList: TToDoListItem[] | undefined
}>()
const toDoList = ref<TToDoListItem[]>([])

function addFirstTodo() {
  const defaultToDo: TToDoListItem = { id: getUid(), description: '', isChecked: false }
  toDoList.value.push(defaultToDo)
}

document.addEventListener('keypress', function (event) {
  if (event.key === 'Enter' && toDoList.value.length === 0) {
    addFirstTodo()
  }
})

const data = document.getElementsByClassName('"todo-list-item__input')
console.log('data', data);
</script>

<template>
  <div class="main-container">
    <div class="todo-container">
      <input class="to-do-head-input" :value="title" id="title" />
      <h2 className="empty-to-do-list-tip" v-if="!toDoList.length">
        // Press Enter to add a to-do
      </h2>

      <div class="to-do-list">
          <ToDoListItem
          v-for="toDo in toDoList"
          :key="toDo.id"
          :description="toDo.description"
          :is-checked="toDo.isChecked"
          :id="toDo.id"
          :list="toDoList"
        />
      </div>
    </div>
    <ToDoRing :ring-progress-percent="getPercentage(ringDataStore.completedTasksCount, toDoList.length)" />
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Inter';
  src: url('src/assets/fonts/Inter/static/Inter-Bold.ttf') format('truetype');
}

.main-container {
  margin: 50px 80px;
  height: 100%;
  display: flex;
  align-items: start;
  align-content: start;
  justify-items: center;
  justify-content: space-between;
}

.todo-container {
  display: flex;
  width: 50%;
  height: 100%;
  min-height: 600px;
  border-right: solid 2px rgba(204, 204, 204, 0.8);
  flex-direction: column;
}
.to-do-head-input {
  border: none;
  font-size: 54px;
  font-family: 'Inter';
  font-weight: 600;
  outline: none;
}

.to-do-list {
  margin-top: 20px;
}

.empty-to-do-list-tip {
  font-weight: 500;
  color: #cccccccc;
}
</style>
