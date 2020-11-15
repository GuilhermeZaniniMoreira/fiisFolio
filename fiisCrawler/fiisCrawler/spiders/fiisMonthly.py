import scrapy
from scrapy import Request
import requests
import json
import re
import datetime

tickers = []
tickersCrawled = []

format_str = '%d/%m/%Y'

class FiisSpider(scrapy.Spider):
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
    
    def myconverter(o):
        if isinstance(o, datetime.datetime):
            return o.__str__()

    def parse(self, response):

        currentMonth = response.xpath("//span[contains(@class,'title') and contains(text(),'Informou distribuição de')]")[0]

        url = response.request.url
        ticker = url[20:26].upper()
        tickersCrawled.append(ticker)

        regex = r'[R$]\s*[.,\d]+|[.,\d]+\s*[R$]'
        amount = re.findall(regex, currentMonth.get())

        regexDate = r'[\d]{1,2}/[\d]{1,2}/[\d]{4}'
        dates = re.findall(regexDate, currentMonth.get())

        paymentDate = dates[0]
        baseDate = dates[1]
        dividend = amount[0]
        priceBaseDate = amount[1]

        baseDate = datetime.datetime.strptime(baseDate, format_str)
        paymentDate = datetime.datetime.strptime(paymentDate, format_str)

        dividend = dividend[2:]
        dividend = float(dividend.replace(".","").replace(",","."))
        priceBaseDate = priceBaseDate[2:]
        priceBaseDate = float(priceBaseDate.replace(".","").replace(",","."))
        
        data = {
            'ticker': ticker,
            'baseDate': baseDate.__str__(),
            'paymentDate': paymentDate.__str__(),
            'priceBaseDate': priceBaseDate.__str__(),
            'dividend': dividend
        }

        request = requests.post('http://localhost:3333/update', data=data)