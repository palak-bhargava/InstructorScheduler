const axios = require('axios');
const bcrypt = require('bcrypt')

function getUserEmail(email, password){
    email = email?.trim();
    password = password?.trim();
    axios.get(`http://localhost:3000/users/email/${email}`)
        .then(function (response) {
            const hashedPassword = response.data[0].password;
            bcrypt.compare(password, hashedPassword). then(result => {
                if (result){
                    console.log("SUCCESS");
                }
                else{
                    console.log("FAILURE");
                }
            })
    })
        .catch(function (error) {
            console.log(error);
  });
}
module.exports = getUserEmail;
