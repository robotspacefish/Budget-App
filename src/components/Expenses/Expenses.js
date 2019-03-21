import React from 'react';
import Expense from '../Expense/Expense';
import './Expenses.css';

const Expenses = (props) => {
  return (
    <section id="expenses" className="container">
      <h2 className=" text-center text-muted">Expenses</h2>
      {props.expenseList.length > 0 &&
        <button className="clear-all-expenses-btn btn btn-danger" onClick={(e) => {
          props.handleClearAllExpenses();
        }}>Clear All Expenses</button>
      }
      {
        props.expenseList.length > 0 ? <table id="expenses-table" className="table table-striped table-bordered table-hover">
          <tbody>
            {
              props.expenseList.map((expense) => (
                <Expense
                  key={expense.name}
                  expenseName={expense.name}
                  expenseCost={expense.cost}
                  handleDeleteExpense={props.handleDeleteExpense}
                />
              ))
            }
          </tbody>
        </table>
          : <p id="empty-expense-list-msg" className="text-center">No expenses to show.</p>
      }
    </section>
  );
};

export default Expenses;