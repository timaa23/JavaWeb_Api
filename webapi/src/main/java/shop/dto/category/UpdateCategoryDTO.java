package shop.dto.category;

import lombok.Data;

@Data
public class UpdateCategoryDTO {
    private String name;
    private String description;
    private String image;
}
