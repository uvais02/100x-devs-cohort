/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toLowerCase()
  let start = 0, end = str.length - 1

  if (end == -1) return true

  while (start < end) {
    if (!/^[a-zA-Z]$/.test(str[start]))
      start += 1
    if (!/^[a-zA-Z]$/.test(str[end]))
      end -= 1

    if (/^[a-zA-Z]$/.test(str[start]) && /^[a-zA-Z]$/.test(str[end])) {
      if (str[start] != str[end]) return false
      start += 1, end -= 1
    }
  }
  return true;
}
module.exports = isPalindrome;
