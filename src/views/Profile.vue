<template>
  <div class="team">
    <h1 class="title grey--text">Edit Profile</h1>
    <v-container class="my-5">
      <v-layout>
        <v-flex sm12 md8>
          <v-layout row wrap>
            <v-flex xs12 sm8 md6 lg4>
              <v-text-field label="Name" disabled :value="currentUser.displayName"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm8 md6 lg4>
              <v-text-field label="Email" disabled :value="currentUser.email"></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex sm6 md4>
          <v-img :src="currentUser.photoURL" v-if="currentUser.photoURL"></v-img>
        </v-flex>
      </v-layout>

      <input type="file" name="photo" id="photo">
      <v-btn color="primary" @click="updateProfile">Update Avatar</v-btn>
    </v-container>
  </div>
</template>

<script>
import firebase from "@/firebase";

export default {
  data() {
    return {
      currentUser: null,
      imageURL: ""
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.currentUser = firebase.auth().currentUser;
      console.log(this.currentUser);
    }
  },
  methods: {
    async updateProfile() {
      const file = document.getElementById("photo").files[0];
      const ref = firebase.storage().ref();
      const name = +new Date() + "-" + file.name;
      const metadata = { contentType: file.type };

      const task = await ref.child(name).put(file, metadata);
      const url = await task.ref.getDownloadURL();
      this.imageURL = url;

      firebase.auth().currentUser.updateProfile({
        photoURL: this.imageURL
      });

      firebase
        .firestore()
        .collection("users")
        .doc(this.currentUser.uid)
        .set(
          {
            avatarURL: this.imageURL
          },
          { merge: true }
        );
    }
  }
};
</script>

<style>
</style>
