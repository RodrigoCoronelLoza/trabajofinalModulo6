<template>
  <div>
    <h1>ACTIVOS</h1>
    <form @submit.prevent="crearActivos()">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          v-model="activo.tipo"
          placeholder="Nuevo Tipo"
          aria-describedby="button-addon2"
        />
        <input
          type="text"
          class="form-control"
          v-model="activo.marca"
          placeholder="Nueva Marca"
          aria-describedby="button-addon2"
        />
        <input
          type="text"
          class="form-control"
          v-model="activo.modelo"
          placeholder="Nuevo Modelo"
          aria-describedby="button-addon2"
        />

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
            <option v-for="a in areas" :value="a.id">
              {{ a.nombre }}
            </option>
          </select>
        </div>

        <button class="btn btn-primary m-2" type="submit">Crear</button>
      </div>

      <h5>BUSCADOR DE ACTIVOS {{ textoABuscar }}</h5>
      <form action="">
        <div class="input-group mb-3">
          <input
            type="text"
            v-model="textoABuscar"
            class="form-control"
            placeholder="Buscar activos"
          />
          <button class="btn btn-primary m-2" @click.prevent="getActivos()">
            Buscar
          </button>
          <button class="btn btn-danger m-2" @click="cancelar()">
            Cancelar
          </button>
        </div>
      </form>
    </form>

    <div>
      <label>FILTRAR ACTIVO POR AREA</label>
      <select name="Area" @change="onChangeArea2($event)" class="form-control">
        <option v-for="a in areas" :value="a.id">
          {{ a.nombre }}
        </option>
      </select>
      <button class="btn btn-primary m-2" @click="filtroFlag('true')">
        Filtrar
      </button>
      <button class="btn btn-danger m-2" @click="filtroFlag('false')">
        Cancelar Filtrado
      </button>
    </div>
    <div class="accordion" id="accordionExample">
      <label>LISTA GENERAL DE ACTIVOS</label>
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
            {{ value.tipo }}
          </button>
        </h2>
        <div
          :id="`collapseTwo${index}`"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <div>marca : {{ value.marca }}</div>
            <div>modelo: {{ value.modelo }}</div>
            <div>tipo: {{ value.tipo }}</div>
            <div>estado: {{ value.estado }}</div>
            <div>area:{{ getterId(value.areaId) }}</div>

            <div class="acciones">
              <button
                class="btn btn-primary m-2"
                @click="eliminarActivo(value.id)"
              >
                Eliminar
              </button>
              <button
                class="btn btn-danger m-2"
                @click="editarActivo(value.id)"
              >
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
  name: "ActivoView",
  data() {
    return {
      textoABuscar: "",
      areaFiltrar: 1,
      filtrarFlag: false,
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
    crearActivos() {
      axios({
        method: "post",
        url: "http://localhost:5555/activo/",
        data: this.activo,
      })
        .then((response) => {
          console.log(response);
          this.area.tipo = null;
          this.area.marca = null;
          this.area.modelo = null;
          this.area.estado = "nuevo";
          this.area.areaId = 1;
          this.getActivos();
          location.reload();
        })
        .catch((e) => console.log(e));
      location.reload();
    },
    getActivos() {
      axios({
        method: "get",

        url: "http://localhost:5555/activo/?q=" + this.textoABuscar,
      })
        .then((response) => {
          this.activos = response.data;
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
    onChange: function (event) {
      this.activo.estado = event.target.value;
      console.log(event.target.value);
    },
    onChangeArea: function (event) {
      this.activo.areaId = parseInt(event.target.value);
      console.log(event.target.value);
    },

    onChangeArea2: function (event) {
      this.areaFiltrar = parseInt(event.target.value);
    },
    eliminarActivo(id) {
      console.log(id);
      axios({
        method: "delete",
        url: "http://localhost:5555/activo/" + id,
      })
        .then((response) => {
          this.getActivos();
          console.log(response);
        })
        .catch((e) => console.log(e));
    },
    editarActivo(activo_id) {
      this.$router.push({ name: "editarActivo", params: { id: activo_id } });
    },
    getterId(id) {
      for (let i = 0; i < this.areas.length; i++) {
        if (this.areas[i].id === id) {
          return this.areas[i].nombre;
        }
      }
    },
    cancelar() {
      this.$router.push({ name: "activos" });
    },
    filtroFlag(orden) {
      if (orden === "true") {
        this.filtrarFlag = true;
      } else {
        this.filtrarFlag = false;
      }
    },
  },
  computed: {
    lista() {
      if (this.filtrarFlag) {
        return this.activos.filter((item) => item.areaId === this.areaFiltrar);
      }
      return this.activos;
    },
  },
  mounted() {
    this.getActivos();
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
