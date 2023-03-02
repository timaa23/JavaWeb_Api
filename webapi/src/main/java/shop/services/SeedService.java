package shop.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop.entities.CategoryEntity;
import shop.entities.ProductEntity;
import shop.entities.ProductImageEntity;
import shop.interfaces.ISeedService;
import shop.repositories.CategoryRepository;
import shop.repositories.ProductImageRepository;
import shop.repositories.ProductRepository;

@Service
@RequiredArgsConstructor
public class SeedService implements ISeedService {
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ProductImageRepository productImageRepository;

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

        if (productRepository.count() == 0) {
            ProductEntity product1 = new ProductEntity();
            product1.setCategory(new CategoryEntity(52));
            product1.setName("test1");
            product1.setDescription("test1Description");
            product1.setPrice(111);
            product1.setDeleted(false);

            ProductEntity product2 = new ProductEntity();
            product2.setCategory(new CategoryEntity(52));
            product2.setName("test2");
            product2.setDescription("test2Description");
            product2.setPrice(222);
            product2.setDeleted(false);


            ProductEntity product3 = new ProductEntity();
            product3.setCategory(new CategoryEntity(52));
            product3.setName("test3");
            product3.setDescription("test3Description");
            product3.setPrice(333);
            product3.setDeleted(false);


            ProductEntity product4 = new ProductEntity();
            product4.setCategory(new CategoryEntity(48));
            product4.setName("test4");
            product4.setDescription("test4Description");
            product4.setPrice(444);
            product4.setDeleted(false);

            productRepository.save(product1);
            productRepository.save(product2);
            productRepository.save(product3);
            productRepository.save(product4);

            if (productImageRepository.count() == 0) {
                ProductImageEntity productImages1 = new ProductImageEntity();
                productImages1.setName("1.jpg");
                productImages1.setProduct(product1);

                ProductImageEntity productImages2 = new ProductImageEntity();
                productImages2.setName("2.jpg");
                productImages2.setProduct(product2);

                ProductImageEntity productImages3 = new ProductImageEntity();
                productImages3.setName("3.jpg");
                productImages3.setProduct(product3);

                ProductImageEntity productImages4 = new ProductImageEntity();
                productImages4.setName("4.jpg");
                productImages4.setProduct(product4);

                productImageRepository.save(productImages1);
                productImageRepository.save(productImages2);
                productImageRepository.save(productImages3);
                productImageRepository.save(productImages4);

            }
        }

    }
}
