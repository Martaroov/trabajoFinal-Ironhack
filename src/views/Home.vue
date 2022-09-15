<template>
  <div class="background">
    <div class="centeritems">
        <h1 class="todotitle">Create your own task</h1>
        <!--añadir tarea-->
        <div v-if="taskStore.tasks">
            <input type="text" class="writetask" v-model="newTask">
            <button class="tablebutton" @click="create">Add a new task</button>
    </div>
    
      <table class="tableok">
        <thead>
          <tr>
            <th>Task num. </th>
            <th>Date</th>
            <th>Description</th>
            <th>Status</th>
            <th>Delete</th>
            <th>Edit </th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in taskStore.tasks" :key="task.id">
            <td class="task">
              {{ task.id }}
            </td>
            <td>{{ task.inserted_at }}</td>
            <td>
              <input :disabled="isNotEditable" type="text" v-model="task.title" />
            </td>
            <td><input @click="toggleTask(task)" v-model="task.is_complete" type="checkbox"></td>
            <!--verdadero/falso tarea-->
            
            <!--eliminar tarea-->
            <td>
                <img class="trash" src="../assets/images/trash.png"  @click="deleteTask(task)">
            </td>
            <!--modificar tarea-->
            <td>
                <button v-if="isNotEditable" class="littlebutton" @click="toggleIsNotEditable">
                    Edit
                </button>
                <button v-else class="littlebutton" @click="modifyTask(task)">Confirm</button>
               
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../store/user";
import { useTaskStore } from "../store/task";

export default {
  data() {
    return {
      isNotEditable: true,
      newTask: 'Write your new task',
      id: ''
    };
  },
  setup() {
    const userStore = useUserStore();
    const taskStore = useTaskStore();
    return { userStore, taskStore };
  },

  async mounted() {
    this.id = this.userStore.user.id;
    console.log(this.id)
    await this.taskStore.fetchTasks();
    console.log(this.taskStore.tasks);
  },
  methods: {
//editar tarea
toggleIsNotEditable(){

    this.isNotEditable = !this.isNotEditable
},
async modifyTask(task) {
    await this.taskStore.modifyTask(task.title, task.id);
    this.isNotEditable = !this.isNotEditable
    },
//eliminar tarea
    async deleteTask(task) {
      await this.taskStore.deleteTask(task.id);
    },
//crear una tarea
    async create() {
      await this.taskStore.createTask(this.newTask, this.id);
    },
//verdadero/falso tarea
    async  toggleTask(task){
        console.log(task.is_complete);
        console.log(task.id);
        await this.taskStore.toggleTask(task.id, task.is_complete ? false : true);
    },

  },
};
</script>

<style lang="scss" scoped>

.background {
  height: 100vh;
  padding: 2rem;
}
.todotitle {
  font-weight: 600;
}
.writetask{
    border-radius: 8px;
    border: 2px solid rgb(146, 123, 197);
    padding: 5px 205px 9px 10px;
    margin: 0 0 10px;
    color: rgba(19, 35, 47, 0.9);
    opacity: 0.8;
}

.task {
  color: black;
}
.tablebutton {

  background-color: rgb(146, 123, 197);
  color: white;
  border-radius: 8px;
  padding: 9px;
  margin-left: 1%;
  &:hover {
    background-color: rgb(255, 192, 31);
    text-decoration: none;
  }
}



// estilos tabla

.tableok {
  background-color: whitesmoke;
  margin-top: 20px;
  border-radius: 25px;
  width: 100%;
  text-align: left;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}



table tr:nth-child(even) {
  background-color: rgb(250, 248, 248);
  &:hover {
    background-color: rgb(238, 238, 238);
    opacity: 0.8;
  }
}

table tr:nth-child(odd) {
  background-color: #fff;
  &:hover {
    background-color: rgb(238, 238, 238);
    opacity: 0.8;
  }
}

td {
  padding: 15px;
  margin: 15px;
}
th {
  padding: 15px;
  margin: 15px;
}


.littlebutton {
  background-color: rgb(236, 236, 236);
  color: rgba(19, 35, 47, 0.9);
  border-radius: 7px;
  border-color: red 10px;
  padding: 8px;
  margin-left: 1%;
  &:hover {
    background-color: rgb(255, 192, 31);
    text-decoration: none;
  }
}

.trash{
 width: 60px;
 text-align: left;
}
</style>