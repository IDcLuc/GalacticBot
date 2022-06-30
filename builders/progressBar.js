function progressBar(value, requirement, size) {
    const percentage = value / requirement
    
    const filled = "▇".repeat(Math.round(size * percentage))
    const empty = "⎯".repeat(Math.abs(size - percentage))
    const finalBar = `[${filled}${empty}]`
    if (finalBar === "[]") throw new Error("Progress bar is empty")
    return finalBar
}

module.exports = progressBar