import type { NextPage } from "next";
import { useEffect } from "react";
const Moralis = require("moralis");

const serverUrl = "https://zypbvrbwqkqp.usemoralis.com:2053/server";
const appId = "N8D4NjBe7sq4R691w27ZhGz0BeQXnHBREC2CfBIM";
Moralis.start({ serverUrl, appId });

const Home: NextPage = () => {
  const login = async () => {
    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate({
        signingMessage: "Log in using Moralis",
      })
        .then((user: any) => {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  const fetchUserNFTs = async () => {
    console.log("fetching nfts");
    const options = {
      chain: "rinkeby",
      address: "0x3eb9c5B92Cb655f2769b5718D33f72E23B807D24",
    };
    const nfts = await Moralis.Web3API.account.getNFTs(options);
    console.log(nfts);
  };

  useEffect(() => {
    login();
    fetchUserNFTs();
  });

  return <div className="flex justify-center">hello world</div>;
};

export default Home;
