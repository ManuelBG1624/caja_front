<template>
  <el-dialog
    title="Registrar Valores a Cobrar"
    :visible.sync="this.$store.state.drubrotupac"
    width="1200px"
    :before-close="cerrarModal">
    <el-button-group>
    <el-button icon="el-icon-plus" size="small" @click="listarRubro" plain>Insertar</el-button>

      <el-button
        :disabled="deshabilitar"
        icon="el-icon-delete"
        type="danger"
        size="small"
        @click="eliminargrilla"
        plain
        >Eliminar</el-button>
        <el-button
        :disabled="deshabilitar"
        icon="el-icon-printer"
        size="small"
        plain
        @click="dmediopago = true"
        >Voucher</el-button>
    </el-button-group>
    <hr />
    <h5>Persona</h5>
    <el-row :gutter="10">
      <el-col :span="6">Apellidos y Nombres</el-col>
      <el-col :span="8">: {{ this.nompersona }}</el-col>
      <el-col :span="3">Codigo</el-col>
      <el-col :span="3">: {{ this.codperso }}</el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">Documento de Identidad</el-col>
      <el-col :span="8">: {{ this.dni }}</el-col>
      <el-col :span="3">Distrito</el-col>
      <el-col :span="3">: {{ this.distrito }}</el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">Direccion</el-col>
      <el-col :span="6">: {{ this.direcc }}</el-col>
    </el-row>
    <hr />
    <el-table
      :data="grilla"
      size="small"
      ref="grilla"
      highlight-current-row
      @current-change="seleccionarGrilla"
      style="width: 100%"
    >
      <el-table-column prop="codigorubro" label="Cod.Rubro" width="100">
      </el-table-column>
      <el-table-column prop="nombre_rubro" label="Rubros"> </el-table-column>
      <el-table-column prop="importerubro" label="Importe" width="100">
      </el-table-column>
      <el-table-column prop="cantidad_rubro" label="Cantidad" width="100">
      </el-table-column>
      <el-table-column prop="total_rubro" label="Total" width="100">
      </el-table-column>
    </el-table>
    <el-dialog
      width="600px"
      title="Voucher"
      :visible.sync="dmediopago"
      append-to-body
    >
      <el-row :gutter="20">
        <el-col :span="8"><p>Importe a Cancelar S/.</p></el-col>
        <el-col :span="8"
          ><el-input
            size="small"
            placeholder="Please input"
            v-model="total_pago"
            :disabled="true"
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"><p>Importe Efectivo S/.</p></el-col>
        <el-col :span="8"
          ><el-input
            size="small"
            placeholder="Please input"
            v-model="imefectivo"
            clearable
            :autofocus="true"
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"><p>Medio de Pago:</p></el-col>
        <el-col :span="16"
          ><el-select
            v-model="listadoMediopago"
            size="small"
            clearable
            placeholder="Seleccione"
          >
            <el-option
              v-for="item in listadoMediopagos"
              :key="item.listadoMediopago"
              :label="item.nombre_medio_pago"
              :value="item.idmediopago"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="this.listadoMediopago == 2">
        <el-col :span="8"><p>Banco/Tarjeta:</p></el-col>
        <el-col :span="16"
          ><el-select
            v-model="listartipoTarjeta"
            size="small"
            clearable
            placeholder="Seleccione"
          >
            <el-option
              v-for="item in listarTipoTarjetas"
              :key="item.listartipoTarjeta"
              :label="item.nombre_tarjeta"
              :value="item.idtipotarjeta"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="this.listadoMediopago == 3">
        <el-col :span="8"><p>Numero:</p></el-col>
        <el-col :span="16"
          ><el-input
            size="small"
            placeholder="Please input"
            v-model="input"
            clearable
          >
          </el-input>
        </el-col>
      </el-row>
      <hr />
      <el-row :gutter="20">
        <el-col :span="8"><p>Vuelto S/.</p></el-col>
        <el-col :span="16"
          ><el-input size="small" v-model="vuelto" :disabled="true"> </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dmediopago = false">Cancelar</el-button>
        <el-button size="small" type="primary" :disabled="this.vuelto<0 || this.imefectivo==''"  @click="insertardetallecaja"
          >Aceptar</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      width="1000px"
      title="Rubros"
      :visible.sync="drubros"
      append-to-body
    >
      <el-input
        placeholder="Buscar rubro"
        size="small"
        clearable
        v-model="search"
      ></el-input>
      <el-table
        :data="
          listadorubro.filter(
            (data) =>
              !search ||
              data.nombre_rubro.toLowerCase().includes(search.toLowerCase()) ||
              data.idrubro.toLowerCase().includes(search.toLowerCase())
          )
        "
        height="250"
        size="small"
        style="width: 100%"
        highlight-current-row
        @current-change="seleccionarrubro"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="Codigo" prop="idrubro" width="80">
        </el-table-column>
        <el-table-column label="Descripcion" prop="nombre_rubro">
        </el-table-column>
        <el-table-column label="Valor" prop="valor" width="80">
        </el-table-column>
      </el-table>
      <br />
      <el-input type="textarea" :rows="2" v-model="txtdescripcion"> </el-input>
      <br /><br />
      <el-row :gutter="10">
        <el-col :span="6">Importe: </el-col>
        <el-col :span="6"
          ><el-input
            v-model="importe"
            :disabled="valor > 0"
            @change="calacularTotalrubro"
            size="small"
          ></el-input
        ></el-col>
        <el-col :span="6">Cantidad</el-col>
        <el-col :span="6"
          ><el-input
            v-model="cantidad"
            @change="calacularTotalrubro"
            size="small"
          ></el-input
        ></el-col>
      </el-row>
      <hr />
      <el-row :gutter="10">
        <el-col :span="12">.</el-col>
        <el-col :span="6">Total</el-col>
        <el-col :span="6"
          ><el-input v-model="total" disabled size="small"></el-input
        ></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="drubros = false" size="small">Cancelar</el-button>
        <el-button type="primary" @click="agregarDatosgrilla" size="small"
          >Aceptar</el-button
        >
      </span>
    </el-dialog>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cerrarModal" size="small">Cancelar</el-button>
    </span>
  </el-dialog>
