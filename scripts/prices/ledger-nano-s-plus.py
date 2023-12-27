import requests
import json

# Send a GET request to the website
url = "https://shop.ledger.com/_next/data/8kwEbfQPdrICKNrgts4VS/en.json"
response = requests.get(url)

parsed_data = json.loads(response.text)

for product in parsed_data["pageProps"]["content"]["hardwareWallets"]["products"]:
    if product['handle'] == 'ledger-nano-s-plus':
        for variant in product["variants"]:
            if variant['id'] == 'gid://shopify/ProductVariant/39493377065032':
                price = variant['price']['amount']
                break
        break

assert price == "79.0", f"Failed: Price '{price}' does not match expected value"

print(price)
