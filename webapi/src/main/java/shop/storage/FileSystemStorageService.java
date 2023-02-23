package shop.storage;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
public class FileSystemStorageService implements StorageService {
    private final Path rootLocation;

    public FileSystemStorageService(StorageProperties properties) {
        rootLocation = Paths.get(properties.getLocation());
    }

    @Override
    public void init() {
        try {
            if (!Files.exists(rootLocation)) {
                Files.createDirectories(rootLocation);
            }
        } catch (IOException ex) {
            throw new StorageException("Помилка створення папки", ex);
        }
    }

    @Override
    public Resource loadAsResource(String fileName) {
        try {
            Path file = rootLocation.resolve(fileName);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new StorageException("Проблеми з файлом: " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new StorageException("Файл не знайдено: " + fileName);
        }
    }

    @Override
    public void remove(String removeFile) {
        Path filePath = rootLocation.resolve(removeFile);
        File file = new File(filePath.toString());
        if (file.delete()) {
            System.out.println(file + " was removed");
        } else System.out.println(removeFile + " was not found");
    }

    @Override
    public String save(String base64) {
        try {
            if (base64.isEmpty()) {
                throw new StorageException("Пустий base64");
            }
            UUID uuid = UUID.randomUUID();
            String randomFileName = uuid.toString() + ".jpg";
            String[] charArray = base64.split(",");
            Base64.Decoder decoder = Base64.getDecoder();
            byte[] bytes = new byte[0];
            bytes = decoder.decode(charArray[1]);
            String folder = rootLocation.toString() + "/" + randomFileName;
            FileOutputStream fileOutputStream = new FileOutputStream(folder);
            fileOutputStream.write(bytes);
            fileOutputStream.close();
            return randomFileName;
        } catch (IOException e) {
            throw new StorageException("Проблема перетворення та збереження base64", e);
        }
    }
}
