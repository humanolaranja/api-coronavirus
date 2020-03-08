# api-coronavirus
api to return safe data about covid-19

source: [Ministério da Saúde](http://plataforma.saude.gov.br/novocoronavirus/)

# routes

| url             | information               |
| --------------- |:-------------------------:|
| `/`             | raw data without parse    | 
| `/world`        | all data through world    | 
| `/world/last`   | last data through world   | 
| `/world/total`  | total cases through world | 
| `/brazil`       | all data through brazil   | 
| `/brazil/last`  | last data through brazil  | 
| `/brazil/total` | total cases through world | 

## available in [heroku](https://api-coronavirus.herokuapp.com)