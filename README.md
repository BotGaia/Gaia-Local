[![Build Status](https://travis-ci.org/wendybot/Wendy-Local.svg?branch=dev)](https://travis-ci.org/wendybot/Wendy-Local)
[![Maintainability](https://api.codeclimate.com/v1/badges/4d1a87b0429c1ba7d3a4/maintainability)](https://codeclimate.com/github/wendybot/Wendy-Local/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4d1a87b0429c1ba7d3a4/test_coverage)](https://codeclimate.com/github/wendybot/Wendy-Local/test_coverage)

# Gaia-Local

## Objetivo
Esse serviço é responsável por pegar a longitude e a latitude a partir do nome de um local através da API da [Open Cage Data](https://opencagedata.com/api).

## Como usar

### Como rodar
Primeiro tem que instalar o docker e o docker compose, em seguida rode o projeto como desenvolvimento da seguinte maneira:

``` $ sudo docker-compose up --build ```

Para rodar a folha de estilo, utilize este comando:

``` $ sudo docker-compose run gaialocal /bin/sh -c "cd /app; npm i; npm run lint" ```

Para rodar os testes, utilize:

``` $ sudo docker-compose run gaialocal /bin/sh -c "cd /app; npm i; npm run test" ```

### Endpoints
<table>
	<tr>
		<td>GET</td>
		<td>localhost:3001/local?address={VALOR}</td>
		<td>address</td>
		<td>String</td>
		<td>Recebe o nome e coordenadas dos locais que atendem o local informado</td>
	</tr>
</table>
