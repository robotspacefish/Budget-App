import React from 'react';
import Header from './Header';
import Expenses from './Expenses';

export default class BudgetApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleDeleteExpense = this.handleDeleteExpense.bind(this);
    this.handleAddBudget = this.handleAddBudget.bind(this);
    this.handleAdjustBudget = this.handleAdjustBudget.bind(this);
    this.handleResetBudget = this.handleResetBudget.bind(this);
    this.handleClearAllExpenses = this.handleClearAllExpenses.bind(this);
    this.state = {
      totalExpenses: 0,
      expenseList: [],
      totalBudget: undefined,
    };
  }
  // lifecycle hooks ==========================================
  componentDidMount() {
    console.log('componentDidMount');
    try {
      const json = localStorage.getItem('expenseList');
      const expenseList = JSON.parse(json);
      const stringBudget = localStorage.getItem('totalBudget')
      const totalBudget = parseInt(stringBudget);
      const stringTotalExpenses = localStorage.getItem('totalExpenses');
      const totalExpenses = parseInt(stringTotalExpenses);
      if (expenseList) {
        this.setState(() => ({ expenseList }));
      }
      if (totalBudget) {
        this.setState(() => ({ totalBudget }));
      }
      if (totalExpenses) {
        this.setState(() => ({ totalExpenses }));
      }
    } catch (e) {
      // Do nothing
      console.log(e);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    if (prevState.expenseList.length !== this.state.expenseList.length) {
      const json = JSON.stringify(this.state.expenseList);
      localStorage.setItem('expenseList', json);
    }
    if (prevState.totalBudget !== this.state.totalBudget) {
      localStorage.setItem('totalBudget', this.state.totalBudget);
    }
    if (prevState.totalExpenses !== this.state.totalExpenses) {
      localStorage.setItem('totalExpenses', this.state.totalExpenses);
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  // handleAddExpense ========================================
  handleAddExpense(expense) {
    console.log(expense)
    const filteredList = this.state.expenseList.filter((exp) => expense.name === exp.name && expense.cost === exp.cost);

    if (!expense.name || !expense.cost) {
      return 'Expense name and cost needed.';
    } else if (filteredList.length > 0) {
      return 'This expense already exists.'
    }
    this.setState((prevState) => ({
      expenseList: prevState.expenseList.concat(expense),
      totalBudget: (parseInt(this.state.totalBudget) || 0) - parseInt(expense.cost),
      totalExpenses: parseInt(this.state.totalExpenses) + parseInt(expense.cost)
    }));

  }
  // handleClearAllExpenses =====================================
  handleClearAllExpenses() {
    console.log('clearing expense list');
    localStorage.removeItem('expenseList');
    this.setState(() => ({ totalExpenses: 0, expenseList: [] }));
  }
  // handleDeleteExpense =====================================
  handleDeleteExpense(expenseToRemove) {
    this.setState(prevState => ({
      expenseList: prevState.expenseList.filter(expense => {
        return expenseToRemove.name !== expense.name && expenseToRemove.cost !== expense.cost
      }),
      totalBudget: parseInt(prevState.totalBudget) + parseInt(expenseToRemove.cost),
      totalExpenses: parseInt(prevState.totalExpenses) - parseInt(expenseToRemove.cost)
    }));
  }
  // handleResetBudget =======================================
  handleResetBudget() {
    console.log('resetting...');
    localStorage.removeItem('totalBudget');
    this.setState(() => ({ totalBudget: undefined }));
  }
  // handleAddBudget =========================================
  handleAddBudget(budget) {
    if (!budget) {
      return 'Enter a budget of at least $1';
    }
    if (parseInt(budget) > 0) {
      this.setState(() => ({ totalBudget: budget }));
    }
  }
  // handleAddBudget =========================================
  handleAdjustBudget(amount) {
    if (!amount) {
      return 'Enter the amount you wish to add or subtract from your current budget';
    }
    this.setState(() => {
      return {
        totalBudget: parseInt(this.state.totalBudget) + parseInt(amount)
      }
    });
  }
  // render ==================================================
  render() {
    return (
      <div className="container-fluid">
        <Header
          totalBudget={this.state.totalBudget}
          totalExpenses={this.state.totalExpenses}
          handleAddBudget={this.handleAddBudget}
          handleAdjustBudget={this.handleAdjustBudget}
          handleAddExpense={this.handleAddExpense}
          handleResetBudget={this.handleResetBudget}
        />
        <Expenses
          expenseList={this.state.expenseList}
          handleDeleteExpense={this.handleDeleteExpense}
          handleEditExpenseModal={this.handleEditExpenseModal}
          handleClearAllExpenses={this.handleClearAllExpenses}
        />
      </div>
    );
  }
}