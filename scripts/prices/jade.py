import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://store.blockstream.com/product/jade-hardware-wallet/"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

# Find the <p> tag with the matching class
price_container = soup.find('p', class_='price')

# Find the span element with the class matching within the price container
price_element = price_container.find('span', class_='woocommerce-Price-amount')

# Extract the price value
price = price_element.text.strip().replace(' USD', '')

assert price == "$64.99", f"Failed: Price '{price}' does not match expected value"

print(price)
