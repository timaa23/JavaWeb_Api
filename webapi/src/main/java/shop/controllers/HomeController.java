package shop.controllers;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import shop.dto.UploadImageDTO;
import shop.dto.category.CreateCategoryDTO;
import shop.repositories.CategoryRepository;
import shop.storage.StorageService;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Date;


@RestController
@AllArgsConstructor
public class HomeController {
    private final CategoryRepository categoryRepository;
    private final StorageService storageService;

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
        return storageService.save(dto.getBase64());
    }

    @SneakyThrows
    @PostMapping(value = "/test", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> test(@ModelAttribute CreateCategoryDTO category) {

        String fileNames = "Images added: \n";

        String base64 = getBase64FromMultipartFile(category.getImage());
        fileNames += "\n" + storageService.save(base64);

        return new ResponseEntity<>(fileNames, HttpStatus.OK);
    }

    @SneakyThrows
    private String getBase64FromMultipartFile(MultipartFile multipartFile) {
        byte[] bytes = multipartFile.getBytes();
        byte[] encoded = Base64.encodeBase64(bytes, false);
        String fileBase54 = new String(encoded);

        return "data:" + multipartFile.getContentType() + ";base64," + fileBase54;
    }
//    private static List<CategoryItemDTO> list = new ArrayList<>() {
//        {
//            add(new CategoryItemDTO(1, "Кофти"));
//            add(new CategoryItemDTO(3, "Штани"));
//            add(new CategoryItemDTO(2, "Футболки"));
//        }
//    };
//
//    @GetMapping("/getAll")
//    public List<CategoryItemDTO> getAll() {
//        return list;
//    }
//
//    @GetMapping("/getById/{id}")
//    public CategoryItemDTO getById(@PathVariable("id") int id) {
//        int index = 0;
//        for (var category : list) {
//            if (category.getId() == id) {
//                break;
//            }
//            index++;
//        }
//        if (index >= list.size()) return null;
//        return list.get(index);
//    }
//
//    @PostMapping("/create")
//    public void create(@RequestBody CategoryItemDTO category) {
//        list.add(category);
//    }
//
//    @PostMapping("/update")
//    public void update(@RequestBody CategoryItemDTO category) {
//        int index = 0;
//        for (var cat : list) {
//            if (cat.getId() == category.getId()) {
//                break;
//            }
//            index++;
//        }
//        if (index >= list.size()) return;
//        list.get(index).setName(category.getName());
//    }
//
//    @PostMapping("/delete/{id}")
//    public void delete(@PathVariable("id") int id) {
//        int index = 0;
//        for (var category : list) {
//            if (category.getId() == id) {
//                break;
//            }
//            index++;
//        }
//        if (index >= list.size()) return;
//        list.remove(index);
//    }
}
