import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://trezor.io/trezor-model-one"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

price_element = soup.find('span', class_='w-fit')
price = price_element.get_text(strip=True)

assert price == "$69", f"Failed: Price '{price}' does not match expected value"

print(price)
