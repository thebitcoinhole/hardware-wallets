import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://onekey.so/products/onekey-pro-hardware-wallet/"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

product_element = soup.find('span', string='OneKey Pro')

if product_element:
    price_element = product_element.find_next_sibling('span')
    if price_element:
        price = price_element.get_text(strip=True)
    else:
        print("Price not found.")
else:
    print("Product not found.")

assert price == "$278", f"Failed: Price '{price}' does not match expected value"

print(price)
