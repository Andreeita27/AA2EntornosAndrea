const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app');

chai.use(chaiHttp);
chai.should();

describe('libros', () => {
    describe('GET /api/libros', () => {
        it('should get all books', (done) => {
            chai.request(app)
                .get('/api/libros')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    if (response.body.length > 0) {
                        expect(response.body[0]).to.have.property('id');
                        expect(response.body[0]).to.have.property('titulo');
                        expect(response.body[0]).to.have.property('genero');
                        expect(response.body[0]).to.have.property('anio_publicacion');
                        expect(response.body[0]).to.have.property('autor_id');
                    }
                    done();
                });
        });
    });

    describe('GET /api/libros/:id', () => {
        it('should get book by id', (done) => {
            chai.request(app)
                .get('/api/libros/1')
                .end((error, response) => {
                    response.should.have.status(200);
                    expect(response.body).to.have.property('id');
                    expect(response.body).to.have.property('titulo');
                    expect(response.body).to.have.property('genero');
                    expect(response.body).to.have.property('anio_publicacion');
                    expect(response.body).to.have.property('autor_id');
                    done();
                });
        });

        it('should return 404 when book not found', (done) => {
            chai.request(app)
                .get('/api/libros/9999')
                .end((error, response) => {
                    response.should.have.status(404);
                    expect(response.body.mensaje).to.equal('Libro no encontrado');
                    done();
                });
        });
    });

    describe('POST /api/libros', () => {
        it('should create a new book', (done) => {
            chai.request(app)
                .post('/api/libros')
                .send({
                    titulo: 'Libro de prueba',
                    genero: 'Ficción',
                    anio_publicacion: 2024,
                    autor_id: 1
                })
                .end((error, response) => {
                    response.should.have.status(201);
                    expect(response.body).to.have.property('id');
                    expect(response.body).to.have.property('titulo');
                    expect(response.body).to.have.property('genero');
                    expect(response.body).to.have.property('anio_publicacion');
                    expect(response.body).to.have.property('autor_id');
                    expect(response.body.titulo).to.equal('Libro de prueba');
                    done();
                });
        });

        it('validation should fail because titulo is mandatory', (done) => {
            chai.request(app)
                .post('/api/libros')
                .send({
                    genero: 'Ficción',
                    anio_publicacion: 2024,
                    autor_id: 1
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body).to.have.property('errors');
                    done();
                });
        });

        it('validation should fail because anio_publicacion must be a number', (done) => {
            chai.request(app)
                .post('/api/libros')
                .send({
                    titulo: 'Libro test',
                    genero: 'Ficción',
                    anio_publicacion: 'no-es-numero',
                    autor_id: 1
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body).to.have.property('errors');
                    done();
                });
        });
    });

    describe('PUT /api/libros/:id', () => {
        it('should update a book', (done) => {
            chai.request(app)
                .put('/api/libros/1')
                .send({
                    titulo: 'Libro actualizado',
                    genero: 'Drama',
                    anio_publicacion: 2025,
                    autor_id: 2
                })
                .end((error, response) => {
                    response.should.have.status(200);
                    expect(response.body.mensaje).to.equal('Libro actualizado correctamente');
                    done();
                });
        });

        it('validation should fail because all fields are mandatory', (done) => {
            chai.request(app)
                .put('/api/libros/1')
                .send({
                    titulo: '',
                    genero: 'Drama'
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body).to.have.property('errors');
                    done();
                });
        });
    });

    describe('DELETE /api/libros/:id', () => {
        it('should delete a book', (done) => {
            // Primero creo un libro para eliminar
            chai.request(app)
                .post('/api/libros')
                .send({
                    titulo: 'Libro Para eliminar',
                    genero: 'Temporal',
                    anio_publicacion: 2024,
                    autor_id: 1
                })
                .end((error, createResponse) => {
                    const bookId = createResponse.body.id;
                    
                    // Ahora lo elimino
                    chai.request(app)
                        .delete(`/api/libros/${bookId}`)
                        .end((error, response) => {
                            response.should.have.status(200);
                            expect(response.body.mensaje).to.equal('Libro eliminado correctamente');
                            done();
                        });
                });
        });
    });
});