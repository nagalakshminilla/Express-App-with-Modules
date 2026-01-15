const fs = require('fs');
const path = require('path');

const readDataFile = () => {
    try {
        const filePath = path.join(__dirname, 'Data.txt');
        
        const data = fs.readFileSync(filePath, 'utf8');
        
        return data;
    } catch (error) {
        console.error('Error reading file:', error.message);
        return 'Error reading file';
    }
};

module.exports = { readDataFile };
