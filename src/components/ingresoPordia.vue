<template>
  <div>
    <cabeceraH></cabeceraH>
    <cabeceraV></cabeceraV>
    <br />
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
        <h5 style="font-weight: bold">{{ this.$store.state.operador }}</h5>
        <span>#Caja</span>
        <h5 style="font-weight: bold">{{ this.$store.state.ncaja }}</h5>
        <span>Fecha Apertura</span>
        <h5 style="font-weight: bold">{{ this.$store.state.fechaa }}</h5>
      </div>
    </el-drawer>
    <div class="contenido-cuerpo">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Reporte Ingreso por dia</span>
        </div>
        <el-button-group>
          <el-button size="small" :disabled="deshabilitar" @click="verDetalle"
            >Detalle</el-button
          >
          <el-button size="small" @click="vistapartida"
            >Vista por Partida</el-button
          >
          <el-button
            size="small"
            :disabled="deshabilitar"
            @click="vistaporVoucher"
            >Vista por Voucher</el-button
          > </el-button-group
        ><br /><br />
        <el-row :gutter="10">
          <el-col :sm="3"
            ><h5 class="titulomen">Tipo Consulta</h5>
            <el-select
              v-model="tipoconsult"
              clearable
              size="small"
              placeholder="Todos"
            >
              <el-option
                v-for="item in ltipoconsult"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :sm="3"
            ><h5 class="titulomen">#caja</h5>
            <el-input size="small" v-model="numcaja" clearable></el-input>
          </el-col>
          <el-col :sm="3" :lg="3">
            <h5 class="titulomen">Ingresos por</h5>
            <el-select v-model="ingresopor" clearable size="small">
              <el-option
                v-for="item in lingresopor"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :sm="6" :lg="8" :xl="6"
            ><h5 class="titulomen">Rango de Fecha</h5>
            <el-date-picker
              v-model="fechaR"
              type="daterange"
              size="small"
              format="yyyy/MM/dd"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-col>
          <el-col :sm="3">
            <el-radio v-model="radio" label="1">Por Cajero dia</el-radio>
            <el-radio v-model="radio" label="2">Por dia</el-radio>
          </el-col>
          <el-col :sm="4">
            <el-button
              icon="el-icon-search"
              type="primary"
              @click="listarCajeros"
              circle
            ></el-button>
          </el-col>
        </el-row>
        <hr />
        <el-table
          class="tabla1"
          :data="listadoUsuarios"
          v-loading="loading"
          size="small"
          height="250"
          style="width: 100%"
          highlight-current-row
          @current-change="seleccionarTabla"
        >
          <el-table-column
            prop="fecha_apertura"
            label="Fecha Apert."
            width="100"
          >
          </el-table-column>
          <el-table-column prop="hora_apertura" label="Hora Apert." width="100">
          </el-table-column>
          <el-table-column prop="nnrocaja" label="Caja" width="50">
          </el-table-column>
          <el-table-column prop="nombre_completo" label="Nombres">
          </el-table-column>
          <el-table-column prop="ncodagencia" label="Agencia" width="80">
          </el-table-column>
          <el-table-column
            prop="fecha_cierre"
            label="Fecha de cierre"
            width="150"
          >
          </el-table-column>
          <el-table-column prop="operacion_ini" label="Ope. Ini." width="80">
          </el-table-column>
          <el-table-column prop="operacion_fin" label="Ope. Fin." width="80">
          </el-table-column>
          <el-table-column prop="estado_caja" label="Estado" width="80">
          </el-table-column>
          <el-table-column
            prop="total_cancelados"
            label="Monto Cancel"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="cantidad_operaciones"
            label="#Recibos"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="total_extornados"
            label="Monto Extor."
            width="100"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog title="Detalle" :visible.sync="mostrarDetalle">
      <div class="cuer"></div>
      
      <el-table :data="gridData" height="500">
        <el-table-column
          property="nidperso"
          label="idpersona"
          width="100"
        ></el-table-column>
        <el-table-column property="nombre" label="Nombre"></el-table-column>
        <el-table-column
          property="idctac"
          label="idcta"
          width="100"
        ></el-table-column>
        <el-table-column
          property="importe"
          label="Importe"
          width="100"
        ></el-table-column>
      </el-table>
      <p class="pago">{{ this.totalpago }}</p>
    </el-dialog>
    <el-dialog title="Por Dia" :visible.sync="vtotalDia" width="1000px" >
      <el-table :data="repdia" height="500" show-summary>
        <el-table-column
          property="fecha_apertura"
          label="Fecha"
          width="180"
        ></el-table-column>
        <el-table-column
          property="totalcancelados"
          label="Importe Cancelado"
        ></el-table-column>
        <el-table-column property="totalextorn" label="Importe Extornado" ></el-table-column>
        <el-table-column property="cantidadcance" label="Recibos Cancelados"></el-table-column>
        <el-table-column property="cantidadextorn" label="Recibos Extornados"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import cabeceraH from "../views/cabecerah.vue";
