/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import User from '../models/User';

class AccessControl {
  async basic(req, res, next) {
    const { authorization } = req.headers;

    const [, token] = authorization.split(' ');
    try {
      const dados = jwt.verify(token, process.env.TOKEN_SECRET);
      const { id } = dados;
      req.userId = id;
      const user = await User.findByPk(id);
      const { role } = user;
      if (role === 'basic') {
        return next();
      }
    } catch (e) {
      return res.json('falta atribuição de cargo');
    }
  }

  async articulador(req, res, next) {
    const { authorization } = req.headers;

    const [, token] = authorization.split(' ');
    try {
      const dados = jwt.verify(token, process.env.TOKEN_SECRET);
      const { id } = dados;
      req.userId = id;
      const user = await User.findByPk(id);
      const { role } = user;
      // eslint-disable-next-line no-constant-condition, eqeqeq
      if (role === 'admin') {
        return next();
      }

      if (role !== 'articulador') {
        return res.status(400).json({
          errors: ['não autorizado o acesso'],
        });
      }
      return next();
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async admin(req, res, next) {
    const { authorization } = req.headers;

    const [, token] = authorization.split(' ');
    try {
      const dados = jwt.verify(token, process.env.TOKEN_SECRET);
      const { id } = dados;
      req.userId = id;
      const user = await User.findByPk(id);
      const { role } = user;
      if (role !== 'admin') {
        return res.status(400).json({
          errors: ['não autorizado o acesso admin'],
        });
      }
      return next();
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AccessControl();
