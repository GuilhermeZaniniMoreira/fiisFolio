import scrapy
import requests

url = 'http://localhost:3333/fiis'

tickers = []
names = []

class FiiscsvSpider(scrapy.Spider):
    name = 'fiisCSV'
    allowed_domains = ['fiis.com.br']
    start_urls = ['https://fiis.com.br/lista-de-fundos-imobiliarios/']

    def parse(self, response):

        tickers_span = response.xpath("//div[@class='item']/following::span[@class='ticker']/text()")
        names_span = response.xpath("//div[@class='item']/following::span[@class='name']/text()")

        for ticker in tickers_span:
            tickers.append(ticker.get())
        
        for name in names_span:
            names.append(name.get())

        print(tickers)
        print(names)

        for index, ticker in enumerate(tickers):
            data = {
                'name': names[index],
                'ticker': ticker
            }
            request = requests.post(url, data=data)