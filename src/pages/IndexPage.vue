<template>
  <form :class="formClass" @submit.prevent="addTodo">
    <input v-model="newTodo" />
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from "vue";
let id = 0;
export default defineComponent({
  data() {
    return {
      formClass: "form",
      newTodo: "",
      todos: [
        { id: id++, text: "Learn HTML" },
        { id: id++, text: "Learn JavaScript" },
        { id: id++, text: "Learn Vue" },
      ],
    };
  },
  methods: {
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo });
      console.log(this.todos);
      this.newTodo = "";
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo);
    },
  },
});
</script>
<style>
.form {
  margin-top: 15px;
  margin-left: 15px;
}
</style>
