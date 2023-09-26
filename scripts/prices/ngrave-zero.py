import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://shop.ngrave.io/en-us/products/zero"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

price_element = soup.find('span', class_='price-item--regular')
price = price_element.get_text(strip=True)

assert price == "$398.00 USD", f"Failed: Price '{price}' does not match expected value"

print(price)
