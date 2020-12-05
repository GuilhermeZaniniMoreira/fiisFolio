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
        table = response.xpath('//*[@id="last-revenues--table"]/tbody')
        print(table)