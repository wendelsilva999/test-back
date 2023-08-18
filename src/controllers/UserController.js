import User from '../models/User';
// eslint-disable-next-line no-unused-vars

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);

      res.json(novoUser);
    } catch (e) {
      console.log(e);
      res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const user = await User.findAll();
      return res.json(user);
    } catch (e) {
      return res.json(null);
    }
  }

  async login(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    // eslint-disable-next-line quote-props, quotes
    return res.json({
      user,
    });
  }
}

export default new UserController();
