require('dotenv').config();
const fs = require('fs');
const axios = require('axios');

const itemId = process.argv[2];
const owner = process.argv[3];
const repo = process.argv[4];
const apiKey = process.argv[5];
const tag = process.argv[6];
const latestRelease = process.argv[7];
const allReleases = process.argv[8];
const allReleasesInclude = process.argv[9];
const allReleasesExclude = process.argv[10];

var apiUrl 
if (tag == "true") {
    apiUrl = `https://api.github.com/repos/${owner}/${repo}/tags`;
}
if (latestRelease == "true") {
    apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
}
if (allReleases == "true") {
    apiUrl = `https://api.github.com/repos/${owner}/${repo}/releases`;
}

const headers = {
  Accept: 'application/vnd.github.v3+json',
  Authorization: `Bearer ${apiKey}`,
};

const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
var latestReleaseDate
var assetFileNames = [];

axios
  .get(apiUrl, { headers })
  .then((response) => {

    var latestVersion
    var assets = []
    var body = ""
    var publishedAt = ""
    if (latestRelease == "true") {
        console.log("Using latest releases API")
        body = response.data.body
        publishedAt = response.data.published_at
        assets = response.data.assets
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
                    publishedAt = release.published_at
                    assets = release.assets
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
        publishedAt = fetchTagPublishDate(latestTag.name)
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

        // Satochip
        const match = latestVersion.match(/^Satochip (v\d+(\.\d+)+)/)
        if (match) {
            latestVersion = match[1];
        }

        // For example: "2023-09-08T2009-v5.1.4"
        latestVersion = latestVersion.replace(/.*-([^:]+)$/, '$1');

        latestVersion = latestVersion.replace(/^(v\d+(\.\d+)+):(.*)$/, '$1');
        latestVersion = latestVersion.replace(/^Android Release\s*/, '');
        latestVersion = latestVersion.replace(/^Release\s*/, '');
        latestVersion = latestVersion.replace(/^release_/, '');

        // Check if the input starts with "v" and is a valid version (x.y.z)
        const versionPattern = /^v\d+(\.\d+)*$/;
        if (!versionPattern.test(latestVersion)) {
            // If it doesn't match the version pattern, add the "v" prefix
            latestVersion = "v" + latestVersion;
        }

        // Iterate through release assets and collect their file names
        assets.forEach((asset) => {
            assetFileNames.push(asset.name);
        });

        if (publishedAt != "") {
            latestReleaseDate = new Date(publishedAt).toLocaleDateString(undefined, dateOptions);
        } else {
            latestReleaseDate = "?"
        }

        console.log(`Sanitized version: ${latestVersion}`);
        console.log(`Release Date: ${latestReleaseDate}`);
        console.log('Release Notes:\n', body);
        console.log('Asset File Names:\n', assetFileNames.join('\n'));
        updateJson(itemId, latestVersion, latestReleaseDate);
    } else {
        console.log("Ignoring version")
    }
  })
  .catch((error) => {
    console.error('Error fetching release information:', error.message);
    process.exit(1);
  });

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

function fetchTagPublishDate(tagName) {
    // TODO
    const isoString = new Date().toISOString();
    return isoString.split('.')[0] + 'Z';
}

function updateJson(itemId, latestVersion, latestReleaseDate) {
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
