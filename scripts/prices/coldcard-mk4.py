import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://store.coinkite.com/store/coldcard"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

# Find the <p> tag with the matching class
price_container = soup.find('div', class_='price')

# Extract the price value
price = price_container.text.strip()

assert price == "$157.94", f"Failed: Price '{price}' does not match expected value"

print(price)
