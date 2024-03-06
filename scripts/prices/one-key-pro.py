import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://shop.onekey.so/products/new-onekey-pro-crypto-hardware-wallet-ships-within-30-days-%E7%9A%84%E5%89%AF%E6%9C%AC"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

price_element = soup.find('span', attrs={'data-product-price': True})
price = price_element.get_text(strip=True)

assert price == "$278.00 USD", f"Failed: Price '{price}' does not match expected value"

print(price)
