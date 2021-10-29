import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

export const StyledButton = styled.button`
font-family: Lato;
	font-size: 1.6rem;
	outline: none;
	background: #172d42;
	color: #fff;

	border-radius: 5px;
	border: none;
  padding: 1px 20px;
	// margin-top: 35px;
	 display: flex;
	align-items: center
  //  display: block;
	//  width: 8px;
	//  //height: 8px;
	//  border-radius: 8px;
	//  background-color: #8ef4d6;
	//  margin-right: 10px

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

  useEffect(() => {
    getData();
  }, [blockchain.account]);

 
  


    if (this.state.liked) {
      return (
        <ResponsiveWrapper ai={"center"} jc={"center"}>

      <StyledButton
      onClick={(e) => {
        this.setState({ liked: false })
        // e.preventDefault();
        // dispatch(connect());
        // getData();
      }}
    >
      Disconnect
    </StyledButton>
    </ResponsiveWrapper>
      );
    }

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
                CONNECT
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
            <s.Container ai={"center"} jc={"center"} fd={"row"}>
              <StyledButton
                disabled={claimingNft ? 1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  // claimNFTs(1);
                  withdraw();
                  getData();
                }}
              >
                {claimingNft ? "BUSY" : "BUY 1"}
              </StyledButton>
            </s.Container>
          )}
        </>

    </s.Container>

    )

  
}
const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(ConnectButton), domContainer);

function App() {
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

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
      <s.Container flex={1} ai={"right"} style={{ padding: 24 }}>
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
                      CONNECT
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
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        // claimNFTs(1);
                        withdraw();
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "BUY 1"}
                    </StyledButton>
                  </s.Container>
                )}
              </>

          </s.Container>

      </s.Container>
  );
}

export default App;
