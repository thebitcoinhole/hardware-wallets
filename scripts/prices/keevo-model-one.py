import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://www.keevowallet.com/products/keevo-model-1-crypto-hardware-bitcoin-wallet-cold-storage?variant=39260004646999"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

price_element = soup.find('span', class_='product__price')
price = price_element.get_text(strip=True)

assert price == "$299.99", f"Failed: Price '{price}' does not match expected value"

print(price)
