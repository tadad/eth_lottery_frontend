import Web3 from 'web3';

let web3;

if (typeof window.ethereum !== undefined) {
  web3 = new Web3(window.ethereum);

  // there is some other code that goes right here but idk what it is so I'm going to leave it out for now...

  window.ethereum
    .enable()
    .then(_accounts => {})
    .catch(error => {
      console.error(error);
      alert("Sorry, this application requires user approval to function correctly.");
    })
} else {
  web3 = new Web3(window.web3.currentProvider);
}

export default web3;