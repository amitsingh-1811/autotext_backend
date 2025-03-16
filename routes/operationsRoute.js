import express from 'express';
import { additionMiddleware, deleteOperationMiddleware, factorialMiddleware, fibonacciMiddleware, multiplicationMiddleware, updateOperationMiddleware } from '../middleware/middleware.js';
import { additionController, deleteOperationController, factorialController, fibonacciController, getAllOperationsController, multiplicationController, updateOperationController } from '../controller/operationsController.js';

const router = express.Router();

router.route("/addTwoNumber").post(additionMiddleware, additionController);
router.route("/multiplyTwoNumber").post(multiplicationMiddleware,multiplicationController);
router.route("/getFactorial").post(factorialMiddleware, factorialController);
router.route("/getFibonacci").post(fibonacciMiddleware, fibonacciController);
router.route("/getAllOperations").get(getAllOperationsController);
router.route("/deleteOperation").delete(deleteOperationMiddleware, deleteOperationController);
router.route("/updateOperation").put(updateOperationMiddleware, updateOperationController);

export {router};