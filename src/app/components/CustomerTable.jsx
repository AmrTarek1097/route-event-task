import React, { useState } from "react";

const CustomerTable = ({ customers, transactions, onCustomerSelect }) => {
  const [filter, setFilter] = useState({ name: "", amount: "" });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(filter.name.toLowerCase())
  );

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.amount.toString().includes(filter.amount)
  );

  const groupedTransactions = filteredCustomers?.map((customer) => {
    const customerTransactions = filteredTransactions.filter(
      (transaction) => transaction.customer_id == customer.id
    );
    return {
      customer,
      transactions: customerTransactions,
    };
  });

  return (
    <>
      <div className="flex m-4 justify-center gap-8">
        <div className="">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Filter by name
          </label>
          <input
            className="h-8 mt-1 border outline-none focus:ring-2 focus:ring-[#fc9003] focus:border-[#fc9003] block w-full sm:text-sm border-[#fc9003] rounded-md pl-3 pr-10 transition duration-300 ease-in-out transform focus:scale-x-100"
            placeholder="Enter name"
            name="name"
            id="name"
            value={filter.name}
            onChange={handleFilterChange}
          />
        </div>
        <div className="">
          <label className="block text-sm font-medium" htmlFor="amount">
            Filter by amount
          </label>
          <input
            className="h-8 mt-1 border outline-none focus:ring-2 focus:ring-[#fc9003] focus:border-[#fc9003] block w-full sm:text-sm border-[#fc9003] rounded-md pl-3 pr-10 transition duration-300 ease-in-out transform focus:scale-x-100"
            placeholder="Enter amount"
            name="amount"
            id="amount"
            value={filter.amount}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="w-full rounded-lg shadow-slate-400 shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-[#fc9003]">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <span className="font-bold">Customer Name</span>
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <span className="font-bold">Date</span>
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <span className="font-bold">Amount</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {groupedTransactions?.map(({ customer, transactions }) => (
              <React.Fragment key={customer.id}>
                <tr className="px-6 py-4 whitespace-nowrap">
                  {/* <th scope="row">{customer.id}</th> */}
                  {transactions.length > 0 ? (
                    <>
                      <td
                        className="px-6 py-4 whitespace-nowrap hover:bg-gray-200"
                        rowSpan={transactions.length || 1}
                        onClick={() => onCustomerSelect(customer)}
                        style={{ cursor: "pointer" }}
                      >
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transactions[0].date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transactions[0].amount}
                      </td>
                    </>
                  ) : (
                    // <td colSpan="2">No transactions</td>
                    ""
                  )}
                </tr>
                {transactions.slice(1).map((transaction) => (
                  <tr
                    className="px-6 py-4 whitespace-nowrap"
                    key={transaction.id}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 ">{transaction.amount}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomerTable;
