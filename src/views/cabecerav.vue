<template>
  <div class="cuerpo-menuv">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="this.$store.state.isCollapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">Caja</span>
        </template>
        <el-menu-item-group>
          <span slot="title">Group One</span>
          <el-menu-item index="1-1"
            ><router-link to="/listado" class="link"
              >Inicio</router-link
            ></el-menu-item
          >
          <el-menu-item index="1-1"
            ><router-link to="/ingresospordia" class="link">
              Reporte cajero diario</router-link
            ></el-menu-item
          >
          <el-menu-item index="1-2" @click="Modalestadocue"
            >Estado de cuenta</el-menu-item
          >
          <el-menu-item index="1-2" @click="salir">Salir</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
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
    salir() {
      this.$store.state.actua = true;
      this.$router.push("/");
    },
  },
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  height: 100%;
  top: 50px;
  position: fixed;
}
.el-menu--collapse {
  top: 50px;
  height: 100%;
  position: fixed;
}
.sidebar {
  width: 250px;
  left: 0px;
  background-color: #fff;
  height: 100%;
  position: fixed;
  top: 50px;
  transition: all 0.5s ease;
  color: #000;
}

.menu-vertical {
  list-style: none;
  padding: 20px 20px;
}
.link {
  color: #000;
}
.link:hover {
  color: #188fff;
  text-decoration: none;
}
@media only screen and (max-width: 1900px) {
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>
