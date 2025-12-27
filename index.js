import express from "express";

const app = new express();
const port = 3000;

app.listen(port,()=>{
    console.log(`Server Is Connected by PORT,${port}`)
})