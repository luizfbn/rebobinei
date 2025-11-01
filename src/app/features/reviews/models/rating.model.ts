function makeRatingArray<const T>(values: T) {
    return values;
}

export const RATINGS = makeRatingArray([1, 2, 3, 4, 5]);
export type Rating = (typeof RATINGS)[number];
