const yup = require('yup');

module.exports = {
  async checkPermissionsUser(req, res, next) {
    const { userAccess } = req;
    if (userAccess !== 0) {
      return res.status(401).json({ message: 'Access denied' });
    }
    return next();
  },
  async checkPermissionsShop(req, res, next) {
    const { userAccess } = req;
    if (userAccess != 1) {
      return res.status(401).json({ message: 'Access denied' });
    }
    return next();
  },
  async checkParkingPayment(req, res, next) {
    const schema = yup.object().shape({
      id_payment_method: yup.number().required(),
      id_user: yup.number().required(),
      card_code: yup.string().max(100).required(),
      final_price: yup.number().max(10).required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid parking payment' });
    }
    return next();
  },
  async checkPaymentMethod(req, res, next) {
    const schema = yup.object().shape({
      description: yup.string().max(255),
      id_payment_method_type: yup.number().required(),
      id_card_flag: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'cannot be null' });
    }
    return next();
  },
  async checkPromotion(req, res, next) {
    const schema = yup.object().shape({
      id_shop: yup.number().required(),
      id_shoppping: yup.number().required(),
      promotion_title: yup.string().max(100).required(),
      description: yup.string().max(255),
      coupon: yup.string().max(20),
      start_date: yup.date().required(),
      end_date: yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid promotion' });
    }
    return next();
  },
  async checkProductRating(req, res, next) {
    const schema = yup.object().shape({
      id_product_menu: yup.number().required(),
      id_shop: yup.number().required(),
      id_user: yup.number().required(),
      rating: yup.number().max(10).required(),
      description: yup.string().max(255),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid product rating' });
    }
    return next();
  },
  async checkCPF(req, res, next) {
    let { cpf } = req.body;
    let Soma;
    let Resto;
    Soma = 0;
    cpf = cpf.substring(0, 11);
    if (cpf == '00000000000') {
      return res.status(400).json({ message: 'Invalid CPF' });
    }

    for (i = 1; i <= 9; i++)
      Soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) {
      return res.status(400).json({ message: 'Invalid CPF' });
    }

    Soma = 0;
    for (i = 1; i <= 10; i++)
      Soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) {
      return res.status(400).json({ message: 'Invalid CPF' });
    }
    return next();
  },
  async checkCNPJ(req, res, next) {
    let { cnpj } = req.body;
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '') {
      return res.status(400).json({ message: 'Invalid CNPJ' });
    }

    if (cnpj.length !== 14) {
      return res.status(400).json({ message: 'Invalid CNPJ' });
    }

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999'
    ) {
      return res.status(400).json({ message: 'Invalid CNPJ' });
    }
    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado != digitos.charAt(0)) {
      return res.status(400).json({ message: 'Invalid CNPJ' });
    }

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado != digitos.charAt(1)) {
      return res.status(400).json({ message: 'Invalid CNPJ' });
    }
    return next();
  },
  async checkShop(req, res, next) {
    const schema = yup.object().shape({
      id_shop_type: yup.number().required(),
      id_shopping: yup
        .number()
        .when('id_shop_type', (id_shop_type, field) =>
          id_shop_type == 1 ? field.required() : field
        ),
      cnpj: yup.string().max(14).required(),
      name: yup.string().max(100).required(),
      email: yup.string().max(100).email().required(),
      telephone: yup.string().max(15).required(),
      cellphone: yup.string().max(15),
      password: yup.string().min(6).max(100).required(),
      id_image: yup.number(),
      address: yup.object({
        street: yup.string().min(3).max(100).required(),
        number: yup.number().required(),
        complement: yup.string().max(255),
        neighborhood: yup.string().min(3).max(100).required(),
        city: yup.string().min(3).max(100).required(),
        zip_code: yup.string().min(8).max(8).required(),
        state: yup.string().min(2).max(50).required(),
        country: yup.string().min(3).max(100).required(),
      }),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid shop' });
    }
    return next();
  },
  async checkUpdateShop(req, res, next) {
    const schema = yup.object().shape({
      id: yup.number().required(),
      id_shopping: yup.number().required(),
      id_shop_type: yup.number().required(),
      old_cnpj: yup.string().max(14),
      cnpj: yup
        .string()
        .max(14)
        .when('old_cnpj', (old_cnpj, field) =>
          old_cnpj ? field.required() : field
        ),
      name: yup.string().max(100).required(),
      old_email: yup.string().max(100).email(),
      email: yup
        .string()
        .max(100)
        .email()
        .when('old_email', (old_email, field) =>
          old_email ? field.required() : field
        ),
      old_password: yup.string().min(6).max(100),
      password: yup
        .string()
        .min(6)
        .max(100)
        .when('old_password', (old_password, field) =>
          old_password ? field.required() : field
        ),
      telephone: yup.string().max(15).required(),
      cellphone: yup.string().max(15),
      id_image: yup.number(),
      address: yup.object({
        street: yup.string().min(3).max(100).required(),
        number: yup.number().required(),
        complement: yup.string().max(255),
        neighborhood: yup.string().min(3).max(100).required(),
        city: yup.string().min(3).max(100).required(),
        zip_code: yup.string().min(8).max(8).required(),
        state: yup.string().min(2).max(50).required(),
        country: yup.string().min(3).max(100).required(),
      }),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid shop' });
    }
    return next();
  },
  async checkLogin(req, res, next) {
    const schema = yup.object().shape({
      email: yup.string().email().min(6).max(100).required(),
      password: yup.string().min(6).max(100).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    return next();
  },
  async checkCreateMenu(req, res, next) {
    const schema = yup.object().shape({
      id_shop: yup.number().required(),
      products: yup.array(
        yup.object({
          name: yup.string().min(3).max(100).required(),
          price: yup.number().required(),
          description: yup.string().required(),
          id_image: yup.number().integer(),
          id_classification: yup.number().integer().required(),
        })
      ),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid menu' });
    }
    return next();
  },
  async checkUpdateMenu(req, res, next) {
    const schema = yup.object().shape({
      id: yup.number().integer().required(),
      id_shop: yup.number().required(),
      products: yup.array(
        yup.object({
          id: yup.number().integer().required(),
          name: yup.string().min(3).max(100).required(),
          price: yup.number().required(),
          description: yup.string().required(),
          id_image: yup.number().integer(),
          id_classification: yup.number().integer().required(),
        })
      ),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid menu' });
    }
    return next();
  },
  async checkTable(req, res, next) {
    const schema = yup.object().shape({
      id_shop: yup.number().required(),
      description: yup.string().max(100).required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid table' });
    }
    return next();
  },
  async checkShopping(req, res, next) {
    const schema = yup.object().shape({
      name: yup.string().max(100).required(),
      latitude: yup.string().max(100).required(),
      longitude: yup.string().max(100).required(),
      id_image: yup.number(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid shopping' });
    }
    return next();
  },
  async checkShopRating(req, res, next) {
    const schema = yup.object().shape({
      id_shop: yup.number().required(),
      id_user: yup.number().required(),
      description: yup.string().max(100),
      rating: yup.number().max(10).required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid shop rating' });
    }
    return next();
  },
  async checkShopPayment(req, res, next) {
    const schema = yup.object().shape({
      id_payment_method: yup.number().required(),
      id_user: yup.number().required(),
      id_shop: yup.number().required(),
      id_table: yup.number(),
      id_solicitation: yup.number().required(),
      final_price: yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid shop payment' });
    }
    return next();
  },
  async checkUpdateShopPayment(req, res, next) {
    const schema = yup.object().shape({
      id: yup.number().required(),
      id_payment_method: yup.number().required(),
      final_price: yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid shop payment' });
    }
    return next();
  },
  async checkSolicitation(req, res, next) {
    const schema = yup.object().shape({
      id_shop: yup.number().integer().required(),
      id_user: yup.number().integer().required(),
      id_table: yup.number().integer(),
      id_solicitation_status: yup.number().integer().required(),
      price: yup.number().required(),
      solicitation_password: yup.string().max(100).required(),
      solicition_items: yup.array(
        yup.object({
          id_product: yup.number().integer().required(),
          amount: yup.number().integer().min(1).required(),
          observation: yup.string(),
          price: yup.number().required(),
        })
      ),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid solicitation' });
    }
    return next();
  },
  async checkUpdateSolicitation(req, res, next) {
    const schema = yup.object().shape({
      id: yup.number().integer().required(),
      id_shop: yup.number().integer().required(),
      id_user: yup.number().integer().required(),
      id_table: yup.number().integer(),
      id_solicitation_status: yup.number().integer().required(),
      price: yup.number().required(),
      solicitation_password: yup.string().max(100).required(),
      solicition_items: yup.array(
        yup.object({
          id: yup.number().integer().required(),
          id_product: yup.number().integer().required(),
          amount: yup.number().integer().min(1).required(),
          observation: yup.string(),
          price: yup.number().required(),
        })
      ),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid solicitation' });
    }
    return next();
  },
  async checkUser(req, res, next) {
    const schema = yup.object().shape({
      name: yup.string().max(100).required(),
      email: yup.string().min(6).max(100).email().required(),
      cpf: yup.string().max(11).required(),
      password: yup.string().min(6).max(100).required(),
      telephone: yup.string().max(15),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid user' });
    }
    return next();
  },
  async checkUpdateUser(req, res, next) {
    const schema = yup.object().shape({
      name: yup.string().max(100).required(),
      old_email: yup.string().min(6).max(100).email(),
      email: yup
        .string()
        .min(6)
        .max(100)
        .email()
        .when('old_email', (old_email, field) =>
          old_email ? field.required() : field
        ),
      old_cpf: yup.string().max(11),
      cpf: yup
        .string()
        .max(11)
        .when('old_cnpj', (old_cnpj, field) =>
          old_cnpj ? field.required() : field
        ),
      old_password: yup.string().min(6).max(100),
      password: yup
        .string()
        .min(6)
        .max(100)
        .when('old_password', (old_password, field) =>
          old_password ? field.required() : field
        ),
      telephone: yup.string().max(15),
      cellphone: yup.string().max(15),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Invalid user' });
    }
    return next();
  },
  async checkProducts(req, res, next) {
    const schema = yup.object().shape({
      id_menu: yup.number().required(),
      id_classification: yup.number().required(),
      name: yup.string().max(100).required(),
      price: yup.number().max(10).required(),
      description: yup.string().max(255).required(),
      image: yup.string().max(255).required(),
    });
    if (!(await schema.isValid(req.body.products))) {
      return res.status(400).json({ message: 'Invalid product' });
    }
    return next();
  },
  async checkAddresses(req, res, next) {
    const schema = yup.object().shape({
      id_shop: yup.number().required(),
      street: yup.string().max(255).required(),
      number: yup.number().required(),
      complement: yup.string().max(255),
      neighborhood: yup.string().max(255).required(),
      city: yup.string().max(100).required(),
      zip_code: yup.string().max(8).required(),
      state: yup.string().max(50).required(),
      country: yup.string().max(100).required(),
    });
    if (!(await schema.isValid(req.body.address))) {
      return res.status(400).json({ message: 'Invalid address' });
    }
    return next();
  },
};
