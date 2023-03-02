package shop.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import shop.dto.product.CreateProductDTO;
import shop.dto.product.ProductItemDTO;
import shop.entities.CategoryEntity;
import shop.entities.ProductEntity;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-01T17:52:59+0200",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 19.0.2 (Oracle Corporation)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public ProductItemDTO productItemDTOByProduct(ProductEntity product) {
        if ( product == null ) {
            return null;
        }

        ProductItemDTO productItemDTO = new ProductItemDTO();

        productItemDTO.setCategoryId( productCategoryId( product ) );
        productItemDTO.setDateCreated( product.getDateCreated() );
        productItemDTO.setId( product.getId() );
        productItemDTO.setName( product.getName() );
        productItemDTO.setPrice( product.getPrice() );
        productItemDTO.setDescription( product.getDescription() );
        productItemDTO.setDeleted( product.isDeleted() );

        return productItemDTO;
    }

    @Override
    public List<ProductItemDTO> productItemDTOsToProducts(List<ProductEntity> products) {
        if ( products == null ) {
            return null;
        }

        List<ProductItemDTO> list = new ArrayList<ProductItemDTO>( products.size() );
        for ( ProductEntity productEntity : products ) {
            list.add( productItemDTOByProduct( productEntity ) );
        }

        return list;
    }

    @Override
    public ProductEntity productByCreateProductDTO(CreateProductDTO dto) {
        if ( dto == null ) {
            return null;
        }

        ProductEntity productEntity = new ProductEntity();

        productEntity.setName( dto.getName() );
        productEntity.setPrice( dto.getPrice() );
        productEntity.setDescription( dto.getDescription() );

        return productEntity;
    }

    private int productCategoryId(ProductEntity productEntity) {
        if ( productEntity == null ) {
            return 0;
        }
        CategoryEntity category = productEntity.getCategory();
        if ( category == null ) {
            return 0;
        }
        int id = category.getId();
        return id;
    }
}
