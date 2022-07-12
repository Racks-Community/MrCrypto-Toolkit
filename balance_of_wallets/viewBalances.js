const ethers = require("ethers");

const matic = {
  name: "matic",
  chainId: 137,
  _defaultProvider: (providers) =>
    new providers.JsonRpcProvider(
      "https://polygon-mainnet.g.alchemy.com/v2/bfSzgTmgSKMUvNh1nW2CiQdUKLNO9K-e"
    ),
};

const provider = ethers.getDefaultProvider(matic);

getUserbalance();
