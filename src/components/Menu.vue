<template>
  <div class="menu">
    <div @click="$emit('closeMenu')" class="menu__close">
      <img src="@/assets/close.svg" />
    </div>
    <div class="menu__inner">
      <div v-for="project in projects"
        :key="project._id"
        class="menu__project"
        @click="$emit('launchIframe', project.url)">
        <img :src="getImage(project.image)" />
        <h3>{{project.name}}</h3>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    isMenuOpen: Boolean
  },
  data () {
    return {
      projects: [
        {
          name: 'Deployment Dash',
          image: 'projects/deployment-dash.jpg',
          url: 'https://dell-tech-world-deploy-078305.netlify.com/'
        },
        {
          name: 'Device Defender',
          image: 'projects/device-defender.jpg',
          url: 'https://unified-workspace-security-9a6746.netlify.com/'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    getImage (img) {
      return require(`@/assets/${img}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.menu {
    display: flex;
    position: absolute;
    height: 100%;
    width: 100%;
    background: linear-gradient(45deg, rgba(44,62,80,0.95) 20%,rgba(76,161,175,0.95) 100%);
    left: 0;
    top: 0;
    z-index: 50;
    justify-content: center;
    align-items: center;
    &__inner {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 80vw;
      height: 80vh;
    }
    &__project {
      background: #222;
      max-width: 32%;
      padding: 10px;
      cursor: pointer;
      border-radius: 5px;
      img {
        max-width: 100%;
      }
      h3 {
        margin: 5px 0px;
        font-size: 1.5rem;
        font-family: Arial, Helvetica, sans-serif;
        color: #fff;
        text-align: center;
      }
    }
    button {
        position: absolute;
        top: 50%;
        left: -20px;
    }
    &__close {
      color: #fff;
      position: absolute;
      top: 10px;
      right: 15px;
      cursor: pointer;
      width: 35px;
    }
}
</style>
