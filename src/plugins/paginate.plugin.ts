import { Schema, Document } from 'mongoose';
interface IPaginateDefaultOptions {
  sortBy?: string;
  limit?: string;
  page?: string;
}

interface IPaginateQueryResult {
  results: Document[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IPaginateFilter {}

const paginate = (schema: Schema) => {
  schema.statics.paginate = async function (
    filter: IPaginateFilter,
    options: IPaginateDefaultOptions,
  ): Promise<IPaginateQueryResult> {
    let sort = '';
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = 'createdAt';
    }

    const limit =
      options.limit && parseInt(options.limit, 10) > 0
        ? parseInt(options.limit, 10)
        : 10;
    const page =
      options.page && parseInt(options.page, 10) > 0
        ? parseInt(options.page, 10)
        : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();
    const docsPromise = this.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
};

module.exports = paginate;
