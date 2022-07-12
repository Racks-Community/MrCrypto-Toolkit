const fs = require("fs");
const XLSX = require("xlsx");
const ethers = require("ethers");

const getUserbalance = async (provider, address) => {
  const balance = await provider.getBalance(address);

  return parseInt(ethers.utils.formatEther(balance));
};

const matic = {
  name: "matic",
  chainId: 137,
  _defaultProvider: (providers) =>
    new providers.JsonRpcProvider(
      "https://polygon-mainnet.g.alchemy.com/v2/bfSzgTmgSKMUvNh1nW2CiQdUKLNO9K-e"
    ),
};

const provider = ethers.getDefaultProvider(matic);

let total_balance = 0;

let allAddresses = [];

const ethAddressParser = (file) => {
  const workbook = XLSX.readFile(file);
  const sheet_names_lsit = workbook.SheetNames;
  let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_names_lsit[0]]);

  xlData.forEach((item) => {
    const { cartera } = item;
    if (
      /^0x[a-fA-F0-9]{40}$/.test(cartera) &&
      !allAddresses.includes(cartera)
    ) {
      allAddresses.push(cartera);
    }
  });
};

const getGlobalBalance = async (provider, carteras) => {
  let balance = 0;

  for (cartera of carteras) {
    try {
      const balancecartera = await getUserbalance(provider, cartera);
      if (balancecartera >= 20) {
        balance += balancecartera;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return balance;
};

/*const getTotalBalance = async () => {
  console.log("leyendo carteras");
  for (let index = 1; index <= 16; index++) {
    ethAddressParser(`wl${index}.xlsx`);
  }

  console.log(allAddresses.length);
  total_balance += await getGlobalBalance(provider, allAddresses);
  console.log("el balance global es " + total_balance);
};

getTotalBalance();
*/
ethAddressParser("wlp2.xlsx");
console.log(allAddresses.length);
fs.writeFileSync(
  "carteras.txt",
  JSON.stringify(allAddresses).replace(/"/g, " ")
);
