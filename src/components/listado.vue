<template>
  <div>
    <cabeceraH></cabeceraH>
    <cabeceraV></cabeceraV>
    <cobroTributo></cobroTributo>
    <estadoCuenta></estadoCuenta>
    <rubrostupac></rubrostupac>
    <ingresos></ingresos>
    <el-drawer
      title="Usuario"
      :visible.sync="this.$store.state.drawer"
      :before-close="cerrarDraw"
    >
      <div class="cuerpo-usuario">
        <img
          src="../assets/usuario.png"
          style="margin: auto; display: block"
        /><br />
        <span>Nombres y Apellidos</span>
        <p style="font-weight: bold">{{ this.$store.state.nombrecajero }}</p>
        <span>Operador</span>
        <h5>{{ this.$store.state.operador }}</h5>
        <span>#Caja</span>
        <h5>{{ this.$store.state.ncaja }}</h5>
        <span>Fecha Apertura</span>
        <h5>{{ this.$store.state.fechaa }}</h5>
      </div>
    </el-drawer>
    <br />
    <div class="contenido-cuerpo">
      <el-card class="box-card">
        <div class="row">
          <div class="col-sm-2">
            <h5>Buscar por:</h5>
          </div>
          <div class="col-sm-2">
            <el-select
              v-model="value"
              clearable
              placeholder="Select"
              size="small"
            >
              <el-option
                v-for="item in opciones"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="col-sm-2">
            <h5>Descripcion</h5>
          </div>
          <div class="col-sm-2">
            <el-input
              placeholder="Por favor, introduzca"
              v-model="cajab"
              size="small"
              clearable
            >
            </el-input>
          </div>
          <div class="col-sm-3">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-search"
              @click="buscar"
              >Buscar</el-button
            >
          </div>
        </div>
        <br />
        <el-button-group>
          <el-button
            :disabled="this.$store.state.estado"
            size="small"
            type="primary"
            plain
            @click="aperturarCaja"
            >Aperturar Caja</el-button
          >
          <el-button
            class="boton-sub-menu"
            :disabled="!this.$store.state.estado"
            size="small"
            @click="cerrarcaja"
            >Cerrar Caja</el-button
          >

          <el-button
            class="boton-sub-menu"
            size="small"
            :disabled="!this.$store.state.estado"
            @click="Modalcobrot"
            >Cobro de Tributos</el-button
          >
          <el-badge
            :value="this.$store.state.cantidadIngresos"
            class="item"
            type="primary"
          >
            <el-button
              class="boton-sub-menu"
              size="small"
              :disabled="!this.$store.state.estado"
              @click="ModalIngresos"
              >Consulta de Ingresos</el-button
            >
          </el-badge>
          <el-button
            class="boton-sub-menu"
            size="small"
            :disabled="!this.$store.state.estado"
            @click="ModalrubrosTupac"
            >Rubros</el-button
          >
        </el-button-group>
        <br />
        <el-table
          v-loading="loading"
          :data="contribuyentes"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%"
          size="small"
        >
          <el-table-column prop="ccodperso" label="Codigo" width="100">
          </el-table-column>
          <el-table-column prop="cnomcontr" label="Nombre"> </el-table-column>
          <el-table-column prop="ctipdocu" label="Tipo Doc." width="100">
          </el-table-column>
          <el-table-column prop="cnrodocu" label="N° Documento" width="120">
          </el-table-column>
          <el-table-column prop="cdesperso" label="Tipo Persona" width="150">
          </el-table-column>
          <el-table-column prop="cdesdist" label="Distrito" width="180">
          </el-table-column>
          <el-table-column prop="contrib" label="Contrib." width="100">
          </el-table-column>
        </el-table>
        <el-pagination
          :page-size="10"
          :pager-count="11"
          layout="prev, pager, next"
          :total="ntpage"
          class="pagina"
          :current-page="paginaA"
          @current-change="cambiopagina"
        >
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>
<script>
import cabeceraH from "../views/cabecerah.vue";
import cabeceraV from "../views/cabecerav.vue";
import cobroTributo from "../views/cobroTributo.vue";
import estadoCuenta from "./estadoCuenta.vue";
import rubrostupac from "./rubrostupac.vue";
import ingresos from "./ingresos";
import axios from "axios";
import { config } from "../config/config.js";
export default {
  components: {
    cabeceraH,
    cabeceraV,
    cobroTributo,
    estadoCuenta,
    rubrostupac,
    ingresos,
  },
  data() {
    return {
      contribuyente: {
        ccodperso: "",
        cnomcontr: "",
        ctipdocu: "",
        cnrodocu: "",
        cdesperso: "",
        cdesdist: "",
        contrib: "",
        total_pages: 0,
        total_elements: 0,
      },
      contribuyentes: [],
      opciones: [
        {
          value: "codigo",
          label: "Codigo",
        },
        {
          value: "nombre",
          label: "Nombre",
        },
        {
          value: "documento",
          label: "N° Documento",
        },
      ],
      cajab: "",
      value: "",
      ntpage: 0,
      paginaA: 1,
      loading: false,
    };
  },
  created() {
    console.log(config);
    if (this.$store.state.sesion == 1) {
      this.cargarData();
      console.log(this.$store.state.dcobrot);
    } else {
      this.$router.push("/");
      //this.$router.push("/caja/");
    }
  },
  methods: {
    cerrarDraw() {
      this.$store.state.drawer = false;
    },
    Modalcobrot() {
      if (this.$store.state.nidpersona == 0) {
        this.$message({
          message: "Alto! Seleccione un contribuyente.",
          type: "warning",
        });
      } else {
        this.$store.state.dcobrot = true;
        console.log(this.$store.state.dcobrot);
      }
    },

    Modalestadocue() {
      if (this.$store.state.nidpersona2 == 0) {
        this.$message({
          message: "Alto! Seleccione un contribuyente.",
          type: "warning",
        });
      } else {
        this.$store.state.destadocu = true;
        console.log(this.$store.state.destadocu);
      }
    },
    ModalrubrosTupac() {
      if (this.$store.state.nidpersona3 == 0) {
        this.$message({
          message: "Alto! Seleccione un contribuyente.",
          type: "warning",
        });
      } else {
        this.$store.state.drubrotupac = true;
      }
    },
    cerrarcaja() {
      axios
        .post(config.api + "controller/cajero_controller.php", {
          opcion: "cerrar_caja",
          idapertura: this.$store.state.idapertura,
          cantope: this.$store.state.cantope,
          cantextor: this.$store.state.cantextor,
          cantcance: this.$store.state.cantcance,
          totalextorno: this.$store.state.totalextorno,
          totalcancelado: this.$store.state.totalcancelado,
        })
        .then((response) => {
          console.log("cerrar caja:" + this.$store.state.idapertura);
          if (response.data) {
            this.$store.state.actua=true;
            this.$router.push("/");
            //location.reload();
            this.$store.state.actualizarlistaIn = 1;
            console.log(this.$store.state.actualizarlistaIn);
            this.$message({
              message: "Caja cerrada correctamente..",
              type: "success",
            });
          }
        });
    },
    ModalIngresos() {
      this.$store.state.dingresos = true;
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      this.$store.state.nidpersona = val.nidperso;
      this.$store.state.nidpersona2 = val.nidperso;
      this.$store.state.nidpersona3 = val.nidperso;

      console.log("idpersona: " + this.$store.state.nidpersona);
    },
    cambiopagina: function (dato) {
      this.paginaA = dato;
      this.cargarData();
      console.log("listado.cambiopagina:", dato);
    },
    cargarData: function () {
      this.loading = true;
      axios
        .post(config.api + "controller/contribuyentes_controller.php", {
          opcion: "buscar",
          caja: this.value,
          valor: this.cajab,
          pagina: this.paginaA,
        })
        .then((response) => {
          if (response.data.length > 0) {
            this.contribuyentes = response.data;
            this.ntpage = parseInt(response.data[0].total_pages);
            this.loading = false;
          } else {
            this.contribuyentes = [];
            this.ntpage = 0;
            this.loading = false;
          }

          // console.log(response.data[0].total_pages)
        });
    },
    buscar: function () {
      this.paginaA = 1;
      this.cargarData();
      //this.cajab = "";
      this.$store.state.nidpersona = 0;
      this.$store.state.nidpersona2 = 0;
      this.$store.state.nidpersona3 = 0;
    },
    aperturarCaja: function () {
      var f = new Date();
      let fecha =
        f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
      this.$alert(
        "N° de Caja: " + this.$store.state.ncaja + " Fecha: " + fecha,
        "Aperturar Caja  ",
        {
          confirmButtonText: "OK",
        }
      )
        .then(() => {
          axios
            .post(config.api + "controller/cajero_controller.php", {
              opcion: "aperturarCaja",
              id: this.$store.state.nidusuario,
              operador: this.$store.state.operador,
              hora: f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds(),
            })
            .then((response) => {
              this.$store.state.fechaa = response.data[1];
              this.$store.state.ano = f.getFullYear();
              this.$store.state.idapertura =
                response.data[0].sp_inserta_apertura_caja;
              //console.log(this.$store.state.fechaa)
              console.log(response.data);
              console.log(response.data[0].sp_inserta_apertura_caja);
              this.$store.state.estado = true;
              this.$store.state.actualizarlistaIn = 1;
              this.$message({
                type: "success",
                message: "Caja Aperturada correctamente...",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Cancelado",
          });
        });
    },
  },
};
</script>
<style >
.sub-cabecera {
  text-align: center;
  padding: 60px;
  width: 100%;
  height: 130px;
  background-color: #fff;
  color: #000;
}
.sub-cabecera > h3,
h6 {
  display: inline-block;
  margin-left: 100px;
}
.pagina {
  text-align: end;
}
.boton-sub-menu:hover {
  color: #fff;
  background-color: #188fff;
}
.cuerpo-usuario {
  width: 100%;
  padding-left: 20px;
}
@media only screen and (max-width: 1900px) {
  .sub-cabecera > h3 {
    margin-left: 200px;
  }
}
@media only screen and (max-width: 600px) {
  .sub-cabecera > h6 {
    margin-left: 10px;
  }
}
</style>