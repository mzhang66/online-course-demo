const fs = require('fs').promises;
const path = require('path');

exports.getCheatsheet = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'solutions', 'cheatsheetP.pdf');
    //console.log('Reading from:', filePath); // Debug log

    // Check if the file exists
    await fs.access(filePath);
    
    // Set the correct content type for PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="cheatsheetP.pdf"'); // For inline viewing

    // Send the PDF file
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Download error:', err);
        return res.status(500).json({ message: 'Error downloading the file.', error: err.message });
      }
    });
  } catch (error) {
    console.error('Error reading cheatsheet:', error);
    return res.status(500).json({ 
      message: 'Error reading cheatsheet',
      error: error.message 
    });
  }
}; 