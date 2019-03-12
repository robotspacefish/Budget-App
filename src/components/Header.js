import React from 'react';
import EnterBudget from './EnterBudget';
import AdjustBudget from './AdjustBudget';
import AddExpense from './AddExpense';

const Header = (props) => {
  // make budget text red if budget is negative
  const danger = props.totalBudget < 0 ? "danger" : ""
  return (
    <header>
      <div className="container">
        <div className="header-left">
          {
            (!props.totalBudget) ?
              <EnterBudget
                handleAddBudget={props.handleAddBudget}
                totalBudget={props.totalBudget}
              />
              :
              <AdjustBudget
                handleAdjustBudget={props.handleAdjustBudget}
              />
          }
          <AddExpense
            handleAddExpense={props.handleAddExpense}
          />
        </div>
        <div className="header-right">
          <div className="budget-display">
            <h1>Budget: $<span className={danger}>{props.totalBudget || "0"}</span></h1>
            {
              props.totalBudget !== undefined && <button className="btn btn-danger reset-budget-btn" onClick={(e => {
                props.handleResetBudget();
              })} >Clear Budget</button>
            }
          </div>
          <h2>Total Expenses: ${props.totalExpenses}</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;