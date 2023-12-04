const axios = require('axios');
const bcryptjs = require('bcryptjs');

function getUserEmail(email, password) {
  console.log('inside getUserEmail')
  return new Promise((resolve, reject) => {
    email = email?.trim();
    password = password?.trim();

    axios.get(`http://localhost:3000/users/email/${email}`)
      .then(response => {
        const hashedPassword = response.data[0].password;
        
        const type = response.data[0].type;

        if (type === "Instructor") {
          bcryptjs.compare(password, hashedPassword).then(result => {
            if (result) {
              console.log("SUCCESS");
              resolve("Success");
            } else {
              console.log("FAILURE");
              reject("Failure");
            }
          });
        } else {
        console.log("FAILURE");
        reject("Must be instructor to log in.");
      }
    })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

module.exports = getUserEmail;

function getAdminEmail(email, password) {
  console.log('inside getAdminEmail')
  return new Promise((resolve, reject) => {
    email = email?.trim();
    password = password?.trim();

    axios.get(`http://localhost:3000/users/email/${email}`)
      .then(response => {
        const hashedPassword = response.data[0].password;

        const type = response.data[0].type;

        if(type == "admin"){
          bcryptjs.compare(password, hashedPassword).then(result => {
            if (result) {
              console.log("SUCCESS");
              resolve("Success");
            } else {
              console.log("FAILURE");
              reject("Failure");
            }
          });
        }
        else{
          console.log("FAILURE");
          reject("Must be admin to log in.");
        }  
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

module.exports = getAdminEmail;
