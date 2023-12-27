import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://www.ellipal.com/products/ellipal-titan-mini"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

price_element = soup.find('span', class_='money')
price = price_element.get_text(strip=True)

assert price == "$99.00", f"Failed: Price '{price}' does not match expected value"

print(price)
