import React from 'react';
import web3 from './web3';
import lottery from './lottery';
import './App.css';

class App extends React.Component {
  state = { // replaces constructor(props) {super(props); this.state={...}}
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: '',
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...'});


    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether'),
    });

    this.setState({ message: 'You have been entered!'});
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...'})
    await lottery.methods.selectWinner().send({
      from: accounts[0]
    });
    this.setState({ message: 'A winner has been picked!' });
    // to find out the actual winner, you would want to set a variable in Lottery.sol that is something like "lastWinner" and change it on execution of selectWinner()
  }

  render() {
    return (
      <div className="App">
        <h2>Lottery Contract</h2>
        <p>This lottery contract is managed by {this.state.manager}</p>
        <p>There are currently {this.state.players.length} players entered to win Ξ{web3.utils.fromWei(this.state.balance, 'ether')} </p>
      
        <form onSubmit={this.onSubmit}>
          <h4>enter into the lottery</h4>
          <div>
            <label>how much do you want to enter?</label>
            <input
              value={this.state.value}
              onChange={e => this.setState({value: e.target.value})}
            />
            <button type="submit">Enter</button>
          </div>
        </form>


        <button onClick={this.onClick}>Pick a winner</button>

        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
