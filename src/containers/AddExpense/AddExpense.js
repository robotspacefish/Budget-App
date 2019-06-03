import React from 'react';
import './AddExpense.css';

export default class AddExpense extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddExpense = this.handleAddExpense.bind(this)
    this.state = {
      error: undefined
    };
  }
  handleAddExpense(e) {
    e.preventDefault();
    const name = e.target.elements.name.value.trim();
    const cost = e.target.elements.cost.value;
    const error = this.props.handleAddExpense({ name, cost });
    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.name.value = ''
      e.target.elements.cost.value = ''
    }
  }
  render() {
    return (
      <div className="add-expense">
        <form onSubmit={this.handleAddExpense}>
          <label>Add an Expense</label>
          <input type="text" name="name" placeholder="Expense Name" maxLength="30" />
          <input className="cost-input" type="number" name="cost" min="1" placeholder="$" />
          <button className="btn btn-dark">Submit</button>
        </form>
        {this.state.error && <p class="error-msg text-center">{this.state.error}</p>}
      </div>
    );
  }
}