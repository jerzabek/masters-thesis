package net.pinehaus.backend.attribute.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.attribute.model.Attribute;
import net.pinehaus.backend.attribute.service.AttributeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/attributes")
@Tag(name = "Product attributes")
@RequiredArgsConstructor
public class AttributeController {

  private final AttributeService attributeService;

  @GetMapping
  public List<Attribute> getAllAttributes() {
    return attributeService.getAllAttributes();
  }

}