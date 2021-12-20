module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            nombre: String,
            egreso: String,
            publicado: Boolean
        },
        { timestamps: true }
    );
    schema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Estudiante = mongoose.model('estudiante', schema);
    return Estudiante;
};