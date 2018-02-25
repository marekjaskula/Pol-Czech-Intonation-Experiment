/**
 * Created by Mazi on 2018-02-25.
 */

export const makeAction = (type) => {
    return (payload) => ({
        type,
        payload,
    });
};
