import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.status === 204) {
          const updated = characters.filter((user) => user._id !== id);
          setCharacters(updated);
        } else {
          console.error("Delete failed");
        }
      })
      .catch((error) => {
        console.error("Delete failed:", error);
      });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers() 
    	    .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
	    .catch((error) => { console.log(error); });
  }, [] );

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      }, 
      body: JSON.stringify(person), 
    });

    return promise;
  }
  
  function updateList(person) {
     postUser(person)
        .then(res => {
	  if (res.status === 201) {
	    return res.json(); // getting newly created ID
	  } else {
	    throw new Error("Failed to create user");
	  }
	})
	.then(newUser => {
	  setCharacters([...characters, newUser]); // now includes ID
	})
	.catch(error => {
	  console.log(error);
	});
   }


return (
  <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
    <Form handleSubmit={updateList} />
  </div>
  );
}

export default MyApp;

