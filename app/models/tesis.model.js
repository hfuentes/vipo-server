module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            titulo: String,
            autor: String,
            publicacion: String,
            publicado: Boolean
        },
        { timestamps: true }
    );
    schema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Tesis = mongoose.model('tesis', schema);
    return Tesis;
};