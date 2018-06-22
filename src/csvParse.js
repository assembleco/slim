// Utility function

const csvParse = (csvData, delimeter = ",") => {
  let lines = csvData.trim().split("\n")
  let headers = lines.shift()

  let results = []
  lines.forEach((line) => {
    let result = {}

    headers.split(delimeter).forEach((field, index) => {
      result[field] = line.split(delimeter)[index]
    })

    results.push(result)
  })

  return results;
}

const tsvParse = (data) => csvParse(data, "\t")

export default csvParse;
export { tsvParse }
