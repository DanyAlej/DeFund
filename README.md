# DeFund: Plataforma descentralizada para realizar donaciones a fundaciones

Con el fin de apoyar los esfuerzos de diferentes organizaciones sin ánimo de lucro de financiar sus proyectos de ayuda, se encontró que existe desconfianza entre los potenciales donantes para apoyar las causas en las que se encuentren interesados. Para que las organizaciones puedan continuar su trabajo, el número de donaciones debe aumentar. Enmarcados en este contexto el objetivo de este proyecto es la creación de una plataforma que solucione las objeciones y preocupaciones que tienen los donantes al momento de decidir apoyar una organización, como la posibilidad de hacer seguimiento de los recursos y ver los resultados obtenidos. DeFund es una plataforma creada con tecnología blockchain que pretende eliminar intermediarios en las donaciones. La plataforma soluciona exitosamente las preocupaciones de los donantes, dándoles así transparencia sobre el uso de las donaciones, manteniendo a las fundaciones responsables sobre la ejecución del proyecto y haciendo fácil la interacción de estas dos partes a través de una interfaz gráfica.

# Manual de instalación

Requerido: [Node](https://nodejs.org/dist/latest-v12.x/) and [Git](https://git-scm.com/downloads)

```bash
git clone https://github.com/DanyAlej/DeFund.git
cd DeFund
```

Luego instalaremos las dependencias de el "backend" o blockchain

```bash
npm install
```

Luego empezamos nuestra blockchain local

```bash
npx hardhat node --watch
```

Descargar [MetaMask](https://metamask.io/) en un navegador basado en Chromium. (Google Chrome, Brave, etc)

Importar en MetaMask la semilla, actulamente la que esta en uso de prueba es `test test test test test test test test test test junk`
Si ya tiene una cuenta de MetaMask es necesario que salga de esta.

Asegurese de que su MetaMask RPC es `http://localhost:8545` y el ChainID `31337`.

Ahora esta corriendo una blockchain localmente en su terminal.

En una terminal nueva, después de dirigirse al proyecto:

```bash
cd frontend
```

Instalamos las dependencias

```bash
npm install
```

Ejecutamos el frontend de React

```bash
npm start
```

La aplicación debería abrir en el navegador en http://localhost:3000/

Ya puede interactuar con la plataforma, asegurese de crear un proyecto antes de intentar realizar cualquier donación

Las donaciones deben ser realizadas con cuentas diferentes y no pueden ser la misma con la que se creo el proyecto (la cuenta de la fundación.

Grabe el siguiente demo de la aplicación para mostrar su funcionamiento.

[DEMO](https://www.loom.com/share/f708ef6d55cb41b2881e093749b818d3)


# Para correr las pruebas del contrato inteligente

Comente las siguientes líneas en el archivo hardhat.config.ts

![image](https://raw.githubusercontent.com/DanyAlej/DeFund/master/images/testMiningOff.png)

Ejecute el siguiente comando

```bash
npx hardhat test
```
