module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            imagen: String,
            texto: String,
            publicado: Boolean
        },
        { timestamps: true }
    );
    schema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Galeria = mongoose.model('galeria', schema);
    return Galeria;
};