function generateURL() {
  let string = ''
  let lowerCaseLetter = 'abcdefghijklmnopqrstuvwxzy'
  let upperCaseLetter = lowerCaseLetter.toUpperCase()
  let number = '1234567890'
  let allWords = lowerCaseLetter + upperCaseLetter + number
  for (let i = 1; i <= 5; i++) {
    const randomNumber = Math.floor(Math.random() * allWords.length)
    string += allWords.slice(randomNumber, randomNumber + 1)
  }
  return string
}

module.exports = generateURL