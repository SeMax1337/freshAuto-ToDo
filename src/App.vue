<template>
  <div class="h-screen flex">
    <div class="bg-white shadow overflow-hidden sm:rounded-lg w-2/3 m-auto">
      <div class="flex items-center justify-between px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">ToDo Vue App for FreshAuto</h3>
        <button @click="addTodo" type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Добавить новую задачу
        </button>
      </div>
      <div class="border-t border-gray-200">
        <div v-for="todo in GET_TODOS" :key="todo.id" class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-gray-100 transition"
          :class="todo.id % 2 ? 'bg-gray-50' : ''">
          <dt class="text-sm font-medium text-gray-500">{{todo.title}}</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{todo.body}}</dd>
        </div>
      </div>
    </div>
    <Modal/>
  </div>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  import Modal from './components/Modal.vue'
  export default {
    name: 'App',
    components: {
      Modal
    },
    data() {
      return {

      }
    },
    methods: {
      ...mapActions(['getTodos']),
      addTodo(){
        this.$eventHub.$emit('addTodo');
      },
    },
    computed: {
      ...mapGetters(['GET_TODOS'])
    },
    mounted() {
      this.getTodos()
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>