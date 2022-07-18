require("dotenv").config();

const fs = require("fs");
const ethers = require("ethers");
const nftRanking = require("./NFT-Ranking.json");
const allHolders = require("./TopHolders_Volumen.json");

const topHolders = 200;
const topRarity = 200;

const matic = {
	name: "matic",
	chainId: 137,
	_defaultProvider: (providers) =>
	new providers.JsonRpcProvider(process.env.ALCHEMY_URL),
};

const mrcABI = require("../utils/MRC_abi.json");
const provider = ethers.getDefaultProvider(matic);
const mrcContract = new ethers.Contract(`${process.env.MRC_ADDRESS}`, mrcABI, provider);

const { mainModule, exit } = require("process");

const main = async () => {
	fs.open("./results/result_TopHolders.json", 'w+', function (err, file) {
		if (err)
			throw err;
		console.log('File is opened in write mode');
	});

	let wallets = [];
	for (let i = 0; i < topHolders; ++i) {
		const wallet = allHolders[i].name;
		wallets.push(wallet);
		console.clear();
		console.log(`${+i + 1}/${topHolders}`);
	}
	wallets = [...new Set(wallets)];
	fs.writeFileSync("./results/result_TopHolders.json", JSON.stringify(wallets));

	//
	fs.open("./results/result_TopRarity.json", 'w+', function (err, file) {
		if (err)
			throw err;
		console.log('File is opened in write mode');
	});

	wallets = [];
	for (let i = 8; i < topRarity + 8; ++i) { // 8 = amount of Mr. Skull
		const id = nftRanking[i].index;
		const wallet = await mrcContract.ownerOf(id);
		wallets.push(wallet);
		console.clear();
		console.log(`${+i + 1 - 8}/${topRarity}`);
	}
	wallets = [...new Set(wallets)];
	fs.writeFileSync("./results/result_TopRarity.json", JSON.stringify(wallets));
}

main();
