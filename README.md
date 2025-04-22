# Mood-Daily
Previsão do tempo feito com react

Projeto Criado para o TDE da matéria de Canva e Games

# Como funciona

## API
A partir da API de clima e da localização que é concedida pelo navegador no código:

```
const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          setError(null);
        },
```
A API é capaz de requisitar as informações necessárias para que elas apareçam na tela do navegador.

## Código

A API respondendo qual são as informações, as mesmas são comparadas com outras, como o horário atual e então, ao ser considerado a biblioteca de climas e horários no começo do código, é decidido as cores e o que está escrito no navegador.

Além disso, as informações são colocadas em seus devidos lugares nas últimas linhas do código.

## Dados padrões

Caso haja o erro na hora de passar as informações. Seja por falha da API ou pela permissão de localização sendo negada, o código irá considerar alguns dados padrões apenas para demonstração. Sendo Curitiba, 25 graus e limpo (Sem nuvens).

# Como utilizar
Ao clonar o repositório, role o comando no terminal do vs code:
```
npm install
```
Após isso, é só rodar novamente no terminal:
```
npm run dev
```
E copiar o caminho que irá aparecer no terminal. "http://localhost:5173" ou algo semelhante.

Após aceitar a permissão, o código já deve estar funcionando.