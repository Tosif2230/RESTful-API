import express from "express";

const app = express();
const port = 8080;

app.listen(port,()=>{
    console.log(`Server Is Connected by PORT,${port}`)
})
//for passing the json data this is middleware
app.use(express.json());

// Data Source //
const users = [
    {
        "id" : "1",
        "firstName": "Anshika",
        "lastName": "Agarwal",
        "hobby": "Teaching"
    },
     {
        "id" : "2",
        "firstName": "Mohammed",
        "lastName": "Tosif",
        "hobby": "Coding"
    },
     {
        "id" : "3",
        "firstName": "Munnawwar",
        "lastName": "Khan",
        "hobby": "Gaming"
    },
     {
        "id" : "4",
        "firstName": "Bilal",
        "lastName": "Khan",
        "hobby": "Designer"
    }
]

// Routes //
app.get("/",(req,res)=>{
    res.send("Hello")
})
//Fetching user data
app.get("/users",(req,res)=>{
    res.send(users)
})


//Add New User
app.post("/user",(req,res)=>{
    const {firstName,lastName,hobby} = req.body;
    
    const newUser = {
        id: Math.floor(Math.random()*10),//math.floor use for remove decimals.
        firstName:firstName,
        lastName:lastName,
        hobby:hobby
    };

    users.push(newUser);
    res.send(users)
})

