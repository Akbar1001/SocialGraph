const app=require("./app")
const mongoose=require("mongoose");
const dotenv= require("dotenv");
const connectDB=require("./config/database");

dotenv.config();

const PORT=process.env.PORT || 5000;
connectDB(); 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

