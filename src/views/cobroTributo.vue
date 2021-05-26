<template>
  <el-dialog
    title="Cobro de Tributos"
    :visible.sync="this.$store.state.dcobrot"
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
          placeholder="Todos"
          class="cbo"
          clearable
        >
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
          placeholder="Todos"
          class="cbo"
          clearable
        >
          <el-option
            v-for="item in datosSituacion"
            :key="item.cdessitcta"
            :label="item.cdessitcta"
            :value="item.idsitcta"
          >
          </el-option> </el-select
      ></el-col>
    </el-row>
    <hr />
    <h6>Listado de Predios</h6>
    <el-table
      :data="listadopredio"
      height="250"
      size="small"
      style="width: 100%"
      @selection-change="seleccionpredios"
    >
      <el-table-column prop="ncodpredi" label="Cod. Predio" width="100">
      </el-table-column>
      <el-table-column prop="nanexo" label="Anexo" width="100">
      </el-table-column>
      <el-table-column prop="direccion" label="Dirección del Predio">
      </el-table-column>
      <el-table-column type="selection" width="50"> </el-table-column>
    </el-table>
    <el-dialog
      width="1200px"
      title="Deuda Tributaria"
      :visible.sync="ddeudatributaria"
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
      <div style="width: 100%">
        <div style="width: 90%; display: inline-block">
          <el-col :span="6"> </el-col>
        </div>
        <div style="width: 10%; display: inline-block">
          <el-row :gutter="10">
            <el-col :span="4"
              ><el-button
                size="small"
                type="primary"
                :disabled="this.totals == 0"
                @click="voucher = true"
                >Voucher</el-button
              ></el-col
            >
          </el-row>
        </div>
      </div>
      <el-table
        :data="listadodeuda"
        size="mini"
        height="250"
        style="width: 100%"
        @selection-change="seleccionpagos"
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
          width="80"
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
        <el-table-column type="selection" width="50">
        </el-table-column> </el-table
      ><br />
      <el-row :gutter="10">
        <el-col :span="10"
          ><h6>Total Seleccion: {{ this.totals }}</h6>
        </el-col>
        <el-col :span="10"> </el-col>
      </el-row>
      <el-dialog
        width="600px"
        title="Voucher Tributos"
        :visible.sync="voucher"
        append-to-body
      >
        <el-row :gutter="20">
          <el-col :span="8"><p>Importe a Cancelar S/.</p></el-col>
          <el-col :span="8"
            ><el-input
              placeholder="Please input"
              v-model="totals"
              :disabled="true"
            >
            </el-input>
          </el-col> </el-row
        ><br />
        <el-row :gutter="20">
          <el-col :span="8"><p>Importe Efectivo S/.</p></el-col>
          <el-col :span="8"
            ><el-input
              placeholder="0.00"
              v-model="imefectivo"
              clearable
              autofocus
            >
            </el-input>
          </el-col> </el-row
        ><br />
        <el-row :gutter="20">
          <el-col :span="8"><p>Medio de Pago:</p></el-col>
          <el-col :span="16"
            ><el-select
              v-model="listadoMediopago"
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
          </el-col> </el-row
        ><br />
        <el-row :gutter="20" v-if="this.listadoMediopago == 2">
          <el-col :span="8"><p>Banco/Tarjeta:</p></el-col>
          <el-col :span="16"
            ><el-select
              v-model="listartipoTarjeta"
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
          </el-col> </el-row
        ><br />
        <el-row :gutter="20" v-if="this.listadoMediopago == 3">
          <el-col :span="8"><p>Numero:</p></el-col>
          <el-col :span="16"
            ><el-input placeholder="Please input" v-model="cheque" clearable>
            </el-input>
          </el-col>
        </el-row>
        <hr />
        <el-row :gutter="20">
          <el-col :span="8"><p>Vuelto S/.</p></el-col>
          <el-col :span="16"
            ><el-input v-model="vuelto" :disabled="true"> </el-input>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="voucher = false">Cancelar</el-button>
          <el-button size="small" type="primary" :disabled="this.vuelto<0 || this.imefectivo==''" @click="procesarVoucher" v-loading.fullscreen.lock="this.$store.state.cargarLoading"
            >Aceptar</el-button
          >
        </span>
      </el-dialog>
    </el-dialog>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="cerrarModal">Cancelar</el-button>
      <el-button size="small" type="primary" @click="listadoDeuda"
        >Aceptado</el-button
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
      //dialogVisible: false,
      dcobrot: false,
      annoi: 2021,
      annof: 2021,
      checked: true,
      datosTributo: [],
      tributo: "",
      cheque: "0",
      imefectivo: 0,
      ddeudatributaria: false,
      voucher: false,
      listadopredio: [],
      listadodeuda: [],
      datosSituacion: [],
      situacion: "",
      nompersona: "",
      dni: "",
      codperso: "",
      idperso: "",
      distrito: "",
      direcc: "",
      predioss: [],
      predios2: "",
      totals: 0.0,
      vuelto: 0.0,
      listadoMediopagos: [],
      listadoMediopago: "1",
      listarTipoTarjetas: [],
      listartipoTarjeta: "1",
      idctac: "",
      idsitcta: "",
      idtributo: "",
      idestcta: "",
      importe: "",
      value2: [],
      idcaja: 0,
      mora:"",
      otros:"",
      ipm:"",
      dscto:"",
      gastos:"",
      gastos_desc:"",
      moras_desc:"",
      ipm_desc:"",
      otros_desc:"",
      anexo:"",
    };
  },
  created() {
    this.listadoTributo();
    this.listadoSituacion();
    this.listadoPredios();
    this.listarMedioPago();
    this.listarTipoTarjeta();
  },
  beforeUpdate() {
    if (
      (this.ddeudatributaria == false && this.tributo == "") ||
      this.tributo == "0"
    ) {
      this.tributo = "";
    }
    if (
      (this.ddeudatributaria == false && this.situacion == "") ||
      this.situacion == "0"
    ) {
      this.situacion = "";
    }
    if (this.$store.state.nidpersona != 0) {
      this.listadoPredios();
      this.maepersona();

      //console.log("listado predios: " + this.$store.state.nidpersona);
    }
    this.vuelto = (
      parseFloat(this.imefectivo) - parseFloat(this.totals)
    ).toFixed(2);
  },
  methods: {
    cerrarModal() {
      this.$store.state.dcobrot = false;
      //this.dcobrot=false
      //console.log(this.dcobrot)
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
    listadoPredios() {
      axios
        .post(config.api + "controller/contribuyentes_controller.php", {
          opcion: "listadoPredio",
          idperso: this.$store.state.nidpersona,
        })
        .then((response) => {
          //this.$store.state.nidpersona = 0;
          this.listadopredio =
            response.data && Array.isArray(response.data) ? response.data : [];
        });
    },
    maepersona() {
      axios
        .post(config.api + "controller/contribuyentes_controller.php", {
          opcion: "persona",
          idperso: this.$store.state.nidpersona,
        })
        .then((response) => {
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
          this.idperso = this.$store.state.nidpersona;
          console.log(
            "maeperona nidpersotributo: " + this.$store.state.nidpersona
          );
          //this.persona = 0;
          this.$store.state.nidpersona = 0;
          //this.$store.state.nidpersona=0;
        });
    },
    listadoDeuda() {
      if (this.predioss < 1) {
        if (this.tributo == "") {
          this.tributo = "0";
        }
        if (this.situacion == "") {
          this.situacion = "0";
        }
        axios
          .post(config.api + "controller/contribuyentes_controller.php", {
            opcion: "listadoDeuda2",
            idperso: this.idperso,
            idgtributo: this.tributo,
            anoi: this.annoi,
            anof: this.annof,
            situacion: this.situacion,
            anexo:this.anexo,
          })
          .then((response) => {
            this.listadodeuda = response.data;
            //console.log(this.listadodeuda[0]);
            this.ddeudatributaria = true;
          });
      }
    },
    seleccionpredios(val) {
      this.anexo="";
      
      for (let i = 0; i < val.length; i++) {
       this.anexo+=val[i].nanexo+",";
      }
      console.log(this.anexo);
      /*this.predios2 = "";
      this.predioss = [];
      if (val.length > 0) {
        for (let i = 0; i < val.length; i++) {
          this.predioss[i] = val[i].ncodpredi;
          this.predios2 += this.predioss[i] + ",";
        }

        //console.log(this.predios2);
      } else {
        this.predios2 = "";
      }
      //console.log(this.predioss);
      console.log(this.predios2);
      */
    },
    seleccionpagos(val) {
      this.totals = 0;
      this.idctac = "";
      this.idsitcta = "";
      this.idtributo = "";
      this.idestcta = "";
      this.importe = 0;
      let total = 0;
      if (val.length > 0) {
        for (let i = 0; i < val.length; i++) {
          total += parseFloat(val[i].insoluto2) + parseFloat(val[i].gastos2) + parseFloat(val[i].moras2)+parseFloat(val[i].otros2)+parseFloat(val[i].ipm2)-parseFloat(val[i].desc_insoluto2);
          this.idctac += val[i].idctac2 + "-";
          this.idsitcta += val[i].idsitcta2 + "-";
          this.idtributo += val[i].idtributo2 + "-";
          this.idestcta += val[i].idestcta2 + "-";
          this.importe +=parseFloat(val[i].insoluto2)+"-";

          this.mora+=val[i].moras2+"-";
          this.otros+=val[i].otros2+"-";
          this.dscto+=val[i].desc_insoluto2+"-";
          this.gastos+=val[i].gastos2+"-";
          this.ipm+=val[i].ipm2+"-";

          this.gastos_desc+=val[i].desc_gasto2+"-";
          this.moras_desc+=val[i].desc_moras2+"-";
          this.ipm_desc+=val[i].desc_ipm2+"-";
          this.otros_desc+=val[i].desc_otros2+"-";
          //console.log(val[i].idctac2)
        }
        this.totals = total.toFixed(2);
        console.log(this.idtributo);
      } else {
        this.totals = 0.0;
      }
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
    procesarVoucher() {
      this.$store.state.cargarLoading=true;
      axios
        .post(config.api + "controller/contribuyentes_controller.php", {
          opcion: "procesarvoucher",
          idctac: this.idctac,
          total: this.totals,
          idperso: this.idperso,
          idgtributo: this.tributo,
          situacion: this.idsitcta,
          idtributo: this.idtributo,
          idestcta: this.idestcta,
          operador: this.$store.state.operador,
          caja: this.$store.state.ncaja,
          importe: this.importe,
          mediopago: this.listadoMediopago,
          tipo_tarjeta: this.listartipoTarjeta,
          cheque: this.cheque,
          idapertura: this.$store.state.idapertura,

          mora:this.mora,
          otros:this.otros,
          ipm:this.ipm,
          dscto:this.dscto,
          gastos:this.gastos,
          gastos_desc:this.gastos_desc,
          moras_desc:this.moras_desc,
          ipm_desc:this.ipm_desc,
          otros_desc:this.otros_desc,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.length > 0) {
            this.idcaja = response.data;
            this.$message({
              message: "Felicidades: Pago realizado correctamente...",
              type: "success",
            });
            this.voucher = false;
            this.ddeudatributaria = false;
            this.imprimirVoucher();
            this.$store.state.cargarLoading=false;
            this.$store.state.cantidadIngresos=this.$store.state.cantidadIngresos+1;
            this.cerrarModal();
            //this.listadoDeuda();
          }
          //console.log(response.data);
        });
    },
    imprimirVoucher() {
      this.$store.state.actualizarlistaIn = 1;
      open(
        config.api +
          "controller/reporteRubro.php?opcion=voucherTributo&idperso=" +
          this.$store.state.nidpersona3 +
          "&idcaja=" +
          this.idcaja
      );
    },
  },
};
</script>
<style scoped>
.cbo {
  width: 90%;
}
</style>