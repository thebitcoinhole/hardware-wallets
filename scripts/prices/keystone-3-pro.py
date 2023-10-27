import requests

# Send a GET request to the API
url = "https://satochip.io/product/satochip/"
response = requests.get(url)

# Parse the JSON response
data = response.json()

# Find the Keystone Essential product and extract its price
for product in data['result']:
    if product['title'] == 'Keystone 3 Pro':
        price = product['discountPrice']
        break

assert price == 129, f"Failed: Price '{price}' does not match expected value"

print(price)
