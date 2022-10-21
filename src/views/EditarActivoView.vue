<template>
  <div class="container">
    <div class="abs-center">
      <form action="" @submit.prevent="guardar()">
        <div class="mb-3">
          <label class="form-label">Editar tipo</label>
          <input type="text" v-model="activo.tipo" class="form-control" />
        </div>
        <label class="form-label">Editar marca</label>
        <input type="text" v-model="activo.marca" class="form-control" />
        <label class="form-label">Editar Modelo</label>
        <input type="text" v-model="activo.modelo" class="form-control" />
        <!-- <textarea style="width: 100%" v-model="area.nombreEncargado"></textarea> -->
        <div>
          <label>Estado</label>
          <select name="Estado" @change="onChange($event)" class="form-control">
            <option value="nuevo">nuevo</option>
            <option value="usado">usado</option>
            <option value="desuso">desuso</option>
          </select>
        </div>

        <div>
          <label>Area</label>
          <select
            name="Area"
            @change="onChangeArea($event)"
            class="form-control"
          >
            <!-- <div v-for="a in areas" :key="a.id"> -->
            <option v-for="a in areas" :value="a.id">
              {{ a.nombre }}
            </option>
            <!-- <option value="usado">usado</option>
            <option value="desuso">desuso</option> -->
            <!-- </div> -->
          </select>
        </div>
        <button type="submit" class="btn btn-primary m-2">Guardar</button>
      </form>
      <button class="btn btn-danger m-2" @click="cancelar()">Cancelar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditarActivoView",
  data() {
    return {
      activo: {
        tipo: null,
        marca: null,
        modelo: null,
        estado: "nuevo",
        areaId: 1,
      },
      activos: [],
      areas: [],
    };
  },
  methods: {
    getActivos() {
      axios({
        method: "get",

        url: "http://localhost:5555/activo/" + this.$route.params.id,
        // method: "get",
        // url: "http://localhost:5555/area/" + this.$route.params.id,

        // url: process.env.VUE_APP_RUTA_API + "/tareas/" + this.$route.params.id,
      })
        .then((response) => {
          this.activo = response.data;
          console.log(response);
        })
        .catch((e) => console.log(e));
    },
    getAreas() {
      axios({
        method: "get",

        url: "http://localhost:5555/area/",
      })
        .then((response) => {
          this.areas = response.data;
          console.log(response);
        })
        .catch((e) => console.log(e));
    },

    guardar() {
      console.log("GUARDAR ACTIVO");
      axios({
        method: "patch",
        //     url: process.env.VUE_APP_RUTA_API + "/tareas/" + this.$route.params.id,
        url: "http://localhost:5555/activo/" + this.$route.params.id,
        data: this.activo,
      })
        .then((response) => {
          // this.$store.state.mensaje = {
          //   texto: "La tarea se edito exitosamente",
          //   tipo: "exito",
          // };
          // this.$store.dispatch("addMensajeAction");
          this.$router.push({ name: "activos" });
          // console.log(response);
        })
        .catch((e) => console.log(e));
    },
    onChange: function (event) {
      this.activo.estado = event.target.value;
      console.log(event.target.value);
    },
    onChangeArea: function (event) {
      this.activo.areaId = event.target.value;
      console.log(event.target.value);
    },
    cancelar() {
      //   console.log("CANCELAR");
      this.$router.push({ name: "activos" });
    },
  },
  computed: {},
  mounted() {
    this.getActivos();
    this.getAreas();
  },
  components: {},
};
</script>

<style scoped>
form {
  max-width: 400px;
}
</style>
