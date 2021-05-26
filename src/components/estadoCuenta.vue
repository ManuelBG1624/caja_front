<template>
  <el-dialog
    title="Estado Cuenta"
    :visible.sync="this.$store.state.destadocu"
    width="600px"
    :before-close="cerrarModal"
  >
    <el-row :gutter="20" class="m-auto">
      <el-col :sm="8">Tributo:</el-col>
      <el-col :sm="16"
        ><el-select
          v-model="tributo"
          size="small"
          filterable
          placeholder="Selecione"
          class="cbo"
        >
          <el-option label="Todos" value="0"></el-option>
          <el-option
            v-for="item in datosTributo"
            :key="item.cdestribu"
            :label="item.cdestribu"
            :value="item.idgrutributo"
          >
          </el-option> </el-select
      ></el-col> </el-row
    ><br />
    <el-row :gutter="20" class="m-auto">
      <el-col :sm="5">Año Desde: </el-col>
      <el-col :sm="7"
        ><el-input-number
          size="small"
          v-model="annoi"
          controls-position="right"
          :min="0"
        ></el-input-number
      ></el-col>
      <el-col :sm="4"> Hasta: </el-col>
      <el-col :sm="8"
        ><el-input-number
          size="small"
          v-model="annof"
          controls-position="right"
          :min="0"
        ></el-input-number
      ></el-col> </el-row
    ><br />
    <el-row :gutter="20" class="m-auto">
      <el-col :sm="8">Situacion:</el-col>
      <el-col :sm="16"
        ><el-select
          v-model="situacion"
          size="small"
          filterable
          placeholder="Selecione"
          class="cbo"
        >
          <el-option label="Todos" value="0"> </el-option>
          <el-option
            v-for="item in datosSituacion"
            :key="item.cdessitcta"
            :label="item.cdessitcta"
            :value="item.idsitcta"
          >
          </el-option> </el-select
      ></el-col>
    </el-row>
    <el-dialog
      width="1200px"
      title="Estado Cuenta"
      :visible.sync="ddeudas"
      append-to-body
    >
      <el-row :gutter="10" class="m-auto">
        <h5 style="margin-left: 10px">Persona</h5>
        <el-col :span="8">
          <p>Documento de identidad: {{ this.dni }}</p>
          <p>Distrito: {{ this.distrito }}</p>
        </el-col>
        <el-col :span="10">
          <p>Apellidos y Nombres: {{ this.nompersona }}</p>
          <p>Direccion: {{ this.direcc }}</p>
        </el-col>
        <el-col :span="6"
          ><p>Codigo: {{ this.codperso }}</p></el-col
        >
      </el-row>
      <hr />
      <el-input class="filtro" placeholder="Ingrese N° Cta" v-model="filtro" size="small" clearable>
      </el-input>
      <el-table
        
        :data="listadodeuda.filter(data => !filtro || data.idctac2.toLowerCase().includes(filtro.toLowerCase()))"
        size="mini"
        height="250"
        style="width: 100%"
      >
        <el-table-column prop="ncodpredi2" label="Predio" width="80">
        </el-table-column>
        <el-table-column prop="nanexo2" label="Anexo" width="80">
        </el-table-column>
        <el-table-column prop="grupo_tributo2" label="Tributo">
        </el-table-column>
        <el-table-column
          prop="anotributo2"
          label="Año"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="periodo2"
          label="Periodo"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="idctac2"
          label="N° Cta"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="insoluto2"
          label="Importe"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="moras2"
          label="Mora"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="otros2"
          label="Otros"
          width="80"
        ></el-table-column>
        <el-table-column prop="ipm2" label="IPM" width="80"></el-table-column>
        <el-table-column
          prop="desc_insoluto2"
          label="Dscto"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="gastos2"
          label="Gastos"
          width="80"
        ></el-table-column>
        <el-table-column prop="estado_cuenta2" label="Estado" width="100">
        </el-table-column> </el-table
      ><br />
    </el-dialog>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cerrarModal" size="small">Cancelar</el-button>
      <el-button type="primary" @click="listadoDeuda" size="small"
        >Aceptar</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import axios from "axios";
import { config } from "../config/config.js";
export default {
  data() {
    return {
      datosTributo: [],
      tributo: "",
      annoi: 2021,
      annof: 2021,
      datosSituacion: [],
      situacion: "",
      ddeudas: false,
      direcc: "",
      nompersona: "",
      dni: "",
      codperso: "",
      distrito: "",
      idperso: 0,
      listadodeuda: [],
      filtro:"",
    };
  },
  created() {
    this.listadoTributo();
    this.listadoSituacion();
  },
  beforeUpdate() {
    if (this.$store.state.nidpersona2 != 0) {
      //this.listadoPredios();
      this.maepersona();
      //console.log("listado predios: " + this.$store.state.nidpersona);
    }
  },
  methods: {
    cerrarModal() {
      this.$store.state.destadocu = false;
      //this.dcobrot=false
      //console.log(this.dcobrot)
    },
    maepersona() {
      axios
        .post(config.api + "controller/contribuyentes_controller.php", {
          opcion: "persona",
          idperso: this.$store.state.nidpersona2,
        })
        .then((response) => {
          if (response.data.length > 0) {
            console.log(response.data);
            this.nompersona =
              response.data[0].capepater +
              " " +
              response.data[0].capemater +
              " " +
              response.data[0].cnombres;
            this.direcc = response.data[0].cdesdire;
            this.dni = response.data[0].cnrodocu;
            this.codperso = response.data[0].ccodperso;
            this.distrito = response.data[0].cdesdist;
            this.idperso = this.$store.state.nidpersona2;
            console.log("nidperso: " + this.$store.state.nidpersona);
          }

          //this.$store.state.nidpersona=0;
        });
    },
    listadoTributo() {
      axios
        .post(config.api + "controller/contribuyentes_controller.php", {
          opcion: "listadoTributo",
        })
        .then((response) => {
          this.datosTributo = response.data;
          //console.log(this.datos)
        });
    },
    listadoSituacion() {
      axios
        .post(config.api + "controller/contribuyentes_controller.php", {
          opcion: "listadoSituacion",
        })
        .then((response) => {
          this.datosSituacion = response.data;
          //console.log(response.data);
        });
    },
    listadoDeuda() {
      axios
        .post(config.api + "controller/contribuyentes_controller.php", {
          opcion: "listadoestadocuenta",
          idperso: this.idperso,
          idgtributo: this.tributo,
          anoi: this.annoi,
          anof: this.annof,
          situacion: this.situacion,
        })
        .then((response) => {
          if (response.data.length > 0) {
            this.listadodeuda = response.data;
            console.log("listadodeuda() " + this.idperso);
            console.log(this.tributo);
            console.log(response.data);
            this.ddeudas = true;
          } else {
            this.listadodeuda = [];
            this.ddeudas = true;
          }
        });
    },
  },
};
</script>
<style scoped>
.cbo {
  width: 90%;
}
.filtro{
  margin-left: 80%;
  width: 20%;
}
</style>