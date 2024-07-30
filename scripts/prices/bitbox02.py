import requests
from bs4 import BeautifulSoup

# Send a GET request to the website with US locale
url = "https://bitbox.shop/en/products/bitbox02-bitcoin-only-4/"
headers = {'Accept-Language': 'en-US'}
response = requests.get(url, headers=headers)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

# Find the <p> tag with the matching class
price_container = soup.find('div', class_='product-price')

# Find the span element with the matching class within the price container
price_element = price_container.find('strong').find('span').find('span', class_='currency')

# Extract the price value
price = price_element.next_sibling.strip()

expected_price = "161.00"
if price != expected_price and price != "149.00":
    assert float(expected_price) - 4 <= float(price) <= float(expected_price) + 4, f"Failed: Price '{price}' does not match expected value"

print(price)
