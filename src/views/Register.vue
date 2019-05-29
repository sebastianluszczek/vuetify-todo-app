<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="pa-5">
        <v-card-title primary-title>
          <h3 class="headline mb-0 text-xs-center">Register</h3>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Name"
            prepend-icon="person"
            v-model="name"
            :rules="[rules.required, rules.min]"
          ></v-text-field>
          <v-text-field
            label="Email"
            prepend-icon="mail"
            v-model="email"
            :rules="[rules.required, rules.min]"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="pass_show ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="pass_show ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            prepend-icon="lock"
            @click:append="pass_show = !pass_show"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click.prevent="register">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from "@/firebase";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      pass_show: false,
      password: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 4 || "Min 4 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  name: "register",
  methods: {
    register() {
      if (this.name && this.email && this.password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(
            user => {
              console.log(user);
              const newUser = {
                name: this.name,
                mail: this.email
              };
              firebase.auth().currentUser.updateProfile({
                displayName: this.name
              });
              firebase
                .firestore()
                .collection("users")
                .add(newUser)
                .then(() => {
                  console.log("user added!");
                  this.$router.go({ name: "dashboard" });
                });
            },
            err => {
              alert(err.message);
            }
          );
      } else {
        console.log(
          "All inputs have to be completed and passwords have to match!"
        );
      }
    }
  }
};
</script>

<style>
</style>
