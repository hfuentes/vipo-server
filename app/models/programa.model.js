module.exports = mongoose => {
    const objectId = mongoose.Schema.Types.ObjectId;
    const schema = mongoose.Schema(
        {
            descripcion: String,
            objetivos: String,
            dirigido: String,
            plan: String,
            acreditacion: String,
            investigacion: String,
            correo: String,
            telefono: String,
            url: String,
            jornada: String,
            modalidad: String,
            caracter: String,
            dedicacion: String,
            ahno: String,
            postulaciones: String,
            clases: String,
            valor: String,
            subvalor: String,
            pago: String
        },
        { timestamps: true }
    );
    schema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Programa = mongoose.model('programa', schema);
    return Programa;
};