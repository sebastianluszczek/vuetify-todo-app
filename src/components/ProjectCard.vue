<template>
  <v-card flat>
    <v-layout row wrap :class="`pa-3 my-1 project ${project.status}`">
      <v-flex xs12 md6>
        <div class="caption grey--text">Project title</div>
        <div>{{project.title}}</div>
      </v-flex>
      <v-flex xs6 sm4 md2>
        <div class="caption grey--text">Person</div>
        <div>{{project.person}}</div>
      </v-flex>
      <v-flex xs6 sm4 md2>
        <div class="caption grey--text">Due by</div>
        <div>{{project.due}}</div>
      </v-flex>
      <v-flex xs2 sm4 md2>
        <div class="right">
          <v-chip small :class="`${project.status} white--text caption my-2`">{{project.status}}</v-chip>
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: "project-card",
  props: ["project"]
};
</script>

<style lang="scss">
.project {
  border-left: 4px solid;
  &.complete {
    border-left-color: #03a9f4;
  }
  &.ongoing {
    border-left-color: #fdd835;
  }
  &.overdue {
    border-left-color: #d50000;
  }

  .v-chip {
    &.complete {
      background-color: #03a9f4;
    }
    &.ongoing {
      background-color: #fdd835;
    }
    &.overdue {
      background-color: #d50000;
    }
  }
}
</style>
