"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerTable from "./components/CustomerTable";
import TransactionGraph from "./components/TransactionGraph";

export default function Page() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const getDataFromJson = async () => {
    const res = await axios.get(
      "https://amrtarek1097.github.io/users-transactions-api/db.json"
    );
    setCustomers(res.data.customers);
    setTransactions(res.data.transactions);
  };

  useEffect(() => {
    getDataFromJson();
  }, []);

  return (
    <div className=" m-6 gap-6 grid grid-cols-5 h-screen">
      <div className="col-span-3">
        <CustomerTable
          customers={customers}
          transactions={transactions}
          onCustomerSelect={setSelectedCustomer}
        />
      </div>
      <div className="col-span-2">
        <TransactionGraph
          customer={selectedCustomer}
          transactions={transactions.filter(
            (t) => t.customer_id == selectedCustomer?.id
          )}
        />
      </div>
    </div>
  );
}
