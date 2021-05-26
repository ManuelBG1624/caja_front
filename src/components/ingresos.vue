<template>
  <div>
    <el-dialog
      :visible.sync="this.$store.state.dingresos"
      width="1000px"
      :before-close="cerrarModal"
    >
      <span>Ingreso diario del dia {{ this.$store.state.fechaa }}</span>
      <hr />
      <el-button-group>
        <el-button size="small" :disabled="tipo_resivo" @click="ddetalle = true"
          >Detalle</el-button
        >
        <el-button
          size="small"
          :disabled="tipo_resivo"
          type="danger"
          @click="extorno = true"
          >Extornar</el-button
        >
        <el-button size="small" :disabled="tipo_resivo" @click="imprimirVoucher"
          >Reimprimir</el-button
        >
        <el-button size="small" :disabled="estadolista" @click="mostrarVoucher"
          >Reporte por Voucher</el-button
        > </el-button-group
      ><br /><br /><br />
      <el-table
        :data="listadorecibos"
        style="width: 100%"
        height="250"
        size="small"
        highlight-current-row
        @current-change="seleccionarGrilla"
      >
        <el-table-column prop="n" type="index" width="40"> </el-table-column>
        <el-table-column prop="idcaja" label="caja" width="70">
        </el-table-column>
        <el-table-column prop="num_operacion" label="N°Oper" width="80">
        </el-table-column>
        <el-table-column prop="num_recibo" label="N°Recibo" width="80">
        </el-table-column>
        <el-table-column prop="ccodperso" label="Codigo" width="70">
        </el-table-column>
        <el-table-column
          prop="nombre_completo"
          label="Apellidos y Nombres/Razon Social"
        >
        </el-table-column>
        <el-table-column prop="total" label="Importe" width="70">
        </el-table-column>
        <el-table-column prop="estado_recibo" label="Estado" width="100">
        </el-table-column>
        <el-table-column prop="tipo_rubro" label="Tipo Rubro" width="100">
        </el-table-column>
        <el-table-column
          prop="nombre_medio_pago"
          label="Medio Pago"
          width="100"
        >
        </el-table-column>
      </el-table>
      <el-dialog
        width="500px"
        title="Clave de extorno"
        :visible.sync="extorno"
        append-to-body
      >
        <el-row :gutter="10">
          <el-col :span="6">Usuario</el-col>
          <el-col :span="16"
            ><el-input
              placeholder="Usuario"
              size="small"
              v-model="operador"
              clearable
            >
            </el-input
          ></el-col> </el-row
        ><br />
        <el-row :gutter="10">
          <el-col :span="6">Clave</el-col>
          <el-col :span="16"
            ><el-input
              placeholder="Clave"
              size="small"
              v-model="clave"
              show-password
            >
            </el-input
          ></el-col> </el-row
        ><br />
        <span>Observacion</span>
        <el-input type="textarea" :rows="2" v-model="observacion"> </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="validarUsuarioExtorno"
            >Aceptar</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        width="1000px"
        height="250"
        size="small"
        title="Detalle"
        :visible.sync="ddetalle"
        append-to-body
      >
        <el-table :data="cabecera_detalle" style="width: 100%">
          <el-table-column prop="nidperso" label="N° Ctr" width="80">
          </el-table-column>
          <el-table-column
            prop="idrubro"
            v-if="this.tipo_rubro != 'TRIBUTOS'"
            label="CodRub"
            width="80"
          >
          </el-table-column>
          <el-table-column prop="nombre" label="Rubros / Tributo">
          </el-table-column>
          <el-table-column
            prop="idctac"
            v-if="this.tipo_rubro != 'TUPA'"
            label="N° Cta"
            width="80"
          >
          </el-table-column>
          <el-table-column prop="importe" label="Importe" width="80">
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <p style="text-align: right; margin-right: 30px">
            S/.{{ this.totaldetalle }}
          </p>
        </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <p>
          Total Cancelado S/. {{ this.totalcancelado }} - Total Extornado S/.
          {{ this.totalextorno }}
        </p>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { config } from "../config/config.js";
