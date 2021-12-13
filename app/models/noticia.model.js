module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            titulo: String,
            bajada: String,
            imagen: String,
            cuerpo: String,
            publicado: Boolean
        },
        { timestamps: true }
    );
    schema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Noticia = mongoose.model('noticia', schema);
    return Noticia;
};