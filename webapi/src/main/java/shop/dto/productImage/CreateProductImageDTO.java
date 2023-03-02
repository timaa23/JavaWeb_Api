package shop.dto.productImage;

import lombok.Data;

@Data
public class CreateProductImageDTO {
    private String image;
    private int productId;
}
