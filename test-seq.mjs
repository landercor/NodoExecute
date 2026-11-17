import pkg from 'sequelize';
console.log('pkg:', typeof pkg, Object.keys(pkg).slice(0, 10));
console.log('pkg.default:', typeof pkg.default);
console.log('pkg.define:', typeof pkg.define);
console.log('pkg.DataTypes:', typeof pkg.DataTypes);