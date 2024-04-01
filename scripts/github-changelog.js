require('dotenv').config();
const fs = require('fs');
const axios = require('axios');

const itemId = process.argv[2];
const changelogUrl = process.argv[3];

var latestVersion
var latestReleaseDate

axios
  .get(changelogUrl)
  .then((response) => {
    var body = response.data
    // Split the content into lines
    const lines = body.split('\n');

    // Find the first line starting with "##"
    const regex = /^## \[([\d.]+)\] \(([^)]+)\)/;
    for (const line of lines) {
        const match = line.match(regex);
        if (match) {
            latestVersion = "v" + match[1];
            latestReleaseDate = formatDate(match[2]);
            break;
        }
    }

    if (latestVersion == undefined || latestReleaseDate == undefined) {
        const regex = /^## ([\d.]+) \[([^)]+)\]/;
        for (const line of lines) {
            const match = line.match(regex);
            if (match) {
                latestVersion = "v" + match[1];
                latestReleaseDate = formatDate(match[2]);
                break;
            }
        }
    }

    // Coolwallet Pro. Example: ## [332] - 2023-08-10
    if (latestVersion == undefined || latestReleaseDate == undefined) {
        const regex = /^## \[([\d]+)\] - (\d{4}-\d{2}-\d{2})/;
        for (const line of lines) {
            const match = line.match(regex);
            if (match) {
                latestVersion = "v" + match[1];
                latestReleaseDate = formatDate2(match[2]);
                break;
            }
        }
    }

    // Coldcard Q. Example: ## 0.0.6 - 2024-02-22
    if (itemId == "coldcard-q" && (latestVersion == undefined || latestReleaseDate == undefined)) {
        const regex = /^## ([\d.]+) - (\d{4}-\d{2}-\d{2})/;
        for (const line of lines) {
            const match = line.match(regex);
            if (match) {
                latestVersion = "v" + match[1];
                latestReleaseDate = formatDate2(match[2]);
            }
        }
    }

    console.log(`Sanitized version: ${latestVersion}`);
    console.log(`Release Date: ${latestReleaseDate}`);
    updateJson(itemId, latestVersion, latestReleaseDate);

  })
  .catch((error) => {
    console.error('Error fetching release information:', error.message);
    process.exit(1);
  });

function formatDate(inputDate) {
    // Define months for formatting
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    // Split the input date string into parts
    const parts = inputDate.match(/(\d+)\w+\s(\w+)\s(\d+)/);
  
    if (parts && parts.length === 4) {
      const day = parseInt(parts[1]);
      const monthIndex = months.indexOf(parts[2]);
      const year = parseInt(parts[3]);
  
      if (monthIndex !== -1) {
        // Create a JavaScript Date object
        const date = new Date(year, monthIndex, day);
  
        // Format the date in the desired output format (e.g., "Jul 27, 2023")
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      }
    }
  
    // Return the original input if parsing fails
    return inputDate;
  }

  function formatDate2(date) {
        
    const dateObject = new Date(`${date}T00:00:00Z`);
    
    // Format the date as "MMM DD, YYYY"
    return dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
    });    
}

function updateJson(itemId, latestVersion, latestReleaseDate) {
    // Define the path to your JSON file.
    const filePath = `../items/${itemId}.json`;

    // Read the JSON file.
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            process.exit(1);
            return;
        }

        try {
            const wallet = JSON.parse(data);
            var modifyJson = false

            var currentVersion = wallet["firmware"]["latest-version"].value
            console.log("Current version found: " + currentVersion)
            var currentReleaseDate = wallet["firmware"]["latest-release-date"].value
            console.log("Current Release date found: " + currentReleaseDate)
            if (latestVersion !== currentVersion) {
                wallet["firmware"]["latest-version"].value = latestVersion
                wallet["firmware"]["latest-release-date"].value = latestReleaseDate
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
                    } else {
                        console.log('JSON file updated successfully.');
                    }
                });
            }

        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            process.exit(1);
        }
    });
}
