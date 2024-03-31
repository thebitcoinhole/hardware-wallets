import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://shop.onekey.so/products/onekey-pro"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

price_element = soup.find('span', attrs={'data-product-price': True})
price = price_element.get_text(strip=True)

assert price == "$278.00 USD", f"Failed: Price '{price}' does not match expected value"

print(price)
