package shop.dto.product;

import lombok.Data;
import shop.dto.category.CategoryItemDTO;

import java.util.Date;

@Data
public class ProductItemDTO {
    private int id;
    private String name;
    private double price;
    private String description;
    Date dateCreated;
    boolean isDeleted;
    private int categoryId;
}
