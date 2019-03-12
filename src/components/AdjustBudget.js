import React from 'react';

export default class AdjustBudget extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdjustBudget = this.handleAdjustBudget.bind(this);
    this.state = {
      error: undefined
    };
  }
  handleAdjustBudget(e) {
    e.preventDefault();
    const amount = e.target.elements.adjustment.value;
    const error = this.props.handleAdjustBudget(amount);
    this.setState(() => ({ error }));
    e.target.elements.adjustment.value = ''
  }
  render() {
    return (
      <div className="adjustBudget">
        <form onSubmit={this.handleAdjustBudget}>
          <label>Adjust Budget (+/-)</label>
          <input type="number" name="adjustment" placeholder="ex. 45 or -45" />
          <button className="btn btn-dark">Submit</button>
        </form>
        {this.state.error && <p class="error-msg text-center">{this.state.error}</p>}
      </div>
    );
  }
}