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

jest.mock('../../services/libros.service');

const librosController = require('../../controllers/libros.controller');
const librosService = require('../../services/libros.service');
const mockedGetAllLibros = jest.spyOn(librosService, 'getAllLibros');
const mockedGetLibroById = jest.spyOn(librosService, 'getLibroById');
const mockedCreateLibro = jest.spyOn(librosService, 'createLibro');
const mockedUpdateLibro = jest.spyOn(librosService, 'updateLibro');
const mockedDeleteLibro = jest.spyOn(librosService, 'deleteLibro');

const { mockLibrosArray, mockLibro, mockLibroToCreate, mockCreatedLibro } = require('./mocks/libros');

afterEach(() => {
    jest.clearAllMocks();
});

describe('libros controller', () => {
    it('GET /api/libros should get books list', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/api/libros';

        const mockedLibrosList = jest.fn(async () => {
            return mockLibrosArray;
        });
        mockedGetAllLibros.mockImplementation(mockedLibrosList);

        await librosController.getAllLibros(request, response);
        expect(mockedGetAllLibros).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().length).toEqual(3);
    });

    it('GET /api/libros/:id should get book by id', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/api/libros/1';
        request.params = { id: '1' };

        const mockedLibroById = jest.fn(async () => {
            return mockLibro;
        });
        mockedGetLibroById.mockImplementation(mockedLibroById);

        await librosController.getLibroById(request, response);
        expect(mockedGetLibroById).toHaveBeenCalledTimes(1);
        expect(mockedGetLibroById).toHaveBeenCalledWith('1');
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().id).toEqual(1);
        expect(response._getJSONData().titulo).toEqual('Cien años de soledad');
    });

    it('GET /api/libros/:id should return 404 when book not found', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/api/libros/999';
        request.params = { id: '999' };

        const mockedLibroById = jest.fn(async () => {
            return null;
        });
        mockedGetLibroById.mockImplementation(mockedLibroById);

        await librosController.getLibroById(request, response);
        expect(mockedGetLibroById).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(404);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().mensaje).toEqual('Libro no encontrado');
    });

    it('POST /api/libros should create a new book', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/api/libros';
        request.body = mockLibroToCreate;

        const mockedCreateLibroResponse = jest.fn(async () => {
            return mockCreatedLibro;
        });
        mockedCreateLibro.mockImplementation(mockedCreateLibroResponse);

        await librosController.createLibro(request, response);
        expect(mockedCreateLibro).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(201);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().id).toEqual(4);
        expect(response._getJSONData().titulo).toEqual('Nuevo Libro');
    });

    it('PUT /api/libros/:id should update a book', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/api/libros/1';
        request.params = { id: '1' };
        request.body = mockLibroToCreate;

        const mockedUpdateLibroResponse = jest.fn(async () => {
            return;
        });
        mockedUpdateLibro.mockImplementation(mockedUpdateLibroResponse);

        await librosController.updateLibro(request, response);
        expect(mockedUpdateLibro).toHaveBeenCalledTimes(1);
        expect(mockedUpdateLibro).toHaveBeenCalledWith('1', mockLibroToCreate);
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().mensaje).toEqual('Libro actualizado correctamente');
    });

    it('DELETE /api/libros/:id should delete a book', async () => {
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        request.app = {};
        request.app.conf = {};
        request.path = '/api/libros/1';
        request.params = { id: '1' };

        const mockedDeleteLibroResponse = jest.fn(async () => {
            return;
        });
        mockedDeleteLibro.mockImplementation(mockedDeleteLibroResponse);

        await librosController.deleteLibro(request, response);
        expect(mockedDeleteLibro).toHaveBeenCalledTimes(1);
        expect(mockedDeleteLibro).toHaveBeenCalledWith('1');
        expect(response.statusCode).toEqual(200);
        expect(response._isEndCalled()).toBeTruthy();
        expect(response._getJSONData().mensaje).toEqual('Libro eliminado correctamente');
    });
});