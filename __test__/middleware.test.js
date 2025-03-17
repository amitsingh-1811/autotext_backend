import {
  additionMiddleware,
  multiplicationMiddleware,
  factorialMiddleware,
  fibonacciMiddleware,
  deleteOperationMiddleware,
  updateOperationMiddleware,
} from '../middleware/middleware.js';
import { ErrorHandler } from '../errorHandler/errorHandler.js';

describe('Middleware Tests', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, headers: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  describe('additionMiddleware', () => {
    test('should throw 400 if any operand is missing', async () => {
      req.body = { operand2: 2, operation: 'addition' };
      await additionMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'both operand should be required.' });
    });

    test('should throw 422 for invalid operation', async () => {
      req.body = { operand1: 1, operand2: 2, operation: 'subtract' };
      await additionMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({ error: 'unidentified operation.' });
    });

    test('should set operands and call next() for valid input', async () => {
      req.body = { operand1: '5', operand2: '3', operation: 'ADDITION' };
      await additionMiddleware(req, res, next);
      expect(req.operand1).toBe(5);
      expect(req.operand2).toBe(3);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('multiplicationMiddleware', () => {
    test('should throw 400 if any operand is missing', async () => {
      req.body = { operand1: 2, operation: 'multiplication' };
      await multiplicationMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'both operand should be required.' });
    });

    test('should throw 422 for invalid operation', async () => {
      req.body = { operand1: 1, operand2: 2, operation: 'divide' };
      await multiplicationMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({ error: 'unidentified operation.' });
    });

    test('should set operands and call next() for valid input', async () => {
      req.body = { operand1: 4, operand2: 3, operation: 'Multiplication' };
      await multiplicationMiddleware(req, res, next);
      expect(req.operand1).toBe(4);
      expect(req.operand2).toBe(3);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('factorialMiddleware', () => {
    test('should throw 400 if operand is missing', async () => {
      req.body = { operation: 'factorial' };
      await factorialMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'operand should be required.' });
    });

    test('should throw 422 for non-integer operand', async () => {
      req.body = { operand: 5.5, operation: 'factorial' };
      await factorialMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({ error: 'please give valid integer as input.' });
    });

    test('should set operand and call next() for valid input', async () => {
      req.body = { operand: 5, operation: 'FACTORIAL' };
      await factorialMiddleware(req, res, next);
      expect(req.operand).toBe(5);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('fibonacciMiddleware', () => {
    test('should throw 400 if count is missing', async () => {
      req.body = { operation: 'fibonacci' };
      await fibonacciMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'operand should be required.' });
    });

    test('should throw 422 for non-integer count', async () => {
      req.body = { count: 'five', operation: 'fibonacci' };
      await fibonacciMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({ error: 'please give valid integer as input.' });
    });

    test('should set count and call next() for valid input', async () => {
      req.body = { count: 10, operation: 'FIBONACCI' };
      await fibonacciMiddleware(req, res, next);
      expect(req.count).toBe(10);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('deleteOperationMiddleware', () => {
    test('should throw 400 if id is missing', async () => {
      await deleteOperationMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'id not found.' });
    });

    test('should set id and call next() when present', async () => {
      req.headers.id = '123';
      await deleteOperationMiddleware(req, res, next);
      expect(req.id).toBe('123');
      expect(next).toHaveBeenCalled();
    });
  });

  describe('updateOperationMiddleware', () => {
    test('should throw 400 if id is missing', async () => {
      req.body = { operation: 'addition', operand1: 1, operand2: 2 };
      await updateOperationMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'id not found.' });
    });

    test('should handle addition operation validation', async () => {
      req.headers.id = '123';
      req.body = { operation: 'addition', operand1: 1 };
      await updateOperationMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'both operand are required.' });
    });

    test('should handle multiplication operation validation', async () => {
      req.headers.id = '123';
      req.body = { operation: 'multiplication', operand1: 1 };
      await updateOperationMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'both operand are required.' });
    });

    test('should handle factorial operation validation', async () => {
      req.headers.id = '123';
      req.body = { operation: 'factorial' };
      await updateOperationMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'operand required.' });
    });

    test('should handle fibonacci operation validation', async () => {
      req.headers.id = '123';
      req.body = { operation: 'fibonacci' };
      await updateOperationMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'count required.' });
    });

    test('should throw 422 for invalid operation', async () => {
      req.headers.id = '123';
      req.body = { operation: 'invalid' };
      await updateOperationMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith({ error: 'invalid operation.' });
    });

    test('should handle valid addition update', async () => {
      req.headers.id = '123';
      req.body = { operation: 'addition', operand1: 5, operand2: 3 };
      await updateOperationMiddleware(req, res, next);
      expect(req.operand1).toBe(5);
      expect(req.operand2).toBe(3);
      expect(next).toHaveBeenCalled();
    });

    test('should handle valid factorial update', async () => {
      req.headers.id = '123';
      req.body = { operation: 'factorial', operand: 5 };
      await updateOperationMiddleware(req, res, next);
      expect(req.operand).toBe(5);
      expect(next).toHaveBeenCalled();
    });
  });
});