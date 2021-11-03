import React, { Component, useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import { Provider, useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import store from "./redux/store";

export const StyledButton = styled.button`
font-family: Lato;
	font-size: 1.6rem;
	outline: none;
	background: #172d42;
	color: #fff;
	border-radius: 5px;
	border: none;
  padding: 1px 20px;
	 border-radius: 8px;
	// background-color: #8ef4d6;


`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledImg = styled.img`
  width: 200px;
  height: 200px;
  @media (min-width: 767px) {
    width: 350px;
    height: 350px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

const e = React.createElement;


const ConnectButton = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  // const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);

  
  const withdraw = () => {
    console.log(blockchain.smartContract.methods)

    blockchain.smartContract.methods
      .withdraw()
      .send({
        gasLimit: "285000",
        to: "0x6666a1F91f76BE55A9D41c1f0515981f09a4536C",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((0).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a Nerdy Coder Clone. go visit Opensea.io to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };
  const Disconnect = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

 

    return (
      <s.Container
      flex={1}
      jc={"center"}
      ai={"center"}
    >
             <>

          {blockchain.account === "" ||
          blockchain.smartContract === null ? (
            <s.Container ai={"center"} jc={"center"}>
              <s.SpacerSmall />
              <StyledButton
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(connect());
                  getData();
                }}
                
              >
                Disconnected
              </StyledButton>
              {blockchain.errorMsg !== "" ? (
                <>
                  <s.SpacerSmall />
                  <s.TextDescription style={{ textAlign: "center" }}>
                    {blockchain.errorMsg}
                  </s.TextDescription>
                </>
              ) : null}
            </s.Container>
          ) : (
            <s.Container ai={"center"} jc={"center"}>
            <s.SpacerSmall />
            <StyledButton
              onClick={(e) => {
                e.preventDefault();
                // claimNFTs(1);
                withdraw();
                getData();
              }}
              
            >
              Connected
            </StyledButton>
            {blockchain.errorMsg == "" ? (
              <>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  {blockchain.errorMsg}
                </s.TextDescription>
              </>
            ) : null}
          </s.Container>
           
          )}
        </>

    </s.Container>

    )

  
}
const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(<Provider store={store}>
<ConnectButton/>
</Provider>, domContainer);

const MintButton = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  // const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);

  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your Nerdy Coder Clone...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        gasLimit: "285000",
        to: "0x6666a1F91f76BE55A9D41c1f0515981f09a4536C",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((1 * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a Nerdy Coder Clone. go visit Opensea.io to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };
  

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };
  const Disconnect = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

 

    return (
      <s.Container
      flex={1}
      jc={"center"}
      ai={"center"}
    >
             <>

          {blockchain.account === "" ||
          blockchain.smartContract === null ? (
            <s.Container ai={"center"} jc={"center"}>
              <s.SpacerSmall />
              <StyledButton
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(connect());
                  getData();
                }}
                
              >
                Disconnected
              </StyledButton>
              
            </s.Container>
          ) : (
            <s.Container ai={"center"} jc={"center"}>
            <s.SpacerSmall />
            <StyledButton
              onClick={(e) => {
                e.preventDefault();
                claimNFTs(1);
                //withdraw();
                getData();
              }}
              
            >
              Mint 1 for 0.1 ETH
            </StyledButton>
            {blockchain.errorMsg == "" ? (
              <>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  {blockchain.errorMsg}
                </s.TextDescription>
              </>
            ) : null}
          </s.Container>
           
          )}
        </>

    </s.Container>

    )

  
}

const dom = document.querySelector('#mint_button_container');
ReactDOM.render(<Provider store={store}>
<MintButton/>
</Provider>, dom);

const WithdrawButton = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  // const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);

  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your Nerdy Coder Clone...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .tokenURI(blockchain.account)
      .send({
        gasLimit: "285000",
        to: "0x6666a1F91f76BE55A9D41c1f0515981f09a4536C",
        from: blockchain.account,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a Nerdy Coder Clone. go visit Opensea.io to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };
  

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };
  const Disconnect = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

 

    return (
      <s.Container
      flex={1}
      jc={"center"}
      ai={"center"}
    >
             <>

          {blockchain.account === "" ||
          blockchain.smartContract === null ? (
            <s.Container ai={"center"} jc={"center"}>
              <s.SpacerSmall />
              <StyledButton
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(connect());
                  getData();
                }}
                
              >
                Disconnected
              </StyledButton>
              
            </s.Container>
          ) : (
            <s.Container ai={"center"} jc={"center"}>
            <s.SpacerSmall />
            
            {blockchain.account == "0x6666a1f91f76be55a9d41c1f0515981f09a4536c" ? (
              <>
                <StyledButton
              onClick={(e) => {
                e.preventDefault();

                blockchain.smartContract.methods.owner()

               // claimNFTs(1);
                //withdraw();
                getData();
              }}
              
            >
              Mint 1 for 0.1 ETH
            </StyledButton>
              </>
            ) : null}
          </s.Container>
           
          )}
        </>

    </s.Container>

    )

  
}

const dom1 = document.querySelector('#withdraw_button_container');
ReactDOM.render(<Provider store={store}>
<WithdrawButton/>
</Provider>, dom1);

function App (){
const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  console.log(blockchain.account)
  useEffect(() => {
    dispatch(connect())

  }, []);

  return (
    <div>

    </div>

  )
 

  
}

export default App;
