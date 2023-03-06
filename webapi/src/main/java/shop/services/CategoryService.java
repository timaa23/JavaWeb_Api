package shop.services;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CreateCategoryDTO;
import shop.dto.category.UpdateCategoryDTO;
import shop.entities.CategoryEntity;
import shop.interfaces.ICategoryService;
import shop.interfaces.IProductService;
import shop.mapper.CategoryMapper;
import shop.repositories.CategoryRepository;
import shop.storage.StorageService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {
    @Autowired
    private final CategoryRepository categoryRepository;
    @Autowired
    private final CategoryMapper categoryMapper;
    @Autowired
    private final StorageService storageService;
    @Autowired
    private final IProductService productService;

    @Override
    public List<CategoryItemDTO> getAll() {
        return categoryMapper.categoryItemDTOsToCategories(categoryRepository.findAll());
    }

    @SneakyThrows
    @Override
    public CategoryItemDTO getById(int id) {
        Optional<CategoryEntity> category = categoryRepository.findById(id);
        if (!category.isPresent()) throw new Exception();

        return categoryMapper.categoryItemDTOByCategory(category.get());
    }

    @Override
    public CategoryItemDTO create(CreateCategoryDTO model) {
        String fileName = storageService.saveMultipartFile(model.getImage());

        CategoryEntity category = categoryMapper.categoryByCreateCategoryDTO(model);
        category.setImage(fileName);

        categoryRepository.save(category);
        return categoryMapper.categoryItemDTOByCategory(category);
    }

    @SneakyThrows
    @Override
    public CategoryItemDTO update(int id, UpdateCategoryDTO model) {
        Optional<CategoryEntity> categoryData = categoryRepository.findById(id);
        if (!categoryData.isPresent()) throw new Exception();

        CategoryEntity category = categoryData.get();
        category.setName(model.getName());
        category.setDescription(model.getDescription());

        if (!model.getImage().equals("")) {
            String fileName = storageService.save(model.getImage());

            storageService.removeFile(category.getImage());
            category.setImage(fileName);
        }

        return categoryMapper.categoryItemDTOByCategory(categoryRepository.save(category));
    }

    @SneakyThrows
    @Override
    public List<CategoryItemDTO> delete(int id) {
        Optional<CategoryEntity> category = categoryRepository.findById(id);
        if (!category.isPresent()) throw new Exception();

        var listProducts = productService.getByCategoryId(id);
        for (var item : listProducts) {
            productService.delete(item.getId());
        }

        storageService.removeFile(category.get().getImage());
        categoryRepository.deleteById(id);

        return getAll();
    }
}
