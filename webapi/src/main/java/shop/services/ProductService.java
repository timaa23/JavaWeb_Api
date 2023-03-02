package shop.services;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop.dto.product.CreateProductDTO;
import shop.dto.product.ProductItemDTO;
import shop.dto.product.UpdateProductDTO;
import shop.entities.CategoryEntity;
import shop.entities.ProductEntity;
import shop.interfaces.IProductService;
import shop.mapper.ProductMapper;
import shop.repositories.CategoryRepository;
import shop.repositories.ProductRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {
    @Autowired
    private final ProductRepository productRepository;
    @Autowired
    private final ProductMapper productMapper;
    @Autowired
    private final CategoryRepository categoryRepository;

    @Override
    public List<ProductItemDTO> getAll() {
        return productMapper.productItemDTOsToProducts(productRepository.findAll());
    }

    @SneakyThrows
    @Override
    public ProductItemDTO getById(int id) {
        Optional<ProductEntity> product = productRepository.findById(id);
        if (!product.isPresent()) throw new Exception();

        return productMapper.productItemDTOByProduct(product.get());
    }

    @SneakyThrows
    @Override
    public List<ProductItemDTO> getByCategoryId(int categoryId) {
        var category = categoryRepository.findById(categoryId);
        if (!category.isPresent()) throw new Exception();

        List<ProductEntity> productsByCategory = new ArrayList<>();
        for (ProductEntity product : productRepository.findAll()) {
            if (product.getCategory() == category.get()) {
                productsByCategory.add(product);
            }
        }

        return productMapper.productItemDTOsToProducts(productsByCategory);
    }

    @SneakyThrows
    @Override
    public ProductItemDTO create(CreateProductDTO model) {
        ProductEntity product = productMapper.productByCreateProductDTO(model);
        product.setCategory(new CategoryEntity(model.getCategoryId()));

        productRepository.save(product);
        return productMapper.productItemDTOByProduct(product);
    }

    @SneakyThrows
    @Override
    public ProductItemDTO update(int id, UpdateProductDTO model) {
        var productData = productRepository.findById(id);
        if (!productData.isPresent()) throw new Exception();

        ProductEntity product = productData.get();
        product.setName(model.getName());
        product.setDescription(model.getDescription());
        product.setPrice(model.getPrice());
        product.setCategory(new CategoryEntity(model.getCategoryId()));

        return productMapper.productItemDTOByProduct(productRepository.save(product));
    }

    @SneakyThrows
    @Override
    public void delete(int id) {
        Optional<ProductEntity> product = productRepository.findById(id);
        if (!product.isPresent()) throw new Exception();

        productRepository.deleteById(id);
    }
}
