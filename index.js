import express from "express";

const app = express();
const port = 8080;

// Server
app.listen(port, () => {
  console.log(`Server Is Connected by PORT,${port}`);
});

//Middleware
//for parse the json data this is middleware
app.use(express.json());

app.use((req,res,next)=>{
  console.log(`${req.method}${req.url}`);
  next();
});

//Validate middleware
const validateUser = (req,res,next)=>{
  const {firstName,lastName,hobby} = req.body;

  if(!firstName||!lastName||!hobby){
    return res.status(400).json({message: "firstName,lastName,hobby must be required"})
  }
  next();
}

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
  res.status(200).send("Hello from server.");
});
//Fetching user data
app.get("/users", (req, res) => {
  res.status(200).json(users);
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
app.post("/user", validateUser, (req, res) => {
  const { firstName, lastName, hobby } = req.body;

  const newUser = {
    id: Math.floor(Math.random()*10).toString(),
    firstName: firstName,
    lastName: lastName,
    hobby: hobby,
  };

  users.push(newUser);
  res.status(201).json(users);
});

//Update User or any data
app.put("/user/:id",validateUser, (req, res) => {
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

  res.status(200).json(users);
});

// Deleting any user by its id.
app.delete("/user/:id", (req, res) => {
  const index = users.findIndex(user => user.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "User Not Found" });
  }

  users.splice(index, 1);
  res.status(200).json({ message: "User deleted successfully" });
});

