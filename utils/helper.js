const User = require('../models').User;
const Role = require('../models').Role;

class Helper {
  constructor() {}

  allowRole(roleName, userId) {
      return new Promise(
          (resolve, reject) => {
              Role.findOne({
                  where: {
                      role_name: roleName
                  }
              }).then((role) => {
                  User.findOne({
                      where: {
                          id: userId,
                          role_id: role.id
                      }
                  }).then((user) => {
                      if(user) {
                          resolve(rolePermission);
                      } else {
                          reject({message: 'Forbidden'});
                      }
                  }).catch((error) => {
                      reject(error);
                  });
              }).catch(() => {
                  reject({message: 'Forbidden'});
              });
          }
      );
  }
}

module.exports = Helper;