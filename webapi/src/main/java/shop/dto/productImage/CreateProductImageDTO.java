package shop.dto.productImage;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateProductImageDTO {
    private String name;
    private int productId;
}
