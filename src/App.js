import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

function Logo() {
  return <h1>🏝️ FAR AWAY 🧳</h1>;
}

/*  Controlled elements, in order to keep information within Reacts's SPA and not 
in the DOM (which is where a of the information from the from submission would be 
  headed otherwise then we need to take advantage of controlled elements, which we 
  can do in 3 steps: 
  first: create state elements)  
  second: use the state as a value of the input field (basically forcing the React 
    value)
  third: on the same elelement listen for the change event 
  
  Note: repeated the same steps in the select element, also used the Number 
  function to return a number instead of a string*/
function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* Very useful code for creating an empty array, which then takes 2
        arguements (the current value, and the index), followed by index plus 1 
        as the array is 0 indexed. After creating the empty array we then use 
        the map function to loop over the array to display it as a list*/}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item...."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <div>
      <li>
        {/* Used Ternary operator to set some styles */}
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.description}
          {item.quantity}
        </span>
        <button>❌</button>
      </li>
      {/* <li>{item.description}</li>
      <li>{item.description}</li>
      <li>{item.description}</li> */}
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (x%)</em>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
