<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="pa-5">
        <v-card-title primary-title>
          <h3 class="headline mb-0 text-xs-center">Login</h3>
        </v-card-title>
        <v-card-text>
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
          <v-btn color="primary" @click.prevent="login">Login</v-btn>
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
      email: "",
      password: "",
      pass_show: false,
      password: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  name: "login",
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            console.log(user.user.email);
            this.$router.go({ name: "login" });
          },
          err => {
            alert(err.message);
          }
        );
    }
  }
};
</script>

<style>
</style>
