package shop;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import shop.interfaces.ISeedService;
import shop.storage.StorageProperties;
import shop.storage.StorageService;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner init(StorageService storageService, ISeedService seedService) {
        return (args -> {
            try {
                storageService.init();
                seedService.seedCategoryData();
            } catch (Exception ex) {
                System.out.println("Exception------> " + ex.getMessage());
            }
        });
    }
}
