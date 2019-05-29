<template>
  <div class="dashboard">
    <h1 class="title grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
            <v-icon left small>folder</v-icon>
            <span class="caption text-lowercase">By project name</span>
          </v-btn>
          <span>Sort projects by project name</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
            <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">By person</span>
          </v-btn>
          <span>Sort projects by author name</span>
        </v-tooltip>
      </v-layout>

      <ProjectCard v-for="project in projects" :key="project.id" :project="project"></ProjectCard>
    </v-container>
  </div>
</template>

<script>
import ProjectCard from "@/components/ProjectCard";
import firebase from "@/firebase";

export default {
  data() {
    return {
      projects: []
    };
  },
  components: {
    ProjectCard
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
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
  }
};
</script>
