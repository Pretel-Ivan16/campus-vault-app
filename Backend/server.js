require("dotenv").config()

const app = require('./src/app');
const db = require('./src/config/db')

const PORT = process.env.PORT || 3000;

db.getConnection()
  .then(() =>{
    console.log("MySQL connected")

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    });
  })

  .catch((err) =>{
    console.log("Database connection error: ",err)
  })
