const _metadata = require("../_metadata.json")
const config = require("./config.json")
const fs = require("fs");
const ids = []

const isSuitable = (cfg_elm, specimen) => {
	for (let e in specimen) {
			if (cfg_elm[e].value != specimen[e].value && cfg_elm[e].value != "all")
				return false
	}
	return true
}

const scan = (cfg_elm) => {
	for (let token in _metadata) {
		if (isSuitable(cfg_elm, _metadata[token].attributes) == true)
			ids.push(+token + 1)
	}
}

const main = () => {
	console.log(config)
	fs.open("result.json", 'w+', function (err, file) {
		if (err)
			throw err;
		console.log('File is opened in write mode');
	});
	config.forEach((cfg_elm) => {
		scan(cfg_elm)
	})
	fs.writeFileSync("result.json", JSON.stringify(ids));
	console.log(ids)
}

main()
