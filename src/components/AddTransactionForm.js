import React, { useState } from "react";

function AddTransactionForm(props) {
  const { transactions, setTransactions } = props;
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  function submitK() {
    //Kienyeji
    //Better way
    //date validation

    if (date === "" || category === "" || amount === "") {
      return;
    }

    const data = {
      id: Date.now(),
      date,
      description,
      category,
      amount,
    };
    let newArr = [...transactions];
    newArr.push(data);
    console.log(newArr);
    setTransactions(newArr);
  }
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
        <button className="ui button" type="submit" onClick={submitK}>
          Add Transaction
        </button>
      </div>
    </div>
  );
}

export default AddTransactionForm;
