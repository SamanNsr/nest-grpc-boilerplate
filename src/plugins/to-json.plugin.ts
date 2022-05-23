import { Schema, Document } from 'mongoose';

type transformFunctionType = (doc: Document, ret: any, options: any) => any;

interface IJsonSchema extends Schema {
  options: {
    toJSON: {
      transform: transformFunctionType;
    };
  };
}

export const toJSON = (schema: IJsonSchema) => {
  let transform: transformFunctionType;
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc, ret, options) {
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          delete ret[path];
        }
      });

      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      if (transform) {
        return transform(doc, ret, options);
      }
    },
  });
};
