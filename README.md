## CoinBox smart-contract


**_Тестовый проект_**


### Настройка среды окружения


Для развертывания проекта необходимо установить
[Node.js](https://nodejs.org/) LTS версии


Затем выполнить в директории проекта команду


```bash
npm install
```


Также будет необходим
[Geth](https://geth.ethereum.org/downloads/)
и Etherium-кошелек
[Mist](https://github.com/ethereum/mist/releases)


### Запуск тестов


1. Скомпилировать смарт-контракт


```bash
npm run compile
```


2. Запустить тестовую сеть


```bash
npm run test-network
```


3. Запустить тесты


```bash
npm run test
```


### Деплой смарт контракта в локальную сеть Etherium


1. Скомпилировать смарт-контракт


```bash
npm run compile
```


2. Запустить локальную сеть Etherium


```bash
npm run local-etherium-network
```


После запуска, сети нужно дать прогреться и намайнать немного эфира.


3. Выполнить деплой


```bash
npm run deploy-to-local-etherium-network
```


4. Запускаем Mist с подключением к тестовой сети


```bash
mist --rpc http://localhost:8545 --swarmurl="http://swarm-gateways.net"
```


(для Ubuntu)


```bash
/opt/Mist/mist --rpc http://localhost:8545 --swarmurl="http://swarm-gateways.net"
```


5. Во вкладке "Контракты", нажимаем "НАБЛЮДАТЬ ЗА КОНТРАКТОМ"


Адрес контракта и его название берем из `local-etherium/deployed-info.json`
(`address` и `name`, соответственно), JSON интерфейс берется
из `build/contracts/CoinBox.json` (значение свойства `abi`)


### Деплой смарт контракта в тестовую сеть


1. Скомпилировать смарт-контракт


```bash
npm run compile
```


2. Запустить тестовую сеть


```bash
npm run test-network
```


3. Выполнить деплой


```bash
npm run deploy-to-test-network
```
