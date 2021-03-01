import fs from 'fs'

function readResults(): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
        fs.readFile('results.txt', 'utf8', (err, data) => {
            if (err) return reject(err);

            let result: Array<string>

            (data) ? result = data.split('\n') : result = []
            resolve(result)
        })
    })
}

export default readResults