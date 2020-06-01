import csv
import requests

url = 'http://localhost:3333/fiis'

with open('FIIS.csv', encoding='latin-1') as csvfile:
    csv_reader = csv.reader(csvfile)
    for row in csv_reader:
        data = {
            'name': row[0],
            'fund': row[1],
            'ticker': row[2] + '11'
        }
        request = requests.post(url, data = data)