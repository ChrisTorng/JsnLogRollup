import {JL} from 'jsnlog';

let message: string = "jsnlog message";

// comment this can make rollup work
JL().info(message);

document.body.textContent = message;