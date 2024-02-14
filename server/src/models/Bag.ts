import mongoose from "mongoose"


const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const BagSchema = new Schema({
  title: String,
  serialNo: String,
  width: String,
  height: String,
  depth: String,
  outsideMat: String,
  insideMat: String,
  color: String,
  style: String,
  imageId: String
});

const BagModel = mongoose.model('Bag', BagSchema);

export default BagModel;