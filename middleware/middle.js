const chalk =  require('chalk');

const middle = (req, res, next) => {
    let color;
    console.log('HELLO');
    switch(req.method) {
        case 'GET':
            color = chalk.green;
            break;
        case 'POST':
            color = chalk.blue;
            break;
        case 'DELETE':
            color = chalk.yellow;
            break;
        default:
            color = chalk.white;
    }

    const colorMethod = color.bold(req.method);
    console.log(`Request Method: ${colorMethod}`)
    
    next();
};

module.exports = middle;