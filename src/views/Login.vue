<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6>
      <v-card class="pa-5"  color="secondary">
        <v-card-title primary-title>
          <v-layout row wrap>
            <v-flex xs8>
              <h3 class="mb-0 display-2 white--text" >Login</h3>
            </v-flex>
            <v-flex xs4>
                <v-btn flat color="primary" left to="/register">Register</v-btn>
            </v-flex>
          </v-layout>
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
