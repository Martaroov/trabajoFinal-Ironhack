// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      //console.log(this.tasks)
    },
    // Hacer POST(nueva tarea)
    async createTask(title, user_id) {
      const { data: tasks, error } = await supabase
        .from("tasks")
        .insert([{ title: title, user_id: user_id, is_complete: false }]);
      this.fetchTasks();
      if(error) console.log(error)
    },
    // Hacer el PUT (edit task)
    async modifyTask(title, id) {
      const { data: tasks } = await supabase
        .from('tasks')
        .update({ title: title })
        .match({ id: id })
      this.fetchTasks();
    },
    // Hacer el delete
    async deleteTask(id){
      const { data, error } = await supabase
      .from('tasks')
      .delete()
      .match({ id: id })
      if(error) console.log(error)
      this.fetchTasks();
    },
   
    // Hacer el PUT (cambiar entre completada y pendiente)
    async toggleTask (id, state){
      const { data, error } = await supabase
      .from('tasks')
      .update({ is_complete: state})
      .match({ id: id })
      if(error) console.log(error)
      this.fetchTasks();
      },
    }
   
});
