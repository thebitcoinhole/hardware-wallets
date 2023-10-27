import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://satochip.io/product/satochip-bitcoin-hardware-wallet/"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

price_element = soup.find('span', class_='woocommerce-Price-amount')
price = price_element.bdi.get_text(strip=True)

assert price == "25,00", f"Failed: Price '{price}' does not match expected value"

print(price)
