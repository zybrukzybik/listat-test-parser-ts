import fs from 'fs'

function writeResults(data: string): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile('results.txt', data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}

export default writeResults