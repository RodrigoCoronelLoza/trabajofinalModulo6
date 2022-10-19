<template>
  <div>
    <h1>Areasws</h1>
    <div class="accordion" id="accordionExample">
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
            <!-- <appAcciones @onAccion="irA($event, value.id)"></appAcciones> -->
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
      areas: [],
    };
  },
  methods: {
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
  },
  computed: {
    lista() {
      //   if (this.$store.state.soloTerminado) {
      //     return this.tareas.filter((item) => {
      //       return item.terminado;
      //     });
      //   }
      return this.areas;
    },
  },
  mounted() {
    this.getAreas();
  },
  components: {},
};
</script>

<style></style>
