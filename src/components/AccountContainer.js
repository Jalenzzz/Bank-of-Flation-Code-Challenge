import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  // State to hold the list of transactions
  const [transactions, setTransactions] = useState([]);
  // Function to fetch transactions from the server
  const getTransactions = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:8001/transactions", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setTransactions(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      <Search
        transactions={transactions}
        setTransactions={setTransactions}
        getTransactions={getTransactions}
      />
      <AddTransactionForm
        transactions={transactions}
        setTransactions={setTransactions}
        getTransactions={getTransactions}
      />
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default AccountContainer;
