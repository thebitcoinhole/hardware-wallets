require('dotenv').config();
const fs = require('fs');
const axios = require('axios');

const itemId = process.argv[2];
const changelogUrl = process.argv[3];
const owner = process.argv[4];
const repo = process.argv[5];
const tag = process.argv[6];
const latestRelease = process.argv[7];
const allReleases = process.argv[8];
const allReleasesInclude = process.argv[9];
const allReleasesExclude = process.argv[10];

const githubApiKey = process.env.GITHUB_TOKEN

var headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${githubApiKey}`,
  };
var apiUrl 
if (tag == "true") {
    apiUrl = `https://api.github.com/repos/${owner}/${repo}/tags`;
} else if (latestRelease == "true") {
    apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
} else if (allReleases == "true") {
    apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;
} else if (changelogUrl != "null") {
    apiUrl = changelogUrl
    headers = {}
} else {
    console.error('Not defined api url to use');
    process.exit(1);
}

const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
var latestVersion
var latestReleaseDate
// var assetFileNames = [];

axios
  .get(apiUrl, { headers })
  .then((response) => {

    // var assets = []
    var body = ""
    if (latestRelease == "true") {
        console.log("Using latest releases API")
        body = response.data.body

        latestReleaseDate = getDate(response.data.published_at)
        //assets = response.data.assets
        latestVersion = response.data.name.trim()
        console.log("Release name: " + latestVersion)
        if (latestVersion === undefined || latestVersion === "") {
            latestVersion = response.data.tag_name.trim()
            console.log("Tag name: " + latestVersion)
        }
    } else if (allReleases == "true") {
        console.log("Using releases API")
        response.data.forEach((release) => {
            if (latestVersion === undefined) {
                var match = false
                if (allReleasesInclude != undefined && allReleasesInclude != "null") {
                    match = release.name.toLowerCase().includes(allReleasesInclude.toLowerCase())
                } else if (allReleasesExclude != undefined && allReleasesExclude != "null") {
                    match = !release.name.toLowerCase().includes(allReleasesExclude.toLowerCase())
                } else {
                    console.error('Not defined any allReleasesInclude or allReleasesExclude');
                    process.exit(1);
                }
                if (match) {
                    body = release.body
                    latestReleaseDate = getDate(release.published_at)
                    //assets = release.assets
                    latestVersion = release.name.trim()
                    console.log("Release name: " + latestVersion)
                    if (latestVersion === undefined || latestVersion === "") {
                        latestVersion = release.tag_name
                        console.log("Tag name: " + latestVersion)
                    }
                }
            }
        });
    } else if (tag == "true") {
        console.log("Using tags API")
        const tags = response.data;
        latestTag = tags[0];
        latestVersion = latestTag.name.trim()
        console.log("Tag name: " + latestVersion)
        latestReleaseDate = today()
    } else if (changelogUrl != "null") {
        var body = response.data
        // Split the content into lines
        const lines = body.split('\n');

        if (itemId == "coolwallet-pro") {
            // Coolwallet Pro. Example: ## [332] - 2023-08-10
            const regex = /^## \[([\d]+)\] - (\d{4}-\d{2}-\d{2})/;
            for (const line of lines) {
                const match = line.match(regex);
                if (match) {
                    latestVersion = "v" + match[1];
                    latestReleaseDate = formatDate2(match[2]);
                    break;
                }
            }
        } else if (itemId == "coldcard-mk4") {
            // Coldcard Mk4. Example: ## 5.2.2 - 2023-12-21
            const regex = /^## ([\d.]+) - (\d{4}-\d{2}-\d{2})/;
            var onSection = false
            for (const line of lines) {
                if (onSection == true) {
                    const match = line.match(regex);
                    if (match) {
                        latestVersion = "v" + match[1];
                        latestReleaseDate = formatDate2(match[2]);
                        break;
                    }
                } else if (line == "# Mk4 Specific Changes") {
                    onSection = true
                }
            }
        } else if (itemId == "coldcard-q") {
            // Coldcard Q. Example: ## 0.0.6Q - 2024-02-22
            const regex = /^## ([\d.]+)Q - (\d{4}-\d{2}-\d{2})/;
            var onSection = false
            for (const line of lines) {
                if (onSection == true) {
                    const match = line.match(regex);
                    if (match) {
                        latestVersion = "v" + match[1];
                        latestReleaseDate = formatDate2(match[2]);
                        break;
                    }
                } else if (line == "# Q Specific Changes") {
                    onSection = true
                }
            }
        } else {
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
        }
        
        if (latestVersion == undefined) {
            console.error("latestVersion not found")
            process.exit(1);
        }

        if (latestReleaseDate == undefined) {
            console.error("latestReleaseDate not found")
            process.exit(1);
        }
    }

    if (!ignoreVersion(itemId, latestVersion)) {

        // Bitbox
        latestVersion = latestVersion.replace(/ - Multi$/, '');
        latestVersion = latestVersion.replace(/ - Bitcoin-only$/, '');

        // OneKey
        latestVersion = latestVersion.replace(/^mini\//, '');
        latestVersion = latestVersion.replace(/^classic\//, '');
        latestVersion = latestVersion.replace(/^touch\//, '');

        // Passport
        latestVersion = latestVersion.replace(/^Passport Firmware /, '');
        latestVersion = latestVersion.replace(/^Passport /, '');
        latestVersion = latestVersion.replace(/ Firmware$/, '');

        // ProKey
        latestVersion = latestVersion.replace(/^Prokey Firmware /, '');

        // Keepkey
        latestVersion = latestVersion.replace(/^Release /, '');

        // Krux
        latestVersion = latestVersion.replace(/^Version /, '');

        // Keystone
        latestVersion = latestVersion.replace(/-BTC$/, '');

        // Grid+ Lattice1
        latestVersion = latestVersion.replace(/^HSM-/, '');

        // Satochip
        const match = latestVersion.match(/^Satochip (v\d+(\.\d+)+)/)
        if (match) {
            latestVersion = match[1];
        }

        latestVersion = latestVersion.replace(/^(v\d+(\.\d+)+):(.*)$/, '$1');
        latestVersion = latestVersion.replace(/^Release\s*/, '');
        latestVersion = latestVersion.replace(/^release_/, '');

        // Check if the input starts with "v" and is a valid version (x.y.z)
        const versionPattern = /^v\d+(\.\d+)*$/;
        if (!versionPattern.test(latestVersion)) {
            // If it doesn't match the version pattern, add the "v" prefix
            latestVersion = "v" + latestVersion;
        }

        // Iterate through release assets and collect their file names
        // assets.forEach((asset) => {
        //     assetFileNames.push(asset.name);
        // });
        //console.log('Release Notes:\n', body);
        //console.log('Asset File Names:', assetFileNames.join());
        checkRelease(itemId, latestVersion, latestReleaseDate);
    } else {
        console.log("Ignoring version")
        console.log("releaseVersion=")
        console.log("releaseDate=")
    }
  })
  .catch((error) => {
    console.error('Error fetching release information:', error.message);
    process.exit(1);
  });

function getDate(publishedAt) {
    if (publishedAt != "") {
        return new Date(publishedAt).toLocaleDateString(undefined, dateOptions);
    } else {
        return today()
    }
}

function ignoreVersion(itemId, latestVersion) {

    // Ignore if it ends with "-pre1", "-pre2", etc.
    var pattern = /-pre\d+$/;
    if (pattern.test(latestVersion)) {
        return true
    }

    // Ignore if it ends with "-rc", "-rc1", "-rc2", etc.
    pattern = /-rc\d*$/;
    if (pattern.test(latestVersion)) {
        return true
    }

    if (itemId == "seedsigner" && latestVersion.endsWith("_EXP")) {
        return true
    }

    return false
}

function today() {
    return new Date().toLocaleDateString(undefined, dateOptions);
}

function checkRelease(itemId, latestVersion, latestReleaseDate) {
    // Define the path to your JSON file.
    const filePath = `../items/${itemId}.json`;

    // Read the JSON file.
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            process.exit(1);
        }

        try {
            const item = JSON.parse(data);
            var currentVersion = item["firmware"]["latest-version"].value
            console.log("Current version found: " + currentVersion)
            console.log("Latest version found: " + latestVersion)

            var currentReleaseDate = item["firmware"]["latest-release-date"].value
            console.log("Current Release date found: " + currentReleaseDate)
            console.log("Latest Release date found: " + latestReleaseDate)

            if (latestVersion !== currentVersion) {
                console.log("releaseVersion=" + latestVersion)
                console.log("releaseDate=" + latestReleaseDate)
            } else {
                console.log("releaseVersion=")
                console.log("releaseDate=")
            }
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            process.exit(1);
        }
    });
}


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
