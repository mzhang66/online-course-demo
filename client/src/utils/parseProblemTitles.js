function parseProblemTitles(titlesText) {
  const titles = {};
  
  // Split the text into lines and process each line
  const lines = titlesText.split('\n');
  
  lines.forEach(line => {
    // Skip empty lines
    if (!line.trim()) return;
    
    // Extract year, question number, and title
    const match = line.match(/(\d{4})\s+(J[34]):\s+(.+)/);
    if (match) {
      const [_, year, questionNum, title] = match;
      
      // Initialize the year object if it doesn't exist
      if (!titles[year]) {
        titles[year] = {};
      }
      
      // Store the title under j3 or j4 key
      const key = questionNum.toLowerCase();
      titles[year][key] = title;
    }
  });
  
  return titles;
}

export default parseProblemTitles; 