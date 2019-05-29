<template>
  <div class="projects">
    <h1 class="title grey--text">Projects</h1>

    <v-container class="my-5">
      <v-expansion-panel flat v-for="project in myProjects" :key="project.title" class="mb-1">
        <v-expansion-panel-content>
          <div slot="header">{{ project.title }}</div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">{{ project.due }}</div>
              <div>{{ project.content }}</div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import firebase from "@/firebase";

export default {
  data() {
    return {
      projects: [],
      currentUser: ""
    };
  },
  computed: {
    myProjects() {
      return this.projects.filter(project => {
        return project.person === this.currentUser.displayName;
      });
    }
  },
  created() {
    firebase
      .firestore()
      .collection("projects")
      .onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
          if (change.type === "added") {
            this.projects.push({
              ...change.doc.data(),
              id: change.doc.id
            });
          }
        });
      });
  },
  mounted() {
    if (firebase.auth().currentUser) {
      this.currentUser = firebase.auth().currentUser;
    }
  }
};
</script>