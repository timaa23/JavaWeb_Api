package shop.dto.product;

import lombok.Data;
import shop.dto.productImage.ProductImageItemDTO;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class ProductItemDTO {
    private int id;
    private String name;
    private double price;
    private String description;
    Date dateCreated;
    boolean isDeleted;
    private List<ProductImageItemDTO> images = new ArrayList<>();
    private int categoryId;
}
