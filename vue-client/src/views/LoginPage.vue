<template>
  <v-container>
    <v-app-bar
        app
        color="#ffffff"
        elevation=1
      >
        <div class="d-flex align-center">
          <v-img
            class="shrink mr-2"
            contain
            :src="require('../assets/IS-logo.png')"
            transition="scale-transition"
            width="40"
          />
          <h2>Instructor Scheduler</h2>
        </div>
        <v-spacer></v-spacer>
      </v-app-bar>

    <v-row >
    <v-row><br><br></v-row>
      <v-col
        cols="5"
        md="5"
        class="ml-md-auto"
        align=left
      >
      <br><br><br><br><br>
        <v-card
          class="pa-2"
          elevation=0
          align="left"
        >
          <v-img
           :src="require('../assets/utd-logo.png')"
           class="my-3"
           contain
           height="350"
         />
        </v-card>
      </v-col>

      <v-col
        cols="1"
        md="1"
        class="ml-md-auto"
        align=left
      >

      <br><br><br><br><br>
        <v-card
        >
        </v-card>
      </v-col>
      
      <v-col
        cols="12"
        sm="6"
        md="6"
      >
      <br><br><br><br><br><br>
        <v-card
          class="pa-10 rounded-xl"
          elevation="2"
          outlined
          
        >
        <h2>Welcome!</h2> <br>
    
          <v-text-field
            label="UTD email"
            prepend-inner-icon="mdi-account"
            filled
            rounded
            dense
          ></v-text-field>

          <v-text-field
            label="Password"
            prepend-inner-icon="mdi-lock"
            v-model="password"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            @click:append="show1 = !show1"
            filled
            rounded
            dense
          ></v-text-field>
          
          <div class="text-center">
            <v-btn
              rounded
              color="#5C9970"
              dark
            >
              LOGIN
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'LoginPage',

    data: () => ({
      
    }),
  }
</script>
