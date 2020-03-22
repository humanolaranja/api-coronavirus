# api-coronavirus
api to return safe data about covid-19

source 1: [Ministério da Saúde](http://plataforma.saude.gov.br/novocoronavirus/) (OFF)

source 2: [Globo](https://especiais.g1.globo.com/bemestar/coronavirus/mapa-coronavirus/)

# routes

| url                | information                      | source |
| ------------------ |:--------------------------------:|:------:|
| `/`                | raw data without parse           | 1      |
| `/world`           | all data through world           | 1      | 
| `/world/last`      | last data through world          | 1      | 
| `/world/total`     | total cases through world        | 1      |
| `/brazil`          | all data through brazil          | 1      |
| `/brazil/last`     | last data through brazil         | 1      |
| `/brazil/total`    | total cases through brazil       | 1      |
| `/v2`              | raw brazil data without parse    | 2      |
| `/v2/brazil`       | all data through brazil by state | 2      |
| `/v2/brazil/total` | total cases through brazil       | 2      |


## available [here](http://dados-br-covid-19.gama-tdc-poa-ai-5290c8c8e5797924dc1ad5d1b85b37c0-0002.us-south.containers.appdomain.cloud)

