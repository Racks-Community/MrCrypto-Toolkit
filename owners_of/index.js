const fs = require("fs");
const ethers = require("ethers");
require("dotenv").config();

const matic = {
	name: "matic",
	chainId: 137,
	_defaultProvider: (providers) =>
	  new providers.JsonRpcProvider(process.env.ALCHEMY_URL),
  };

const mrcABI = require("../utils/MRC_abi.json");
const provider = ethers.getDefaultProvider(matic);
const mrcContract = new ethers.Contract(`${process.env.MRC_ADDRESS}`, mrcABI, provider);

const targets = require("./config.json");
const { mainModule, exit } = require("process");

const main = async () => {
	fs.open("result.json", 'w+', function (err, file) {
		if (err)
			throw err;
		console.log('File is opened in write mode');
	});

	let wallets = [];
	for (let i in targets) {
		const wallet = await mrcContract.ownerOf(targets[i]);
		wallets.push(wallet);
		console.clear();
		console.log(`${+i + 1}/${targets.length}`);
	}
	wallets = [...new Set(wallets)];
	fs.writeFileSync("result.json", JSON.stringify(wallets));
}

main();
