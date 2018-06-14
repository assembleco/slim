import jquery from "jquery"

class Assemble {
  constructor(url) {
    this.url = url
    this.watches = {}
  }

  run(system) {
    return (template, ...expressions) => new Promise(resolve => {
      const code = template.reduce((accumulator, part, i) => {
        return accumulator + expressions[i - 1] + part
      })

      jquery.ajax({
        url: "/evaluate",
        type: "POST",
        data: { system, code },
        success: resolve,
        error: resolve,
      })
    }).then((result) => {
      let watches = this.watches[system]
      if(watches !== undefined) {
        watches.forEach((watch) => {
          watch()
        })
      }

      return result;
    })
  }

  // For now, this only executes the command a single time.
  // It is an alias for the `system` function.
  watch(system) {
    if(this.watches[system] === undefined) {
      this.watches[system] = []
    }

    let templating = (template, ...expressions) => {
      const code = template.reduce((accumulator, part, i) => {
        return accumulator + expressions[i - 1] + part
      })

      return (callback) => {
        let watch = () =>
          jquery.ajax({
            url: "/evaluate",
            type: "POST",
            data: { system, code },
            success: callback,
            error: callback,
          })

        this.watches[system].push(watch)
        watch()
      }
    }

    return templating
  }
}

export default Assemble
