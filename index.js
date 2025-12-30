import express from "express";

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`Server Is Connected by PORT,${port}`);
});
//for passing the json data this is middleware
app.use(express.json());

// Data Source //
const users = [
  {
    id: "1",
    firstName: "Anshika",
    lastName: "Agarwal",
    hobby: "Teaching",
  },
  {
    id: "2",
    firstName: "Mohammed",
    lastName: "Tosif",
    hobby: "Coding",
  },
  {
    id: "3",
    firstName: "Munnawwar",
    lastName: "Khan",
    hobby: "Gaming",
  },
  {
    id: "4",
    firstName: "Bilal",
    lastName: "Khan",
    hobby: "Designer",
  },
];

// Routes //
app.get("/", (req, res) => {
  res.send("Hello from server.");
});
//Fetching user data
app.get("/users", (req, res) => {
  res.send(users);
});

//Fetching details of a specific user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

//Add New User
app.post("/user", (req, res) => {
  const { firstName, lastName, hobby } = req.body;

  const newUser = {
    id: Math.floor(Math.random() * 10), //math.floor use for remove decimals.
    firstName: firstName,
    lastName: lastName,
    hobby: hobby,
  };

  users.push(newUser);
  res.send(users);
});

//Update User or any data
app.put("/user/:id", (req, res) => {
  const userId = req.params.id;

  const user = users.find((user) => user.id == userId);
  //Error Handling
  if (!user) {
    return res
    .status(404)
    .json({ message: "User id does not exist." });
  }
  const keys = Object.keys(req.body);

  keys.forEach((key)=>{
    user[key] = req.body[key]; //updating the keys
  });

  res.send(users)
});

// Deleting any user by its id.
app.delete("/user/:id",(req,res)=>{
    const userId = req.params.id;

    const user = users.find((user=>user.id == userId));

    if(!user){
        return res.status(404).json({message: "User Not Found"});
    };
    const filterUser = users.filter((user)=>user.id != userId);

    res.send(filterUser);
})
