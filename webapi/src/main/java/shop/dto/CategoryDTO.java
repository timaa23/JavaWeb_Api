package shop.dto;

import lombok.Data;

@Data
public class CategoryDTO {
    private int id;
    private String name;

    public CategoryDTO() {
    }

    public CategoryDTO(int id, String name) {
        this.id = id;
        this.name = name;
    }
}