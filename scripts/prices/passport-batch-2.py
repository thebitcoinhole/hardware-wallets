import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://foundation.xyz/passport/"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

price_element_container = soup.find('div', class_='buybtn')
price_element = soup.find('a', class_='btn')
price = price_element.bdi.get_text(strip=True)

assert price == "$199 - Buy Passport", f"Failed: Price '{price}' does not match expected value"

print(price)
