/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  const sort = (str) => str.split('').sort().join('');
  return sort(str1.toLowerCase()) == sort(str2.toLowerCase())
}

isAnagram('Debit Card', 'Bad Credit')

module.exports = isAnagram;
