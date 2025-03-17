import { prisma } from "../config/database.js";
import { ErrorHandler } from "../errorHandler/errorHandler.js";
const additionController = async function(req, res){
    try{
        
        const result = req.operand1+req.operand2;
        
        const newOperations = await prisma.mathOperation.create({
            data: {
                type: req.type,
                operand1: req.operand1, 
                operand2: req.operand2,
                result: result.toString()
            }
        })

        console.log("newOperation=> ",newOperations);
    return res.status(200).json({result: `operation completed successfully. num1=> ${req.operand1}, num2=> ${req.operand2} and result=> ${result}`})
    }
    catch(error){
            return res.status(400).json({
            success: false,
            message: error.message || "Something went wrong."
        });
    }
}

const multiplicationController = async function(req,res){
    try{
        const result = req.operand1*req.operand2;
        
        const newOperations = await prisma.mathOperation.create({
            data: {
                type: req.type,
                operand1: req.operand1, 
                operand2: req.operand2,
                result: result.toString()
            }
        })

        console.log("newOperation=> ",newOperations);
    return res.status(200).json({result: `operation completed successfully. num1=> ${req.operand1}, num2=> ${req.operand2} and result=> ${result}`})
    }
    catch(error){
            return res.status(400).json({
            success: false,
            message: error.message || "Something went wrong."
        });
    }
}

const factorialController = async function(req,res){
    try{
        const result = getFactorial(req.operand);

        const newOparations = await prisma.mathOperation.create({
            data: {
                type: req.type,
                operand1: req.operand, 
                result: result.toString()
            }
        })

        console.log("newOperation=> ", newOparations);
        return res.status(200).json({result: `operation completed successfully. result=> ${result}`});
    }

    catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || "something went wrong."
        });
    }
}

const fibonacciController = async function(req,res){
    try{
        const result = getFibonacci(req.count);

        const newOperations = await prisma.mathOperation.create({
            data: {
                type: req.type,
                count: req.count,
                result: result.toString()
            }
        })

        console.log("newOperation=> ", newOperations);
        return res.status(200).json({result: `operation completed successfully.`})
    }
    catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || "something went wrong."
        })
    }
}

const getAllOperationsController = async function(req, res){
    try{
        const result = await prisma.mathOperation.findMany();
        return res.status(200).json({result:result})
    }
    catch(error){
        return res.status(400).json({
            success: false,
            message: error.message || "something went wrong."
        })
    }
}

const deleteOperationController = async function(req, res){
    try{
        const result = await prisma.mathOperation.delete({
            where: {id: req.id}
        })

        return res.status(200).json({result: "operation deleted successfully."});
    }
    catch(error){

        if(error.code === "P2025")
        return res.status(400).json({
            success: false,
            message: "result not found."
        })

        return res.status(400).json({
            success: false,
            message: "something went wrong."
        })
    }
}

const updateOperationController = async function(req, res){
    try{
        const expression = req.type;
        const row = await prisma.mathOperation.findUnique({
            where: {
                id: req.id
            }
        })

        switch(expression){
            case "addition":
                const result_add = req.operand1+req.operand2;
                const data_add = await prisma.mathOperation.update({
                    where: {id: req.id},
                    data: {
                        type: req.type,
                        operand1: req.operand1, 
                        operand2: req.operand2,
                        count: null,
                        result: result_add.toString()
                    }
                })

                break;
            case "multiplication":
                const result_mul = req.operand1*req.operand2;
                const data_mul = await prisma.mathOperation.update({
                    where: {id: req.id},
                    data: {
                        type: req.type,
                        operand1: req.operand1, 
                        operand2: req.operand2,
                        count: null,
                        result: result_mul.toString()
                    }
                })
                break;
            
            case "factorial":
                const result_fac = getFactorial(req.operand);
                const data_fac = await prisma.mathOperation.update({
                    where: {id: req.id},
                    data: {
                        type: req.type,
                        operand1: req.operand,
                        operand2:null,
                        count:null,
                        result: result_fac.toString()
                    }
                })
                break;
            
            case "fibonacci":
                const result_fib = getFibonacci(req.count);
                const data_fib = await prisma.mathOperation.update({
                    where: {id: req.id},
                    data: {
                        operand1:null,
                        operand2:null,
                        type: req.type,
                        count: req.count, 
                        result: result_fib.toString()
                    }
                })
                break;
            
            default:
                throw new ErrorHandler("invalid operation.",422);
        }

        return res.status(200).json({result: "operation updated successfully."});
    }

    catch(error){
        if(error.code === "P2025")
            return res.status(400).json({
                success: false,
                message: "result not found."
            })
    
            return res.status(error.statusCode).json({
                success: false,
                message: error.message || "something went wrong."
            })
    }
}

const getFactorial = function(number){
    if(number == 0)
        return 1;
    
    let num = 1;
    for(let i=1;i<=number; i++){
        num *= i;
    }

    return num;
}

const getFibonacci = function(count){
    if(count == 1)
        return [1];

    if(count == 2)
        return [1,1];

    const prevFib = getFibonacci(count-1);
    let fib = [...prevFib, prevFib[prevFib.length-1]+prevFib[prevFib.length-2]];
    return fib;
}

export {additionController, multiplicationController, factorialController, fibonacciController, getAllOperationsController, deleteOperationController, updateOperationController, getFactorial, getFibonacci};