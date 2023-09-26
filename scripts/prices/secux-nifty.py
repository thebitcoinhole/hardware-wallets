import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://shop.secuxtech.com/products/nifty-nft-wallet"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

p_element = soup.find('p', class_='price-item--regular')
price_element = p_element.find('span')
price = price_element.get_text(strip=True)

assert price == "US$ 199", f"Failed: Price '{price}' does not match expected value"

print(price)
