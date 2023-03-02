package shop.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import shop.dto.category.CategoryItemDTO;
import shop.dto.category.CreateCategoryDTO;
import shop.entities.CategoryEntity;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-02-28T23:27:39+0200",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 19.0.2 (Oracle Corporation)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Override
    public CategoryItemDTO categoryItemDTOByCategory(CategoryEntity category) {
        if ( category == null ) {
            return null;
        }

        CategoryItemDTO categoryItemDTO = new CategoryItemDTO();

        categoryItemDTO.setId( category.getId() );
        categoryItemDTO.setName( category.getName() );
        categoryItemDTO.setImage( category.getImage() );
        categoryItemDTO.setDescription( category.getDescription() );

        return categoryItemDTO;
    }

    @Override
    public List<CategoryItemDTO> categoryItemDTOsToCategories(List<CategoryEntity> list) {
        if ( list == null ) {
            return null;
        }

        List<CategoryItemDTO> list1 = new ArrayList<CategoryItemDTO>( list.size() );
        for ( CategoryEntity categoryEntity : list ) {
            list1.add( categoryItemDTOByCategory( categoryEntity ) );
        }

        return list1;
    }

    @Override
    public CategoryEntity categoryByCreateCategoryDTO(CreateCategoryDTO dto) {
        if ( dto == null ) {
            return null;
        }

        CategoryEntity categoryEntity = new CategoryEntity();

        categoryEntity.setName( dto.getName() );
        categoryEntity.setDescription( dto.getDescription() );

        return categoryEntity;
    }
}
