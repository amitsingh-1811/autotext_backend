import { ErrorHandler } from "../errorHandler/errorHandler.js";
const additionMiddleware = async function(req, res, next){
    try{
        const {operand1, operand2, operation} = req.body;

        if(operand1==undefined || operand2==undefined)
            throw new ErrorHandler("both operand should be required.",400);
        if(operation.toLowerCase() != "addition")
            throw new ErrorHandler("unidentified operation.",422);
        req.operand1 = parseFloat(operand1);
        req.operand2 = parseFloat(operand2);
        req.type = operation
        console.log("req.body=> ",req.body)

        next();
    }

    catch(error){
        return res.status(error.statusCode).json({error:error.message});
    }
}

const multiplicationMiddleware = async function(req, res, next){
    try{
        const {operand1, operand2, operation} = req.body;

        if(operand1==undefined || operand2==undefined)
            throw new ErrorHandler("both operand should be required.",400);
        if(operation.toLowerCase() != "multiplication")
            throw new ErrorHandler("unidentified operation.",422);
        req.operand1 = parseFloat(operand1);
        req.operand2 = parseFloat(operand2);
        req.type = operation
        console.log("req.body=> ",req.body)

        next();
    }

    catch(error){
        return res.status(error.statusCode).json({error:error.message});
    }
}


const factorialMiddleware = async function(req, res, next){
    try{
        const {operand, operation} = req.body;

        if(operand==undefined)
            throw new ErrorHandler("operand should be required.",400);
        if(!Number.isInteger(operand))
            throw new ErrorHandler("please give valid integer as input.",422);
        if(operation.toLowerCase() != "factorial")
            throw new ErrorHandler("unidentified operation.",422);
        req.operand = parseInt(operand);
        req.type = operation
        console.log("req.body=> ",req.body)

        next();
    }

    catch(error){
        return res.status(error.statusCode).json({error:error.message});
    }
}

const fibonacciMiddleware = async function(req, res, next){
    try{
        const {count, operation} = req.body;

        if(count==undefined)
            throw new ErrorHandler("operand should be required.",400);
        if(!Number.isInteger(count))
            throw new ErrorHandler("please give valid integer as input.",422);
        if(operation.toLowerCase() != "fibonacci")
            throw new ErrorHandler("unidentified operation.",422);
        req.count = parseInt(count);
        req.type = operation
        console.log("req.body=> ",req.body)

        next();
    }

    catch(error){
        return res.status(error.statusCode).json({error:error.message});
    }
}

const deleteOperationMiddleware = async function(req, res, next){
    try{
        const id = req.headers.id;
        if(!id)
            throw new ErrorHandler("id not found.",400);
        req.id = id;
        next();
    }

    catch(error){
        return res.status(error.statusCode).json({error: error.message});
    }
}

const updateOperationMiddleware = async function(req, res, next){
    try{
        const {operand, operand1, operand2, operation, count} = req.body;
        const id = req.headers.id;
        const expression = operation.toLowerCase();
        if(!id)
            throw new ErrorHandler("id not found.",400);

        switch(expression){
            case "addition":
                if(operand1===undefined || operand2===undefined)
                    throw new ErrorHandler("both operand are required.",400)
                req.operand1 = parseFloat(operand1);
                req.operand2 = parseFloat(operand2);
                req.type = operation
                req.id = id
                break;
            case "multiplication":
                if(operand1===undefined || operand2===undefined)
                    throw new ErrorHandler("both operand are required.",400)
                req.operand1 = parseFloat(operand1);
                req.operand2 = parseFloat(operand2);
                req.type = operation
                req.id = id
                break;
            case "factorial":
                if(operand===undefined)
                    throw new ErrorHandler("operand required.",400)
                req.operand = parseFloat(operand)
                req.type = operation
                req.id = id
                break;
            case "fibonacci":
                if(count===undefined)
                    throw new ErrorHandler("count required.",400)
                req.count = count;
                req.type = operation
                req.id = id
                break;
            default:
                throw new ErrorHandler("invalid operation.",422)
        }

        next();
    }

    catch(error){
        return res.status(error.statusCode).json({error: error.message})
    }
}

export {additionMiddleware, multiplicationMiddleware, factorialMiddleware, fibonacciMiddleware, deleteOperationMiddleware, updateOperationMiddleware};