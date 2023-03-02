package shop.interfaces;

import shop.dto.productImage.CreateProductImageDTO;
import shop.dto.productImage.ProductImageItemDTO;

import java.util.List;

public interface IProductImageService {
    List<ProductImageItemDTO> getAll();

    ProductImageItemDTO getById(int id);

    List<ProductImageItemDTO> getByProductId(int productId);

    ProductImageItemDTO create(CreateProductImageDTO model);

    void delete(int id);
}
