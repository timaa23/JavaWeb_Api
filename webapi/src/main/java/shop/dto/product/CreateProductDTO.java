package shop.dto.product;

import lombok.Data;

@Data
public class CreateProductDTO {
    private String name;
    private double price;
    private String description;
    private String image;
    private int categoryId;
}
