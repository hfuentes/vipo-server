module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            fechas: String,
            requisitos: String,
            becas: String,
            postula: String
        },
        { timestamps: true }
    );
    schema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Admision = mongoose.model('admision', schema);
    return Admision;
};