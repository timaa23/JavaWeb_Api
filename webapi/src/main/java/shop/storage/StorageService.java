package shop.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

public interface StorageService {
    void init();

    Resource loadAsResource(String fileName);

    String save(String base64);

    void remove(String removeFile);

    void removeFile(String removeFile);

    Path load(String filename);
    String saveMultipartFile(MultipartFile file);
}
