package shop.dto.product;

import lombok.Data;

import java.util.Date;

@Data
public class ProductItemDTO {
    private int id;
    private String name;
    private double price;
    private String description;
    Date dateCreated;
    boolean isDeleted;
    private String primaryImage;
    private int categoryId;
}
