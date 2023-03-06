package shop.services;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop.dto.product.CreateProductDTO;
import shop.dto.product.ProductItemDTO;
import shop.dto.product.UpdateProductDTO;
import shop.dto.productImage.CreateProductImageDTO;
import shop.entities.CategoryEntity;
import shop.entities.ProductEntity;
import shop.interfaces.IProductImageService;
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
    @Autowired
    private final IProductImageService productImageService;

    @Override
    public List<ProductItemDTO> getAll() {
        var model = productMapper.productItemDTOsToProducts(productRepository.findAll());
        for (var item : model) {
            item.setPrimaryImage(productImageService.getByProductId(item.getId()).get(0).getName());
        }
        return model;
    }

    @SneakyThrows
    @Override
    public ProductItemDTO getById(int id) {
        Optional<ProductEntity> product = productRepository.findById(id);
        if (!product.isPresent()) throw new Exception();

        var model = productMapper.productItemDTOByProduct(product.get());
        model.setPrimaryImage(productImageService.getByProductId(model.getId()).get(0).getName());

        return model;
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

        var model = productMapper.productItemDTOsToProducts(productsByCategory);
        for (var item : model) {
            item.setPrimaryImage(productImageService.getByProductId(item.getId()).get(0).getName());
        }

        return model;
    }

    @SneakyThrows
    @Override
    public ProductItemDTO create(CreateProductDTO model) {
        ProductEntity product = productMapper.productByCreateProductDTO(model);
        product.setCategory(new CategoryEntity(model.getCategoryId()));

        productRepository.save(product);

        CreateProductImageDTO createProductImageDTO = new CreateProductImageDTO(model.getImages(), product.getId());
        productImageService.create(createProductImageDTO);

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

        var listImages = productImageService.getByProductId(id);
        for (var item : listImages) {
            productImageService.delete(item.getId());
        }

        productRepository.deleteById(id);
    }
}