export default {
  data() {
    return {
      listadorecibos: [],
      extorno: false,
      ddetalle: false,
      idrecibo: "",
      totalcancelado: 0,
      totalextorno: 0,
      totaldetalle: 0,
      observacion: "",
      clave: "",
      idcaja: "",
      cabecera_detalle: [],
      idperso: "",
      actulizaringresos: 0,
      operador: "SISTEMAS",
      tipo_rubro: "",
      estadolista: true,
      tipo_resivo: true,
      codctacte: "",
      cantidadi:0,
    };
  },
  updated() {
    if (this.$store.state.actualizarlistaIn == 1) {
      this.listarIngresos();
    }
  },
  created() {
    //console.log(this.$store.state.idapertura);
    this.listarIngresos();
    console.log(this.$store.state.actualizarlistaIn);
  },
  methods: {
    cerrarModal() {
      this.$store.state.dingresos = false;
      //this.dcobrot=false
      //console.log(this.dcobrot)
    },
    validarUsuarioExtorno() {
      axios
        .post(config.api + "controller/cajero_controller.php", {
          opcion: "validarUsuarioExtorno",
          operador: this.operador,
          clave: this.clave,
        })
        .then((response) => {
          if (response.data.length > 0) {
            this.actualizarEstadoExtorno();
            this.clave = "";
            this.$message({
              message: "Extornado..",
              type: "success",
            });
          } else {
            this.clave = "";
            this.observacion = "";
            this.$message.error("Error: La clave es incorrecta..");
          }
        });
    },
    seleccionarGrilla(val) {
      this.codctacte="";
      this.idrecibo = val.num_recibo;
      this.idcaja = val.idcaja;
      this.idperso = val.nidperso;
      this.totaldetalle = val.total;
      console.log(val.tipo_rubro);
      console.log(this.idperso);
      console.log("cantope: " + this.$store.state.cantope);
      console.log("cantextor: " + this.$store.state.cantextor);
      console.log("cantcance: " + this.$store.state.cantcance);
      console.log("totalextor: " + this.$store.state.totalextorno);
      console.log("totalcance: " + this.$store.state.totalcancelado);
      this.tipo_rubro = val.tipo_rubro;

      if (val.tipo_rubro == "TUPA") {
        this.listarDetallecaja("listarTupa");
        this.tipo_resivo = false;
      }
      if (val.tipo_rubro == "TRIBUTOS") {
        this.listarDetallecaja("listarTributo");
        this.tipo_resivo = false;
      }
    },
    listarDetallecaja(tipo) {
      axios
        .post(config.api + "controller/cajero_controller.php", {
          opcion: tipo,
          id: this.idcaja,
        })
        .then((response) => {
          console.log(response);
          this.cabecera_detalle = response.data;
          for (let i = 0; i < this.cabecera_detalle.length; i++) {
            this.codctacte += this.cabecera_detalle[i].idctac + "-";
          }
          console.log("ctacte: " + this.codctacte);
        });
    },
    actualizarEstadoExtorno() {
      axios
        .post(config.api + "controller/cajero_controller.php", {
          opcion: "extornarcuenta",
          idapertura: this.$store.state.idapertura,
          numrecibo: this.idrecibo,
          observacion: this.observacion,
          idcta:this.codctacte
        })
        .then((response) => {
          console.log(response);
          this.extorno = false;
          this.listarIngresos();
        });
    },
    imprimirVoucher() {
      this.listarIngresos();
      this.tipo_resivo = true;
      if (this.tipo_rubro == "TUPA") {
        open(
          config.api +
            "controller/reporteRubro.php?opcion=voucherRubro&idperso=" +
            this.idperso +
            "&idcaja=" +
            this.idcaja
        );
      }
      if (this.tipo_rubro == "TRIBUTOS") {
        open(
          config.api +
            "controller/reporteRubro.php?opcion=voucherTributo&idperso=" +
            this.idperso +
            "&idcaja=" +
            this.idcaja
        );
      }
    },
    mostrarVoucher() {
      open(
        config.api +
          "controller/reportesPDF.php?opcion=reporteIngresos&idapertura=" +
          this.$store.state.idapertura +
          "&ncaja=" +
          this.$store.state.ncaja +
          "&totalExtorno=" +
          this.totalextorno +
          "&total=" +
          this.totalcancelado +
          "&nombre=" +
          this.$store.state.nombrecajero +
          "&operador=" +
          this.$store.state.operador
      );
    },
    listarIngresos() {
      this.cantidadi=0;
      console.log(this.$store.state.idapertura);
      let total = 0.0;
      let totalExtorno = 0.0;
      let cex = 0;
      let cance = 0;
      axios
        .post(config.api + "controller/cajero_controller.php", {
          opcion: "listarIngresos",
          idapertura: this.$store.state.idapertura,
          tipoingreso: "",
        })
        .then((response) => {
          if (response.data.length > 0) {
            this.listadorecibos = response.data;
            this.estadolista = false;
            this.$store.state.cantope = parseInt(response.data.length);
            for (let index = 0; index < response.data.length; index++) {
              this.cantidadi++;
              if (response.data[index].estado_recibo == "EXTORNADO") {
                totalExtorno += parseFloat(response.data[index].total);
                cex++;
              } else {
                total += parseFloat(response.data[index].total);
                cance++;
              }
            }
            this.$store.state.cantidadIngresos=this.cantidadi;
            //console.log(total);
          } else {
            this.listadorecibos = [];
          }
          this.totalcancelado = total.toFixed(2);
          this.totalextorno = totalExtorno.toFixed(2);
          this.$store.state.totalextorno = this.totalextorno;
          this.$store.state.totalcancelado = this.totalcancelado;
          this.$store.state.cantextor = cex;
          this.$store.state.cantcance = cance;
          this.$store.state.actualizarlistaIn = 0;
          //console.log(response.data);
        });
    },
  },
};
</script>
<style scoped>
p {
  font-size: 12px;
  text-align: center;
}
</style>