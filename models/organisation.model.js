const { Schema, model } = require("mongoose");

const organisationSchema = new Schema({
    organisationName: { type: String},
    email: { type: String  },
    phone: { type: String  },
    logo: {
        type: Buffer,
        contentType: String
    },
    about: { type: String },
    services:{type:Array},
    location:{type:String},
    field:{type:String},
    website:{type:String}
},
{
    timestamps: true,
})

const Organisation = model("Organisation", organisationSchema)
module.exports = Organisation;