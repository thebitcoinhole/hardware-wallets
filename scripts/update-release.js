require('dotenv').config();
const fs = require('fs');

const itemId = process.argv[2];
const releaseVersion = process.argv[3];
const releaseDate = process.argv[4];
   
// Define the path to your JSON file.
const filePath = `../items/${itemId}.json`;

// Read the JSON file.
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        process.exit(1);
    }

    try {
        const wallet = JSON.parse(data);
        var modifyJson = false

        var currentVersion = wallet["firmware"]["latest-version"].value
        console.log("Current version found: " + currentVersion)
        var currentReleaseDate = wallet["firmware"]["latest-release-date"].value
        console.log("Current Release date found: " + currentReleaseDate)
        if (releaseVersion !== currentVersion) {
            wallet["firmware"]["latest-version"].value = releaseVersion
            wallet["firmware"]["latest-release-date"].value = releaseDate
            modifyJson = true
        }

        if (modifyJson) {
            console.log("Updating JSON")

            // Convert the modified object back to a JSON string.
            const updatedJsonString = JSON.stringify(wallet, null, 2);

            // Write the updated JSON string back to the file.
            fs.writeFile(filePath, updatedJsonString, (writeErr) => {
                if (writeErr) {
                    console.error('Error writing JSON file:', writeErr);
                    process.exit(1);
                } else {
                    console.log('JSON file updated successfully.');
                }
            });
        } else {
            console.error('Error updating JSON. Both versions are the same');
            process.exit(1);
        }

    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        process.exit(1);
    }
});