import cabeceraV from "../views/cabecerav.vue";
import axios from "axios";
import { config } from "../config/config.js";
export default {
  components: {
    cabeceraH,
    cabeceraV,
  },
  data() {
    return {
      input: "",
      numcaja: "",
      fechaR: [],
      radio: "1",
      ingresopor: "1",
      tipoconsult: "",
      listadoMediopagos: [],
      listadoUsuarios: [],
      loading: false,
      ncaja: 0,
      totalextorno: 0,
      totalcancelado: 0,
      idapertura: 0,
      operador: 0,
      vtotalDia: false,
      deshabilitar: true,
      mostrarDetalle: false,
      totalpago: 0,
      repdia:[],
      gridData: [],
      lingresopor: [
        {
          value: "1",
          label: "Municipalidad",
        },
        {
          value: "2",
          label: "Bancos",
        },
        {
          value: "3",
          label: "Pago web",
        },
      ],
      ltipoconsult: [
        {
          value: "A",
          label: "Abierta",
        },
        {
          value: "C",
          label: "Cerrada",
        },
      ],
    };
  },
  created() {
    let f = new Date();

    this.fechaR = [
      f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate(),
      f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate(),
    ];
  },
  methods: {
    cerrarDraw() {
      this.$store.state.drawer = false;
    },
    cerrarModal() {
      this.$store.state.dingresopordia = false;
    },
    listarCajeros() {
      console.log(this.radio);
      if (this.radio == 1) {
        this.loading = true;
        let fecharI = this.fechaR[0];
        let fecharF = this.fechaR[1];
        console.log(fecharI + " - " + fecharF);
        axios
          .post(config.api + "controller/cajero_controller.php", {
            opcion: "listarcajero",
            nmrocaja: this.numcaja,
            mediopago: this.ingresopor,
            estado: this.tipoconsult,
            fechari: fecharI,
            fechaf: fecharF,
          })
          .then((response) => {
            if (response.data.length > 0) {
              this.listadoUsuarios = response.data;
            } else {
              this.listadoUsuarios = [];
            }
            this.loading = false;
            this.deshabilitar = true;
            //console.log(response.data);
          });
      }
      if (this.radio == 2) {
        this.vtotalDia = true;
        let fecharI = this.fechaR[0];
        let fecharF = this.fechaR[1];
        axios.post(config.api + "controller/cajero_controller.php", {
          opcion: "IngresosDia",
          fechari: fecharI,
          fechaf: fecharF,
        })
        .then((response) => {
            if (response.data.length > 0) {
              this.repdia = response.data;
            } else {
              this.repdia = [];
            }
            //console.log(response.data);
          });
      }
    },
    vistaporVoucher() {
      open(
        config.api +
          "controller/reportesPDF.php?opcion=reporteIngresos&idapertura=" +
          this.idapertura +
          "&ncaja=" +
          this.ncaja +
          "&totalExtorno=" +
          this.totalextorno +
          "&total=" +
          this.totalcancelado +
          "&nombre=" +
          this.$store.state.nombrecajero +
          "&operador=" +
          this.operador +
          "&tipoingreso=" +
          this.ingresopor
      );
    },
    seleccionarTabla(val) {
      console.log(val);
      this.totalcancelado = val.total_cancelados;
      this.totalextorno = val.total_extornados;
      this.ncaja = val.nnrocaja;
      this.totalextor = val.total_extornados;
      this.idapertura = val.idapertura;
      this.operador = val.coperador;
      this.nombrecajero = val.nombre_completo;
      if (val.estado_caja == "CERRADA") {
        this.deshabilitar = false;
      }
    },
    vistapartida() {
      console.log(this.numcaja);
      let fecharI = this.fechaR[0];
      let fecharF = this.fechaR[1];

      if (this.tipoconsult == "" || this.numcaja == "") {
        this.tipoconsult = 0;
        this.numcaja = 0;
      }
      console.log(this.numcaja);
      open(
        config.api +
          "controller/reportesPDF.php?opcion=reportePartida&fechI=" +
          fecharI +
          "&fechaF=" +
          fecharF +
          "&tipo=" +
          this.tipoconsult +
          "&ncaja=" +
          this.numcaja
      );
      this.tipoconsult = "";
      this.numcaja = "";
    },
    verDetalle() {
      let total = 0;
      this.mostrarDetalle = true;
      axios
        .post(config.api + "controller/cajero_controller.php", {
          opcion: "verDeatalle",
          idapertura: this.idapertura,
        })
        .then((response) => {
          if (response.data.length > 0) {
            this.gridData = response.data;
            for (let index = 0; index < response.data.length; index++) {
              total += parseFloat(response.data[index].importe);
            }
            this.totalpago = total.toFixed(2);
          } else {
            this.gridData = [];
            this.totalpago=0.00;
          }
          console.log(response.data);
        });
    },
    imprimirExcel(){
     open(config.api +
          "controller/reporteExcel.php?opcion=ImprimirExcel&idapertura=" +this.idapertura);
    }
  },
};
</script>
<style scoped>
.sub-cabecera {
  margin: 0;
  text-align: center;
  padding: 60px;
  width: 100%;
  height: 50px;
  background-color: #fff;
  color: #000;
}
.pago {
  text-align: right;
  margin: 0 40px;
  font-size: 20px;
}
.titulomen{
  font-size: 16px;
}
.cuer{
  width: 85%;
  height: 10px;
  display: inline-block;
}
@media only screen and (max-width: 1800px) {
  .tabla1{
    font-size: 10px;
  }
}
</style>