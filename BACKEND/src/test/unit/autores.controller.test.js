const httpMocks = require('node-mocks-http');
const { describe, it, expect, afterEach } = require('@jest/globals');

jest.mock('../../config/configuration', () => ({
  config: {
    db: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'libreria_test'
    },
    service: {
      port: 3001
    }
  }
}));

jest.mock('../../models/db', () => ({
  query: jest.fn()
}));

jest.mock('../../services/autores.service');

const autoresController = require('../../controllers/autores.controller');
const autoresService = require('../../services/autores.service');
const mockedGetAllAutores = jest.spyOn(autoresService, 'getAllAutores');
const mockedGetAutorById = jest.spyOn(autoresService, 'getAutorById');
const mockedCreateAutor = jest.spyOn(autoresService, 'createAutor');
const mockedUpdateAutor = jest.spyOn(autoresService, 'updateAutor');
const mockedDeleteAutor = jest.spyOn(autoresService, 'deleteAutor');

const { mockAutoresArray, mockAutor, mockAutorToCreate, mockCreatedAutor } = require('./mocks/autores');

afterEach(() => {
    jest.clearAllMocks();
});

describe('autores controller', () => {
    it('GET /api/autores should get authors list', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/api/autores';

        const mockedAutoresList = jest.fn(async () => {
            return mockAutoresArray;
        });
        mockedGetAllAutores.mockImplementation(mockedAutoresList);

        await autoresController.getAllAutores(request, response);
        expect(mockedGetAllAutores).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().length).toEqual(3);
    });

    it('GET /api/autores/:id should get author by id', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/api/autores/1';
        request.params = { id: '1' };

        const mockedAutorById = jest.fn(async () => {
            return mockAutor;
        });
        mockedGetAutorById.mockImplementation(mockedAutorById);

        await autoresController.getAutorById(request, response);
        expect(mockedGetAutorById).toHaveBeenCalledTimes(1);
        expect(mockedGetAutorById).toHaveBeenCalledWith('1');
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().id).toEqual(1);
        expect(response._getJSONData().nombre).toEqual('Gabriel García Márquez');
    });

    it('GET /api/autores/:id should return 404 when author not found', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/api/autores/999';
        request.params = { id: '999' };

        const mockedAutorById = jest.fn(async () => {
            return null;
        });
        mockedGetAutorById.mockImplementation(mockedAutorById);

        await autoresController.getAutorById(request, response);
        expect(mockedGetAutorById).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(404);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().mensaje).toEqual('Autor no encontrado');
    });

    it('POST /api/autores should create a new author', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/api/autores';
        request.body = mockAutorToCreate;

        jest.doMock('express-validator', () => ({
            validationResult: jest.fn(() => ({
                isEmpty: () => true
            }))
        }));

        const mockedCreateAutorResponse = jest.fn(async () => {
            return mockCreatedAutor;
        });
        mockedCreateAutor.mockImplementation(mockedCreateAutorResponse);

        await autoresController.createAutor(request, response);
        expect(mockedCreateAutor).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(201);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().id).toEqual(4);
        expect(response._getJSONData().nombre).toEqual('Nuevo Autor');
    });

    it('PUT /api/autores/:id should update an author', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/api/autores/1';
        request.params = { id: '1' };
        request.body = mockAutorToCreate;

        jest.doMock('express-validator', () => ({
            validationResult: jest.fn(() => ({
                isEmpty: () => true
            }))
        }));

        const mockedUpdateAutorResponse = jest.fn(async () => {
            return;
        });
        mockedUpdateAutor.mockImplementation(mockedUpdateAutorResponse);

        await autoresController.updateAutor(request, response);
        expect(mockedUpdateAutor).toHaveBeenCalledTimes(1);
        expect(mockedUpdateAutor).toHaveBeenCalledWith('1', mockAutorToCreate);
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().mensaje).toEqual('Autor actualizado correctamente');
    });

    it('DELETE /api/autores/:id should delete an author', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/api/autores/1';
        request.params = { id: '1' };

        const mockedDeleteAutorResponse = jest.fn(async () => {
            return;
        });
        mockedDeleteAutor.mockImplementation(mockedDeleteAutorResponse);

        await autoresController.deleteAutor(request, response);
        expect(mockedDeleteAutor).toHaveBeenCalledTimes(1);
        expect(mockedDeleteAutor).toHaveBeenCalledWith('1');
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().mensaje).toEqual('Autor eliminado correctamente');
    });
});