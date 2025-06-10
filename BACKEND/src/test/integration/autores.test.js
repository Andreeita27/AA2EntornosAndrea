const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

const app = require('../../app');

chai.use(chaiHttp);
chai.should();

describe('autores', () => {
    describe('GET /api/autores', () => {
        it('should get all authors', (done) => {
            chai.request(app)
                .get('/api/autores')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    if (response.body.length > 0) {
                        expect(response.body[0]).to.have.property('id');
                        expect(response.body[0]).to.have.property('nombre');
                        expect(response.body[0]).to.have.property('nacionalidad');
                        expect(response.body[0]).to.have.property('fecha_nacimiento');
                    }
                    done();
                });
        });
    });

    describe('GET /api/autores/:id', () => {
        it('should get author by id', (done) => {
            chai.request(app)
                .get('/api/autores/1')
                .end((error, response) => {
                    response.should.have.status(200);
                    expect(response.body).to.have.property('id');
                    expect(response.body).to.have.property('nombre');
                    expect(response.body).to.have.property('nacionalidad');
                    expect(response.body).to.have.property('fecha_nacimiento');
                    done();
                });
        });

        it('should return 404 when author not found', (done) => {
            chai.request(app)
                .get('/api/autores/9999')
                .end((error, response) => {
                    response.should.have.status(404);
                    expect(response.body.mensaje).to.equal('Autor no encontrado');
                    done();
                });
        });
    });

    describe('POST /api/autores', () => {
        it('should create a new author', (done) => {
            chai.request(app)
                .post('/api/autores')
                .send({
                    nombre: 'Autor de prueba',
                    nacionalidad: 'Española',
                    fecha_nacimiento: '1980-01-01'
                })
                .end((error, response) => {
                    response.should.have.status(201);
                    expect(response.body).to.have.property('id');
                    expect(response.body).to.have.property('nombre');
                    expect(response.body).to.have.property('nacionalidad');
                    expect(response.body).to.have.property('fecha_nacimiento');
                    expect(response.body.nombre).to.equal('Autor de prueba');
                    done();
                });
        });

        it('validation should fail because nombre is mandatory', (done) => {
            chai.request(app)
                .post('/api/autores')
                .send({
                    nacionalidad: 'Española',
                    fecha_nacimiento: '1980-01-01'
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body).to.have.property('errors');
                    done();
                });
        });

        it('validation should fail because fecha_nacimiento must be a valid date', (done) => {
            chai.request(app)
                .post('/api/autores')
                .send({
                    nombre: 'Autor test',
                    nacionalidad: 'Española',
                    fecha_nacimiento: 'fecha-invalida'
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body).to.have.property('errors');
                    done();
                });
        });
    });

    describe('PUT /api/autores/:id', () => {
        it('should update an author', (done) => {
            chai.request(app)
                .put('/api/autores/1')
                .send({
                    nombre: 'Autor actualizado',
                    nacionalidad: 'Francesa',
                    fecha_nacimiento: '1975-05-15'
                })
                .end((error, response) => {
                    response.should.have.status(200);
                    expect(response.body.mensaje).to.equal('Autor actualizado correctamente');
                    done();
                });
        });

        it('validation should fail because all fields are mandatory', (done) => {
            chai.request(app)
                .put('/api/autores/1')
                .send({
                    nombre: '',
                    nacionalidad: 'Francesa'
                })
                .end((error, response) => {
                    response.should.have.status(400);
                    expect(response.body).to.have.property('errors');
                    done();
                });
        });
    });

    describe('DELETE /api/autores/:id', () => {
        it('should delete an author', (done) => {
            // Primero creo un autor para eliminar
            chai.request(app)
                .post('/api/autores')
                .send({
                    nombre: 'Autor Para eliminar',
                    nacionalidad: 'Temporal',
                    fecha_nacimiento: '1990-01-01'
                })
                .end((error, createResponse) => {
                    const authorId = createResponse.body.id;
                    
                    // Ahora lo elimino
                    chai.request(app)
                        .delete(`/api/autores/${authorId}`)
                        .end((error, response) => {
                            response.should.have.status(200);
                            expect(response.body.mensaje).to.equal('Autor eliminado correctamente');
                            done();
                        });
                });
        });
    });
});