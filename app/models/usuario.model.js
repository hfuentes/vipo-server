const bcrypt = require('bcrypt');

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            nombre: {
                type: String,
                unique: true,
                lowercase: true,
                trim: true,
                required: true
            },
            hash_password: {
                type: String
            }
        },
        { timestamps: true }
    );
    schema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    schema.method('comparePassword', function (password) {
        return bcrypt.compare(password, this.hash_password);
    });
    const Usuario = mongoose.model('usuario', schema);
    return Usuario;
};