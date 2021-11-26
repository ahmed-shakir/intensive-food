export function transformToDTO(item) {
    const dto = { ...item, categoryId: item.categoryId ? item.categoryId : item.category._id};
    delete dto.category;
    delete dto.isEditing;
    delete dto.__v;
    return dto;
}
