<template>
<div class="Catalog">
    
    <NavBar/>
    <v-container style="height: 150px;"></v-container>
    <v-row justify="center" :style="'justify-content: center;'">

        <v-col cols="3" >
    
            <v-text-field
                append-icon="mdi-magnify"
                label="Pesquisar"
                outlined
                v-model="search"
            >
        
            </v-text-field>
        </v-col>
    </v-row>
    <v-container style="height: 50px;"></v-container>
    <v-container fluid="" default>
        <v-row>
            <v-col
            v-for="(item, index) in images"
            :key="index"
            cols="4"
            >
            <v-card  color="#e9e9eb" width="570px" style=" margin-bottom: 40px; box-shadow: none !important;" @click="openImage(item)">
                <v-img :src="item.URL_ARQUIVO" cover height="339px"></v-img>
                <v-card-title primary-title style="background-color: #e9e9eb;">
                    <div>
                        <h3 v-text="item.NOME_ARQUIVO"></h3>
                    </div>
                </v-card-title>
            </v-card>
        </v-col>
    </v-row>
</v-container>
<v-row justify="center">
<v-dialog
    :style="dialog? ' display: block;': 'display: none;'"
    v-model="dialog"
    width="1200"
    height="800"
    
>
      <v-card
      style="background-color: #e9e9eb; color: #05060B">
      <div style="display: flex; justify-content: space-between;">
      <v-card-title class="text-h5">
          {{ dialogTitle }}
        </v-card-title>
        <v-card-actions class="justify-end">
          <v-btn
            style="background-color: #e9e9eb;; color: #53090f; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; "
            @click="dialog = false"
          ><v-icon> mdi-close</v-icon>
        </v-btn>
        </v-card-actions>
        </div>
        <v-img 
            max-height="700"
            :src="dialogImage">
        </v-img>

      </v-card>
</v-dialog>
</v-row>

</div>
</template>
<script>
import axios from "@/axiosConfig"
import NavBar from '../components/NavBar/index.vue'

export default {
    components: {
        NavBar,
    },
    
    data: () => ({
        images: Array(),
        dialog: false,
        dialogTitle: String(),
        dialogImage: String(),
        search: String(),
    }),

    methods: {

        openImage(item) {
            this.dialog = true
            this.dialogTitle =item.NOME_ARQUIVO
            this.dialogImage = item.URL_ARQUIVO

        },

        getAllImages() {
            axios
            .get("/catalogo").then((response) => {
                this.images = response.data[1]
            })

        },

        searchImage(val) {
            if(val == '') {
                this.getAllImages()
            } else {

                const headers = {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                }
                const payload = {
                    stringBusca: '%' + val + '%'
                }
                axios
                .post("/busca", payload, {headers}).then((response) => {
                    this.images = response.data[1]
                })
            }
        }
        
    },

    computed: {
        
    },
    watch: {
       search: function(val) {
        this.searchImage(val)
       }
    },

    created() {
        this.getAllImages()
    },
}
</script>
<style>
.Catalog {
    background-color: #f5f4f3;
}

h3 {
color: #05060B;
}


</style>