</template>
<script>
import axios from "axios";
import { config } from "../config/config.js";
export default {
  data() {
    return {
      drubrotupac: false,
      drubros: false,
      direcc: "",
      dni: "",
      codperso: "",
      distrito: "",
      idperso: 0,
      nompersona: "",
      idrubro: 0,
      listadorubro: [],
      search: "",
      txtdescripcion: "",
      valor: 0,
      cantidad: 1,
      total: 0,
      importe: 0,
      nombrerubro: "",
      grilla: [],
      idgrilla: "",
      idctac: "",
      idtipvalor: "",
      idarea: "",
      loading: false,
      dmediopago: false,
      listadoMediopagos: [],
      listadoMediopago: "1",
      listarTipoTarjetas: [],
      listartipoTarjeta: "1",
      vuelto: 0,
      input: "0",
      imefectivo: 0,
      deshabilitar: true,
      total_pago: 0,
      idcaja: 0,
    };
  },
  created() {
    this.listarMedioPago();
    this.listarTipoTarjeta();
  },
  beforeUpdate() {
    if (this.grilla.length > 0) {
      this.deshabilitar = false;
      this.calcularTotal();
    } else {
      this.deshabilitar = true;
    }
    if (this.$store.state.nidpersona3 != 0) {
      //this.listadoPredios();
      this.maepersona();

      this.vuelto = (
        parseFloat(this.imefectivo) - parseFloat(this.total_pago)
      ).toFixed(2);
    }
  },
  methods: {
    calcularTotal() {
      let total = 0;
      for (let i = 0; i < this.grilla.length; i++) {
        total += parseFloat(this.grilla[i].total_rubro);
      }
      this.total_pago = total.toFixed(2);
    },
    seleccionarGrilla(row) {
      this.idgrilla = row;
    },
    listarMedioPago() {
      axios
        .post(config.api + "controller/cajero_controller.php", {
          opcion: "listarmediopago",
        })
        .then((response) => {
          this.listadoMediopagos = response.data;
          //console.log(response.data);
        });
    },
    listarTipoTarjeta() {
      axios
        .post(config.api + "controller/cajero_controller.php", {
          opcion: "listartipotarjeta",
        })
        .then((response) => {
          this.listarTipoTarjetas = response.data;
          //console.log(response.data);
        });
    },
    eliminargrilla() {
      this.loading = true;
      let indice = this.grilla.indexOf(this.idgrilla);
      //console.log('indice '+ indice);
      //console.log('idgrilla '+this.idgrilla);
      this.$confirm("Estas seguro que desea eliminar?", "Alerta", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "Eliminado",
          });
          this.grilla.splice(parseInt(indice), 1);
          this.loading = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "cancelado",
          });
          //this.loading=false;
        });
    },
    cerrarModal() {
      this.$store.state.drubrotupac = false;
      this.grilla = [];
      this.importe = 0;
      this.total = 0;
      this.cantidad = 1;
      //this.dcobrot=false
      //console.log(this.dcobrot)
    },
    agregarDatosgrilla() {
      this.$message({
        message: "Agregado correctamente",
        type: "success",
      });
      this.grilla.push({
        codigorubro: this.idrubro,
        nombre_rubro: this.nombrerubro,
        importerubro: this.importe,
        cantidad_rubro: this.cantidad,
        total_rubro: this.total,
        idtipvalor: this.idtipvalor,
        idarea: this.idarea,
      });
      this.drubros = false;
      this.importe = 0;
      this.total = 0;
      this.cantidad = 1;
    },
    seleccionarrubro(val) {
      this.idrubro = val.idrubro;
      this.valor = val.valor;
      this.nombrerubro = val.nombre_rubro;
      this.idtipvalor = val.tipo_valor;
      this.idarea = val.idarea;
      if (this.valor != 0) {
        this.importe = val.valor;
      } else {
        this.importe = 0;
      }
      this.calacularTotalrubro();
    },
    calacularTotalrubro() {
      this.total = (
        parseFloat(this.importe) * parseFloat(this.cantidad)
      ).toFixed(2);
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
            //console.log("nidperso: " + this.$store.state.nidpersona);
          }

          //this.$store.state.nidpersona=0;
        });
    },
    listarRubro() {
      axios
        .post(config.api + "controller/contribuyentes_controller.php", {
          opcion: "listarrubro",
          ano: this.$store.state.ano,
        })
        .then((response) => {
          this.drubros = true;
          if (response.data.length > 0) {
            //console.log(response.data);
            this.listadorubro = response.data;
          } else {
            this.listadorubro = [];
          }
        });
    },
    insertardetallecaja() {
      this.$store.state.actualizarlistaIn = 1;
      this.$store.state.cargarLoading=true;
      let idrubro = "";
      let importe = "";
      let idtipvalor = "";
      let idarea = "";
      for (let i = 0; i < this.grilla.length; i++) {
        idrubro += this.grilla[i].codigorubro + "-";
        importe += this.grilla[i].importerubro + "-";
        idtipvalor += this.grilla[i].idtipvalor + "-";
        idarea += this.grilla[i].idarea + "-";
      }

      console.log("apertura: " + this.$store.state.idapertura);
      console.log("idperso: " + this.idperso);
      console.log("operador: " + this.$store.state.operador);
      console.log("idcaja: " + this.$store.state.ncaja);
      console.log("rubro:" + idrubro);
      console.log("importe:" + importe);
      console.log("area:" + idarea);
      console.log("idtipvalor: " + idtipvalor);

      axios
        .post(config.api + "controller/contribuyentes_controller.php", {
          opcion: "insertar_rubro_detalle",
          idrubro: idrubro,
          importe: importe,
          idtipvalor: idtipvalor,
          idarea: idarea,
          caja: this.$store.state.ncaja,
          total: this.total_pago,
          idperso: this.idperso,
          mediopago: this.listadoMediopago,
          tipo_tarjeta: this.listartipoTarjeta,
          cheque: this.input,
          referencia: this.txtdescripcion,
          operador: this.$store.state.operador,
          idapertura: this.$store.state.idapertura,
        })
        .then((response) => {
          this.dmediopago = false;
          if (response.data.length > 0) {
            console.log(response.data);
            this.idcaja = response.data;
            this.grilla = [];
            this.imprimirVoucher();
            this.$store.state.cargarLoading=false;
            this.$store.state.cantidadIngresos=this.$store.state.cantidadIngresos+1;
            this.$message({
              message: "Felicidades!, Agregado correctamente..",
              type: "success",
            });
          }
        });
    },
    imprimirVoucher() {
      console.log("persona: " + this.$store.state.nidpersona2);
      console.log("idcaja: " + this.idcaja);
      this.$store.state.actualizarlistaIn = 1;
      open(
        config.api +
          "controller/reporteRubro.php?opcion=voucherRubro&idperso=" +
          this.$store.state.nidpersona2 +
          "&idcaja=" +
          this.idcaja
      );
    },
  },
};
</script>
<style scoped>
.cbo-rubros {
  width: 90%;
}
</style>