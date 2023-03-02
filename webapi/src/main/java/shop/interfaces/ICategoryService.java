package shop.interfaces;

import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CreateCategoryDTO;
import shop.dto.category.UpdateCategoryDTO;

import java.util.List;

public interface ICategoryService {
    List<CategoryItemDTO> getAll();

    CategoryItemDTO getById(int id);

    CategoryItemDTO create(CreateCategoryDTO model);

    CategoryItemDTO update(int id, UpdateCategoryDTO model);

    List<CategoryItemDTO> delete(int id);
}
