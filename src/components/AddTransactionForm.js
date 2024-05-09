import React, { useState } from "react";

// Functional component for adding transactions
function AddTransactionForm(props) {
  // Destructuring props to extract necessary variables and functions
  const { transactions, setTransactions, getTransactions } = props;

  // State variables for form fields
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  // Function to handle form submission for local data update
  function submit1() {
    // Check for empty fields
    if (date === "" || category === "" || amount === "") {
      return;
    }

    // Create new transaction data
    const data = {
      id: Date.now(),
      date,
      description,
      category,
      amount,
    };

    // Update transactions array
    let newArr = [...transactions];
    newArr.push(data);
    console.log(newArr);
    setTransactions(newArr);

    // Clear form fields
    setDate("");
    setDescription("");
    setCategory("");
    setAmount("");
  }

  // Function to handle form submission for API call
  function submit() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Create transaction data object
    const data = {
      id: Date.now(),
      date,
      description,
      category,
      amount,
    };

    const raw = JSON.stringify({
      date,
      description,
      category,
      amount,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8001/transactions", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setDate("");
        setDescription("");
        setCategory("");
        setAmount("");
        getTransactions();
      })
      .catch((error) => console.error(error));
  }

  // Render the form component
  return (
    <div className="ui segment">
      <div className="ui form">
        <div className="inline fields">
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button className="ui button" type="submit" onClick={submit}>
          Add Transaction
        </button>
      </div>
    </div>
  );
}

export default AddTransactionForm;
