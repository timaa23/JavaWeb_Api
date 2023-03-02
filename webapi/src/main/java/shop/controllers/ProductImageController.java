package shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.productImage.CreateProductImageDTO;
import shop.dto.productImage.ProductImageItemDTO;
import shop.interfaces.IProductImageService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/productImages")
public class ProductImageController {
    private final IProductImageService productImageService;

    @GetMapping
    public ResponseEntity<List<ProductImageItemDTO>> getAll() {
        var model = productImageService.getAll();

        return new ResponseEntity<>(model, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductImageItemDTO> getById(@PathVariable("id") int id) {
        try {
            var model = productImageService.getById(id);
            return new ResponseEntity<>(model, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/byProduct/{id}")
    public ResponseEntity<List<ProductImageItemDTO>> getAllByProductId(@PathVariable("id") int productId) {
        try {
            var model = productImageService.getByProductId(productId);
            return new ResponseEntity<>(model, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<ProductImageItemDTO> create(@RequestBody CreateProductImageDTO model) {
        try {
            var newImage = productImageService.create(model);
            return new ResponseEntity<>(newImage, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") int id) {
        try {
            productImageService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
