package shop.dto.productImage;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
public class CreateProductImageDTO {
    private List<MultipartFile> images;
    private int productId;
}
