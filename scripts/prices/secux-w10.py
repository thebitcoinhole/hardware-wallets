import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://shop.secuxtech.com/products/w10-hardware-wallet-for-computer"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

p_element = soup.find('p', attrs={'data-regular-price': True})
price_element = p_element.find('span', class_='money')
price = price_element.get_text(strip=True)

assert price == "$ 69.00", f"Failed: Price '{price}' does not match expected value"

print(price)
