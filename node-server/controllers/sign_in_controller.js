const axios = require('axios');
const bcryptjs = require('bcryptjs');

function getUserEmail(email, password) {
  return new Promise((resolve, reject) => {
    email = email?.trim();
    password = password?.trim();

    axios.get(`http://localhost:3000/users/email/${email}`)
      .then(response => {
        const hashedPassword = response.data[0].password;
        
        bcryptjs.compare(password, hashedPassword).then(result => {
          if (result) {
            console.log("SUCCESS");
            resolve("Success");
          } else {
            console.log("FAILURE");
            reject("Failure");
          }
        });
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

module.exports = getUserEmail;
