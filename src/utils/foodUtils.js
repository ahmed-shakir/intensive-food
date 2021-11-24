export function transformToBackendObject(item) {
    return {
        _id: item._id,
        name: item.name,
        categoryId: item.categoryId ? item.categoryId : item.category._id,
        numberInStock: item.numberInStock,
        price: item.price,
        isLiked: item.isLiked
    };
}
