import {
  additionController,
  multiplicationController,
  factorialController,
  fibonacciController,
  getAllOperationsController,
  deleteOperationController,
  updateOperationController,
  getFactorial,
  getFibonacci
} from '../controller/operationsController.js';
import { prisma } from '../config/database.js';
import { ErrorHandler } from '../errorHandler/errorHandler.js';

// Mock Prisma client
jest.mock('../config/database.js', () => ({
  prisma: {
    mathOperation: {
      create: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn()
    }
  }
}));

describe('Operation Controller Tests', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { 
      operand1: 5,
      operand2: 3,
      operand: 5,
      count: 5,
      type: 'addition',
      id: '1'
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('Core Functionality', () => {
    test('getFactorial returns correct factorial', () => {
      expect(getFactorial(5)).toBe(120);
      expect(getFactorial(0)).toBe(1);
    });

    test('getFibonacci returns correct sequence', () => {
      expect(getFibonacci(1)).toEqual([1]);
      expect(getFibonacci(5)).toEqual([1, 1, 2, 3, 5]);
    });
  });

  describe('additionController', () => {
    test('should create addition operation and return result', async () => {
      prisma.mathOperation.create.mockResolvedValue({ id: 1 });
      await additionController(req, res);
      
      expect(prisma.mathOperation.create).toHaveBeenCalledWith({
        data: {
          type: 'addition',
          operand1: 5,
          operand2: 3,
          result: '8'
        }
      });
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('should handle database errors', async () => {
      prisma.mathOperation.create.mockRejectedValue(new Error('DB Error'));
      await additionController(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('multiplicationController', () => {
    test('should create multiplication operation', async () => {
      req.type = 'multiplication';
      prisma.mathOperation.create.mockResolvedValue({ id: 1 });
      await multiplicationController(req, res);
      
      expect(prisma.mathOperation.create).toHaveBeenCalledWith({
        data: {
          type: 'multiplication',
          operand1: 5,
          operand2: 3,
          result: '15'
        }
      });
    });
  });

  describe('factorialController', () => {
    test('should calculate factorial and create record', async () => {
      req.type = 'factorial';
      prisma.mathOperation.create.mockResolvedValue({ id: 1 });
      await factorialController(req, res);
      
      expect(prisma.mathOperation.create).toHaveBeenCalledWith({
        data: {
          type: 'factorial',
          operand1: 5,
          result: '120'
        }
      });
    });
  });

  describe('fibonacciController', () => {
    test('should generate fibonacci sequence', async () => {
      req.type = 'fibonacci';
      prisma.mathOperation.create.mockResolvedValue({ id: 1 });
      await fibonacciController(req, res);
      
      expect(prisma.mathOperation.create).toHaveBeenCalledWith({
        data: {
          type: 'fibonacci',
          count: 5,
          result: [1,1,2,3,5].toString()
        }
      });
    });
  });

  describe('getAllOperationsController', () => {
    test('should fetch all operations', async () => {
      const mockOperations = [{ id: 1 }, { id: 2 }];
      prisma.mathOperation.findMany.mockResolvedValue(mockOperations);
      await getAllOperationsController({}, res);
      
      expect(res.json).toHaveBeenCalledWith({ result: mockOperations });
    });
  });

  describe('deleteOperationController', () => {
    test('should delete existing operation', async () => {
      prisma.mathOperation.delete.mockResolvedValue({ id: '1' });
      await deleteOperationController(req, res);
      
      expect(prisma.mathOperation.delete).toHaveBeenCalledWith({
        where: { id: '1' }
      });
      expect(res.json).toHaveBeenCalledWith({ result: 'operation deleted successfully.' });
    });

    test('should handle not found error', async () => {
      prisma.mathOperation.delete.mockRejectedValue({ code: 'P2025' });
      await deleteOperationController(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'result not found.'
      });
    });
  });

  describe('updateOperationController', () => {
    beforeEach(() => {
      prisma.mathOperation.findUnique.mockResolvedValue({ id: '1' });
    });

    test('should update addition operation', async () => {
      req.type = 'addition';
      await updateOperationController(req, res);
      
      expect(prisma.mathOperation.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          type: 'addition',
          operand1: 5,
          operand2: 3,
          count: null,
          result: '8'
        }
      });
    });

    test('should handle invalid operations', async () => {
      req.type = 'invalid';
      await updateOperationController(req, res);
      
      expect(res.status).toHaveBeenCalledWith(422);
    });

    test('should handle not found error', async () => {
      prisma.mathOperation.update.mockRejectedValue({ code: 'P2025' });
      await updateOperationController(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});