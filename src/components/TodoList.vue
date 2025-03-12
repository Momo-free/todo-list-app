<template>
  <div class="todo-list">
    <div class="add-todo">
      <input 
        v-model="newTodo" 
        @keyup.enter="addTodo"
        placeholder="添加新的待办事项..."
        type="text"
      >
      <button @click="addTodo">添加</button>
    </div>

    <div class="todo-items">
      <div v-for="todo in todos" :key="todo.id" class="todo-item">
        <input 
          type="checkbox" 
          v-model="todo.completed"
        >
        <span v-if="!todo.editing" :class="{ completed: todo.completed }">
          {{ todo.text }}
        </span>
        <input 
          v-else
          v-model="todo.text"
          @keyup.enter="finishEdit(todo)"
          @blur="finishEdit(todo)"
          type="text"
          ref="editInput"
        >
        <div class="actions">
          <button @click="startEdit(todo)">编辑</button>
          <button @click="deleteTodo(todo.id)">删除</button>
        </div>
      </div>
    </div>

    <div class="todo-stats" v-if="todos.length">
      <span>总计: {{ todos.length }} 项</span>
      <span>已完成: {{ completedCount }} 项</span>
      <span>未完成: {{ remainingCount }} 项</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data() {
    return {
      newTodo: '',
      todos: []
    }
  },
  computed: {
    completedCount() {
      return this.todos.filter(todo => todo.completed).length
    },
    remainingCount() {
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({
          id: Date.now(),
          text: this.newTodo.trim(),
          completed: false,
          editing: false
        })
        this.newTodo = ''
      }
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    startEdit(todo) {
      todo.editing = true
      this.$nextTick(() => {
        this.$refs.editInput[0].focus()
      })
    },
    finishEdit(todo) {
      todo.editing = false
    }
  }
}
</script>

<style scoped>
.todo-list {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.add-todo {
  display: flex;
  margin-bottom: 20px;
}

.add-todo input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item span {
  flex: 1;
  margin: 0 10px;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.actions {
  display: flex;
  gap: 5px;
}

.actions button {
  padding: 4px 8px;
  font-size: 0.9em;
}

.actions button:first-child {
  background-color: #2196F3;
}

.actions button:last-child {
  background-color: #f44336;
}

.actions button:hover {
  opacity: 0.9;
}

.todo-stats {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9em;
}
</style> 