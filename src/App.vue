<template>
  <div id="app">
    <!--<router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>-->
    <contenido></contenido>
  </div>
</template>
<script>
import contenido from "./views/contenido.vue";
export default {
  updated(){
    
  },
  name: "app",
  components: {
    contenido,
  },
  methods:{
    tamañocontenido(){
      if(this.$store.state.isCollapse==true){
        let box = document.getElementsByClassName('contenido-cuerpo')[0];
        box.style.padding='0px 80px '
      }
      
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Lexend:wght@100;400;500&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,900;1,300&display=swap");
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: "Lexend", sans-serif;
  background-color: #f5f7fa;
}
.contenido-cuerpo {
  padding-top: 50px;
  padding-left: 250px;
  padding-right: 50px;
  transition: all 0.5s;
}

@media only screen and (max-width: 1900px) {
  .contenido-cuerpo {
    padding-left: 200px;
    padding-right: 20px;
  }
}
</style>
