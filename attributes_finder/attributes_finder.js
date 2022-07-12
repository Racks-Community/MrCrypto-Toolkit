const _metadata = require("../_metadata.json")
const config = require("./config.json")
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
	config.forEach((cfg_elm) => {
		scan(cfg_elm)
	})
	console.log(ids)
}

main()
