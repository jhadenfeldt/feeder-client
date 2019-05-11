<template>
  <div class="home">
    <Feed />
    <transition name="fade">
      <div v-if="isIframeOpen" class="iframe-container">
        <vue-friendly-iframe v-if="isIframeOpen" :src="iframeUrl" ></vue-friendly-iframe>
        <div @click="isIframeOpen = false; isMenuOpen = true" class="iFrame__close"><img src="@/assets/close.svg" /></div>
      </div>
    </transition>
    <transition name="fade">
      <Menu v-show="isMenuOpen" :isMenuOpen="isMenuOpen" @closeMenu="closeMenu" @launchIframe="launchIframe" />
    </transition>
    <button class="menu-button" @click="isMenuOpen = true">
      <img src="@/assets/menu.svg" />
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import Feed from '@/components/Feed.vue'
import Menu from '@/components/Menu.vue'

export default {
  name: 'home',
  components: {
    Feed,
    Menu
  },
  data () {
    return {
      isMenuOpen: false,
      isIframeOpen: false,
      iframeUrl: ''
    }
  },
  methods: {
    closeMenu () {
      this.isMenuOpen = false
    },
    launchIframe (url) {
      this.iframeUrl = url
      this.isIframeOpen = true
      this.isMenuOpen = false
    }
  }
}
</script>
<style lang="scss" >
.menu-button {
  position: absolute;
  background: transparent;
  border: none;
  top: -3px;
  transform: translateX(-50%);
  left: 50%;
  z-index:30;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  img {
    width: 80px;
  }
}
.iframe-container {
  z-index: 50;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  overflow: hidden;
  .vue-friendly-iframe {
    z-index: 50;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    overflow: hidden;
    iframe {
      width: 100%;
      height: 100%;
      border: none;
      background: #000;
    }
  }
  .iFrame__close {
    position: absolute;
    top: 10px;
    right: 15px;
    z-index: 100;
    color: #fff;
    width: 35px;
    cursor: pointer;
  }
}

.fade-enter-active {
  transition: opacity .35s;
}
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
