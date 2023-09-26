import requests
import re

# Send a GET request to the website
url = "https://shop.ledger.com/products/ledger-nano-x"
response = requests.get(url)

price_regex = r'"price":\{"amount":(\d+.\d+),"currencyCode":"EUR"\}'

match = re.search(price_regex, response.text)
if match:
    price = match.group(1)
else:
    print("Price not found in the input text.")

assert price == "149.0", f"Failed: Price '{price}' does not match expected value"

print(price)
