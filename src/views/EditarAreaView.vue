<template>
  <div class="container">
    <div class="abs-center">
      <form action="" @submit.prevent="guardar()">
        <div class="mb-3">
          <label class="form-label">Editar Area</label>
          <input type="text" v-model="area.nombre" class="form-control" />
        </div>
        <label class="form-label">Editar Nombre Encargado</label>
        <input
          type="text"
          v-model="area.nombreEncargado"
          class="form-control"
        />
        <label class="form-label">Editar Numero de funcionarios</label>
        <input
          type="number"
          v-model="area.numeroDeFuncionarios"
          class="form-control"
        />
        <button type="submit" class="btn btn-primary m-2">Guardar</button>
        <button class="btn btn-light m-2">Cancelar</button>
      </form>
      <button class="btn btn-danger m-2" @click="cancelar()">Cancelar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditarAreaView",
  data() {
    return {
      area: {
        nombre: null,
        nombreEncargado: null,
        numeroDeFuncionarios: null,
      },
    };
  },
  methods: {
    getArea() {
      axios({
        method: "get",
        url: "http://localhost:5555/area/" + this.$route.params.id,
      })
        .then((response) => {
          this.area = response.data;
          console.log(response);
        })
        .catch((e) => console.log(e));
    },

    guardar() {
      console.log("GUARDAR");
      axios({
        method: "patch",
        url: "http://localhost:5555/area/" + this.$route.params.id,
        data: this.area,
      })
        .then((response) => {
          this.$router.push({ name: "areas" });
        })
        .catch((e) => console.log(e));
    },
    cancelar() {
      this.$router.push({ name: "areas" });
    },
  },
  computed: {},
  mounted() {
    this.getArea();
  },
  components: {},
};
</script>

<style scoped>
form {
  max-width: 400px;
}
</style>
