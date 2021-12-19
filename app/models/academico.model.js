module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            imagen: String,
            nombre: String,
            correo: String,
            cargo: String,
            resumen: String,
            publicaciones: String,
            proyectos: String,
            publicado: Boolean
        },
        { timestamps: true }
    );
    schema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Academico = mongoose.model('academico', schema);
    return Academico;
};