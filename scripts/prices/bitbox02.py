import requests
from bs4 import BeautifulSoup

# Send a GET request to the website with US locale
url = "https://bitbox.shop/en/products/bitbox02-bitcoin-only-4/"
headers = {'Accept-Language': 'en-US'}
response = requests.get(url, headers=headers)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

# Find the <p> tag with the matching class
price_container = soup.find('h2', class_='product__info__price')

# Find the span element with the matching class within the price container
price_element = price_container.find('span').find('span').find('span', class_='currency')

# Extract the price value
price = price_element.next_sibling.strip()

if price != "154.00" and price != "153.00" and price != "152.00" and price != "151.00" and price != "139.00":
    assert price == "150.00", f"Failed: Price '{price}' does not match expected value"

print(price)
