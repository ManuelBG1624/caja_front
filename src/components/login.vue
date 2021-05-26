<template>
  <div>
    <div class="banner">
      <img src="../assets/logomuni.png" class="logo-login" />
    </div>
    <br />
    <p class="titulo">Sistema de la Municipalidad de Barranco</p>
    <br />
    <div class="cuerpo">
      <p class="subtitulo">Credenciales</p>
      <el-form :model="form" :rules="validacion" ref="form">
        <div class="row">
          <el-form-item prop="operador" class="formulario">
            <el-input
              suffix-icon="el-icon-user-solid"
              placeholder="Ingrese Operador"
              v-model="form.operador"
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="clave" class="formulario">
            <el-input
              suffix-icon="el-icon-lock"
              placeholder="Ingrese Clave"
              v-model="form.clave"
              class="mb-2"
              show-password
            >
            </el-input>
          </el-form-item>
          <el-button
            type="primary"
            class="btn-block"
            @click="enviarFormulario('form')"
            >Ingresar</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
//import {VueRouter} from 'vue-router'
import axios from "axios";
import {config} from "../config/config.js";
export default {
  data() {
    return {
      valor: 2,
      form: {
        operador: "",
        clave: "",
      },
      validacion: {
        operador: [
          {
            required: true,
            message: "Por favor ingrese Operador",
            trigger: "blur",
          },
        ],
        clave: [
          {
            required: true,
            message: "Por favor ingrese clave",
            trigger: "blur",
          },
        ],
      },
    };
  },
  updated(){
    if(this.$store.state.actua==true){
      location.reload();
      this.$store.state.actua=false;
    }

  },
  methods: {
    enviarFormulario(formulario) {
      //const router=VueRouter()
      this.$refs[formulario].validate((valid) => {
        if (valid) {
          //this.$router.push('/listado')
          //console.log(this.form.usuario)
          axios
            .post(
              config.api+"controller/cajero_controller.php",
              {
                opcion: "validar",
                operador: this.form.operador,
                clave: this.form.clave,
              }
            )
            .then((response) => {
              //console.log(response.data);
              if (response.data.length > 0) {
                this.$store.state.sesion = 1;
                this.$store.state.ncaja = response.data[0].nnrocaja;
                this.$store.state.nidusuario=response.data[0].nidusuario;
                this.$store.state.operador=response.data[0].coperador;
                this.$store.state.nombrecajero=response.data[0].capepaterno+' '+response.data[0].capematerno+' '+response.data[0].cnombres;
                if(response.data[0].estado_caja=='A'){
                  this.$store.state.estado=true;
                  this.$store.state.fechaa=response.data[0].fecha_apertura;
                  this.$store.state.idapertura=response.data[0].idapertura;
                }else{
                  this.$store.state.estado=false;
                }
                
                console.log(response.data);
                this.$router.push("/listado");
              } else {
                this.$message.error("Error: Datos no válidos");
              }

              //console.log(response.data);

              // console.log(response.data[0].total_pages)
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style>
.banner {
  width: 100%;
  height: 100px;
  background-color: #188fff;
}

.titulo {
  text-align: center;
  color: #868e96;
}
.cuerpo {
  width: 20%;
  margin: auto;
}
.subtitulo {
  color: #188fff;
  border-bottom: #188fff 1px solid;
  width: 100px;
  font-weight: bold;
}
.logo-login {
  display: block;
  margin: 0 auto;
  padding-top: 10px;
}
.formulario {
  width: 100%;
}
@media screen and (max-width: 600px) {
  .cuerpo {
    width: 80%;
  }
}
</style>