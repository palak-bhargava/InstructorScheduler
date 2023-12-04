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
        <h2>Welcome, Instructor!</h2> <br>
    
          <v-text-field
            label="UTD email"
            prepend-inner-icon="mdi-account"
            filled
            rounded
            dense
            v-model="email"
          ></v-text-field>
  
          <v-text-field
            label="Password"
            prepend-inner-icon="mdi-lock"
            v-model="password"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            @click:append="show = !show"
            filled
            rounded
            dense
          ></v-text-field>
          
          <div class="text-center">
            <v-btn
              rounded
              color="#5C9970"
              dark
              @click="userLogin"
            >
              LOGIN
            </v-btn>
          </div>
          <div class="text-center">
            
            <v-btn
              text
              color="black"
              @click="goToAdminLogin">
            Login as admin?
          </v-btn>
        
        </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import axios from "axios"
  export default {
  data() {
    return {
      email: '',
      password: '',
      show: false,
      loginSuccess: false
    };
  },
  
  methods: {
    goToAdminLogin() {
      this.$router.push({ name: 'AdminLogin' });
    },
    async getUserEmail(email, password) {
      return new Promise(async (resolve, reject) => {
        const bcryptjs = require('bcryptjs');
        try {
          const response = await axios.get(`http://localhost:3000/users/email/${email}`);
          
          // Check if response.data[0] is defined
          if (response.data && response.data.length > 0) {
            const hashedPassword = response.data[0].password;
            const type = response.data[0].type;

            if (type === "instructor") {
              bcryptjs.compare(password, hashedPassword).then(result => {
                if (result) {
                  console.log("SUCCESS");
                  resolve(true);
                } else {
                  console.log("FAILURE");
                  resolve(false); // Return false if password doesn't match
                }
              });
            } else {
              console.log("FAILURE");
              reject("Must be an instructor to log in.");
            }
          } else {
            console.log("FAILURE");
            reject("User not found");
          }
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
    },

    async userLogin() {
      try {
        let email = this.email?.trim();
        let password = this.password?.trim();

        // Assuming getUserEmail returns a promise
        const loginSuccess = await this.getUserEmail(email, password);
        console.log('Response:', loginSuccess);
        if (loginSuccess) {
          this.$router.push({ name: 'Dashboard' });
        }
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
      
    }
  }
};
</script>