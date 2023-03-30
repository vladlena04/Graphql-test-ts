import { Page } from "@playwright/test";
const chalk = require('chalk');

export const color = {
  success: chalk.bold.hex('838f89'),
  error: chalk.bold.hex('e55768'),
  warning: chalk.bold.hex('9e6068'),
  info: chalk.hex('1da15a'),
  outgoingRequest: chalk.hex('6e15b3'),
  incomingRequest: chalk.hex('127f7f'),
  request: chalk.hex('6e15b3'),
  response: chalk.hex('127f7f')
};

export async function logger(page: Page){
  page.on('request', request => 
    console.log(color.outgoingRequest('>>', request.method(), request.url()))
  );
  page.on('response', response =>
    console.log(color.incomingRequest('<<', response.status(), response.url()))
  );
  page.on('console', msg => {
    if(msg.type() == 'error'){
      console.log(color.error(msg.text));
    }
  });
};