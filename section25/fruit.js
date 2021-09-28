exports.getFruit = getFruit
function getFruit() {
    const tabFruit = ["citron", "pasteque", "pomme", "banane"]
    const fruit = tabFruit[Math.floor(Math.random() * 4)]
    return fruit
}

exports.getFruitArray = getFruitArray
function getFruitArray() {
    const tabFruit = ["cerise", "framboise", "orange", "prune"]
    return tabFruit
}