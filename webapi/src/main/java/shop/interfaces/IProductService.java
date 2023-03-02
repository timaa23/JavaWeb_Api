package shop.interfaces;

import shop.dto.product.CreateProductDTO;
import shop.dto.product.ProductItemDTO;
import shop.dto.product.UpdateProductDTO;


import java.util.List;

public interface IProductService {
    List<ProductItemDTO> getAll();
    List<ProductItemDTO> getByCategoryId(int categoryId);
    ProductItemDTO getById(int id);
    ProductItemDTO create(CreateProductDTO model);
    ProductItemDTO update(int id, UpdateProductDTO model);
    void delete(int id);
}
