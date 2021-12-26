// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import SmartContract from "../../contracts/foranimals.json";
import PresaleContract from "../../contracts/presale.json";

// log
import { fetchData } from "../data/dataActions";
import fs from 'fs';


const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider('https://rinkeby.infura.io/v3/aa024e76b2f34f17805dc2320b395cd8');
      var web3 = new Web3('https://rinkeby.infura.io/v3/aa024e76b2f34f17805dc2320b395cd8');
      // 'https://rinkeby.infura.io/v3/aa024e76b2f34f17805dc2320b395cd8'
     // let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
        console.log(networkId);

        // const NetworkData = await SmartContract.networks[networkId];
        if (parseInt(networkId) == 4) {
          console.log(web3.givenProvider)
          Web3EthContract.setProvider(web3.givenProvider);
          var web3 = new Web3(web3.givenProvider);
          
          // const SmartContractObj = new Web3EthContract(
          //   SmartContract.abi,
          //   "0xd983B09B5233Ba78592EbC448B2a0C12A485E3F5"
          // );
          const PresaleContractObj = new Web3EthContract(
            PresaleContract.abi,
            "0x4A75962B3e51e09fe5D88D0EA23fB7C34f0D649e"
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: PresaleContractObj,
              web3: web3,
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to Etherium."));
        }
      } catch (err) {
        console.log(err)
        dispatch(connectFailed("Waiting for permission"));


      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};
export const removeAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
