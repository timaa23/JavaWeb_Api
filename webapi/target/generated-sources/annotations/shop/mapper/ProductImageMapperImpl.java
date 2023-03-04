package shop.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import shop.dto.productImage.CreateProductImageDTO;
import shop.dto.productImage.ProductImageItemDTO;
import shop.entities.ProductEntity;
import shop.entities.ProductImageEntity;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-04T18:39:46+0200",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 19.0.2 (Oracle Corporation)"
)
@Component
public class ProductImageMapperImpl implements ProductImageMapper {

    @Override
    public ProductImageItemDTO productImageItemDTOByProductImage(ProductImageEntity productImage) {
        if ( productImage == null ) {
            return null;
        }

        ProductImageItemDTO productImageItemDTO = new ProductImageItemDTO();

        productImageItemDTO.setProductId( productImageProductId( productImage ) );
        productImageItemDTO.setId( productImage.getId() );
        productImageItemDTO.setName( productImage.getName() );

        return productImageItemDTO;
    }

    @Override
    public List<ProductImageItemDTO> productImageItemDTOsToProductImages(List<ProductImageEntity> list) {
        if ( list == null ) {
            return null;
        }

        List<ProductImageItemDTO> list1 = new ArrayList<ProductImageItemDTO>( list.size() );
        for ( ProductImageEntity productImageEntity : list ) {
            list1.add( productImageItemDTOByProductImage( productImageEntity ) );
        }

        return list1;
    }

    @Override
    public ProductImageEntity productImageByCreateProductImageDTO(CreateProductImageDTO dto) {
        if ( dto == null ) {
            return null;
        }

        ProductImageEntity productImageEntity = new ProductImageEntity();

        productImageEntity.setName( dto.getName() );

        return productImageEntity;
    }

    private int productImageProductId(ProductImageEntity productImageEntity) {
        if ( productImageEntity == null ) {
            return 0;
        }
        ProductEntity product = productImageEntity.getProduct();
        if ( product == null ) {
            return 0;
        }
        int id = product.getId();
        return id;
    }
}
