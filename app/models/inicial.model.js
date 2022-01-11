module.exports = mongoose => {
    const objectId = mongoose.Schema.Types.ObjectId;
    const schema = mongoose.Schema(
        {
            slide1: String,
            slide2: String,
            slide3: String,
            slide4: String,
            video: String,
            email: String,
            admision: String,
            conocenos: String,
            plan: String,
            acreditacion: String,
            facebook: String,
            twitter: String,
            instagram: String,
            youtube: String,
            linkedin: String,
            noticia1: { type: objectId, ref: 'noticia' },
            noticia2: { type: objectId, ref: 'noticia' },
            noticia3: { type: objectId, ref: 'noticia' }
        },
        { timestamps: true }
    );
    schema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Inicial = mongoose.model('inicial', schema);
    return Inicial;
};