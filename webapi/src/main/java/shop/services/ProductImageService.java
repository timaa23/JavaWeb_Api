package shop.services;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop.dto.productImage.CreateProductImageDTO;
import shop.dto.productImage.ProductImageItemDTO;
import shop.entities.ProductEntity;
import shop.entities.ProductImageEntity;
import shop.interfaces.IProductImageService;
import shop.mapper.ProductImageMapper;
import shop.repositories.ProductImageRepository;
import shop.repositories.ProductRepository;
import shop.storage.StorageService;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ProductImageService implements IProductImageService {
    private final ProductImageRepository productImageRepository;
    private final ProductImageMapper productImageMapper;
    private final ProductRepository productRepository;
    private final StorageService storageService;

    @Override
    public List<ProductImageItemDTO> getAll() {
        return productImageMapper.productImageItemDTOsToProductImages(productImageRepository.findAll());
    }

    @SneakyThrows
    @Override
    public ProductImageItemDTO getById(int id) {
        var productImage = productImageRepository.findById(id);
        if (!productImage.isPresent()) throw new Exception();

        return productImageMapper.productImageItemDTOByProductImage(productImage.get());
    }

    @SneakyThrows
    @Override
    public List<ProductImageItemDTO> getByProductId(int productId) {
        var productData = productRepository.findById(productId);
        if (!productData.isPresent()) throw new Exception();

        List<ProductImageEntity> imagesByProduct = new ArrayList<>();
        for (ProductImageEntity productImage : productImageRepository.findAll()) {
            if (productImage.getProduct() == productData.get()) {
                imagesByProduct.add(productImage);
            }
        }

        return productImageMapper.productImageItemDTOsToProductImages(imagesByProduct);
    }

    @SneakyThrows
    @Override
    public List<ProductImageItemDTO> create(CreateProductImageDTO model) {
        if (model.getImages().isEmpty()) return null;
        List<ProductImageEntity> imagesList = new ArrayList<>();
        for (var item : model.getImages()) {
            ProductImageEntity productImage = new ProductImageEntity();
            String fileName = storageService.saveMultipartFile(item);

            productImage.setName(fileName);
            productImage.setProduct(new ProductEntity(model.getProductId()));

            productImageRepository.save(productImage);
            imagesList.add(productImage);
        }

        return productImageMapper.productImageItemDTOsToProductImages(imagesList);
    }

    @SneakyThrows
    @Override
    public void delete(int id) {
        var image = productImageRepository.findById(id);
        if (!image.isPresent()) throw new Exception();

        storageService.removeFile(image.get().getName());
        productImageRepository.deleteById(id);
    }
}
