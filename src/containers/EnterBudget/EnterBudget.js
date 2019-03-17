import React from 'react';

export default class EnterBudget extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddBudget = this.handleAddBudget.bind(this)
    this.state = {
      error: undefined
    }
  }
  handleAddBudget(e) {
    e.preventDefault();
    const budget = e.target.elements.budget.value
    const error = this.props.handleAddBudget(budget);
    this.setState(() => ({ error }));
    e.target.elements.budget.value = ''
  }
  render() {
    return (
      <div className="enter-budget">
        <form onSubmit={this.handleAddBudget}>
          <label>Enter Budget</label>
          <input className="budget-input" type="number" name="budget" min="1" placeholder="$" />
          <button className="btn btn-dark">Submit</button>
        </form>
        {this.state.error && <p class="error-msg text-center">{this.state.error}</p>}
      </div>
    );
  }
}