Easy ways to use logs and send them to rabbitmq in your service for TypeScript

# Examples

## Initialize once

**index.ts**
  
    import logger from 'logger-genesis';
    
    logger.initialize('systemA', 'serviceA', 'amqp://localhost', false, 'log-queue');
    

## Usage
  
**service.ts**

    import logger from 'logger-genesis';
  
    logger.logError(false, 'Unknown error', 'APP', err.message);
    
**controller.ts**

    import logger from 'logger-genesis';
  
    logger.logWarn(false, 'Invalid identityCard', 'APP', `Got invalid identityCard ${identityCard}`, {id: identityCard, userID});
  

## Methods
-   initialize()

-   logInfo()

-   logWarn()

-   logError()


## Params

**initialize**
-   system -> Name of the system

-   service -> Name of the service

-   uri -> Connection URI of rabbitmq

-   createRabbitConnection -> True if need to create connection to RabbitMQ

-   retryOptions -> retryOption to connect to RabbitMQ (details in menashmq readme)



**logInfo/logWarn/logError**
-   local -> True if only local log, otherwise send to queue

-   title -> Title of the log

-   scope -> The scope of the log - APP / SYSTEM

-   message -> The message of the log

-   extraFields -> Extra fields that you want to add (Like id, runUID and etc.)
