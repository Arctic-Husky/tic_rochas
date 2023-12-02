<template>
  <div class="Treatment">
    <NavBar />
    <v-container style="height: 200px;" width="20px" height="20px"></v-container>
    <v-card color="green"></v-card>

    <v-container fluid="" default>
      <v-row>
        <v-col cols="6">

            <v-file-input
            v-model="inputImage"
            accept="image/*"
            outlined
            style="width: 719px;"
            id="myFile"
            label="Escolher imagem"
            @change="Preview_image($event)"
          >
          </v-file-input>


          <v-card color="#e9e9eb" width="800px" height="450px" style="border: solid 2px #05060B; border-radius: 5px; display: flex; justify-content: center; align-items: center;">
            <img
              v-if="url != undefined"
              id="Preview_image_create"
              :src="url"
              class="Preview_image pa-5"
              width="790"
              height="440"
              style="align-self: center;"
            />
            <img
              v-else
              id="Preview_image_create"
              src="../assets/imageIcon.png"
              class="mx-auto"
              width="128"
              height="128"
            />
          </v-card>
          <br><br>
          <div class="text-center" style="display: flex; justify-content: space-evenly; position: relative; left: -60px">
            <v-btn
              width="180px"
              height="40px"
              @click="cancel()"
              style="background-color: #53090f; color: white; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
              > Cancelar 
              <v-icon>
               mdi-close
              </v-icon>
            </v-btn>
            <v-btn
             width="180px"
             height="40px"
             style="background-color: #095341; color: white; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
             @click="uploadImage()"
             > Confirmar 
             <v-icon>
               mdi-tray-arrow-up
            </v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="6">
          <v-container style="height: 86px;"></v-container>
          <v-card color="#e9e9eb" width="800px" height="450px" style="border: solid 2px #05060B; border-radius: 5px; display: flex; justify-content: center; align-items: center;">
            <img
              v-if="success"
              src="../assets/success.png"
              class="Preview_image pa-5"
              width="150"
              height="150"
              style="align-self: center;"
            />
            <img
              v-if="loading"
              src="../assets/loading.gif"
              class="Preview_image pa-5"
              width="150"
              height="150"
              style="align-self: center;"
            />
            <img
              v-if="responseImageShow"
              :src="this.responseImage"
              class="Preview_image pa-5"
              width="790"
              height="440"
              style="align-self: center;"
            />
          </v-card>
          <br><br>
          <div class="text-center">
            <v-row style="display: flex; justify-content: center; align-items: center;">
            <v-btn
              width="180px"
              height="40px"
              @click="save()"
              style="background-color: #095341; color: white; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; position: relative; left: -60px"
              > Salvar
              <v-icon>
               mdi-content-save-all-outline
              </v-icon>
            </v-btn>
          </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container style="height: 253px;"></v-container>
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
      url: undefined,
      inputImage: String(),
      responseImage: String(),
      imageToSave: String(),
      loading: Boolean(),
      responseImageShow: Boolean(),
      success: Boolean(),
    }),

    methods: {
      Preview_image(e) {
      e ? (this.url = URL.createObjectURL(e)) : (this.url = null);
    },

      cancel() {
        this.url = undefined
        this.inputImage = ""
        this.responseImage = ""
        this.imageToSave = ""
        this.responseImageShow = false
      },
      async save() {
        this.responseImageShow = false
        this.loading = true
        const headers = {
          'Accept': 'image/png',
          'Content-Type': 'multipart/form-data'
        };

        var formData = new FormData();

        const [head, ...rest] = this.inputImage.name.split('.');

        let name = head
        
        formData.append("file", this.imageToSave, `${name}`);

        await axios
          .post("/salvar", formData, {headers})
          .then((response) => {
            this.loading = false
            this.success = true
            this.url = undefined
            this.inputImage = ""
            this.responseImage = ""
            this.imageToSave = ""
            setTimeout(this.success = true, 3000)
            setTimeout(() => {
            this.success = false;
            }, 3000);


      
        })

      },

      async uploadImage() {
        this.loading = true
        const headers = {
          'Accept': 'image/jpeg',
          'Content-Type': 'multipart/form-data'
      };
      var formData = new FormData();
      formData.append("file", this.inputImage);
      await axios
        .post("/upload", formData, {headers})
        .then((response) => {
         
          var base64String = response.data;



          // Step 1: Decode the Base64 string
          var decodedData = atob(base64String);
          this.imageToSave = decodedData

          // Step 2: Create a Blob from the decoded data
          var arrayBuffer = new ArrayBuffer(decodedData.length);
          var uint8Array = new Uint8Array(arrayBuffer);
          for (var i = 0; i < decodedData.length; i++) {
            uint8Array[i] = decodedData.charCodeAt(i);
          }
          var blob = new Blob([uint8Array], { type: 'image/png' });
          this.loading = false
          this.imageToSave = blob

          // Step 3: Create a URL for the Blob
          this.responseImage = URL.createObjectURL(blob);
          this.responseImageShow = true


        




        })
      },
    },
  }
</script>
<style>
  .Treatment {
    background-color: #f3f3f5;
  }
</style>
