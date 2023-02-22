package shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.CategoryDTO;
import shop.dto.UploadImageDTO;
import shop.repositories.CategoryRepository;
import shop.storage.StorageService;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@AllArgsConstructor
public class HomeController {
    private final CategoryRepository categoryRepository;
    private final StorageService storageService;
    private static List<CategoryDTO> list = new ArrayList<>() {
        {
            add(new CategoryDTO(1, "Кофти"));
            add(new CategoryDTO(3, "Штани"));
            add(new CategoryDTO(2, "Футболки"));
        }
    };


    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serverfile(@PathVariable String filename) throws Exception {
        Resource file = storageService.loadAsResource(filename);
        String urlFileName = URLEncoder.encode("photo_" + new Date().getTime() + ".jpg", StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "filename=\"" + urlFileName + "\"")
                .body(file);
    }

    @PostMapping("/upload")
    public String upload(@RequestBody UploadImageDTO dto) {
        String fileName = storageService.save(dto.getBase64());
        return fileName;
    }

    @GetMapping("/getAll")
    public List<CategoryDTO> getAll() {
        return list;
    }

    @GetMapping("/getById/{id}")
    public CategoryDTO getById(@PathVariable("id") int id) {
        int index = 0;
        for (var category : list) {
            if (category.getId() == id) {
                break;
            }
            index++;
        }
        if (index >= list.size()) return null;
        return list.get(index);
    }

    @PostMapping("/create")
    public void create(@RequestBody CategoryDTO category) {
        list.add(category);
    }

    @PostMapping("/update")
    public void update(@RequestBody CategoryDTO category) {
        int index = 0;
        for (var cat : list) {
            if (cat.getId() == category.getId()) {
                break;
            }
            index++;
        }
        if (index >= list.size()) return;
        list.get(index).setName(category.getName());
    }

    @PostMapping("/delete/{id}")
    public void delete(@PathVariable("id") int id) {
        int index = 0;
        for (var category : list) {
            if (category.getId() == id) {
                break;
            }
            index++;
        }
        if (index >= list.size()) return;
        list.remove(index);
    }
}
