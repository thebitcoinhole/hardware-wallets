import requests

# Send a GET request to the API
url = "https://api.keyst.one/v1/web/shop_products/?locale=en"
response = requests.get(url)

# Parse the JSON response
data = response.json()

# Find the Keystone Essential product and extract its price
for product in data['result']:
    if product['id'] == 'gid://shopify/Product/7698055823513':
        price = product['priceRange']['minVariantPrice']['amount']
        break

assert price == '129.0', f"Failed: Price '{price}' does not match expected value"

print(price)
