<template>
  <div>
    <div class="contenedor-cabecerah">
      <div class="navegacion">
        <img src="../assets/logomuni.png" class="logo" />
        <input
          type="checkbox"
          id="check"
          v-model="chek"
          @change="mostrarMenuv"
        />
        <label for="check">
          <i class="el-icon-s-unfold" id="cancel"></i>
          <i class="el-icon-s-fold" id="btn"></i>
        </label>
      </div>
      <div class="cu"></div>
      <div class="usuario">
        <p class="fecha">{{ this.$store.state.fechaa }}</p>
       <el-button type="primary" icon="el-icon-user-solid" @click="mostrarDraw" circle></el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chek: false,
      drawer: false,
    };
  },
  methods: {
    mostrarMenuv() {
      this.$store.state.isCollapse = this.chek;
      console.log(this.$store.state.isCollapse);
    },
    mostrarDraw(){
      this.$store.state.drawer = true;
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.fecha{
  display: inline-block;
  margin-right: 3px;
  color: #fff;
}
.contenedor-cabecerah {
  width: 100%;
  height: 50px;
  background-color: #188fff;
  position: fixed;
  z-index: 1000;
}
.logo {
  max-width: 100px;
  margin-left: 20px;
}
#check {
  display: none;
}
#check ~ label #cancel {
  opacity: 0;
}
label #btn,
label #cancel {
  background: #188fff;
  border-radius: 3px;
  cursor: pointer;
  color: #fff;
  font-size: 20px;
  padding: 6px 12px;
  transition: all 0.5s ease;
}

#check:checked ~ label #btn {
  opacity: 0;
  pointer-events: none;
}
#check:checked ~ label #cancel {
  opacity: 1;
}
#check:checked ~ #sidebar {
  display: none;
}
.cu {
  width: 50%;
  height: 30px;
  display: inline-block;
}
.usuario {
  display: inline-block;
  height: 50px;
}
.navegacion {
  height: 50px;
  display: inline-block;
  width: 30%;
}
</style>