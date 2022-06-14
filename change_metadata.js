const fs = require('fs')

const Metadata = require('./_metadata.json')
const newMetadataDir = './newMetadata'
const hashRegEx = /([a-f]|[0-9]){64}/

const protocol = 'ipfs'
const dir = 'directorio ejemplo'

const main = async () => {
	if (!fs.existsSync(newMetadataDir))
		fs.mkdirSync(newMetadataDir)

	for (let token in Metadata) {
		const imageName = Metadata[token].image.match(hashRegEx)[0]
		const newMetadata = {
			...Metadata[token],
			"image": `${protocol}://${dir}/${imageName}.png`
		}
		fs.writeFileSync(`${newMetadataDir}/${+token + 1}.json`, JSON.stringify(newMetadata, null, 2))
		return
	}
}

main()
