import requests
from bs4 import BeautifulSoup

# Send a GET request to the website
url = "https://store.cypherock.com/product/cypherock-x1/"
response = requests.get(url)

# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.text, 'html.parser')

ins_element = soup.find('ins')
price_element = ins_element.find('span', class_='woocommerce-Price-amount amount').find('bdi')
price = price_element.get_text(strip=True)

assert price == "$199.00", f"Failed: Price '{price}' does not match expected value"

print(price)
