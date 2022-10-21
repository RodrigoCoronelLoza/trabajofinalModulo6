<template>
  <div>
    <h1>AREAS</h1>
    <form @submit.prevent="crearAreas()">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          v-model="area.nombre"
          placeholder="Nueva area"
          aria-describedby="button-addon2"
        />
        <input
          type="text"
          class="form-control"
          v-model="area.nombreEncargado"
          placeholder="Nombre encargado"
          aria-describedby="button-addon2"
        />
        <input
          type="text"
          class="form-control"
          v-model="area.numeroDeFuncionarios"
          placeholder="Numero de Funcionarios"
          aria-describedby="button-addon2"
        />
        <button class="btn btn-primary m-2" type="submit">Crear</button>
      </div>
    </form>

    <h5>BUSCADOR DE AREAS {{ textoABuscar }}</h5>
    <form action="">
      <div class="input-group mb-3">
        <input
          type="text"
          v-model="textoABuscar"
          class="form-control"
          placeholder="Buscar areas"
        />
        <button class="btn btn-primary m-2" @click.prevent="getAreas()">
          Buscar
        </button>
        <button class="btn btn-danger m-2" @click="cancelar()">Cancelar</button>
      </div>
    </form>

    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckChecked"
        :checked="$store.state.areaGrande"
        v-on:input="$store.state.areaGrande = $event.target.checked"
      />
      <label class="form-check-label" for="flexSwitchCheckChecked"
        >Mostrar solo areas con mas de 10 funcionarios:
        {{ $store.state.areaGrande }}</label
      >
    </div>

    <div class="accordion" id="accordionExample">
      <label>LISTA GENERAL DE AREAS</label>
      <div class="accordion-item" v-for="(value, index) in lista">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#collapseTwo${index}`"
            aria-expanded="false"
            :aria-controls="`collapseTwo${index}`"
          >
            <!-- <input
              type="checkbox"
              :checked="value.terminado"
              @click="setearCheckbox(value.terminado, value.id)"
            /> -->
            {{ value.nombre }}
          </button>
        </h2>
        <div
          :id="`collapseTwo${index}`"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <div>Encargado : {{ value.nombreEncargado }}</div>
            <div>Numero de funcionarios: {{ value.numeroDeFuncionarios }}</div>
            <div class="acciones">
              <button
                class="btn btn-primary m-2"
                @click="eliminarArea(value.id)"
              >
                Eliminar
              </button>
              <button class="btn btn-danger m-2" @click="editarArea(value.id)">
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AreaView",
  data() {
    return {
      filtroFlag: "false",
      textoABuscar: "",
      area: {
        nombre: null,
        nombreEncargado: null,
        numeroDeFuncionarios: null,
      },
      areas: [],
    };
  },
  methods: {
    crearAreas() {
      axios({
        method: "post",
        url: "http://localhost:5555/area/",
        // url: "http://localhost:4444/tareas",
        data: this.area,
      })
        .then((response) => {
          console.log(response);
          this.area.nombre = null;
          this.area.nombreEncargado = null;
          this.area.numeroDeFuncionarios = null;
          this.getAreas();
        })
        .catch((e) => console.log(e));
    },
    getAreas() {
      axios({
        method: "get",

        url: "http://localhost:5555/area/?q=" + this.textoABuscar,
      })
        .then((response) => {
          this.areas = response.data;
          console.log(response);
        })
        .catch((e) => console.log(e));
    },
    eliminarArea(id) {
      axios({
        method: "delete",
        url: "http://localhost:5555/area/" + id,
      })
        .then((response) => {
          this.getAreas();
          console.log(response);
        })
        .catch((e) => console.log(e));
    },
    editarArea(area_id) {
      this.$router.push({ name: "editarArea", params: { id: area_id } });
      // console.log(id);
    },
    cancelar() {
      //   console.log("CANCELAR");
      this.$router.push({ name: "areas" });
    },
  },
  computed: {
    lista() {
      if (this.$store.state.areaGrande) {
        return this.areas.filter((item) => item.numeroDeFuncionarios > 10);
      }
      //   if (this.$store.state.soloTerminado) {
      //     return this.tareas.filter((item) => {
      //       return item.terminado;
      //     });
      //   }
      else {
        return this.areas;
      }
    },
  },
  mounted() {
    this.getAreas();
  },
  components: {},
};
</script>

<style scoped>
div {
  padding: 5px;
  max-width: 800px;
  align: center;
  margin: auto;
}
</style>
