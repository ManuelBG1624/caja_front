import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store=new Vuex.Store({
    state:{
        operador:'',
        nombrecajero:'',
        clave:0,
        ncaja:0,
        sesion:0,
        nidusuario:0,
        fechaa:'--',
        dcobrot:false,
        destadocu:false,
        drubrotupac:false,
        dingresos:false,
        dingresopordia:false,
        ccodperso:0,
        nidpersona:0,
        nidpersona2:0,
        nidpersona3:0,
        ano:0,
        estado:true,
        isCollapse:false,
        idapertura:0,
        actualizarlistaIn:0,
        totalextorno:0,
        totalcancelado:0,
        cantope:0,
        cantcance:0,
        cantextor:0,
        drawer:false,
        cargarLoading:false,
        cantidadIngresos:0,
        actua:false,
    }

});
export default store 