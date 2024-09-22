import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://store.coinkite.com/store/ts-blue"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

price_element = soup.find('div', class_='price')
price = price_element.contents[0].strip()

assert price == "$19.99", f"Failed: Price '{price}' does not match expected value"

print(price)
