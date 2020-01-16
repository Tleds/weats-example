use app;
select * from pedidos;
select * from usuarios;
select * from restaurantes;
select * from mesas;
select * from enderecos;
select * from menus;
select * from pedidos;
select * from status_pedido;
select * from pagamentos;
select * from avaliacao_produtos;
select * from avaliacao_restaurantes;
#Query Avaliação
#Avaliação Produtos
select AVG(ap.avaliacao) as avaliacao,m.produto, r.nome
from avaliacao_produtos as ap
inner join menus as m
on m.id = ap.id_produto
inner join restaurantes as r
on r.id = ap.id_restaurante
group by m.produto, r.nome;

#Avaliacao Restaurantes
select AVG(ar.avaliacao) as avaliacao,r.nome,r.celular,r.cnpj,r.email,r.imagem_restaurante
from avaliacao_restaurantes ar
right join restaurantes r 
on r.id = ar.id_restaurante
group by r.nome,r.celular,r.cnpj,r.email,r.imagem_restaurante;


insert into avaliacao_restaurantes (id_restaurante,id_usuario,avaliacao)
values (2,2,5);
insert into avaliacao_restaurantes (id_restaurante,id_usuario,avaliacao)
values (2,2,5);
insert into avaliacao_restaurantes (id_restaurante,id_usuario,avaliacao)
values (2,2,5);
insert into avaliacao_restaurantes (id_restaurante,id_usuario,avaliacao)
values (2,2,5);
insert into avaliacao_restaurantes (id_restaurante,id_usuario,avaliacao)
values (2,2,5);
insert into avaliacao_restaurantes (id_restaurante,id_usuario,avaliacao)
values (2,2,5);

insert into avaliacao_restaurantes (id_restaurante,id_usuario,avaliacao)
values (3,2,3);
insert into avaliacao_restaurantes (id_restaurante,id_usuario,avaliacao)
values (3,2,3);
insert into avaliacao_restaurantes (id_restaurante,id_usuario,avaliacao)
values (3,2,3);
insert into avaliacao_restaurantes (id_restaurante,id_usuario,avaliacao)
values (3,2,3);
insert into avaliacao_restaurantes (id_restaurante,id_usuario,avaliacao)
values (3,2,3);
insert into avaliacao_restaurantes (id_restaurante,id_usuario,avaliacao)
values (3,2,3);

