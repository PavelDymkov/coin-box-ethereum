## CoinBox smart-contract


**_Тестовый проект_**


### Настройка среды окружения


Для развертывания проекта необходимо установить
[Node.js](https://nodejs.org/) LTS версии


Затем выполнить в директории проекта команду


```bash
npm install
```


Также будет необходим Etherium-кошелек
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


4. Запускаем Mist с подключением к тестовой сети


```bash
mist --rpc http://localhost:8545 --swarmurl="http://swarm-gateways.net"
```


(для Ubuntu)


```bash
/opt/Mist/mist --rpc http://localhost:8545 --swarmurl="http://swarm-gateways.net"
```


5. Во вкладке "Контракты", нажимаем "НАБЛЮДАТЬ ЗА КОНТРАКТОМ"


Адрес контракта и его название берем из `./deployed-info.json`
(`address` и `name`, соответственно), JSON интерфейс берется
из `./build/contracts/CoinBox.json` (значение свойства `abi`)


*Дальше, к сожалению, пока не работает*
([см issue](https://github.com/trufflesuite/ganache-cli/issues/236))
