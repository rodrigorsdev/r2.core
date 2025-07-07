import { AutoMap } from "@automapper/classes";
import { Document, Types } from "mongoose";

export abstract class BaseModel extends Document {

    @AutoMap()
    readonly _id: Types.ObjectId;

    @AutoMap()
    readonly createdAt: Date;

    @AutoMap()
    readonly updatedAt: Date;
}