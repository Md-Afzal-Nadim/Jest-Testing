import express from "express";


const app = express();

app.get("/", (req, res) => {
  res.json({
     message: "Hello World",
     status: 200
     });
})

app.get("/test", (req, res) => {
  res.json({
     message: "CI CD Pipeline Is Working",
     status: 200
     });

     
})


export default app