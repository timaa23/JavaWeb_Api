package shop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop.entities.CategoryEntity;
import shop.repositories.CategoryRepository;

@Service
@RequiredArgsConstructor
public class SeedService implements SeedServiceInterface {
    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public void seedCategoryData() {
        if (categoryRepository.count() == 0) {
        CategoryEntity category1 = new CategoryEntity();
        category1.setName("test1Name");
        category1.setDescription("test1Description");
        category1.setImage("1.jpg");

        CategoryEntity category2 = new CategoryEntity();
        category2.setName("test2Name");
        category2.setDescription("test2Description");
        category2.setImage("2.png");

        CategoryEntity category3 = new CategoryEntity();
        category3.setName("test3Name");
        category3.setDescription("test3Description");
        category3.setImage("3.jpg");

        CategoryEntity category4 = new CategoryEntity();
        category4.setName("test4Name");
        category4.setDescription("test4Description");
        category4.setImage("4.png");

        categoryRepository.save(category1);
        categoryRepository.save(category2);
        categoryRepository.save(category3);
        categoryRepository.save(category4);
        }
    }
}
