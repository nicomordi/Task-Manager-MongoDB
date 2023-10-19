import request from 'supertest';
import { app } from './app';

//Se dejan los datos para completar
it('201 si es correcto', async(done)=>{
    request(app)
        .post('/localhost')
        .send({
            email : 'INGRESAR EMAIL',
            password: 'INGRESAR PASSWORD'
        })
        .expect(201)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            expect(res.body.message).toBe('correcto');
            return done();
        });
});