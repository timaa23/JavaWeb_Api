package shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.UploadImageDTO;
import shop.dto.category.CreateCategoryDTO;
import shop.dto.category.UpdateCategoryDTO;
import shop.entities.CategoryEntity;
import shop.repositories.CategoryRepository;
import shop.storage.StorageService;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
public class CategoryController {
    private final CategoryRepository categoryRepository;
    private final StorageService storageService;

    @GetMapping
    public ResponseEntity<List<CategoryEntity>> getAllCategories() {
        List<CategoryEntity> categories = categoryRepository.findAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CategoryEntity> createCategory(@RequestBody CreateCategoryDTO model) {

        //Тут все працює, але я закоментував щоб перевірити додавання категорій на сайті

        String fileName = storageService.save(model.getImage());
        CategoryEntity category = new CategoryEntity();
        category.setName(model.getName());
        category.setDescription(model.getDescription());
        category.setImage(fileName); //(fileName);

        categoryRepository.save(category);
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryEntity> getCategoryById(@PathVariable("id") int id) {
        Optional<CategoryEntity> category = categoryRepository.findById(id);
        return category.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryEntity> updateCategory(@PathVariable("id") int id, @RequestBody UpdateCategoryDTO model) {
        Optional<CategoryEntity> categoryData = categoryRepository.findById(id);
        String fileName = storageService.save(model.getImage());

        if (categoryData.isPresent()) {
            CategoryEntity category = categoryData.get();
            category.setName(model.getName());
            category.setName(model.getDescription());
            category.setImage(fileName);

            CategoryEntity updatedCategory = categoryRepository.save(category);
            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCategory(@PathVariable("id") int id) {
        try {
            Optional<CategoryEntity> category = categoryRepository.findById(id);
            storageService.remove(category.get().getImage());
            categoryRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
