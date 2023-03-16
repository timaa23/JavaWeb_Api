package shop.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_categories")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String name;
    private String image;
    @Column(length = 20000)
    private String description;

    public CategoryEntity(int id) {
        this.id = id;
    }

    @OneToMany(mappedBy = "category")
    private List<ProductEntity> products;
}
