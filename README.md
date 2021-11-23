Easy ways to use logs and send them to RabbitMQ using menashmq in your service for TypeScript

# Examples

## Initialize once

**index.ts**

    import logger from 'logger-genesis';

    logger.initialize('systemA', 'serviceA', 'log-queue', false);

**app.ts**

    import logger from 'logger-genesis';

    logger.initialize('systemA', 'serviceA', 'log-queue', true, 'amqp://localhost');

## Usage

**service.ts**

    import logger from 'logger-genesis';

    logger.error(false, 'APP', 'Unknown error', err.message);

**controller.ts**

    import logger from 'logger-genesis';

    logger.warn(false, 'APP', 'Invalid identityCard', `Got invalid identityCard ${identityCard}`, {id: identityCard, userID});

## Methods

-   initialize()

-   info()

-   warn()

-   error()

## Params

**initialize**

-   system -> Name of the system

-   service -> Name of the service

-   logQueueName -> Name of the Log's Queue

-   createRabbitConnection -> True if need to create connection to rabbitMQ with menash

-   uri -> Connection URI of rabbitMQ (Needed only if createRabbitConnection is true)

-   retryOptions -> retryOption to connect to RabbitMQ (details in menashmq readme, needed only if createRabbitConnection is true)

**logInfo/logWarn/logError**

-   local -> True if only local log, otherwise send to queue

-   scope -> The scope of the log - APP / SYSTEM

-   title -> Title of the log

-   message -> The message of the log

-   extraFields -> Extra fields that you want to add (Like id, runUID and etc.)
