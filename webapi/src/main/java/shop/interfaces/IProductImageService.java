package shop.interfaces;

import shop.dto.product.UpdateProductDTO;
import shop.dto.productImage.CreateProductImageDTO;
import shop.dto.productImage.ProductImageItemDTO;
import shop.dto.productImage.UpdateProductImageDTO;

import java.util.List;

public interface IProductImageService {
    List<ProductImageItemDTO> getAll();

    ProductImageItemDTO getById(int id);

    List<ProductImageItemDTO> getByProductId(int productId);

    List<ProductImageItemDTO> create(CreateProductImageDTO model);
    ProductImageItemDTO update(int id, UpdateProductImageDTO model);

    void delete(int id);
}
