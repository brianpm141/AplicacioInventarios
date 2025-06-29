// hash.js
const bcrypt = require('bcrypt');

(async () => {
  const plainPassword = '123456789';
  const hash = await bcrypt.hash(plainPassword, 10);
  console.log('Hash generado:', hash);
})();
