const fs = require('fs').promises;
const path = require('path');

exports.getProblemTitles = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'solutions', 'problemTitles.txt');
    const content = await fs.readFile(filePath, 'utf8');
    const titles = {};
    
    content.split('\n').forEach(line => {
      if (line.trim()) {
        const match = line.match(/^(\d{4})\s+J(\d):\s+(.+)$/);
        if (match) {
          const [_, year, question, title] = match;
          if (!titles[year]) titles[year] = {};
          titles[year][`j${question}`] = title.trim();
        }
      }
    });

    // Send the titles directly
    res.json(titles);
  } catch (error) {
    console.error('Error reading problem titles:', error);
    // Return default titles if file not found
    res.json({
      '2024': { 
        'j3': 'Special Event', 
        'j4': 'Triangles' 
      },
      // ... rest of the default titles ...
    });
  }
}; 