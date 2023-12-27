import requests
import re
import sys


# Send a GET request to the website
url = "https://tangem.com/_astro/WalletForm.astro_astro_type_script_index_0_lang.90f7ef30.js"
response = requests.get(url)

pattern = r'TG128X2-B"[^}]*?price:\s*([\d.]+)'

# Search for the pattern in the JavaScript code
match = re.search(pattern, response.text)

if match:
    # Get the price as a float
    price = match.group(1)
else:
   sys.exit(1)

assert price == "54.9", f"Failed: Price '{price}' does not match expected value"

print(price)
