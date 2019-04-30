[![pipeline status](https://gitlab.com/botgaia/Gaia-Local/badges/master/pipeline.svg)](https://gitlab.com/botgaia/Gaia-Local/commits/master)
[![coverage report](https://gitlab.com/botgaia/Gaia-Local/badges/master/coverage.svg)](https://gitlab.com/botgaia/Gaia-Local/commits/master)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

# Gaia-Local

## Objetivo
Esse serviço é responsável por pegar a longitude e a latitude a partir do nome de um local através da API [Open Cage Data](https://opencagedata.com/api).

## Como contribuir

Se tiver interesse em como contribuir para o projeto, olhe nossa [wiki](https://github.com/fga-eps-mds/2019.1-Gaia).

## Como usar

### Configuração do ambiente

Antes de rodar o projeto é preciso criar um arquivo chamado `.env` na pasta raiz com o seguinte conteúdo:

~~~~
API_KEY={Sua chave da API OpenCageData}
~~~~

Para conseguir uma chave de API entre no site da [Open Cage Data](https://opencagedata.com/api)

### Como rodar

O nosso projeto utiliza o Docker e o Docker Compose como ferramentas de desenvolvimento. Para instalar eles, siga o tutorial no site oficial do [Docker](https://www.docker.com/).

Após instalar o docker rode o projeto como desenvolvimento da seguinte maneira:

``` $ sudo docker-compose up --build ```

Para rodar os testes, utilize:

``` $ sudo docker-compose run gaialocal /bin/sh -c "cd /app; npm i; npm run test" ```

Para rodar a folha de estilo, utilize este comando:

``` $ sudo docker-compose run gaialocal /bin/sh -c "cd /app; npm i; npm run lint" ```

### Endpoints

Aqui se encontra todos os endpoints desse serviço. Todos os endpoints se encontra em `localhost:3001`.

|Requisição|Endpoint|Parâmetro:Tipo|Descrição|
|:--------:|:------:|:------------:|:-------:|
|GET|/local|address: String|Recebe o nome de um local e retorna as coordenadas do local informado.|
|GET|/listLocales|address: String|Recebe o nome de um local e retorna uma lista com os possíveis locais informado.|
