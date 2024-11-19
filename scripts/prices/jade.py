import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://store.blockstream.com/product/blockstream-jade-hardware-wallet/"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

# Find the tag with the matching class
price_element = soup.find('span', class_='price-item--regular')

# Extract the price value
price = price_element.text.strip().replace(' USD', '')

assert price == "$79.00", f"Failed: Price '{price}' does not match expected value"

print(price)
