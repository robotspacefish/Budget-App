import React from 'react';
import './Expense.css';

const Expense = (props) => {
  return (
    <tr>
      <td className="expense-name">{props.expenseName}</td>
      <td className="expense-cost">${props.expenseCost}</td>
      <td className="expense-remove-btn">
        <button className="btn btn-danger" onClick={(e) => {
          props.handleDeleteExpense({ name: props.expenseName, cost: props.expenseCost })
        }}>Remove and put $ back</button>
      </td>
      <td className="expense-remove-btn">
        <button className="btn btn-danger" onClick={(e) => {
          props.handleCompleteExpense({ name: props.expenseName, cost: props.expenseCost })
        }}>Remove</button>
      </td>
    </tr>
  );
};

export default Expense;