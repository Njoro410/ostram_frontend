function toTitleCase(str) {
  if (str) {
    // Split the string into an array of words
    const words = str.toLowerCase().split(" ");

    // Capitalize the first letter of each word
    const titleCaseWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the words back into a single string
    const titleCaseStr = titleCaseWords.join(" ");

    return titleCaseStr;
  }
}

export default toTitleCase;
