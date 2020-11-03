<template>
  <div class="container">
    <form class="form-inline">
      <div class="form-group mb-2">
        <label for="staticEmail2" class="sr-only">Email</label>
        <input
          v-model="currentUser.data.email"
          type="text"
          class="form-control"
          id="staticEmail2"
          value="email@example.com"
          placeholder="Email"
        />
      </div>
      <div class="form-group mx-sm-3 mb-2">
        <label for="inputPassword2" class="sr-only">Name</label>
        <input
          v-model="currentUser.data.name"
          type="text"
          class="form-control"
          id="inputPassword2"
          placeholder="name"
        />
      </div>
      <button
        @click.prevent="submitUser"
        type="submit"
        v-text="currentUser.id ? 'Actualizar' : 'Crear'"
        class="btn btn-primary mb-2"
      >
        Crear
      </button>
      <button type="submit" class="btn btn-warning mb-2 ml-2">Cancelar</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      currentUser: {
        id: null,
        data: {
          name: "",
          email: "",
        },
      },
    };
  },
  methods: {
    ...mapActions(["createUser", "updateUser"]),
    submitUser() {
      if (!this.isEmptyUser()) {
        this.currentUser.id ? this.updateUser(this.currentUser) : this.createUser(this.currentUser.data);
        this.emptyUser();
      } else {
        alert("Ambos campos son obligatorios");
      }
    },
    isEmptyUser() {
      return (
        this.currentUser.data.name == "" || this.currentUser.data.email == ""
      );
    },
    emptyUser() {
      this.currentUser.data.name = "";
      this.currentUser.data.email = "";
      this.currentUser.id = null;
    },
  },
  computed:{
    ...mapState(["editUser"]),

  },
    watch: {
      editUser: function () {
        this.currentUser.data.name = this.editUser.data.name;
        this.currentUser.data.email = this.editUser.data.email;
        this.currentUser.id = this.editUser.id;
      },
    },
};
</script>

<style></style>
