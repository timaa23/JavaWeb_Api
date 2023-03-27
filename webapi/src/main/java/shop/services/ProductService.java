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
import shop.mapper.ProductImageMapper;
import shop.mapper.ProductMapper;
import shop.repositories.CategoryRepository;
import shop.repositories.ProductImageRepository;
import shop.repositories.ProductRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CategoryRepository categoryRepository;
    private final IProductImageService productImageService;
    private final ProductImageMapper productImageMapper;
    private final ProductImageRepository productImageRepository;

    @Override
    public List<ProductItemDTO> getAll() {
        var products = productRepository.findAll();
        var productItems = new ArrayList<ProductItemDTO>();
        for (var product : products) {
            var productItem = productMapper.productItemDTOByProduct(product);
            for (var image : product.getProductImages()) {
                productItem.getImages().add(productImageMapper.productImageItemDTOByProductImage(image));
            }
            productItems.add(productItem);
        }

        return productItems;
    }

    @SneakyThrows
    @Override
    public ProductItemDTO getById(int id) {
        Optional<ProductEntity> product = productRepository.findById(id);
        if (!product.isPresent()) throw new Exception();

        var productItem = productMapper.productItemDTOByProduct(product.get());
        for (var image : product.get().getProductImages()) {
            productItem.getImages().add(productImageMapper.productImageItemDTOByProductImage(image));
        }

        return productItem;
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

        var productItems = new ArrayList<ProductItemDTO>();
        for (var product : productsByCategory) {
            var productItem = productMapper.productItemDTOByProduct(product);
            for (var image : product.getProductImages()) {
                productItem.getImages().add(productImageMapper.productImageItemDTOByProductImage(image));
            }
            productItems.add(productItem);
        }

        return productItems;
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

        System.out.println(model.getFiles().isEmpty());

        for (var name : model.getRemoveFiles()) {
            var iName = productImageRepository.findByName(name);
            if (iName != null) {
                productImageService.delete(iName.getId());
            }
        }

        productImageService.create(new CreateProductImageDTO(model.getFiles(), product.getId()));

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

        for (var item : product.get().getProductImages()) {
            productImageService.delete(item.getId());
        }

        productRepository.deleteById(id);
    }
}
