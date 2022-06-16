const fs = require("fs")

/* const append = async (file, file) => {

	fs.writeFileSync(`${path}_metadata.json`, )
} */

const main = async (path) => {
	const fd = await fs.open('_metadata.json', 'w+', function (err, file) {
		if (err)
			throw err
		console.log('File is opened in write mode')
	})

	let metadata = []

	for (let i = 1; i <= 10000; ++i)
		try {
			metadata.push(require(`${path}${i}.json`))
			console.clear()
			console.log(i)
		} catch (error) {
			console.log(error);
			return
		}

		fs.writeFileSync(`_metadata.json`, JSON.stringify(metadata, null, 2))
}

main('../../metadata/')
