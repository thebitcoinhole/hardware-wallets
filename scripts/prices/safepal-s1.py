import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://www.safepal.com/s1"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

table_item_divs = soup.find_all('div', class_='table-item')
price_div = None
for div in table_item_divs:
    item_div = div.find('div', class_='item')
    if item_div and item_div.get_text(strip=True) == 'Price':
        price_div = div.find('div', class_='s1')
        break
price = price_div.get_text(strip=True)

assert price == "$49.99", f"Failed: Price '{price}' does not match expected value"

print(price)
