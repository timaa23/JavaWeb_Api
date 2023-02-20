package shop.controllers;

import org.springframework.web.bind.annotation.*;
import shop.dto.CategoryDTO;

import java.util.ArrayList;
import java.util.List;

@RestController
public class HomeController {
    private static List<CategoryDTO> list = new ArrayList<>() {
        {
            add(new CategoryDTO(1, "Кофти"));
            add(new CategoryDTO(3, "Штани"));
            add(new CategoryDTO(2, "Футболки"));
        }
    };

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
