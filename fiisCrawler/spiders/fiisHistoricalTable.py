import scrapy
from scrapy import Request
import requests
import json
import re
import datetime

tickers = []
tickersCrawled = []

format_str = '%d/%m/%Y'

class FiisHistoricalTableSpider(scrapy.Spider):
    name = 'fiis'
    allowed_domains = ['fiis.com.br']
    start_urls = ['http://fiis.com.br/']

    res = requests.get('http://localhost:3333/fiis')
    fiis = res.json()
    for fii in fiis:
        tickers.append(fii['ticker'])

    def start_requests(self):
        for ticker in tickers:
            yield Request('https://fiis.com.br/{}'.format(ticker), callback=self.parse)

    def parse(self, response):
        rows = response.xpath('//*[@id="last-revenues--table"]/tbody/tr')
        data = []
        for row in rows:

            paymentDateObj = datetime.datetime.strptime(row.xpath('td[2]//text()').extract_first(), "%d/%m/%y")
            paymentDateMonth = paymentDateObj.strftime("%m")
            
            currrentTime = datetime.datetime.now()
            currentMonth = currrentTime.strftime("%m")

            # baseDate: row.xpath('td[1]//text()').extract_first()
            # # paymentDate: row.xpath('td[2]//text()').extract_first()
            # priceBaseDate: row.xpath('td[3]//text()').extract_first()
            # dy: row.xpath('td[4]//text()').extract_first()
            # dividend: row.xpath('td[5]//text()').extract_first()

            if (currentMonth == paymentDateMonth):
                url = response.request.url
                ticker = url[20:26].upper()
                # baseDate: row.xpath('td[1]//text()').extract_first()
                # paymentDate: row.xpath('td[2]//text()').extract_first()
                # priceBaseDate: row.xpath('td[3]//text()').extract_first()
                # dy: row.xpath('td[4]//text()').extract_first()
                # dividend: row.xpath('td[5]//text()').extract_first()
                payload = {
                    'ticker': ticker,
                    'baseDate': datetime.datetime.strptime(row.xpath('td[1]//text()').extract_first(), "%d/%m/%y"),
                    'paymentDate': datetime.datetime.strptime(row.xpath('td[2]//text()').extract_first(), "%d/%m/%y"),
                    'priceBaseDate': float(row.xpath('td[3]//text()').extract_first().replace('R$ ', '').replace(',', '.')),
                    'dy': float(row.xpath('td[4]//text()').extract_first().replace('%', '').replace(',', '.')),
                    'dividend': float(row.xpath('td[5]//text()').extract_first().replace('R$ ', '').replace(',', '.')),
                }
                print(payload)
                request = requests.post('http://localhost:3333/update', data=payload)
            
            # baseDate: row.xpath('td[1]//text()').extract_first()
            # paymentDate: row.xpath('td[2]//text()').extract_first()
            # priceBaseDate: row.xpath('td[3]//text()').extract_first()
            # dy: row.xpath('td[4]//text()').extract_first()
            # dividend: row.xpath('td[5]//text()').extract_first()

            fiiData = {
                'baseDate': datetime.datetime.strptime(row.xpath('td[1]//text()').extract_first(), "%d/%m/%y").__str__(),
                'paymentDate': datetime.datetime.strptime(row.xpath('td[2]//text()').extract_first(), "%d/%m/%y").__str__(),
                'priceBaseDate': float(row.xpath('td[3]//text()').extract_first().replace('R$ ', '').replace(',', '.')).__str__(),
                'dy': float(row.xpath('td[4]//text()').extract_first().replace('%', '').replace(',', '.')),
                'dividend': float(row.xpath('td[5]//text()').extract_first().replace('R$ ', '').replace(',', '.')),
            }
            data.append(json.dumps(fiiData))

        url = response.request.url
        ticker = url[20:26].upper()
        payload = {
            'ticker': ticker,
            'historic': data
        }
        print(payload)
        request = requests.post('http://localhost:3333/update', data=payload)