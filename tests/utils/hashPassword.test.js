const hashPassword = require("../../utils/hashPassword.js");
const bcrypt = require('bcrypt');

describe('hashPassword', () => {
    it('Should return false if the hash is compared to another string', async () => {
        const password = "some string to hash";
        const anotherString = "some string to compare";
        const hash = await hashPassword(password);
        const isValid = bcrypt.compareSync(anotherString, hash);
        expect(isValid).toBe(false);
      });
    it('Should return a valid hash from a string', async () => {
        const password = "some string to hash";
        const hash = await hashPassword(password);
        const isValid = bcrypt.compareSync(password, hash);
        expect(isValid).toBe(true);
    });

});
