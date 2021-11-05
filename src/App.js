import React, { Component, useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import { Provider, useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import store from "./redux/store";
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// import TextField from "../node_modules/material-ui/TextField";



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



const ConnectButton = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  // const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);

  


  const getData = () => {
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

          {blockchain.account === undefined || blockchain.account == null ? (
            <s.Container ai={"center"} jc={"center"}>
              <s.SpacerSmall />
              <StyledButton
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(connect());
                  if(blockchain.errorMsg == "Install Metamask."){
                    const tab = window.open('https://metamask.io/', '_blank');

                  }
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
                console.log(blockchain.account)
                blockchain.smartContract.methods.
                cost()
                  .call()
                  .then(function(result) {

                    console.log(result);
                })
                .catch(function(err) {
                    console.log(err);
                })
                // claimNFTs(1);
                //withdraw();
                getData();
              }}
              
            >
              Connected
            </StyledButton>
            <s.SpacerSmall />

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
    blockchain.smartContract.methods.cost()
    .call()
    .then(function(result) {
      console.log();

      blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        gasLimit: "285000",
        to: "0x6666a1F91f76BE55A9D41c1f0515981f09a4536C",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((blockchain.web3.utils.fromWei((result).toString(), "ether") * _amount).toString(), "ether"),
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
  })
    
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

          {blockchain.account === undefined ||
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
                Connect your wallet
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

const AdminPanel = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  // const data = useSelector((state) => state.data);
  const [NewUrl, setName] = useState("");
  const [NewPrice, setPrice] = useState();


  //var isOwner;

  const withdraw = () => {
    blockchain.smartContract.methods.
    withdraw()
      .send({
        gasLimit: "285000",
        to: "0x6666a1F91f76BE55A9D41c1f0515981f09a4536C",
        from: blockchain.account,
      }) 
      .once("error", (err) => {
      })
      .then((receipt) => {
        dispatch(fetchData(blockchain.account));
      });
  };
  const changeUrl = (newUrl) => {
    blockchain.smartContract.methods.
    setBaseURI(newUrl)
      .send({
        gasLimit: "285000",
        // to: "0x643afFdCC6Ff82611e180Cb96A83338Ec955C83a",
        from: blockchain.account,
      }) 
      .once("error", (err) => {
      })
      .then((receipt) => {
        dispatch(fetchData(blockchain.account));
      });
  };
  const changePrice = (newPrie) => {
    blockchain.smartContract.methods.
    setCost(blockchain.web3.utils.toWei((newPrie).toString(), "ether"))
      .send({
        gasLimit: "285000",
        // to: "0x643afFdCC6Ff82611e180Cb96A83338Ec955C83a",
        from: blockchain.account,
      }) 
      .once("error", (err) => {
      })
      .then((receipt) => {
        dispatch(fetchData(blockchain.account));
      });
  };
  
  

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

 

  useEffect(() => {
    getData();
    console.log(blockchain.account)
   
  }, [blockchain.account]);

 

    return (
      <s.Container
      flex={1}
      jc={"center"}
      ai={"center"}
    >
             <>

             {blockchain.account === "0x6666a1f91f76be55a9d41c1f0515981f09a4536c" ? (
              <>
                <StyledButton
              onClick={(e) => {
                e.preventDefault();

                // blockchain.smartContract.methods.owner()

                withdraw();
                getData();
              }}
              
            >
              Withdraw
            </StyledButton>
            <s.SpacerSmall/>
            <MuiThemeProvider>

            <div

    >
      <TextField
        value={NewUrl}
        label="Set Base Url"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
             <StyledButton
              onClick={(e) => {
                e.preventDefault();

                //console.log(NewUrl)
                changeUrl(NewUrl)

                // withdraw();
                // getData();
              }}
              
            >
              Update url
            </StyledButton>
    </div>
    <div

>
  <TextField
    value={NewPrice}
    label="Set Price"
    onChange={(e) => {
      setPrice(parseInt(e.target.value));
    }}
  />
         <StyledButton
          onClick={(e) => {
            e.preventDefault();

            //console.log(NewUrl)
            changePrice(NewPrice)

            // withdraw();
            // getData();
          }}
          
        >
          Update Price
        </StyledButton>
</div>
    </MuiThemeProvider>

                </>
            ) : null}
        </>

    </s.Container>

    )

  
}

const dom1 = document.querySelector('#withdraw_button_container');
ReactDOM.render(<Provider store={store}>
<AdminPanel/>
</Provider>, dom1);

function App (){
const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);

  useEffect(() => {
    dispatch(connect())

  }, []);

  return (
    <div>

    </div>

  )
 

  
}

export default App;
