import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://store.dcentwallet.com/products/biometric-wallet"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

price_element = soup.find('div', class_='ecom-product-single__price--sale')
price = price_element.get_text(strip=True)

assert price == "$99.00", f"Failed: Price '{price}' does not match expected value"

print(price)
