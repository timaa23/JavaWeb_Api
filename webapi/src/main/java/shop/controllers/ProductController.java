package shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.product.CreateProductDTO;
import shop.dto.product.ProductItemDTO;
import shop.dto.product.UpdateProductDTO;
import shop.interfaces.IProductService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/products")
public class ProductController {
    private final IProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductItemDTO>> getAllProducts() {
        var model = productService.getAll();

        return new ResponseEntity<>(productService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductItemDTO> getProductById(@PathVariable("id") int id) {
        try {
            ProductItemDTO product = productService.getById(id);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/byCategory/{category_id}")
    public ResponseEntity<List<ProductItemDTO>> getByCategoryId(@PathVariable("category_id") int id) {
        try {
            var products = productService.getByCategoryId(id);
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductItemDTO> createProduct(@ModelAttribute CreateProductDTO model) {
        try {
            var product = productService.create(model);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception ex) {
            System.out.println("Error----> " + ex.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductItemDTO> updateProduct(@PathVariable("id") int id, UpdateProductDTO model) {
        try {
            var product = productService.update(id, model);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception ex) {
            System.out.println("Error------>" + ex.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("id") int id) {
        try {
            productService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
