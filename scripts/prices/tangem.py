import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://tangem.com/en/pricing/"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

price_element = soup.find('div', id='pack-2-price')

print(price_element)

price = price_element.get_text(strip=True)

assert price == "$54.90", f"Failed: Price '{price}' does not match expected value"

print(price)
