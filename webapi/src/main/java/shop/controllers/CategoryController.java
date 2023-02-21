package shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.category.CreateCategoryDTO;
import shop.dto.category.UpdateCategoryDTO;
import shop.entities.CategoryEntity;
import shop.repositories.CategoryRepository;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
public class CategoryController {
    private final CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<List<CategoryEntity>> getAllCategories() {
        List<CategoryEntity> categories = categoryRepository.findAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CategoryEntity> createCategory(@RequestBody CreateCategoryDTO model) {
        CategoryEntity category = new CategoryEntity();
        category.setName(model.getName());
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
    public ResponseEntity<CategoryEntity> updateCategory(@PathVariable("id") int id, @RequestBody UpdateCategoryDTO updateCategoryDTO) {
        Optional<CategoryEntity> categoryData = categoryRepository.findById(id);

        if (categoryData.isPresent()) {
            CategoryEntity category = categoryData.get();
            category.setName(updateCategoryDTO.getName());

            CategoryEntity updatedCategory = categoryRepository.save(category);
            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCategory(@PathVariable("id") int id) {
        try {
            categoryRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
