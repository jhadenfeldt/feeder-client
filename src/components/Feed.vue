<template>
  <div class="feed" v-if="currentItem" :style="`background: linear-gradient(45deg, ${currentItem.gradient[0]}, ${currentItem.gradient[1]})`">
    <div class="feed__item">
      <div class="feed__background" v-html="currentItem.content" v-if="currentItem.hasImage"></div>
      <div class="feed__content">
        <div class="feed__progressContainer">
          <div class="feed__progressBar" :class="{'feed__progressBar--animate': animate}" :style="`background: ${currentItem.gradient[0]}`"></div>
        </div>
        <div class="feed__title">{{currentItem.title}}</div>
        <div class="feed__subtitle">{{currentItem.pageName}} - {{currentItem.isoDate | ago}}</div>
      </div>
      <vue-qrcode class="feed__qr-code" :value="currentItem.link" :options="{ width: 100 }"></vue-qrcode>
    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';

  dayjs.extend(relativeTime);

  import VueQrcode from '@chenfengyuan/vue-qrcode';

  export default {
    props: {
      msg: String
    },
    components: {
      VueQrcode
    },
    data() {
      return {
        currentItem: null,
        feed: null,
        feedIndex: 0,
        animate: false
      }
    },
    mounted() {
      this.updateFeed();
    },
    filters: {
      ago: (value) => {
        if (!value) {
          return '';
        }
        return dayjs(value).fromNow();
      }
    },
    methods: {
      updateFeed() {
        this.feedIndex = 0;
        fetch('http://feeder.jan-hadenfeldt.de/', {
            mode: "cors"
        })
          .then((response) => {
            return response.json();
          })
          .then((myJson) => {
            this.feed = myJson.slice(0, 10);

            this.updateItem();
          });
      },
      updateItem() {
        this.currentItem = this.feed[this.feedIndex];
        this.$nextTick(() => {
          this.animate = true;
        });

        setTimeout(() => {
          this.animate = false;
        }, 29.75 * 1000);

        setTimeout(() => {
          this.feedIndex++;

          if (this.feedIndex >= this.feed.length) {
            this.$nextTick(() => {
              this.updateFeed();
            });
          } else {
            this.$nextTick(() => {
              this.updateItem();
            });
          }
        }, 30 * 1000);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .feed {
    width: 100vw;
    height: 100vh;

    &__progressContainer {
      z-index: 3;
      height: 5px;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    &__progressBar {
      height: 5px;
      width: 0;
      position: absolute;
      bottom: 0;
      left: 0;
      transition: width linear 0s;

      &--animate {
        width: 100%;
        transition-duration: 29.75s;
      }
    }

    &__item {
      height: 100%;
    }

    &__background {
      height: 100%;
      font-size: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__content {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 50px 25% 50px 50px;
      z-index: 2;
      font-size: 48px;
      color: #fff;
      font-family: 'Roboto Slab', serif;
      width: calc(100% - 25% - 50px);
      background: rgba(0, 0, 0, 0.85);
    }

    &__title {
      font-weight: 700;
      margin-bottom: 25px;
    }

    &__subtitle {
      font-weight: 300;
      font-size: 28px;
    }

    &__qr-code {
      position: absolute;
      z-index: 2;
      bottom: 50px;
      right: 50px;
      padding: 3px;
      border-radius: 8px;
      background: white;
    }
  }
</style>
