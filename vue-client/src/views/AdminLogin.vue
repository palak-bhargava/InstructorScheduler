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
        <h2>Welcome, Administrator!</h2> <br>
    
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
              @click="adminLogin"
            >
              LOGIN
            </v-btn>
          </div> 
          <div class="text-center">
            <v-btn
              text
              color="black"
              @click="goToLoginPage">
            Login as instructor?
            </v-btn>
          </div>
          <div v-if="error" class="error-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ error }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
  import axios from "axios"  
  import bcryptjs from 'bcryptjs';

  export default {
    data() {
      return {
        email: '',
        password: '',
        show: false,
        loginSuccess: false,
        post: null,
        error: null,
      };
    },
  
    methods: {
      goToLoginPage() {
        this.$router.push({ name: 'Login' });
      },
      async getAdminEmail(email, password) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(`http://localhost:3000/users/email/${email}`);
          
          if (response.data && response.data.length > 0) {
            const hashedPassword = response.data[0].password;
            const type = response.data[0].type;

            if (type === "admin") {
              bcryptjs.compare(password, hashedPassword).then(result => {
                if (result) {
                  console.log("SUCCESS");
                  resolve(response.data[0].name);
                } else {
                  console.log("FAILURE");
                  resolve(false); // Return false if password doesn't match
                }
              });
            } else {
              console.log("FAILURE");
              reject("Must be an admin to log in.");
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

    async adminLogin() {
      try {
        let email = this.email?.trim();
        let password = this.password?.trim();

        const instructorName = await this.getAdminEmail(email, password);

          if (instructorName) {
            localStorage.setItem('instructorName', instructorName); // Corrected line
            console.log("LOCAL STORAGE:", localStorage.getItem("instructorName"));
            console.log("instructorName: ", instructorName)
            this.$router.push({ name: 'AdminView', params: { instructorName } });
          }
          // If instructorName is not retrieved, set the error message
          if (!instructorName) {
            this.error = 'Incorrect email or password. Please try again.';
          }
        } catch (error) {
          console.error('Error:', error);
          this.error = 'Incorrect email or password. Please try again.';
        }
    }
  }
};
</script>