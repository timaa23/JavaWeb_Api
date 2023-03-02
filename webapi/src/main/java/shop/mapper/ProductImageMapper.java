package shop.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop.dto.productImage.CreateProductImageDTO;
import shop.dto.productImage.ProductImageItemDTO;
import shop.entities.ProductImageEntity;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {
    @Mapping(source = "product.id", target = "productId")
    ProductImageItemDTO categoryItemDTOByCategory(ProductImageEntity productImage);
    List<ProductImageItemDTO> categoryItemDTOsToCategories(List<ProductImageEntity> list);
    ProductImageEntity productByCreateProductDTO(CreateProductImageDTO dto);
}
