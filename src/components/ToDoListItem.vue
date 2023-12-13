<script setup lang="ts">
import { getUid } from '@/shared/utils'
import { ringDataStore } from '@/shared/store'
type TToDoType = {
  id: string
}
defineProps<
  TToDoType
>()

const { toDoList } = ringDataStore;

function addTodo(list: TToDoType[], previousId: string | undefined) {
  const defaultToDo: TToDoType = { id: getUid() }
  const previousIndex: number | undefined = list.findIndex((item) => item.id === previousId)
  if (previousIndex === undefined || previousIndex === list.length - 1) {
    list.push(defaultToDo)
  } else {
    list.splice(previousIndex + 1, 0, defaultToDo)
  }
}

function removeToDo(list: TToDoType[], currentId: string) {
  const idx = list.findIndex((x) => x.id === currentId)
  list.splice(idx, 1)
}
</script>

<template>
  <div class="todo-list-item">
    <input
      type="checkbox"
      :name="id"
      :id="id"
      @input="
        (event) => {
          // @ts-ignore
          event.target.checked
            ? ringDataStore.incrementCompletedTasksCount()
            : ringDataStore.decrementCompletedTasksCount()
        }
      "
    />
    <label :for="id" class="todo-list-item__checkbox"></label>
    <input
      class="todo-list-item__input"
      @keyup.enter="addTodo(toDoList, id)"
      @keyup="
        (event) => {
          // @ts-ignore
          if (event.key === 'Backspace' && event.target?.value?.length === 0) {
            removeToDo(toDoList, id)
          }
        }
      "
    />
  </div>
</template>

<style scoped>
.todo-list-item {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 7px;
}
.todo-list-item__checkbox {
  height: 20px;
  width: 20px;
  border: 2px solid black;
  border-radius: 2px;
  content: '';
  margin-right: 6px;
  padding-top: 3px;
}

.todo-list-item input[type='checkbox'] {
  display: none;
}

.todo-list-item input[type='checkbox']:checked ~ label::before {
  content: url('src/components/icons/IconCheck.svg');
}

label {
  cursor: pointer;
}
.todo-list-item input[type='checkbox']:checked ~ label {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #005ce6;
  border: none;
}

.todo-list-item input[type='checkbox']:checked ~ .todo-list-item__input {
  color: #707070;
  text-decoration-line: line-through;
}

.todo-list-item__input {
  font-family: 'Inter';
  font-size: 17px;
  font-weight: 500;
  border: none;
}

.todo-list-item__input:focus {
  outline: none;
}
</style>
