import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors()); // allows backend to respond to calls coming from diff ports (frontend and backend are on diff ports for example)
 
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 9);
};

const addUser = (user) => {
  const newUser = {
    ...user, 
    id: generateRandomId()
  };
  users["users_list"].push(newUser);
  return newUser;
};

app.get("/", (req, res) => {
  res.send("Hello World!");
}); 

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  let filteredUsers = users.users_list;

  if (name) {
    filteredUsers = filteredUsers.filter(user => user.name === name);
  }
  
  if (job) {
    filteredUsers = filteredUsers.filter(user => user.job === job);
  }
  
  res.send({ users_list: filteredUsers }); 
});

// const addUser = (user) => {
//  users["users_list"].push(user);
//  return user;
// };

const deleteUserById = (id) => {
  const userIndex = users.users_list.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return false; // user not found
  }
  users.users_list.splice(userIndex, 1); // remove user
  return true; // user deleted
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const addedUser = addUser(userToAdd);
  res.status(201).json(addedUser); // 201 and return successfully created object
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const wasDeleted = deleteUserById(id);
    
  if (!wasDeleted) {
    res.status(404).send("user not found.");
  } else {
    res.status(204).send(); // SUCCESS - no content
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const addedUser = addUser(userToAdd);
  res.status(201).json(addedUser); // send back user with new ID
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

