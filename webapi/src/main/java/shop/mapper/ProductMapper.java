package shop.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.dto.product.CreateProductDTO;
import shop.dto.product.ProductItemDTO;
import shop.entities.ProductEntity;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "dateCreated", target = "dateCreated")
    ProductItemDTO productItemDTOByProduct(ProductEntity product);

    List<ProductItemDTO> productItemDTOsToProducts(List<ProductEntity> products);

    ProductEntity productByCreateProductDTO(CreateProductDTO dto);
}
