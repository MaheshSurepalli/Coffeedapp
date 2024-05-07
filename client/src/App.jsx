import { useState, useEffect } from 'react'
import coffee from "./assets/coffee_with_crypto.jpg";
import { ethers } from "ethers"
import Buy from './components/Buy';
import Memos from './components/Memos';
import abi from "./contractJson/Chai.json"
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import './App.css'


function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })

  const [account, setAccount] = useState("Not connected");

  const handleTransactionSuccess = async () => {
      // Clear form fields (assuming element IDs)
      document.querySelector("#name").value = "";
      document.querySelector("#message").value = "";
  };

  useEffect(() => {
    const template = async () => {

      const contractAddres = "0x5DC19531A333CdB704F960F4bEcE715071562077";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        })
        setAccount(account);
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner(); //write the blockchain

        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        )
        setState({ provider, signer, contract });
      }
      catch (error) {
        console.log(error);
      }
    }

    template();
  }, []);

  return (
    <div className="app">
      <Image src={coffee} alt='..' className="app-header" fluid />
      <p className="app-account">
        <small>Connected account - {account}</small>
      </p>
      <Buy state={state} onTransactionSuccess={handleTransactionSuccess} />
      <Memos state={state} />
    </div>
  );

}

export default App
