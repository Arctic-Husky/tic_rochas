<template>
    <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#05060B"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      
      <v-col cols="5">
        <v-toolbar-title>
            <v-img src="@/assets/logoName.png" width="279px" height="36px"></v-img>
        </v-toolbar-title>
      </v-col>
     

      
      <v-col>
        <v-text class="btn" @click="catalogRoute" :style="this.catalog? ' color: #F4F3BA;': 'color: aliceblue;'">
          Catálogo
        </v-text>
      </v-col>
      
      <v-col>
        <v-text class="btn" @click="treatmentRoute" :style="this.catalog? ' color: aliceblue;': 'color: #F4F3BA;'">
            Tratamento
        </v-text>
        
      </v-col> 
      <v-btn icon>

      </v-btn>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="600"
    >
    </v-sheet>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data: () => ({
      catalog: true,
    }),

    methods: {
        treatmentRoute() {
          this.$store.dispatch('SET_MENU_COLOR', false);
          this.$router.push({ path: '/treatment' }).catch(()=>{});
        },
        catalogRoute() {
          this.$store.dispatch('SET_MENU_COLOR', true);
          this.$router.push({ path: '/' }).catch(()=>{});
        }
    },

    created() {
      this.catalog = this.getMenuColor
    },

    computed: {
      ...mapGetters([
        "getMenuColor"
      ])
    }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');

    .btn {
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        /* color: aliceblue; */
        cursor: pointer;
    }
</style>