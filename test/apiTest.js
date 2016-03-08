var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server/app');
var knex = require('../db/knex');

var should = chai.should();

chai.use(chaiHttp);

describe('API routes', function() {
// before each test do this, so your tests are consistent
    beforeEach(function(done) {
        knex.migrate.rollback().then(function() {
            knex.migrate.latest()
            .then(function() {
                return knex.seed.run().then(function() {
                    done();
                });
            });
        });
    });
// after each test do this, if the tests fail, then the beforeEach will take care of the rollback if the afterEach is not run
    afterEach(function(done) {
        knex.migrate.rollback().then(function() {
            done();
        });
    });

    describe('Get all shows', function() {

        it('should get all shows', function(done) {
            chai.request(server)
            .get('/api/shows')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.equal(4);
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Suits');
                res.body[0].should.have.property('channel');
                res.body[0].channel.should.equal('USA Network');
                res.body[0].should.have.property('genre');
                res.body[0].genre.should.equal('Drama');
                res.body[0].should.have.property('rating');
                res.body[0].rating.should.equal(3);
                res.body[0].should.have.property('explicit');
                res.body[0].explicit.should.equal(false);
                done();
            });
        });

    });

    describe('Add a single show', function() {
        it('should add a single show', function(done) {
            chai.request(server)
            .post('/api/shows')
            .send({
                name: 'new show',
                channel: 'ABC',
                genre: 'anything',
                rating: 1,
                explicit: false
            })
            .end(function(error, response){
                console.log(response.body);
                chai.request(server)
                .get('/api/show/'+response.body)
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('name');
                    res.body.name.should.equal('new show');
                    res.body.should.have.property('channel');
                    res.body.channel.should.equal('ABC');
                    res.body.should.have.property('genre');
                    res.body.genre.should.equal('anything');
                    res.body.should.have.property('rating');
                    res.body.rating.should.equal(1);
                    res.body.should.have.property('explicit');
                    res.body.explicit.should.equal(false);
                    done();
                });
            });
        });
    });

    describe('Get a single show', function() {
        it('should return a single show', function(done) {
            chai.request(server)
            .get('/api/show/1')
            .end(function(error, response){
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.have.property('name');
                response.body.name.should.equal('Suits');
                response.body.should.have.property('channel');
                response.body.channel.should.equal('USA Network');
                response.body.should.have.property('genre');
                response.body.genre.should.equal('Drama');
                response.body.should.have.property('rating');
                response.body.rating.should.equal(3);
                response.body.should.have.property('explicit');
                response.body.explicit.should.equal(false);
            done();
            });
        });
    });

    describe('Update a single show', function() {
        it('should update a single show', function(done) {
            chai.request(server)
            .put('/api/show/1')
            .send({
                name: 'suits',
                channel: 'network',
                genre: 'dumb',
                rating: 2,
                explicit: true
            })
            .end(function(error, response){
                chai.request(server)
                .get('/api/show/'+response.body)
                .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('name');
                    res.body.name.should.equal('suits');
                    res.body.should.have.property('channel');
                    res.body.channel.should.equal('network');
                    res.body.should.have.property('genre');
                    res.body.genre.should.equal('dumb');
                    res.body.should.have.property('rating');
                    res.body.rating.should.equal(2);
                    res.body.should.have.property('explicit');
                    res.body.explicit.should.equal(true);
                    done();
                });
            });
        });
    });

    describe('Delete a single show', function() {
        it('should delete a single show', function(done) {
            chai.request(server)
            .delete('/api/show/2')
            .end(function(error, response) {
                chai.request(server)
                .get('/api/shows')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.equal(3);
                    res.body[0].should.have.property('name');
                    res.body[0].name.should.equal('Suits');
                    res.body[0].should.have.property('channel');
                    res.body[0].channel.should.equal('USA Network');
                    res.body[0].should.have.property('genre');
                    res.body[0].genre.should.equal('Drama');
                    res.body[0].should.have.property('rating');
                    res.body[0].rating.should.equal(3);
                    res.body[0].should.have.property('explicit');
                    res.body[0].explicit.should.equal(false);
                done();
                });
            });
        });
    });
});











