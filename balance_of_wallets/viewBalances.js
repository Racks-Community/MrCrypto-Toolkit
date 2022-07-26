const ethers = require("ethers");

const matic = {
  name: "matic",
  chainId: 137,
  _defaultProvider: (providers) =>
    new providers.JsonRpcProvider(
      "put your alchemy key here"
    ),
};

const provider = ethers.getDefaultProvider(matic);

getUserbalance();
