// Utility function

const csvParse = (csvData) => {
  let lines = csvData.trim().split("\n")
  let headers = lines.shift()

  let results = []
  lines.forEach((line) => {
    let result = {}

    headers.split(",").forEach((field, index) => {
      result[field] = line.split(",")[index]
    })

    results.push(result)
  })

  return results;
}

export default csvParse;
