package shop.dto.product;

import lombok.Data;

@Data
public class UpdateProductDTO {
    private String name;
    private double price;
    private String description;
    private int categoryId;
}
