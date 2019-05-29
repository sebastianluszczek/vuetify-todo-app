<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="primary">Add new project</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a New Project</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field label="Title" v-model="title" prepend-icon="folder" :rules="inputRules"></v-text-field>
          <v-textarea label="Information" v-model="content" prepend-icon="edit" :rules="inputRules"></v-textarea>
          <v-layout row>
            <v-menu>
              <v-text-field
                :value="formattedDate"
                slot="activator"
                label="Due date"
                prepend-icon="date_range"
                :rules="inputRules"
              ></v-text-field>
              <v-date-picker v-model="due" :landscape="landscape" :reactive="reactive"></v-date-picker>
            </v-menu>
            <v-spacer></v-spacer>
            <v-btn flat class="primary mx-0 mt-3" @click="submit()" :loading="loading">ADD PROJECT</v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from "date-fns/format";
import firebase from "@/firebase";

export default {
  data() {
    return {
      title: "",
      content: "",
      due: "",
      landscape: true,
      reactive: true,
      inputRules: [v => v.length >= 3 || "Minimum length is 3 character"],
      loading: false,
      dialog: false,
      currentUser: ""
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // console.log(this.title, this.content, this.due);
        const project = {
          title: this.title,
          content: this.content,
          due: format(this.due, "Do MMM YYYY"),
          person: this.currentUser.displayName,
          status: "ongoing"
        };
        this.loading = true;

        firebase
          .firestore()
          .collection("projects")
          .add(project)
          .then(() => {
            this.loading = false;
            this.dialog = false;
          });
      }
    }
  },
  computed: {
    formattedDate() {
      return this.due ? format(this.due, "Do MMM YYYY") : "";
    }
  },
  mounted() {
    if (firebase.auth().currentUser) {
      this.currentUser = firebase.auth().currentUser;
    }
  }
};
</script>

<style>
</style>
