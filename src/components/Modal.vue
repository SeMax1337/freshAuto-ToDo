<template>
  <div v-show="show" class="relative z-10 transition ease-out duration-300 ease-in duration-200"
    aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
        <div
          class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Добавить задачу</h3>
                <div class="mt-2 flex flex-col gap-3">
                  <div>
                    <label for="title" class="block text-sm font-medium text-gray-700">Название</label>
                    <div class="mt-1">
                      <input v-model="todo.title" type="text" name="title" id="title"
                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Введите название" />
                    </div>
                  </div>
                  <div>
                    <label for="type" class="block text-sm font-medium text-gray-700">Тип</label>
                    <select v-model="tempData.type" id="type" name="type"
                      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option>Личное</option>
                      <option>Работа</option>
                      <option>Дом</option>
                      <option>Животные</option>
                    </select>
                  </div>
                  <div>
                    <label for="date" class="block text-sm font-medium text-gray-700">Дата</label>
                    <input v-model="tempData.date" id="date" name="date" type="date"
                        class="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Выберите дату">
                  </div>
                  <div>
                    <label for="body" class="block text-sm font-medium text-gray-700">Описание</label>
                    <div class="mt-1">
                      <textarea v-model="todo.body" rows="4" name="body" id="body" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="add" type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">Добавить</button>
            <button @click="toggleView" type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  export default {
    name: 'App',
    components: {

    },
    data() {
      return {
        show: false,
        todo: {
          id: 1,
          title: "",
          body: "",
          userId: 1
        },
        tempData: {
          type: 'Дом',
          date: null
        }
      }
    },
    methods: {
      ...mapActions(['getTodos', 'addNewTodo']),
      add() {
        const todo = {
          title: this.computedTitle,
          body: this.todo.body,
          userId: this.todo.userId
        }
        this.addNewTodo(todo).then(this.toggleView())
      },
      toggleView() {
        this.show = !this.show
      }
    },
    computed: {
      ...mapGetters(['GET_TODOS']),
      computedTitle() {
        return `${this.tempData.type} - ${this.tempData.date} - ${this.todo.title}`
      }
    },
    mounted() {
      this.$eventHub.$on('addTodo', () => {
        this.toggleView()
      });
    }
  }
</script>