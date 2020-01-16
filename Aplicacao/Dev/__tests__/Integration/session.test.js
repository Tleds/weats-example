const restaurantes = require('../../Model/database/models/Restaurantes');
require('../../Model/database/index');
const locals = require('../../Model/database/models/Locals');
const request = require('supertest');
const app = require('../../app');

//A rota de login deve retornar um toke JWT quando for
//chamada e possuir credências corretas.
describe('Authentication',()=>{
  it('Autenticação do usuário com credenciais válidas',async ()=>{
     const requisicao = await request(app)
     .post('/usuarios')
     .send({nome:"teste",email:"teste@google.com",
     telefone:"3123123123",senha:"123",cpf:"56953648090"});

     const response = await request(app)
     .post('/login')
     .send({
       email:'teste@google.com',
       senha:'123'
     });

     expect(response.status).toBe(200);
  });
  it('Autenticação do usuário com credenciais inválidas',async ()=>{
    let response = await request(app)
     .post('/login')
     .send({
       email:'teste@google.com',
       senha:'1234'
     });
     expect(response.status).toBe(403)
  })
  it('Autenticação do restaurante com credenciais válidas',async ()=>{
    /*const requisicao = await request(app)
     .post('/restaurantes')
     .send*/
     //let locais = await locals.create({nome:"Restaurante de rua"});
     
     /*let teste = await restaurantes.create({nome:"Varanda Gourmet",email:"varanda@gmail.com",
     telefone:"3123123123",senha:"123",cnpj:"56840660000135",imagem_restaurante:"d:",
     id_local:"1",celular:"3123123123",avaliacao:"5",createdAt:new Date(),updatedAt: new Date()});*/
     
    const response = await request(app)
    .post('/login_restaurante')
    .send({
      email:'varanda@gmail.com',
      senha:'123'
    });
    expect(response.status).toBe(200)
  })
  it('Autenticação do restaurante com credenciais inválidas',async ()=>{
    const response = await request(app)
    .post('/login_restaurante')
    .send({
      email:'varanda@gmail.com',
      senha:'123'
    });
    expect(response.status).toBe(403)
  })
});
describe('Validate data',()=>{

});
describe('Get data',()=>{

});
describe('Store data',()=>{

});
describe('Update data',()=>{

});
describe('Delete data',()=>{

});
describe('Connection',()=>{

});
describe('Password',()=>{

});
